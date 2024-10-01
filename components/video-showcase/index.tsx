import { Button } from '../ui/button';
import WistiaPlayer from '../wistia-player';

const content = {
  videoId: '6d52jdbxr1',
  eyeBrow: 'NEW',
  title: 'Eye Lift Concentrate',
  subTitle: 'Instant Lift. Lasting Firmness.',
  ctaButton: {
    text: 'FIND OUT MORE',
    url: '/#',
  },
};

function VideoShowcase() {
  const { videoId, eyeBrow, title, subTitle, ctaButton } = content;

  return (
    <div className="flex flex-col justify-center space-y-5 text-center font-light">
      {typeof eyeBrow === 'string' && <p className="text-lg">{eyeBrow}</p>}
      <div>
        <h1 className="text-3xl">{title}</h1>
        <p className="text-base">{subTitle}</p>
      </div>
      <WistiaPlayer videoId={videoId} wrapper={`wistia-player-${videoId}`} />
      <Button asChild className="mx-auto w-fit" variant="tertiary">
        <a href={ctaButton.url}>{ctaButton.text}</a>
      </Button>
    </div>
  );
}

export default VideoShowcase;
