import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
} from '../carousel';

interface ImageCarouselProps {
  images: string[];
}

function ImageCarousel({ images }: ImageCarouselProps) {
  return (
    <Carousel className="flex items-center justify-center" opts={{ loop: true }}>
      <div className="pl-2">
        <CarouselPreviousIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
      </div>
      <CarouselContent className="z-0 m-0 my-2 lg:mt-2 2xl:my-4">
        {images.map((href) => (
          <Image alt={href} height={300} key={href} src={href} width={300} />
        ))}
      </CarouselContent>
      <div className="pr-2">
        <CarouselNextIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
      </div>
    </Carousel>
  );
}

export default ImageCarousel;
