'use client';

import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
} from '../ui/carousel';

function PromoBanner() {
  return (
    <div className="w-full bg-gray-100 text-black">
      <Carousel
        className="flex items-center justify-center 2xl:container sm:px-10 lg:gap-8 lg:px-12 2xl:mx-auto 2xl:px-0"
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000 })]}
      >
        <div className="pl-2">
          <CarouselPreviousIndicator className="hidden size-4 lg:flex 2xl:size-5" />
        </div>
        <CarouselContent className="m-0 my-2 lg:mt-2 2xl:my-4">
          {[
            'Free dose of Overnight Chronobiology Peel (£35 value) when you spend +£250',
            'Complimentary shipping & samples on every order.',
            'New: Auto-replenish your favourite refills',
          ].map((promotion, index) => (
            <CarouselItem className="grid-cols-1 md:grid-cols-1" index={index} key={promotion}>
              <div className="flex items-center justify-center">
                <p className="text-center text-xs font-light">{promotion}</p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="pr-2">
          <CarouselNextIndicator className="hidden size-4 lg:flex 2xl:size-5" />
        </div>
      </Carousel>
    </div>
  );
}

export default PromoBanner;
