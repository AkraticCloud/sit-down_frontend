// WheelOfIndecision.jsx
// Main component managing the wheel spinning logic and modal states

import { useState } from 'react';
import confetti from 'canvas-confetti';
import WheelSpinModal from './WheelSpinModal';
import WheelResultModal from './WheelResultModal';

function WheelOfIndecision({ restaurants, onClose, onSelectRestaurant }) {
    // Modal state management
    const [showWheel, setShowWheel] = useState(true);
    const [selectedRestaurantIndex, setSelectedRestaurantIndex] = useState(null);
    const [showResultModal, setShowResultModal] = useState(false);

    // Spins the wheel and calculates which restaurant it lands on
    const spinWheel = () => {
        const wheel = document.getElementById('spinWheel');
        if (!wheel) return;

        // Generate random rotation (3-6 full spins + extra degrees)
        const randomRotation =
            360 * (3 + Math.floor(Math.random() * 3)) +
            Math.floor(Math.random() * 360);

        // Apply CSS animation
        wheel.style.transition = 'transform 6s cubic-bezier(.08,.72,.13,1)';
        wheel.style.transform = `rotate(${randomRotation}deg)`;

        // After animation completes, calculate which slice the pointer landed on
        setTimeout(() => {
            const segmentAngle = 360 / restaurants.length;
            const normalizedRotation = randomRotation % 360;
            const pointerAngle = (360 - normalizedRotation) % 360;
            const selectedIndex = Math.floor(pointerAngle / segmentAngle) % restaurants.length;

            setSelectedRestaurantIndex(selectedIndex);
            setShowResultModal(true);
            triggerConfetti();
        }, 6200);
    };

    // Triggers confetti animation from both sides of the screen
    const triggerConfetti = () => {
        const duration = 1200;
        const end = Date.now() + duration;

        (function frame() {
            // Left side confetti
            confetti({
                particleCount: 6,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
            });
            // Right side confetti
            confetti({
                particleCount: 6,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
            });

            if (Date.now() < end) requestAnimationFrame(frame);
        })();
    };

    return (
        <>
            {showWheel && (
                <WheelSpinModal
                    restaurants={restaurants}
                    onSpin={spinWheel}
                    onCancel={() => {
                        setShowWheel(false);
                        onClose();
                    }}
                />
            )}
            {showResultModal && (
                <WheelResultModal
                    restaurantName={restaurants[selectedRestaurantIndex].name}
                    onViewRestaurant={() => {
                        onSelectRestaurant(selectedRestaurantIndex);
                        setShowResultModal(false);
                        setShowWheel(false);
                        onClose();
                    }}
                    onSpinAgain={() => {
                        setShowResultModal(false);
                        setShowWheel(true);
                    }}
                    onCancel={() => {
                        setShowResultModal(false);
                        setShowWheel(false);
                        onClose();
                    }}
                />
            )}
        </>
    );
}

export default WheelOfIndecision;