import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom"; // Link Import செய்யப்பட்டுள்ளது
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  // Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 700,            // வேகம் சிறிது குறைக்கப்பட்டுள்ளது (Smooth Effect)
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: false,   // மவுஸ் வைத்தால் நிற்காது (Optional)
  };

  // Slider Data
  const slides = [
    {
      id: 1,
      image: "img1.jpeg", 
      title: "Latest Smartphones",
      subtitle: "Get the best deals on new arrivals",
      color: "text-white"
    },
    {
      id: 2,
      image: "img3.jpeg",
      title: "Premium Accessories",
      subtitle: "Upgrade your style today",
      color: "text-white"
    },
    {
      id: 3,
      image: "img4.jpeg", 
      title: "Big Sale Offer",
      subtitle: "Up to 50% OFF on selected brands",
      color: "text-white"
    }
  ];

  return (
    <div className="w-full overflow-hidden mt-16 relative z-0"> {/* z-index பிரச்சனை வராமல் இருக்க */}
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className="relative w-full h-[350px] md:h-[500px] outline-none">
            {/* Image */}
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover brightness-75" // படம் சற்று இருளாக இருக்கும் (எழுத்து தெரிய)
            />
            
            {/* Text Overlay */}
            <div className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${slide.color}`}>
              <h2 className="text-3xl md:text-6xl font-extrabold mb-3 drop-shadow-lg animate-fade-in-up">
                {slide.title}
              </h2>
              <p className="text-base md:text-xl mb-6 font-medium drop-shadow-md max-w-lg">
                {slide.subtitle}
              </p>
              
              {/* BUTTON FIX: Link added & z-index improved */}
              <Link 
                to="/products" 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full transition-all duration-300 font-bold shadow-lg hover:scale-105 hover:shadow-purple-500/50 cursor-pointer relative z-50"
              >
                Shop Now
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;