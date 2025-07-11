// Swiper styles import for Vite/React
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import { Pagination } from 'swiper/modules';
import { useState } from 'react';

// Use the main Package type from the parent file for type safety
import type { Package as MainPackageType } from '@/pages/client/package';

type Package = MainPackageType;

interface PackageCarouselProps {
  packages: Package[];
  onSelect: (pkg: Package | null) => void;
}

export function PackageCarousel({ packages, onSelect }: PackageCarouselProps) {
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
      className="w-full max-w-xs sm:max-w-md md:hidden"
      style={{ paddingBottom: 32 }}
    >
      {packages.map((item, idx) => (
        <SwiperSlide key={item.id}>
          <div
            className={`transition-all duration-300 ${activeIndex === idx ? 'scale-105 shadow-2xl z-10' : 'scale-90 opacity-70 blur-[1.5px] z-0'}`}
            onClick={() => onSelect(item)}
            style={{ cursor: 'pointer' }}
          >
            {/* Render your package card here, e.g. <PackageCard ... /> */}
            {/* Example: */}
            <img src={item.image} alt={item.package_name} style={{ borderRadius: 16, width: '100%' }} />
            <div className="text-center font-bold mt-2">{item.package_name}</div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
