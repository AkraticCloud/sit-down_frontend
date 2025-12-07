import { useEffect, useState } from "react"
import "./FavoritesPage.css"

function FavoritesPage(){
    const [currentList, setCurrentList] = useState(0)
    const [currentListData, setCurrentListData] = useState(null)
    const [foodListData, setFoodListData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [isError, setError] = useState(false)
    const tempUname = "test"
    const toyListArr = [{"foodlist-name": "1"}, {"foodlist-name": "2"}, {"foodlist-name": "3"}]

    //Potentially refactor to remove the function assignments, just execute the code in the useEffect
    useEffect(() => { //Grabs the foodlists the user has made. 
        const fetchLists = async () => {
            setLoading(true)
            try{
                const response = await fetch(`https://sit-down-backend.vercel.app/db/foodlists/:${tempUname}`)

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json()

                setFoodListData(data)
            }catch (e){
                console.log(e)
                setError(true)
            }finally{
                setLoading(false)
            }
        }

        fetchLists()
    }, []);

    useEffect(() =>{ //Grabs the contents of the current foodlist. 
        const fetchRestaurants = async () => {
            setLoading(true)
            if(currentList != null){
                try{
                    const response = await fetch(`https://sit-down-backend.vercel.app/db/foodlists/:${tempUname}/:${currentList}`)

                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }

                    const data = await response.json()

                    setCurrentListData(data)
                }catch (e){
                    console.log(e)
                    setError(true)
                }finally{
                    setLoading(false)
                }
            }
        }

        fetchRestaurants()
    }, [currentList]); //Retriggers this effect when the current list changes. 

    //TODO: Change the display based on if the data is loading or has errored out. 
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
                <h1>The current list is: {currentList}</h1>
            </section>
        </div>
    )
}

export default FavoritesPage