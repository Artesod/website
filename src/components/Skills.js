import React, {useEffect} from "react";
import Style from "../scss/about-module.scss"
import Terminal from "./Terminal";

export default function Skills(props) {
  const {
    skills,
    sharedBasicInfo
  } = props

  let colors = ['rgb(0,255,164)', 'rgb(166,104,255)'];

  const skillsSection = (skill) => {
    const keyName = Object.keys(skill)[0];
    const values = skill[keyName];

    return (
      <div key={keyName}>
        <p style={{ color: colors[0] }}> {keyName}</p>
        <ul className="skills" style={{color: 'white'}}>
          {values.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
    );
  };

  function skillsText() {
    return (
      <>
        <p  style={{color: 'white'}}>
          <span style={{ color: colors[0] }}>
            {sharedBasicInfo ? sharedBasicInfo.firstName.toLowerCase() : ""}
            {sharedBasicInfo ? sharedBasicInfo.lastName.toLowerCase() : ""} $
          </span>{' '}
          cd skills
        </p>
        <p style={{color: 'white'}}>
          <span style={{ color: colors[0] }}>
            skills <span className={Style.green}>(main)</span> $
          </span>{' '}
          ls
        </p>
        {skills !== undefined ? Object.keys(skills).map((key) => {
          return skillsSection({ [key]: skills[key] });
        }) : <></>}
      </>
    );
  }

  return (
    <section id="skills">
      <Terminal text={skillsText()} {...props}/>
    </section>
  );
};