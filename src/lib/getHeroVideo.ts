'use server';

import createSignedUrl from './s3PreSignURL';

export default async function getHeroVideo() {
  const link = await createSignedUrl('products/hero-video.mp4');
  return link;
}
