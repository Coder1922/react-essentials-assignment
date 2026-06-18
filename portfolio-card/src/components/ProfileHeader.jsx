import React from 'react';

export default function ProfileHeader({ photoUrl, name, title }) {
  return (
    <div className="profile-header">
      <img src={photoUrl} alt="Profile" className="profile-img" />
      <div className="profile-titles">
        <h1>{name}</h1>
        <h2>{title}</h2>
      </div>
    </div>
  );
}