// WheelSpinModal.jsx
// Modal displaying the spinning wheel before a restaurant is selected

import '@material/web/all.js';
import WheelSVG from './WheelSVG';

function WheelSpinModal({ restaurants, onSpin, onCancel }) {
    return (
        <div className="wheel-overlay">
            <div className="wheel-container">
                <h2 className="wheel-title">Still Can't Decide?</h2>
                <p className="wheel-sub">Let fate choose for you 🍀</p>

                {/* Static pointer indicating where the wheel will land */}
                <div className="wheel-pointer"></div>

                {/* Wrapper for rotation animation */}
                <div className="wheel-wrapper" id="spinWheel">
                    <WheelSVG restaurants={restaurants} />
                </div>

                <div className="wheel-button-row">
                    <md-filled-button
                        class="spin-button buddy-gradient"
                        onClick={onSpin}
                    >
                        Spin the Wheel 🎡
                    </md-filled-button>

                    <md-text-button class="cancel-btn" onClick={onCancel}>
                        Cancel
                    </md-text-button>
                </div>
            </div>
        </div>
    );
}

export default WheelSpinModal;