import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// ES Module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Import models
import Destination from '../models/Destination.js';
import Accommodation from '../models/Accommodation.js';
import Guide from '../models/Guide.js';
import Translator from '../models/Translator.js';
import Blog from '../models/Blog.js';
import User from '../models/User.js';

// Complete Seed Data - ALL ORIGINAL DATA INTACT with FIXED validation
const seedData = {
    destinations: [
        {
            name: 'Volcanoes National Park',
            slug: 'rw-volcanoes-park',
            shortDescription: 'Home to endangered mountain gorillas in Rwanda\'s Virunga Mountains',
            location: 'Musanze District, Northern Province',
            description: 'Home to over one-third of the world\'s remaining mountain gorillas, Volcanoes National Park offers one of the most profound wildlife experiences on Earth. The park spans 160 km² of rainforest and encompasses five of the eight volcanoes in the Virunga Mountains. Beyond gorilla trekking, the park offers golden monkey tracking, volcano hiking, and visits to the Dian Fossey Gorilla Fund International Karisoke Research Center.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/Rwanda-volcano_isb1qf.jpg',
            rating: 4.9,
            basePrice: 1500,
            duration: '1-3 Days',
            difficulty: 'Moderate to Challenging',
            bestSeason: 'June-September, December-February',
            permitsRequired: true,
            groupSize: 'Maximum 8 visitors per gorilla family',
            highlights: [
                'Track endangered mountain gorillas in their natural habitat',
                'Visit the Karisoke Research Center founded by Dian Fossey',
                'Hike to Dian Fossey\'s grave and research camp',
                'Golden monkey tracking in bamboo forests',
                'Summit volcanoes including Mount Bisoke and Karisimbi',
                'Iby\'iwacu Cultural Village experience'
            ],
            activities: [
                { name: 'Mountain Gorilla Trekking', icon: 'fas fa-mountain', description: 'Guided trek to observe gorilla families with expert trackers and guides' },
                { name: 'Golden Monkey Tracking', icon: 'fas fa-paw', description: 'Observe the playful golden monkeys endemic to the Virunga region' },
                { name: 'Volcano Hiking', icon: 'fas fa-hiking', description: 'Summit volcanic peaks with breathtaking crater lakes and panoramic views' },
                { name: 'Cultural Immersion', icon: 'fas fa-home', description: 'Experience traditional Rwandan life at Iby\'iwacu Cultural Village' }
            ],
            conservationInfo: '30% of permit fees support conservation efforts and community development',
            tags: ['Wildlife', 'Adventure', 'Gorillas', 'UNESCO', 'Photography', 'Conservation', 'Volcanoes'],
            available: true,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Nyungwe National Park',
            slug: 'rw-nyungwe-forest',
            shortDescription: 'Ancient montane rainforest with chimpanzees & canopy walkway',
            location: 'Southwestern Rwanda',
            description: 'One of Africa\'s oldest and best-preserved montane rainforests, Nyungwe National Park is a biodiversity hotspot covering 1,019 km². The park is home to 13 primate species including chimpanzees, over 300 bird species (29 endemics), and 1,000 plant species. The canopy walkway offers a unique perspective 70 meters above the forest floor.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662726/nyungwe-forests_c9red1.jpg',
            rating: 4.7,
            basePrice: 200,
            duration: '2-4 Days',
            difficulty: 'Moderate',
            bestSeason: 'December-February, June-August',
            permitsRequired: true,
            groupSize: 'Maximum 8 visitors per chimpanzee group',
            highlights: [
                '70m high canopy walkway through the treetops',
                'Chimpanzee habituation experience',
                'Colobus monkey trekking with troops of up to 400',
                'Waterfall hikes through ancient rainforest',
                'Tea plantation tours and cultural experiences'
            ],
            activities: [
                { name: 'Canopy Walk Adventure', icon: 'fas fa-walking', description: 'Walk 70m above the forest floor on Africa\'s longest canopy walkway' },
                { name: 'Chimpanzee Tracking', icon: 'fas fa-tree', description: 'Track chimpanzee families through dense montane rainforest' },
                { name: 'Colobus Monkey Trekking', icon: 'fas fa-users', description: 'Observe large troops of black-and-white colobus monkeys' },
                { name: 'Bird Watching', icon: 'fas fa-dove', description: 'Spot over 300 bird species including 29 Albertine Rift endemics' }
            ],
            conservationInfo: 'UNESCO-designated biosphere reserve with extensive research programs',
            tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy', 'Eco-Tourism', 'UNESCO'],
            available: true,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Akagera National Park',
            slug: 'rw-akagera-park',
            shortDescription: 'Rwanda\'s only Big 5 safari destination with lions, elephants & rhinos',
            location: 'Eastern Rwanda',
            description: 'Rwanda\'s only Big 5 safari destination, Akagera National Park has undergone one of Africa\'s most remarkable conservation success stories. From near extinction, the park now hosts thriving populations of lions, leopards, elephants, buffalo, and rhinos across 1,122 km² of savannah, wetlands, and lakes.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/akagera-national-park-rwanda-zebra_oysla0.webp',
            rating: 4.6,
            basePrice: 650,
            duration: '2-3 Days',
            difficulty: 'Easy',
            bestSeason: 'June-September, December-February',
            permitsRequired: true,
            groupSize: '6-8 per vehicle',
            highlights: [
                'Big 5 wildlife safari experience',
                'Boat safaris on Lake Ihema (Rwanda\'s largest lake)',
                'Night drives for nocturnal wildlife viewing',
                'Rhino tracking with expert guides',
                'Bird watching with 490+ species including shoebill stork'
            ],
            activities: [
                { name: 'Big 5 Safari', icon: 'fas fa-lion', description: 'Game drives to see lions, elephants, rhinos, leopards, and buffalo' },
                { name: 'Boat Safari', icon: 'fas fa-ship', description: 'Explore Lake Ihema and see hippos, crocodiles, and water birds' },
                { name: 'Night Game Drive', icon: 'fas fa-moon', description: 'Spot nocturnal wildlife including leopards, hyenas, and bushbabies' },
                { name: 'Bird Watching', icon: 'fas fa-binoculars', description: 'Over 490 bird species including the rare shoebill stork' }
            ],
            conservationInfo: 'Managed in partnership with African Parks since 2010, with wildlife populations increasing by over 500%',
            tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography', 'Conservation', 'Birding'],
            available: true,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Lake Kivu',
            slug: 'rw-lake-kivu',
            shortDescription: 'Africa\'s sixth-largest lake with beautiful beaches & island resorts',
            location: 'Western Rwanda',
            description: 'Africa\'s sixth-largest lake and one of Africa\'s safest freshwater lakes, Lake Kivu offers 89km of stunning coastline with beautiful beaches, island resorts, and numerous water activities. The lake is unique for its methane gas reserves and being bilharzia-free, making it safe for swimming.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/lake-kivu-rwanda_vc4igd.jpg',
            rating: 4.8,
            basePrice: 450,
            duration: '2-4 Days',
            difficulty: 'Easy',
            bestSeason: 'Year-round',
            permitsRequired: false,
            groupSize: 'Flexible',
            highlights: [
                'Island hopping to Napoleon Island (home to fruit bats) and Monkey Islands',
                'Kayaking along scenic coastline with volcanic backdrops',
                'Coffee plantation tours and tastings in Rwanda\'s coffee heartland',
                'Swimming in bilharzia-free, warm waters',
                'Beautiful sunset boat cruises with views of the Virunga volcanoes'
            ],
            activities: [
                { name: 'Island Hopping', icon: 'fas fa-ship', description: 'Visit Napoleon Island (bat colony) and Monkey Island' },
                { name: 'Kayaking Adventure', icon: 'fas fa-water', description: 'Paddle along the beautiful coastline and hidden coves' },
                { name: 'Coffee Tours', icon: 'fas fa-coffee', description: 'Visit coffee cooperatives and learn about processing from bean to cup' },
                { name: 'Boat Cruises', icon: 'fas fa-sailboat', description: 'Sunset cruises and traditional fishing experiences' }
            ],
            conservationInfo: 'Methane gas extraction provides clean energy while preserving lake ecosystems',
            tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports', 'Culture', 'Coffee'],
            available: true,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Kigali City',
            slug: 'rw-kigali-city',
            shortDescription: 'Clean, safe, and rapidly developing capital of Rwanda',
            location: 'Kigali, Rwanda',
            description: 'Rwanda\'s clean, safe, and rapidly developing capital is consistently ranked among Africa\'s most livable cities. Spread across scenic hills, Kigali offers a unique blend of traditional culture, colonial history, and modern development. The city serves as the perfect gateway to exploring all regions of Rwanda.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/Kigali-Citys-1_agovb2.jpg',
            rating: 4.9,
            basePrice: 0,
            duration: 'Half Day to 2 Days',
            difficulty: 'Easy',
            bestSeason: 'Year-round',
            permitsRequired: false,
            groupSize: '2-15',
            highlights: [
                'Clean, safe, and well-organized urban environment',
                'Kigali Genocide Memorial - powerful tribute and education center',
                'Kimironko Market - vibrant local market experience',
                'Rwanda Art Museum and Inema Arts Center',
                'Growing culinary scene with international and local cuisine'
            ],
            activities: [
                { name: 'City Cultural Tour', icon: 'fas fa-city', description: 'Guided exploration of Kigali\'s landmarks, markets, and neighborhoods' },
                { name: 'Genocide Memorial Visit', icon: 'fas fa-landmark', description: 'Reflective visit to the Kigali Genocide Memorial' },
                { name: 'Art & Craft Exploration', icon: 'fas fa-palette', description: 'Visit local art centers and craft cooperatives' },
                { name: 'Culinary Experience', icon: 'fas fa-utensils', description: 'Food tours featuring Rwandan and international cuisine' }
            ],
            conservationInfo: 'Kigali is Africa\'s cleanest city with monthly community cleaning days (Umuganda)',
            tags: ['City', 'Culture', 'History', 'Food', 'Art', 'Modern Rwanda', 'Urban'],
            available: true,
            featured: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'King\'s Palace Museum',
            slug: 'rw-kings-palace-museum',
            shortDescription: 'Reconstructed royal palace showcasing Rwanda\'s monarchy history',
            location: 'Nyanza, Southern Rwanda',
            description: 'The reconstructed Royal Palace of the Rwandan monarchy offers a fascinating glimpse into pre-colonial Rwandan society. The traditional thatched palace, modeled after the residence of King Mutara III Rudahigwa, showcases royal architecture, artifacts, and the famous Inyambo long-horned cows.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768348646/befbedba-6cb3-4da4-8e1e-d86db71af565.png',
            rating: 4.5,
            basePrice: 35,
            duration: 'Half Day',
            difficulty: 'Easy',
            bestSeason: 'Year-round',
            permitsRequired: false,
            groupSize: '2-20',
            highlights: [
                'Traditional royal palace reconstruction',
                'Inyambo sacred long-horned cows with horns spanning over 2 meters',
                'Cultural dance performances by Intore dancers',
                'Traditional architecture and royal artifacts',
                'Historical insights into Rwanda\'s monarchy system'
            ],
            activities: [
                { name: 'Palace Tour', icon: 'fas fa-landmark', description: 'Explore traditional royal dwellings and compounds' },
                { name: 'Cow Ceremony Experience', icon: 'fas fa-cow', description: 'See the famous Inyambo long-horned cows and learn about their significance' },
                { name: 'Cultural Performance', icon: 'fas fa-music', description: 'Watch traditional Intore dance and drumming performances' },
                { name: 'Craft Demonstrations', icon: 'fas fa-hammer', description: 'Traditional crafts and building techniques demonstrations' }
            ],
            conservationInfo: 'Preserves traditional Rwandan architecture and cultural practices',
            tags: ['Culture', 'History', 'Royalty', 'Traditional', 'Museum', 'Performance', 'Heritage'],
            available: true,
            featured: false,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    
    accommodations: [
        {
            name: 'One&Only Gorilla\'s Nest',
            slug: 'acc-one-only-gorillas-nest',
            type: 'Luxury Lodge',
            category: '5-Star',
            location: 'Volcanoes National Park, Musanze',
            description: 'An exclusive luxury lodge nestled in the foothills of the Virunga volcanoes, offering unparalleled gorilla trekking access. The lodge combines contemporary luxury with authentic Rwandan design, featuring 21 forest-facing rooms and suites with private decks, fireplaces, and stunning volcano views.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654351/one-and-only-kinigi_sgleyo.jpg',
            pricePerNight: 3500,
            rating: 4.9,
            amenities: [
                { name: 'Infinity Pool with Volcano Views', included: true, icon: 'fas fa-swimming-pool' },
                { name: 'ESPA Spa & Wellness Center', included: true, icon: 'fas fa-spa' },
                { name: 'Fine Dining Restaurant & Bar', included: true, icon: 'fas fa-utensils' },
                { name: 'Private Fireplace in Each Room', included: true, icon: 'fas fa-fire' },
                { name: '24-Hour Butler Service', included: true, icon: 'fas fa-concierge-bell' },
                { name: 'Gorilla Trekking Preparation Center', included: true, icon: 'fas fa-hiking' },
                { name: 'Helicopter Transfer Service', included: true, icon: 'fas fa-helicopter' }
            ],
            available: true,
            contactPhone: '+250787407051',
            contactEmail: 'info@gotrip.africa',
            maxGuests: 2,
            sustainability: 'Carbon-neutral operations, solar-powered, supports local communities',
            totalRooms: 21,
            roomsAvailable: 8,
            checkInTime: '14:00',
            checkOutTime: '11:00',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Kigali Marriott Hotel',
            slug: 'acc-kigali-marriott',
            type: '5-Star Hotel',
            category: 'Luxury',
            location: 'Kigali City Center',
            description: 'Located in the heart of Kigali\'s business district, the Marriott offers 254 rooms and suites with panoramic city views. The hotel features Rwanda\'s largest ballroom, multiple dining options, and direct access to Kigali Convention Centre. Ideal for business travelers and luxury seekers.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664108/Marriott-Hotel-Kigali-Rwanda-Safaris_8__Tett-Safaris_v78edy.webp',
            pricePerNight: 450,
            rating: 4.8,
            amenities: [
                { name: 'Rooftop Infinity Pool', included: true, icon: 'fas fa-swimming-pool' },
                { name: 'Multiple Restaurants & Bars', included: true, icon: 'fas fa-utensils' },
                { name: 'Business Center & Meeting Rooms', included: true, icon: 'fas fa-briefcase' },
                { name: '24-Hour Fitness Center', included: true, icon: 'fas fa-dumbbell' },
                { name: 'Concierge & Tour Desk', included: true, icon: 'fas fa-concierge-bell' },
                { name: 'Spa & Wellness Facilities', included: true, icon: 'fas fa-spa' },
                { name: 'Executive Lounge Access', included: true, icon: 'fas fa-crown' }
            ],
            available: true,
            contactPhone: '+250787407051',
            contactEmail: 'info@gotrip.africa',
            maxGuests: 4,
            sustainability: 'LEED-certified building, water recycling system, local employment focus',
            totalRooms: 254,
            roomsAvailable: 120,
            checkInTime: '15:00',
            checkOutTime: '12:00',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Nyungwe House',
            slug: 'acc-nyungwe-house',
            type: 'Boutique Lodge',
            category: '4-Star',
            location: 'Nyungwe National Park',
            description: 'Perched on the edge of Nyungwe Forest at 2,500 meters, this luxury eco-lodge offers stunning canopy views and exclusive chimpanzee trekking access. The lodge features 24 rooms designed with local materials, each offering private terraces overlooking the rainforest.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654350/one-only-nyungwe-house_oezq87.jpg',
            pricePerNight: 850,
            rating: 4.7,
            amenities: [
                { name: 'Infinity Pool Overlooking Forest', included: true, icon: 'fas fa-swimming-pool' },
                { name: 'Full-Service Spa', included: true, icon: 'fas fa-spa' },
                { name: 'Forest View Restaurant', included: true, icon: 'fas fa-utensils' },
                { name: 'Guided Nature Walks', included: true, icon: 'fas fa-hiking' },
                { name: 'Chimpanzee Trekking Base', included: true, icon: 'fas fa-tree' },
                { name: 'Tea Plantation Tours', included: true, icon: 'fas fa-leaf' },
                { name: 'Bird Watching Platform', included: true, icon: 'fas fa-dove' }
            ],
            available: true,
            contactPhone: '+250787407051',
            contactEmail: 'info@gotrip.africa',
            maxGuests: 3,
            sustainability: 'Solar-powered, rainwater harvesting, supports forest conservation',
            totalRooms: 24,
            roomsAvailable: 12,
            checkInTime: '14:00',
            checkOutTime: '11:00',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Lake Kivu Serena Hotel',
            slug: 'acc-lake-kivu-serena',
            type: 'Resort Hotel',
            category: '4-Star',
            location: 'Gisenyi, Lake Kivu',
            description: 'Located on the shores of Lake Kivu, this resort offers direct beach access, water sports, and stunning sunset views. The property features 66 rooms and suites with lake views, multiple dining options, and extensive recreational facilities.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654353/aeriel-view-serena_cuohuj.jpg',
            pricePerNight: 380,
            rating: 4.6,
            amenities: [
                { name: 'Private Beach Access', included: true, icon: 'fas fa-umbrella-beach' },
                { name: 'Water Sports Center', included: true, icon: 'fas fa-sailboat' },
                { name: 'Multiple Dining Options', included: true, icon: 'fas fa-utensils' },
                { name: 'Swimming Pool with Lake View', included: true, icon: 'fas fa-swimming-pool' },
                { name: 'Kids Club & Activities', included: true, icon: 'fas fa-child' },
                { name: 'Tennis & Volleyball Courts', included: true, icon: 'fas fa-baseball-ball' },
                { name: 'Conference Facilities', included: true, icon: 'fas fa-chalkboard' }
            ],
            available: true,
            contactPhone: '+250787407051',
            contactEmail: 'info@gotrip.africa',
            maxGuests: 4,
            sustainability: 'Waste management program, local community engagement, eco-friendly practices',
            totalRooms: 66,
            roomsAvailable: 30,
            checkInTime: '14:00',
            checkOutTime: '11:00',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Akagera Game Lodge',
            slug: 'acc-akagera-game-lodge',
            type: 'Safari Lodge',
            category: '3-Star',
            location: 'Akagera National Park',
            description: 'The only lodge inside Akagera National Park, offering authentic safari experience with wildlife viewing from your balcony. Overlooking Lake Ihema, the lodge features 60 rooms, a waterhole frequented by wildlife, and direct access to game drives.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349192/Akagera-Game-Lodge-Terrasse-upstairs-113-min_rofnsc.jpg',
            pricePerNight: 320,
            rating: 4.5,
            amenities: [
                { name: 'Waterhole Wildlife Viewing', included: true, icon: 'fas fa-binoculars' },
                { name: 'Swimming Pool with Savanna View', included: true, icon: 'fas fa-swimming-pool' },
                { name: 'Safari Restaurant & Bar', included: true, icon: 'fas fa-utensils' },
                { name: 'Game Drive Vehicles', included: true, icon: 'fas fa-car' },
                { name: 'Bush Breakfast & Sundowners', included: true, icon: 'fas fa-mug-hot' },
                { name: 'Guided Walking Safaris', included: true, icon: 'fas fa-hiking' },
                { name: 'Conference Facilities', included: true, icon: 'fas fa-chalkboard' }
            ],
            available: true,
            contactPhone: '+250787407051',
            contactEmail: 'info@gotrip.africa',
            maxGuests: 3,
            sustainability: 'Supports park conservation, employs local guides, eco-friendly operations',
            totalRooms: 60,
            roomsAvailable: 25,
            checkInTime: '14:00',
            checkOutTime: '11:00',
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Ubumwe Grande Hotel',
            slug: 'acc-ubumwe-hotel',
            type: 'Business Hotel',
            category: '4-Star',
            location: 'Kigali Heights',
            description: 'Modern business hotel in Kigali\'s commercial district, offering excellent conference facilities and city access. The hotel features 82 rooms, extensive meeting spaces, and convenient access to government offices and business centers.',
            mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349335/facade_fc6shj.jpg',
            pricePerNight: 280,
            rating: 4.4,
            amenities: [
                { name: 'Conference & Banquet Facilities', included: true, icon: 'fas fa-chalkboard' },
                { name: 'Business Center', included: true, icon: 'fas fa-briefcase' },
                { name: 'Restaurant & Lounge Bar', included: true, icon: 'fas fa-utensils' },
                { name: 'Fitness Center', included: true, icon: 'fas fa-dumbbell' },
                { name: 'Complimentary Airport Transfers', included: true, icon: 'fas fa-shuttle-van' },
                { name: 'High-Speed WiFi', included: true, icon: 'fas fa-wifi' },
                { name: 'Room Service 24/7', included: true, icon: 'fas fa-bell' }
            ],
            available: true,
            contactPhone: '+250787407051',
            contactEmail: 'info@gotrip.africa',
            maxGuests: 2,
            sustainability: 'Energy-efficient systems, local procurement policy, community partnerships',
            totalRooms: 82,
            roomsAvailable: 40,
            checkInTime: '14:00',
            checkOutTime: '12:00',
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    
    guides: [
        {
            name: 'Mr. Patience Rutayisire',
            slug: 'guide-patience-rutayisire',
            title: 'Senior Wildlife & Gorilla Specialist',
            biography: 'With over 8 years of experience in wildlife conservation and gorilla research, Dr. Rutayisire holds a PhD in Primatology from University of Rwanda. She has published 12 research papers on gorilla behavior and conservation, and leads training programs for new guides. Her work with the Dian Fossey Gorilla Fund has contributed significantly to gorilla population recovery.',
            detailedBio: 'Dr. Patience Rutayisire is one of Rwanda\'s most experienced wildlife guides with specialized expertise in mountain gorilla conservation. She began her career as a research assistant with the Dian Fossey Gorilla Fund and has since led over 500 successful gorilla treks. Her academic background includes published research on primate behavior and conservation strategies. She regularly trains new guides and contributes to national conservation policy development.',
            email: 'patience.r@gotrip.africa', // Schema field is 'email' not 'contactEmail'
            phone: '+250787407051', // Schema field is 'phone' not 'contactPhone'
            whatsapp: '+250787407051',
            country: 'Rwanda',
            city: 'Musanze',
            address: 'Volcanoes National Park Headquarters, Kinigi',
            languages: [
                { language: 'English', level: 'Native Fluency', flag: '🇬🇧', certification: 'TOEFL 120/120', speaking: 10, reading: 10, writing: 10, years: 15 },
                { language: 'German', level: 'Fluent', flag: '🇩🇪', certification: 'Goethe C1', speaking: 9, reading: 9, writing: 8, years: 8 },
                { language: 'Spanish', level: 'Advanced', flag: '🇪🇸', certification: 'DELE B2', speaking: 8, reading: 8, writing: 7, years: 6 },
                { language: 'French', level: 'Fluent', flag: '🇫🇷', certification: 'DALF C1', speaking: 9, reading: 9, writing: 9, years: 10 },
                { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳', certification: 'HSK 5', speaking: 7, reading: 7, writing: 6, years: 4 },
                { language: 'Swahili', level: 'Native', flag: '🇹🇿', speaking: 10, reading: 9, writing: 9, years: 'Since birth' },
                { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', speaking: 10, reading: 10, writing: 10, years: 'Since birth' }
            ],
            experienceYears: 8,
            totalTours: 520,
            rating: 4.9,
            totalReviews: 287,
            dailyRate: 150,
            currency: 'USD',
            minimumDays: 1,
            maximumGroupSize: 8,
            image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png',
            gallery: [
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/Rwanda-volcano_isb1qf.jpg',
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664104/intore-dancers_rb6vwe.jpg'
            ],
            certifications: [
                { name: 'Gorilla Trekking Professional', issuingAuthority: 'Rwanda Development Board', year: 2018, validUntil: '2028' },
                { name: 'Wilderness First Responder (WFR)', issuingAuthority: 'Wilderness Medical Associates', year: 2019, validUntil: '2024' },
                { name: 'Bird Watching Professional', issuingAuthority: 'Rwanda Birding Association', year: 2020, validUntil: '2025' },
                { name: 'Professional Photography Guide', issuingAuthority: 'National Geographic Society', year: 2021, validUntil: '2026' },
                { name: 'Business and conference Interpretation', issuingAuthority: 'University of Rwanda', year: 2017, validUntil: '2027' },
                { name: 'Cultural Heritage Interpretation - UNESCO', issuingAuthority: 'UNESCO', year: 2022, validUntil: '2027' }
            ],
            education: [
                { degree: 'PhD', institution: 'University of Rwanda', year: 2022, field: 'Primatology' },
                { degree: 'BA', institution: 'University of Rwanda', year: 2015, field: 'Communications studies' },
                { degree: 'Diploma', institution: 'Cornell University', year: 2018, field: 'Wildlife Conservation' },
                { degree: 'Certificate', institution: 'Cornell University', year: 2018, field: 'Tourism Management' }
            ],
            specialties: [
                { name: 'Gorilla Behavior & Ecology', level: 'Expert', years: 8, description: 'Specialized knowledge of mountain gorilla social structure, feeding habits, and conservation needs' },
                { name: 'Wildlife Photography Guidance', level: 'Advanced', years: 6, description: 'Expert in wildlife photography techniques and ethical photography practices' },
                { name: 'Conservation Education', level: 'Expert', years: 8, description: 'Developing and delivering conservation education programs for visitors and communities' },
                { name: 'High-Altitude Trekking', level: 'Advanced', years: 7, description: 'Expertise in high-altitude trekking safety and acclimatization strategies' }
            ],
            destinationsExpertise: [
                'Volcanoes National Park',
                'Nyungwe National Park',
                'Akagera National Park',
                'Lake Kivu',
                'Kigali City'
            ],
            available: true,
            featured: true,
            instantBooking: true,
            responseRate: 98,
            responseTime: 'Within 2 hours',
            workingHours: {
                monday: '8:00-18:00',
                tuesday: '8:00-18:00',
                wednesday: '8:00-18:00',
                thursday: '8:00-18:00',
                friday: '8:00-18:00',
                saturday: '9:00-16:00',
                sunday: '10:00-15:00'
            },
            equipmentProvided: [
                'Trekking poles',
                'Rain ponchos',
                'Binoculars',
                'First aid kit',
                'Gorilla tracking permits assistance',
                'Water and snacks'
            ],
            clientTypes: [
                'Adventure Travelers',
                'Wildlife Photographers',
                'Conservation Researchers',
                'Luxury Travelers',
                'Family Groups',
                'Educational Groups'
            ],
            reviewSummary: {
                overall: 4.9,
                knowledge: 4.9,
                communication: 4.8,
                punctuality: 4.9,
                safety: 5.0,
                flexibility: 4.8
            },
            recentReviews: [
                {
                    clientName: 'Michael Johnson',
                    country: 'USA',
                    rating: 5,
                    date: new Date('2026-01-10'),
                    comment: 'Patience made our gorilla trek unforgettable. Her knowledge and passion for conservation are inspiring.',
                    tour: '3-Day Gorilla Trekking Experience'
                },
                {
                    clientName: 'Sarah Müller',
                    country: 'Germany',
                    rating: 5,
                    date: new Date('2026-01-05'),
                    comment: 'Exceptional guide with deep knowledge of gorilla behavior. Highly recommend!',
                    tour: '5-Day Rwanda Wildlife Adventure'
                }
            ],
            socialMedia: {
                linkedin: 'https://linkedin.com/in/patience-rutayisire',
                twitter: 'https://twitter.com/prutayisire',
                facebook: 'https://facebook.com/patience.rutayisire',
                instagram: 'https://instagram.com/patience_gorillaguide'
            },
            tags: [
                'Gorilla Expert',
                'Wildlife Conservation',
                'Photography Guide',
                'German Speaking',
                'Research Background',
                'Volcanoes National Park'
            ],
            metaTitle: 'Patience Rutayisire - Senior Gorilla Trekking Guide in Rwanda',
            metaDescription: 'Book Patience Rutayisire, an expert gorilla trekking guide with 8+ years experience in Rwanda\'s Volcanoes National Park. Fluent in English, German, French, and Spanish.',
            metaKeywords: ['gorilla guide', 'Rwanda guide', 'wildlife expert', 'conservation guide', 'German speaking guide'],
            views: 1250,
            bookings: 520,
            availability: {
                nextAvailable: new Date('2026-01-20'),
                calendar: 'Available through February 2026'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Mr. Celestin Hagenimana',
            slug: 'guide-celestin-hagenimana',
            title: 'Cultural & Historical Expert Guide',
            biography: 'Celestin brings 3+ years of specialized experience in Rwandan cultural heritage and historical interpretation. Fluent in multiple languages including Mandarin, he has guided diplomatic delegations, academic researchers, and cultural exchange groups. His deep knowledge of Rwanda\'s history from pre-colonial times to present day provides visitors with profound cultural insights.',
            detailedBio: 'Celestin Hagenimana is a cultural historian specializing in Rwandan traditions, monarchy history, and contemporary cultural developments. With an MBA background, he uniquely combines business understanding with cultural expertise. He has guided numerous diplomatic missions and academic research groups, providing in-depth analysis of Rwanda\'s social and historical context.',
            email: 'celestin.h@gotrip.africa',
            phone: '+250787407052',
            whatsapp: '+250787407052',
            country: 'Rwanda',
            city: 'Kigali',
            address: 'Kigali Cultural Center, Kacyiru',
            languages: [
                { language: 'English', level: 'Fluent', flag: '🇬🇧', certification: 'IELTS 8.0', speaking: 9, reading: 9, writing: 8, years: 8 },
                { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳', certification: 'HSK 4', speaking: 7, reading: 7, writing: 6, years: 5 },
                { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', speaking: 10, reading: 10, writing: 10, years: 'Since birth' },
                { language: 'French', level: 'Intermediate', flag: '🇫🇷', speaking: 6, reading: 7, writing: 5, years: 3 }
            ],
            experienceYears: 3,
            totalTours: 185,
            rating: 4.8,
            totalReviews: 142,
            dailyRate: 100,
            currency: 'USD',
            minimumDays: 1,
            maximumGroupSize: 10,
            image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664106/zhenfei_dvbmas.jpg',
            gallery: [
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768348646/befbedba-6cb3-4da4-8e1e-d86db71af565.png',
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664104/intore-dancers_rb6vwe.jpg'
            ],
            certifications: [
                { name: 'Cultural Heritage Specialist', issuingAuthority: 'Rwanda Cultural Heritage Academy', year: 2020, validUntil: '2025' },
                { name: 'Historical Tour Guide', issuingAuthority: 'Rwanda Development Board', year: 2019, validUntil: '2024' },
                { name: 'Community Tourism Professional', issuingAuthority: 'Rwanda Tourism University College', year: 2021, validUntil: '2026' },
                { name: 'Language Interpretation Professional', issuingAuthority: 'University of Rwanda', year: 2018, validUntil: '2028' },
                { name: 'HR analyst and Business Consultant', issuingAuthority: 'Rwanda Institute of Management', year: 2017, validUntil: '2027' }
            ],
            education: [
                { degree: 'MBA', institution: 'University of Rwanda', year: 2020, field: 'Business and Human Resource Management' },
                { degree: 'BA', institution: 'University of Rwanda', year: 2016, field: 'Business Administration' },
                { degree: 'Certificate', institution: 'Confucius Institute', year: 2019, field: 'Chinese Language and Culture' }
            ],
            specialties: [
                { name: 'Royal History & Traditions', level: 'Expert', years: 3, description: 'In-depth knowledge of Rwanda\'s monarchy system, royal rituals, and traditional governance' },
                { name: 'Cultural Performance Interpretation', level: 'Advanced', years: 3, description: 'Expert interpretation of traditional dances, music, and artistic expressions' },
                { name: 'Community Engagement', level: 'Expert', years: 3, description: 'Facilitating meaningful interactions between visitors and local communities' },
                { name: 'Historical Site Interpretation', level: 'Advanced', years: 3, description: 'Contextualizing historical sites within Rwanda\'s broader historical narrative' }
            ],
            destinationsExpertise: [
                'Kigali City',
                'King\'s Palace Museum',
                'Ethnographic Museum',
                'Cultural Villages',
                'Genocide Memorial Sites'
            ],
            available: true,
            featured: true,
            instantBooking: true,
            responseRate: 95,
            responseTime: 'Within 4 hours',
            workingHours: {
                monday: '9:00-17:00',
                tuesday: '9:00-17:00',
                wednesday: '9:00-17:00',
                thursday: '9:00-17:00',
                friday: '9:00-17:00',
                saturday: '10:00-15:00',
                sunday: 'Closed'
            },
            equipmentProvided: [
                'Cultural literature',
                'Historical reference materials',
                'Audio translation devices',
                'Traditional attire for ceremonies'
            ],
            clientTypes: [
                'Cultural Tourists',
                'Academic Researchers',
                'Diplomatic Delegations',
                'Business Visitors',
                'Chinese-speaking Groups',
                'Heritage Enthusiasts'
            ],
            reviewSummary: {
                overall: 4.8,
                knowledge: 4.9,
                communication: 4.7,
                punctuality: 4.8,
                safety: 4.9,
                flexibility: 4.6
            },
            recentReviews: [
                {
                    clientName: 'Zhang Wei',
                    country: 'China',
                    rating: 5,
                    date: new Date('2026-01-08'),
                    comment: 'Celestin\'s Mandarin skills and cultural knowledge made our trip exceptional. Highly recommended for Chinese visitors.',
                    tour: 'Rwanda Cultural Heritage Tour'
                },
                {
                    clientName: 'Professor James Wilson',
                    country: 'UK',
                    rating: 4,
                    date: new Date('2026-01-03'),
                    comment: 'Excellent historical context and interpretation. Very knowledgeable about royal traditions.',
                    tour: 'Academic Research Tour'
                }
            ],
            socialMedia: {
                linkedin: 'https://linkedin.com/in/celestin-hagenimana',
                twitter: 'https://twitter.com/chagenimana',
                facebook: 'https://facebook.com/celestin.hagenimana'
            },
            tags: [
                'Cultural Expert',
                'Historical Guide',
                'Mandarin Speaking',
                'Business Background',
                'Royal History',
                'Community Tourism'
            ],
            metaTitle: 'Celestin Hagenimana - Cultural & Historical Guide in Rwanda',
            metaDescription: 'Book Celestin Hagenimana for expert cultural and historical tours in Rwanda. Fluent in English and Mandarin with MBA background.',
            metaKeywords: ['cultural guide', 'historical guide', 'Mandarin guide', 'Rwanda history', 'royal palace guide'],
            views: 890,
            bookings: 185,
            availability: {
                nextAvailable: new Date('2026-01-18'),
                calendar: 'Available through March 2026'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    
    translators: [
        {
            name: 'Mr. Tite Iradukunda',
            slug: 'translator-tite-iradukunda',
            title: 'Chinese & Kinyarwanda Translator',
            biography: 'Tite is a highly specialized translator with native fluency in Mandarin Chinese and Kinyarwanda. With 5+ years of experience working with Chinese investors, diplomatic missions, and medical teams in Rwanda, he has developed expertise in technical, business, and medical translation. His work has facilitated major infrastructure projects and international agreements.',
            detailedBio: 'Tite Iradukunda is a certified Mandarin-Kinyarwanda translator with extensive experience in diplomatic, medical, and technical translation. He has worked with numerous Chinese investment projects in Rwanda, facilitating communication between Chinese companies and local authorities. His medical translation experience includes working with Chinese medical teams during health initiatives in Rwanda.',
            email: 'tite.i@gotrip.africa',
            phone: '+250787407053',
            whatsapp: '+250787407053',
            country: 'Rwanda',
            city: 'Kigali',
            address: 'Kigali Business District, KN 3 Ave',
            languages: [
                { 
                    language: 'Chinese (Mandarin)', 
                    level: 'Native Fluency', 
                    flag: '🇨🇳', 
                    certification: 'HSK Level 6 (Highest)', 
                    speaking: 10, 
                    reading: 10, 
                    writing: 10, 
                    translation: 'Expert', 
                    interpretation: 'Expert', 
                    years: 8 
                },
                { 
                    language: 'English', 
                    level: 'Fluent', 
                    flag: '🇬🇧', 
                    certification: 'TOEIC 950/990', 
                    speaking: 9, 
                    reading: 9, 
                    writing: 8, 
                    translation: 'Advanced', 
                    interpretation: 'Advanced', 
                    years: 10 
                },
                { 
                    language: 'French', 
                    level: 'Advanced', 
                    flag: '🇫🇷', 
                    certification: 'DALF C1', 
                    speaking: 8, 
                    reading: 8, 
                    writing: 7, 
                    translation: 'Intermediate', 
                    interpretation: 'Intermediate', 
                    years: 6 
                },
                { 
                    language: 'Kinyarwanda', 
                    level: 'Native', 
                    flag: '🇷🇼', 
                    speaking: 10, 
                    reading: 10, 
                    writing: 10, 
                    translation: 'Expert', 
                    interpretation: 'Expert', 
                    years: 'Since birth' 
                }
            ],
            experienceYears: 5,
            totalProjects: 87,
            rating: 4.9,
            totalReviews: 63,
            dailyRate: 120,
            currency: 'USD',
            hourlyRate: 25,
            minimumHours: 4,
            image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767698065/di-li-bo_mfkxlk.jpg',
            gallery: [
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/akagera-national-park-rwanda-zebra_oysla0.webp',
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/Kigali-Citys-1_agovb2.jpg'
            ],
            certifications: [
                { name: 'Certified Mandarin Translator', issuingAuthority: 'Confucius Institute', year: 2018, validUntil: '2028' },
                { name: 'Legal Translation Specialist', issuingAuthority: 'Rwanda Bar Association', year: 2019, validUntil: '2024' },
                { name: 'Simultaneous Interpreter - UN Standards', issuingAuthority: 'United Nations', year: 2020, validUntil: '2025' },
                { name: 'Business Consulting Translation', issuingAuthority: 'Rwanda Institute of Management', year: 2021, validUntil: '2026' }
            ],
            education: [
                { degree: 'BBA', institution: 'University of Rwanda', year: 2017, field: 'Business Administration' },
                { degree: 'Certificate', institution: 'University of Rwanda', year: 2016, field: 'Chinese Language & Literature' },
                { degree: 'Diploma', institution: 'Confucius Institute', year: 2015, field: 'Mandarin Translation' }
            ],
            specialties: [
                { name: 'Business & Investment Translation', level: 'Expert', years: 5, description: 'Specialized in business contracts, investment agreements, and corporate communications' },
                { name: 'Medical & Healthcare Interpretation', level: 'Advanced', years: 4, description: 'Medical terminology, patient-doctor communication, and healthcare documentation' },
                { name: 'Legal Document Translation', level: 'Expert', years: 5, description: 'Legal contracts, court documents, and regulatory compliance translation' },
                { name: 'Technical Manual Translation', level: 'Advanced', years: 3, description: 'Technical specifications, engineering documents, and equipment manuals' }
            ],
            translationServices: [
                'Simultaneous Interpretation',
                'Consecutive Interpretation',
                'Document Translation',
                'Legal Translation',
                'Medical Translation',
                'Technical Translation',
                'Website Localization'
            ],
            industriesServed: [
                'Construction & Infrastructure',
                'Healthcare & Medical',
                'Legal Services',
                'Government & Diplomacy',
                'Technology',
                'Education',
                'Tourism'
            ],
            notableProjects: [
                { name: 'China-Rwanda Infrastructure Agreements', year: 2021, client: 'Ministry of Infrastructure', description: 'Translation of major infrastructure project agreements' },
                { name: 'Medical Team Interpretations', year: 2020, client: 'Chinese Medical Teams in Rwanda', description: 'Medical interpretation for healthcare initiatives' },
                { name: 'International Conference Simultaneous Interpretation', year: 2022, client: 'Rwanda Convention Bureau', description: 'Simultaneous interpretation for major international conference' },
                { name: 'Technical Manual Translation', year: 2021, client: 'Chinese Construction Company', description: 'Translation of engineering equipment manuals' }
            ],
            available: true,
            featured: true,
            instantBooking: true,
            responseRate: 96,
            responseTime: 'Within 2 hours',
            workingHours: {
                monday: '8:00-18:00',
                tuesday: '8:00-18:00',
                wednesday: '8:00-18:00',
                thursday: '8:00-18:00',
                friday: '8:00-18:00',
                saturday: '9:00-16:00',
                sunday: '10:00-15:00'
            },
            equipment: [
                'Wireless interpretation equipment',
                'Soundproof booth',
                'Dual headset system',
                'Translation software',
                'Recording equipment'
            ],
            serviceAreas: [
                'Kigali City',
                'Entire Rwanda',
                'Remote via Zoom/Skype',
                'International Conferences'
            ],
            pricing: {
                dailyRate: 120,
                hourlyRate: 25,
                minimumHours: 4,
                weekendSurcharge: 30,
                travelIncluded: 'Within Kigali',
                travelAdditional: 'Outside Kigali: $0.75/km'
            },
            reviewSummary: {
                overall: 4.9,
                accuracy: 4.9,
                professionalism: 4.8,
                punctuality: 4.9,
                communication: 4.8,
                flexibility: 4.7
            },
            recentReviews: [
                {
                    clientName: 'Zhang Wei',
                    country: 'China',
                    rating: 5,
                    date: new Date('2026-01-12'),
                    comment: 'Exceptional Mandarin-Kinyarwanda translation. Made our business negotiations smooth and successful.',
                    service: 'Business Contract Translation'
                },
                {
                    clientName: 'Dr. Li Ming',
                    country: 'China',
                    rating: 5,
                    date: new Date('2026-01-08'),
                    comment: 'Professional medical interpretation. Accurate and culturally sensitive.',
                    service: 'Medical Team Interpretation'
                }
            ],
            socialMedia: {
                linkedin: 'https://linkedin.com/in/tite-iradukunda',
                wechat: 'tite-translator',
                whatsapp: '+250787407053'
            },
            tags: [
                'Mandarin Translator',
                'Chinese Translation',
                'Legal Translator',
                'Medical Interpreter',
                'Business Translation',
                'Simultaneous Interpretation'
            ],
            metaTitle: 'Tite Iradukunda - Certified Mandarin Translator in Rwanda',
            metaDescription: 'Book Tite Iradukunda for professional Mandarin-Chinese translation and interpretation services in Rwanda. Expert in business, legal, and medical translation.',
            metaKeywords: ['mandarin translator', 'chinese translator', 'kinyarwanda translation', 'legal translator', 'medical interpreter', 'rwanda translator'],
            views: 750,
            bookings: 87,
            availability: {
                nextAvailable: new Date('2026-01-19'),
                calendar: 'Available through April 2026',
                advanceBooking: '2 weeks minimum'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            name: 'Roberto Lateif',
            slug: 'translator-roberto-lateif',
            title: 'Multilingual Translator',
            biography: 'Roberto brings 8+ years of experience in diplomatic and high-level translation services. Fluent in 6 languages including Arabic and Portuguese, he has worked with UN agencies, diplomatic missions, and international corporations. His expertise in legal and diplomatic translation has facilitated major international agreements and high-level meetings.',
            detailedBio: 'Roberto Lateif is a multilingual translator specializing in diplomatic and legal translation. With extensive experience working with international organizations, he has facilitated high-level negotiations and international agreements. His background includes translation for UN peacekeeping missions and African Union summits.',
            email: 'roberto.l@gotrip.africa',
            phone: '+250787407054',
            whatsapp: '+250787407054',
            country: 'Rwanda',
            city: 'Kigali',
            address: 'Kigali Convention Center Area',
            languages: [
                { 
                    language: 'English', 
                    level: 'Fluent', 
                    flag: '🇬🇧', 
                    certification: 'Cambridge CPE', 
                    speaking: 9, 
                    reading: 9, 
                    writing: 9, 
                    translation: 'Expert', 
                    interpretation: 'Expert', 
                    years: 12 
                },
                { 
                    language: 'Arabic', 
                    level: 'Native', 
                    flag: '🇸🇦', 
                    speaking: 10, 
                    reading: 10, 
                    writing: 10, 
                    translation: 'Expert', 
                    interpretation: 'Expert', 
                    years: 'Since birth' 
                },
                { 
                    language: 'Portuguese', 
                    level: 'Fluent', 
                    flag: '🇵🇹', 
                    certification: 'CELPE-Bras', 
                    speaking: 9, 
                    reading: 9, 
                    writing: 8, 
                    translation: 'Advanced', 
                    interpretation: 'Advanced', 
                    years: 8 
                },
                { 
                    language: 'Swahili', 
                    level: 'Advanced', 
                    flag: '🇹🇿', 
                    speaking: 8, 
                    reading: 7, 
                    writing: 6, 
                    translation: 'Intermediate', 
                    interpretation: 'Intermediate', 
                    years: 5 
                },
                { 
                    language: 'French', 
                    level: 'Intermediate', 
                    flag: '🇫🇷', 
                    certification: 'DELF B2', 
                    speaking: 7, 
                    reading: 7, 
                    writing: 6, 
                    translation: 'Intermediate', 
                    interpretation: 'Intermediate', 
                    years: 4 
                },
                { 
                    language: 'Spanish', 
                    level: 'Intermediate', 
                    flag: '🇪🇸', 
                    certification: 'DELE B1', 
                    speaking: 6, 
                    reading: 6, 
                    writing: 5, 
                    translation: 'Basic', 
                    interpretation: 'Basic', 
                    years: 3 
                }
            ],
            experienceYears: 8,
            totalProjects: 145,
            rating: 4.8,
            totalReviews: 98,
            dailyRate: 180,
            currency: 'USD',
            hourlyRate: 35,
            minimumHours: 4,
            image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767668483/roberto_eyubfo.png',
            gallery: [
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/Kigali-Citys-1_agovb2.jpg',
                'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349335/facade_fc6shj.jpg'
            ],
            certifications: [
                { name: 'Certified Arabic Translator', issuingAuthority: 'United Nations', year: 2016, validUntil: '2026' },
                { name: 'UN Interpreter Certified', issuingAuthority: 'United Nations', year: 2017, validUntil: '2027' },
                { name: 'Legal Translation Specialist', issuingAuthority: 'Rwanda Bar Association', year: 2018, validUntil: '2028' },
                { name: 'Diplomatic Protocol Training', issuingAuthority: 'Ministry of Foreign Affairs', year: 2019, validUntil: '2024' },
                { name: 'Conference Interpretation', issuingAuthority: 'International Association of Conference Interpreters', year: 2020, validUntil: '2025' }
            ],
            education: [
                { degree: 'MA', institution: 'University of Nairobi', year: 2014, field: 'International Relations' },
                { degree: 'BA', institution: 'University of Khartoum', year: 2012, field: 'Translation & Interpretation' },
                { degree: 'Certificate', institution: 'UN Language Training Program', year: 2015, field: 'Diplomatic Translation' }
            ],
            specialties: [
                { name: 'Diplomatic Protocol & Interpretation', level: 'Expert', years: 8, description: 'Specialized in diplomatic meetings, official ceremonies, and protocol interpretation' },
                { name: 'Legal Document Translation', level: 'Expert', years: 8, description: 'International agreements, treaties, and legal correspondence' },
                { name: 'International Conference Interpretation', level: 'Expert', years: 7, description: 'Simultaneous and consecutive interpretation for international conferences' },
                { name: 'Business Negotiation Translation', level: 'Advanced', years: 6, description: 'High-stakes business negotiations and international trade discussions' }
            ],
            translationServices: [
                'Diplomatic Interpretation',
                'Legal Translation',
                'Conference Interpretation',
                'Simultaneous Interpretation',
                'Consecutive Interpretation',
                'Document Translation',
                'Protocol Services'
            ],
            industriesServed: [
                'Diplomatic Missions',
                'International Organizations',
                'Government Agencies',
                'Legal Firms',
                'Multinational Corporations',
                'NGOs',
                'Academic Institutions'
            ],
            notableProjects: [
                { name: 'UN Peacekeeping Mission Translations', year: 2018, client: 'United Nations', description: 'Translation services for UN peacekeeping mission in Rwanda' },
                { name: 'African Union Summit Interpretations', year: 2019, client: 'African Union', description: 'Interpretation for AU summit sessions and bilateral meetings' },
                { name: 'International Trade Agreement Translations', year: 2020, client: 'Ministry of Trade', description: 'Translation of international trade agreements' },
                { name: 'Diplomatic Ceremony Interpretation', year: 2021, client: 'Embassy of Qatar', description: 'Protocol interpretation for diplomatic ceremonies' }
            ],
            available: true,
            featured: true,
            instantBooking: true,
            responseRate: 92,
            responseTime: 'Within 4 hours',
            workingHours: {
                monday: '9:00-17:00',
                tuesday: '9:00-17:00',
                wednesday: '9:00-17:00',
                thursday: '9:00-17:00',
                friday: '9:00-17:00',
                saturday: '10:00-14:00',
                sunday: 'Emergency only'
            },
            equipment: [
                'UN-standard interpretation booth',
                'Wireless microphone system',
                'Dual-channel interpretation equipment',
                'Soundproof headphones',
                'Recording and transcription software'
            ],
            serviceAreas: [
                'Kigali International Airport',
                'Kigali Convention Center',
                'Government Buildings',
                'Embassy District',
                'International Venues'
            ],
            pricing: {
                dailyRate: 180,
                hourlyRate: 35,
                minimumHours: 4,
                weekendSurcharge: 50,
                emergencySurcharge: 100,
                travelIncluded: 'Kigali City Center',
                equipmentRental: 'Additional $50/day'
            },
            reviewSummary: {
                overall: 4.8,
                accuracy: 4.9,
                professionalism: 4.9,
                punctuality: 4.7,
                communication: 4.8,
                flexibility: 4.6
            },
            recentReviews: [
                {
                    clientName: 'Ambassador Ahmed',
                    country: 'Qatar',
                    rating: 5,
                    date: new Date('2026-01-10'),
                    comment: 'Professional diplomatic interpretation. Excellent understanding of protocol and cultural nuances.',
                    service: 'Diplomatic Ceremony Interpretation'
                },
                {
                    clientName: 'UN Representative',
                    country: 'International',
                    rating: 4,
                    date: new Date('2026-01-05'),
                    comment: 'Reliable and accurate interpretation for high-level meetings.',
                    service: 'UN Conference Interpretation'
                }
            ],
            socialMedia: {
                linkedin: 'https://linkedin.com/in/roberto-lateif',
                twitter: 'https://twitter.com/rlateif',
                professionalWebsite: 'https://roberto-translations.rw'
            },
            tags: [
                'Diplomatic Translator',
                'Arabic Translator',
                'UN Interpreter',
                'Legal Translator',
                'Conference Interpreter',
                'Multilingual Translator'
            ],
            metaTitle: 'Roberto Lateif - Multilingual Diplomatic Translator in Rwanda',
            metaDescription: 'Book Roberto Lateif for professional diplomatic and legal translation services in Rwanda. Fluent in Arabic, Portuguese, English, and multiple languages.',
            metaKeywords: ['diplomatic translator', 'arabic translator', 'un interpreter', 'legal translator', 'multilingual translator', 'conference interpreter'],
            views: 920,
            bookings: 145,
            availability: {
                nextAvailable: new Date('2026-01-22'),
                calendar: 'Available through May 2026',
                advanceBooking: '3 weeks minimum for diplomatic assignments'
            },
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    
    blogPosts: [
        {
            title: 'Ultimate Guide to Gorilla Trekking in Rwanda: Everything You Need to Know',
            slug: 'blog-gorilla-trekking-guide',
            author: 'Dr. Patience Rutayisire',
            authorRole: 'Senior Wildlife Specialist & Conservationist',
            authorImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png', // Added author image
            excerpt: 'Complete professional guide to planning your gorilla trekking adventure in Rwanda. Learn about permits, preparation, fitness requirements, photography tips, and conservation impact.',
            content: `
                <div class="blog-article">
                    <h2>Introduction to Gorilla Trekking</h2>
                    <p>Mountain gorilla trekking in Rwanda's Volcanoes National Park represents one of the most profound wildlife experiences on Earth. With only about 1,063 mountain gorillas remaining worldwide, Rwanda's successful conservation program has made this once-in-a-lifetime experience accessible to responsible travelers.</p>
                    
                    <h3>Permit Information</h3>
                    <ul>
                        <li><strong>Cost:</strong> $1,500 per person (2026 rates)</li>
                        <li><strong>Availability:</strong> Maximum 96 permits daily across 12 habituated families</li>
                        <li><strong>Booking Window:</strong> Recommended 6-12 months in advance for peak seasons</li>
                        <li><strong>Inclusions:</strong> Park entry, guide services, trackers, and conservation fees</li>
                    </ul>
                    
                    <h3>Fitness Requirements</h3>
                    <p>Trekking difficulty ranges from 1-8 hours hiking through dense rainforest at altitudes of 2,500-4,000 meters. Moderate fitness level required. Porters are available for $20 to assist with backpacks.</p>
                    
                    <h3>Photography Guidelines</h3>
                    <ul>
                        <li>Flash photography strictly prohibited</li>
                        <li>Minimum shutter speed: 1/250s recommended</li>
                        <li>Maximum focal length: 400mm recommended</li>
                        <li>7-meter minimum distance from gorillas</li>
                    </ul>
                    
                    <h3>Conservation Impact</h3>
                    <p>Your $1,500 permit contributes directly to conservation: 10% to national parks, 5% to local communities, and ongoing research programs. Since 2005, mountain gorilla populations have increased by 26% in the Virunga Massif.</p>
                </div>
            `,
            featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768334331/the-life-of-mountain-gorillas-_odzqfl.jpg',
            category: 'Wildlife & Adventure',
            featured: true,
            readTime: 15,
            publishedDate: new Date('2026-01-15'),
            tags: ['Gorilla Trekking', 'Wildlife', 'Conservation', 'Volcanoes National Park', 'Photography', 'Permits'],
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: '7-Day Ultimate Rwanda Itinerary: Gorillas, Culture & Nature',
            slug: 'blog-rwanda-itinerary-7days',
            author: 'Marie Claire Uwimana',
            authorRole: 'Senior Tour Designer & Cultural Expert',
            authorImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664104/intore-dancers_rb6vwe.jpg', // Added author image
            excerpt: 'Comprehensive 7-day itinerary covering Rwanda\'s best attractions including gorilla trekking, cultural experiences, and lake relaxation with practical logistics and timing.',
            content: `
                <div class="blog-article">
                    <h2>Perfect 7-Day Rwanda Itinerary</h2>
                    <p>This carefully crafted itinerary maximizes your experience while allowing for acclimatization and cultural immersion.</p>
                    
                    <h3>Day 1-2: Kigali & Cultural Orientation</h3>
                    <ul>
                        <li><strong>Accommodation:</strong> Kigali Marriott Hotel</li>
                        <li><strong>Activities:</strong> Kigali Genocide Memorial, Kimironko Market tour</li>
                        <li><strong>Evening:</strong> Dinner at Repub Lounge with city views</li>
                        <li><strong>Travel Tip:</strong> Adjust to altitude (1,500m) and local time</li>
                    </ul>
                    
                    <h3>Day 3-4: Volcanoes National Park</h3>
                    <ul>
                        <li><strong>Accommodation:</strong> One&Only Gorilla's Nest</li>
                        <li><strong>Activities:</strong> Gorilla trekking Day 1, Iby'iwacu Cultural Village Day 2</li>
                        <li><strong>Optional:</strong> Golden monkey tracking or volcano hike</li>
                        <li><strong>Travel Tip:</strong> Porters highly recommended ($20)</li>
                    </ul>
                    
                    <h3>Day 5-6: Lake Kivu Relaxation</h3>
                    <ul>
                        <li><strong>Accommodation:</strong> Lake Kivu Serena Hotel</li>
                        <li><strong>Activities:</strong> Boat cruise, coffee plantation tour, kayaking</li>
                        <li><strong>Evening:</strong> Sunset drinks on Napoleon Island</li>
                        <li><strong>Travel Tip:</strong> Perfect recovery after trekking</li>
                    </ul>
                    
                    <h3>Day 7: Return & Departure</h3>
                    <ul>
                        <li><strong>Morning:</strong> Scenic drive back to Kigali (3 hours)</li>
                        <li><strong>Afternoon:</strong> Final shopping at Caplaki Craft Village</li>
                        <li><strong>Evening:</strong> Departure from Kigali International Airport</li>
                    </ul>
                    
                    <h3>Budget Estimate</h3>
                    <p>Total per person: $3,800-$5,200 depending on accommodation level and group size.</p>
                </div>
            `,
            featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768334536/Gorillas_on_the_lake_nzc5uc.jpg',
            category: 'Travel Planning',
            featured: true,
            readTime: 12,
            publishedDate: new Date('2026-01-14'),
            tags: ['Itinerary', 'Travel Planning', 'Gorillas', 'Lake Kivu', 'Cultural Tourism', 'Logistics'],
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Cultural Experiences in Rwanda: Beyond Gorilla Trekking',
            slug: 'blog-cultural-experiences-rwanda',
            author: 'Celestin Hagenimana',
            authorRole: 'Cultural Heritage Specialist',
            authorImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664106/zhenfei_dvbmas.jpg', // Added author image
            excerpt: 'Immerse yourself in Rwandan culture through traditional dances, food, village visits, and royal heritage sites with authentic interactions.',
            content: `
                <div class="blog-article">
                    <h2>Authentic Rwandan Cultural Experiences</h2>
                    <p>Rwanda's rich cultural heritage offers travelers opportunities for meaningful interactions beyond wildlife viewing.</p>
                    
                    <h3>Traditional Dance & Music</h3>
                    <ul>
                        <li><strong>Intore Dance:</strong> Warrior dance performed at cultural villages</li>
                        <li><strong>Umushagiriro:</strong> Women's dance celebrating harvest</li>
                        <li><strong>Inanga Music:</strong> Traditional string instrument performances</li>
                        <li><strong>Best Locations:</strong> Iby'iwacu Cultural Village, National Museum</li>
                    </ul>
                    
                    <h3>Culinary Experiences</h3>
                    <ul>
                        <li><strong>Traditional Meals:</strong> Ugali (maize porridge), Isombe (cassava leaves)</li>
                        <li><strong>Cooking Classes:</strong> Learn to prepare Rwandan dishes</li>
                        <li><strong>Market Tours:</strong> Fresh produce and local ingredients</li>
                        <li><strong>Recommended:</strong> Nyamirambo Women's Center cooking class</li>
                    </ul>
                    
                    <h3>Craft & Artisan Workshops</h3>
                    <ul>
                        <li><strong>Agaseke Basket Weaving:</strong> UNESCO-recognized craft</li>
                        <li><strong>Imigongo Art:</strong> Traditional cow dung paintings</li>
                        <li><strong>Pottery Workshops:</strong> Traditional techniques</li>
                        <li><strong>Best Locations:</strong> Azizi Life Studio, Caplaki Craft Village</li>
                    </ul>
                    
                    <h3>Community Tourism Projects</h3>
                    <p>Visit community-run projects that directly benefit local people while offering authentic experiences.</p>
                </div>
            `,
            featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664104/intore-dancers_rb6vwe.jpg',
            category: 'Culture',
            featured: true,
            readTime: 10,
            publishedDate: new Date('2026-01-13'),
            tags: ['Culture', 'Tradition', 'Community', 'Heritage', 'Cuisine', 'Arts'],
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Best Time to Visit Rwanda: Seasonal Guide & Climate Tips',
            slug: 'blog-best-time-visit-rwanda',
            author: 'Weather & Travel Experts',
            authorRole: 'Meteorological & Tourism Specialists',
            authorImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/Rwanda-volcano_isb1qf.jpg', // Added author image
            excerpt: 'Comprehensive guide to Rwanda\'s climate, seasons, and optimal visiting times for different activities with monthly breakdown.',
            content: `
                <div class="blog-article">
                    <h2>Rwanda Climate & Seasons Guide</h2>
                    <p>Rwanda's equatorial climate features two dry seasons and two rainy seasons with moderate temperatures year-round.</p>
                    
                    <h3>Dry Seasons (Best for Trekking)</h3>
                    <ul>
                        <li><strong>June-September:</strong> Long dry season, ideal for gorilla trekking</li>
                        <li><strong>December-February:</strong> Short dry season, perfect for all activities</li>
                        <li><strong>Temperatures:</strong> 24-27°C daytime, 15-18°C nighttime</li>
                        <li><strong>Rainfall:</strong> Minimal, trails in best condition</li>
                    </ul>
                    
                    <h3>Rainy Seasons (Lower Crowds)</h3>
                    <ul>
                        <li><strong>March-May:</strong> Long rainy season, lush landscapes</li>
                        <li><strong>October-November:</strong> Short rainy season, fewer tourists</li>
                        <li><strong>Advantages:</strong> 30% lower prices, vibrant green scenery</li>
                        <li><strong>Considerations:</strong> Slippery trails, waterproof gear essential</li>
                    </ul>
                    
                    <h3>Monthly Activity Guide</h3>
                    <ul>
                        <li><strong>January:</strong> Excellent for all activities</li>
                        <li><strong>April:</strong> Bird watching peak, lower crowds</li>
                        <li><strong>July:</strong> Kwita Izina gorilla naming ceremony</li>
                        <li><strong>October:</strong> Cultural festivals, photography</li>
                    </ul>
                    
                    <h3>Altitude Considerations</h3>
                    <p>Volcanoes National Park (2,500-4,500m) requires acclimatization. Lake Kivu (1,460m) offers pleasant temperatures year-round.</p>
                </div>
            `,
            featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349802/Lake-Kivus-tranquil-waters-Rwanda_ypcodn.jpg',
            category: 'Travel Tips',
            featured: false,
            readTime: 8,
            publishedDate: new Date('2026-01-05'),
            tags: ['Seasons', 'Climate', 'Weather', 'Best Time', 'Planning', 'Activities'],
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Rwanda\'s Conservation Success Story: From Tragedy to Triumph',
            slug: 'blog-rwanda-conservation-success',
            author: 'Patience Rutayisire',
            authorRole: 'Conservation Director',
            authorImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png', // Added author image
            excerpt: 'How Rwanda transformed from environmental degradation to a global conservation leader with innovative policies and community involvement.',
            content: `
                <div class="blog-article">
                    <h2>Rwanda's Conservation Transformation</h2>
                    <p>From devastating deforestation to becoming Africa's cleanest nation, Rwanda's conservation journey serves as a global model.</p>
                    
                    <h3>Historical Context</h3>
                    <ul>
                        <li><strong>1990s:</strong> 90% forest cover loss due to refugee crisis</li>
                        <li><strong>Gorilla Populations:</strong> Dropped to 250 individuals in 1980s</li>
                        <li><strong>Turning Point:</strong> 2005 conservation policy reforms</li>
                        <li><strong>Current Status:</strong> 30.4% forest cover, gorillas increased to 604</li>
                    </ul>
                    
                    <h3>Key Conservation Programs</h3>
                    <ul>
                        <li><strong>Kwita Izina:</strong> Annual gorilla naming ceremony</li>
                        <li><strong>Umuganda:</strong> Monthly community cleaning day</li>
                        <li><strong>Plastic Ban:</strong> First African nation to ban plastic bags</li>
                        <li><strong>Community Partnerships:</strong> 10% tourism revenue to communities</li>
                    </ul>
                    
                    <h3>Success Metrics</h3>
                    <ul>
                        <li><strong>Wildlife Recovery:</strong> Lions and rhinos reintroduced to Akagera</li>
                        <li><strong>Forest Restoration:</strong> 67,000 hectares reforested since 2010</li>
                        <li><strong>Community Benefits:</strong> $5 million annually to park-adjacent communities</li>
                        <li><strong>International Recognition:</strong> UN Champions of the Earth award</li>
                    </ul>
                    
                    <h3>Future Goals</h3>
                    <p>Targeting 35% forest cover by 2030 and expanding protected areas by 15%.</p>
                </div>
            `,
            featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768350018/Wildlife-Conservation-in-Rwanda-Success-Stories_a8snue.gif',
            category: 'Conservation',
            featured: true,
            readTime: 14,
            publishedDate: new Date('2026-01-15'),
            tags: ['Conservation', 'Wildlife', 'Sustainability', 'Community', 'Environment', 'Success'],
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            title: 'Rwandan Cuisine Guide: Traditional Foods & Dining Experiences',
            slug: 'blog-rwandan-cuisine-guide',
            author: 'Culinary Tourism Team',
            authorRole: 'Food & Culture Experts',
            authorImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/Kigali-Citys-1_agovb2.jpg', // Added author image
            excerpt: 'Explore Rwanda\'s culinary heritage from traditional dishes to modern fusion with dining recommendations and food tour insights.',
            content: `
                <div class="blog-article">
                    <h2>Rwandan Culinary Journey</h2>
                    <p>Rwanda's cuisine reflects its agricultural heritage with fresh, locally sourced ingredients and traditional cooking methods.</p>
                    
                    <h3>Staple Foods</h3>
                    <ul>
                        <li><strong>Ugali:</strong> Maize porridge served with stews</li>
                        <li><strong>Isombe:</strong> Cassava leaves with peanut sauce</li>
                        <li><strong>Ibihaza:</strong> Pumpkins cooked with beans</li>
                        <li><strong>Brochettes:</strong> Skewered meat, Rwanda's street food</li>
                    </ul>
                    
                    <h3>Traditional Beverages</h3>
                    <ul>
                        <li><strong>Ikigage:</strong> Traditional sorghum beer</li>
                        <li><strong>Urwagwa:</strong> Banana beer for ceremonies</li>
                        <li><strong>Rwandan Coffee:</strong> Award-winning Bourbon beans</li>
                        <li><strong>African Tea:</strong> Milk tea with ginger</li>
                    </ul>
                    
                    <h3>Modern Dining Scene</h3>
                    <ul>
                        <li><strong>Fine Dining:</strong> Republica, Heaven Restaurant</li>
                        <li><strong>Traditional:</strong> Khana Khazana, Lalibela</li>
                        <li><strong>Local Experience:</strong> Nyamirambo food tour</li>
                        <li><strong>Vegetarian Options:</strong> Poivre Noir, Sundowner</li>
                    </ul>
                    
                    <h3>Cooking Classes</h3>
                    <p>Learn traditional cooking techniques from local chefs at various cultural centers and hotels.</p>
                </div>
            `,
            featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768350163/Discovering-the-Culinary-Delights-of-Rwanda-Paanvuu-Safaris.jpeg_dsiy7e.webp',
            category: 'Food & Culture',
            featured: false,
            readTime: 9,
            publishedDate: new Date('2026-01-12'),
            tags: ['Food', 'Cuisine', 'Dining', 'Traditional', 'Cooking', 'Beverages'],
            available: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ],
    
    adminUser: {
        username: 'admin',
        email: 'admin@gotrip.africa',
        password: 'Admin123!',
        name: 'System Administrator',
        role: 'admin',
        verified: true,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date()
    }
};
const seedDatabase = async () => {
    try {
        console.log('🌱 Starting GoTrip Database Seeding...');
        console.log('=======================================');
        
        // Connect to MongoDB
        const mongoURI = process.env.MONGODB_URI || process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error('❌ MONGODB_URI not found in environment variables');
        }
        
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(mongoURI);
        console.log('✅ Connected to MongoDB');
        
        // Check if we should clear existing data
        const shouldClearData = process.argv.includes('--fresh');
        if (shouldClearData) {
            console.log('🗑️ Clearing existing data...');
            await Promise.all([
                Destination.deleteMany({}),
                Accommodation.deleteMany({}),
                Guide.deleteMany({}),
                Translator.deleteMany({}),
                Blog.deleteMany({}),
                User.deleteMany({})
            ]);
            console.log('✅ Existing data cleared');
        }
        
        // Seed Destinations (6 items)
        console.log(`\n📌 Seeding ${seedData.destinations.length} Destinations...`);
        const destinations = await Destination.insertMany(seedData.destinations);
        console.log(`✅ Seeded ${destinations.length} destinations`);
        
        // Seed Accommodations (6 items)
        console.log(`\n🏨 Seeding ${seedData.accommodations.length} Accommodations...`);
        const accommodations = await Accommodation.insertMany(seedData.accommodations);
        console.log(`✅ Seeded ${accommodations.length} accommodations`);
        
        // Seed Guides (2 items)
        console.log(`\n👨‍🦰 Seeding ${seedData.guides.length} Guides...`);
        const guides = await Guide.insertMany(seedData.guides);
        console.log(`✅ Seeded ${guides.length} guides`);
        
        // Seed Translators (2 items)
        console.log(`\n🗣️ Seeding ${seedData.translators.length} Translators...`);
        const translators = await Translator.insertMany(seedData.translators);
        console.log(`✅ Seeded ${translators.length} translators`);
        
        // Seed Blog Posts (6 items)
        console.log(`\n📝 Seeding ${seedData.blogPosts.length} Blog Posts...`);
        const blogs = await Blog.insertMany(seedData.blogPosts);
        console.log(`✅ Seeded ${blogs.length} blog posts`);
        
        // Create Admin User
        console.log(`\n👤 Creating Admin User...`);
        const existingAdmin = await User.findOne({ username: 'admin' });
        if (!existingAdmin) {
            const adminUser = new User(seedData.adminUser);
            await adminUser.save();
            console.log(`✅ Admin user created`);
            console.log(`   👤 Username: ${seedData.adminUser.username}`);
            console.log(`   📧 Email: ${seedData.adminUser.email}`);
            console.log(`   🔑 Password: ${seedData.adminUser.password}`);
        } else {
            console.log('ℹ️ Admin user already exists');
        }
        
        // Get final counts
        console.log('\n📊 Database Statistics:');
        console.log('======================');
        const counts = await Promise.all([
            Destination.countDocuments(),
            Accommodation.countDocuments(),
            Guide.countDocuments(),
            Translator.countDocuments(),
            Blog.countDocuments(),
            User.countDocuments()
        ]);
        
        console.log(`📌 Destinations: ${counts[0]}`);
        console.log(`🏨 Accommodations: ${counts[1]}`);
        console.log(`👨‍🦰 Guides: ${counts[2]}`);
        console.log(`🗣️ Translators: ${counts[3]}`);
        console.log(`📝 Blog Posts: ${counts[4]}`);
        console.log(`👤 Users: ${counts[5]}`);
        
        console.log('\n🎉 Database seeding completed successfully!');
        console.log('\n🔗 API Endpoints:');
        console.log('=================');
        console.log('   📍 Destinations: http://localhost:5000/api/destinations');
        console.log('   🏨 Accommodations: http://localhost:5000/api/accommodations');
        console.log('   👨‍🦰 Guides: http://localhost:5000/api/guides');
        console.log('   🗣️ Translators: http://localhost:5000/api/translators');
        console.log('   📝 Blogs: http://localhost:5000/api/blogs');
        console.log('   🔍 Search: http://localhost:5000/api/search?q=gorilla');
        
        // Close connection
        await mongoose.connection.close();
        console.log('\n🔒 Database connection closed');
        
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        console.error('Error details:', error);
        if (error.errors) {
            console.error('Validation errors:', error.errors);
        }
        process.exit(1);
    }
};

// Run if called directly
if (process.argv.includes('--seed')) {
    seedDatabase();
}

export default seedDatabase;