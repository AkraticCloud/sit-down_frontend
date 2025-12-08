import './RecommendationModal.css';
import '@material/web/all.js';

function RecommendationModal({ recommendation, onClose, loading }) {
    if (!recommendation) return null;

    return (
        <div className="recommendation-overlay">
            <div className="recommendation-modal">
                {/* Restaurant Name */}
                <h2 className="rec-restaurant-name">{recommendation.name}</h2>

                {/* Address */}
                <div className="rec-meta">
                    <span className="rec-address">📍 {recommendation.address}</span>
                </div>

                {/* Why This Choice */}
                <div className="rec-reasoning">
                    <h3 className="rec-heading">Why this choice?</h3>
                    <p className="rec-explanation">{recommendation.reasoning}</p>
                </div>

                {/* Action Buttons */}
                <div className="rec-button-row">
                    <md-text-button 
                        className="rec-btn-close"
                        onClick={onClose}
                    >
                        Close
                    </md-text-button>
                </div>
            </div>
        </div>
    );
}

export default RecommendationModal;