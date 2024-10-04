'use client';

import { CarouselPagination, CarouselPaginationTab } from '@bigcommerce/components/carousel';

import { Article } from './types';

export const Pagination = ({
  groupedArticles,
  id,
}: {
  groupedArticles: Article[][];
  id: string;
}) => {
  return (
    <CarouselPagination>
      {groupedArticles.map((_, index) => (
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
