import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
} from '../carousel';

interface ImageCarouselProps {
  images: Array<{ src: string; alt: string }>;
}

function ImageCarouselFullWidth({ images }: ImageCarouselProps) {
  return (
    <Carousel className="flex flex-col items-center justify-center" opts={{ loop: true }}>
      <CarouselContent className="z-0 m-0 mt-0 lg:mt-0">
        {images.map(({ alt, src }) => (
          <Image
            alt={alt}
            className="border-2 border-white"
            height={300}
            key={src}
            src={src}
            width={300}
          />
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 left-0 top-0 z-10 flex items-center bg-black/70 px-2">
        <CarouselPreviousIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
      </div>
      <div className="absolute bottom-0 right-0 top-0 z-10 flex items-center bg-black/70 px-2">
        <CarouselNextIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
      </div>
    </Carousel>
  );
}

function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel className="flex items-center justify-center" opts={{ loop: true }}>
      <div className="px-2">
        <CarouselPreviousIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
      </div>
      <CarouselContent className="z-0 m-0 mt-0 lg:mt-0">
        {images.map(({ alt, src }) => (
          <Image alt={alt} height={300} key={src} src={src} width={300} />
        ))}
      </CarouselContent>
      <div className="px-2">
        <CarouselNextIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
      </div>
    </Carousel>
  );
}

export { ImageCarousel, ImageCarouselFullWidth };
