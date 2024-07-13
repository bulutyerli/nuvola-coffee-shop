'use client';

import { Map, Marker } from '@vis.gl/react-google-maps';
import { useState } from 'react';
import styles from './customMap.module.scss';

export default function CustomMap({ lat, lng }: { lat: number; lng: number }) {
  const [markerLocation, setMarkerLocation] = useState({
    lat,
    lng,
  });

  return (
    <div className={styles.mapContainer}>
      <Map
        style={{ borderRadius: '20px' }}
        defaultZoom={13}
        defaultCenter={markerLocation}
        gestureHandling={'greedy'}
        disableDefaultUI
      >
        <Marker position={markerLocation} />
      </Map>
    </div>
  );
}
