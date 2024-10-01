import Image from 'next/image';

interface ContentBlockProps {
  title: string;
  content: string;
  backgroundImage: string;
}

function ContentBlock({ title, content, backgroundImage }: ContentBlockProps) {
  return (
    <div className="relative w-full">
      <Image
        alt="Content block image"
        className="absolute -z-10 object-cover"
        fill
        priority
        sizes="(max-width: 1536px) 100vw, 1536px"
        src={backgroundImage}
      />
      <div className="flex flex-col gap-5 px-12 py-20 text-center font-light">
        <h1 className="text-3xl uppercase">{title}</h1>
        <p className="text-lg" dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
}

export default ContentBlock;
