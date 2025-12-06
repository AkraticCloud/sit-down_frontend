import './SettingsPage.css';
import React, { useState } from 'react';
import { Save, X, LogOut, Settings, User, Lock } from 'lucide-react';

export default function SettingsPages() {
  const [hasChanges, setHasChanges] = useState(false);
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);

  const [username, setUsername] = useState('user123');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [preferences, setPreferences] = useState({
    favoriteCuisines: ['Italian', 'Japanese'],
    dietaryRestrictions: [],
    notifications: {
      reservations: true,
      promotions: true,
      orderUpdates: true
    },
    defaultLocation: '',
    priceRange: 'moderate',
    sortBy: 'rating'
  });

  const cuisines = [
    'Italian', 'Japanese', 'Mexican', 'Chinese', 'Indian', 'Thai',
    'American', 'Mediterranean', 'French', 'Korean'
  ];

  const dietaryOptions = [
    'Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free',
    'Nut-Free', 'Halal', 'Kosher'
  ];

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

  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
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
  };

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
        <div className="settings-header-wrapper">

          <div className="settings-logo-circle">
            <Settings className="settings-logo-icon" />
          </div>

          <div className="settings-title-box">
            <h1>Settings</h1>
            <p>Update your account, preferences, and app experience.</p>
          </div>
        </div>

        <div className="settings-top-buttons">
          <button onClick={() => (window.location.href = '/home')} className="btn-secondary back-home-btn">
            ← Home
          </button>

          <button onClick={handleLogout} className="logout-top">
            <LogOut className="btn-icon" />
            Logout
          </button>
        </div>

        {showSaveConfirm && (
          <div className="settings-alert-success">
            Settings saved successfully! Redirecting...
          </div>
        )}

        <div className="settings-sections">

          {/* Account Settings */}
          <section className="settings-card">
            <div className="settings-section-header">
              <User className="settings-section-icon" />
              <h2 className="settings-section-title">Account Settings</h2>
            </div>

            <div className="settings-field-group">
              <label className="settings-label">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                className="settings-input"
              />
            </div>
          </section>

          {/* Password Change */}
          <section className="settings-card">
            <div className="settings-section-header">
              <Lock className="settings-section-icon" />
              <h2 className="settings-section-title">Change Password</h2>
            </div>

            <div className="settings-field-group">
              <label className="settings-label">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="settings-input"
                placeholder="Enter current password"
              />
            </div>

            <div className="settings-field-group">
              <label className="settings-label">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="settings-input"
                placeholder="Enter new password"
              />
            </div>

            <div className="settings-field-group">
              <label className="settings-label">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="settings-input"
                placeholder="Confirm new password"
              />
            </div>

            <button
              onClick={handlePasswordChange}
              className="btn-primary"
            >
              Update Password
            </button>
          </section>

          {/* Restaurant Preferences */}
          <section className="settings-card">
            <h2 className="settings-section-title">Restaurant Preferences</h2>

            {/* Favorite Cuisines */}
            <div className="settings-field-group">
              <label className="settings-label">Favorite Cuisines</label>
              <div className="settings-tag-list">
                {cuisines.map(cuisine => (
                  <button
                    key={cuisine}
                    onClick={() => toggleCuisine(cuisine)}
                    className={`settings-tag ${preferences.favoriteCuisines.includes(cuisine) ? 'tag-selected' : ''}`}
                  >
                    {cuisine}
                  </button>
                ))}
              </div>
            </div>

            {/* Dietary Restrictions */}
            <div className="settings-field-group">
              <label className="settings-label">Dietary Restrictions</label>
              <div className="settings-tag-list">
                {dietaryOptions.map(option => (
                  <button
                    key={option}
                    onClick={() => toggleDietaryRestriction(option)}
                    className={`settings-tag ${preferences.dietaryRestrictions.includes(option) ? 'tag-selected' : ''}`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="settings-field-group">
              <label className="settings-label">Preferred Price Range</label>
              <select
                value={preferences.priceRange}
                onChange={(e) => handlePreferenceChange('priceRange', e.target.value)}
                className="settings-input"
              >
                <option value="budget">$ - Budget Friendly</option>
                <option value="moderate">$$ - Moderate</option>
                <option value="upscale">$$$ - Upscale</option>
                <option value="fine-dining">$$$$ - Fine Dining</option>
              </select>
            </div>

            {/* Sort Preference */}
            <div className="settings-field-group">
              <label className="settings-label">Default Sort By</label>
              <select
                value={preferences.sortBy}
                onChange={(e) => handlePreferenceChange('sortBy', e.target.value)}
                className="settings-input"
              >
                <option value="rating">Highest Rated</option>
                <option value="distance">Nearest to Me</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>

            {/* Default Location */}
            <div className="settings-field-group">
              <label className="settings-label">Default Location</label>
              <input
                type="text"
                value={preferences.defaultLocation}
                onChange={(e) => handlePreferenceChange('defaultLocation', e.target.value)}
                className="settings-input"
                placeholder="e.g., Baltimore, MD"
              />
            </div>
          </section>

        </div>

        {/* Action Buttons */}
        <div className="settings-actions">
          <button
            onClick={handleDiscard}
            className="btn-secondary"
          >
            <X className="btn-icon" />
            Discard Changes
          </button>

          <button
            onClick={handleSave}
            className="btn-primary"
          >
            <Save className="btn-icon" />
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
