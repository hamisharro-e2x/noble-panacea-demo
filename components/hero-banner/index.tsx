import Image from 'next/image';

import { Button } from '../ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextIndicator,
  CarouselPagination,
  CarouselPaginationTab,
  CarouselPreviousIndicator,
} from '../ui/carousel';

interface HeroBannerContent {
  eyeBrow: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  ctaButton: {
    text: string;
    url: string;
  };
}

interface HeroBannerProps {
  heroContent: HeroBannerContent[];
}

function HeroBanner({ heroContent }: HeroBannerProps) {
  return (
    <Carousel className="relative mx-0 stroke-white px-0 text-white">
      <CarouselContent className="m-0 my-0 lg:mt-0 2xl:my-0">
        {heroContent.map(({ imageUrl, title, eyeBrow, subtitle, ctaButton }, index) => (
          <CarouselItem
            className="relative grid-cols-1 font-light md:grid-cols-1"
            index={index}
            key={title}
          >
            <Image
              alt="hero banner image"
              className="absolute -z-10 object-cover"
              fill
              priority
              sizes="(max-width: 1536px) 100vw, 1536px"
              src={imageUrl}
            />
            <div className="flex w-2/5 flex-col gap-5 px-12 pb-48 pt-36">
              {typeof eyeBrow === 'string' && (
                <p className="text-lg" dangerouslySetInnerHTML={{ __html: eyeBrow }} />
              )}
              <h1 className="text-4xl">{title}</h1>
              <p className="text-lg">{subtitle}</p>
              <Button asChild className="w-fit" variant="tertiary">
                <a href={ctaButton.url}>{ctaButton.text}</a>
              </Button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="absolute bottom-0 left-0 top-0 z-10 flex items-center pl-2">
        <CarouselPreviousIndicator className="hidden size-4 lg:flex 2xl:size-5" />
      </div>
      <div className="absolute bottom-0 right-0 top-0 z-10 flex items-center pr-2">
        <CarouselNextIndicator className="hidden size-4 lg:flex 2xl:size-5" />
      </div>
      <CarouselPagination className="hidden lg:flex">
        {heroContent.map(({ title }, index) => (
          <CarouselPaginationTab index={index} key={`tab-${title}`} />
        ))}
      </CarouselPagination>
    </Carousel>
  );
}

export default HeroBanner;
