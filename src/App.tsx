import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Step1 from './components/post-a-job/Step1';


const App: React.FC = () => {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/post-a-job-step-1" element={<Step1 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
