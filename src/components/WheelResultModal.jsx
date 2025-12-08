// WheelResultModal.jsx
// Modal showing the selected restaurant after the wheel finishes spinning

import '@material/web/all.js';

function WheelResultModal({ restaurantName, onViewRestaurant, onSpinAgain, onCancel }) {
    return (
        <div className="wheel-overlay">
            <div className="wheel-container">
                <h2 className="wheel-title">You got:</h2>
                <p className="wheel-sub">
                    <strong>{restaurantName}</strong>
                </p>

                <div className="result-button-row">
                    <div className="result-buttons">
                        <md-filled-button
                            class="spin-button buddy-gradient"
                            onClick={onViewRestaurant}
                        >
                            View Restaurant 🍽️
                        </md-filled-button>

                        <md-filled-button
                            class="spin-button"
                            onClick={onSpinAgain}
                        >
                            Spin Again 🔄
                        </md-filled-button>
                    </div>
                </div>
                <md-text-button class="cancel-btn" onClick={onCancel}>
                    Cancel
                </md-text-button>
            </div>
        </div>
    );
}

export default WheelResultModal;