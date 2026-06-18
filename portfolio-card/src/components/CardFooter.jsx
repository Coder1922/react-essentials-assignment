import React from 'react';

export default function CardFooter({ 
  isDark, photoIndex, totalPhotos, handlePrev, handleNext, likes, isLiked, handleLike, handleContact 
}) {
  return (
    <div className="card-footer">
      <div className="footer-controls">
        <span className="theme-indicator">{isDark ? '☾ Dark Mode' : '☼ Light Mode'}</span>
        <div className="photo-controls">
          <button onClick={handlePrev}>&lt;</button>
          <button onClick={handleNext}>&gt;</button>
          <span>{photoIndex + 1} / {totalPhotos}</span>
        </div>
      </div>
      
      <div className="action-buttons">
        <button className={`like-btn ${isLiked ? 'liked' : ''}`} onClick={handleLike}>
          {isLiked ? '♥' : '♡'} {likes}
        </button>
        <button className="contact-btn" onClick={handleContact}>
          ✉ Contact
        </button>
      </div>
    </div>
  );
}