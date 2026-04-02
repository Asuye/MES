import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import System from './pages/System';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<System />} />
          <Route path="/system" element={<System />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
