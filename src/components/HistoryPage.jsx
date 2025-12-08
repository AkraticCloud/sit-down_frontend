import React, { useState } from 'react';
import './HistoryPage.css';
import { Clock, Heart, Star, X as XIcon } from 'lucide-react';
import { Link } from "react-router-dom";
import Logo from './Logo.jsx';

function HistoryPage() {
    const [activeFilter, setActiveFilter] = useState('all');;
    const [mockHistory, setHistory] = useState(JSON.parse(localStorage.getItem("history")) || [])

    const filteredHistory =
        activeFilter === 'all'
            ? mockHistory
            : mockHistory.filter(item => item.status === activeFilter);

    const renderStatusPill = (status) => {
        if (status === 'liked') {
            return (
                <span className="history-status history-status-liked">
                    <Heart size={14} /> Liked
                </span>
            );
        }
        if (status === 'favorite') {
            return (
                <span className="history-status history-status-favorite">
                    <Star size={14} /> Favorited
                </span>
            );
        }
        return (
            <span className="history-status history-status-passed">
                <XIcon size={14} /> Passed
            </span>
        );
    };

    return (
        <div className="history-page">
            <div className="history-container">

                {/* Header */}
                <header className="history-header">
                    <div className="history-logo-circle">
                        <svg className="history-logo-icon" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z"
                                fill="white"
                            />
                        </svg>
                    
                    </div>

                    <div className="history-title-box">
                        <h1 className="history-title">Swipe History</h1>
                        <p className="history-subtitle">
                            Review places you’ve liked, favorited, or passed on.
                        </p>
                    </div>
                </header>

                {/* Filter chips */}
                <div className="history-filters">
                    <button
                        className={`history-filter-chip ${activeFilter === 'all' ? 'chip-active' : ''}`}
                        onClick={() => setActiveFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`history-filter-chip ${activeFilter === 'liked' ? 'chip-active' : ''}`}
                        onClick={() => setActiveFilter('liked')}
                    >
                        Liked
                    </button>
                    <button
                        className={`history-filter-chip ${activeFilter === 'favorite' ? 'chip-active' : ''}`}
                        onClick={() => setActiveFilter('favorite')}
                    >
                        Favorited
                    </button>
                    <button
                        className={`history-filter-chip ${activeFilter === 'passed' ? 'chip-active' : ''}`}
                        onClick={() => setActiveFilter('passed')}
                    >
                        Passed
                    </button>
                    <button 
                        className='history-filter-chip'
                        onClick={ () =>{
                            localStorage.clear(); 
                            console.log("test")
                            setHistory([])
                    }}>Clear</button>
                </div>

                {/* History list */}
                <div className="history-list">
                    {filteredHistory.map(item => (
                        <article key={`${item.name}-${item.time}-${idx}`} className="history-card">
                            <div className="history-image-wrapper">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="history-image"
                                />
                            </div>

                            <div className="history-card-body">
                                <div className="history-card-header-row">
                                    <div>
                                        <h2 className="history-restaurant-name">{item.name}</h2>
                                        <p className="history-restaurant-info">{item.info}</p>
                                    </div>
                                    {renderStatusPill(item.status)}
                                </div>

                                <div className="history-meta-row">
                                    <span className="history-meta">
                                        <Clock size={14} />
                                        {item.time}
                                    </span>
                                    <span className="history-meta">
                                        📍 {item.location}
                                    </span>
                                </div>
                            </div>
                        </article>
                    ))}

                    {filteredHistory.length === 0 && (
                        <div className="history-empty">
                            No restaurants in this category yet. Start swiping on the home
                            page to build your history.
                        </div>
                    )}
                </div>
             {/* Footer Navigation */}
            <div className="footer-bar history-footer">
                <Link to="/home">
                    <md-filled-button>Home</md-filled-button>
                </Link>

                <Link to="/favorites">
                    <md-filled-button>Favorites</md-filled-button>
                </Link>

                <Link to="/settings">
                    <md-filled-button>Settings</md-filled-button>
                </Link>
            </div>
            </div>
        </div>
    );
}

export default HistoryPage;