import fetchAdapter from '@haverstack/axios-fetch-adapter';
import { ContentClient } from 'dc-delivery-sdk-js';

interface AmplienceClientOptions {
  hubName?: string;
  stagingEnvironment?: string;
  locale?: string;
}

class AmplienceClient {
  client: ContentClient;
  constructor({ hubName, stagingEnvironment, locale }: AmplienceClientOptions) {
    this.client = new ContentClient({
      hubName: hubName || String(process.env.AMPLIENCE_HUBNAME),
      stagingEnvironment: stagingEnvironment || '',
      locale: locale || 'en-US',
      adaptor: fetchAdapter as any,
    });
  }
}

export const createAmplienceClient = ({
  hubName,
  stagingEnvironment,
  locale,
}: AmplienceClientOptions) => {
  return new AmplienceClient({ hubName, stagingEnvironment, locale }).client;
};
