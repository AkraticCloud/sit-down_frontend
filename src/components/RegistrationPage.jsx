import { useEffect } from 'react';
import '@material/web/all.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './RegistrationPage.css';

function RegistrationPage(){
    useEffect(() => {
        document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
    }, []);

    return (
        <div className='registration-page'>
            <div className='header-div'>
                <h2>What Are Your Tastes?</h2>
                <h3>Help Us Find Your Perfect Place</h3>
            </div>

            <section className='card'>
                <p>Where Are You Located?</p>
                <md-outlined-text-field value="Enter Your Location"></md-outlined-text-field>
            </section>
        </div>
    );
}

export default RegistrationPage