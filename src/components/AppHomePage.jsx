import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
//useState stores which restaurant is currently selected
import '@material/web/all.js';
import './AppHomePage.css';

function AppHomePage() {

    //placeholder restaurants for now
    //each object holds restaurants' name, info, and image
    const restaurants = [
        {
            name: "Chipotle",
            info: "Mexican • $$ • 4.2 ⭐",
            image: "https://picsum.photos/800/500?random=1"
        },
        {
            name: "Olive Garden",
            info: "Italian • $$ • 4.0 ⭐",
            image: "https://picsum.photos/800/500?random=2"
        },
        {
            name: "Sushi King",
            info: "Japanese • $$ • 4.6 ⭐",
            image: "https://picsum.photos/800/500?random=3"
        }
    ];

    //stores which restaurant is currently being displayed
    const [index, setIndex] = useState(0);

    //track user-entered location
    const [location, setLocation] = useState("");

    //tracks swipe animation state
    const [isAnimating, setIsAnimating] = useState(false);

    //tracks swipe direction
    const [swipeDirection, setSwipeDirection] = useState("right");


    //advances to the next
    //this function moves to the next restaruant
    //modulus operator makes the list wrap around 
    //so it goes back to the first option instead of going out of range
    const nextRestaurant = (direction) => {
        setSwipeDirection(direction);
        setIsAnimating(true); // start animation

        // wait for animation to finish before switching card
        setTimeout(() => {
            setIndex((prev) => (prev + 1) % restaurants.length);
            setIsAnimating(false);
        }, 400); // match CSS animation time
    };

    //applies material 3's text styling
    //added a try/catch 
    useEffect(() => {
        try {
            document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
        } catch (e) {
            console.warn("Typography unavailable, continuing without it. E:" + e);
        }
    }, []);

    return (
        <div className="app-home-page">
            {/* Page title */}
            <h1>Find Your Next Spot</h1>

            {/* Location Input*/}
            <div className="location-input">
                <md-outlined-text-field
                    label="Enter your location"
                    value={location}
                    onInput={(e) => setLocation(e.target.value)}
                    placeholder="Baltimore, MD"
                >
                </md-outlined-text-field>
            </div>


            {/* Restaurant preview card */}
            <div className={`restaurant-card 
                ${isAnimating ? (swipeDirection === "left" ? "swipe-left" : "swipe-right") 
                              : (swipeDirection === "left" ? "swipe-reset" : "enter-from-left")}`}>

                {/* Restaurant image changes based on current index */}
                <img
                    src={restaurants[index].image}
                    alt={restaurants[index].name}
                    className="restaurant-image"
                />

                {/* Restaurant name + info changes based on current 
            index or state*/}
                <h2>{restaurants[index].name}</h2>
                <p>{restaurants[index].info}</p>

                {/* buttons for like, pass, and favorite
                    both actions currently move to the next restaurant
                    future updates: 
                    - liked restaurants should be stored in the database
                    - after a set amount of 'swipes' the wheel of indecisison should pop up */}
                <div className="buttons">
                    <md-outlined-button onClick={() => nextRestaurant("left")}>Pass ❌</md-outlined-button>
                    <md-filled-button onClick={() => nextRestaurant("right")}>Like ✅</md-filled-button>
                    <md-filled-button onClick={() => nextRestaurant("right")}>Favorite ⭐</md-filled-button>
                </div>
            </div>

            {/* buddy mode button*/}
            <div className="buddy-mode">
                <h3>Buddy Mode</h3>
                <md-outlined-button>Enable Buddy Mode </md-outlined-button>
            </div>

            {/* settings + favorites button */}
            <section className='nav-button-container'>
                    <Link to='/settings' className="nav-buttons">
                        <md-outlined-button>Settings</md-outlined-button>
                    </Link>

                    <Link to='/favorites' className="nav-buttons">
                        <md-outlined-button>Favorites</md-outlined-button>
                    </Link>
            </section>


        </div >
    );
}

export default AppHomePage;
