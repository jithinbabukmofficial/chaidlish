// src/App.js
import React, { useState } from 'react';
import './App.css';
import { menuData, drinksData } from './data';

// --- Sub Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Close menu when a link is clicked
  const handleLinkClick = () => setIsOpen(false);

  return (
    <header>
      <div className="container">
        <nav>
          <a href="#" className="logo">Chai D’lish</a>
          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </div>
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <a href="#hero" onClick={handleLinkClick}>Home</a>
            <a href="#about" onClick={handleLinkClick}>About</a>
            <a href="#menu" onClick={handleLinkClick}>Menu</a>
            <a href="#gallery" onClick={handleLinkClick}>Gallery</a>
            <a href="#contact" onClick={handleLinkClick}>Contact</a>
          </div>
        </nav>
      </div>
    </header>
  );
};

const Hero = () => (
  <section id="hero">
    <div className="container">
      <h1>Chai D’lish</h1>
      <p>A Slice of South India in Every Bite</p>
      <div className="hero-btns">
        <a href="#menu" className="btn">View Menu</a>
        <a href="#contact" className="btn btn-outline">Call to Order</a>
      </div>
    </div>
  </section>
);

const Intro = () => (
  <section id="intro">
    <div className="container">
      <h2>Welcome to Chai D’lish</h2>
      <p style={{ maxWidth: '700px', margin: '15px auto' }}>
        Minehead’s cosy Indian Resto Café, serving real South Indian flavours from morning to night. 
        Enjoy wholesome breakfasts, flavour-packed lunch plates, and satisfying dinner meals — 
        all freshly made with authentic home-style recipes.
      </p>
      <div className="intro-icons">
        <span>🥞 Breakfast</span>
        <span>🍛 Lunch</span>
        <span>🍽️ Dinner</span>
        <span>☕ Drinks</span>
        <span>🍨 Desserts</span>
      </div>
    </div>
  </section>
);

const Highlights = () => (
  <section id="highlights">
    <div className="container">
      <div className="section-title">
        <h2>What We Serve</h2>
        <p>Authentic flavors, fresh ingredients</p>
      </div>
      <div className="grid-3">
        <div className="card">
          <img src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Masala Dosa" />
          <div className="card-content">
            <h3>Breakfast & Dosa</h3>
            <p>Crispy Dosas, fluffy Idlies, and Vadas served with sambar and chutneys.</p>
          </div>
        </div>
        <div className="card">
          <img src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Thali" />
          <div className="card-content">
            <h3>Meals & Thalis</h3>
            <p>A complete meal on a plate. Veg and Non-Veg traditional South Indian Thalis.</p>
          </div>
        </div>
        <div className="card">
          <img src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Biriyani" />
          <div className="card-content">
            <h3>Rice & Combos</h3>
            <p>Aromatic Biriyanis, Kappa mixes, and our special Porotta Kothu.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const MenuSection = () => (
  <section id="menu">
    <div className="container">
      <div className="section-title">
        <h2>Our Menu</h2>
        <p>From Crunchy Nibbles to Sweet Endings</p>
      </div>

      {/* FOOD MENU */}
      <div className="menu-grid">
        {/* Left Column */}
        <div>
          {menuData.slice(0, 3).map((category, index) => (
            <div className="menu-category" key={index}>
              <h3>{category.category}</h3>
              {category.items.map((item, idx) => (
                <div className="menu-item" key={idx}>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
        
        {/* Right Column */}
        <div>
          {menuData.slice(3).map((category, index) => (
            <div className="menu-category" key={index}>
              <h3>{category.category}</h3>
              {category.items.map((item, idx) => (
                <div className="menu-item" key={idx}>
                  <strong>{item.name}</strong>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #ddd' }} />

      {/* DRINKS MENU */}
      <div className="menu-grid">
         <div>
            {drinksData.slice(0, 2).map((category, index) => (
              <div className="menu-category" key={index}>
                <h3>{category.category}</h3>
                {category.items.map((item, idx) => (
                  <div className="menu-item" key={idx}>
                    <strong>{item.name}</strong>
                    {item.desc && <span>{item.desc}</span>}
                  </div>
                ))}
              </div>
            ))}
         </div>
         <div>
            {drinksData.slice(2).map((category, index) => (
              <div className="menu-category" key={index}>
                <h3>{category.category}</h3>
                {category.items.map((item, idx) => (
                  <div className="menu-item" key={idx}>
                    <strong>{item.name}</strong>
                    {item.desc && <span>{item.desc}</span>}
                  </div>
                ))}
              </div>
            ))}
         </div>
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about">
    <div className="container">
      <div className="section-title">
        <h2 style={{ color: 'white' }}>Why Choose Chai D’lish?</h2>
        <p style={{ color: '#ddd' }}>More than just a restaurant, it's a feeling.</p>
      </div>
      <div className="features">
        <div className="feature-box">
          <i className="fas fa-pepper-hot"></i>
          <h3>Authentic Taste</h3>
          <p>Traditional recipes and authentic flavors with a Kerala touch.</p>
        </div>
        <div className="feature-box">
          <i className="fas fa-couch"></i>
          <h3>Resto Café Comfort</h3>
          <p>A cosy, family-friendly space — not a full restaurant, but full of flavour.</p>
        </div>
        <div className="feature-box">
          <i className="fas fa-clock"></i>
          <h3>All-Day Service</h3>
          <p>Serving from morning until night (08:00 - 22:00) — breakfast, lunch & dinner.</p>
        </div>
      </div>
    </div>
  </section>
);

const Gallery = () => (
  <section id="gallery">
    <div className="container">
      <div className="section-title">
        <h2>Our Gallery</h2>
      </div>
      <div className="gallery-grid">
        <img src="https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Indian Food" />
        <img src="https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Tea" />
        <img src="https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Curry" />
        <img src="https://images.unsplash.com/photo-1631452180519-c014fe946bc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Dessert" />
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section id="contact">
    <div className="container">
      <div className="section-title">
        <h2>Visit Us</h2>
        <p>Experience the Taste of South India Today</p>
      </div>
      <div className="contact-wrapper">
        <div className="contact-info">
          <h3>Chai D’lish</h3>
          <p><i className="fas fa-map-marker-alt" style={{ color: 'var(--primary)' }}></i> Minehead, United Kingdom</p>
          <p><i className="fas fa-phone" style={{ color: 'var(--primary)' }}></i> +44 123 456 7890</p>
          <p><i className="fas fa-envelope" style={{ color: 'var(--primary)' }}></i> info@chaidlish.com</p>
          <br />
          <h3>Opening Hours</h3>
          <p><strong>Mon - Sun:</strong> 08:00 AM – 10:00 PM (22:00)</p>
          <br />
          <a href="#" className="btn">Call for Takeaway</a>
        </div>
        <div className="map-container">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39999.75234980635!2d-3.4882627610012395!3d51.20527826326457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x486df20060d759bd%3A0x4c628e68808c8991!2sMinehead%2C%20UK!5e0!3m2!1sen!2sus!4v1677650000000!5m2!1sen!2sus" 
            title="Map"
            allowFullScreen="" 
            loading="lazy">
          </iframe>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer>
    <div className="container">
      <h3>Chai D’lish — Indian Resto Café</h3>
      <p>A Slice of South India in Every Bite</p>
      <div className="social-links">
        <a href="#"><i className="fab fa-instagram"></i></a>
        <a href="#"><i className="fab fa-facebook"></i></a>
        <a href="#"><i className="fab fa-whatsapp"></i></a>
      </div>
      <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.7 }}>©️ 2025 Chai D’lish • Minehead, UK</p>
    </div>
  </footer>
);

// --- Main App Component ---

function Home() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <Intro />
      <Highlights />
      <MenuSection />
      <About />
      <Gallery />
      <Contact />
      <Footer />
    </div>
  );
}

export default Home;