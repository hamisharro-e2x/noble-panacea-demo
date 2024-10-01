import React, { PropsWithChildren, Suspense } from 'react';

import AwardCarousel from '~/components/award-carousel';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header';
import { Cart } from '~/components/header/cart';
import HeroBanner from '~/components/hero-banner';
import { ProductSheet } from '~/components/product-sheet';
import VideoShowcase from '~/components/video-showcase';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header cart={<Cart />} />
      <main className="flex-1 space-y-10 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
        <HeroBanner />
        <VideoShowcase />
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
