import { forwardRef, Ref } from 'react';

import AdaptiveImage, { type AdaptiveImageProps } from './adaptive-image';
import AdaptiveImageSource from './adaptive-image-source';

type DefaultAdaptiveImageProps = Omit<AdaptiveImageProps, 'children'>;

const DefaultAdaptiveImage = ({ imageRef, ...props }: DefaultAdaptiveImageProps) => {
  return (
    <AdaptiveImage ref={imageRef} {...props}>
      <AdaptiveImageSource
        media="(min-width: 1280px)"
        transformations={{
          width: 1500,
          aspectRatio: '2:1',
        }}
      />
      <AdaptiveImageSource
        media="(min-width: 1024px)"
        transformations={{
          width: 1280,
          aspectRatio: '2:1',
        }}
      />
      <AdaptiveImageSource
        media="(min-width: 768px)"
        transformations={{
          width: 1024,
          aspectRatio: '1.5:1',
        }}
      />
      <AdaptiveImageSource
        media="(max-width: 768px)"
        transformations={{
          width: 768,
          aspectRatio: '1:1',
        }}
      />
    </AdaptiveImage>
  );
};

const DefaultAdaptiveImageRef = forwardRef(
  (props: AdaptiveImageProps, ref: Ref<HTMLImageElement>) => (
    <DefaultAdaptiveImage imageRef={ref} {...props} />
  ),
);

export default DefaultAdaptiveImageRef;
