import type { Court } from '../types';

const courtImages = [
  '/images/courts/court-hero.png',
  '/images/courts/court-green.png',
  '/images/courts/court-walnut.png',
  '/images/courts/court-rooftop.png',
];

const imageSet = (venue: string) => {
  const offset = [...venue].reduce((total, character) => total + character.charCodeAt(0), 0) % courtImages.length;
  return Array.from({ length: 3 }, (_, index) => courtImages[(offset + index) % courtImages.length]);
};

/** Filters displayed by the discovery experience. */
export const COURT_AMENITIES = ['Parking', 'Changing rooms', 'Equipment rental', 'Café', 'Floodlit', 'Air conditioning'] as const;

/** Bengaluru venues used by the self-contained demo. */
export const courts: Court[] = [
  {
    id: 'court-ace-koramangala', slug: 'ace-arena-koramangala', name: 'Ace Arena', area: 'Koramangala',
    address: '80 Feet Road, 4th Block, Koramangala, Bengaluru', distanceKm: 2.4, pricePerHour: 650, rating: 4.8, reviewCount: 238,
    description: 'A bright, tournament-ready indoor club with high ceilings and a relaxed post-match lounge.',
    amenities: ['Parking', 'Changing rooms', 'Equipment rental', 'Café'], rules: ['Non-marking court shoes only', 'Please arrive 10 minutes before your slot', 'Outside food is not permitted'],
    equipment: ['Yonex nets', 'Shuttlecocks for purchase', 'Racquet rental'], images: imageSet('ace-arena'), featured: true,
    availability: [{ weekday: 0, unavailableSlots: ['07:00', '08:00'] }, { weekday: 2, unavailableSlots: ['19:00', '20:00'] }, { weekday: 6, unavailableSlots: ['08:00'] }],
  },
  {
    id: 'court-smash-indiranagar', slug: 'smash-house-indiranagar', name: 'Smash House', area: 'Indiranagar',
    address: '100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru', distanceKm: 3.1, pricePerHour: 720, rating: 4.9, reviewCount: 176,
    description: 'Six climate-controlled courts designed for focused rallies and fast evening games.',
    amenities: ['Parking', 'Changing rooms', 'Air conditioning', 'Equipment rental'], rules: ['Court shoes are required', 'Maximum four players per court', 'Respect your session end time'],
    equipment: ['Tournament mats', 'Purified water', 'Racquet rental'], images: imageSet('smash-house'), featured: true,
    availability: [{ weekday: 1, unavailableSlots: ['18:00', '19:00'] }, { weekday: 4, unavailableSlots: ['20:00'] }, { weekday: 6, unavailableSlots: ['07:00'] }],
  },
  {
    id: 'court-rally-hsr', slug: 'rally-social-hsr', name: 'Rally Social', area: 'HSR Layout',
    address: '27th Main Road, Sector 1, HSR Layout, Bengaluru', distanceKm: 5.8, pricePerHour: 580, rating: 4.6, reviewCount: 121,
    description: 'A friendly neighborhood venue for social doubles, weekend ladders, and unrushed games.',
    amenities: ['Parking', 'Café', 'Equipment rental'], rules: ['Check in at reception', 'Please keep food in the lounge', 'Children require adult supervision'],
    equipment: ['Practice shuttles', 'Scoreboards', 'Racquet rental'], images: imageSet('rally-social'), featured: true,
    availability: [{ weekday: 3, unavailableSlots: ['18:00', '19:00'] }, { weekday: 5, unavailableSlots: ['09:00'] }],
  },
  {
    id: 'court-shuttle-whitefield', slug: 'shuttle-collective-whitefield', name: 'Shuttle Collective', area: 'Whitefield',
    address: 'ITPL Main Road, Hoodi, Whitefield, Bengaluru', distanceKm: 10.2, pricePerHour: 500, rating: 4.5, reviewCount: 94,
    description: 'An easygoing, floodlit venue with clean courts and plenty of room for after-work play.',
    amenities: ['Parking', 'Floodlit', 'Changing rooms'], rules: ['Bring a government ID for first visit', 'No smoking inside the facility', 'Use the designated waiting area'],
    equipment: ['LED court lighting', 'Water station', 'First-aid kit'], images: imageSet('shuttle-collective'),
    availability: [{ weekday: 1, unavailableSlots: ['07:00'] }, { weekday: 4, unavailableSlots: ['19:00', '20:00'] }, { weekday: 0, unavailableSlots: ['08:00'] }],
  },
  {
    id: 'court-net-jayanagar', slug: 'the-net-jayanagar', name: 'The Net', area: 'Jayanagar',
    address: '4th T Block, Jayanagar, Bengaluru', distanceKm: 6.4, pricePerHour: 550, rating: 4.7, reviewCount: 157,
    description: 'A calm, polished club where early-morning regulars and families share the court.',
    amenities: ['Parking', 'Changing rooms', 'Café', 'Air conditioning'], rules: ['Wear clean non-marking shoes', 'One court booking per group at a time', 'Follow staff safety instructions'],
    equipment: ['Shower facilities', 'Training wall', 'Racquet rental'], images: imageSet('the-net'), featured: true,
    availability: [{ weekday: 2, unavailableSlots: ['07:00'] }, { weekday: 5, unavailableSlots: ['18:00', '19:00'] }, { weekday: 0, unavailableSlots: ['09:00'] }],
  },
  {
    id: 'court-courtline-malleswaram', slug: 'courtline-malleswaram', name: 'Courtline', area: 'Malleswaram',
    address: 'Sampige Road, Malleswaram, Bengaluru', distanceKm: 8.7, pricePerHour: 600, rating: 4.6, reviewCount: 109,
    description: 'A sharp, all-weather badminton space with excellent coaching and reliable court conditions.',
    amenities: ['Parking', 'Floodlit', 'Equipment rental', 'Changing rooms'], rules: ['Coaching courts may not be interrupted', 'No glass bottles on court', 'Notify staff of injuries'],
    equipment: ['Professional court mats', 'Coaching cones', 'Racquet rental'], images: imageSet('courtline'),
    availability: [{ weekday: 3, unavailableSlots: ['20:00'] }, { weekday: 6, unavailableSlots: ['08:00', '09:00'] }, { weekday: 1, unavailableSlots: ['19:00'] }],
  },
  {
    id: 'court-birdie-bannerghatta', slug: 'birdie-club-bannerghatta', name: 'Birdie Club', area: 'Bannerghatta',
    address: 'Bannerghatta Road, Arekere, Bengaluru', distanceKm: 11.4, pricePerHour: 480, rating: 4.4, reviewCount: 82,
    description: 'A comfortable local club with beginner-friendly staff and generously spaced courts.',
    amenities: ['Parking', 'Changing rooms', 'Café'], rules: ['Keep personal belongings in lockers', 'Please cancel at least two hours ahead', 'Pets are not allowed indoors'],
    equipment: ['Locker rental', 'Water station', 'Beginner racquets'], images: imageSet('birdie-club'),
    availability: [{ weekday: 4, unavailableSlots: ['18:00'] }, { weekday: 0, unavailableSlots: ['07:00', '08:00'] }, { weekday: 2, unavailableSlots: ['20:00'] }],
  },
];

export const featuredCourts = courts.filter((court) => court.featured);

export const getCourtBySlug = (slug: string) => courts.find((court) => court.slug === slug);
export const getCourtById = (id: string) => courts.find((court) => court.id === id);
