import React from "react";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 pt-20 bg-black">
      <h1 className="text-4xl md:text-6xl font-extrabold text-red-600 mb-4">
        Swipe. Learn. Grow. with GyAANI<span className="text-4xl md:text-6xl font-extrabold text-white">24x7</span>

      </h1>
      <p className="text-lg md:text-2xl text-white max-w-2xl mb-8">
        Upload your notes, get AI-powered quizzes, and play your way to mastery.
      </p>
    
    </section>
  );
};

export default Hero;
