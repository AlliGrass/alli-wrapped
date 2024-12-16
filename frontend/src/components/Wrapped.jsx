import { useState } from "react"


export const Wrapped = ({profileData, ficList}) => {
    const [currentNavigatingData, setCurrentNavigatingData] = useState()

    const allGeneral = profileData.allGeneral
    const allFandoms = profileData.allFandoms
    const allTags = profileData.allTags
    const allRatings = profileData.allRatings
    const allCharacters = profileData.allCharacters
    const allShips = profileData.allShips
    const allFavourites = profileData.allFavourites


    const favouriteAuthors = allFavourites.authors
    const favouriteFandoms = allFavourites.fandoms
    const favouriteCharacters = allFavourites.characters
    const favouriteShips = allFavourites.ships
    const favouriteTags = allFavourites.tags
    const favouriteRating = allFavourites.rating


    const handleGetFics = (event) => {
        // console.log(event.target.innerHTML)
        // console.log(ficList)
        const checkRating = event.target.innerHTML == "Ratings" ? true : false
        const currentSearch = "all" + event.target.innerHTML
        setCurrentNavigatingData(Object.entries(profileData[currentSearch]).map(([listItem, value], index) => {
            return listItem + " - " + (checkRating ? value : value.readFics)
        }))
    }


    

    return (
        <section>
            <div>
                <h1>Wrapped</h1>
                <h3>You read {allGeneral.totalFics.toLocaleString()} fics this year</h3>
                <h3>By {allGeneral.totalAuthors.toLocaleString()} Authors</h3>
                <h3>{allGeneral.totalWords.toLocaleString()} words</h3>
                <h3>{allGeneral.totalFandoms.toLocaleString()} Fandoms</h3>
                <h3>{allGeneral.totalTags.toLocaleString()} Tags</h3>
            </div>
            <br />
            <div>
                <h2>Your Top Fandoms Were</h2>
                <ul>
                    <h3>{favouriteFandoms[1][0]} - {favouriteFandoms[1][1]} Fics</h3>
                    <h3>{favouriteFandoms[2][0]} - {favouriteFandoms[2][1]} Fics</h3>
                    <h3>{favouriteFandoms[3][0]} - {favouriteFandoms[3][1]} Fics</h3>
                </ul>
            </div>
            <br />
            <div>
                <h2>Your Top Ships Were</h2>
                <ul>
                    <h3>{favouriteShips[1][0]} - {favouriteShips[1][1]} Fics</h3>
                    <h3>{favouriteShips[2][0]} - {favouriteShips[2][1]} Fics</h3>
                    <h3>{favouriteShips[3][0]} - {favouriteShips[3][1]} Fics</h3>
                </ul>
            </div>
            <br />
            <div>
                <h2>Your Top Characters Were</h2>
                <ul>
                    <h3>{favouriteCharacters[1][0]} - {favouriteCharacters[1][1]} Fics</h3>
                    <h3>{favouriteCharacters[2][0]} - {favouriteCharacters[2][1]} Fics</h3>
                    <h3>{favouriteCharacters[3][0]} - {favouriteCharacters[3][1]} Fics</h3>
                    <h3>{favouriteCharacters[4][0]} - {favouriteCharacters[4][1]} Fics</h3>
                    <h3>{favouriteCharacters[5][0]} - {favouriteCharacters[5][1]} Fics</h3>
                </ul>
            </div>
            <br />
            <div>
                <h2>Favourite Rating</h2>
                <h3>{favouriteRating[0]} - {favouriteRating[1]} Fics</h3>
            </div>
            <br />
            <div>
                <h2>Most Read Tags</h2>
                <ul>
                    <h3>{favouriteTags[1][0]} - {favouriteTags[1][1]} Fics</h3>
                    <h3>{favouriteTags[2][0]} - {favouriteTags[2][1]} Fics</h3>
                    <h3>{favouriteTags[3][0]} - {favouriteTags[3][1]} Fics</h3>
                    <h3>{favouriteTags[4][0]} - {favouriteTags[4][1]} Fics</h3>
                    <h3>{favouriteTags[5][0]} - {favouriteTags[5][1]} Fics</h3>
                </ul>
            </div>
            <br />
            <div>
                <h2>Favourite Authors</h2>
                <ul>
                    <h3>{favouriteAuthors[1][0]} - {favouriteAuthors[1][1]} Fics</h3>
                    <h3>{favouriteAuthors[2][0]} - {favouriteAuthors[2][1]} Fics</h3>
                    <h3>{favouriteAuthors[3][0]} - {favouriteAuthors[3][1]} Fics</h3>
                </ul>
            </div>
            <br />
            <div>
                <h2>Navigating Fics</h2>
                <section>
                    <button onClick={handleGetFics}>Fandoms</button>
                    <button onClick={handleGetFics}>Authors</button>
                    <button onClick={handleGetFics}>Tags</button>
                    <button onClick={handleGetFics}>Characters</button>
                    <button onClick={handleGetFics}>Ships</button>
                    <button onClick={handleGetFics}>Ratings</button>

                </section>
                <ul>
                    {currentNavigatingData && currentNavigatingData.map((listItem, index) => (
                        <h3 key={index}>{listItem}</h3>
                    ))}
                </ul>
            </div>
            
        </section>
    ) 
       
}