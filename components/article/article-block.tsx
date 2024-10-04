import Markdown from '../markdown';
import { Button } from '../ui/button';

import { Article } from './types';
import { removeWwwFromUrl } from './utils';

function ArticleBlock({ title, author, releaseDate, url, content }: Article) {
  const { hostname } = new URL(url);
  const hostnameWithoutWww = removeWwwFromUrl(hostname);

  return (
    <div className="space-y-12 px-12 py-20 font-extralight">
      <div className="space-y-4 pb-12 text-center">
        <p className="text-xs 2xl:text-base">{releaseDate}</p>
        <h1 className="text-3xl uppercase 2xl:text-4xl">{hostnameWithoutWww}</h1>
        <p className="text-base font-light 2xl:text-xl">{title}</p>
        <p className="text-sm 2xl:text-lg">{author}</p>
      </div>
      <Markdown content={content} />
      <Button asChild className="w-fit" variant="tertiary">
        <a href={url}>{`Read the full article on ${hostnameWithoutWww}`}</a>
      </Button>
    </div>
  );
}

export default ArticleBlock;
