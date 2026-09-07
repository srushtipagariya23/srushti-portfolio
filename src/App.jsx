import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';

import { GlobalLayout } from './components/GlobalLayout';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Work from './pages/Work';
import CaseStudy from './pages/CaseStudy';
import Skills from './pages/Skills';

function App() {
  return (
    <HashRouter>
      <GlobalLayout>
        
        {/* The Navbar is back online! */}
        <Navbar /> 

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/skills" element={<Skills />} />
        </Routes>
        
      </GlobalLayout>
    </HashRouter>
  );
}

export default App;