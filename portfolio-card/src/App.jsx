import React, { useState } from 'react';
import ThemeToggle from './components/ThemeToggle';
import ProfileHeader from './components/ProfileHeader';
import SkillsSection from './components/SkillsSection';
import CardFooter from './components/CardFooter';
import './App.css';

const SKILLS = ['Design Systems', 'React', 'TypeScript', 'Figma', 'Prototyping', 'Accessibility'];
const PHOTOS = [
  'https://ui-avatars.com/api/?name=Tute+Dude&background=random&size=150',
  'https://ui-avatars.com/api/?name=Product+Designer&background=random&size=150',
  'https://ui-avatars.com/api/?name=Frontend+Eng&background=random&size=150',
  'https://ui-avatars.com/api/?name=Web+Dev&background=random&size=150'
];

export default function App() {
  const [isDark, setIsDark] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [likes, setLikes] = useState(128);
  const [isLiked, setIsLiked] = useState(false);

  const toggleTheme = () => setIsDark(!isDark);
  const handleNextPhoto = () => setPhotoIndex((prev) => (prev + 1) % PHOTOS.length);
  const handlePrevPhoto = () => setPhotoIndex((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);
  const handleContact = () => alert('Contact form opened!');
  
  const handleLike = () => {
    setLikes(isLiked ? likes - 1 : likes + 1);
    setIsLiked(!isLiked);
  };

  return (
    <div className={`app-container ${isDark ? 'dark-theme' : 'light-theme'}`}>
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

      <div className="portfolio-card">
        <ProfileHeader 
          photoUrl={PHOTOS[photoIndex]} 
          name="TuteDude" 
          title="Product Designer & Frontend Engineer" 
        />

        <p className="bio">
          I design and build calm, focused product experiences for fast-moving teams. 
          Currently exploring AI-assisted interfaces, design systems, and high-performance UI engineering.
        </p>

        <SkillsSection skills={SKILLS} />

        <CardFooter 
          isDark={isDark}
          photoIndex={photoIndex}
          totalPhotos={PHOTOS.length}
          handlePrev={handlePrevPhoto}
          handleNext={handleNextPhoto}
          likes={likes}
          isLiked={isLiked}
          handleLike={handleLike}
          handleContact={handleContact}
        />
      </div>
    </div>
  );
}