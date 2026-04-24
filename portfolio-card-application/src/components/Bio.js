function Bio() {
    
    const biotext = "Passionate Frontend Developer with 3 year experience."
    const skills = ["HTML", "CSS", "JavaScript", "React", "Git"];   

    return (
        <div className="bio-section">
            <h3>About Us</h3>
            <p className="bio-text">{biotext}</p>
            <h3>Skills</h3>
            <div className="skills-container">
                {skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                ))}
            </div>
        </div>
    );
}

export default Bio;