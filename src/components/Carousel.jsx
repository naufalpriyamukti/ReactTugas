import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      id: 1,
      title: 'Top-up Game Favorit Anda',
      subtitle: 'Proses cepat, aman, dan terpercaya',
      image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      cta: 'Mulai Sekarang'
    },
    {
      id: 2,
      title: 'Promo Spesial Bulan Ini',
      subtitle: 'Dapatkan bonus diamond hingga 20%',
      image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      cta: 'Lihat Promo'
    },
    {
      id: 3,
      title: 'Pembayaran Mudah',
      subtitle: 'Berbagai metode pembayaran tersedia',
      image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      cta: 'Pelajari Lebih'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="carousel">
      <div className="carousel-container">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
            style={{ background: slide.image }}
          >
            <div className="carousel-content">
              <h2>{slide.title}</h2>
              <p>{slide.subtitle}</p>
              <button className="carousel-cta">{slide.cta}</button>
            </div>
          </div>
        ))}
        
        <button className="carousel-nav prev" onClick={prevSlide}>
          <ChevronLeftIcon size={24} />
        </button>
        <button className="carousel-nav next" onClick={nextSlide}>
          <ChevronRightIcon size={24} />
        </button>
        
        <div className="carousel-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;