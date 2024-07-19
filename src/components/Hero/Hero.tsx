'use client';

import { useEffect, useState } from 'react';
import styles from './hero.module.scss';
import createSignedUrl from '@/src/lib/s3PreSignURL';
import getHeroVideo from '@/src/lib/getHeroVideo';

type AnimationType = 'fadeIn' | 'fadeOut';

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [animation, setAnimation] = useState<AnimationType>('fadeIn');
  const [videoLink, setVideoLink] = useState<string | undefined>(undefined);

  const heroTitles = [
    {
      title: 'Discover Our Coffee Selection',
      subtitle: 'Explore our carefully chosen beans and special roasts.',
    },
    {
      title: 'Enjoy Premium Coffee',
      subtitle: 'Experience our unique blends and single-origin varieties.',
    },
    {
      title: 'Explore Coffee Culture',
      subtitle: 'From bean to brew, taste the flavors of our global coffees.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimation('fadeOut'); // Start fading out
      setTimeout(() => {
        setTitleIndex((prev) => (prev + 1) % heroTitles.length);
        setAnimation('fadeIn');
      }, 1000); // Adjust fade out duration as needed
    }, 5000);

    return () => clearInterval(interval);
  }, [heroTitles.length]);

  useEffect(() => {
    const getVideoLink = async () => {
      const link = await getHeroVideo();
      setVideoLink(link);
    };
    getVideoLink();
  }, []);

  return (
    <section className={styles.container}>
      {videoLink && (
        <video
          className={styles.video}
          src={videoLink}
          autoPlay
          loop
          playsInline
          muted
        ></video>
      )}
      <div className={styles.heroTitles}>
        <h1>NUVOLA COFFEE SHOP</h1>
        <h2
          className={`${
            animation === 'fadeIn' ? styles.fadeIn : styles.fadeOut
          }`}
        >
          {heroTitles[titleIndex].title}
        </h2>
        <p
          className={`${
            animation === 'fadeIn' ? styles.fadeIn : styles.fadeOut
          }`}
        >
          {heroTitles[titleIndex].subtitle}
        </p>
      </div>
    </section>
  );
}
