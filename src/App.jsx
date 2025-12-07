import { Routes, Route, BrowserRouter } from 'react-router-dom';
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';
import '@material/web/textfield/outlined-text-field.js';
import '@material/web/checkbox/checkbox.js';
import './App.css';
import GetStartedPage from './components/GetStartedPage';
import RegistrationPage from './components/RegistrationPage'
import HomePage from './components/AppHomePage'
import SettingsPage from './components/SettingsPage'

function App() {
  // return <GetStartedPage />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<GetStartedPage />}/>
        <Route path='/registration' element={<RegistrationPage />}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/questionnaire' element={<QuestionnairePage/>}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/settings' element={<SettingsPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;