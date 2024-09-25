import React from 'react';
import test1 from '../assets/images/test11.png';
import test2 from '../assets/images/test2.webp';
import test3 from '../assets/images/test3.png';

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="text-center">What Our Customers Say</h2>
      <div className="testimonials d-flex justify-content-around">
        <div className="testimonial-card">
          <img
            src={test1}
            alt="Customer 1"
            className="testimonial-photo"
          />
          <p className="testimonial-text">
            "UniTel has completely transformed the way I connect with my loved ones. Their service is top-notch!"
          </p>
          <h5 className="testimonial-name">Vanshika</h5>
        </div>
        <div className="testimonial-card">
          <img
            src={test2}
            alt="Customer 2"
            className="testimonial-photo"
          />
          <p className="testimonial-text">
            "The customer support at UniTel is amazing. They helped me find the perfect plan for my needs. Highly recommended!"
          </p>
          <h5 className="testimonial-name">John Smith</h5>
        </div>
        <div className="testimonial-card">
          <img
            src={test3}
            alt="Customer 3"
            className="testimonial-photo"
          />
          <p className="testimonial-text">
            "I love the flexibility and features of UniTel's plans. It's perfect for my busy lifestyle and they come with the best plans."
          </p>
          <h5 className="testimonial-name">Emily Johnson</h5>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
