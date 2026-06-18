import React from 'react';

function SkillBadge({ skill }) {
  return <span className="skill-badge">{skill}</span>;
}

export default function SkillsSection({ skills }) {
  return (
    <div className="skills-section">
      <h3>Skills</h3>
      <div className="skills-container">
        {skills.map((skill) => (
          <SkillBadge key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}