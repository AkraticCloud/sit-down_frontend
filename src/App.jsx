import { useEffect } from 'react';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './App.css';
import AppHomePage from '/src/components/AppHomePage.jsx';

function App() {
  return <AppHomePage />;
}

export default App;