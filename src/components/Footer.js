import React from "react"

function Footer() {
  return (
    <div className="site-footer">
      <h4 className="text-center">Code Blog</h4>
      <p className="text-center">Follow us on social media</p>
      <div className="footer-social-links">
        <ul className="social-links-list">
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              className="facebook"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              className="twitter"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter fa-2x"></i>
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              className="instagram"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram fa-2x"></i>
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              className="google"
              rel="noopener noreferrer"
            >
              <i className="fab fa-google fa-2x"></i>
            </a>
          </li>
          <li>
            <a
              href="https://facebook.com"
              target="_blank"
              className="linkedin"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin fa-2x"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
