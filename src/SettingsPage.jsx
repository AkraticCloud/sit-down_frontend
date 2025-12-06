import React, {useState}from 'react';
import {Save, X, LogOut, Settings, User, Lock} from 'lucide-react';
import './SettingsPage.css';

export default function SettingsPages(){
    const [hasChanges, setHasChanges] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const [username, setUsername] = useState('user123');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

const [preferences, setPreferences] = useState({
    favoriteCuisines: ['Italian', 'Japanese'],
    dietaryRestrictions: [],
    defaultLocation: '',
    priceRange: 'moderate',
    sortBy: 'rating'
});


//These are set to change, still needs to be connected to the Database and follow the structre of what the preferences are
const cuisines = ['Italian', 'Japanese', 
'Mexican', 'Chinese', 'Indian', 'Thai', 'American', 'Mediterranean', 'French', 'Korean'];
const dietaryOptions = ['Vegetarian', 'Vegan', 
'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Halal', 'Kosher'];

const toggleCuisine = (cuisine) => {
    setPreferences(prev => {
    const current = prev.favoriteCuisines;
    const updated = current.includes(cuisine)
    ? current.filter(c => c !== cuisine)
    : [...current, cuisine];
    return { ...prev, favoriteCuisines: updated };
    });
    setHasChanges(true);
};

const toggleDietaryRestriction = (restriction) => {
    setPreferences(prev => {
      const current = prev.dietaryRestrictions;
      const updated = current.includes(restriction)
        ? current.filter(r => r !== restriction)
        : [...current, restriction];
      return { ...prev, dietaryRestrictions: updated };
    });
    setHasChanges(true);
};

const handlePreferenceChange = (field, value) =>{
    setPreferences(prev => ({...prev, [field]: value}));
    setHasChanges(true);
};

const handleUsernameChange = (value) => {
    setUsername(value);
    setHasChanges(true);
};

const handlePasswordChange = () => {
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }
    alert('Password updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setHasChanges(true);
}

const handleSave = () => {
    console.log('Saving changes:', { username, preferences });
    setShowSaveConfirm(true);
    setTimeout(() => {
      window.location.href = '/home';
    }, 1500);
};

const handleDiscard = () => {
    window.location.href = '/home';
};

const handleLogout = () => {
    if (hasChanges) {
      const confirm = window.confirm('You have unsaved changes. Are you sure you want to logout?');
      if (!confirm) return;
    }
    console.log('Logging out');
    window.location.href = '/';
};

return (
    <div className="settings-page">
      <div className="settings-container">
        {/* Header */}
        <div className="settings-header">
          <div className="header-left">
            <Settings className="settings-icon" />
            <h1 className="settings-title">Settings</h1>
          </div>
          <button onClick={handleLogout} className="logout-button">
            <LogOut className="button-icon" />
            Logout
          </button>
        </div>

        {showSaveConfirm && (
          <div className="save-confirmation">
            Settings saved successfully! Redirecting...
          </div>
        )}

        <div className="settings-sections">
          {/* Account Settings */}
          <section className="settings-card">
            <div className="card-header">
              <User className="section-icon" />
              <h2 className="section-title">Account Settings</h2>
            </div>
            
            <div className="card-content">
              <div className="form-group">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="form-input"
                />
              </div>
            </div>
          </section>

          {/* Password Change */}
          <section className="settings-card">
            <div className="card-header">
              <Lock className="section-icon" />
              <h2 className="section-title">Change Password</h2>
            </div>
            
            <div className="card-content">
              <div className="form-group">
                <label className="form-label">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter current password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="form-input"
                  placeholder="Enter new password"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || !confirmPassword}
                className="update-password-button"
              >
                Update Password
              </button>
            </div>
          </section>

          {/* Restaurant Preferences */}
          <section className="settings-card">
            <div className="card-header">
              <h2 className="section-title">Restaurant Preferences</h2>
            </div>
            
            <div className="card-content">
              {/* Favorite Cuisines */}
              <div className="preference-group">
                <label className="form-label">Favorite Cuisines</label>
                <div className="button-grid">
                  {cuisines.map(cuisine => (
                    <button
                      key={cuisine}
                      onClick={() => toggleCuisine(cuisine)}
                      className={`cuisine-button ${
                        preferences.favoriteCuisines.includes(cuisine) ? 'active' : ''
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div className="preference-group">
                <label className="form-label">Dietary Restrictions</label>
                <div className="button-grid">
                  {dietaryOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => toggleDietaryRestriction(option)}
                      className={`dietary-button ${
                        preferences.dietaryRestrictions.includes(option) ? 'active' : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="form-group">
                <label className="form-label">Preferred Price Range</label>
                <select
                  value={preferences.priceRange}
                  onChange={(e) => handlePreferenceChange('priceRange', e.target.value)}
                  className="form-select"
                >
                  <option value="budget">$ - Budget Friendly</option>
                  <option value="moderate">$$ - Moderate</option>
                  <option value="upscale">$$$ - Upscale</option>
                  <option value="fine-dining">$$$$ - Fine Dining</option>
                </select>
              </div>

              {/* Sort Preference */}
              <div className="form-group">
                <label className="form-label">Default Sort By</label>
                <select
                  value={preferences.sortBy}
                  onChange={(e) => handlePreferenceChange('sortBy', e.target.value)}
                  className="form-select"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest to Me</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Default Location */}
              <div className="form-group">
                <label className="form-label">Default Location</label>
                <input
                  type="text"
                  value={preferences.defaultLocation}
                  onChange={(e) => handlePreferenceChange('defaultLocation', e.target.value)}
                  placeholder="e.g., New York, NY or use current location"
                  className="form-input"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button onClick={handleDiscard} className="discard-button">
            <X className="button-icon" />
            Discard Changes
          </button>
          <button onClick={handleSave} className="save-button">
            <Save className="button-icon" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
);
}