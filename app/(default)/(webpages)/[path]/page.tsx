import { Page as MakeswiftPage } from '@makeswift/runtime/next';
import { getSiteVersion } from '@makeswift/runtime/next/server';
import { notFound } from 'next/navigation';

import { client } from '~/makeswift/client';

interface ParsedUrlQuery {
  path: string;
}

export default async function Page({ params }: { params: ParsedUrlQuery }) {
  const pages = await client.getPages().toArray();

  pages.map((page) => ({
    path: page.path.split('/').filter((segment) => segment !== ''),
  }));

  const snapshot = await client.getPageSnapshot(params.path, {
    siteVersion: getSiteVersion(),
  });

  if (snapshot == null) return notFound();

  return <MakeswiftPage snapshot={snapshot} />;
}
