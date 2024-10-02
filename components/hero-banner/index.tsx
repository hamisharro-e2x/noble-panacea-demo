import Image from 'next/image';

import { AmplienceImage } from '../amplience/image/image.types';
import Markdown from '../markdown';
import { Button } from '../ui/button';

export interface HeroBannerProps {
  content: string;
  image: AmplienceImage;
  imageAltText: string;
  ctaButton?: {
    label: string;
    href: string;
  };
}

function HeroBanner({ image, content, imageAltText, ctaButton }: HeroBannerProps) {
  return (
    <div className="relative grid-cols-1 font-light md:grid-cols-1">
      <Image
        alt={imageAltText}
        className="absolute -z-10 object-cover"
        fill
        priority
        sizes="(max-width: 1536px) 100vw, 1536px"
        src={`https://${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`}
      />
      <div className="flex w-2/5 flex-col gap-5 px-12 pb-48 pt-36 text-white">
        <Markdown content={content} />
        {ctaButton && (
          <Button asChild className="w-fit" variant="tertiary">
            <a href={ctaButton.label}>{ctaButton.label}</a>
          </Button>
        )}
      </div>
    </div>
  );
}

export default HeroBanner;
