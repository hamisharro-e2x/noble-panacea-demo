import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '~/components/ui/accordion';
import { cn } from '~/lib/utils';

import WistiaPlayer from '../wistia-player';

interface VideoShowcaseProps {
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

const accordionItems = [
  {
    id: '1',
    title: 'ULTIMATE PROTECTION',
    content:
      'Ingredients are maximally protected at the individual molecule level to preserve their integrity for optimal freshness while preventing cross-interaction. This allows the full potency and power of our active ingredients to be preserved and unleashed upon application.',
  },
  {
    id: '2',
    title: 'EXTREME PRECISION',
    content: `OSMVs™ are programmed to release active ingredients individually optimized to their unique profiles for maximal absorption by the skin at the right location, increasing the actives’ skin penetration by more than 200%* for enhanced efficacy.

      *In-vitro clinical tests`,
  },
  {
    id: '3',
    title: 'PROGRAMMED SEQUENCE',
    content:
      'A revolutionary development, individual ingredients are programmed to be released with the optimal timing, control, and ordered sequence to maximize the potency of individual ingredients as well as the overall formula treatment.',
  },
  {
    id: '4',
    title: 'EXTENDED RELEASE',
    content: `The OSMV's™ long-term release of up to tenfold* is carefully controlled through a staggered, multi-layered method based on the ingredient profile and its skin benefits, allowing a continual dosage during the therapeutic window when it’s most potent and effective.

    *In-vitro clinical tests`,
  },
];

function VideoShowcaseColumn({ videoId, className, isDark }: VideoShowcaseProps) {
  return (
    <div
      className={cn(
        'grid grid-cols-2 justify-center gap-8 px-12 py-8 font-extralight',
        isDark && 'bg-gray-100',
        className,
      )}
    >
      <WistiaPlayer videoId={videoId} wrapper={`wistia-player-${videoId}`} />
      <div className="space-y-8">
        <p className="font-normal">
          The total power of the OSMV’s<span className="align-top text-[10px] font-bold">TM </span>
          unique actions for up to tenfold
          <span className="align-top text-[10px] font-bold">* </span>
          overall efficacy
        </p>
        <div>
          <h2 className="text-3xl">PERPETUAL POTENCY</h2>
          <Accordion className="w-full" collapsible defaultValue="1" type="single">
            {accordionItems.map(({ title, content }) => (
              <AccordionItem className="flex flex-col" key={title} value="compare">
                <AccordionTrigger className="text-xl font-extralight">{title}</AccordionTrigger>
                <AccordionContent className="border-b p-4 text-sm">{content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export default VideoShowcaseColumn;
