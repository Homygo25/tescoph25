// Swiper styles import for Vite/React

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import styles from './PackageCarousel.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { useState } from 'react';

// Import the type from the parent file if possible, or redefine here
export interface PackageWithImage {
  id: number;
  package_name: string;
  min_amount: number;
  daily_shares_rate: number;
  effective_days: number;
  referal_bonus_rate: number;
  available_slots: number;
  max_amount: number;
  image: string;
}

interface PackageCarouselProps {
  packages: PackageWithImage[];
  onSelect: (pkg: PackageWithImage) => void;
}

export default function PackageCarousel({ packages, onSelect }: PackageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <Swiper
      effect="coverflow"
      grabCursor={true}
      centeredSlides={true}
      slidesPerView={1.15}
      coverflowEffect={{
        rotate: 0,
        stretch: 0,
        depth: 120,
        modifier: 2.5,
        slideShadows: true,
      }}
      pagination={{ clickable: true }}
      modules={[EffectCoverflow, Pagination]}
      onSlideChange={swiper => setActiveIndex(swiper.activeIndex)}
      className={`w-full max-w-xs sm:max-w-md md:hidden ${styles.swiperCustom}`}
    >
      {packages.map((item, idx) => (
        <SwiperSlide key={item.id}>
          <div
            className={`transition-all duration-300 ${activeIndex === idx ? 'scale-105 shadow-2xl z-10' : 'scale-90 opacity-70 blur-[1.5px] z-0'} ${styles.carouselCard}`}
            onClick={() => onSelect(item)}
          >
            <img src={item.image} alt={item.package_name} className={styles.carouselImage} />
            <div className="text-center font-bold mt-2">{item.package_name}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
