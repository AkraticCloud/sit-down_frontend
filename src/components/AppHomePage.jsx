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

            {/* Logo*/}
            <div className="home-header">
                <div className="home-logo-circle">
                    <svg className="home-logo-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" fill="white" />
                    </svg>
                </div>

                <h1 className="home-title">Find Your Next Spot!</h1>
            </div>

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

                    {/* PASS BUTTON */}
                    <div className="action-button-wrapper pass-wrapper">
                        <md-filled-button
                            class="action-button"
                            onClick={() => nextRestaurant("left")}
                        >
                            Pass ❌
                        </md-filled-button>
                    </div>

                    {/* LIKE BUTTON */}
                    <div className="action-button-wrapper">
                        <md-filled-button
                            class="action-button"
                            onClick={() => nextRestaurant("right")}
                        >
                            Like ✅
                        </md-filled-button>
                    </div>

                    {/* FAVORITE BUTTON */}
                    <div className="action-button-wrapper">
                        <md-filled-button
                            class="action-button"
                            onClick={() => nextRestaurant("right")}
                        >
                            Favorite ⭐
                        </md-filled-button>
                    </div>

                </div>
            </div>

            {/* buddy mode button*/}
            <div className="buddy-mode">
                <h3>Buddy Mode</h3>
                <md-filled-button className="buddy-gradient" >Enable Buddy Mode </md-filled-button>
            </div>

            {/* settings + favorites button */}
            <div className="footer-bar">
                <Link to="/favorites">
                    <md-filled-button>Favorites</md-filled-button>
                </Link>

                <Link to="/history">
                    <md-filled-button>Viewing History</md-filled-button>
                </Link>
                
                <Link to="/settings">
                    <md-filled-button>Settings</md-filled-button>
                </Link>
            </div>


        </div >
    );
}

export default AppHomePage;
