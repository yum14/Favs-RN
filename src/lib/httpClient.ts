import { createParser } from './domParser';

export interface MetaInfo {
  uri: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogImage?: string;
  fbAppId?: string;
  TwitterCard?: string;
  TwitterSite?: string;
  TwitterCreator?: string;
  title?: string;
  description?: string;
  Thumbnail?: string;
}

export const getMetaAsync = async (uri: string): Promise<MetaInfo> => {
  const result: MetaInfo = { uri: uri };

  const response = await fetch(uri);
  const html = await response.text();

  const doc = createParser().parseFromString(html, 'text/html');

  if (!doc) {
    throw new Error('could not parse!');
  }

  const title = doc.getElementsByTagName('title');
  if (title && title.length > 0) {
    result.title = title[0].textContent;
  }

  const metaTags = Array.from<HTMLMetaElement>(doc.getElementsByTagName('meta'));
  metaTags.forEach(tag => {
    switch (tag.getAttribute('property')) {
      case 'og:title':
        result.ogTitle = tag.getAttribute('content');
        break;
      case 'og:description':
        result.ogDescription = tag.getAttribute('content');
        break;
      case 'og:type':
        result.ogType = tag.getAttribute('content');
        break;
      case 'og:url':
        result.ogUrl = tag.getAttribute('content');
        break;
      case 'og:image':
        result.ogImage = tag.getAttribute('content');
        break;
      case 'fb:app_id':
        result.fbAppId = tag.getAttribute('content');
        break;
      default:
        break;
    }

    switch (tag.getAttribute('name')) {
      case 'description':
        result.description = tag.getAttribute('content');
        break;
      case 'thumbnail':
        result.Thumbnail = tag.getAttribute('content');
        break;
      case 'twitter:card':
        result.TwitterCard = tag.getAttribute('content');
        break;
      case 'twitter:site':
        result.TwitterSite = tag.getAttribute('content');
        break;
      case 'twitter:creator':
        result.TwitterCreator = tag.getAttribute('content');
        break;
      default:
        break;
    }
  });

  return result;
};
