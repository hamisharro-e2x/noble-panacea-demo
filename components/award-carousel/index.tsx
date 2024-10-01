import { cn } from '~/lib/utils';

import ImageCarousel from '../ui/image-carousel';

interface ContentCarouselProps {
  images: string[];
  title: string;
  description?: string;
  className?: string;
}

function ContentCarousel({ images, title, description, className }: ContentCarouselProps) {
  return (
    <div className={cn('relative flex flex-col items-center justify-center pt-4', className)}>
      <h2 className="text-4xl font-light uppercase">{title}</h2>
      {typeof description === 'string' && (
        <p className="py-8 text-center" dangerouslySetInnerHTML={{ __html: description }} />
      )}
      <ImageCarousel images={images} />
    </div>
  );
}

export default ContentCarousel;
