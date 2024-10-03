/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-assertions */

import { cookies } from 'next/headers';
import React from 'react';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import AmplienceContent from '~/components/amplience/wrapper/amplience-content';
import { SEASON_KEY } from '~/lib/constants';

const HOMEPAGE_DELIVERY_KEY = String(process.env.AMPLIENCE_HOMEPAGE_DELIVERY_KEY);

export interface HomeProps {
  searchParams: { locale: string; season: string; hubName: string; stagingEnvironment: string };
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

export default async function Home({ searchParams }: HomeProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));
  const season = cookies().get(SEASON_KEY)?.value;

  try {
    const response = await amplienceClient.getContentItemByKey(HOMEPAGE_DELIVERY_KEY);

    const items = response.toJSON().contentPage.content as any[];

    return (
      <>
        {items
          .filter((item) => !season || !item.season || item.season === season)
          .map((item, index: number) => {
            return <AmplienceContent content={item} key={index} />;
          })}
      </>
    );
  } catch (e) {
    console.error(`Unable to load content item by key: ${HOMEPAGE_DELIVERY_KEY}`);
  }
}

export const runtime = 'edge';
