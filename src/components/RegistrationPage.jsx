import { useEffect } from 'react';
import '@material/web/all.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './RegistrationPage.css';
import { Link } from 'react-router-dom';

function RegistrationPage(){
    useEffect(() => {
        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    }, []);

    return (
        <div className='registration-page'>
            {/* Imports the google api outlined symbols library. This import should be moved to the top level. */}
            <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"></link>

            <div className='header-div'>
                <h1>What Are Your Tastes?</h1>
                <h3>Help Us Find Your Perfect Place</h3>
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