import React, { useState } from 'react';
import './PortfolioCard.css';

const SkillBadge = ({ skill }) => (
  <span className="skill-badge">{skill}</span>
);

const PortfolioCard = () => {

  const [likes, setLikes] = useState(128);
  
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const profilePhotos = [
    "/images/avatarimg.jpg", 
    "/images/avatarimg.jpg", 
    "/images/avatarimg.jpg", 
    "/images/avatarimg.jpg"
  ];

  const skills = ["Design Systems", "React", "TypeScript", "Figma", "Prototyping", "Accessibility"];

  const toggleTheme = () => setIsDarkMode(!isDarkMode);
  
  const nextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % profilePhotos.length);
  };

  const prevPhoto = () => {
    setPhotoIndex((prev) => (prev === 0 ? profilePhotos.length - 1 : prev - 1));
  };

  const handleContact = () => {
    alert("Thank you for reaching out to TuteDude!");
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <div className="portfolio-card">
        <div className="card-header">
          <img 
            src={profilePhotos[photoIndex]} 
            alt="Profile" 
            className="profile-img" 
          />
          <div className="header-text">
            <h2>John Alexender</h2>
            <p className="title">Product Designer & Frontend Engineer</p>
          </div>
        </div>

        <p className="bio">
          I design and build calm, focused product experiences for fast-moving teams. 
          Currently exploring AI-assisted interfaces and high-performance UI engineering.
        </p>

        <div className="bio-section">
            <h3 className="bio">Skills</h3>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                ))}
            </div>
        </div>

        <div className="card-footer">
          <div className="footer-left">
            <button className="icon-btn" onClick={toggleTheme}>
              {isDarkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            
            <div className="pagination">
              <button onClick={prevPhoto}>&lt;</button>
              <span>{photoIndex + 1} / 4</span>
              <button onClick={nextPhoto}>&gt;</button>
            </div>
          </div>

          <div className="footer-right">
            <button className="like-btn" onClick={() => setLikes(likes + 1)}>
              ❤️ {likes}
            </button>
            <button className="contact-btn" onClick={handleContact}>
              📩 Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;