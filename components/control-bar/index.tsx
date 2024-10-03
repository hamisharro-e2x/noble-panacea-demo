'use client';

import Cookies from 'js-cookie';
import { CloudSunRain, Leaf, LucideProps, Snowflake, Sun } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ForwardRefExoticComponent, RefAttributes, useState } from 'react';

import { SEASON_KEY } from '~/lib/constants';
import { cn } from '~/lib/utils';

interface Item {
  title: string;
  Icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>;
}

const seasons: Item[] = [
  { title: 'Spring', Icon: CloudSunRain },
  { title: 'Summer', Icon: Sun },
  { title: 'Autumn', Icon: Leaf },
  { title: 'Winter', Icon: Snowflake },
];

function ControlBar({ initialSeason }: { initialSeason: string | undefined }) {
  const [season, setSeason] = useState<Item | undefined>(
    seasons.find((s) => s.title === initialSeason),
  );

  const router = useRouter();

  return (
    <div className="flex h-12 items-center bg-black py-2 text-white">
      <div className="mx-auto flex w-full max-w-screen-xl items-center space-x-5 px-4">
        <div className="flex h-full w-full items-center justify-center space-x-12">
          {seasons.map(({ Icon, title }) => (
            <Icon
              className={cn(season?.title === title && 'text-gray-300', 'cursor-pointer')}
              key={title}
              onClick={() => {
                if (title === season?.title) {
                  Cookies.remove(SEASON_KEY);
                  setSeason(undefined);
                } else {
                  Cookies.set(SEASON_KEY, title);
                  setSeason({ title, Icon });
                }

                router.refresh();
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ControlBar;
