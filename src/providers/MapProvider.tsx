'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

export default function MapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_API || '';
  return <APIProvider apiKey={apiKey}>{children}</APIProvider>;
}
