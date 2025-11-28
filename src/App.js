// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import Mobile from './Mobile';
import Home from './Home';

function App() {
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Breakpoint: 768px is standard for tablets/mobiles
    const isMobile = width <= 768;

    return (
        <div className="App">
            {/* {isMobile ? <Mobile /> : <Home />} */}
            <Home />
        </div>
    );
}

export default App;