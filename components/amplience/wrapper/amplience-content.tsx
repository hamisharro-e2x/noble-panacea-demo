/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultContentBody } from 'dc-delivery-sdk-js';

import ContentBlock from '../../content-block';
import ContentCarousel from '../../content-carousel';
import HeroBanner from '../../hero-banner';
import HeroBannerCarousel from '../../hero-banner-carousel';
import VideoShowcase from '../../video-showcase';
import DynamicProductContent from '../dynamic-product-grid/dynamic-product-content';
import DynamicProductGrid from '../dynamic-product-grid/dynamic-product-grid';

type ComponentMapType = Record<string, (...args: any) => any>;

const COMPONENT_MAPPING: ComponentMapType = {
  'https://noble-panacea-demo.vercel.app/content/content-block': ContentBlock,
  'https://noble-panacea-demo.vercel.app/content/hero-banner': HeroBanner,
  'https://noble-panacea-demo.vercel.app/content/dynamic-product-carousel': DynamicProductGrid,
  'https://noble-panacea-demo.vercel.app/content/image-carousel': ContentCarousel,
  'https://noble-panacea-demo.vercel.app/content/video-block': VideoShowcase,
  'https://noble-panacea-demo.vercel.app/content/hero-banner-carousel': HeroBannerCarousel,
  'https://noble-panacea-demo.vercel.app/content/content-product-carousel': DynamicProductContent,
};

const MappingNotFound = (content: DefaultContentBody) => {
  return (
    <div
      style={{
        height: '400px',
        backgroundColor: '#eee',
        border: '1px solid black',
        padding: '15px',
        margin: '10px',
      }}
    >
      <h3 className="text-xl font-black">{content._meta.name}</h3>
      <h4 className="italic">{content._meta.deliveryId}</h4>
      <p className="mb-4 mt-4">No render available for this component. Showing JSON content.</p>
      <pre
        style={{
          maxHeight: '250px',
          overflowY: 'scroll',
        }}
      >
        <code className="block break-words text-xs md:text-sm">
          {JSON.stringify(content, null, 2)}
        </code>
      </pre>
    </div>
  );
};

export interface AmplienceContentProps {
  content?: DefaultContentBody;
}

// Wrapper component maps Amplience components based on content schema
const AmplienceContent = ({ content }: AmplienceContentProps) => {
  const contentSchema = content?._meta.schema || '';

  const Component = COMPONENT_MAPPING[contentSchema] ?? MappingNotFound;

  return <Component {...content} />;
};

export default AmplienceContent;
