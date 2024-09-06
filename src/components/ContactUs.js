import React from 'react';
//import Navbar from './Navbar';

const ContactUs = () => {
  return (
    <div>
   
    <div className="contact-us-container">
        <br></br>
      <h2 className="text-center">Contact Us</h2>
      <div className="contact-us-content d-flex justify-content-between">
        <div className="contact-form">
          <h3>Get in Touch</h3>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" className="form-control" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <input type="email" className="form-control" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea className="form-control" id="message" rows="5" placeholder="Enter your message"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
        <div className="contact-info">
          <h3>Contact Information</h3>
          <p><strong>Phone:</strong> +1 234 567 890</p>
          <p><strong>Email:</strong> unitel.mail.service@gmail.com</p>
          <p><strong>Address:</strong> Emabssy Tech Village, Bangalore, India, 560103</p>
          <p>Feel free to reach out to us with any questions or concerns. We're here to help!</p>
        </div>
      </div>
      <br></br>
    </div>
    <br></br>
    </div>
  );
}

export default ContactUs;
