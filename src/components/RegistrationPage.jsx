import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '@material/web/button/filled-button.js';
import '@material/web/textfield/filled-text-field.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';
import './RegistrationPage.css';
import { Link } from 'react-router-dom';

function RegistrationPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.adoptedStyleSheets.push(typescaleStyles.styleSheet);
  }, []);

  async function createUser({ email, password, username }) {
  console.log("➡️ Sending signup request to backend...");

  let res;
  try {
    res = await fetch('https://sit-down-backend.vercel.app/user/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password, username })
    });
  } catch (networkErr) {
    console.error("Network error (backend not reachable):", networkErr);
    throw new Error("Cannot reach backend");
  }

  console.log("⬅️ Backend responded. Status:", res.status);

  const text = await res.text();
  console.log("Raw response text from backend:", text);

  if (!res.ok) {
    throw new Error(text || `Signup failed (${res.status})`);
  }

  console.log("Parsing JSON...");
  return JSON.parse(text);
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createUser({ email, password, username });
      navigate('/login'); 
    } catch (err) {
      setError(err.message || 'Signup error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
      <h1 className="md-typescale-display-medium main-title">Create an Account</h1>

      <p className="md-typescale-body-large tagline">
        Join Sit Down to discover new dining spots!
      </p>

      <form className="registration-form" onSubmit={handleSubmit}>
        
        <md-filled-text-field
          label="Username"
          type="text"
          class="registration-input"
          required
          value={username}
          onInput={(e) => setUsername(e.target.value)}
        />

        <md-filled-text-field
          label="Email"
          type="email"
          class="registration-input"
          required
          value={email}
          onInput={(e) => setEmail(e.target.value)}
        />

        <md-filled-text-field
          label="Password"
          type="password"
          class="registration-input"
          required
          value={password}
          onInput={(e) => setPassword(e.target.value)}
        />

        <div className="registration-button-wrapper">
          <md-filled-button class="registration-button" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </md-filled-button>
        </div>

        {error && <div className="registration-error">{error}</div>}
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
}

export default RegistrationPage;
