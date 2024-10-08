import { NextRequest, NextResponse } from 'next/server';

import { getProducts } from '~/client/queries/get-products';

export const GET = async (request: NextRequest, { params }: { params: { ids: string } }) => {
  const { ids } = params;

  if (ids) {
    const productIds = ids.split(',').map((item) => Number.parseInt(item, 10));
    const products = await getProducts({
      productIds,
      first: productIds.length,
    });

    return NextResponse.json(products);
  }

  return new Response('Missing product ids.', { status: 400 });
};

export const runtime = 'edge';
