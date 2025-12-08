import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/textfield/filled-text-field.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './LoginPage.css';
import { Link } from 'react-router-dom';
import Logo from './Logo';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

  try {
      const res = await fetch('https://sit-down-backend.vercel.app/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // cookies
        body: JSON.stringify({ email: email, password: password })
      })

      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        setError(json.error || 'Login failed')
      } else {
        navigate('/survey')
      }
    } catch (err) {
      console.log(err)
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
       <Logo />

      <h1 className="md-typescale-display-medium main-title">Sit Down</h1>

      <p className="md-typescale-body-large tagline">
        Log in to continue discovering new dining spots!
      </p>
      
      <form className="login-form" onSubmit={handleSubmit}>
        <md-filled-text-field
          label="Email"
          type="email"
          class="login-input"
          name="email"
          id="email"
          required
          value={email}
          onInput={e => setEmail(e.target.value)}
        />
        <md-filled-text-field
          label="Password"
          type="password"
          class="login-input"
          name="password"
          id="password"
          required
          value={password}
          onInput={e => setPassword(e.target.value)}
        />
        <div className="login-button-wrapper">
          <md-filled-button class="login-button" disabled={loading} >
            {loading ? 'Logging in...' : 'Login'}
          </md-filled-button>
        </div>
        {error && <div className="login-error">{error}</div>}
      </form>


      <p className ="register-redirect">
        Don't have an account? <Link to='/register'>Register</Link>
      </p>

      <div className="guest-option">
        <Link to="/home">Continue as Guest</Link> 
      </div>
    </div>
  );
}

export default LoginPage;
