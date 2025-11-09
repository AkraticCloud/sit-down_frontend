Great! Let's build a React app with Material Design 3 from scratch. I'll walk you through every step.

## Step 1: Create a React Project with Vite

Open your terminal and run:

```bash
npm create vite@latest my-material-app -- --template react
cd my-material-app
```

## Step 2: Install Dependencies

```bash
npm install
npm install @material/web
```

## Step 3: Update Your App

Open the project in your code editor. Replace the contents of `src/App.jsx` with:

```jsx
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
```

## Step 4: Add Google Fonts

Open `index.html` and add the Roboto font in the `<head>`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <title>Material Design 3 App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

## Step 5: Update Styles

Replace `src/App.css` with:

```css
.app {
  font-family: 'Roboto', sans-serif;
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: 2rem;
}

.button-group {
  display: flex;
  gap: 12px;
}
```

## Step 6: Run Your App

```bash
npm run dev
```

Open your browser to the URL shown (usually `http://localhost:5173`)

---

## What You've Built

You now have a React app with Material Design 3 components! The key points:

- ✅ **Vite** handles bundling and resolves `node_modules` imports
- ✅ **Material Web Components** work in React (just use lowercase tags)
- ✅ **Typography styles** are applied globally via `adoptedStyleSheets`
- ✅ **No import map needed** - Vite handles everything

Want to add more Material components or customize the theme? Let me know!
