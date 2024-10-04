import Image from 'next/image';

import { cn } from '~/lib/utils';

import { AmplienceImage } from '../amplience/image/image.types';
import Markdown from '../markdown';
import { Button } from '../ui/button';

interface ContentBlockProps {
  content: string;
  image: AmplienceImage;
  imageAltText: string;
  isDark?: boolean;
  ctaButton?: {
    label: string;
    href: string;
  };
}

function ContentBlock({ content, image, imageAltText, isDark, ctaButton }: ContentBlockProps) {
  return (
    <div className="relative w-full">
      <Image
        alt={imageAltText}
        className="absolute -z-10 object-cover"
        fill
        priority
        sizes="(max-width: 1536px) 100vw, 1536px"
        src={`https://${image.endpoint}.a.bigcontent.io/v1/static/${image.name}`}
      />
      <div className={cn('flex flex-col gap-5 px-12 py-20 text-center', isDark && 'text-white')}>
        <Markdown content={content} />
        {ctaButton && (
          <Button asChild className="mx-auto w-fit" variant={isDark ? 'quaternary' : 'tertiary'}>
            <a href={ctaButton.href}>{ctaButton.label}</a>
          </Button>
        )}
      </div>
    </div>
  );
}

export default ContentBlock;
