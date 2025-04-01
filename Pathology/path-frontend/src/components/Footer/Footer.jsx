import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* About Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Pathology Lab</h3>
          <p className="footer-text">
            Providing accurate and timely diagnostic services with cutting-edge technology and expert pathologists.
          </p>
          <div className="social-icons">
            <a href="#" className="social-link"><FaFacebook /></a>
            <a href="#" className="social-link"><FaTwitter /></a>
            <a href="#" className="social-link"><FaInstagram /></a>
            <a href="#" className="social-link"><FaLinkedin /></a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Home</a></li>
            <li><a href="#" className="footer-link">Services</a></li>
            <li><a href="#" className="footer-link">Tests</a></li>
            <li><a href="#" className="footer-link">About Us</a></li>
            <li><a href="#" className="footer-link">Contact</a></li>
          </ul>
        </div>

        {/* Services Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Our Services</h3>
          <ul className="footer-links">
            <li><a href="#" className="footer-link">Blood Tests</a></li>
            <li><a href="#" className="footer-link">Biopsy</a></li>
            <li><a href="#" className="footer-link">Urine Analysis</a></li>
            <li><a href="#" className="footer-link">Hormone Tests</a></li>
            <li><a href="#" className="footer-link">Genetic Testing</a></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-column">
          <h3 className="footer-heading">Contact Us</h3>
          <div className="contact-info">
            <div className="contact-item">
              <FaMapMarkerAlt className="contact-icon" />
              <span>123 Medical Drive, Health City, HC 12345</span>
            </div>
            <div className="contact-item">
              <FaPhoneAlt className="contact-icon" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <FaEnvelope className="contact-icon" />
              <span>info@pathologylab.com</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Pathology Lab. All Rights Reserved.</p>
        <div className="legal-links">
          <a href="#" className="legal-link">Privacy Policy</a>
          <a href="#" className="legal-link">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;