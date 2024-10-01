import { cn } from '~/lib/utils';

import { Button } from '../ui/button';
import WistiaPlayer from '../wistia-player';

interface VideoShowcaseProps {
  videoId: string;
  eyeBrow?: string;
  title: string;
  subTitle?: string;
  description?: string;
  ctaButton: {
    text: string;
    url: string;
  };
  className?: string;
}

function VideoShowcase({
  videoId,
  eyeBrow,
  title,
  subTitle,
  description,
  ctaButton,
  className,
}: VideoShowcaseProps) {
  return (
    <div
      className={cn(
        'flex flex-col justify-center space-y-5 py-4 text-center font-light',
        className,
      )}
    >
      {typeof eyeBrow === 'string' && <p className="text-lg">{eyeBrow}</p>}
      <div>
        <h1 className="text-3xl uppercase">{title}</h1>
        {typeof subTitle === 'string' && <p className="text-base">{subTitle}</p>}
      </div>
      {typeof description === 'string' && <p className="text-base">{description}</p>}
      <WistiaPlayer videoId={videoId} wrapper={`wistia-player-${videoId}`} />
      <Button asChild className="mx-auto w-fit" variant="tertiary">
        <a href={ctaButton.url}>{ctaButton.text}</a>
      </Button>
    </div>
  );
}

export default VideoShowcase;
