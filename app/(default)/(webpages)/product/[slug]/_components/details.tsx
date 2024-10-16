import { Heart, ShareIcon } from 'lucide-react';
import Image from 'next/image';

import { getProduct } from '~/client/queries/get-product';
import { ProductForm } from '~/components/product-form';

import { Description } from './description';
import { ProductSchema } from './product-schema';

type Product = Awaited<ReturnType<typeof getProduct>>;

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const icons = {
  hyperpigmentation: 'https://cdn.media.amplience.net/i/noblepanacea/Treats Hyperpigmentation',
  sensitiveSkin: 'https://cdn.media.amplience.net/i/noblepanacea/Sensitive skin',
  lossOfVolume: 'https://cdn.media.amplience.net/i/noblepanacea/loss-of-volume',
  irritation: 'https://cdn.media.amplience.net/i/noblepanacea/irritation_1',
  antiAgeing: 'https://cdn.media.amplience.net/i/noblepanacea/anti-ageing',
  evensSkinTone: 'https://cdn.media.amplience.net/i/noblepanacea/Evens skin tone',
  brightensSkin: 'https://cdn.media.amplience.net/i/noblepanacea/Brightens Skin',
  balancesSkin: 'https://cdn.media.amplience.net/i/noblepanacea/Balances Skin',
};

const iconUrls = {
  awardSymbol: 'https://cdn.media.amplience.net/i/noblepanacea/award-symbol',
  nuclear: 'https://cdn.media.amplience.net/i/noblepanacea/nuclear',
  skin: 'https://cdn.media.amplience.net/i/noblepanacea/skin',
  noPlastic: 'https://cdn.media.amplience.net/i/noblepanacea/no-plastic',
};

const vanguardData = [
  {
    title: 'The only skincare brand created by a Nobel Laureate scientist',
    description:
      'Dr. Robert Langer is one of the most cited individuals in history and has received over 220 awards for his work in biotechnology and drug delivery.',
    icon: iconUrls.awardSymbol,
  },
  {
    title: 'Patented OSMV™ technology protects the ingredients',
    description:
      'OSMV™ is a patented technology that protects the ingredients in our formulas from degradation, ensuring they are delivered to the skin in their purest form.',
    icon: iconUrls.nuclear,
  },
  {
    title: 'OSMV™ boosts skin absorption by 200%',
    description:
      'Our patented OSMV™ technology boosts skin absorption by 200%, ensuring that our products are more effective than traditional skincare products.',
    icon: iconUrls.skin,
  },
  {
    title: 'Starch-based and plastic-free packaging',
    description:
      'Our packaging is made from starch-based materials that are 100% biodegradable and compostable, making them better for the environment.',
    icon: iconUrls.noPlastic,
  },
];

export const Details = ({
  product,
  additionalDetails = false,
}: {
  product: NonNullable<Product>;
  additionalDetails?: boolean;
}) => {
  const showPriceRange =
    product.prices?.priceRange.min.value !== product.prices?.priceRange.max.value;
  const collection = product.customFields.find((field) => field.name === 'COLLECTION')?.value;
  const dosage = product.customFields.find((field) => field.name === 'DOSAGE')?.value;
  const concerns = product.customFields.filter((field) => field.name === 'CONCERNS');

  return (
    <div className="space-y-2">
      {Boolean(collection) && <p className="text-base font-light uppercase">{collection}</p>}

      <h1 className="text-4xl font-extralight uppercase lg:text-5xl">{product.name}</h1>

      <div className="flex items-center justify-between">
        {product.prices && (
          <div className="my-6 text-lg font-semibold lg:text-xl">
            {showPriceRange ? (
              <span>
                {currencyFormatter.format(product.prices.priceRange.min.value)} -{' '}
                {currencyFormatter.format(product.prices.priceRange.max.value)}
              </span>
            ) : (
              <>
                {product.prices.retailPrice?.value !== undefined && (
                  <span>
                    MSRP:{' '}
                    <span className="line-through">
                      {currencyFormatter.format(product.prices.retailPrice.value)}
                    </span>
                    <br />
                  </span>
                )}
                {product.prices.salePrice?.value !== undefined &&
                product.prices.basePrice?.value !== undefined ? (
                  <>
                    <span>
                      Was:{' '}
                      <span className="line-through">
                        {currencyFormatter.format(product.prices.basePrice.value)}
                      </span>
                    </span>
                    <br />
                    <span>Now: {currencyFormatter.format(product.prices.salePrice.value)}</span>
                  </>
                ) : (
                  product.prices.price.value && (
                    <span>{currencyFormatter.format(product.prices.price.value)}</span>
                  )
                )}
              </>
            )}
          </div>
        )}
        <div className="flex gap-4">
          <ShareIcon aria-hidden="true" className="cursor-pointer duration-1000 hover:scale-110" />
          <Heart aria-hidden="true" className="cursor-pointer duration-1000 hover:scale-110" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="no-scrollbar flex gap-2 overflow-x-scroll">
          {concerns.map((concern, index) => (
            <div
              className="flex flex-shrink-0 items-center space-x-2 bg-gray-100 p-2"
              key={concern.entityId}
            >
              <Image
                alt="icon"
                height={30}
                src={
                  Object.entries(icons)[index]?.[1] ??
                  'https://cdn.media.amplience.net/i/noblepanacea/Treats%20Hyperpigmentation'
                }
                width={30}
              />
              <p className="whitespace-nowrap text-xs font-light">{concern.value}</p>
            </div>
          ))}
        </div>

        {Boolean(dosage) && <p className="font-semibold">{dosage}</p>}

        <Description product={product} />
        <ProductForm product={product} />

        <div className="space-y-4 bg-gray-100 p-4">
          <h2 className="text-sm font-semibold uppercase">THE VANGUARD IN SKINCARE</h2>
          {vanguardData.map(({ title, icon }) => (
            <div className="flex items-center space-x-4" key={title}>
              <Image alt="icon" height={24} src={icon} width={24} />
              <p className="text-sm font-light">{title}</p>
            </div>
          ))}
        </div>

        {additionalDetails && (
          <div className="my-12">
            <h2 className="mb-4 text-xl font-bold md:text-2xl">Additional details</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {Boolean(product.sku) && (
                <div>
                  <h3 className="font-semibold">SKU</h3>
                  <p>{product.sku}</p>
                </div>
              )}
              {Boolean(product.upc) && (
                <div>
                  <h3 className="font-semibold">UPC</h3>
                  <p>{product.upc}</p>
                </div>
              )}
              {Boolean(product.minPurchaseQuantity) && (
                <div>
                  <h3 className="font-semibold">Minimum purchase</h3>
                  <p>{product.minPurchaseQuantity}</p>
                </div>
              )}
              {Boolean(product.maxPurchaseQuantity) && (
                <div>
                  <h3 className="font-semibold">Maxiumum purchase</h3>
                  <p>{product.maxPurchaseQuantity}</p>
                </div>
              )}
              {Boolean(product.availabilityV2.description) && (
                <div>
                  <h3 className="font-semibold">Availability</h3>
                  <p>{product.availabilityV2.description}</p>
                </div>
              )}
              {Boolean(product.condition) && (
                <div>
                  <h3 className="font-semibold">Condition</h3>
                  <p>{product.condition}</p>
                </div>
              )}
              {Boolean(product.weight) && (
                <div>
                  <h3 className="font-semibold">Weight</h3>
                  <p>
                    {product.weight?.value} {product.weight?.unit}
                  </p>
                </div>
              )}
              {Boolean(product.customFields) &&
                product.customFields.map((customField) => (
                  <div key={customField.entityId}>
                    <h3 className="font-semibold">{customField.name}</h3>
                    <p>{customField.value}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
        <ProductSchema product={product} />
      </div>
    </div>
  );
};
