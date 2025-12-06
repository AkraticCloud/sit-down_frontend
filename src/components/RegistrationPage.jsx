import { useEffect } from 'react';
import '@material/web/all.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './RegistrationPage.css';
import { Link } from 'react-router-dom';

function RegistrationPage() {
    useEffect(() => {
        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    }, []);

    return (
        <div className='registration-page'>
            {/* Imports the google api outlined symbols library. This import should be moved to the top level. */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"></link>

            <div className="registration-header">
                <div className="registration-logo-circle">
                    <svg className="registration-logo-icon" viewBox="0 0 24 24" fill="none">
                        <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" fill="white" />
                    </svg>
                </div>

                <div className="registration-title-box">
                    <h1>What Are Your Tastes?</h1>
                    <h3>Help Us Find Your Perfect Place</h3>
                </div>
            </div>



            <section className='card'>
                <p>Where Are You Located?</p>
                <md-outlined-text-field placeholder="Enter Your Location" id='locator'>
                    <md-icon slot="leading-icon">location_on</md-icon>
                </md-outlined-text-field>
            </section>

            <section className='card'>
                <p>What Cuisines Do You Prefer?</p>
                <md-chip-set className='chip-table-4'>
                    <md-filter-chip label='American'></md-filter-chip>
                    <md-filter-chip label='Indian'></md-filter-chip>
                    <md-filter-chip label='Mexican'></md-filter-chip>
                    <md-filter-chip label='Italian'></md-filter-chip>
                    <md-filter-chip label='Japanese'></md-filter-chip>
                    <md-filter-chip label='Chinese'></md-filter-chip>
                    <md-filter-chip label='Thai'></md-filter-chip>
                    <md-filter-chip label='Mediterranean'></md-filter-chip>
                </md-chip-set>
            </section>

            <section className='card'>
                <p>What Are Your Dietary Restrictions?</p>
                <md-chip-set className='chip-table-3'>
                    <md-filter-chip label='Gluten-free'></md-filter-chip>
                    <md-filter-chip label='Vegetarian'></md-filter-chip>
                    <md-filter-chip label='Vegan'></md-filter-chip>
                    <md-filter-chip label='Kosher'></md-filter-chip>
                    <md-filter-chip label='Halal'></md-filter-chip>
                    <md-filter-chip label='Nut Allergy'></md-filter-chip>
                </md-chip-set>
            </section>

            <section className='card'>
                <p>What Are Your Dining Preferences?</p>
                <md-chip-set className='chip-table-3'>
                    <md-filter-chip label='Drive-thru'></md-filter-chip>
                    <md-filter-chip label='Dine-in'></md-filter-chip>
                    <md-filter-chip label='Counter Service'></md-filter-chip>
                    <md-filter-chip label='Outdoor Seating'></md-filter-chip>
                    <md-filter-chip label='Takeout'></md-filter-chip>
                    <md-filter-chip label='Family Friendly'></md-filter-chip>
                </md-chip-set>
            </section>

            <section className='card'>
                <p>What Is Your Price Range?</p>
                <md-chip-set id='price-selector'>
                    <md-filter-chip label='$'></md-filter-chip>
                    <md-filter-chip label='$$'></md-filter-chip>
                    <md-filter-chip label='$$$'></md-filter-chip>
                    <md-filter-chip label='$$$$'></md-filter-chip>
                </md-chip-set>
            </section>

            <Link to='/home' id="register-button-wrapper">
                <md-filled-button id="register-button">
                    Confirm Setings
                </md-filled-button>
            </Link>
        </div>
    );
}

export default RegistrationPage