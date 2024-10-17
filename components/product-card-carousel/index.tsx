import { useId } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselItemSingle,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
} from '@bigcommerce/components/carousel';
import { cn } from '~/lib/utils';

import { Product, ProductCard } from '../product-card';

import { Pagination } from './pagination';

export const ProductCardCarousel = ({
  title,
  products,
  showCart = true,
  showCompare = true,
  showReviews = true,
  showBrand = true,
  className,
}: {
  title: string;
  products: Array<Partial<Product>>;
  showCart?: boolean;
  showCompare?: boolean;
  showReviews?: boolean;
  showBrand?: boolean;
  className?: string;
}) => {
  const id = useId();

  if (products.length === 0) {
    return null;
  }

  const groupedProducts = products.reduce<Array<Array<Partial<Product>>>>((batches, _, index) => {
    if (index % 4 === 0) {
      batches.push([]);
    }

    const product = products[index];

    if (batches[batches.length - 1] && product) {
      batches[batches.length - 1]?.push(product);
    }

    return batches;
  }, []);

  return (
    <Carousel aria-labelledby="title" className={cn('mb-14', className)} opts={{ loop: true }}>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-light uppercase lg:text-2xl" id="title">
          {title}
        </h2>
        <span className="no-wrap flex">
          <CarouselPreviousIndicator />
          <CarouselNextIndicator />
        </span>
      </div>
      <CarouselContent>
        {groupedProducts.map((group, index) => (
          <CarouselItem
            aria-label={`${index + 1} of ${groupedProducts.length}`}
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
      <Pagination id={id} items={groupedProducts} />
    </Carousel>
  );
};

export const ProductCardCarouselSingle = ({
  title,
  products,
  showCart = true,
  showCompare = true,
  showReviews = true,
  showBrand = true,
  className,
}: {
  title: string;
  products: Array<Partial<Product>>;
  showCart?: boolean;
  showCompare?: boolean;
  showReviews?: boolean;
  showBrand?: boolean;
  className?: string;
}) => {
  const id = useId();

  if (products.length === 0) {
    return null;
  }

  return (
    <Carousel
      aria-labelledby="title"
      className={cn('mb-14', className)}
      opts={{ loop: true, align: 'center' }}
    >
      <h2 className="w-full text-center text-lg font-light uppercase lg:text-2xl" id="title">
        {title}
      </h2>
      <div className="flex items-center justify-center">
        <div className="hidden px-2 lg:flex">
          <CarouselPreviousIndicator className="z-10 size-4 2xl:size-5" />
        </div>
        <CarouselContent>
          {products.map((product, index) => (
            <CarouselItemSingle
              aria-label={`${index + 1} of ${products.length}`}
              className="flex-2 px-3 md:flex-3"
              id={`${id}-slide-${index + 1}`}
              index={index}
              key={product.entityId}
            >
              <ProductCard
                imageSize="tall"
                key={product.entityId}
                product={product}
                showBrand={showBrand}
                showCart={showCart}
                showCompare={showCompare}
                showReviews={showReviews}
              />
            </CarouselItemSingle>
          ))}
        </CarouselContent>
        <div className="hidden px-2 lg:flex">
          <CarouselNextIndicator className="z-10 size-4 2xl:size-5" />
        </div>
      </div>
      <Pagination id={id} items={products} />
    </Carousel>
  );
};
