'use client';

import { clsx } from 'clsx';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import { localiseString } from '~/utils/localized-string';

import DefaultAdaptiveImageRef from '../adaptive-image/default-adaptive-image';
import DefaultAdaptiveImageSkeleton from '../adaptive-image/default-adaptive-image-skeleton';
import {
  AmplienceImage,
  ImageScaleFit,
  ImageScaleMode,
  type ImageTransformations,
} from '../image/image.types';
import LinkWithQuery from '../link-with-query/link-with-query';

export interface SimpleBannerProps {
  image?: {
    img?: {
      image: ImageTransformations & {
        image: AmplienceImage;
      };
    };
    disablePoiAspectRatio: boolean;
    imageAltText: string;
    di: string;
  };
  bannerText?: {
    header: string;
    subheader?: string;
    description: string;
  };
  opacity?: number;
  ctaSettings?: {
    linkUrl: string;
    buttonText: string;
  };
  textPositioning?: {
    textPositionHorizontal: 'left' | 'center' | 'right';
    textPositionVertical: 'top' | 'middle' | 'bottom';
  };
}

const SimpleBanner = ({
  image,
  bannerText,
  ctaSettings,
  opacity = 0.9,
  textPositioning = {
    textPositionHorizontal: 'center',
    textPositionVertical: 'middle',
  },
}: SimpleBannerProps) => {
  const searchParams = useSearchParams();
  const locale = searchParams.get('locale') || undefined;
  const [imageLoading, setImageLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement>(null);

  // Method called with the image is loaded
  const handleImageLoaded = () => {
    setImageLoading(false);
  };

  // Checking that the image is loaded

  useEffect(() => {
    if (imageRef.current?.complete && imageLoading) {
      setImageLoading(false);
    }
  }, [imageRef.current?.complete, imageLoading]);

  const { img } = image || {};

  const transformations: ImageTransformations = {
    ...img?.image,
    upscale: false,
    strip: true,
    quality: 80,
    scaleMode: !image?.disablePoiAspectRatio ? ImageScaleMode.ASPECT_RATIO : undefined,
    scaleFit:
      !image?.disablePoiAspectRatio &&
      img?.image.poi &&
      img.image.poi.x !== -1 &&
      img.image.poi.y !== -1
        ? ImageScaleFit.POINT_OF_INTEREST
        : undefined,
  };

  // Checks if there is any text provided
  const isOverlayVisible =
    bannerText?.header ||
    bannerText?.subheader ||
    bannerText?.description ||
    ctaSettings?.buttonText;

  const { textPositionHorizontal, textPositionVertical } = textPositioning;
  const placements = {
    'left-top': 'md:left-0 md:top-0',
    'left-middle': 'md:left-0 md:top-1/2 md:-translate-y-1/2',
    'left-bottom': 'md:left-0 md:bottom-0',
    'center-top': 'md:top-0 md:left-1/2 md:-translate-x-1/2',
    'center-middle': 'md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2',
    'center-bottom': 'md:bottom-0 md:left-1/2 md:-translate-x-1/2',
    'right-top': 'md:right-0 md:top-0',
    'right-middle': 'md:right-0 md:top-1/2 md:-translate-y-1/2',
    'right-bottom': 'md:right-0 md:bottom-0',
  };

  return (
    <div className="relative">
      {imageLoading ? <DefaultAdaptiveImageSkeleton /> : null}
      <div
        className="bg-[#ccc]"
        style={{
          display: imageLoading ? 'none' : 'block',
        }}
      >
        <DefaultAdaptiveImageRef
          diParams={image?.di}
          image={img?.image.image}
          imageAltText={image?.imageAltText}
          onLoad={() => handleImageLoaded()}
          ref={imageRef}
          transformations={transformations}
        />
      </div>
      {Boolean(isOverlayVisible) && (
        <div
          className={clsx(
            'max-w-[500px] px-10 py-6 text-center md:absolute',
            placements[`${textPositionHorizontal}-${textPositionVertical}`],
          )}
          style={{
            backgroundColor: `rgba(255, 255, 255, ${opacity})`,
            textAlign: textPositionHorizontal,
          }}
        >
          <h1 className="mb-8 mt-0 text-3xl font-black lg:text-5xl">
            {bannerText && localiseString(bannerText.header, locale)}
          </h1>
          <h2 className="text-2xl font-black lg:text-3xl">{bannerText?.subheader}</h2>
          <p style={{ marginBottom: '20px' }}>{bannerText?.description}</p>
          {ctaSettings && Boolean(ctaSettings.buttonText) && (
            <LinkWithQuery
              className="font mt-4 rounded bg-[#333] px-3.5 py-2.5 text-xs font-bold text-[#eee] no-underline hover:bg-[#eee] hover:text-[#333] hover:no-underline"
              href={ctaSettings.linkUrl || '#'}
            >
              {localiseString(ctaSettings.buttonText, locale)}
            </LinkWithQuery>
          )}
        </div>
      )}
    </div>
  );
};

export default SimpleBanner;
