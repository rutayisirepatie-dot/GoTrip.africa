// backend/seedData.js
const bcrypt = require('bcryptjs');

const passwordHash = bcrypt.hashSync('Password123!', 12);

const users = [
  { name: 'Admin User', email: 'admin@adventurehillbound.com', password: passwordHash, role: 'admin' },
  { name: 'Test User', email: 'testuser@example.com', password: passwordHash, role: 'user' }
];

const guides = [
  { name: 'John Doe', email: 'johndoe@example.com', phone: '+250788123456', specialty: 'Hiking', experienceYears: 5 },
  { name: 'Jane Smith', email: 'janesmith@example.com', phone: '+250788654321', specialty: 'Safari', experienceYears: 8 }
];

const destinations = [
  {
    name: 'Kigali Genocide Memorial',
    location: 'Kigali',
    province: 'Kigali',
    coordinates: { lat: -1.9441, lng: 30.0619 },
    description: 'A memorial dedicated to the victims of the Rwandan genocide.',
    shortDescription: 'Memorial in Kigali',
    activities: ['cultural-tour'],
    priceRange: { min: 0, max: 0 },
  },
  {
    name: 'Volcanoes National Park',
    location: 'Northern Province',
    province: 'Northern',
    coordinates: { lat: -1.4075, lng: 29.6050 },
    description: 'Famous for gorilla trekking in Rwanda.',
    shortDescription: 'Gorilla trekking park',
    activities: ['gorilla-trekking','hiking'],
    priceRange: { min: 50, max: 200 },
  }
];

const accommodations = [
  {
    name: 'Volcano Lodge',
    type: 'Lodge',
    description: 'A beautiful lodge near Volcanoes National Park.',
    location: 'Northern Province',
    priceRange: { min: 100, max: 250 },
    amenities: [
      { name: 'Free WiFi', description: 'High-speed internet available', icon: 'wifi' },
      { name: 'Restaurant', description: 'In-house dining', icon: 'restaurant' }
    ]
  }
];

const newsletters = [
  { title: 'Monthly Adventure Updates', description: 'Latest news and offers from Adventure Hillbound' }
];

module.exports = {
  users,
  guides,
  destinations,
  accommodations,
  newsletters
};