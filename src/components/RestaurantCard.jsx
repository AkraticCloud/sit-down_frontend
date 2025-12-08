// RestaurantCard.jsx
// Displays restaurant details with swipe actions (Pass, Like, Favorite)

import ActionButton from './ActionButton';

function RestaurantCard({
    restaurant,
    isAnimating,
    swipeDirection,
    onPass,
    onLike,
    onFavorite
}) {
    return (
        <div
            className={`restaurant-card 
            ${isAnimating
                    ? swipeDirection === 'left'
                        ? 'swipe-left'
                        : 'swipe-right'
                    : swipeDirection === 'left'
                        ? 'swipe-reset'
                        : 'enter-from-left'
                }`}
        >
            {/* Restaurant image */}
            <img
                src={restaurant.image}
                alt={restaurant.name}
                className="restaurant-image"
            />

            {/* Restaurant name and info */}
            <h2>{restaurant.name}</h2>
            <p>{restaurant.address}</p>
            <p>{restaurant.info}</p>
            
            


            {/* Action buttons */}
            <div className="buttons">
                <ActionButton label="Pass ❌" onClick={onPass} className="pass-wrapper" />
                <ActionButton label="Like ✅" onClick={onLike} />
                <ActionButton label="Favorite ⭐" onClick={onFavorite} />
            </div>
        </div>
    );
}

export default RestaurantCard;