import React from 'react';

const Testimonials = () => {
  return (
    <div className="testimonials-container">
      <h2 className="text-center">What Our Customers Say</h2>
      <div className="testimonials d-flex justify-content-around">
        <div className="testimonial-card">
          <img
            src="https://www.gsma.com/about-us/wp-content/uploads/2023/04/vicki-brady-450x450-1.jpg"
            alt="Customer 1"
            className="testimonial-photo"
          />
          <p className="testimonial-text">
            "UniTel has completely transformed the way I connect with my loved ones. Their plans are affordable, and the service is top-notch!"
          </p>
          <h5 className="testimonial-name">Vicki Brady</h5>
        </div>
        <div className="testimonial-card">
          <img
            src="https://www.workitdaily.com/media-library/happy-successful-professional-man-holding-a-tablet.jpg?id=25967282&width=980"
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
            src="https://img.freepik.com/free-photo/smiley-businesswoman-posing-outdoors-with-arms-crossed-copy-space_23-2148767055.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1725321600&semt=ais_hybrid"
            alt="Customer 3"
            className="testimonial-photo"
          />
          <p className="testimonial-text">
            "I love the flexibility and features of UniTel's plans. It's perfect for my busy lifestyle."
          </p>
          <h5 className="testimonial-name">Emily Johnson</h5>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
