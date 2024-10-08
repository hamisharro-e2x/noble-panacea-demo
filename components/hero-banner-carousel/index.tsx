import HeroBanner, { HeroBannerProps } from '../hero-banner';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextIndicator,
  CarouselPagination,
  CarouselPaginationTab,
  CarouselPreviousIndicator,
} from '../ui/carousel';

interface HeroBannerCarouselProps {
  banners: HeroBannerProps[];
}

function HeroBannerCarousel({ banners }: HeroBannerCarouselProps) {
  return (
    <Carousel className="relative mx-0 stroke-white px-0 text-white">
      <CarouselContent className="m-0 my-0 lg:mt-0 2xl:my-0">
        {banners.map((content, index) => (
          <CarouselItem
            className="grid-cols-1 px-0 md:grid-cols-1"
            index={index}
            key={content.content}
          >
            <HeroBanner {...content} />
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
        {banners.map(({ content }, index) => (
          <CarouselPaginationTab index={index} key={`tab-${content}`} />
        ))}
      </CarouselPagination>
    </Carousel>
  );
}

export default HeroBannerCarousel;
