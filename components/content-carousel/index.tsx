import { cn } from '~/lib/utils';

import { AmplienceImage } from '../amplience/image/image.types';
import Markdown from '../markdown';
import { ImageCarousel, ImageCarouselFullWidth } from '../ui/image-carousel';

export interface ContentCarouselProps {
  content: string;
  className?: string;
  images: Array<{
    image: AmplienceImage;
    imageAltText: string;
  }>;
  isDark?: boolean;
}

function ContentCarousel({ content, images, className, isDark }: ContentCarouselProps) {
  const Carousel = isDark ? ImageCarouselFullWidth : ImageCarousel;

  return (
    <div
      className={cn(
        'relative flex w-full flex-col items-center justify-center space-y-8 pt-8 text-center',
        isDark && 'bg-black text-white',
        className,
      )}
    >
      <Markdown className="px-4" content={content} />
      <Carousel
        images={images.map(({ image, imageAltText }) => ({
          src: `https://${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`,
          alt: imageAltText,
        }))}
      />
    </div>
  );
}

export default ContentCarousel;
