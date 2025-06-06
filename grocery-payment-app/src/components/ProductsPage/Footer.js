import React from "react";
import "./Footer.css"; // Ensure you create this CSS file

const Footer = () => {
  return (
    <footer className="footer mt-5 pt-4 border-top text-center text-md-start">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-md-4 mb-3">
            <h5>MyStore Nigeria</h5>
            <p className="text-muted">
              Your one-stop shop for all your daily essentials.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/about" className="text-muted">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted">
                  Contact
                </a>
              </li>
              <li>
                <a href="/faq" className="text-muted">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4 mb-3">
            <h6>Follow Us</h6>
            <a href="https://facebook.com" className="text-muted me-2">
              Facebook
            </a>
            <a href="https://twitter.com" className="text-muted me-2">
              Twitter
            </a>
            <a href="https://instagram.com" className="text-muted">
              Instagram
            </a>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} MyStore Nigeria. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
