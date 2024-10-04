import { AmplienceImage } from '../amplience/image/image.types';

export interface Article {
  _meta: {
    deliveryKey: string;
  };
  title: string;
  author: string;
  releaseDate: string;
  url: string;
  content: string;
  imageCaption: string;
  image: AmplienceImage;
}
