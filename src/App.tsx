import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Step1 from './components/post-a-job/Step1';
import Step2 from './components/post-a-job/Step2';
import Step3 from './components/post-a-job/Step3';


const App: React.FC = () => {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<Step1 />} />
          <Route path="/post-a-job-step-2" element={<Step2 />} />
          <Route path="/post-a-job-step-3" element={<Step3 />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
