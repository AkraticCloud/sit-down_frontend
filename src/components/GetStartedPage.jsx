import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import './GetStartedPage.css';

function GetStartedPage() {
  useEffect(() => {
    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
  }, []);

  return (
    <div className="get-started-page">
      {/* Logo */}
      <div className="logo-container">
        <div className="logo-circle">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" fill="white"/>
          </svg>
        </div>
      </div>

      <h1 className="md-typescale-display-medium main-title">Sit Down</h1>

      <p className="md-typescale-body-large tagline">Find your perfect dining spot, one swipe at a time</p>

      <div className="feature-cards">
        <div className="feature-card">
          <div className="feature-card-content">
            <svg className="feature-icon location-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <div className="feature-text">
              <h3 className="md-typescale-title-medium feature-title">Location-Based</h3>
              <p className="md-typescale-body-medium feature-description">Find restaurants near you</p>
            </div>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-card-content">
            <svg className="feature-icon heart-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <div className="feature-text">
              <h3 className="md-typescale-title-medium feature-title">Smart Matching</h3>
              <p className="md-typescale-body-medium feature-description">AI-powered recommendations</p>
            </div>
          </div>
        </div>

        <div className="feature-card">
          <div className="feature-card-content">
            <svg className="feature-icon filter-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
            </svg>
            <div className="feature-text">
              <h3 className="md-typescale-title-medium feature-title">Dietary Filters</h3>
              <p className="md-typescale-body-medium feature-description">Match your preferences</p>
            </div>
          </div>
        </div>
      </div>
      
      <Link to='/survey' className="get-started-button-wrapper">
          <md-filled-button className="get-started-button">
            Get Started
          </md-filled-button>
      </Link>
      <Link to='/home' className ="guest-button-wrapper">
        <md-text-button className="guest-button">
          Continue as Guest
        </md-text-button>
      </Link>
    </div>
  );
}

export default GetStartedPage;
