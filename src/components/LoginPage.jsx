import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import '@material/web/button/filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/textfield/filled-text-field.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './LoginPage.css';
import { Link } from 'react-router-dom';

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
        const text = await res.text().catch(() => null)
        setError(text || 'Login failed')
      } else {
        navigate('/survey')
      }
    } catch (err) {
      setError('Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Logo */}
      <div className="logo-container">
        <div className="logo-circle">
          <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"
              fill="white"
            />
          </svg>
        </div>
    </div>
      <h1 className="md-typescale-display-medium main-title">Sit Down</h1>

      <p className="md-typescale-body-large tagline">
        Log in to continue discovering new dining spots!
      </p>

      <form className="login-form" onSubmit={handleSubmit}>
        <md-filled-text-field
          label="Email"
          type="email"
          class="login-input"
          required
          value={email}
          onInput={e => setEmail(e.target.value)}
        />
        <md-filled-text-field
          label="Password"
          type="password"
          class="login-input"
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

      <div className="guest-option">
        <Link to="/home">Continue as Guest</Link> 
      </div>

      <p classname ="signup-redirect">
        Don't have an account? <Link to='/register'>Register</Link>
      </p>
    </div>
  );
}

export default LoginPage;
