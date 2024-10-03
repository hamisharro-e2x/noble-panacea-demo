/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { ReadonlyURLSearchParams } from 'next/navigation';
import React from 'react';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';

const HOMEPAGE_DELIVERY_KEY = String(process.env.AMPLIENCE_HOMEPAGE_DELIVERY_KEY);

export interface HomeProps {
  searchParams: ReadonlyURLSearchParams;
}

export async function generateMetadata({ searchParams }: HomeProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));

  try {
    const response = await amplienceClient.getContentItemByKey(HOMEPAGE_DELIVERY_KEY);

    const page = response.toJSON().contentPage;

    return {
      title: page.pageTitle,
      description: page.pageDescription,
    };
  } catch (e) {
    console.error(`Unable to load content item by key for metadata: ${HOMEPAGE_DELIVERY_KEY}`);
  }
}

// .filter((item) => !!season || !item.season || item.season === season)

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));

  try {
    const response = await amplienceClient.getContentItemByKey(HOMEPAGE_DELIVERY_KEY);

    const items = response.toJSON().contentPage.content as any[];

    return (
      <>
        {items.map((item, index: number) => {
          return <AmplienceContent content={item} key={index} />;
        })}
      </>
    );
  } catch (e) {
    console.error(`Unable to load content item by key: ${HOMEPAGE_DELIVERY_KEY}`);
  }
}

export const runtime = 'edge';
