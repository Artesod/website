import React, { useState, useEffect } from "react";
import $ from "jquery";
import "./App.scss";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import { Parallax } from 'react-scroll-parallax';

const App = () => {
  const [resume, setResume] = useState({})
  const [info, setInfo] = useState({})
  const [lightMode, setLightMode] = useState(false)
  
  useEffect(() => {

    const loadSharedData = () => {
      $.ajax({
        url: `portfolio_shared_data.json`,
        dataType: "json",
        cache: false,
        success: function (data) {
          setInfo(data)
        },
        error: function (xhr, status, err) {
          alert(err);
        },
      });
    };

    const loadResumeFromPath = (path) => {
      $.ajax({
        url: path,
        dataType: "json",
        cache: false,
        success: function (data) {
          setResume(data)
        },
        error: function (xhr, status, err) {
          alert(err);
        },
      });
    };

    loadSharedData();
    loadResumeFromPath("resume.json");
  }, []);

    return (
      <div>
        <Header sharedData={ info ? info.basic_info : {}} lightMode = {lightMode} setLightMode = {setLightMode}></Header>
        <About
          resumeBasicInfo={resume ? resume.basic_info : {}}
          sharedBasicInfo={ info ? info.basic_info : {}}
          lightMode = {lightMode} setLightMode = {setLightMode}
        />
        <Projects
          resumeProjects={resume.projects ? resume.projects : []}
          resumeBasicInfo={resume.basic_info}
        />
        <Skills
          sharedBasicInfo={ info ? info.basic_info : {}}
          skills={ info ? info.skills : {}}
          lightMode = {lightMode}
        />
        <Experience
          resumeExperience={resume.experience ? resume.experience : []}
          resumeBasicInfo={resume.basic_info}
          lightMode = {lightMode}
        />
        <Footer sharedBasicInfo={info ? info.basic_info : {}} lightMode = {lightMode}/>
      </div>
    );
};

export default App;