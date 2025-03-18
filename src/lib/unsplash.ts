import { createApi } from 'unsplash-js';
import nodeFetch from 'node-fetch';

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY || '',
  fetch: nodeFetch as unknown as typeof fetch,
});

interface UnsplashPhoto {
  url: string;
  blurHash: string | null;
  alt: string;
  author: {
    name: string;
    link: string;
  };
}

export async function getRandomPhoto(query: string): Promise<UnsplashPhoto | null> {
  try {
    const result = await unsplash.photos.getRandom({
      query,
      orientation: 'landscape',
    });

    if (result.type === 'success' && !Array.isArray(result.response)) {
      const photo = result.response;
      return {
        url: photo.urls.regular,
        blurHash: photo.blur_hash,
        alt: photo.alt_description || photo.description || 'Unsplash photo',
        author: {
          name: photo.user.name,
          link: photo.user.links.html,
        },
      };
    }
    throw new Error('Failed to fetch photo');
  } catch (error) {
    console.error('Error fetching random photo:', error);
    return null;
  }
}

export async function getPhotos(query: string, count: number = 6): Promise<UnsplashPhoto[]> {
  try {
    const result = await unsplash.search.getPhotos({
      query,
      perPage: count,
      orientation: 'landscape',
    });

    if (result.type === 'success') {
      return result.response.results.map(photo => ({
        url: photo.urls.regular,
        blurHash: photo.blur_hash,
        alt: photo.alt_description || photo.description || 'Unsplash photo',
        author: {
          name: photo.user.name,
          link: photo.user.links.html,
        },
      }));
    }
    throw new Error('Failed to fetch photos');
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
} 