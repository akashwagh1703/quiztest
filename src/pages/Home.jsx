import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "./Home.css"; // Custom CSS for animations and hover effects
import SlideReactJs from "../assets/img/slide-reactjs.png";
import SlidePHP from "../assets/img/slide-php.webp";

const Home = () => {
    const navigate = useNavigate();
    const websiteName = "Quiz Test"; // Accessing env variable in JSX

    return (
        <div>
            {/* Header */}
            <header className="bg-gradient text-white">
                <nav className="navbar navbar-expand-lg navbar-light container py-2">
                    <a className="navbar-brand fw-bold fs-2 text-uppercase" href="#">
                        {websiteName}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <a className="nav-link active fs-5" href="#">
                                    Home
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-5" href="#">
                                    About
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-5" href="#">
                                    Services
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link fs-5" href="#">
                                    Contact
                                </a>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <button
                                className="btn btn-outline-primary me-3 px-4 rounded-pill"
                                onClick={() => navigate("/user-login")}
                            >
                                Login
                            </button>
                            <button
                                className="btn btn-primary px-4 rounded-pill"
                                onClick={() => navigate("/user-register")}
                            >
                                Signup
                            </button>
                        </div>
                    </div>
                </nav>
            </header>

            {/* Slideshow / Carousel */}
            <section id="carousel" className="container-fluid my-5 p-0">
                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="0"
                            className="active"
                            aria-current="true"
                            aria-label="Slide 1"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="1"
                            aria-label="Slide 2"
                        ></button>
                        <button
                            type="button"
                            data-bs-target="#carouselExampleIndicators"
                            data-bs-slide-to="2"
                            aria-label="Slide 3"
                        ></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img
                                src={SlideReactJs}
                                className="d-block w-100"
                                alt="PHP"
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Innovative Tech Solutions</h5>
                                <p>Explore our groundbreaking technology solutions tailored for your business.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={SlidePHP}
                                className="d-block w-100"
                                alt="React"
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>Next-gen Web Development</h5>
                                <p>Building the future of the web with scalable and responsive solutions.</p>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <img
                                src={SlideReactJs}
                                className="d-block w-100"
                                alt="PHP"
                            />
                            <div className="carousel-caption d-none d-md-block">
                                <h5>AI-Powered Insights</h5>
                                <p>Unlock the potential of AI to gain deeper insights and make smarter decisions.</p>
                            </div>
                        </div>
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="prev"
                    >
                        <span
                            className="carousel-control-prev-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next"
                        type="button"
                        data-bs-target="#carouselExampleIndicators"
                        data-bs-slide="next"
                    >
                        <span
                            className="carousel-control-next-icon"
                            aria-hidden="true"
                        ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </section>

            {/* Main Content */}
            <main className="container my-5">
                <h2 className="text-center mb-4 fw-bold">Our Services</h2>
                <p className="text-center text-muted mb-5">
                    Explore our wide range of services crafted to meet your needs.
                </p>
                <div className="row g-4">
                    {["Web Development", "App Development", "Cloud Services"].map(
                        (service, index) => (
                            <div className="col-md-4" key={index}>
                                <div className="card service-card shadow-sm h-100">
                                    <div className="card-body text-center">
                                        <div className="icon mb-3">
                                            <i
                                                className={`bi bi-${index % 2 === 0 ? "gem" : "lightning-charge"
                                                    } text-primary fs-1`}
                                            ></i>
                                        </div>
                                        <h5 className="card-title fw-bold">{service}</h5>
                                        <p className="card-text text-muted">
                                            Discover amazing features and unparalleled value in our {service}.
                                        </p>
                                        <a href="#" className="btn btn-primary rounded-pill">
                                            Learn More
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="footer bg-dark text-white py-5">
                <div className="container text-center">
                    <h5 className="fw-bold">{websiteName}</h5>
                    <p className="small text-muted mb-4">
                        Delivering excellence, one service at a time.
                    </p>
                    <div className="d-flex justify-content-center mb-3">
                        <a href="#" className="btn btn-outline-light btn-sm mx-2 rounded-circle">
                            <i className="bi bi-twitter"></i>
                        </a>
                        <a href="#" className="btn btn-outline-light btn-sm mx-2 rounded-circle">
                            <i className="bi bi-facebook"></i>
                        </a>
                        <a href="#" className="btn btn-outline-light btn-sm mx-2 rounded-circle">
                            <i className="bi bi-instagram"></i>
                        </a>
                    </div>
                    <p className="small mb-0">&copy; 2025 {websiteName}. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
