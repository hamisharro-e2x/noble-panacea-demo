import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
} from '../ui/carousel';

const awards = [
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (9)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (8)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (4)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (2)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (5)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (11)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (10)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (3)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (7)',
  'https://applytrial.a.bigcontent.io/v1/static/Untitled design (6)',
];

function AwardCarousel() {
  return (
    <div className="relative flex flex-col items-center justify-center space-y-8">
      <h2 className="text-4xl font-light uppercase">Our awards</h2>
      <Carousel className="flex items-center justify-center" opts={{ loop: true }}>
        <CarouselPreviousIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
        <CarouselContent className="z-0 m-0 my-2 lg:mt-2 2xl:my-4">
          {awards.map((href) => (
            <Image alt={href} height={300} key={href} src={href} width={300} />
          ))}
        </CarouselContent>
        <CarouselNextIndicator className="z-10 hidden size-4 lg:flex 2xl:size-5" />
      </Carousel>
    </div>
  );
}

export default AwardCarousel;
