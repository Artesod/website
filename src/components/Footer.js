
import React from 'react';

const Footer = ({ sharedBasicInfo, lightMode }) => {
  let networks;
  if (sharedBasicInfo) {
    networks = sharedBasicInfo.social.map((network) => (
      <span key={network.name} className="m-4" id="tooltip">
        <a href={network.url} target="_blank" rel="noopener noreferrer">
          <i className={network.class} id="icons" style={{color: lightMode ? "black" : "white" }}></i>
        </a>
      </span>
    ));
  }

  return (
    <footer style={{background: lightMode ? "#D7CAAA" : "#656565" }}>
      <div className="col-md-12">
        <div className="social-links">{networks}</div>

        <div className="copyright py-4 text-center" style={{color: lightMode ? "black" : "white" }}>
          <div className="container">
            <small>
              Copyright &copy;{" "}
              {sharedBasicInfo ? sharedBasicInfo.firstName + " " +sharedBasicInfo.lastName : ""}
            </small>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;