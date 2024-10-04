import { useId } from 'react';

import { cn } from '~/lib/utils';

import Markdown from '../markdown';
import { Product, ProductCard } from '../product-card';
import { Pagination } from '../product-card-carousel/pagination';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
} from '../ui/carousel';

interface ContentCarouselProps {
  content: string;
  className?: string;
  isDark?: boolean;
  products: Array<Partial<Product>>;
  showCart?: boolean;
  showCompare?: boolean;
  showReviews?: boolean;
  showBrand?: boolean;
}

function ContentProductCarousel({
  content,
  className,
  isDark,
  products,
  showBrand,
  showCart,
  showCompare,
  showReviews,
}: ContentCarouselProps) {
  const id = useId();

  if (products.length === 0) {
    return null;
  }

  const groupedProducts = products.reduce<Array<Array<Partial<Product>>>>((batches, _, index) => {
    if (index % 3 === 0) {
      batches.push([]);
    }

    const product = products[index];

    if (batches[batches.length - 1] && product) {
      batches[batches.length - 1]?.push(product);
    }

    return batches;
  }, []);

  return (
    <div
      className={cn(
        'relative flex flex-col px-12 pt-4 text-center xl:flex-row xl:space-x-4',
        isDark && 'bg-black text-white',
        className,
      )}
    >
      <Markdown className="mb-16 flex pt-12 text-start xl:w-2/5 xl:pr-4" content={content} />
      <Carousel aria-labelledby="title" className="mb-14 xl:w-3/5" opts={{ loop: true }}>
        <div className="flex items-center justify-between">
          <span className="no-wrap flex">
            <CarouselPreviousIndicator />
            <CarouselNextIndicator />
          </span>
        </div>
        <CarouselContent className="mt-0 lg:mt-0">
          {groupedProducts.map((group, index) => (
            <CarouselItem
              aria-label={`${index + 1} of ${groupedProducts.length}`}
              className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
              id={`${id}-slide-${index + 1}`}
              index={index}
              key={index}
            >
              {group.map((product) => (
                <ProductCard
                  imageSize="tall"
                  key={product.entityId}
                  product={product}
                  showBrand={showBrand}
                  showCart={showCart}
                  showCompare={showCompare}
                  showReviews={showReviews}
                />
              ))}
            </CarouselItem>
          ))}
        </CarouselContent>
        <Pagination groupedProducts={groupedProducts} id={id} />
      </Carousel>
    </div>
  );
}

export default ContentProductCarousel;
