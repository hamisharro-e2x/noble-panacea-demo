import { useId } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNextIndicator,
  CarouselPreviousIndicator,
} from '@bigcommerce/components/carousel';

import Markdown from '../markdown';

import ArticleCard from './article-card';
import { Pagination } from './pagination';
import { Article } from './types';

const ArticleCardCarousel = ({ content, articles }: { content: string; articles: Article[] }) => {
  const id = useId();

  if (articles.length === 0) {
    return null;
  }

  const groupedArticles = articles.reduce<Article[][]>((batches, _, index) => {
    if (index % 4 === 0) {
      batches.push([]);
    }

    const product = articles[index];

    if (batches[batches.length - 1] && product) {
      batches[batches.length - 1]?.push(product);
    }

    return batches;
  }, []);

  return (
    <Carousel aria-labelledby="title" className="mb-14" opts={{ loop: true }}>
      <Markdown className="px-12 pt-8 text-center" content={content} />
      <div className="flex items-center justify-end">
        <span className="no-wrap flex">
          <CarouselPreviousIndicator />
          <CarouselNextIndicator />
        </span>
      </div>
      <CarouselContent>
        {groupedArticles.map((group, index) => (
          <CarouselItem
            aria-label={`${index + 1} of ${groupedArticles.length}`}
            id={`${id}-slide-${index + 1}`}
            index={index}
            key={index}
          >
            {group.map((article) => (
              <ArticleCard key={article.title} {...article} />
            ))}
          </CarouselItem>
        ))}
      </CarouselContent>
      <Pagination groupedArticles={groupedArticles} id={id} />
    </Carousel>
  );
};

export default ArticleCardCarousel;
