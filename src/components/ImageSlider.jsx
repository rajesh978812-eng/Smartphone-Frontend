import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const ImageSlider = () => {
  // --- 1. DATA (உங்கள் பழைய டேட்டா அப்படியே உள்ளது) ---
  const slides = [
    {
      id: 1,
      image: "img9.jpg", 
      title: "Latest Smartphones",
      subtitle: "Get the best deals on new arrivals",
      color: "text-white"
    },
    {
      id: 2,
      image: "img7.jpg",
      title: "Premium Accessories",
      subtitle: "Upgrade your style today",
      color: "text-white"
    },
    {
      id: 3,
      image: "img8.jpg", 
      title: "Big Sale Offer",
      subtitle: "Up to 50% OFF on selected brands",
      color: "text-white"
    }
  ];

  // --- 2. STATES & LOGIC (உங்கள் பழைய லாஜிக் அப்படியே உள்ளது) ---
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideLength = slides.length;

  //Auto Slide Effect
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slideLength - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [slideLength]);

  // Manual Navigation Functions
  const nextSlide = () => {
    setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
  };

  // --- 3. RENDER (Premium UI மாற்றங்கள்) ---
  return (
    // Main Container: Added margins, rounded corners, shadow, and ASPECT RATIO fixes.
    <div className="relative w-full max-w-[1440px] mx-auto mt-4 px-2 md:px-4 group font-sans">
      <div className="relative w-full aspect-[16/10] md:aspect-[21/9] overflow-hidden rounded-xl md:rounded-3xl shadow-lg transition-all duration-300">
        
        {/* --- SLIDES --- */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Image: object-cover combined with aspect ratio container ensures no weird stretching */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay: Ensures text is readable on bright images */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

            {/* Text Content: Adjusted positioning and sizes for mobile/desktop */}
            <div className="absolute bottom-6 left-6 md:bottom-16 md:left-16 text-white max-w-[80%] animate-fade-in">
              <h1 className="text-xl md:text-4xl lg:text-5xl font-extrabold mb-2 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-sm md:text-lg lg:text-xl font-medium opacity-90 drop-shadow-md">
                {slide.subtitle}
              </p>
              {/* Optional: Add a Shop Now button like Flipkart */}
               <button className="mt-4 bg-white text-black text-xs md:text-sm font-bold px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-gray-200 transition hidden md:inline-block">
                Shop Now
              </button>
            </div>
          </div>
        ))}

        {/* --- CONTROLS (ARROWS) --- */}
        {/* Only show on hover on desktop (group-hover), slightly translucent */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 md:p-4 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-20 bg-black/30 hover:bg-black/60 text-white p-2 md:p-4 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100 hidden md:block"
        >
          <FaChevronRight size={20} />
        </button>
      </div>

      {/* --- INDICATORS (DOTS) --- */}
      {/* Moved outside the image box for a cleaner look, like modern apps */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-purple-600 w-6' // Active dot is wider
                : 'bg-gray-300 w-2 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;