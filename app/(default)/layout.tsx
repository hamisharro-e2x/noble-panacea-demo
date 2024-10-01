import React, { PropsWithChildren, Suspense } from 'react';

import DynamicProductGrid from '~/components/amplience/dynamic-product-grid/dynamic-product-grid';
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
      <main className="flex-1 space-y-8 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
        <HeroBanner
          heroContent={[
            {
              eyeBrow:
                '<p>NEW<br>The Exceptional<sup>NP</sup> Eye Lift Concentrate&ZeroWidthSpace;</p>',
              title: 'Open your eyes to the future.',
              subtitle: 'Instant lift, lasting firmness​.',
              imageUrl: 'https://applytrial.a.bigcontent.io/v1/static/Untitled design (12)',
              ctaButton: {
                text: 'LEARN MORE',
                url: '/#',
              },
            },
            {
              eyeBrow: 'Available in Cream SPF 50 &amp; Lotion SPF 30',
              title: 'MULTI-DEFENCE',
              subtitle:
                'An on-the-go high performance protection, prevention and correction system.​',
              imageUrl: 'https://applytrial.a.bigcontent.io/v1/static/Untitled design (14)',
              ctaButton: {
                text: 'DISCOVER MORE',
                url: '/#',
              },
            },
            {
              title: 'Post-Summer Skin',
              eyeBrow: 'Available in Cream SPF 50 & Lotion SPF 30',
              subtitle:
                'After a summer filled with sun, sand, and travel, your skin deserves a little extra TLC. Discover our treatments to restore and rejuvenate your skin.',
              imageUrl: 'https://applytrial.a.bigcontent.io/v1/static/Untitled design (13)',
              ctaButton: {
                text: 'SHOP NOW',
                url: '/#',
              },
            },
          ]}
        />
        <DynamicProductGrid category="501" limit={12} title="Refresh Your Summer Skin" />
        <VideoShowcase
          {...{
            videoId: '6d52jdbxr1',
            eyeBrow: 'NEW',
            title: 'Eye Lift Concentrate',
            subTitle: 'Instant Lift. Lasting Firmness.',
            ctaButton: {
              text: 'FIND OUT MORE',
              url: '/#',
            },
          }}
        />
        <AwardCarousel />
        <VideoShowcase
          {...{
            videoId: 'uutvm6c2yo',
            title: 'Organic Super Molecular VesselTM Technology',
            description:
              'Invented by our Founder Nobel Laureate Sir Fraser Stoddart, our revolutionary OSMVTM Technology is the global vanguard in skincare with its powerful performance in both protecting and delivering active ingredients precisely into skin cells, improving their potency by up to tenfold* for unparalleled anti-aging results. *In-vitro clinical tests',
            ctaButton: {
              text: 'DISCOVER OSMV',
              url: '/#',
            },
            className: 'bg-gray-100',
          }}
        />
        {children}
      </main>
      <Suspense fallback={null}>
        <ProductSheet />
      </Suspense>
      <Footer />
    </>
  );
}
