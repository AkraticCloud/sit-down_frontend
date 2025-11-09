import React from 'react';
import {Save, X} from 'lucide-react';

export default function SettingsPages(){
    const [hasChanges, setHasChanges] = useState(false);
    const [showSaveConfrim, setShowSaveConfrim] = useState(false);
}

const [userName, setUserName] = useState(false);
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

const handleUserNameChange = (values) => {
    setUserName(true);
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

//This is most definilaty going to change
//I used claude to give me something to display
//Will need to be changed to follow the stylying of the webpage and be connected to the rest of the code
return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold">Settings</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        {showSaveConfirm && (
          <div className="mb-6 p-4 bg-green-600 rounded-lg text-center animate-pulse">
            Settings saved successfully! Redirecting...
          </div>
        )}

        <div className="space-y-6">
          {/* Account Settings */}
          <section className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold">Account Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => handleUsernameChange(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </section>

          {/* Password Change */}
          <section className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold">Change Password</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                onClick={handlePasswordChange}
                disabled={!currentPassword || !newPassword || !confirmPassword}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Update Password
              </button>
            </div>
          </section>

          {/* Restaurant Preferences */}
          <section className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Restaurant Preferences</h2>
            
            <div className="space-y-6">
              {/* Favorite Cuisines */}
              <div>
                <label className="block text-sm font-medium mb-3">Favorite Cuisines</label>
                <div className="flex flex-wrap gap-2">
                  {cuisines.map(cuisine => (
                    <button
                      key={cuisine}
                      onClick={() => toggleCuisine(cuisine)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        preferences.favoriteCuisines.includes(cuisine)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dietary Restrictions */}
              <div>
                <label className="block text-sm font-medium mb-3">Dietary Restrictions</label>
                <div className="flex flex-wrap gap-2">
                  {dietaryOptions.map(option => (
                    <button
                      key={option}
                      onClick={() => toggleDietaryRestriction(option)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        preferences.dietaryRestrictions.includes(option)
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <label className="block text-sm font-medium mb-2">Preferred Price Range</label>
                <select
                  value={preferences.priceRange}
                  onChange={(e) => handlePreferenceChange('priceRange', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="budget">$ - Budget Friendly</option>
                  <option value="moderate">$$ - Moderate</option>
                  <option value="upscale">$$$ - Upscale</option>
                  <option value="fine-dining">$$$$ - Fine Dining</option>
                </select>
              </div>

              {/* Sort Preference */}
              <div>
                <label className="block text-sm font-medium mb-2">Default Sort By</label>
                <select
                  value={preferences.sortBy}
                  onChange={(e) => handlePreferenceChange('sortBy', e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="distance">Nearest to Me</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>

              {/* Default Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Default Location</label>
                <input
                  type="text"
                  value={preferences.defaultLocation}
                  onChange={(e) => handlePreferenceChange('defaultLocation', e.target.value)}
                  placeholder="e.g., New York, NY or use current location"
                  className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </section>

          {/* Notification Preferences */}
          <section className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            
            <div className="space-y-4">
              {/* Reservation Notifications */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium block">Reservation Reminders</label>
                  <span className="text-xs text-gray-400">Get notified about upcoming reservations</span>
                </div>
                <button
                  onClick={() => handleNotificationChange('reservations', !preferences.notifications.reservations)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    preferences.notifications.reservations ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.notifications.reservations ? 'translate-x-8' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Promotions */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium block">Promotions & Deals</label>
                  <span className="text-xs text-gray-400">Receive special offers from restaurants</span>
                </div>
                <button
                  onClick={() => handleNotificationChange('promotions', !preferences.notifications.promotions)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    preferences.notifications.promotions ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.notifications.promotions ? 'translate-x-8' : 'translate-x-1'
                  }`} />
                </button>
              </div>

              {/* Order Updates */}
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium block">Order Updates</label>
                  <span className="text-xs text-gray-400">Track your order status in real-time</span>
                </div>
                <button
                  onClick={() => handleNotificationChange('orderUpdates', !preferences.notifications.orderUpdates)}
                  className={`w-14 h-7 rounded-full transition-colors ${
                    preferences.notifications.orderUpdates ? 'bg-purple-600' : 'bg-gray-600'
                  }`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                    preferences.notifications.orderUpdates ? 'translate-x-8' : 'translate-x-1'
                  }`} />
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-end">
          <button
            onClick={handleDiscard}
            className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Save className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
);
