// ChooseUs.js

import React from 'react';
import '../Styles/ChooseUs.css'; // Make sure to update the styles as shown below

const ChooseUs = () => {
    return (
        <section className="choose-us">
            <div className="container">
                <div className="row align-items-center">
                    {/* Left Section for Why Choose Us */}
                    <div className="col-lg-6">
                        <div className="choose-us-text">
                            <h2>Why<br></br> Choose Us?</h2>
                        </div>
                        <p className="section-subtitle">Empowering your connections with reliable and affordable services.</p>
                    </div>

                    {/* Right Section for Cards */}
                    <div className="col-lg-6">
                        <div className="row cont">
                            {/* Small Cards */}
                            <div className="col-sm-6">
                                <div className="card choose-card">
                                    <div className="card-body1">
                                        <div className="icon mb-3">
                                            <i className="fas fa-wifi fa-2x"></i>
                                        </div>
                                        <h5 className="card-title1">Reliable Network</h5>
                                        <p className="card-text1">Seamless communication, reliable connection.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card choose-card">
                                    <div className="card-body1">
                                        <div className="icon mb-3">
                                            <i className="fas fa-dollar-sign fa-2x"></i>
                                        </div>
                                        <h5 className="card-title1">Affordable Plans</h5>
                                        <p className="card-text1">Great value without compromise.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card choose-card">
                                    <div className="card-body1">
                                        <div className="icon mb-3">
                                            <i className="fas fa-headset fa-2x"></i>
                                        </div>
                                        <h5 className="card-title1">24/7 Support</h5>
                                        <p className="card-text1">We're always here to assist you.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card choose-card">
                                    <div className="card-body1">
                                        <div className="icon mb-3">
                                            <i className="fas fa-shield-alt fa-2x"></i>
                                        </div>
                                        <h5 className="card-title1">Secure & Private</h5>
                                        <p className="card-text1">Your data is always safe with us.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> {/* End of right section */}
                </div>
            </div>
        </section>
    );
}

export default ChooseUs;



/*import React from 'react';
import '../Styles/ChooseUs.css'; // Import the custom styles

const ChooseUs = () => {
    return (
        <section className="choose-us-section text-center">
            <div className="container">
                <h2 className="section-title">Why Choose UniTel?</h2>
                <p className="section-subtitle">Empowering your connections with reliable and affordable telecom services.</p>
                
                <div className="row mt-5">
                    
                    <div className="col-lg-4">
                        <div className="card choose-us-card">
                            <div className="card-body">
                                <div className="icon mb-3">
                                    <i className="fas fa-wifi fa-3x"></i>
                                </div>
                                <h5 className="card-title">Reliable Network</h5>
                                <p className="card-text">
                                    Stay connected anytime, anywhere with our reliable network coverage, providing seamless communication.
                                </p>
                            </div>
                        </div>
                    </div>

                   
                    <div className="col-lg-4">
                        <div className="card choose-us-card">
                            <div className="card-body">
                                <div className="icon mb-3">
                                    <i className="fas fa-dollar-sign fa-3x"></i>
                                </div>
                                <h5 className="card-title">Affordable Plans</h5>
                                <p className="card-text">
                                    Get the best deals on telecom services without breaking the bank. Flexible and affordable plans for everyone.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card choose-us-card">
                            <div className="card-body">
                                <div className="icon mb-3">
                                    <i className="fas fa-headset fa-3x"></i>
                                </div>
                                <h5 className="card-title">24/7 Customer Support</h5>
                                <p className="card-text">
                                    Our dedicated support team is available round the clock to assist you with any queries or issues.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ChooseUs;*/
