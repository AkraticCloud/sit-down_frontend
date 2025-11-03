import { useEffect } from 'react';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './App.css';

function App() {
  useEffect(() => {
    // Apply Material Design typography styles
    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
  }, []);

  return (
    <div className="app">
      <h1 className="md-typescale-display-medium">Hello Material!</h1>
      
      <form className="form">
        <p className="md-typescale-body-medium">Check out these controls in a form!</p>
        
        <md-checkbox></md-checkbox>
        
        <md-outlined-text-field 
          label="Favorite color" 
          value="Purple"
        ></md-outlined-text-field>
        
        <div className="button-group">
          <md-filled-button type="button">Submit</md-filled-button>
          <md-outlined-button type="reset">Reset</md-outlined-button>
        </div>
      </form>
    </div>
  );
}

export default App;