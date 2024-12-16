export const UseOrganiseFics = (allFics) => {
    const totalFicsRead = allFics.length

    const allAuthors = {}
    const allFandoms = {}
    const allTags = {}
    const allRatings = {
        "General Audiences": 0,
        "Teen And Up Audiences": 0,
        "Mature": 0,
        "Explicit": 0,
        "Not Rated": 0
    }
    const allCharacters = {}
    const allShips = {}

    const favouritePlaceholder = ['', 0]

    const favourites = {
        authors: {1: favouritePlaceholder, 2: favouritePlaceholder, 3: favouritePlaceholder},
        fandoms: {1: favouritePlaceholder, 2: favouritePlaceholder, 3: favouritePlaceholder},
        characters: {1: favouritePlaceholder, 2: favouritePlaceholder, 3: favouritePlaceholder, 4: favouritePlaceholder, 5: favouritePlaceholder},
        tags: {1: favouritePlaceholder, 2: favouritePlaceholder, 3: favouritePlaceholder, 4: favouritePlaceholder, 5: favouritePlaceholder},
        ships: {1: favouritePlaceholder, 2: favouritePlaceholder, 3: favouritePlaceholder},
        rating: favouritePlaceholder,
    }

    const allGeneral = {
        "totalFics": totalFicsRead,
        "totalWords": 0
    }

    // run through every fic in list
    for (let fic of allFics) {
        const title = fic.title
        const author = fic.author
        const characters = fic.characters
        const ships = fic.ships
        const fandoms = fic.fandoms
        const ratings = fic.ratings
        const tags = fic.tags
        const wordCount = fic.words

        if (allAuthors[author]) {
            allAuthors[author].fics.push(title)
            allAuthors[author].readFics++
            allAuthors[author].wordCount += wordCount
        } else {
            allAuthors[author] = {fics: [title], readFics: 1, totalWords: wordCount}
        }

        for (let fandom of fandoms) {
            if (allFandoms[fandom]) {
                allFandoms[fandom].fics.push(title)
                allFandoms[fandom].readFics++
                allFandoms[fandom].totalWords += wordCount
            } else {
                allFandoms[fandom] = {fics: [title], readFics: 1, totalWords: wordCount}
            }
        }

        for (let character of characters) {
            if (allCharacters[character]) {
                allCharacters[character].readFics++
            } else {
                allCharacters[character] = {readFics: 1}
            }
        }

        for (let ship of ships) {
            if (allShips[ship]) {
                allShips[ship].readFics++
            } else {
                allShips[ship] = {readFics: 1}
            }
        }

        for (let tag of tags) {
            if (allTags[tag]) {
                allTags[tag].readFics++
            } else {
                allTags[tag] = {readFics: 1}
            }
        } 

        for (let rating of ratings) {
            allRatings[rating]++
        }

        allGeneral.totalWords += wordCount

    }


    // Get favourites


    for (let author in allAuthors) {
        if (author == "orphan_account") {
            continue
        }

        let adjustingFic = [author, allAuthors[author].readFics]
            for (let i = 1; i <= 3; i++) {
                if (adjustingFic[1] > favourites.authors[i][1]) {
                    [favourites.authors[i], adjustingFic] = [adjustingFic, favourites.authors[i]]
                }
            }
    }

    for (let fandom in allFandoms) {
        let adjustingFic = [fandom, allFandoms[fandom].readFics]
            for (let i = 1; i <= 3; i++) {
                if (adjustingFic[1] > favourites.fandoms[i][1]) {
                    [favourites.fandoms[i], adjustingFic] = [adjustingFic, favourites.fandoms[i]]
                }
            }
    }

    for (let character in allCharacters) {
        let adjustingCharacter = [character, allCharacters[character].readFics]
        for (let i = 1; i <= 5; i++) {
            if (adjustingCharacter[1] > favourites.characters[i][1]) {
                [favourites.characters[i], adjustingCharacter] = [adjustingCharacter, favourites.characters[i]]
            }
        }

    }

    for (let ship in allShips) {
        let adjustingShip = [ship, allShips[ship].readFics]
        for (let i = 1; i <= 3; i++) {
            if (adjustingShip[1] > favourites.ships[i][1]) {
                [favourites.ships[i], adjustingShip] = [adjustingShip, favourites.ships[i]]
            }
        }
    }
    
    for (let tag in allTags) {
        let adjustingTag = [tag, allTags[tag].readFics]
        for (let i = 1; i <= 5; i++) {
            if (adjustingTag[1] > favourites.tags[i][1]) {
                [favourites.tags[i], adjustingTag] = [adjustingTag, favourites.tags[i]]
            }
        }
    }

    for (let rating in allRatings) {
        let adjustingRating = [rating, allRatings[rating]]
        if (adjustingRating[1] > favourites.rating[1]) {
            favourites.rating = adjustingRating
        }
    }




    const authorList = Object.entries(allAuthors)
    const fandomList = Object.entries(allFandoms)
    const tagList = Object.entries(allTags)
    // Overview
    const organisedData = {
        "TotalAuthors": authorList.length,
        "TotalFandoms": fandomList.length,
        "TotalTags": tagList.length,
        "TotalRatings": allRatings,
    }

    allGeneral["totalAuthors"] = authorList.length
    allGeneral["totalFandoms"] = fandomList.length
    allGeneral["totalTags"] = tagList.length
    allGeneral["totalRatings"] = allRatings

    const allData = {
        "allGeneral": allGeneral,
        "allAuthors": allAuthors,
        "allFandoms": allFandoms,
        "allTags": allTags,
        "allRatings": allRatings,
        "allCharacters": allCharacters,
        "allShips": allShips,
        "allFavourites": favourites
    }
    return allData
}


// # print("\nfavorite authors: ", top5Authors)
// # print("\nfavorite characters: ",favCharacters)
// # print("\nfavorite fandoms: ",top3Fandoms)
// # print("\nfavorite tags: ",top5Tags)
// # print("\nfavorite rating: ",favRating)
// # print("\nfavorite ships: ",favShips)
