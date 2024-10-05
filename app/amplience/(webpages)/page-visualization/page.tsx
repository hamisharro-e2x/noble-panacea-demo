/* eslint-disable @typescript-eslint/consistent-type-assertions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { cookies } from 'next/headers';
import { ReadonlyURLSearchParams } from 'next/navigation';
import React from 'react';

import { createAmplienceClient } from '~/amplience-client';
import { clientOptionsMapper } from '~/amplience-client/mappers/client-options-mapper';
import { RealtimePageVisualization } from '~/components/amplience/realtime-visualization/realtime-visualization';
import { SEASON_KEY } from '~/lib/constants';

export interface VisualizationProps {
  searchParams: ReadonlyURLSearchParams & { contentId: string };
}

export default async function Visualization({ searchParams }: VisualizationProps) {
  const amplienceClient = createAmplienceClient(clientOptionsMapper(searchParams));
  const season = cookies().get(SEASON_KEY)?.value;
  const { contentId } = searchParams;

  try {
    const response = await amplienceClient.getContentItemById(contentId);

    const content = response.toJSON();

    return <RealtimePageVisualization content={content} season={season} />;
  } catch (e) {
    return (
      <div>
        <p>Content not found...</p>
      </div>
    );
  }
}

export const fetchCache = 'force-no-store';
