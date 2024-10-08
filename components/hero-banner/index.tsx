import Image from 'next/image';

import { cn } from '~/lib/utils';

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
  isDark?: boolean;
}

function HeroBanner({ image, content, imageAltText, ctaButton, isDark }: HeroBannerProps) {
  return (
    <div className="relative font-light ">
      <Image
        alt={imageAltText}
        className="absolute -z-10 object-cover"
        fill
        priority
        sizes="(max-width: 1536px) 100vw, 1536px"
        src={`https://${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`}
      />
      <div
        className={cn(
          'flex w-full flex-col gap-5 px-12 pb-48 pt-36 text-white md:w-2/3 xl:w-2/5',
          isDark && 'text-black',
        )}
      >
        <Markdown content={content} />
        {ctaButton && (
          <Button asChild className="w-fit" variant={isDark ? 'quaternary' : 'tertiary'}>
            <a href={ctaButton.href}>{ctaButton.label}</a>
          </Button>
        )}
      </div>
    </div>
  );
}

export default HeroBanner;
