export const getImageUrl = (path: string) => {
  const cloudFrontDomain = process.env.NEXT_PUBLIC_CLOUDFRONT_DOMAIN;

  const newDomainLink = cloudFrontDomain?.endsWith('/')
    ? cloudFrontDomain.slice(0, -1)
    : cloudFrontDomain;

  const newPath = path.startsWith('/') ? path.slice(1) : path;

  return `${newDomainLink}/${newPath}`;
};
