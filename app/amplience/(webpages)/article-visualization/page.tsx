/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { ReadonlyURLSearchParams } from 'next/navigation';
import React from 'react';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import ArticleBlock from '~/components/article/article-block';

export interface VisualizationProps {
  searchParams: ReadonlyURLSearchParams & { contentId: string };
}

export default async function Visualization({ searchParams }: VisualizationProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));
  const { contentId } = searchParams;

  try {
    const response = await amplienceClient.getContentItemById(contentId);

    const article = response.toJSON();

    return <ArticleBlock {...article} />;
  } catch (e) {
    return (
      <div>
        <p>Content not found...</p>
      </div>
    );
  }
}

export const runtime = 'edge';

export const fetchCache = 'force-no-store';
