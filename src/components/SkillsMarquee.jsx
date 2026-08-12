import React from 'react';
import { 
  SiJavascript, 
  SiPython, 
  SiReact, 
  SiNextdotjs, 
  SiNodedotjs, 
  SiExpress,
  SiMongodb,
  SiSolidity
} from 'react-icons/si';

const skills = [
  { name: 'JavaScript', icon: <SiJavascript /> },
  { name: 'Python', icon: <SiPython /> },
  { name: 'React', icon: <SiReact /> },
  { name: 'Next.js', icon: <SiNextdotjs /> },
  { name: 'Node.js', icon: <SiNodedotjs /> },
  { name: 'Express.js', icon: <SiExpress /> },
  { name: 'MongoDB', icon: <SiMongodb /> },
  { name: 'Solidity', icon: <SiSolidity /> },
];

export const SkillsMarquee = () => {
  return (
    <div className="marquee-wrapper">
      <div className="crosshair top-left">+</div>
      <div className="crosshair top-right">+</div>
      <div className="crosshair bottom-left">+</div>
      <div className="crosshair bottom-right">+</div>
      
      <div className="marquee-container">
        <div className="marquee-content">
          {/* We duplicate the array a few times to ensure seamless infinite scrolling */}
          {[...skills, ...skills, ...skills, ...skills].map((skill, index) => (
            <div key={index} className="marquee-item">
              <span className="marquee-icon">{skill.icon}</span>
              <span className="marquee-name">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
