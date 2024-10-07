/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/consistent-type-assertions */
'use client';

import { DefaultContentBody } from 'dc-delivery-sdk-js';
import React, { useCallback, useState } from 'react';

import {
  useInitialRealtimeContent,
  useRealtimeVisualization,
} from '~/app/contexts/amplience/realtime-visualization-context';
import ArticleBlock from '~/components/article/article-block';

import AmplienceContent from '../wrapper/amplience-content';

export interface RealtimeVisualizationProps {
  content?: DefaultContentBody;
}

interface RealtimePageVisualizationProps extends RealtimeVisualizationProps {
  season?: string;
}

export function RealtimeComponentVisualization({ content }: RealtimeVisualizationProps) {
  const [contentItem, setContentItem] = useState<DefaultContentBody | undefined>(content);

  const updateRealtimeContent = useCallback((realtimeContent: Record<string, unknown>) => {
    setContentItem(realtimeContent as DefaultContentBody);
  }, []);

  useInitialRealtimeContent(updateRealtimeContent);

  useRealtimeVisualization(updateRealtimeContent);

  return <div>{contentItem && <AmplienceContent content={contentItem} />}</div>;
}

export function RealtimePageVisualization({ content, season }: RealtimePageVisualizationProps) {
  const [contentItem, setContentItem] = useState<DefaultContentBody | undefined>(content);

  const updateRealtimeContent = useCallback((realtimeContent: Record<string, unknown>) => {
    setContentItem(realtimeContent as DefaultContentBody);
  }, []);

  useInitialRealtimeContent(updateRealtimeContent);

  useRealtimeVisualization(updateRealtimeContent);

  if (!contentItem) return null;

  return (contentItem.content as any[])
    .filter((item) => !season || !item.season || item.season === season)
    .map((item, index: number) => {
      return <AmplienceContent content={item} key={index} />;
    });
}

export function RealtimeArticleVisualization({ content }: RealtimeVisualizationProps) {
  const [contentItem, setContentItem] = useState<DefaultContentBody | undefined>(content);

  const updateRealtimeContent = useCallback((realtimeContent: Record<string, unknown>) => {
    setContentItem(realtimeContent as DefaultContentBody);
  }, []);

  useInitialRealtimeContent(updateRealtimeContent);

  useRealtimeVisualization(updateRealtimeContent);

  return <div>{contentItem && <ArticleBlock {...(contentItem as any)} />}</div>;
}
