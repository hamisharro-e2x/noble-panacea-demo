'use client';

import { CarouselPagination, CarouselPaginationTab } from '@bigcommerce/components/carousel';

export const Pagination = ({ items, id }: { items?: unknown[]; id: string }) => {
  return (
    <CarouselPagination>
      {items?.map((_, index) => (
        <CarouselPaginationTab
          aria-controls={`${id}-slide-${index + 1}`}
          aria-label={`Go to slide ${index + 1}`}
          index={index}
          key={index}
        />
      ))}
    </CarouselPagination>
  );
};
