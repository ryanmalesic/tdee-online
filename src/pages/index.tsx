import React from 'react';

import BackgroundLayout from '../components/BackgroundLayout';
import Navbar from '../components/Navbar';

const Index: React.FC = () => {
  return (
    <>
      <Navbar />
      <BackgroundLayout>
        <div className="container has-text-centered">
          <h1 className="title is-1">TDEE Online</h1>
          <h3 className="subtitle is-3">Eat. Track. Progress.</h3>
        </div>
      </BackgroundLayout>
    </>
  );
};

export default Index;
