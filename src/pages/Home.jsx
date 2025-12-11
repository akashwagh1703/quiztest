import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import { WEBSITE_NAME } from "../config/Constant";

const Home = () => {
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const features = [
        {
            icon: "bi-lightning-charge-fill",
            title: "Quick Quizzes",
            description: "Take timed quizzes and test your knowledge in various technologies",
            color: "#667eea"
        },
        {
            icon: "bi-graph-up-arrow",
            title: "Track Progress",
            description: "Monitor your performance with detailed analytics and history",
            color: "#764ba2"
        },
        {
            icon: "bi-trophy-fill",
            title: "Earn Achievements",
            description: "Complete quizzes and achieve mastery in different domains",
            color: "#f093fb"
        },
        {
            icon: "bi-code-slash",
            title: "Multiple Technologies",
            description: "React, PHP, Full Stack, AI - choose your expertise area",
            color: "#4facfe"
        }
    ];

    const quizCategories = [
        {
            name: "React.js",
            icon: "bi-filetype-jsx",
            questions: "50+ Questions",
            difficulty: "Intermediate",
            color: "#61dafb",
            gradient: "linear-gradient(135deg, #61dafb 0%, #21a1c4 100%)"
        },
        {
            name: "PHP",
            icon: "bi-filetype-php",
            questions: "45+ Questions",
            difficulty: "Advanced",
            color: "#777bb3",
            gradient: "linear-gradient(135deg, #777bb3 0%, #4f5b93 100%)"
        },
        {
            name: "Full Stack",
            icon: "bi-layers-fill",
            questions: "60+ Questions",
            difficulty: "Expert",
            color: "#ff6b6b",
            gradient: "linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)"
        },
        {
            name: "AI & Bots",
            icon: "bi-robot",
            questions: "40+ Questions",
            difficulty: "Advanced",
            color: "#4ecdc4",
            gradient: "linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%)"
        }
    ];

    const stats = [
        { number: "1000+", label: "Active Users" },
        { number: "50K+", label: "Quizzes Taken" },
        { number: "4.8/5", label: "Average Rating" },
        { number: "200+", label: "Total Questions" }
    ];

    return (
        <div className="home-container">
            {/* Modern Navigation Header */}
            <header className={`home-header ${scrolled ? 'scrolled' : ''}`}>
                <nav className="nav-container">
                    <div className="nav-brand">
                        <i className="bi bi-trophy-fill"></i>
                        <span>{WEBSITE_NAME}</span>
                    </div>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#features">Features</a></li>
                        <li><a href="#categories">Categories</a></li>
                        <li><a href="#about">About</a></li>
                    </ul>
                    <div className="nav-buttons">
                        <button className="btn-ghost" onClick={() => navigate("/user-login")}>
                            Sign In
                        </button>
                        <button className="btn-primary" onClick={() => navigate("/user-register")}>
                            Get Started
                        </button>
                    </div>
                </nav>
            </header>

            {/* Hero Section */}
            <section id="home" className="hero-section">
                <div className="hero-content">
                    <div className="hero-badge">
                        <i className="bi bi-star-fill"></i>
                        <span>Test Your Knowledge Today</span>
                    </div>
                    <h1 className="hero-title">
                        Master Your Skills with
                        <span className="gradient-text"> Interactive Quizzes</span>
                    </h1>
                    <p className="hero-subtitle">
                        Challenge yourself with our comprehensive quiz platform. Track your progress,
                        compete with others, and become an expert in your field.
                    </p>
                    <div className="hero-buttons">
                        <button className="btn-hero-primary" onClick={() => navigate("/user-register")}>
                            <span>Start Learning</span>
                            <i className="bi bi-arrow-right"></i>
                        </button>
                        <button className="btn-hero-secondary" onClick={() => navigate("/user-login")}>
                            <i className="bi bi-play-circle-fill"></i>
                            <span>Watch Demo</span>
                        </button>
                    </div>
                    <div className="hero-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="stat-item">
                                <div className="stat-number">{stat.number}</div>
                                <div className="stat-label">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="hero-image">
                    <div className="floating-card card-1">
                        <i className="bi bi-code-slash"></i>
                        <span>HTML & CSS</span>
                    </div>
                    <div className="floating-card card-2">
                        <i className="bi bi-braces"></i>
                        <span>JavaScript</span>
                    </div>
                    <div className="floating-card card-3">
                        <i className="bi bi-database"></i>
                        <span>Database</span>
                    </div>
                    <div className="hero-illustration">
                        <div className="illustration-circle circle-1"></div>
                        <div className="illustration-circle circle-2"></div>
                        <div className="illustration-circle circle-3"></div>
                        <i className="bi bi-mortarboard-fill main-icon"></i>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Why Choose QuizTest?</h2>
                    <p className="section-subtitle">
                        Powerful features to help you learn and grow
                    </p>
                </div>
                <div className="features-grid">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card">
                            <div className="feature-icon" style={{ backgroundColor: feature.color }}>
                                <i className={feature.icon}></i>
                            </div>
                            <h3 className="feature-title">{feature.title}</h3>
                            <p className="feature-description">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quiz Categories Section */}
            <section id="categories" className="categories-section">
                <div className="section-header">
                    <h2 className="section-title">Explore Quiz Categories</h2>
                    <p className="section-subtitle">
                        Choose from a wide range of technology topics
                    </p>
                </div>
                <div className="categories-grid">
                    {quizCategories.map((category, index) => (
                        <div key={index} className="category-card">
                            <div className="category-header" style={{ background: category.gradient }}>
                                <i className={category.icon}></i>
                            </div>
                            <div className="category-body">
                                <h3 className="category-name">{category.name}</h3>
                                <div className="category-meta">
                                    <span className="category-questions">
                                        <i className="bi bi-collection"></i>
                                        {category.questions}
                                    </span>
                                    <span className={`category-difficulty ${category.difficulty.toLowerCase()}`}>
                                        {category.difficulty}
                                    </span>
                                </div>
                                <button className="btn-category" onClick={() => navigate("/user-register")}>
                                    Start Quiz
                                    <i className="bi bi-arrow-right"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Call to Action Section */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2 className="cta-title">Ready to Test Your Knowledge?</h2>
                    <p className="cta-subtitle">
                        Join thousands of learners improving their skills every day
                    </p>
                    <button className="btn-cta" onClick={() => navigate("/user-register")}>
                        Get Started for Free
                        <i className="bi bi-arrow-right-circle-fill"></i>
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="home-footer">
                <div className="footer-content">
                    <div className="footer-section">
                        <div className="footer-brand">
                            <i className="bi bi-trophy-fill"></i>
                            <span>{WEBSITE_NAME}</span>
                        </div>
                        <p className="footer-description">
                            Empowering developers with knowledge through interactive quizzes
                        </p>
                        <div className="social-links">
                            <a href="#" className="social-link"><i className="bi bi-github"></i></a>
                            <a href="#" className="social-link"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="social-link"><i className="bi bi-linkedin"></i></a>
                            <a href="#" className="social-link"><i className="bi bi-youtube"></i></a>
                        </div>
                    </div>
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#home">Home</a></li>
                            <li><a href="#features">Features</a></li>
                            <li><a href="#categories">Categories</a></li>
                            <li><a href="#about">About Us</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Resources</h4>
                        <ul>
                            <li><a href="#">Documentation</a></li>
                            <li><a href="#">Tutorials</a></li>
                            <li><a href="#">Blog</a></li>
                            <li><a href="#">Support</a></li>
                        </ul>
                    </div>
                    <div className="footer-section">
                        <h4>Legal</h4>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; 2025 {WEBSITE_NAME}. All rights reserved.</p>
                </div>
            </footer>

            <style jsx>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                .home-container {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    overflow-x: hidden;
                }

                /* Header Styles */
                .home-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    padding: 20px 0;
                    background: transparent;
                    transition: all 0.3s ease;
                }

                .home-header.scrolled {
                    background: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
                    padding: 15px 0;
                }

                .nav-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 30px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .nav-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 24px;
                    font-weight: 700;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .nav-brand i {
                    font-size: 28px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .nav-links {
                    display: flex;
                    gap: 40px;
                    list-style: none;
                }

                .nav-links a {
                    color: #333;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    position: relative;
                }

                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    transition: width 0.3s ease;
                }

                .nav-links a:hover::after {
                    width: 100%;
                }

                .nav-buttons {
                    display: flex;
                    gap: 15px;
                }

                .btn-ghost {
                    padding: 10px 24px;
                    background: transparent;
                    border: 2px solid #667eea;
                    color: #667eea;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-ghost:hover {
                    background: #667eea;
                    color: white;
                    transform: translateY(-2px);
                }

                .btn-primary {
                    padding: 10px 24px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
                }

                /* Hero Section */
                .hero-section {
                    min-height: 100vh;
                    padding: 120px 30px 80px;
                    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 60px;
                    position: relative;
                    overflow: hidden;
                }

                .hero-content {
                    flex: 1;
                    max-width: 600px;
                    animation: fadeInLeft 0.8s ease-out;
                }

                @keyframes fadeInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .hero-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 20px;
                    background: white;
                    border-radius: 50px;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                    margin-bottom: 30px;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }

                .hero-badge i {
                    color: #ffc107;
                }

                .hero-title {
                    font-size: 56px;
                    font-weight: 800;
                    line-height: 1.2;
                    margin-bottom: 24px;
                    color: #1a1a2e;
                }

                .gradient-text {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .hero-subtitle {
                    font-size: 18px;
                    line-height: 1.6;
                    color: #666;
                    margin-bottom: 40px;
                }

                .hero-buttons {
                    display: flex;
                    gap: 20px;
                    margin-bottom: 60px;
                }

                .btn-hero-primary {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-hero-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(102, 126, 234, 0.4);
                }

                .btn-hero-secondary {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 16px 32px;
                    background: white;
                    border: 2px solid #e0e0e0;
                    color: #333;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-hero-secondary:hover {
                    border-color: #667eea;
                    color: #667eea;
                    transform: translateY(-3px);
                }

                .hero-stats {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 30px;
                }

                .stat-item {
                    text-align: center;
                }

                .stat-number {
                    font-size: 32px;
                    font-weight: 800;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .stat-label {
                    font-size: 14px;
                    color: #666;
                    margin-top: 5px;
                }

                .hero-image {
                    flex: 1;
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: fadeInRight 0.8s ease-out;
                }

                @keyframes fadeInRight {
                    from {
                        opacity: 0;
                        transform: translateX(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .hero-illustration {
                    position: relative;
                    width: 400px;
                    height: 400px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .illustration-circle {
                    position: absolute;
                    border-radius: 50%;
                    animation: rotate 20s linear infinite;
                }

                .circle-1 {
                    width: 400px;
                    height: 400px;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
                }

                .circle-2 {
                    width: 300px;
                    height: 300px;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%);
                    animation-direction: reverse;
                }

                .circle-3 {
                    width: 200px;
                    height: 200px;
                    background: linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%);
                }

                @keyframes rotate {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                .main-icon {
                    font-size: 120px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    z-index: 1;
                }

                .floating-card {
                    position: absolute;
                    background: white;
                    padding: 15px 20px;
                    border-radius: 12px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-weight: 600;
                    animation: float 3s ease-in-out infinite;
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-20px); }
                }

                .card-1 {
                    top: 50px;
                    left: -50px;
                    animation-delay: 0s;
                }

                .card-2 {
                    top: 100px;
                    right: -50px;
                    animation-delay: 0.5s;
                }

                .card-3 {
                    bottom: 80px;
                    left: 50px;
                    animation-delay: 1s;
                }

                .floating-card i {
                    font-size: 24px;
                    color: #667eea;
                }

                /* Features Section */
                .features-section {
                    padding: 100px 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .section-header {
                    text-align: center;
                    margin-bottom: 60px;
                }

                .section-title {
                    font-size: 42px;
                    font-weight: 800;
                    color: #1a1a2e;
                    margin-bottom: 16px;
                }

                .section-subtitle {
                    font-size: 18px;
                    color: #666;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 30px;
                }

                .feature-card {
                    background: white;
                    padding: 40px 30px;
                    border-radius: 16px;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                    text-align: center;
                }

                .feature-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
                }

                .feature-icon {
                    width: 70px;
                    height: 70px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 24px;
                    font-size: 32px;
                    color: white;
                }

                .feature-title {
                    font-size: 22px;
                    font-weight: 700;
                    color: #1a1a2e;
                    margin-bottom: 12px;
                }

                .feature-description {
                    font-size: 15px;
                    color: #666;
                    line-height: 1.6;
                }

                /* Categories Section */
                .categories-section {
                    padding: 100px 30px;
                    max-width: 1200px;
                    margin: 0 auto;
                    background: #f8f9fa;
                }

                .categories-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 30px;
                }

                .category-card {
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
                    transition: all 0.3s ease;
                }

                .category-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
                }

                .category-header {
                    height: 150px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 64px;
                    color: white;
                }

                .category-body {
                    padding: 30px;
                }

                .category-name {
                    font-size: 24px;
                    font-weight: 700;
                    color: #1a1a2e;
                    margin-bottom: 16px;
                }

                .category-meta {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 24px;
                }

                .category-questions {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    color: #666;
                    font-size: 14px;
                }

                .category-difficulty {
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 600;
                }

                .category-difficulty.intermediate {
                    background: #fff3cd;
                    color: #856404;
                }

                .category-difficulty.advanced {
                    background: #f8d7da;
                    color: #721c24;
                }

                .category-difficulty.expert {
                    background: #d1ecf1;
                    color: #0c5460;
                }

                .btn-category {
                    width: 100%;
                    padding: 12px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    border: none;
                    color: white;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    transition: all 0.3s ease;
                }

                .btn-category:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(102, 126, 234, 0.3);
                }

                /* CTA Section */
                .cta-section {
                    padding: 100px 30px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    text-align: center;
                }

                .cta-content {
                    max-width: 700px;
                    margin: 0 auto;
                }

                .cta-title {
                    font-size: 48px;
                    font-weight: 800;
                    color: white;
                    margin-bottom: 20px;
                }

                .cta-subtitle {
                    font-size: 20px;
                    color: rgba(255, 255, 255, 0.9);
                    margin-bottom: 40px;
                }

                .btn-cta {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    padding: 18px 40px;
                    background: white;
                    color: #667eea;
                    border: none;
                    border-radius: 12px;
                    font-size: 18px;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }

                .btn-cta:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
                }

                /* Footer */
                .home-footer {
                    background: #1a1a2e;
                    color: white;
                    padding: 60px 30px 30px;
                }

                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 40px;
                    margin-bottom: 40px;
                }

                .footer-section h4 {
                    font-size: 18px;
                    margin-bottom: 20px;
                    color: white;
                }

                .footer-section ul {
                    list-style: none;
                }

                .footer-section ul li {
                    margin-bottom: 12px;
                }

                .footer-section ul li a {
                    color: rgba(255, 255, 255, 0.7);
                    text-decoration: none;
                    transition: color 0.3s ease;
                }

                .footer-section ul li a:hover {
                    color: white;
                }

                .footer-brand {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 16px;
                }

                .footer-description {
                    color: rgba(255, 255, 255, 0.7);
                    margin-bottom: 20px;
                    line-height: 1.6;
                }

                .social-links {
                    display: flex;
                    gap: 12px;
                }

                .social-link {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .social-link:hover {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    transform: translateY(-3px);
                }

                .footer-bottom {
                    text-align: center;
                    padding-top: 30px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    color: rgba(255, 255, 255, 0.6);
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }

                    .hero-section {
                        flex-direction: column;
                        padding: 100px 20px 60px;
                    }

                    .hero-title {
                        font-size: 36px;
                    }

                    .hero-stats {
                        grid-template-columns: repeat(2, 1fr);
                    }

                    .hero-buttons {
                        flex-direction: column;
                    }

                    .hero-illustration {
                        width: 300px;
                        height: 300px;
                    }

                    .floating-card {
                        display: none;
                    }

                    .section-title {
                        font-size: 32px;
                    }

                    .cta-title {
                        font-size: 32px;
                    }

                    .footer-content {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default Home;
