import { useEffect, useState } from "react"
import "./FavoritesPage.css"
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import '@material/web/divider/divider.js';

function FavoritesPage(){
    const [currentList, setCurrentList] = useState(0)
    const [currentListData, setCurrentListData] = useState(null)
    const [foodListData, setFoodListData] = useState(null)
    const tempUname = "test101x9"
    const toyListArr = [{"foodlist-name": "1"}, {"foodlist-name": "2"}, {"foodlist-name": "3"}]

    useEffect(() => {
        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    }, []);

    useEffect(() =>{
        const createList = async (foodlist_name, restaurant_id, username) => {
            try{
                const response = await fetch(`https://sit-down-backend.vercel.app/db/createlist`, {
                    method: "POST",
                    body: JSON.stringify({
                        foodlist_name: foodlist_name,
                        restaurant_id: restaurant_id,
                        username: username
                    })
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json()
                console.log("Data returned:" + data)
            }catch (e){
                console.log(e)
            }
        }

        createList(toyListArr[0]["foodlist-name"], "test", tempUname)
        createList(toyListArr[1]["foodlist-name"], "test", tempUname)
        createList(toyListArr[2]["foodlist-name"], "test", tempUname)
    })

    //Potentially refactor to remove the function assignments, just execute the code in the useEffect
    useEffect(() => { //Grabs the foodlists the user has made. 
        const fetchLists = async () => {
            try{
                const response = await fetch(`https://sit-down-backend.vercel.app/db/foodlists/:${tempUname}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json()

                setFoodListData(data)
                console.log("Data returned:" + data)
            }catch (e){
                console.log(e)
            }
        }

        fetchLists()
    }, []);

    useEffect(() =>{ //Grabs the contents of the current foodlist. 
        const fetchRestaurants = async () => {
            if(currentList != null){
                try{
                    const response = await fetch(`https://sit-down-backend.vercel.app/db/foodlists/:${tempUname}/:${currentList}`)

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json()

                    setCurrentListData(data)
                    console.log("Data returned:" + data)
                }catch (e){
                    console.log(e)
                }
            }
        }

        fetchRestaurants()
    }, [currentList]); //Retriggers this effect when the current list changes. 

    return(
        <div className="favorites-page">
            <section className="foodlist-list-container">
                {toyListArr.map((list, index) => (
                    <section 
                        className="foodlist-row"
                        onClick={() => {
                                setCurrentList(index)
                                //Retrieve the contents of the foodlist and display them. 
                            }
                        }
                    >
                        <section className="foodlist-row-content">
                            <h3>{list["foodlist-name"]}</h3>
                        </section>
                    </section>
                ))}
            </section>
            <section className="current-foodlist-container">
                <h1>{currentList}</h1>
                <md-divider></md-divider>
            </section>
        </div>
    )
}

export default FavoritesPage