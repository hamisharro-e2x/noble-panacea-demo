import { cookies } from 'next/headers';
import React, { PropsWithChildren, Suspense } from 'react';

import ControlBar from '~/components/control-bar';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header';
import { Cart } from '~/components/header/cart';
import { ProductSheet } from '~/components/product-sheet';
import { SEASON_KEY } from '~/lib/constants';

export default function DefaultLayout({ children }: PropsWithChildren) {
  const season = cookies().get(SEASON_KEY)?.value;

  return (
    <>
      <ControlBar initialSeason={season} />
      <Header cart={<Cart />} />
      <main className="flex-1 space-y-8 px-6 pb-8 2xl:container sm:px-10 md:px-24 2xl:mx-auto 2xl:px-0">
        {children}
      </main>
      <Suspense fallback={null}>
        <ProductSheet />
      </Suspense>
      <Footer />
    </>
  );
}
