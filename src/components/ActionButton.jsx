// ActionButton.jsx
// Reusable action button component for restaurant card interactions

import '@material/web/all.js';

function ActionButton({ label, onClick, className = '' }) {
    return (
        <div className={`action-button-wrapper ${className}`}>
            <md-filled-button
                class="action-button"
                onClick={onClick}
            >
                {label}
            </md-filled-button>
        </div>
    );
}

export default ActionButton;
