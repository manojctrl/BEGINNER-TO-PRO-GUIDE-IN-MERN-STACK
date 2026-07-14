import React from 'react';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import HeroSection from './HeroSection';

const HeroBoundary = () => {
  return (
    <ErrorBoundary
      fallback={
        <div className="p-6 text-center bg-red-50 text-red-700 rounded-lg">
          <h2 className="font-bold text-lg">Hero section failed to load.</h2>
          <p>Please refresh the page and try again.</p>
        </div>
      }
    >
      <HeroSection />
    </ErrorBoundary>
  );
};

export default HeroBoundary;
