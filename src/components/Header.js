import React, { useState, useEffect } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import ic from "../scss/themes/logo.png";
import ic2 from "../scss/themes/logo2.png";

const Header = (props) => {
  const{
    sharedData,
    setLightMode,
    lightMode
  } = props
  const [checked, setChecked] = useState(false);
  const [titles, setTitles] = useState([]);
  const [name, setName ] = useState([])

  useEffect(() => {
    if (sharedData) {
      setTitles(sharedData.titles.map(x => [x.toUpperCase(), 1500]).flat());

      let fullName = sharedData.firstName + " " + sharedData.lastName
      setName(fullName.split('').map(x => [x, 1500]).flat());
    }
  }, [sharedData]);

  const onThemeSwitchChange = (checked) => {
    setChecked(checked);
    setTheme();
  };

  const setTheme = () => {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    let mode = body.getAttribute(dataThemeAttribute)
    var newTheme =
      mode === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
    setLightMode(newTheme === "light" ? true : false)

  };

  const HeaderTitleTypeAnimation = React.memo(() => {
    return <Typical className="title-styles" steps={titles} loop={999} />;
  }, (props, prevProp) => true);

  let networks;
  if (sharedData) {
    networks = sharedData.social.map(function (network) {
      return (
        <span key={network.name} className="m-4" id="tooltip">
          <a href={network.url} target="_blank" rel="noopener noreferrer">
            <i className={network.class} id="icons"></i>
          </a>
        </span>
      );
    });
  }

    return (
      <header id="home" style={{ height: window.innerHeight, display: 'flex', flexDirection: 'column'}}>
        <div className="row aligner" style={
          {height: '100%'}}>
          
          <div className="col-md-12">
          
          {checked? <img className="webicon" src = {ic2}/> : <img className="webicon" src = {ic}/>}
          <div className="social-links">{networks}</div>
            <div className = "mainbody">
              <h1 className="mb-10">
                <Typical steps={["Joshua Canta"]}/>
              </h1>

              
              
              <br/>
              
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              <Switch
                checked={checked}
                onChange={onThemeSwitchChange}
                offColor="#baaa80"
                onColor="#353535"
                className="react-switch mx-auto"
                width={90}
                height={40}
                uncheckedIcon={
                  <span
                    className="iconify"
                    data-icon="twemoji:owl"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "20px",
                      color: "#353239",
                    }}
                  ></span>
                }
                checkedIcon={
                  <span
                    className="iconify"
                    data-icon="noto-v1:sun-with-face"
                    data-inline="false"
                    style={{
                      display: "block",
                      height: "100%",
                      fontSize: 25,
                      textAlign: "end",
                      marginLeft: "10px",
                      color: "#353239",
                    }}
                  ></span>
                }
                id="icon-switch"
              />
            </div>
          </div>
        </div>
      </header>
    );
}

export default Header;
