'use client';

import { useState } from 'react';

import { getProduct } from '~/client/queries/get-product';
import { descriptionContentRegex, descriptionRegex } from '~/lib/utils';

type Product = Awaited<ReturnType<typeof getProduct>>;

export const Description = ({ product }: { product: NonNullable<Product> }) => {
  const shortDescription = product.description.match(descriptionRegex)?.[0] ?? '';

  const [description, setDescription] = useState<string>(shortDescription);
  const [isExpanded, setIsExpanded] = useState(false);

  if (!product.description) {
    return null;
  }

  return (
    <>
      <div
        className="space-y-4 font-light"
        dangerouslySetInnerHTML={{ __html: description.replace(descriptionContentRegex, '$1') }}
      />
      <button
        className="uppercase underline"
        onClick={() => {
          setDescription(isExpanded ? shortDescription : product.description);
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? 'read less' : 'read more'}
      </button>
    </>
  );
};
