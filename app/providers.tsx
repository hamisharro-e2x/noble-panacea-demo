'use client';

import { PropsWithChildren } from 'react';

import { RealtimeVisualizationProvider } from '~/app/contexts/amplience/realtime-visualization-context';
import { CompareProductsProvider } from '~/app/contexts/compare-products-context';
import { MakeswiftProvider } from '~/makeswift/provider';

export function Providers({ children }: PropsWithChildren) {
  return (
    <CompareProductsProvider>
      <MakeswiftProvider>
        <RealtimeVisualizationProvider>{children}</RealtimeVisualizationProvider>
      </MakeswiftProvider>
    </CompareProductsProvider>
  );
}
