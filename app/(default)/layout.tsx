import React, { PropsWithChildren, Suspense } from 'react';

import ContentCarousel from '~/components/award-carousel';
import { Footer } from '~/components/footer/footer';
import { Header } from '~/components/header';
import { Cart } from '~/components/header/cart';
import { ProductSheet } from '~/components/product-sheet';
import VideoShowcase from '~/components/video-showcase';

export default function DefaultLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header cart={<Cart />} />
      <main className="flex-1 space-y-8 px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto 2xl:px-0">
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
        <ContentCarousel
          images={[
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (9)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (8)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (4)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (2)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (5)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (11)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (10)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (3)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (7)',
            'https://applytrial.a.bigcontent.io/v1/static/Untitled design (6)',
          ]}
          title="our awards"
        />
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
        <ContentCarousel
          className="bg-black text-white"
          description="<span>Discover authentic natural beauty empowered by a new era in breakthrough science skincare.</span>"
          images={[
            'https://applytrial.a.bigcontent.io/v1/static/440857363_488274316855571_4267319130627289715_n',
            'https://applytrial.a.bigcontent.io/v1/static/440849432_454791100261999_5915226278047597079_n',
            'https://applytrial.a.bigcontent.io/v1/static/437473411_446370577963364_9180543844019891543_n',
            'https://applytrial.a.bigcontent.io/v1/static/446508020_416494174694545_7786901077942173167_n',
            'https://applytrial.a.bigcontent.io/v1/static/439175046_1197673061610168_513510427695184318_n',
            'https://applytrial.a.bigcontent.io/v1/static/441569805_914947920429928_490720246200449182_n',
            'https://applytrial.a.bigcontent.io/v1/static/443265599_417037001130768_2766103955332547747_n',
            'https://applytrial.a.bigcontent.io/v1/static/447066641_3827669654132939_6003317168113244442_n',
          ]}
          title="#ThinkBeautifully"
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
