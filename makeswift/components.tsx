import { Checkbox, List, Number, Shape, Style, TextInput } from '@makeswift/runtime/controls';

import DynamicProductContent, {
  DynamicProductGridProps,
} from '~/components/amplience/dynamic-product-grid/dynamic-product-content';
import DynamicProductGrid, {
  DynamicProductContentProps,
} from '~/components/amplience/dynamic-product-grid/dynamic-product-grid';
import ContentCarousel, { ContentCarouselProps } from '~/components/content-carousel';
import VideoShowcase, { VideoShowcaseProps } from '~/components/video-showcase';

import { runtime } from './runtime';

function ClassWrapper<T extends object>({
  className,
  Component,
  props,
}: {
  className: string;
  Component: (props: T) => JSX.Element;
  props: T;
}) {
  return (
    <div className={className}>
      <Component {...props} />
    </div>
  );
}

runtime.registerComponent(
  ({ className, ...props }: { className: string } & DynamicProductContentProps) =>
    ClassWrapper({ Component: DynamicProductGrid, className, props }),
  {
    type: 'product-card-carousel',
    label: 'Product Card Carousel',
    props: {
      title: TextInput({ label: 'Title' }),
      limit: Number({ label: 'Limit' }),
      category: TextInput({ label: 'Category', defaultValue: '501' }),
      className: Style({ properties: Style.All }),
    },
  },
);

runtime.registerComponent(
  ({ className, ...props }: { className: string } & DynamicProductGridProps) =>
    ClassWrapper({ Component: DynamicProductContent, className, props }),
  {
    type: 'product-card-content',
    label: 'Product Card Content',
    props: {
      limit: Number({ label: 'Limit' }),
      productIds: List({
        label: 'Product IDs',
        type: TextInput({ label: 'Product ID', defaultValue: '1480' }),
        getItemLabel(item) {
          return item ?? 'Product ID';
        },
      }),
      isDark: Checkbox({ label: 'Dark Mode' }),
      content: TextInput({
        label: 'Content',
        defaultValue:
          '<h1>This is a product card content block</h1><p>great for describing the products</p>',
      }),
      className: Style({ properties: Style.All }),
    },
  },
);

runtime.registerComponent(
  ({ className, ...props }: { className: string } & VideoShowcaseProps) =>
    ClassWrapper({ Component: VideoShowcase, className, props }),
  {
    type: 'video-showcase',
    label: 'Video Showcase',
    props: {
      videoId: TextInput({ label: 'Video ID', defaultValue: '6d52jdbxr1' }),
      content: TextInput({
        label: 'Content',
        defaultValue: '<h4>This is a video showcase block</h4>',
      }),
      ctaButton: Shape({
        type: {
          label: TextInput({ label: 'Label', defaultValue: 'Learn More' }),
          href: TextInput({ label: 'Link', defaultValue: '/learn-more' }),
        },
      }),
      isDark: Checkbox({ label: 'Dark Mode' }),
      className: Style({ properties: Style.All }),
    },
  },
);

runtime.registerComponent(
  ({ className, ...props }: { className: string } & ContentCarouselProps) =>
    ClassWrapper({ Component: ContentCarousel, className, props }),
  {
    type: 'content-carousel',
    label: 'Content Carousel',
    props: {
      content: TextInput({
        label: 'Content',
        defaultValue: '<h4>This is a Content Carousel</h4>',
      }),
      isDark: Checkbox({ label: 'Dark Mode' }),
      images: List({
        label: 'Images',
        type: Shape({
          type: {
            imageAltText: TextInput({ label: 'Image alt text', defaultValue: 'Image' }),
            image: Shape({
              type: {
                defaultHost: TextInput({
                  label: 'Default host',
                  defaultValue: 'a.bigcontent.io/v1/static/',
                }),
                name: TextInput({
                  label: 'Name',
                  defaultValue: '440857363_488274316855571_4267319130627289715_n',
                }),
                endpoint: TextInput({ label: 'Endpoint', defaultValue: 'applytrial' }),
              },
            }),
          },
        }),
        getItemLabel(item) {
          return item?.image?.name ?? 'Image';
        },
      }),
      className: Style({ properties: Style.All }),
    },
  },
);
