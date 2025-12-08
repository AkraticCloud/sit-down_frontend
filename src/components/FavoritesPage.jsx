import { useEffect, useMemo, useState } from "react"
import "./FavoritesPage.css"
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import '@material/web/divider/divider.js';

function FavoritesPage(){
    const [currentList, setCurrentList] = useState(0)
    //TODO - Implement these to pull data from the backend. 
    // const [currentListData, setCurrentListData] = useState(null)
    // const [foodListData, setFoodListData] = useState(null)
    // const tempUname = "test101x9"
    const toyListArr = useMemo(() => {
        return([
            {
                foodlistname: "Favorites",
                restaurants: ["Daily Sushi", "Tikka Shack", "Hip Hop Fish & Chicken"]
            }, 
            {
                foodlistname: "Pizza",
                restaurants: ["Cheesy Pizza", "Dominos", "Pizza Hut"]
            }, 
            {
                foodlistname: "Sushi",
                restaurants: ["Daily Sushi", "Charm City Buffet & Grill", "Sushi Hana"]
            },
            {
                foodlistname: "Test1",
                restaurants: ["Test1.1", "Test1.2", "Test1.3", "Test1.4", "Test1.5", "Test1.6", "Test1.7", "Test1.8", "Test1.9", "Test1.10", "Test1.11", "Test1.12", "Test1.13", "Test1.14"]
            },
            {
                foodlistname: "Test2",
                restaurants: []
            },
            {
                foodlistname: "Toy List",
                restaurants: ["Daily Sushi", "Charm City Buffet & Grill", "Sushi Hana"]
            },
            {
                foodlistname: "Toy List 2",
                restaurants: ["Daily Sushi", "Charm City Buffet & Grill", "Sushi Hana"]
            },
            {
                foodlistname: "Toy List 3",
                restaurants: ["Daily Sushi", "Charm City Buffet & Grill", "Sushi Hana"]
            },
            {
                foodlistname: "Toy List 4",
                restaurants: ["Daily Sushi", "Charm City Buffet & Grill", "Sushi Hana"]
            },  
        ])
    }, [])

    useEffect(() => {
        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    }, []);

    //TODO - Implement these effects to load the user's lists from the backend and load the current lists data. 
    // useEffect(() =>{
    //     const createList = async (foodlist_name, restaurant_id, username) => {
    //         try{
    //             const response = await fetch(`https://sit-down-backend.vercel.app/action/createlist`, {
    //                 method: "POST",
    //                 body: JSON.stringify({
    //                     foodlist_name: foodlist_name,
    //                     restaurant_id: restaurant_id,
    //                     username: username
    //                 })
    //             })

    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }

    //             const data = await response.json()
    //             console.log("Data returned:" + data)
    //         }catch (e){
    //             console.log(e)
    //         }
    //     }

    //     createList(toyListArr[0]["foodlist-name"], "test", tempUname)
    //     createList(toyListArr[1]["foodlist-name"], "test", tempUname)
    //     createList(toyListArr[2]["foodlist-name"], "test", tempUname)
    // }, [toyListArr])

    // //Potentially refactor to remove the function assignments, just execute the code in the useEffect
    // useEffect(() => { //Grabs the foodlists the user has made. 
    //     const fetchLists = async () => {
    //         try{
    //             const response = await fetch(`https://sit-down-backend.vercel.app/action/foodlists/:${tempUname}`)

    //             if (!response.ok) {
    //                 throw new Error(`HTTP error! status: ${response.status}`);
    //             }

    //             const data = await response.json()

    //             setFoodListData(data)
    //             console.log("Data returned:" + data)
    //         }catch (e){
    //             console.log(e)
    //         }
    //     }

    //     fetchLists()
    // }, []);

    // useEffect(() =>{ //Grabs the contents of the current foodlist. 
    //     const fetchRestaurants = async () => {
    //         if(currentList != null){
    //             try{
    //                 const response = await fetch(`https://sit-down-backend.vercel.app/action/foodlists/:${tempUname}/:${currentList}`)

    //                 if (!response.ok) {
    //                     throw new Error(`HTTP error! status: ${response.status}`);
    //                 }

    //                 const data = await response.json()

    //                 setCurrentListData(data)
    //                 console.log("Data returned:" + data)
    //             }catch (e){
    //                 console.log(e)
    //             }
    //         }
    //     }

    //     fetchRestaurants()
    // }, [currentList]); //Retriggers this effect when the current list changes. 

    return(
        <div className="favorites-page">
            <section className="foodlist-list-container">
                {toyListArr.map((list, index) => (
                    <section 
                        key={index}
                        className="foodlist-row"
                        onClick={() => {
                                setCurrentList(index)
                                //Retrieve the contents of the foodlist and display them. 
                            }
                        }
                    >
                        <section className="foodlist-row-content">
                            <h3>{list.foodlistname}</h3>
                        </section>
                    </section>
                ))}
            </section>
            <section className="current-foodlist-container">
                <h1>{toyListArr[currentList].foodlistname}</h1>
                <md-divider></md-divider>
                {toyListArr[currentList].restaurants.length > 0 ? (
                    toyListArr[currentList].restaurants.map((restaurant, index) => (
                        <section key={index} className="foodlist-row">
                            <section className="foodlist-row-content">
                                <h3>{restaurant}</h3>
                            </section>
                        </section>
                    ))
                ) : (
                    <div className="favorites-empty">
                        No restaurants in this list yet. Start swiping to add some favorites!
                    </div>
                )}
            </section>
        </div>
    )
}

export default FavoritesPage