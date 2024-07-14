import Image from 'next/image';
import Container from '../components/Container/Container';
import TitleContainer from '../components/TitleContainer/TitleContainer';
import styles from './locations.module.scss';
import CustomMap from '../components/CustomMap/CustomMap';
import MapProvider from '../Providers/MapProvider';

export default function LocationsPage() {
  const locations = [
    {
      title: 'Istanbul / Türkiye',
      desc: "Nestled in the heart of Istanbul, our café embodies the rich cultural heritage and vibrant spirit of Türkiye. Enjoy our expertly crafted specialty coffees while soaking in the city's unique blend of tradition and modernity. Whether you're savoring a cup indoors or taking in the bustling atmosphere from our outdoor seating, our Istanbul location promises an unforgettable coffee experience. Find us easily on Google Maps and join us for a taste of Turkish hospitality.",
      image: '/images/cafe-istanbul.webp',
      address: 'İstiklal Caddesi No: 123, Beyoğlu, İstanbul',
      phone: '+90 212 555 1234',
      lat: 41.0367,
      lng: 28.985,
      id: '1',
    },
    {
      title: 'Athens / Greece',
      desc: 'Located in the vibrant city of Athens, our café offers a delightful blend of ancient history and modern charm. Savor our specialty coffees while enjoying the warm and welcoming atmosphere. Our Athens location is a perfect spot to relax and immerse yourself in Greek culture. Easily find us on Google Maps and experience Greek hospitality at its finest.',
      image: '/images/cafe-greece.webp',
      address: 'Plaka Square, 15 Athens',
      phone: '+30 210 555 6789',
      lat: 37.9756,
      lng: 23.7368,
      id: '2',
    },
    {
      title: 'New York / USA',
      desc: "In the bustling city of New York, our café provides a cozy retreat from the urban rush. Enjoy our expertly crafted coffees in a setting that combines contemporary design with a touch of New York's iconic style. Whether you're a local or a visitor, our New York location offers a unique coffee experience. Find us on Google Maps and join us for a cup of coffee in the city that never sleeps.",
      image: '/images/cafe-newyork.webp',
      address: '123 Broadway Ave New York, NY 10001',
      phone: '+1 212 555 4321',
      lat: 40.7128,
      lng: -74.006,
      id: '3',
    },
    {
      title: 'London / UK',
      desc: "Situated in the heart of London, our café blends traditional British charm with a modern twist. Enjoy our specialty coffees in a setting that captures the essence of London's dynamic culture. Our London location is perfect for both locals and tourists seeking a delightful coffee experience. Easily locate us on Google Maps and enjoy a taste of London hospitality.",
      image: '/images/cafe-london.webp',
      address: '5 Covent Garden London WC2H 9JA',
      phone: '+44 20 5555 9876',
      lat: 51.5099,
      lng: -0.1181,
      id: '4',
    },
  ];

  return (
    <main>
      <TitleContainer
        title="Our Global Café Locations"
        content="Discover the essence of our specialty coffee in four iconic cities around the world: Istanbul, Athens, New York, and London. Each of our cafes offers a unique ambiance, reflecting the local culture while serving our signature blends crafted with care. Whether you're a local or a traveler, visit us to experience the perfect cup of coffee. Find our exact locations below."
      />
      <div className={styles.container}>
        {locations.map((location, index) => (
          <Container key={index}>
            <div
              id={location.id}
              className={`${
                index % 2 === 0 ? styles.card : styles.reverseCard
              }`}
            >
              <div className={styles.content}>
                <h2>{location.title}</h2>
                <p>{location.desc}</p>
                <span>{location.address}</span>
                <span>{location.phone}</span>
              </div>

              <div>
                <Image
                  className={styles.image}
                  src={location.image}
                  width={400}
                  height={400}
                  alt={`${location.title} cafe image`}
                ></Image>
              </div>
            </div>
            <MapProvider>
              <CustomMap lat={location.lat} lng={location.lng} />
            </MapProvider>
            {index < locations.length - 1 && <hr className={styles.divider} />}
          </Container>
        ))}
      </div>
    </main>
  );
}
