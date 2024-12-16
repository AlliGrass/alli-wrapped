from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

from urllib.request import urlopen
from bs4 import BeautifulSoup
import mechanize
import re
import numpy as np
from collections import Counter
import io
import time
import string

app = Flask(__name__)

CORS(app)


def openLink(link, user, pwd):
    isOpen = False
    while not isOpen:
        try:
            br = mechanize.Browser()
            br.addheaders = [('User-agent', 'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.0.1) Gecko/2008071615 Fedora/3.0.1-1.fc9 Firefox/3.0.1')]
            br.open(link)

            br.select_form(id = "new_user_session_small")
            br["user[login]"] = user
            br["user[password]"] = pwd

            response = br.submit()
            isOpen = True
        except:
            print("Too many request, waiting for a bit and retry it...")
            time.sleep(15)

    myfile = response.get_data()

    br.close()
    time.sleep(2)

    return myfile

@app.route('/run-python', methods=['POST'])
def run_python_code():
    try:
        data = request.get_json()
        input = data.get('input')
        username = input[0]
        pwd = input[1]
    except Exception as e:
        # Handle errors
        return jsonify({'success': False, 'error': str(e)}), 500

        ### DATA COLLECTION - scrapping your readings -----------------------
    wrapped_year = "2024"


    titles = []
    authors = []
    ships = []
    characters = []
    ratings = []
    fandoms = []
    tags = []
    words = []

    user = 0
    isDone = False
    #open first page
    p = 1
    link = "https://archiveofourown.org/users/" + username + "/readings"



    myfile = openLink(link, username, pwd)

    soup = BeautifulSoup(myfile, 'html.parser')
    nav = soup.find("ol", attrs={"role":"navigation"})
    pages = nav.findAll("a")
    last_page = int(pages[-2].text)

    allfics = []

    # #looping through the history pages
    while not isDone or p <= last_page:
        # for n in range(2):
        fics = soup.findAll('div', attrs={'class':"header module"})
        extras = soup.findAll('ul', attrs={'class':"tags commas"})
        stats = soup.findAll('dl', attrs={'class':"stats"})
        views = soup.findAll('h4', attrs={'class':"viewed heading"})

        for fic in range(len(fics)):
            v = fics[fic]
            s = stats[fic]
            e = extras[fic]

            ## get year of visit
            year = views[fic].text[22:26]
            mfl = "Marked for Later" in views[fic].text

            if year == "2023": #if last visit older than 2023, stop loop
                isDone = True
            elif mfl:
                pass ## ignore if in mark for later

            else:
                heading = v.find('h4', attrs={'class':'heading'})
                title = heading.find(href=re.compile("works")).text
                author = heading.find('a', attrs={'rel':'author'})
                if author is None:
                    author = ['Anonymous']
                else:
                    author = author.text.replace('(','').replace(')', '').split(' ')
                    fandom = [f.text for f in v.findAll('a', attrs={'class':"tag"})]
                    rating = [v.findAll('a', attrs={'class':"help symbol question modal"})[0].text]

                    relationship = [f.text for f in e.findAll('li' , attrs={'class':"relationships"})]
                    character = [f.text for f in e.findAll('li' , attrs={'class':"characters"})]
                    tag = [f.text for f in e.findAll('li' , attrs={'class':"freeforms"})]

                    word = s.find('dd', attrs={'class':"words"}).text
                    word = int(word.replace(',',""))

                    ficInfo = {
                        "title": title,
                        "author": author,
                        "ships": relationship,
                        "characters": character,
                        "ratings": rating,
                        "fandoms": fandom,
                        "tags": tag,
                        "words": word
                    }

                    allfics.append(ficInfo)


        p = p+1
        if isDone or p > last_page:
            break
        #open new page
        print("opening page ", p)
        new_page_url = link + f"?page={p}"

        myfile = openLink(new_page_url, username, pwd)
        soup = BeautifulSoup(myfile, 'html.parser')

    return allfics

if __name__ == '__main__':
    app.run(debug=True)
