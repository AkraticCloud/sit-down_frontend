import { Routes, Route, BrowserRouter } from 'react-router-dom';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import './App.css';
import GetStartedPage from './components/GetStartedPage';
import SurveyPage from './components/SurveyPage'
import HomePage from './components/AppHomePage'
import SettingsPage from './components/SettingsPage'
import LoginPage from './components/LoginPage'
import FavoritesPage from './components/FavoritesPage';
import RegistrationPage from './components/RegistrationPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GetStartedPage />}/>
        <Route path='/register' element={<RegistrationPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/survey' element={<SurveyPage />}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/settings' element={<SettingsPage />}/>
        <Route path='/favorites' element={<FavoritesPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
