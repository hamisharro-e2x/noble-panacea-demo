import Image from 'next/image';

import { AmplienceImage } from '../amplience/image/image.types';
import Markdown from '../markdown';

interface ContentBlockProps {
  content: string;
  image: AmplienceImage;
  imageAltText: string;
}

function ContentBlock({ content, image, imageAltText }: ContentBlockProps) {
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
      <div className="flex flex-col gap-5 px-12 py-20 text-center">
        <Markdown content={content} />
      </div>
    </div>
  );
}

export default ContentBlock;
