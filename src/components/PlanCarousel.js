import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import plan1 from '../assets/images/plan1.jpg';
import plan2 from '../assets/images/plan2.jpg';
import plan3 from '../assets/images/plan3.jpg';
import plan4 from '../assets/images/plan4.jpg';

const PlanCarousel = () => {
  const navigate = useNavigate();

  const handleGetPlan=(categoryId)=>{
    navigate(`/total-plans?category=${categoryId}`);
  }
  return (
    <Carousel className="plan-carousel-container">
      
      <Carousel.Item>
        <div className="carousel-item-container">
          <div className="carousel-text">
            <h3>Adventure Enthusiast Plan</h3>
            <p>10GB data, 100 minutes international and more. Only Rs.999/month.</p>
            <button className="btn btn-primary" onClick={() => handleGetPlan('Personal Plans')}>See More Plans</button>
          </div>
          <img
            className="carousel-image"
            src={plan1}
            alt="First plan"
          />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-container">
          <div className="carousel-text">
            <h3>Startup Booster Plan</h3>
            <p>200GB data, Free Business Tools and more. Only Rs.2999/month.</p>
            <button className="btn btn-primary" onClick={() => handleGetPlan('Business Plans')}>See More Plans</button>
          </div>
          <img
            className="carousel-image"
            src={plan2}
            alt="Second plan"
          />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-container">
          <div className="carousel-text">
            <h3>Innovation Hub Plan</h3>
            <p>50TB data, Free R&D support and more. Only Rs.199999/month.</p>
            <button className="btn btn-primary" onClick={() => handleGetPlan('Enterprise Plans')}>See More Plans</button>
          </div>
          <img
            className="carousel-image"
            src={plan3}
            alt="Third plan"
          />
        </div>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carousel-item-container">
          <div className="carousel-text">
            <h3>Education Plan</h3>
            <p>10TB data, free Educational platforms and more. Only Rs.59999/month.</p>
            <button className="btn btn-primary" onClick={() => handleGetPlan('Government Plans')}>See More Plans</button>
          </div>
          <img
            className="carousel-image"
            src={plan4}
            alt="Fourth plan"
          />
        </div>
      </Carousel.Item>
    </Carousel>
    
  );
};

export default PlanCarousel;


//"https://images.pexels.com/photos/4909462/pexels-photo-4909462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//"https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//"https://images.pexels.com/photos/5685937/pexels-photo-5685937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
//"https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"