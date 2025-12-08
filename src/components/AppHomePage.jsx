import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

//useState stores which restaurant is currently selected
import '@material/web/all.js';
import './AppHomePage.css';
import LocationButton from './LocationButton';

//helper: convert degrees to radians for SVG math
const degToRad = (deg) => (deg * Math.PI) / 180;

//helper: compute x,y on a circle from center, radius and angle
const polarToCartesian = (radius, angleDeg) => {
    const angleRad = degToRad(angleDeg);
    return {
        x: radius * Math.cos(angleRad),
        y: radius * Math.sin(angleRad),
    };
};

function AppHomePage() {
    //placeholder restaurants for now
    //each object holds restaurants' name, info, and image
    const restaurants = [
        { name: 'Chipotle', info: 'Mexican • $$ • 4.2 ⭐', image: 'https://picsum.photos/800/500?random=1' },
        { name: 'Olive Garden', info: 'Italian • $$ • 4.0 ⭐', image: 'https://picsum.photos/800/500?random=2' },
        { name: 'Sushi King', info: 'Japanese • $$ • 4.6 ⭐', image: 'https://picsum.photos/800/500?random=3' },
        { name: 'Five Guys', info: 'Burgers • $$ • 4.3 ⭐', image: 'https://picsum.photos/800/500?random=4' },
        { name: 'Panda Express', info: 'Chinese • $ • 4.1 ⭐', image: 'https://picsum.photos/800/500?random=5' },
        { name: 'CAVA', info: 'Mediterranean • $$ • 4.5 ⭐', image: 'https://picsum.photos/800/500?random=6' },
        { name: 'Texas Roadhouse', info: 'Steakhouse • $$ • 4.4 ⭐', image: 'https://picsum.photos/800/500?random=7' },
        { name: 'Nando’s', info: 'Peri-Peri • $$ • 4.2 ⭐', image: 'https://picsum.photos/800/500?random=8' },
        { name: 'P.F. Chang’s', info: 'Asian Fusion • $$ • 4.0 ⭐', image: 'https://picsum.photos/800/500?random=9' },
        { name: 'The Melting Pot', info: 'Fondue • $$$ • 4.6 ⭐', image: 'https://picsum.photos/800/500?random=10' },
    ];

    //stores which restaurant is currently being displayed
    const [index, setIndex] = useState(0);

    //track user-entered location
    const [location, setLocation] = useState('');

    //tracks swipe animation state
    const [isAnimating, setIsAnimating] = useState(false);

    //tracks swipe direction
    const [swipeDirection, setSwipeDirection] = useState('right');

    //wheel of indecision state
    //tracks how many times the user swipes left in a row
    const [leftSwipes, setLeftSwipes] = useState(0);
    //controls whether the wheel modal is visible or not
    const [showWheel, setShowWheel] = useState(false);
    const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);

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

    // WHEEL LOGIC:
    // this function spins the wheel using a random rotation value
    // then calculates which restaurant the wheel lands on
    const spinWheel = () => {
        const wheel = document.getElementById('spinWheel');
        if (!wheel) return;

        const segmentAngle = 360 / restaurants.length;

        const randomRotation =
            360 * (3 + Math.floor(Math.random() * 3)) +
            Math.floor(Math.random() * 360);

        wheel.style.transition = 'transform 6s cubic-bezier(.08,.72,.13,1)';
        wheel.style.transform = `rotate(${randomRotation}deg)`;

        setTimeout(() => {
            //angle size of each slice
            const segmentAngle = 360 / restaurants.length;

            // final wheel rotation reduced to 0–360 range
            const normalizedRotation = randomRotation % 360;

            // angle where the top pointer is facing after the spin
            const pointerAngle = (360 - normalizedRotation) % 360;
            
            // pick the slice the pointer lands on
            const selectedIndex = Math.floor(pointerAngle / segmentAngle) % restaurants.length;

            setSelectedRestaurantIndex(selectedIndex);
            setShowResultModal(true);
            triggerConfetti();
        }, 6200);

    };

    //confetti
    //source:
    const triggerConfetti = () => {
        const duration = 1200;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 6,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            });
            confetti({
                particleCount: 6,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });

            if (Date.now() < end) requestAnimationFrame(frame);
        })();
    };

    //applies material 3's text styling
    //added a try/catch
    useEffect(() => {
        try {
            document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
        } catch (e) {
            console.warn('Typography unavailable, continuing without it. E:' + e);
        }
    }, []);

    //colors for SVG wheel slices
    const sliceColors = ['#E67E22', '#D63031', '#0984E3', '#00B894', '#6C5CE7'];

    //SVG wheel radii + constants
    const svgSize = 320;
    const center = svgSize / 2;
    const radius = 175;
    const labelRadius = 100;

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
            <LocationButton/>
            
            
            <div className="location-input">
                <md-outlined-text-field
                    label="Enter your location"
                    value={location}
                    onInput={(e) => setLocation(e.target.value)}
                    placeholder="Baltimore, MD"
                ></md-outlined-text-field>
            </div>

            

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
            {/* WHEEL OF INDECISION MODAL */}
            {/* this displays when the user swipes left too many times */}
            {/* WHEEL OF INDECISION MODAL */}
            {showWheel && (
                <div className="wheel-overlay">
                    <div className="wheel-container">
                        <h2 className="wheel-title">Still Can't Decide?</h2>
                        <p className="wheel-sub">Let fate choose for you 🍀</p>

                        {/* Pointer */}
                        <div className="wheel-pointer"></div>

                        {/* WHEEL (SVG-based so the slices + text stay aligned) */}
                        <div className="wheel-wrapper" id="spinWheel">
                            <svg
                                className="wheel-svg"
                                viewBox={`0 0 ${svgSize} ${svgSize}`}
                            >
                                {/* translate to center and rotate so 0° starts at the top */}
                                <g transform={`translate(${center}, ${center}) rotate(-90)`}>
                                    {restaurants.map((r, i) => {
                                        const segmentAngle = 360 / restaurants.length;
                                        const startAngle = i * segmentAngle;
                                        const endAngle = startAngle + segmentAngle;
                                        const midAngle = startAngle + segmentAngle / 2;

                                        const { x: x1, y: y1 } = polarToCartesian(radius, startAngle);
                                        const { x: x2, y: y2 } = polarToCartesian(radius, endAngle);

                                        const largeArcFlag = segmentAngle > 180 ? 1 : 0;

                                        const pathData = [
                                            'M 0 0',
                                            `L ${x1} ${y1}`,
                                            `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                                            'Z',
                                        ].join(' ');

                                        const { x: labelX, y: labelY } = polarToCartesian(
                                            labelRadius,
                                            midAngle
                                        );

                                        return (
                                            <g key={r.name}>
                                                {/* slice path */}
                                                <path
                                                    className="wheel-slice"
                                                    d={pathData}
                                                    fill={sliceColors[i % sliceColors.length]}
                                                />
                                                {/* label text, rotated to sit inside each slice */}
                                                <text
                                                    className="wheel-label"
                                                    x={labelX}
                                                    y={labelY}
                                                    textAnchor="middle"
                                                    dominantBaseline="middle"
                                                    transform={`rotate(${midAngle} ${labelX} ${labelY})`}
                                                >
                                                    {r.name}
                                                </text>
                                            </g>
                                        );
                                    })}
                                </g>
                            </svg>
                        </div>

                        {/* BUTTONS */}
                        <div className="wheel-button-row">
                            <md-filled-button
                                class="spin-button buddy-gradient"
                                onClick={() => spinWheel()}
                            >
                                Spin the Wheel 🎡
                            </md-filled-button>

                            <md-text-button class="cancel-btn" onClick={() => setShowWheel(false)}>
                                Cancel
                            </md-text-button>
                        </div>
                    </div>
                </div>
            )}
            {showResultModal && (
                <div className="wheel-overlay">
                    <div className="wheel-container">
                        <h2 className="wheel-title">You got:</h2>
                        <p className="wheel-sub">
                            <strong>{restaurants[selectedRestaurantIndex].name}</strong>
                        </p>

                        <div className="result-button-row">
                            <div className="result-buttons">
                                <md-filled-button
                                    class="spin-button buddy-gradient"
                                    onClick={() => {
                                        setIndex(selectedRestaurantIndex);
                                        setShowResultModal(false);
                                        setShowWheel(false);
                                    }}
                                >
                                    View Restaurant 🍽️
                                </md-filled-button>

                                <md-filled-button
                                    class="spin-button"
                                    onClick={() => {
                                        setShowResultModal(false);
                                        setShowWheel(true);
                                    }}
                                >
                                    Spin Again 🔄
                                </md-filled-button>
                            </div>
                        </div>
                        <md-text-button class="cancel-btn" onClick={() => {
                            setShowResultModal(false);
                            setShowWheel(false);
                        }}>
                            Cancel
                        </md-text-button>

                    </div>
                </div>
            )}
        </div>
    );
}

export default AppHomePage;
