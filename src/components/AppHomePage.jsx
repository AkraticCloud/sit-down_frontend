import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import WheelOfIndecision from './WheelOfIndecision';
//useState stores which restaurant is currently selected
import '@material/web/all.js';
import './AppHomePage.css';
import LocationButton from './LocationButton';

function AppHomePage() {
    //placeholder restaurants which are replaced when "Use My Location" button is clicked
    //each object holds restaurants' name, info, and image
    const [restaurants, setRestaurants] = useState([
        { name: 'Chipotle', address: '123 test address rd', info: 'Mexican • $$ • 4.2 ⭐', image: 'https://picsum.photos/800/500?random=1' },
        { name: 'Olive Garden', info: 'Italian • $$ • 4.0 ⭐', image: 'https://picsum.photos/800/500?random=2' },
        { name: 'Sushi King', info: 'Japanese • $$ • 4.6 ⭐', image: 'https://picsum.photos/800/500?random=3' },
        { name: 'Five Guys', info: 'Burgers • $$ • 4.3 ⭐', image: 'https://picsum.photos/800/500?random=4' },
        { name: 'Panda Express', info: 'Chinese • $ • 4.1 ⭐', image: 'https://picsum.photos/800/500?random=5' },
        { name: 'CAVA', info: 'Mediterranean • $$ • 4.5 ⭐', image: 'https://picsum.photos/800/500?random=6' },
        { name: 'Texas Roadhouse', info: 'Steakhouse • $$ • 4.4 ⭐', image: 'https://picsum.photos/800/500?random=7' },
        { name: 'Nando’s', info: 'Peri-Peri • $$ • 4.2 ⭐', image: 'https://picsum.photos/800/500?random=8' },
        { name: 'P.F. Chang’s', info: 'Asian Fusion • $$ • 4.0 ⭐', image: 'https://picsum.photos/800/500?random=9' },
        { name: 'The Melting Pot', info: 'Fondue • $$$ • 4.6 ⭐', image: 'https://picsum.photos/800/500?random=10' },
    ]);

    //stores which restaurant is currently being displayed
    const [index, setIndex] = useState(0);

    //tracks swipe animation state
    const [isAnimating, setIsAnimating] = useState(false);

    //tracks swipe direction
    const [swipeDirection, setSwipeDirection] = useState('right');

    //wheel of indecision state
    //tracks how many times the user swipes left in a row
    const [leftSwipes, setLeftSwipes] = useState(0);
    //controls whether the wheel modal is visible or not
    const [showWheel, setShowWheel] = useState(false);
    
    //Stores the current data and time for history tracking
    const[date, setDate] = useState(new Date());
    useEffect(() => {
        const interval = setInterval(() => {
          setDate(new Date())
        }, 1000);

        return () => {
          clearInterval(interval); // Clear the interval when the component unmounts
        };
      }, []);

    //advances to the next restaurant
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

    const storeHistory = (status) => {
        let meridian = (date.getHours() < 12) ? "AM" : "PM"
        let newEntry = restaurants[index]
        console.log(localStorage.getItem("history"))
        let history = JSON.parse(localStorage.getItem("history")) || []
        newEntry.status = status
        newEntry.time = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} • ${date.getHours() % 12}:${date.getMinutes()} ${meridian}`
        newEntry.location = "Towson, MD"

        history.push(newEntry)
        localStorage.setItem("history", JSON.stringify(history))
    }

    //applies material 3's text styling
    //added a try/catch
    useEffect(() => {
        try {
            document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
        } catch (e) {
            console.warn('Typography unavailable, continuing without it. E:' + e);
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

            {/* Use My Location Button*/}
            <LocationButton onResults={(data) => {
                if(data.length > 0){
                    const formatted = data.map(place => ({
                        name: place.name,
                        info: place.primaryType || "Restaurant",  // temporary until you add more details
                        image: "https://picsum.photos/800/500?random=" + Math.random(), // placeholder until photo fetch
                        placeid: place.placeid  // keep for later photo/details fetch
                    }));
                    setRestaurants(formatted);
                    setIndex(0);
                }
            }}/>
        

            {/* Restaurant preview card */}
            <div
                className={`restaurant-card 
                ${isAnimating
                        ? swipeDirection === 'left'
                            ? 'swipe-left'
                            : 'swipe-right'
                        : swipeDirection === 'left'
                            ? 'swipe-reset'
                            : 'enter-from-left'
                    }`}
            >
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
                            onClick={() => {
                                storeHistory("passed")

                                // track left swipes for wheel activation
                                const newCount = leftSwipes + 1;

                                // show wheel after 3 consecutive left swipes
                                if (newCount >= 7) {
                                    setShowWheel(true);
                                    setLeftSwipes(0); // reset counter
                                } else {
                                    setLeftSwipes(newCount);
                                    nextRestaurant('left');
                                }
                            }}
                        >
                            Pass ❌
                        </md-filled-button>
                    </div>

                    {/* LIKE BUTTON */}
                    <div className="action-button-wrapper">
                        <md-filled-button
                            class="action-button"
                            onClick={() => {
                                storeHistory("liked")
                                setLeftSwipes(0); // reset streak on non-left swipe
                                nextRestaurant('right');
                            }}
                        >
                            Like ✅
                        </md-filled-button>
                    </div>

                    {/* FAVORITE BUTTON */}
                    <div className="action-button-wrapper">
                        <md-filled-button
                            class="action-button"
                            onClick={() => {
                                storeHistory("favorite")
                                setLeftSwipes(0);
                                nextRestaurant('right');
                            }}
                        >
                            Favorite ⭐
                        </md-filled-button>
                    </div>
                </div>
            </div>

            {/* buddy mode button*/}
            <div className="buddy-mode">
                <h3>Buddy Mode</h3>
                <md-filled-button className="buddy-gradient">Enable Buddy Mode</md-filled-button>
            </div>

            {/* settings + favorites button */}
            <div className='nav-button-container'>
                <Link to="/history">
                    <md-filled-button>Viewing History</md-filled-button>
                </Link>

                <Link to="/settings">
                    <md-filled-button>Settings</md-filled-button>
                </Link>

                <md-filled-button onClick={() => setShowWheel(true)}>
                    Wheel of Indecision
                </md-filled-button>
            </div>

            {/*Wheel of Indecision */}
            {showWheel && (
                <WheelOfIndecision
                    restaurants={restaurants}
                    onClose={() => setShowWheel(false)}
                    onSelectRestaurant={(index) => setIndex(index)}
                />
            )}

        </div>
    )
}

export default AppHomePage;
