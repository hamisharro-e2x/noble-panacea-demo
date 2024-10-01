import React, { PropsWithChildren, Suspense } from 'react';
import AwardCarousel from '~/components/award-carousel';

import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header';
import { Cart } from '~/components/header/cart';
import { ProductSheet } from '~/components/product-sheet';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header cart={<Cart />} />
      <main className="flex-1 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
        <AwardCarousel />
        {children}
      </main>
      <Suspense fallback={null}>
        <ProductSheet />
      </Suspense>
      <Footer />
    </>
  );
}
