// ===============================
// COMPREHENSIVE RWANDA SEED DATA
// ===============================

export const seedData = {
  // =====================
  // RWANDA DESTINATIONS
  // =====================
  destinations: [
    {
      _id: 'rw-volcanoes-park',
      name: 'Volcanoes National Park',
      location: 'Musanze District, Northern Province',
      country: 'Rwanda',
      description: 'Home to the endangered mountain gorillas in Rwanda\'s northern province. Experience once-in-a-lifetime gorilla trekking through lush bamboo forests with breathtaking views of five volcanoes.',
      mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/Rwanda-volcano_isb1qf.jpg',
      images: [
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=1200&h=800&fit=crop&q=80'
      ],
      rating: 4.9,
      basePrice: 1500,
      duration: '1-3 Days',
      difficulty: 'Moderate to Challenging',
      bestSeason: 'June-September, December-February',
      activities: [
        {
          name: 'Mountain Gorilla Trekking',
          icon: 'fas fa-mountain',
          description: 'Track and observe endangered mountain gorillas in their natural habitat',
          duration: '4-8 hours',
          difficulty: 'Moderate'
        },
        {
          name: 'Golden Monkey Tracking',
          icon: 'fas fa-paw',
          description: 'Observe the playful golden monkeys unique to the Virunga Mountains',
          duration: '2-4 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Mount Bisoke Hiking',
          icon: 'fas fa-hiking',
          description: 'Day hike to the summit with stunning crater lake views',
          duration: '6-8 hours',
          difficulty: 'Challenging'
        },
        {
          name: 'Dian Fossey Tomb Visit',
          icon: 'fas fa-monument',
          description: 'Visit the research center and tomb of the famous primatologist',
          duration: '3-4 hours',
          difficulty: 'Moderate'
        }
      ],
      features: [
        { name: 'Mountain Gorillas', description: 'Home to 10 habituated gorilla families' },
        { name: 'Volcano Views', description: 'Stunning views of 5 Virunga volcanoes' },
        { name: 'Biodiversity', description: 'Over 200 bird species and rare flora' },
        { name: 'Cultural Heritage', description: 'Traditional communities and crafts' }
      ],
      highlights: [
        '1-hour with mountain gorillas',
        'Professional guide and porters',
        'Conservation fee included',
        'Certificate of participation'
      ],
      includes: ['Permit', 'Guide', 'Porters', 'Lunch', 'Transport from Musanze'],
      excludes: ['International flights', 'Visa fees', 'Travel insurance', 'Personal expenses'],
      travelTips: [
        'Book permits at least 6 months in advance',
        'Good hiking boots and waterproof jacket required',
        'Minimum age: 15 years',
        'Physical fitness required for trekking'
      ],
      coordinates: { lat: -1.4432, lng: 29.5374 },
      tags: ['Wildlife', 'Adventure', 'Gorillas', 'Hiking', 'UNESCO']
    },
    {
      _id: 'rw-nyungwe-forest',
      name: 'Nyungwe National Park',
      location: 'Southwest Rwanda',
      country: 'Rwanda',
      description: 'One of Africa\'s oldest rainforests featuring spectacular canopy walkways, chimpanzee tracking, and over 1,000 plant species. A biodiversity hotspot with 13 primate species.',
      mainImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&h=800&fit=crop&q=80'
      ],
      rating: 4.7,
      basePrice: 1200,
      duration: '2-4 Days',
      difficulty: 'Moderate',
      bestSeason: 'December-February, June-August',
      activities: [
        {
          name: 'Canopy Walk Adventure',
          icon: 'fas fa-walking',
          description: 'Walk 70m above the forest floor on East Africa\'s only canopy walkway',
          duration: '2-3 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Chimpanzee Tracking',
          icon: 'fas fa-tree',
          description: 'Track chimpanzee families through dense rainforest',
          duration: '3-5 hours',
          difficulty: 'Moderate'
        },
        {
          name: 'Colobus Monkey Trekking',
          icon: 'fas fa-users',
          description: 'See large troops of black-and-white colobus monkeys',
          duration: '2-4 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Waterfall Hikes',
          icon: 'fas fa-water',
          description: 'Hike to beautiful waterfalls within the forest',
          duration: '4-6 hours',
          difficulty: 'Moderate'
        }
      ],
      features: [
        { name: 'Ancient Rainforest', description: 'Over 1,000 years old ecosystem' },
        { name: 'Primate Capital', description: '13 primate species including chimpanzees' },
        { name: 'Bird Paradise', description: 'Over 300 bird species including 29 endemics' },
        { name: 'Tea Plantations', description: 'Scenic views of Rwanda\'s tea country' }
      ],
      highlights: [
        '70m high canopy walkway',
        'Chimpanzee habituation experience',
        'Bird watching with expert guides',
        'Tea plantation tours'
      ],
      includes: ['Park fees', 'Guide', 'Canopy walk ticket', 'Lunch', 'Binoculars'],
      excludes: ['Chimpanzee permits', 'Accommodation', 'Personal gear', 'Gratuities'],
      travelTips: [
        'Light rain jacket recommended',
        'Good hiking shoes essential',
        'Early morning starts for best wildlife viewing',
        'Camera with zoom lens recommended'
      ],
      coordinates: { lat: -2.4944, lng: 29.3021 },
      tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy']
    },
    {
      _id: 'rw-akagera-park',
      name: 'Akagera National Park',
      location: 'Eastern Rwanda',
      country: 'Rwanda',
      description: 'Rwanda\'s only savannah park featuring the Big 5 (lion, leopard, elephant, buffalo, rhino). Beautiful landscapes of rolling hills, wetlands, and lakes.',
      mainImage: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=1200&h=800&fit=crop&q=80'
      ],
      rating: 4.6,
      basePrice: 900,
      duration: '2-3 Days',
      difficulty: 'Easy',
      bestSeason: 'June-September, December-February',
      activities: [
        {
          name: 'Big 5 Safari',
          icon: 'fas fa-lion',
          description: 'Game drives to see lions, elephants, rhinos, leopards, and buffalo',
          duration: '3-4 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Boat Safari',
          icon: 'fas fa-ship',
          description: 'Explore Lake Ihema and see hippos, crocodiles, and water birds',
          duration: '2 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Night Game Drive',
          icon: 'fas fa-moon',
          description: 'Spot nocturnal wildlife including leopards and hyenas',
          duration: '2-3 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Bird Watching',
          icon: 'fas fa-dove',
          description: 'Over 500 bird species including papyrus endemics',
          duration: '3-4 hours',
          difficulty: 'Easy'
        }
      ],
      features: [
        { name: 'Big 5 Destination', description: 'Complete African Big 5 experience' },
        { name: 'Lake System', description: 'Largest protected wetland in Central Africa' },
        { name: 'Conservation Success', description: 'Remarkable wildlife restoration story' },
        { name: 'Scenic Beauty', description: 'Rolling hills meeting savannah plains' }
      ],
      highlights: [
        'Rhino tracking experience',
        'Boat safaris on Lake Ihema',
        'Night drives for nocturnal wildlife',
        'Professional photographic hides'
      ],
      includes: ['Park fees', 'Professional guide', '4x4 vehicle', 'Water', 'Park map'],
      excludes: ['Accommodation', 'Meals', 'Optional activities', 'Alcoholic drinks'],
      travelTips: [
        'Bring binoculars and camera with zoom',
        'Light clothing for day, warm for night drives',
        'Book accommodation inside park for best experience',
        'Early morning game drives recommended'
      ],
      coordinates: { lat: -1.6684, lng: 30.7449 },
      tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography']
    },
    {
      _id: 'rw-lake-kivu',
      name: 'Lake Kivu',
      location: 'Western Rwanda',
      country: 'Rwanda',
      description: 'Africa\'s sixth-largest lake and one of Africa\'s safest freshwater lakes. Stunning coastline with beautiful beaches, island resorts, and water activities.',
      mainImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80'
      ],
      rating: 4.8,
      basePrice: 750,
      duration: '2-4 Days',
      difficulty: 'Easy',
      bestSeason: 'Year-round',
      activities: [
        {
          name: 'Island Hopping',
          icon: 'fas fa-ship',
          description: 'Visit Napoleon Island, Amahoro Island, and Monkey Island',
          duration: '4-6 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Kayaking Adventure',
          icon: 'fas fa-water',
          description: 'Paddle along the beautiful coastline and hidden coves',
          duration: '2-4 hours',
          difficulty: 'Moderate'
        },
        {
          name: 'Coffee Plantation Tour',
          icon: 'fas fa-coffee',
          description: 'Visit coffee cooperatives and learn about Rwandan coffee',
          duration: '3-4 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Sunset Cruise',
          icon: 'fas fa-sun',
          description: 'Evening boat trip with spectacular sunset views',
          duration: '2 hours',
          difficulty: 'Easy'
        }
      ],
      features: [
        { name: 'Safe Swimming', description: 'Bilharzia-free and safe for swimming' },
        { name: 'Island Paradise', description: 'Numerous islands to explore' },
        { name: 'Methane Gas', description: 'Unique methane extraction for energy' },
        { name: 'Coastal Towns', description: 'Charming towns of Gisenyi and Kibuye' }
      ],
      highlights: [
        'Swimming in safe freshwater',
        'Visit to bat colony island',
        'Fresh lake fish dining',
        'Beautiful sunset views'
      ],
      includes: ['Boat transfers', 'Life jackets', 'Guide', 'Parking fees', 'Water'],
      excludes: ['Meals', 'Accommodation', 'Water sports equipment', 'Spa treatments'],
      travelTips: [
        'Swimwear and sunscreen essential',
        'Water shoes recommended for rocky beaches',
        'Evenings can be cool - bring light jacket',
        'Try local fish brochettes'
      ],
      coordinates: { lat: -2.0000, lng: 29.1667 },
      tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports']
    },
    {
      _id: 'rw-kigali-city',
      name: 'Kigali City',
      location: 'Kigali Province',
      country: 'Rwanda',
      description: 'Rwanda\'s vibrant capital city, known as Africa\'s cleanest city. Blend of modern development, cultural heritage, and memorial sites with stunning hilltop views.',
      mainImage: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80'
      ],
      rating: 4.7,
      basePrice: 500,
      duration: '1-2 Days',
      difficulty: 'Easy',
      bestSeason: 'Year-round',
      activities: [
        {
          name: 'Genocide Memorial',
          icon: 'fas fa-history',
          description: 'Visit Kigali Genocide Memorial to understand Rwanda\'s history',
          duration: '2-3 hours',
          difficulty: 'Easy'
        },
        {
          name: 'City Markets Tour',
          icon: 'fas fa-shopping-bag',
          description: 'Explore Kimironko Market and local craft markets',
          duration: '3-4 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Cultural Village',
          icon: 'fas fa-home',
          description: 'Visit Rwanda Art Museum and cultural villages',
          duration: '2-3 hours',
          difficulty: 'Easy'
        },
        {
          name: 'Coffee Experience',
          icon: 'fas fa-mug-hot',
          description: 'Coffee tasting and roasting demonstrations',
          duration: '1-2 hours',
          difficulty: 'Easy'
        }
      ],
      features: [
        { name: 'Clean & Safe', description: 'Africa\'s cleanest and safest capital' },
        { name: 'Modern Infrastructure', description: 'Excellent roads and facilities' },
        { name: 'Cultural Hub', description: 'Museums, galleries, and performance spaces' },
        { name: 'Culinary Scene', description: 'Diverse restaurants and local cuisine' }
      ],
      highlights: [
        'Kigali Genocide Memorial',
        'Kimironko Market experience',
        'City skyline views',
        'Traditional dance performances'
      ],
      includes: ['Transport', 'Guide', 'Entry fees', 'Bottled water', 'City map'],
      excludes: ['Meals', 'Shopping', 'Personal expenses', 'Hotel accommodation'],
      travelTips: [
        'Comfortable walking shoes',
        'Respectful clothing for memorial sites',
        'Local currency for markets',
        'Evening security is excellent'
      ],
      coordinates: { lat: -1.9441, lng: 30.0619 },
      tags: ['City', 'Culture', 'History', 'Shopping', 'Food']
    }
  ],

  // =====================
  // RWANDA GUIDES
  // =====================
  guides: [
    {
      _id: 'guide-jean-de-dieu',
      name: 'Jean de Dieu Nzabonimpa',
      email: 'jean@gotrip.com',
      phone: '+250788333333',
      country: 'Rwanda',
      city: 'Kigali',
      languages: ['Kinyarwanda', 'English', 'French', 'Swahili'],
      experienceYears: 8,
      dailyRate: 150,
      description: 'RDB-certified expert guide specializing in gorilla trekking and cultural tours. Trained in primate behavior and conservation.',
      bio: 'With over 8 years of guiding experience in Volcanoes National Park, I have led more than 500 successful gorilla treks. My passion for conservation and deep knowledge of primate behavior ensures a meaningful and educational experience.',
      rating: 4.9,
      available: true,
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=800&h=800&fit=crop&q=80',
      certifications: ['RDB Certified Guide', 'Wildlife First Aid', 'Primate Behavior Specialist', 'CPR Certified'],
      specialty: 'Gorilla Trekking & Wildlife Photography',
      areas: ['Volcanoes National Park', 'Northern Province', 'Kigali'],
      equipment: ['Binoculars', 'Walkie-talkies', 'First aid kit', 'Camera with zoom'],
      education: [
        'Bachelor in Tourism Management - University of Rwanda',
        'Wildlife Conservation Certificate - African Wildlife Foundation'
      ],
      awards: ['Best Guide Award 2022 - Rwanda Tourism Board', 'Conservation Hero 2021'],
      languagesDetail: [
        { language: 'Kinyarwanda', level: 'Native', fluency: 100 },
        { language: 'English', level: 'Fluent', fluency: 95 },
        { language: 'French', level: 'Fluent', fluency: 90 },
        { language: 'Swahili', level: 'Intermediate', fluency: 75 }
      ],
      services: [
        'Gorilla trekking guiding',
        'Wildlife photography assistance',
        'Cultural interpretation',
        'Conservation education',
        'Trip planning and logistics'
      ],
      availability: {
        monday: true, tuesday: true, wednesday: true, thursday: true,
        friday: true, saturday: true, sunday: false
      },
      reviews: [
        {
          user: 'Michael Johnson',
          rating: 5,
          comment: 'Jean made our gorilla trek unforgettable! His knowledge of gorilla behavior was incredible.',
          date: '2024-01-15'
        }
      ]
    },
    {
      _id: 'guide-marie-claire',
      name: 'Marie Claire Uwimana',
      email: 'marie@gotrip.com',
      phone: '+250788444444',
      country: 'Rwanda',
      city: 'Musanze',
      languages: ['Kinyarwanda', 'English', 'Swahili', 'German'],
      experienceYears: 5,
      dailyRate: 120,
      description: 'Bird watching expert and nature photographer with extensive knowledge of Rwanda\'s diverse avian species.',
      bio: 'Specializing in ornithology and nature photography, I have identified and documented over 300 bird species in Rwanda. My tours combine scientific knowledge with photographic opportunities.',
      rating: 4.7,
      available: true,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=800&h=800&fit=crop&q=80',
      certifications: ['Bird Watching Guide', 'Photography Guide', 'Nature Interpretation'],
      specialty: 'Bird Watching & Nature Photography',
      areas: ['Nyungwe National Park', 'Akagera National Park', 'Lake Kivu'],
      equipment: ['High-quality binoculars', 'Bird identification books', 'Spotting scope', 'Photography equipment'],
      education: [
        'Diploma in Ornithology - Rwanda Wildlife Authority',
        'Certificate in Nature Photography'
      ],
      awards: ['Bird Guide of the Year 2023'],
      languagesDetail: [
        { language: 'Kinyarwanda', level: 'Native', fluency: 100 },
        { language: 'English', level: 'Fluent', fluency: 90 },
        { language: 'Swahili', level: 'Fluent', fluency: 85 },
        { language: 'German', level: 'Intermediate', fluency: 70 }
      ],
      services: [
        'Bird watching tours',
        'Nature photography guidance',
        'Species identification',
        'Early morning bird walks',
        'Photographic hide setup'
      ],
      availability: {
        monday: true, tuesday: true, wednesday: true, thursday: true,
        friday: true, saturday: false, sunday: false
      },
      reviews: [
        {
          user: 'Sarah Wilson',
          rating: 5,
          comment: 'Marie found 45 bird species in one morning! Her photography tips were invaluable.',
          date: '2024-02-10'
        }
      ]
    },
    {
      _id: 'guide-david-m',
      name: 'David Mugisha',
      email: 'david@gotrip.com',
      phone: '+250788555555',
      country: 'Rwanda',
      city: 'Kigali',
      languages: ['Kinyarwanda', 'English', 'French', 'Spanish'],
      experienceYears: 6,
      dailyRate: 110,
      description: 'Adventure specialist focusing on hiking, cycling, and water sports across Rwanda.',
      bio: 'Certified adventure guide with extensive experience in mountain hiking, cycling tours, and water sports. Passionate about sustainable adventure tourism.',
      rating: 4.6,
      available: true,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&q=80',
      certifications: ['Mountain Guide', 'First Responder', 'Cycling Tour Guide', 'Water Safety'],
      specialty: 'Adventure Tourism',
      areas: ['Virunga Mountains', 'Lake Kivu', 'Congo Nile Trail'],
      equipment: ['Hiking gear', 'Mountain bikes', 'Safety equipment', 'GPS devices'],
      education: [
        'Outdoor Leadership Diploma',
        'Wilderness First Responder Certification'
      ],
      services: [
        'Mountain hiking',
        'Cycling tours',
        'Water sports guiding',
        'Adventure photography',
        'Equipment rental'
      ],
      availability: {
        monday: true, tuesday: true, wednesday: true, thursday: true,
        friday: true, saturday: true, sunday: true
      }
    },
    {
      _id: 'guide-alice-u',
      name: 'Alice Umutoni',
      email: 'alice@gotrip.com',
      phone: '+250788666666',
      country: 'Rwanda',
      city: 'Huye',
      languages: ['Kinyarwanda', 'English', 'French'],
      experienceYears: 4,
      dailyRate: 100,
      description: 'Cultural heritage specialist with deep knowledge of Rwandan traditions, history, and arts.',
      bio: 'Focusing on cultural immersion experiences, I connect visitors with authentic Rwandan traditions, music, dance, and crafts.',
      rating: 4.5,
      available: true,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=800&fit=crop&q=80',
      certifications: ['Cultural Heritage Guide', 'Traditional Arts Specialist'],
      specialty: 'Cultural & Historical Tours',
      areas: ['National Museums', 'Cultural Villages', 'Traditional Communities'],
      equipment: ['Audio equipment', 'Cultural artifacts', 'Presentation materials'],
      education: [
        'Cultural Heritage Management',
        'Anthropology Studies'
      ],
      services: [
        'Cultural village tours',
        'Traditional craft workshops',
        'Historical site interpretation',
        'Cultural performance arrangement'
      ],
      availability: {
        monday: true, tuesday: true, wednesday: true, thursday: true,
        friday: true, saturday: true, sunday: false
      }
    }
  ],

  // =====================
  // RWANDA TRANSLATORS
  // =====================
  translators: [
    {
      _id: 'trans-david-m',
      name: 'David Mugisha',
      email: 'david.t@gotrip.com',
      phone: '+250788777777',
      country: 'Rwanda',
      city: 'Kigali',
      languages: ['Kinyarwanda', 'English', 'French', 'Swahili', 'German'],
      dailyRate: 100,
      experienceYears: 6,
      bio: 'Professional translator with expertise in legal and medical terminology. Certified by Rwanda Translators Association with government accreditation.',
      description: 'Specializing in legal documents, medical reports, and business contracts with precision and confidentiality.',
      rating: 4.7,
      available: true,
      specializations: ['Legal', 'Medical', 'Business', 'Technical'],
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=800&h=800&fit=crop&q=80',
      certifications: [
        'Certified Legal Translator - Rwanda Translators Association',
        'Medical Translation Specialist - International Medical Translators',
        'Government Accredited Interpreter'
      ],
      services: [
        'Legal document translation',
        'Medical report interpretation',
        'Business meeting interpretation',
        'Contract translation',
        'Court interpretation'
      ],
      equipment: ['Professional headsets', 'Recording equipment', 'Translation software'],
      education: [
        'MA Translation Studies - University of Rwanda',
        'Legal Translation Certification'
      ],
      languagesDetail: [
        { language: 'Kinyarwanda', level: 'Native', fluency: 100 },
        { language: 'English', level: 'Fluent', fluency: 98 },
        { language: 'French', level: 'Fluent', fluency: 95 },
        { language: 'Swahili', level: 'Advanced', fluency: 90 },
        { language: 'German', level: 'Intermediate', fluency: 75 }
      ],
      industries: ['Legal', 'Healthcare', 'Business', 'Government', 'NGO'],
      availability: {
        monday: true, tuesday: true, wednesday: true, thursday: true,
        friday: true, saturday: false, sunday: false
      }
    },
    {
      _id: 'trans-sarah-u',
      name: 'Sarah Uwimana',
      email: 'sarah@gotrip.com',
      phone: '+250788888888',
      country: 'Rwanda',
      city: 'Kigali',
      languages: ['Kinyarwanda', 'English', 'Swahili', 'French', 'Chinese'],
      dailyRate: 120,
      experienceYears: 8,
      bio: 'Conference interpreter and tourism translator with government accreditation. Experienced in diplomatic meetings and international conferences.',
      description: 'Expert in simultaneous interpretation for conferences and tourism-related translation services.',
      rating: 4.8,
      available: true,
      specializations: ['Tourism', 'Conferences', 'Government', 'Diplomatic'],
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=800&fit=crop&q=80',
      certifications: [
        'Government Accredited Interpreter',
        'Tourism Translation Certified',
        'Conference Interpreter - AIIC'
      ],
      services: [
        'Conference simultaneous interpretation',
        'Tour guide translation',
        'Diplomatic meeting interpretation',
        'Tourism material translation',
        'Cultural interpretation'
      ],
      equipment: ['Conference booth equipment', 'Wireless interpretation system', 'Digital recorder'],
      education: [
        'MA Conference Interpreting',
        'Tourism Translation Certification'
      ],
      languagesDetail: [
        { language: 'Kinyarwanda', level: 'Native', fluency: 100 },
        { language: 'English', level: 'Fluent', fluency: 99 },
        { language: 'Swahili', level: 'Fluent', fluency: 95 },
        { language: 'French', level: 'Fluent', fluency: 95 },
        { language: 'Chinese', level: 'Intermediate', fluency: 70 }
      ],
      industries: ['Tourism', 'Government', 'International Organizations', 'Events'],
      availability: {
        monday: true, tuesday: true, wednesday: true, thursday: true,
        friday: true, saturday: true, sunday: false
      }
    },
    {
      _id: 'trans-paul-k',
      name: 'Paul Kalisa',
      email: 'paul@gotrip.com',
      phone: '+250788999999',
      country: 'Rwanda',
      city: 'Kigali',
      languages: ['Kinyarwanda', 'English', 'French', 'Spanish', 'Portuguese'],
      dailyRate: 90,
      experienceYears: 4,
      bio: 'Business and technical translator specializing in IT, engineering, and corporate communications.',
      description: 'Focus on technical documentation, software localization, and corporate communications.',
      rating: 4.5,
      available: true,
      specializations: ['Technical', 'IT', 'Business', 'Marketing'],
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=800&fit=crop&q=80',
      certifications: [
        'Technical Translation Certification',
        'Software Localization Specialist'
      ],
      services: [
        'Technical manual translation',
        'Software localization',
        'Business correspondence',
        'Marketing material translation',
        'Website localization'
      ],
      equipment: ['CAT tools', 'Translation memory software', 'Technical dictionaries'],
      languagesDetail: [
        { language: 'Kinyarwanda', level: 'Native', fluency: 100 },
        { language: 'English', level: 'Fluent', fluency: 95 },
        { language: 'French', level: 'Fluent', fluency: 90 },
        { language: 'Spanish', level: 'Advanced', fluency: 85 },
        { language: 'Portuguese', level: 'Intermediate', fluency: 70 }
      ],
      industries: ['Technology', 'Manufacturing', 'Marketing', 'E-commerce'],
      availability: {
        monday: true, tuesday: true, wednesday: true, thursday: true,
        friday: true, saturday: false, sunday: false
      }
    }
  ],

  // =====================
  // RWANDA ACCOMMODATIONS
  // =====================
  accommodations: [
    {
      _id: 'acc-kigali-marriott',
      name: 'Kigali Marriott Hotel',
      location: 'Kigali, Rwanda',
      type: '5-Star Hotel',
      description: 'Luxury hotel in the heart of Kigali with panoramic city views, world-class amenities, and exceptional service. Perfect for business and leisure travelers.',
      pricePerNight: 250,
      rating: 4.8,
      amenities: [
        { name: 'Swimming Pool', included: true, icon: 'fas fa-swimming-pool' },
        { name: 'Spa & Wellness', included: true, icon: 'fas fa-spa' },
        { name: 'Restaurant', included: true, icon: 'fas fa-utensils' },
        { name: 'Gym', included: true, icon: 'fas fa-dumbbell' },
        { name: 'Free WiFi', included: true, icon: 'fas fa-wifi' },
        { name: 'Business Center', included: true, icon: 'fas fa-briefcase' },
        { name: 'Room Service', included: true, icon: 'fas fa-concierge-bell' },
        { name: 'Airport Transfer', included: false, icon: 'fas fa-shuttle-van' }
      ],
      mainImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80'
      ],
      available: true,
      contactPhone: '+250788111222',
      contactEmail: 'reservations@marriottkigali.com',
      maxGuests: 4,
      roomTypes: [
        { name: 'Deluxe Room', price: 250, capacity: 2 },
        { name: 'Executive Suite', price: 400, capacity: 3 },
        { name: 'Presidential Suite', price: 800, capacity: 4 }
      ],
      features: [
        'City center location',
        'Panoramic views',
        'Meeting facilities',
        'Concierge service',
        'Valet parking'
      ],
      policies: [
        'Check-in: 2:00 PM',
        'Check-out: 12:00 PM',
        'Free cancellation 48 hours prior',
        'Children under 12 stay free'
      ],
      coordinates: { lat: -1.9536, lng: 30.0605 }
    },
    {
      _id: 'acc-volcanoes-lodge',
      name: 'Volcanoes Gorilla Lodge',
      location: 'Musanze, Rwanda',
      type: 'Eco-Lodge',
      description: 'Eco-friendly lodge at the foothills of the Virunga volcanoes, offering cozy fireplace lounge, organic dining, and stunning volcano views. Perfect base for gorilla trekking.',
      pricePerNight: 350,
      rating: 4.7,
      amenities: [
        { name: 'Fireplace Lounge', included: true, icon: 'fas fa-fire' },
        { name: 'Organic Restaurant', included: true, icon: 'fas fa-leaf' },
        { name: 'Garden', included: true, icon: 'fas fa-seedling' },
        { name: 'Free WiFi', included: true, icon: 'fas fa-wifi' },
        { name: 'Hot Water', included: true, icon: 'fas fa-shower' },
        { name: 'Gorilla Viewing Deck', included: true, icon: 'fas fa-binoculars' },
        { name: 'Massage Service', included: false, icon: 'fas fa-spa' },
        { name: 'Laundry', included: false, icon: 'fas fa-tshirt' }
      ],
      mainImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&h=800&fit=crop&q=80'
      ],
      available: true,
      contactPhone: '+250788333444',
      contactEmail: 'info@volcanoeslodge.com',
      maxGuests: 3,
      roomTypes: [
        { name: 'Standard Cottage', price: 350, capacity: 2 },
        { name: 'Family Cottage', price: 500, capacity: 4 },
        { name: 'Honeymoon Suite', price: 600, capacity: 2 }
      ],
      features: [
        'Volcano views',
        'Eco-friendly design',
        'Fireplace in rooms',
        'Organic garden',
        'Gorilla conservation program'
      ],
      policies: [
        'Check-in: 3:00 PM',
        'Check-out: 11:00 AM',
        'No single-use plastics',
        'Sustainable tourism practices'
      ],
      coordinates: { lat: -1.5000, lng: 29.6333 }
    },
    {
      _id: 'acc-lake-kivu-resort',
      name: 'Lake Kivu Serena Hotel',
      location: 'Gisenyi, Lake Kivu',
      type: 'Beach Resort',
      description: 'Luxury resort on the shores of Lake Kivu with private beach access, water sports, and stunning sunset views over the lake.',
      pricePerNight: 280,
      rating: 4.9,
      amenities: [
        { name: 'Private Beach', included: true, icon: 'fas fa-umbrella-beach' },
        { name: 'Water Sports', included: true, icon: 'fas fa-sailboat' },
        { name: 'Spa', included: true, icon: 'fas fa-spa' },
        { name: 'Fine Dining', included: true, icon: 'fas fa-utensils' },
        { name: 'Kids Club', included: true, icon: 'fas fa-child' },
        { name: 'Tennis Court', included: true, icon: 'fas fa-table-tennis' },
        { name: 'Boat Tours', included: false, icon: 'fas fa-ship' },
        { name: 'Fishing', included: false, icon: 'fas fa-fish' }
      ],
      mainImage: 'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80'
      ],
      available: true,
      contactPhone: '+250788555666',
      contactEmail: 'info@serenakivu.com',
      maxGuests: 5,
      roomTypes: [
        { name: 'Lake View Room', price: 280, capacity: 2 },
        { name: 'Beachfront Villa', price: 450, capacity: 4 },
        { name: 'Presidential Suite', price: 700, capacity: 5 }
      ],
      features: [
        'Direct beach access',
        'Water sports center',
        'Sunset viewing deck',
        'Freshwater swimming',
        'Island hopping tours'
      ],
      policies: [
        'Check-in: 2:00 PM',
        'Check-out: 11:00 AM',
        'Beach towels provided',
        'Water safety equipment included'
      ],
      coordinates: { lat: -1.7000, lng: 29.2500 }
    },
    {
      _id: 'acc-nyungwe-forest',
      name: 'Nyungwe Forest Lodge',
      location: 'Nyungwe National Park',
      type: 'Nature Lodge',
      description: 'Luxury lodge nestled in the rainforest canopy, offering unique treehouse accommodations and direct access to primate tracking trails.',
      pricePerNight: 320,
      rating: 4.6,
      amenities: [
        { name: 'Treehouse Rooms', included: true, icon: 'fas fa-tree' },
        { name: 'Rainforest Spa', included: true, icon: 'fas fa-spa' },
        { name: 'Canopy Walk Access', included: true, icon: 'fas fa-bridge' },
        { name: 'Guided Walks', included: true, icon: 'fas fa-hiking' },
        { name: 'Library', included: true, icon: 'fas fa-book' },
        { name: 'Observation Deck', included: true, icon: 'fas fa-binoculars' },
        { name: 'Massage', included: false, icon: 'fas fa-spa' },
        { name: 'Private Guide', included: false, icon: 'fas fa-user-tie' }
      ],
      mainImage: 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=1200&h=800&fit=crop&q=80'
      ],
      available: true,
      contactPhone: '+250788777888',
      contactEmail: 'stay@nyungwelodge.com',
      maxGuests: 3,
      roomTypes: [
        { name: 'Canopy Treehouse', price: 320, capacity: 2 },
        { name: 'Forest View Suite', price: 420, capacity: 3 },
        { name: 'Birdwatcher\'s Nest', price: 380, capacity: 2 }
      ],
      features: [
        'Rainforest immersion',
        'Treehouse accommodations',
        'Primate viewing platforms',
        'Bird watching hides',
        'Sustainable design'
      ],
      policies: [
        'Check-in: 3:00 PM',
        'Check-out: 10:00 AM',
        'Quiet hours: 10 PM - 6 AM',
        'No feeding wildlife'
      ],
      coordinates: { lat: -2.4944, lng: 29.3021 }
    }
  ],

  // =====================
  // RWANDA BLOG POSTS
  // =====================
  blogPosts: [
    {
      _id: 'blog-gorilla-trekking',
      title: 'Ultimate Guide to Gorilla Trekking in Rwanda: Everything You Need to Know',
      author: 'Jean de Dieu Nzabonimpa',
      content: `
        <h2>Introduction to Gorilla Trekking in Rwanda</h2>
        <p>Mountain gorilla trekking in Rwanda's Volcanoes National Park is more than just a tourist activity—it's a life-changing encounter with our closest relatives in the animal kingdom. These magnificent creatures share 98% of our DNA, making each 60-minute visit profoundly moving.</p>
        
        <h2>Permit Information & Booking</h2>
        <p>Gorilla trekking permits cost $1,500 per person and should be booked at least 6-9 months in advance through the Rwanda Development Board or authorized tour operators. The permit includes:</p>
        <ul>
          <li>One hour with a gorilla family</li>
          <li>Professional guide and trackers</li>
          <li>Two armed rangers for security</li>
          <li>Porters (optional, additional cost)</li>
          <li>Certificate of participation</li>
        </ul>
        
        <h2>Physical Preparation & Fitness</h2>
        <p>Trekking can range from 30 minutes to 6+ hours depending on gorilla movement. Recommended preparation:</p>
        <ul>
          <li><strong>Cardio training:</strong> 30 minutes daily for 2-3 weeks before</li>
          <li><strong>Altitude acclimatization:</strong> Spend 2 days in Kigali/Musanze</li>
          <li><strong>Strength training:</strong> Focus on legs and core</li>
        </ul>
        
        <h2>Essential Packing List</h2>
        <div class="packing-list">
          <div class="category">
            <h3>Clothing</h3>
            <ul>
              <li>Waterproof hiking boots (broken in!)</li>
              <li>Quick-dry pants (2 pairs)</li>
              <li>Long-sleeved shirts</li>
              <li>Waterproof jacket</li>
              <li>Warm layers for mornings</li>
            </ul>
          </div>
          <div class="category">
            <h3>Equipment</h3>
            <ul>
              <li>Daypack (waterproof)</li>
              <li>Walking poles (provided or bring)</li>
              <li>Camera with zoom lens</li>
              <li>Binoculars</li>
              <li>Water bottles (2 liters)</li>
            </ul>
          </div>
        </div>
        
        <h2>Gorilla Families of Volcanoes National Park</h2>
        <p>Rwanda has 10 habituated gorilla families available for tracking:</p>
        <table class="gorilla-families">
          <thead>
            <tr>
              <th>Family Name</th>
              <th>Size</th>
              <th>Silverbacks</th>
              <th>Location</th>
              <th>Trek Difficulty</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Susa</td>
              <td>31 members</td>
              <td>3</td>
              <td>High altitude</td>
              <td>Challenging</td>
            </tr>
            <tr>
              <td>Amahoro</td>
              <td>17 members</td>
              <td>1</td>
              <td>Mid-range</td>
              <td>Moderate</td>
            </tr>
            <tr>
              <td>Kwitonda</td>
              <td>25 members</td>
              <td>2</td>
              <td>Various</td>
              <td>Moderate</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Health & Safety Protocols</h2>
        <ul>
          <li><strong>COVID-19:</strong> Negative test required within 72 hours</li>
          <li><strong>General Health:</strong> Report any illness to your guide</li>
          <li><strong>Distance:</strong> Maintain 7 meters from gorillas</li>
          <li><strong>Photography:</strong> No flash photography</li>
          <li><strong>Waste:</strong> Pack out everything you bring in</li>
        </ul>
        
        <h2>Conservation Impact</h2>
        <p>Your $1,500 permit directly funds:</p>
        <ul>
          <li>Ranger salaries and training</li>
          <li>Community development projects (10% of revenue)</li>
          <li>Veterinary care for gorillas</li>
          <li>Anti-poaching patrols</li>
          <li>Research and monitoring</li>
        </ul>
        
        <h2>Best Time to Visit</h2>
        <p><strong>Dry Seasons (Best):</strong> June-September, December-February</p>
        <p><strong>Wet Seasons:</strong> March-May, October-November (fewer tourists, lush vegetation)</p>
        
        <h2>Local Community Benefits</h2>
        <p>The revenue sharing program ensures that 10% of park revenue goes to surrounding communities, funding:</p>
        <ul>
          <li>Schools and education programs</li>
          <li>Healthcare facilities</li>
          <li>Clean water projects</li>
          <li>Small business development</li>
        </ul>
      `,
      excerpt: 'Complete guide to planning your gorilla trekking adventure in Rwanda. Learn about permits, preparation, what to expect, and conservation impact.',
      featuredImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1548013146-72479768bada?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=1200&h=800&fit=crop&q=80'
      ],
      tags: ['Gorilla Trekking', 'Wildlife', 'Adventure', 'Rwanda', 'Conservation', 'Volcanoes National Park', 'Travel Guide'],
      category: 'Wildlife & Adventure',
      featured: true,
      readTime: 12,
      published: true,
      publishedDate: '2024-01-15',
      views: 1250,
      likes: 89,
      comments: 24
    },
    {
      _id: 'blog-rwanda-itinerary',
      title: '7-Day Ultimate Rwanda Itinerary: Gorillas, Culture & Nature',
      author: 'Marie Claire Uwimana',
      content: `
        <h2>Perfect 7-Day Rwanda Adventure</h2>
        <p>This comprehensive itinerary covers Rwanda's highlights: gorilla trekking, cultural experiences, wildlife safaris, and lake relaxation.</p>
        
        <h2>Day 1: Arrival in Kigali</h2>
        <ul>
          <li><strong>Morning:</strong> Arrive at Kigali International Airport</li>
          <li><strong>Afternoon:</strong> Kigali Genocide Memorial visit</li>
          <li><strong>Evening:</strong> Dinner at Repub Lounge with city views</li>
          <li><strong>Accommodation:</strong> Kigali Marriott Hotel</li>
        </ul>
        
        <h2>Day 2: Kigali City Tour</h2>
        <ul>
          <li><strong>Morning:</strong> Kimironko Market experience</li>
          <li><strong>Afternoon:</strong> Rwanda Art Museum & Presidential Palace</li>
          <li><strong>Evening:</strong> Traditional dance performance</li>
          <li><strong>Food:</strong> Try local brochettes and ugali</li>
        </ul>
        
        <h2>Day 3: Transfer to Volcanoes National Park</h2>
        <ul>
          <li><strong>Morning:</strong> Scenic drive to Musanze (3 hours)</li>
          <li><strong>Afternoon:</strong> Iby\'Iwacu Cultural Village visit</li>
          <li><strong>Evening:</strong> Gorilla trekking briefing</li>
          <li><strong>Accommodation:</strong> Volcanoes Gorilla Lodge</li>
        </ul>
        
        <h2>Day 4: Gorilla Trekking Experience</h2>
        <ul>
          <li><strong>6:30 AM:</strong> Park headquarters registration</li>
          <li><strong>7:30 AM:</strong> Begin gorilla trek</li>
          <li><strong>Afternoon:</strong> Golden Monkey tracking (optional)</li>
          <li><strong>Evening:</strong> Relax at lodge with volcano views</li>
        </ul>
        
        <h2>Day 5: Lake Kivu Relaxation</h2>
        <ul>
          <li><strong>Morning:</strong> Drive to Gisenyi (4 hours)</li>
          <li><strong>Afternoon:</strong> Boat trip to Napoleon Island</li>
          <li><strong>Evening:</strong> Sunset kayaking on Lake Kivu</li>
          <li><strong>Accommodation:</strong> Lake Kivu Serena Hotel</li>
        </ul>
        
        <h2>Day 6: Nyungwe Forest Adventure</h2>
        <ul>
          <li><strong>Morning:</strong> Early drive to Nyungwe (5 hours)</li>
          <li><strong>Afternoon:</strong> Canopy walkway experience</li>
          <li><strong>Evening:</strong> Chimpanzee tracking briefing</li>
          <li><strong>Accommodation:</strong> Nyungwe Forest Lodge</li>
        </ul>
        
        <h2>Day 7: Chimpanzee Tracking & Departure</h2>
        <ul>
          <li><strong>Morning:</strong> Chimpanzee tracking adventure</li>
          <li><strong>Afternoon:</strong> Return to Kigali (5 hours)</li>
          <li><strong>Evening:</strong> Departure or extend your stay</li>
        </ul>
        
        <h2>Budget Breakdown (Per Person)</h2>
        <table class="budget-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Budget</th>
              <th>Mid-Range</th>
              <th>Luxury</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Accommodation</td>
              <td>$700</td>
              <td>$1,200</td>
              <td>$2,500</td>
            </tr>
            <tr>
              <td>Gorilla Permit</td>
              <td>$1,500</td>
              <td>$1,500</td>
              <td>$1,500</td>
            </tr>
            <tr>
              <td>Transport</td>
              <td>$300</td>
              <td>$500</td>
              <td>$800</td>
            </tr>
            <tr>
              <td>Activities</td>
              <td>$200</td>
              <td>$400</td>
              <td>$600</td>
            </tr>
            <tr>
              <td><strong>Total</strong></td>
              <td><strong>$2,700</strong></td>
              <td><strong>$3,600</strong></td>
              <td><strong>$5,400</strong></td>
            </tr>
          </tbody>
        </table>
        
        <h2>Travel Tips</h2>
        <ul>
          <li><strong>Visa:</strong> Most nationalities get visa on arrival</li>
          <li><strong>Health:</strong> Yellow fever vaccination required</li>
          <li><strong>Money:</strong> Credit cards widely accepted, carry some cash</li>
          <li><strong>Packing:</strong> Layers for varying altitudes</li>
        </ul>
      `,
      excerpt: 'Comprehensive 7-day itinerary covering Rwanda\'s best attractions including gorilla trekking, cultural experiences, and lake relaxation.',
      featuredImage: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80'
      ],
      tags: ['Itinerary', 'Travel Planning', 'Rwanda', 'Gorillas', 'Lake Kivu', 'Cultural Tourism', 'Adventure'],
      category: 'Travel Planning',
      featured: true,
      readTime: 10,
      published: true,
      publishedDate: '2024-01-20',
      views: 980,
      likes: 67,
      comments: 18
    },
    {
      _id: 'blog-rwandan-culture',
      title: 'Exploring Rwandan Culture: Traditions, Dance, and Community Tourism',
      author: 'Alice Umutoni',
      content: `
        <h2>Rich Cultural Heritage of Rwanda</h2>
        <p>Rwanda\'s culture is as diverse as its landscape, with traditions passed down through generations and a strong sense of community.</p>
        
        <h2>Traditional Dance: Intore</h2>
        <p>The Intore dance is Rwanda\'s most famous traditional performance, originally performed for kings. It features three elements:</p>
        <ul>
          <li><strong>The Dance of Heroes:</strong> Warrior dance with spears and shields</li>
          <li><strong>The Dance of Elegance:</strong> Graceful movements celebrating beauty</li>
          <li><strong>The Dance of Cows:</strong> Celebrating Rwanda\'s pastoral heritage</li>
        </ul>
        
        <h2>Community-Based Tourism</h2>
        <p>Experience authentic Rwandan life through community tourism initiatives:</p>
        <div class="community-projects">
          <div class="project">
            <h3>Iby\'Iwacu Cultural Village</h3>
            <p>Former poachers now guide tourists through traditional activities:</p>
            <ul>
              <li>Traditional house building</li>
              <li>Banana beer brewing</li>
              <li>Warrior training</li>
              <li>King\'s palace visit</li>
            </ul>
          </div>
          <div class="project">
            <h3>Women\'s Cooperatives</h3>
            <p>Visit women\'s weaving and craft cooperatives:</p>
            <ul>
              <li>Agaseke basket weaving</li>
              <li>Traditional pottery</li>
              <li>Beadwork demonstrations</li>
              <li>Direct purchase from artisans</li>
            </ul>
          </div>
        </div>
        
        <h2>Traditional Cuisine</h2>
        <p>Must-try Rwandan dishes:</p>
        <ul>
          <li><strong>Isombe:</strong> Cassava leaves with peanut sauce</li>
          <li><strong>Ugali:</strong> Maize porridge staple</li>
          <li><strong>Brochettes:</strong> Grilled meat skewers</li>
          <li><strong>Ibihaza:</strong> Pumpkin and beans</li>
          <li><strong>Urwagwa:</strong> Traditional banana beer</li>
        </ul>
        
        <h2>Cultural Etiquette</h2>
        <ul>
          <li><strong>Greetings:</strong> Always greet people before conversations</li>
          <li><strong>Respect:</strong> Use right hand for giving/receiving items</li>
          <li><strong>Dress:</strong> Modest clothing appreciated, especially in rural areas</li>
          <li><strong>Photography:</strong> Always ask permission before photographing people</li>
        </ul>
        
        <h2>Festivals & Events</h2>
        <ul>
          <li><strong>Kwita Izina:</strong> Gorilla naming ceremony (September)</li>
          <li><strong>Umuganura:</strong> Harvest festival (August)</li>
          <li><strong>Hobe Rwanda:</strong> Arts and culture festival</li>
        </ul>
      `,
      excerpt: 'Discover the rich cultural heritage of Rwanda through traditional dance, community tourism, cuisine, and authentic cultural experiences.',
      featuredImage: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80'
      ],
      tags: ['Culture', 'Traditions', 'Community Tourism', 'Dance', 'Food', 'Rwanda', 'Heritage'],
      category: 'Culture & Heritage',
      featured: true,
      readTime: 8,
      published: true,
      publishedDate: '2024-02-01',
      views: 750,
      likes: 45,
      comments: 12
    },
    {
      _id: 'blog-bird-watching',
      title: 'Bird Watching Paradise: Rwanda\'s 700+ Bird Species Guide',
      author: 'Marie Claire Uwimana',
      content: `
        <h2>Rwanda: Africa\'s Best Kept Birding Secret</h2>
        <p>With over 700 bird species including 29 endemics, Rwanda offers incredible bird watching opportunities year-round.</p>
        
        <h2>Top Birding Hotspots</h2>
        <div class="birding-spots">
          <div class="spot">
            <h3>Nyungwe National Park</h3>
            <ul>
              <li><strong>Star Species:</strong> Great Blue Turaco, Ruwenzori Turaco</li>
              <li><strong>Total Species:</strong> 310+</li>
              <li><strong>Best Time:</strong> Early morning</li>
              <li><strong>Specialty:</strong> Forest canopy species</li>
            </ul>
          </div>
          <div class="spot">
            <h3>Akagera National Park</h3>
            <ul>
              <li><strong>Star Species:</strong> Shoebill Stork, Papyrus Gonolek</li>
              <li><strong>Total Species:</strong> 500+</li>
              <li><strong>Best Time:</strong> Wet season</li>
              <li><strong>Specialty:</strong> Wetland and savannah birds</li>
            </ul>
          </div>
          <div class="spot">
            <h3>Volcanoes National Park</h3>
            <ul>
              <li><strong>Star Species:</strong> Rwenzori Double-collared Sunbird</li>
              <li><strong>Total Species:</strong> 200+</li>
              <li><strong>Best Time:</strong> Dry season</li>
              <li><strong>Specialty:</strong> Alpine and montane species</li>
            </ul>
          </div>
        </div>
        
        <h2>Essential Birding Equipment</h2>
        <ul>
          <li><strong>Binoculars:</strong> 8x42 or 10x42 recommended</li>
          <li><strong>Field Guide:</strong> Birds of East Africa by Stevenson & Fanshawe</li>
          <li><strong>Camera:</strong> DSLR with 300mm+ lens</li>
          <li><strong>Clothing:</strong> Neutral colors, waterproof layer</li>
          <li><strong>Notebook:</strong> For recording sightings</li>
        </ul>
        
        <h2>Seasonal Birding Calendar</h2>
        <table class="birding-calendar">
          <thead>
            <tr>
              <th>Season</th>
              <th>Best Locations</th>
              <th>Key Species</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Dec-Feb (Dry)</td>
              <td>All parks</td>
              <td>Resident species, easier viewing</td>
            </tr>
            <tr>
              <td>Mar-May (Wet)</td>
              <td>Akagera, Nyungwe</td>
              <td>Palearctic migrants, breeding plumage</td>
            </tr>
            <tr>
              <td>Jun-Aug (Dry)</td>
              <td>Volcanoes, Nyungwe</td>
              <td>Alpine specialists</td>
            </tr>
            <tr>
              <td>Sep-Nov (Wet)</td>
              <td>All parks</td>
              <td>Returning migrants</td>
            </tr>
          </tbody>
        </table>
        
        <h2>Birding Tours & Guides</h2>
        <p>Recommended specialized birding guides:</p>
        <ul>
          <li><strong>Expert Guides:</strong> Certified by Rwanda Birding Association</li>
          <li><strong>Private Tours:</strong> Customized itineraries available</li>
          <li><strong>Photography Focus:</strong> Guides with photography expertise</li>
        </ul>
        
        <h2>Conservation & Ethical Birding</h2>
        <ul>
          <li>Follow park rules and stay on trails</li>
          <li>Use playback sparingly if at all</li>
          <li>Keep respectful distance from nests</li>
          <li>Support local conservation initiatives</li>
        </ul>
      `,
      excerpt: 'Comprehensive guide to bird watching in Rwanda, covering top spots, equipment, seasonal calendar, and ethical birding practices.',
      featuredImage: 'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=1200&h=800&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80',
        'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=1200&h=800&fit=crop&q=80'
      ],
      tags: ['Bird Watching', 'Nature', 'Wildlife', 'Photography', 'Rwanda', 'Conservation', 'Birding'],
      category: 'Nature & Wildlife',
      featured: false,
      readTime: 9,
      published: true,
      publishedDate: '2024-02-10',
      views: 520,
      likes: 38,
      comments: 8
    }
  ],

  // =====================
  // RWANDA TRAVEL TIPS
  // =====================
  travelTips: {
    general: [
      {
        title: 'Best Time to Visit Rwanda',
        content: 'Rwanda can be visited year-round. Dry seasons (June-September, December-February) are best for gorilla trekking and hiking. Wet seasons offer lush vegetation and fewer tourists.',
        icon: 'fas fa-calendar-alt'
      },
      {
        title: 'Visa Requirements',
        content: 'Most nationalities can obtain visa on arrival. East African Tourist Visa ($100) allows travel to Rwanda, Uganda, and Kenya. Check latest requirements before travel.',
        icon: 'fas fa-passport'
      },
      {
        title: 'Health & Vaccinations',
        content: 'Yellow fever vaccination required. Malaria prophylaxis recommended. COVID-19 regulations may apply. Travel insurance essential.',
        icon: 'fas fa-shield-alt'
      },
      {
        title: 'Currency & Money',
        content: 'Rwandan Franc (RWF) is local currency. USD widely accepted. Credit cards accepted in cities. ATMs available in urban areas.',
        icon: 'fas fa-money-bill-wave'
      },
      {
        title: 'Safety & Security',
        content: 'Rwanda is one of Africa\'s safest countries. Normal precautions apply. Keep valuables secure. Respect local laws and customs.',
        icon: 'fas fa-user-shield'
      }
    ],
    packing: [
      {
        category: 'Clothing',
        items: [
          'Lightweight, quick-dry clothing',
          'Waterproof jacket',
          'Warm layers for evenings',
          'Comfortable hiking shoes',
          'Hat and sunglasses'
        ]
      },
      {
        category: 'Equipment',
        items: [
          'Camera with zoom lens',
          'Binoculars',
          'Power adapter (Type C/J)',
          'Portable charger',
          'Headlamp/flashlight'
        ]
      },
      {
        category: 'Health',
        items: [
          'Malaria prophylaxis',
          'Insect repellent',
          'Sunscreen (high SPF)',
          'Basic first aid kit',
          'Hand sanitizer'
        ]
      }
    ],
    cultural: [
      {
        tip: 'Greetings are important. Always greet before starting conversation.',
        explanation: 'Rwandans value polite greetings. Use "Muraho" (Hello) or "Amakuru?" (How are you?)'
      },
      {
        tip: 'Use right hand for giving/receiving items.',
        explanation: 'The left hand is considered unclean in some traditional contexts'
      },
      {
        tip: 'Ask permission before photographing people.',
        explanation: 'Always be respectful and ask first, especially in rural areas'
      },
      {
        tip: 'Dress modestly, especially when visiting rural communities.',
        explanation: 'Knee-length shorts/skirts and covered shoulders appreciated'
      }
    ]
  },

  // =====================
  // POPULAR ITINERARIES
  // =====================
  popularItineraries: [
    {
      name: 'Rwanda Gorilla Express',
      duration: '4 Days / 3 Nights',
      price: '$2,500',
      highlights: ['Gorilla Trekking', 'Kigali City Tour', 'Cultural Village'],
      description: 'Short but intensive gorilla experience perfect for time-limited travelers.',
      days: [
        'Day 1: Arrive Kigali, city tour',
        'Day 2: Transfer to Volcanoes, gorilla briefing',
        'Day 3: Gorilla trekking experience',
        'Day 4: Return to Kigali, departure'
      ]
    },
    {
      name: 'Rwanda Wildlife & Culture',
      duration: '8 Days / 7 Nights',
      price: '$4,200',
      highlights: ['Gorillas', 'Big 5 Safari', 'Lake Kivu', 'Cultural Experiences'],
      description: 'Comprehensive Rwanda experience covering wildlife, culture, and relaxation.',
      days: [
        'Day 1-2: Kigali & cultural experiences',
        'Day 3-4: Gorilla trekking in Volcanoes',
        'Day 5-6: Wildlife safari in Akagera',
        'Day 7: Relax at Lake Kivu',
        'Day 8: Departure'
      ]
    },
    {
      name: 'Rwanda Birding Special',
      duration: '10 Days / 9 Nights',
      price: '$5,800',
      highlights: ['Bird Watching', 'Primate Tracking', 'Canopy Walk', 'Photography'],
      description: 'Specialized birding tour covering all major habitats with expert guides.',
      days: [
        'Day 1-2: Kigali and nearby wetlands',
        'Day 3-4: Nyungwe Forest birding',
        'Day 5-6: Akagera wetland species',
        'Day 7-8: Volcanoes alpine birds',
        'Day 9-10: Lake Kivu and departure'
      ]
    }
  ],

  // =====================
  // TESTIMONIALS
  // =====================
  testimonials: [
    {
      name: 'Michael & Sarah Johnson',
      location: 'California, USA',
      trip: 'Gorilla Trekking Adventure',
      rating: 5,
      comment: 'The gorilla trekking was beyond our expectations. Our guide Jean was incredibly knowledgeable and made the experience educational and magical. Rwanda is breathtaking!',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop&q=80',
      date: 'December 2023'
    },
    {
      name: 'David Chen',
      location: 'Singapore',
      trip: 'Bird Watching Tour',
      rating: 5,
      comment: 'As a bird photographer, Rwanda exceeded all expectations. Marie found 45 species in one morning! The lodges were comfortable and the guides were true experts.',
      image: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=200&h=200&fit=crop&q=80',
      date: 'January 2024'
    },
    {
      name: 'The Miller Family',
      location: 'London, UK',
      trip: 'Family Safari Holiday',
      rating: 5,
      comment: 'Perfect family vacation! The kids loved the boat safari in Akagera, and we all cherished our time with the gorillas. Rwanda is safe, clean, and welcoming.',
      image: 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=200&h=200&fit=crop&q=80',
      date: 'February 2024'
    },
    {
      name: 'Maria Rodriguez',
      location: 'Madrid, Spain',
      trip: 'Cultural Immersion Tour',
      rating: 5,
      comment: 'The cultural experiences were authentic and meaningful. Learning traditional dances, visiting communities, and understanding Rwanda\'s history was transformative.',
      image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&h=200&fit=crop&q=80',
      date: 'March 2024'
    }
  ],

  // =====================
  // CONSERVATION FACTS
  // =====================
  conservationFacts: [
    {
      fact: 'Gorilla population increase',
      detail: 'Mountain gorilla numbers have increased from 240 in 1981 to over 1,000 today',
      icon: 'fas fa-chart-line'
    },
    {
      fact: 'Revenue sharing',
      detail: '10% of national park revenue goes to local communities',
      icon: 'fas fa-handshake'
    },
      {
      fact: 'Plastic bag ban',
      detail: 'Rwanda was the first African country to ban plastic bags in 2008',
      icon: 'fas fa-ban'
    },
    {
      fact: 'Monthly community service',
      detail: 'Umuganda: Last Saturday of every month, communities work together on projects',
      icon: 'fas fa-users'
    },
    {
      fact: 'Forest restoration',
      detail: 'Rwanda aims for 30% forest cover by 2030 through restoration programs',
      icon: 'fas fa-tree'
    }
  ]
};

// Helper function to get random items from seed data
export function getRandomItems(type, count) {
  if (!seedData[type]) return [];
  const items = [...seedData[type]];
  return items.sort(() => 0.5 - Math.random()).slice(0, count);
}

// Helper function to get item by ID
export function getItemById(type, id) {
  if (!seedData[type]) return null;
  return seedData[type].find(item => item._id === id);
}

// Helper function to get featured items
export function getFeaturedItems(type) {
  if (!seedData[type]) return [];
  if (type === 'blogPosts') {
    return seedData[type].filter(post => post.featured);
  }
  // For other types, return first few items
  return seedData[type].slice(0, 3);
}

export default seedData;