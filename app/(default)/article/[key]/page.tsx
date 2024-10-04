/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React from 'react';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import ArticleBlock from '~/components/article/article-block';

interface Props {
  params: { key: string };
  searchParams: { locale: string; season: string; hubName: string; stagingEnvironment: string };
}

export default async function Page({ params: { key }, searchParams }: Props) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));

  try {
    const response = await amplienceClient.getContentItemByKey(key);

    console.log('response', response);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
    const article = response.toJSON();

    return <ArticleBlock {...article} />;
  } catch (e) {
    console.error(`Unable to load article by key: ${key}`);
  }
}
