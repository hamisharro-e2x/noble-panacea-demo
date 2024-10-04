import Image from 'next/image';
import React from 'react';

import {
  ProductCard as ComponentsProductCard,
  ProductCardImage,
  ProductCardInfo,
  ProductCardInfoProductName,
} from '@bigcommerce/components/product-card';

import { Button } from '../ui/button';

import { Article } from './types';
import { removeWwwFromUrl } from './utils';

function ArticleCard({
  _meta: { deliveryKey },
  title,
  author,
  releaseDate,
  url,
  image,
  imageCaption,
}: Article) {
  const { hostname } = new URL(url);

  return (
    <ComponentsProductCard key={deliveryKey}>
      <ProductCardImage>
        <div className="relative aspect-[4/5] flex-auto">
          <Image
            alt={imageCaption}
            className="object-contain"
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1536px) 25vw, 500px"
            src={`https://${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`}
          />
        </div>
      </ProductCardImage>
      <ProductCardInfo className="font-extralight">
        <ProductCardInfoProductName className="font-light uppercase">
          {title}
        </ProductCardInfoProductName>
        <p className="text-xs uppercase xl:text-lg">{author}</p>
        <p className="text-[10px] uppercase xl:text-base">{releaseDate}</p>
        <p className="text-sm uppercase xl:text-lg">{removeWwwFromUrl(hostname)}</p>
        <Button asChild className="w-fit" variant="tertiary">
          <a href={`/article/${deliveryKey}`}>Read article</a>
        </Button>
      </ProductCardInfo>
    </ComponentsProductCard>
  );
}

export default ArticleCard;
