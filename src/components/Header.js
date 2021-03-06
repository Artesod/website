import React, { Component } from "react";
import Typical from "react-typical";
import Switch from "react-switch";
import ic from "../scss/themes/logo.png";
import ic2 from "../scss/themes/logo2.png";

class Header extends Component {
  titles = [];

  constructor() {
    super();
    this.state = { checked: false };
    this.onThemeSwitchChange = this.onThemeSwitchChange.bind(this);
  }

  onThemeSwitchChange(checked) {
    this.setState({ checked });
    this.setTheme();
  }

  setTheme() {
    var dataThemeAttribute = "data-theme";
    var body = document.body;
    var newTheme =
      body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
    body.setAttribute(dataThemeAttribute, newTheme);
  }

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [ x.toUpperCase(), 1500 ] ).flat();
    }

    const HeaderTitleTypeAnimation = React.memo( () => {
      return <Typical className="title-styles" steps={this.titles} loop={Infinity} />
    }, (props, prevProp) => true);

    if (this.props.sharedData) {
      var networks = this.props.sharedData.social.map(function (network) {
        return (
          <span key={network.name} className="m-4" id = "tooltip">
            <a href={network.url} target="_blank" rel="noopener noreferrer">
              <i className={network.class} id = "icons"></i>
            </a>
          </span>
        );
      });
    }

    return (
      <header id="home" style={{ height: window.innerHeight, display: 'block'}}>
        <div className="row aligner" style={
          {height: '100%'}}>
          
          <div className="col-md-12">
          
          {this.state.checked? <img className="webicon" src = {ic2}/> : <img className="webicon" src = {ic}/>}
          <div className="social-links">{networks}</div>
            <div className = "mainbody">
              <h1 className="mb-10">
                <Typical steps={[name]} wrapper="p" />
              </h1>

              
              
              <br/>
              
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
              <Switch
                checked={this.state.checked}
                onChange={this.onThemeSwitchChange}
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
}

export default Header;
