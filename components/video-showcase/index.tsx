import { cn } from '~/lib/utils';

import Markdown from '../markdown';
import { Button } from '../ui/button';
import WistiaPlayer from '../wistia-player';

export interface VideoShowcaseProps {
  videoId: string;
  eyeBrow?: string;
  ctaButton?: {
    label: string;
    href: string;
  };
  className?: string;
  content: string;
  isDark?: boolean;
}

function VideoShowcase({ videoId, content, ctaButton, className, isDark }: VideoShowcaseProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col justify-center space-y-5 py-4 text-center font-light',
        isDark && 'bg-gray-100',
        className,
      )}
    >
      <Markdown className="mb-8 px-12" content={content} />
      <WistiaPlayer videoId={videoId} wrapper={`wistia-player-${videoId}`} />
      {ctaButton && (
        <Button asChild className="mx-auto w-fit" variant={isDark ? 'quaternary' : 'tertiary'}>
          <a href={ctaButton.href}>{ctaButton.label}</a>
        </Button>
      )}
    </div>
  );
}

export default VideoShowcase;
