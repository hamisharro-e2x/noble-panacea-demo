import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';

import { getProduct } from '~/client/queries/get-product';
import ContentBlock from '~/components/content-block';
import ContentCarousel from '~/components/content-carousel';
import VideoShowcaseColumn from '~/components/video-showcase-column';

import { BreadCrumbs } from './_components/breadcrumbs';
import { Details } from './_components/details';
import { Gallery } from './_components/gallery';
import HowToReturn from './_components/how-to-return';
import { RelatedProducts } from './_components/related-products';
import { Warranty } from './_components/warranty';

interface ProductPageProps {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const productId = Number(params.slug);
  const product = await getProduct(productId);

  if (!product) {
    return {};
  }

  const { pageTitle, metaDescription, metaKeywords } = product.seo;
  const { url, altText: alt } = product.defaultImage || {};

  return {
    title: pageTitle || product.name,
    description: metaDescription || `${product.plainTextDescription.slice(0, 150)}...`,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
    openGraph: url
      ? {
          images: [
            {
              url,
              alt,
            },
          ],
        }
      : null,
  };
}

export default async function Product({ params, searchParams }: ProductPageProps) {
  const productId = Number(params.slug);
  const { slug, ...options } = searchParams;

  const optionValueIds = Object.keys(options)
    .map((option) => ({
      optionEntityId: Number(option),
      valueEntityId: Number(searchParams[option]),
    }))
    .filter(
      (option) => !Number.isNaN(option.optionEntityId) && !Number.isNaN(option.valueEntityId),
    );

  const product = await getProduct(productId, optionValueIds);

  if (!product) {
    return notFound();
  }

  return (
    <>
      <BreadCrumbs productId={product.entityId} />
      <div className="mb-12 mt-4 lg:grid lg:grid-cols-2 lg:gap-20">
        <Gallery product={product} />
        <Details product={product} />
        <div className="lg:col-span-2">
          <Warranty product={product} />
        </div>
      </div>
      <VideoShowcaseColumn content="" isDark videoId="uutvm6c2yo" />
      <HowToReturn />
      <ContentBlock
        content="<h3>Our Ingredient Integrity</h3><span>CRUELTY-FREE, GLUTEN-FREE, AND FRAGRANCE FREE. <br> Free of parabens, silicones, mineral oil, phthalates, petrolatum, formaldehyde, cocamide DEA, propylene glycol, triclosan, myristyl myristate,  GMOs, nitrates, SLS &amp; SLES, artificial colorants, synthetic fragrances, essential oils, paraffin, alcohol, ingredients of animal origin, PEG, and EDTA.</span>"
        image={{
          endpoint: 'applytrial',
          name: 'Laboratory_Footer',
          defaultHost: '',
        }}
        imageAltText="Image 1"
      />
      <ContentCarousel
        className="bg-black text-white"
        content="<h3>ThinkBeautifully</h3><span>Discover authentic natural beauty empowered by a new era in breakthrough science skincare.</span>"
        images={[
          {
            image: {
              endpoint: 'applytrial',
              name: '440857363_488274316855571_4267319130627289715_n',
              defaultHost: '',
            },
            imageAltText: 'Image 1',
          },
          {
            image: {
              endpoint: 'applytrial',
              name: '440849432_454791100261999_5915226278047597079_n',
              defaultHost: '',
            },
            imageAltText: 'Image 5',
          },
          {
            image: {
              endpoint: 'applytrial',
              name: '437473411_446370577963364_9180543844019891543_n',
              defaultHost: '',
            },
            imageAltText: 'Image 6',
          },
          {
            image: {
              endpoint: 'applytrial',
              name: '446508020_416494174694545_7786901077942173167_n',
              defaultHost: '',
            },
            imageAltText: 'Image 7',
          },
          {
            image: {
              endpoint: 'applytrial',
              name: '439175046_1197673061610168_513510427695184318_n',
              defaultHost: '',
            },
            imageAltText: 'Image 8',
          },
        ]}
      />
      <Suspense fallback="Loading...">
        <RelatedProducts productId={product.entityId} />
      </Suspense>
    </>
  );
}

export const runtime = 'edge';
