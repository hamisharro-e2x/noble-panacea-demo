export const contentTypesPatch = {
  defaultVisualizations: [
    {
      label: 'BigCommerce Catalyst Production',
      templatedUri:
        '{{prodUrl}}/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}',
      default: false,
    },
    {
      label: 'BigCommerce Catalyst Development',
      templatedUri:
        'https://localhost:3000/amplience/visualization?contentId={{content.sys.id}}&stagingEnvironment={{vse.domain}}&locale={{locales}}',
      default: false,
    },
  ],
  contentTypes: [
    {
      contentTypeUri: 'https://noble-panacea-demo.vercel.app/content/content-block',
    },
    {
      contentTypeUri: 'https://noble-panacea-demo.vercel.app/content/hero-banner',
    },
    {
      contentTypeUri: 'https://noble-panacea-demo.vercel.app/content/dynamic-product-carousel',
    },
    {
      contentTypeUri: 'https://noble-panacea-demo.vercel.app/content/image-carousel',
    },
    {
      contentTypeUri: 'https://noble-panacea-demo.vercel.app/content/video-block',
    },
    {
      contentTypeUri: 'https://noble-panacea-demo.vercel.app/content/page',
    },
    {
      contentTypeUri: 'https://noble-panacea-demo.vercel.app/slot/page',
      visualizations: [
        {
          label: 'BigCommerce Catalyst Production',
          templatedUri: '{{prodUrl}}?vse={{vse.domain}}',
          default: false,
        },
        {
          label: 'BigCommerce Catalyst Development',
          templatedUri: 'http://localhosts:3000?vse={{vse.domain}}',
          default: false,
        },
      ],
    },
  ],
  applications: [
    {
      name: 'BigCommerce Catalyst Production',
      templatedUri: '{{prodUrl}}?vse={{vse.domain}}',
    },
    {
      name: 'BigCommerce Catalyst Development',
      templatedUri: 'https://localhost:3000?vse={{vse.domain}}',
    },
  ],
};
