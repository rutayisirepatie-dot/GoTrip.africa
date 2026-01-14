// Go Trip Frontend Application v5.3 
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        debug: false,
        
        // Welcome messages for popup notifications
        welcomeMessages: [
            { 
                id: 1,
                title: "Welcome to GoTrip!", 
                message: "Experience authentic Rwandan culture, beauty and hospitality",
                icon: "fa-globe-africa",
                type: "welcome"
            },
            { 
                id: 2,
                title: "Adventure Awaits!", 
                message: "Enjoy adventurous journeys with us across Rwanda's beautiful landscapes",
                icon: "fa-mountain",
                type: "info"
            },
            { 
                id: 3,
                title: "Expert Guidance", 
                message: "Meet award-winning tour guides and translators for your perfect trip",
                icon: "fa-award",
                type: "info"
            },
            { 
                id: 4,
                title: "Start Planning", 
                message: "Let us help you create your dream Rwanda adventure",
                icon: "fa-map-marked-alt",
                type: "success",
                action: "Plan Your Trip"
            }
        ],
        
        bookingEmail: 'info@gotrip.africa',
        companyPhone: '+250787407051',
        companyAddress: 'Kigali, Rwanda',
        
        // Image fallback configuration
        fallbackImages: {
            destination: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/destination-fallback_uo8qya.jpg',
            guide: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/guide-fallback_pfdjqp.jpg',
            translator: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/translator-fallback_h4hvpj.jpg',
            accommodation: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/accommodation-fallback_qijjhm.jpg',
            blog: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-fallback_tkz4cm.jpg',
            hero: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/hero-rwanda-gorilla_kmw5pv.jpg'
        }
    };

    // ===============================
    // ENHANCED SEED DATA WITH RICH CONTENT
    // ===============================
    const seedData = {
        destinations: [
            {
                _id: 'rw-volcanoes-park',
                name: 'Volcanoes National Park',
                location: 'Musanze District, Northern Province',
                description: 'Home to the endangered mountain gorillas in Rwanda\'s northern province. Experience once-in-a-lifetime gorilla trekking through lush bamboo forests with breathtaking views of five volcanoes. This UNESCO World Heritage site is Africa\'s oldest national park and offers one of the most profound wildlife experiences on Earth.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/Rwanda-volcano_isb1qf.jpg',
                rating: 4.9,
                basePrice: 1500,
                duration: '1-3 Days',
                difficulty: 'Moderate to Challenging',
                bestSeason: 'June-September, December-February',
                highlights: [
                    'Track endangered mountain gorillas',
                    'Visit the Karisoke Research Center',
                    'Hike to Dian Fossey\'s grave',
                    'Golden monkey tracking',
                    'Volcano hikes (Mount Bisoke, Karisimbi)'
                ],
                activities: [
                    { name: 'Mountain Gorilla Trekking', icon: 'fas fa-mountain', description: 'Track and observe endangered mountain gorillas in their natural habitat' },
                    { name: 'Golden Monkey Tracking', icon: 'fas fa-paw', description: 'Observe the playful golden monkeys unique to the Virunga region' },
                    { name: 'Volcano Hiking', icon: 'fas fa-hiking', description: 'Summit the Virunga volcanoes with breathtaking crater lakes' },
                    { name: 'Cultural Village Visits', icon: 'fas fa-home', description: 'Experience local Iby\'iwacu Cultural Village traditions' }
                ],
                features: [
                    { name: 'Mountain Gorillas', description: 'Home to 10 habituated gorilla families with 98% viewing success rate' },
                    { name: 'Volcano Views', description: 'Stunning views of 5 Virunga volcanoes including Mount Karisimbi' },
                    { name: 'Biodiversity', description: 'Over 200 bird species and rare flora including giant lobelias' },
                    { name: 'Conservation Legacy', description: 'Site of Dian Fossey\'s groundbreaking gorilla research' }
                ],
                tags: ['Wildlife', 'Adventure', 'Gorillas', 'Hiking', 'UNESCO', 'Photography']
            },
            {
                _id: 'rw-nyungwe-forest',
                name: 'Nyungwe National Park',
                location: 'Southwestern Rwanda',
                description: 'One of Africa\'s oldest rainforests featuring spectacular canopy walkways, chimpanzee tracking, and over 1,000 plant species. This biodiversity hotspot spans 1,019 km² and hosts 13 primate species including chimpanzees and colobus monkeys. Experience the breathtaking 70-meter canopy walkway suspended above the forest floor.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662726/nyungwe-forests_c9red1.jpg',
                rating: 4.7,
                basePrice: 200,
                duration: '2-4 Days',
                difficulty: 'Moderate',
                bestSeason: 'December-February, June-August',
                highlights: [
                    '70m high canopy walkway experience',
                    'Chimpanzee habituation tracking',
                    'Colobus monkey trekking',
                    'Waterfall hikes and bird watching',
                    'Tea plantation cultural tours'
                ],
                activities: [
                    { name: 'Canopy Walk Adventure', icon: 'fas fa-walking', description: 'Walk 70m above the forest floor on Africa\'s longest canopy walkway' },
                    { name: 'Chimpanzee Tracking', icon: 'fas fa-tree', description: 'Track chimpanzee families through dense ancient rainforest' },
                    { name: 'Colobus Monkey Trekking', icon: 'fas fa-users', description: 'See large troops of black-and-white colobus monkeys' },
                    { name: 'Bird Watching', icon: 'fas fa-dove', description: 'Spot over 300 bird species including 29 endemics' }
                ],
                features: [
                    { name: 'Ancient Rainforest', description: 'Over 1,000 years old with pristine montane ecosystems' },
                    { name: 'Primate Capital', description: '13 primate species including chimpanzees and Angolan colobus' },
                    { name: 'Bird Paradise', description: 'Over 300 bird species including 29 Albertine Rift endemics' },
                    { name: 'Tea Plantations', description: 'Visit Rwanda\'s famous Gisakura and Kitabi tea estates' }
                ],
                tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy', 'Eco-Tourism']
            },
            {
                _id: 'rw-akagera-park',
                name: 'Akagera National Park',
                location: 'Eastern Rwanda',
                description: 'Rwanda\'s only savannah park featuring the Big 5 (lion, leopard, elephant, buffalo, rhino). Beautiful landscapes of rolling hills, wetlands, and lakes covering 1,122 km². A remarkable conservation success story where wildlife populations have rebounded dramatically since 2010.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/akagera-national-park-rwanda-zebra_oysla0.webp',
                rating: 4.6,
                basePrice: 650,
                duration: '2-3 Days',
                difficulty: 'Easy',
                bestSeason: 'June-September, December-February',
                highlights: [
                    'Big 5 wildlife safari experience',
                    'Boat safaris on Lake Ihema',
                    'Night drives for nocturnal wildlife',
                    'Rhino tracking experience',
                    'Bird watching with 490+ species'
                ],
                activities: [
                    { name: 'Big 5 Safari', icon: 'fas fa-lion', description: 'Game drives to see lions, elephants, rhinos, leopards, and buffalo' },
                    { name: 'Boat Safari', icon: 'fas fa-ship', description: 'Explore Lake Ihema and see hippos, crocodiles, and water birds' },
                    { name: 'Night Game Drive', icon: 'fas fa-moon', description: 'Spot nocturnal wildlife including leopards and hyenas' },
                    { name: 'Bird Watching', icon: 'fas fa-binoculars', description: 'Over 490 bird species including the rare shoebill stork' }
                ],
                features: [
                    { name: 'Big 5 Destination', description: 'Complete African Big 5 experience in Rwanda' },
                    { name: 'Lake System', description: 'Largest protected wetland in Central Africa' },
                    { name: 'Conservation Success', description: 'Remarkable wildlife restoration and community partnership' },
                    { name: 'Photographic Hides', description: 'Professional hides for wildlife photography' }
                ],
                tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography', 'Conservation']
            },
            {
                _id: 'rw-lake-kivu',
                name: 'Lake Kivu',
                location: 'Western Rwanda',
                description: 'Africa\'s sixth-largest lake and one of Africa\'s safest freshwater lakes. Stunning 89km coastline with beautiful beaches, island resorts, and water activities. Experience relaxation, water sports, and cultural interactions in Rwanda\'s lake district.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/lake-kivu-rwanda_vc4igd.jpg',
                rating: 4.8,
                basePrice: 450,
                duration: '2-4 Days',
                difficulty: 'Easy',
                bestSeason: 'Year-round',
                highlights: [
                    'Island hopping to Napoleon and Monkey Islands',
                    'Kayaking along scenic coastline',
                    'Coffee plantation tours and tastings',
                    'Swimming in bilharzia-free waters',
                    'Beautiful sunset boat cruises'
                ],
                activities: [
                    { name: 'Island Hopping', icon: 'fas fa-ship', description: 'Visit Napoleon Island (bat colony) and Monkey Island' },
                    { name: 'Kayaking Adventure', icon: 'fas fa-water', description: 'Paddle along the beautiful coastline and hidden coves' },
                    { name: 'Coffee Tours', icon: 'fas fa-coffee', description: 'Visit coffee cooperatives and learn processing' },
                    { name: 'Boat Cruises', icon: 'fas fa-sailboat', description: 'Sunset cruises and fishing experiences' }
                ],
                features: [
                    { name: 'Safe Swimming', description: 'Bilharzia-free and safe for swimming year-round' },
                    { name: 'Island Paradise', description: 'Numerous islands including bat and monkey sanctuaries' },
                    { name: 'Methane Gas', description: 'Unique methane extraction for clean energy production' },
                    { name: 'Beach Resorts', description: 'Luxury resorts and boutique hotels along the shore' }
                ],
                tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports', 'Culture']
            },
            {
                _id: 'rw-kigali-city',
                name: 'Kigali City',
                location: 'Kigali, Rwanda',
                description: 'Kigali, Rwanda’s capital, is a clean, safe, and fast-growing city surrounded by scenic hills. It offers a unique mix of culture, history, modern life, and friendly local experiences, making it an ideal starting point for exploring Rwanda.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/Kigali-Citys-1_agovb2.jpg',
                rating: 4.9,
                basePrice: 0,
                duration: 'Half Day',
                difficulty: 'Easy',
                bestSeason: 'Year-round',
                highlights: [
                    'Clean, safe, and well-organized capital city',
                    'Modern neighborhoods blended with green hills',
                    'Vibrant local markets and cultural centers',
                    'Growing arts, café, and nightlife scene',
                    'Gateway to exploring all regions of Rwanda'
                ],
                activities: [
                    { name: 'City Tour', icon: 'fas fa-city', description: 'Guided exploration of Kigali’s main landmarks and neighborhoods' },
                    { name: 'Cultural Experience', icon: 'fas fa-music', description: 'Discover local traditions, art, and cultural centers' },
                    { name: 'Market Visit', icon: 'fas fa-shopping-basket', description: 'Experience daily life at Kigali’s vibrant local markets' },
                    { name: 'Food & Café Tour', icon: 'fas fa-coffee', description: 'Enjoy local cuisine and Kigali’s modern café scene' }
                ],
                features: [
                    { name: 'Clean & Safe City', description: 'Known as one of Africa’s cleanest and safest capitals' },
                    { name: 'Modern Development', description: 'Well-planned infrastructure and growing urban lifestyle' },
                    { name: 'Cultural Hub', description: 'Home to museums, art galleries, and creative spaces' },
                    { name: 'Scenic Hills', description: 'Beautiful hilltop views and green surroundings' }
                ],
                tags: ['City', 'Culture', 'Urban Life', 'Food', 'Art', 'Modern Rwanda']
            },
            {
                _id: 'rw-kings-palace-museum',
                name: 'King\'s Palace Museum',
                location: 'Nyanza, Southern Rwanda',
                description: 'Experience traditional Rwandan royal life at this reconstructed royal palace, complete with traditional thatched dwellings, sacred cows, and cultural performances. Learn about Rwanda\'s monarchy history and traditional governance systems.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768348646/befbedba-6cb3-4da4-8e1e-d86db71af565.png',
                rating: 4.5,
                basePrice: 35,
                duration: 'Half Day',
                difficulty: 'Easy',
                bestSeason: 'Year-round',
                highlights: [
                    'Traditional royal palace reconstruction',
                    'Inyambo sacred long-horned cows',
                    'Cultural dance performances',
                    'Traditional architecture exhibits',
                    'Royal history and artifacts'
                ],
                activities: [
                    { name: 'Palace Tour', icon: 'fas fa-landmark', description: 'Explore traditional royal dwellings and compounds' },
                    { name: 'Cow Ceremony', icon: 'fas fa-cow', description: 'See the famous Inyambo long-horned cows' },
                    { name: 'Cultural Dance', icon: 'fas fa-music', description: 'Watch traditional Intore dance performances' },
                    { name: 'Craft Demonstrations', icon: 'fas fa-hammer', description: 'Traditional crafts and building techniques' }
                ],
                features: [
                    { name: 'Cultural Heritage', description: 'Preservation of Rwanda\'s royal traditions' },
                    { name: 'Traditional Architecture', description: 'Authentic thatched palace reconstruction' },
                    { name: 'Sacred Cattle', description: 'Inyambo cows bred for royal ceremonies' },
                    { name: 'Living Museum', description: 'Interactive cultural experiences and demonstrations' }
                ],
                tags: ['Culture', 'History', 'Royalty', 'Traditional', 'Museum', 'Performance']
            }
        ],
        
        accommodations: [
            {
                _id: 'acc-one-only-gorillas-nest',
                name: 'One&Only Gorilla\'s Nest',
                location: 'Volcanoes National Park, Musanze',
                type: 'Luxury Lodge',
                description: 'An exclusive luxury lodge nestled in the foothills of the Virunga volcanoes, offering unparalleled gorilla trekking access. Experience world-class amenities, organic cuisine, and breathtaking volcano views from your private suite.',
                pricePerNight: 3500,
                rating: 4.9,
                amenities: [
                    { name: 'Infinity Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Spa & Wellness Center', included: true, icon: 'fas fa-spa' },
                    { name: 'Fine Dining Restaurant', included: true, icon: 'fas fa-utensils' },
                    { name: 'Private Fireplace', included: true, icon: 'fas fa-fire' },
                    { name: 'Butler Service', included: true, icon: 'fas fa-concierge-bell' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654351/one-and-only-kinigi_sgleyo.jpg',
                available: true,
                contactPhone: '+250788123456',
                contactEmail: 'reservations@oneandonlygorillasnest.com',
                maxGuests: 2,
                roomTypes: [
                    { name: 'Forest View Suite', price: 2800, capacity: 2, features: ['Private balcony', 'Fireplace', 'Rainfall shower'] },
                    { name: 'Volcano View Suite', price: 3500, capacity: 2, features: ['Panoramic views', 'Private hot tub', 'Butler service'] },
                    { name: 'Presidential Villa', price: 5000, capacity: 4, features: ['Private pool', 'Two bedrooms', 'Dedicated guide'] }
                ],
                features: [
                    'Private gorilla trekking preparation',
                    'Conservation fund contribution',
                    'Organic farm-to-table dining',
                    'Guided nature walks',
                    'Cultural village visits'
                ]
            },
            {
                _id: 'acc-kigali-marriott',
                name: 'Kigali Marriott Hotel',
                location: 'Kigali City Center',
                type: '5-Star Hotel',
                description: 'Luxury hotel in the heart of Kigali with panoramic city views, world-class amenities, and exceptional service. Perfect for business and leisure travelers with easy access to city attractions and international airport.',
                pricePerNight: 450,
                rating: 4.8,
                amenities: [
                    { name: 'Rooftop Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Multiple Restaurants', included: true, icon: 'fas fa-utensils' },
                    { name: 'Business Center', included: true, icon: 'fas fa-briefcase' },
                    { name: 'Fitness Center', included: true, icon: 'fas fa-dumbbell' },
                    { name: 'Concierge Service', included: true, icon: 'fas fa-concierge-bell' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664108/Marriott-Hotel-Kigali-Rwanda-Safaris_8__Tett-Safaris_v78edy.webp',
                available: true,
                contactPhone: '+250788111222',
                contactEmail: 'reservations@marriottkigali.com',
                maxGuests: 4,
                roomTypes: [
                    { name: 'Deluxe Room', price: 350, capacity: 2, features: ['City views', 'Work desk', 'Marriott bedding'] },
                    { name: 'Executive Suite', price: 600, capacity: 3, features: ['Lounge access', 'Separate living area', 'Premium amenities'] },
                    { name: 'Presidential Suite', price: 1200, capacity: 4, features: ['Private dining', 'Butler service', 'Panoramic views'] }
                ],
                features: [
                    'City center location',
                    'Panoramic Kigali views',
                    'Meeting and event facilities',
                    '24-hour room service',
                    'Valet parking'
                ]
            },
            {
                _id: 'acc-nyungwe-house',
                name: 'Nyungwe House',
                location: 'Nyungwe National Park',
                type: 'Boutique Lodge',
                description: 'Luxurious eco-lodge perched on the edge of Nyungwe Forest, offering stunning canopy views and exclusive chimpanzee trekking access. Modern comforts blend with natural surroundings for an unforgettable rainforest experience.',
                pricePerNight: 850,
                rating: 4.7,
                amenities: [
                    { name: 'Infinity Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Spa Services', included: true, icon: 'fas fa-spa' },
                    { name: 'Forest View Restaurant', included: true, icon: 'fas fa-utensils' },
                    { name: 'Guided Walks', included: true, icon: 'fas fa-hiking' },
                    { name: 'Free WiFi', included: true, icon: 'fas fa-wifi' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654350/one-only-nyungwe-house_oezq87.jpg',
                available: true,
                contactPhone: '+250788333444',
                contactEmail: 'stay@nyungwehouse.com',
                maxGuests: 3,
                roomTypes: [
                    { name: 'Forest View Room', price: 750, capacity: 2, features: ['Private balcony', 'Canopy views', 'King bed'] },
                    { name: 'Canopy Suite', price: 950, capacity: 2, features: ['Extended balcony', 'Sitting area', 'Premium amenities'] },
                    { name: 'Family Suite', price: 1200, capacity: 4, features: ['Two bedrooms', 'Private deck', 'Forest views'] }
                ],
                features: [
                    'Direct forest access',
                    'Chimpanzee trekking packages',
                    'Canopy walkway proximity',
                    'Tea plantation tours',
                    'Bird watching guides'
                ]
            },
            {
                _id: 'acc-lake-kivu-serena',
                name: 'Lake Kivu Serena Hotel',
                location: 'Gisenyi, Lake Kivu',
                type: 'Resort Hotel',
                description: 'Lakeside resort offering water activities, beach access, and stunning sunset views over Lake Kivu. Perfect for relaxation after gorilla trekking or as a standalone lakeside getaway.',
                pricePerNight: 380,
                rating: 4.6,
                amenities: [
                    { name: 'Private Beach', included: true, icon: 'fas fa-umbrella-beach' },
                    { name: 'Water Sports', included: true, icon: 'fas fa-sailboat' },
                    { name: 'Multiple Dining Options', included: true, icon: 'fas fa-utensils' },
                    { name: 'Swimming Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Kids Club', included: true, icon: 'fas fa-child' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654353/aeriel-view-serena_cuohuj.jpg',
                available: true,
                contactPhone: '+250788555666',
                contactEmail: 'reservations@serenakivu.com',
                maxGuests: 4,
                roomTypes: [
                    { name: 'Garden View Room', price: 320, capacity: 2, features: ['Garden access', 'Private balcony', 'Lake breezes'] },
                    { name: 'Lake View Room', price: 400, capacity: 2, features: ['Direct lake views', 'Sunset viewing', 'Premium amenities'] },
                    { name: 'Family Room', price: 550, capacity: 4, features: ['Interconnecting rooms', 'Private terrace', 'Beach access'] }
                ],
                features: [
                    'Direct lake access',
                    'Water sports equipment',
                    'Island excursion packages',
                    'Spa and wellness center',
                    'Sunset cruise departures'
                ]
            },
            {
                _id: 'acc-akagera-game-lodge',
                name: 'Akagera Game Lodge',
                location: 'Akagera National Park',
                type: 'Safari Lodge',
                description: 'The only lodge inside Akagera National Park, offering authentic safari experience with wildlife viewing from your balcony. Perfect base for game drives and lake excursions.',
                pricePerNight: 320,
                rating: 4.5,
                amenities: [
                    { name: 'Waterhole Viewing', included: true, icon: 'fas fa-binoculars' },
                    { name: 'Swimming Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Safari Restaurant', included: true, icon: 'fas fa-utensils' },
                    { name: 'Game Drive Vehicles', included: true, icon: 'fas fa-car' },
                    { name: 'Bush Breakfasts', included: true, icon: 'fas fa-mug-hot' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349192/Akagera-Game-Lodge-Terrasse-upstairs-113-min_rofnsc.jpg',
                available: true,
                contactPhone: '+250788777888',
                contactEmail: 'bookings@akageralodge.com',
                maxGuests: 3,
                roomTypes: [
                    { name: 'Standard Room', price: 280, capacity: 2, features: ['Park views', 'Private bathroom', 'Basic amenities'] },
                    { name: 'Superior Room', price: 350, capacity: 2, features: ['Waterhole views', 'Private balcony', 'Upgraded amenities'] },
                    { name: 'Family Room', price: 450, capacity: 4, features: ['Two bedrooms', 'Shared lounge', 'Park access'] }
                ],
                features: [
                    'Inside national park',
                    'Wildlife viewing deck',
                    'Professional safari guides',
                    'Boat trip arrangements',
                    'Conservation experiences'
                ]
            },
            {
                _id: 'acc-ubumwe-hotel',
                name: 'Ubumwe Grande Hotel',
                location: 'Kigali Heights',
                type: 'Business Hotel',
                description: 'Modern business hotel in Kigali\'s commercial district, offering excellent conference facilities and city access. Perfect for corporate travelers and business meetings.',
                pricePerNight: 280,
                rating: 4.4,
                amenities: [
                    { name: 'Conference Facilities', included: true, icon: 'fas fa-chalkboard' },
                    { name: 'Business Center', included: true, icon: 'fas fa-briefcase' },
                    { name: 'Restaurant & Bar', included: true, icon: 'fas fa-utensils' },
                    { name: 'Gym Access', included: true, icon: 'fas fa-dumbbell' },
                    { name: 'Airport Transfers', included: true, icon: 'fas fa-shuttle-van' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349335/facade_fc6shj.jpg',
                available: true,
                contactPhone: '+250788999000',
                contactEmail: 'reservations@ubumwegrande.com',
                maxGuests: 2,
                roomTypes: [
                    { name: 'Standard Room', price: 240, capacity: 2, features: ['City views', 'Work desk', 'WiFi'] },
                    { name: 'Executive Room', price: 320, capacity: 2, features: ['Larger workspace', 'Executive lounge', 'Premium amenities'] },
                    { name: 'Suite', price: 450, capacity: 3, features: ['Separate living area', 'Meeting space', 'Butler service'] }
                ],
                features: [
                    'Business district location',
                    'Conference and meeting rooms',
                    'Executive lounge access',
                    'Complimentary transfers',
                    'Corporate rates available'
                ]
            }
        ],
        
        blogPosts: [
            {
                _id: 'blog-gorilla-trekking-guide',
                title: 'Ultimate Guide to Gorilla Trekking in Rwanda: Everything You Need to Know',
                author: 'GoTrip Team',
                excerpt: 'Complete guide to planning your gorilla trekking adventure in Rwanda. Learn about permits, preparation, what to expect, and conservation impact. Expert tips from our lead wildlife guide.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768334331/the-life-of-mountain-gorillas-_odzqfl.jpg',
                category: 'Wildlife & Adventure',
                featured: true,
                readTime: 15,
                publishedDate: '2026-01-14',
                tags: ['Gorilla Trekking', 'Wildlife', 'Adventure', 'Conservation', 'Volcanoes National Park', 'Photography']
            },
            {
                _id: 'blog-rwanda-itinerary-7days',
                title: '7-Day Ultimate Rwanda Itinerary: Gorillas, Culture & Nature',
                author: 'Marie Claire Uwimana',
                excerpt: 'Comprehensive 7-day itinerary covering Rwanda\'s best attractions including gorilla trekking, cultural experiences, and lake relaxation. Perfect for first-time visitors.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768334536/Gorillas_on_the_lake_nzc5uc.jpg',
                category: 'Travel Planning',
                featured: true,
                readTime: 12,
                publishedDate: '2026-01-14',
                tags: ['Itinerary', 'Travel Planning', 'Rwanda', 'Gorillas', 'Lake Kivu', 'Cultural Tourism']
            },
            {
                _id: 'blog-cultural-experiences-rwanda',
                title: 'Cultural Experiences in Rwanda: Beyond Gorilla Trekking',
                author: 'Go Trip Cultural Team',
                excerpt: 'Immerse yourself in Rwandan culture through traditional dances, food, village visits, and royal heritage sites. Discover the rich cultural tapestry of Rwanda.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664104/intore-dancers_rb6vwe.jpg',
                category: 'Culture',
                featured: true,
                readTime: 10,
                publishedDate: '2026-01-13',
                tags: ['Culture', 'Tradition', 'Rwanda', 'Community', 'Heritage', 'Royalty']
            },
            {
                _id: 'blog-best-time-visit-rwanda',
                title: 'Best Time to Visit Rwanda: Seasonal Guide & Climate Tips',
                author: 'Weather & Travel Experts',
                excerpt: 'Comprehensive guide to Rwanda\'s climate, seasons, and optimal visiting times for different activities. Make the most of your Rwanda adventure with perfect timing.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349802/Lake-Kivus-tranquil-waters-Rwanda_ypcodn.jpg',
                category: 'Travel Tips',
                featured: false,
                readTime: 8,
                publishedDate: '2026-01-05',
                tags: ['Seasons', 'Climate', 'Travel Tips', 'Planning', 'Weather', 'Best Time']
            },
            {
                _id: 'blog-rwanda-conservation-success',
                title: 'Rwanda\'s Conservation Success Story: From Tragedy to Triumph',
                author: 'Patience Rutayisire',
                excerpt: 'How Rwanda transformed from environmental degradation to a global conservation leader. Learn about community-based conservation and wildlife restoration.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768350018/Wildlife-Conservation-in-Rwanda-Success-Stories_a8snue.gif',
                category: 'Conservation',
                featured: true,
                readTime: 14,
                publishedDate: '2026-01-15',
                tags: ['Conservation', 'Wildlife', 'Sustainability', 'Community', 'Environment', 'Success Story']
            },
            {
                _id: 'blog-rwandan-cuisine-guide',
                title: 'Rwandan Cuisine Guide: Traditional Foods & Dining Experiences',
                author: 'Culinary Tourism Team',
                excerpt: 'Explore Rwanda\'s culinary heritage from traditional dishes to modern fusion. Food tours, cooking classes, and must-try Rwandan delicacies.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768350163/Discovering-the-Culinary-Delights-of-Rwanda-Paanvuu-Safaris.jpeg_dsiy7e.webp',
                category: 'Food & Culture',
                featured: false,
                readTime: 9,
                publishedDate: '2026-01-12',
                tags: ['Food', 'Cuisine', 'Culture', 'Dining', 'Traditional', 'Cooking']
            }
        ],
        
        // ENHANCED GUIDES WITH DETAILED BIO
        guides: [
            {
                _id: 'guide-patience-rutayisire',
                name: 'Patience Rutayisire',
                specialty: 'Senior Wildlife & Gorilla Specialist',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'German', level: 'Fluent', flag: '🇩🇪' },
                    { language: 'Spanish', level: 'Advanced', flag: '🇪🇸' },
                    { language: 'French', level: 'Fluent', flag: '🇫🇷' },
                    { language: 'Chinese (Mandarin)', level: 'Intermediate', flag: '🇨🇳' },
                    { language: 'Swahili', level: 'Native', flag: '🇹🇿' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼' }
                ],
                experience: '8+ years',
                rating: 4.9,
                dailyRate: 150,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png',
                certifications: [
                    'Advanced Gorilla Trekking Specialist',
                    'Wilderness First Responder (WFR)',
                    'Bird Watching Expert',
                    'Professional Photography Guide',
                    'Conservation Leadership'
                ],
                bio: `Patience is Rwanda's foremost wildlife guide with over 8 years of specialized experience in gorilla trekking, and conservation. Born and raised in Musanze near Volcanoes National Park, he has an intimate knowledge of the Virunga mountains ecosystem.

EDUCATION & TRAINING:
• Certificate in Wildlife and Hospitality Management, Cornell University
• Advanced Primate Behavior Studies, Dian Fossey Gorilla Fund
• International Guide Training, Kenya Wildlife Service

SPECIAL EXPERTISE:
• Expert mountain gorilla tracking (guided 800+ treks)
• Wildlife photography guidance for professionals
• Conservation education and community engagement
• Customized private tours for discerning travelers

ACHIEVEMENTS:
• 2022: African Tourism Recognition
• 2021: National Geographic "Conservation Hero" Recognition
• 2019: Leading 200+ successful gorilla habituation experiences

Patience speaks 7 languages and has worked with numerous documentary crews, including BBC Natural History and National Geographic. His deep understanding of gorilla behavior and mountain ecology makes every trek an educational and transformative experience.`,
                availability: 'Available',
                toursConducted: '80+',
                favoriteDestination: 'Volcanoes National Park',
                education: 'Wildlife & Hospitality Management, Cornell University',
                awards: [
                    'Tourism Board Guide Year 2023',
                    'African Tourism Best Wildlife Guide 2022',
                    'National Geographic Conservation Hero 2021'                    
                ]
            },
            {
                _id: 'guide-celestin-hagenimana',
                name: 'Celestin Hagenimana',
                specialty: 'Cultural & Historical Expert Guide',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼' },
                    { language: 'Swahili', level: 'Advanced', flag: '🇹🇿' },
                    { language: 'French', level: 'Intermediate', flag: '🇫🇷' }
                ],
                experience: '3+ years',
                rating: 4.8,
                dailyRate: 100,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664106/zhenfei_dvbmas.jpg',
                certifications: [
                    'Cultural Heritage Specialist (Cultural Heritage Academy)',
                    'Historical Tour Guide',
                    'Community Tourism Expert',
                    'Language Interpretation'
                ],
                bio: `Celestin is a passionate cultural guide specializing in Rwandan history, traditions, and community experiences. With deep roots in Rwandan culture, he provides authentic insights into local customs, traditional dances, and historical sites.

EDUCATION & BACKGROUND:
• MA in African History, University of Rwanda
• Cultural Heritage Management
• Mandarin Language Studies, Beijing Language Institute

SPECIALIZED SERVICES:
• Cultural immersion experiences with local communities
• Historical site explanations and contextual storytelling
• Traditional craft workshops and artisan visits
• Community village visits and homestay arrangements
• Genocide memorial education with sensitivity

NOTABLE EXPERIENCES:
• Guided Chinese diplomatic delegations for 2+ years
• Worked with Smithsonian Institution cultural researchers
• Developed community tourism programs in 12 villages
• Trained 50+ local guides in cultural interpretation

Celestin has a Master's degree in African History and is fluent in Mandarin Chinese, making him particularly valuable for Chinese-speaking visitors. He creates personalized cultural journeys that connect visitors with local communities in meaningful, responsible ways.`,
                availability: 'Available',
                toursConducted: '20+',
                favoriteDestination: 'Kigali Genocide Memorial & Cultural Sites',
                education: 'MA African History, University of Rwanda',
                awards: [
                    'Cultural Ambassador Award 2023',
                    'Community Tourism Excellence 2022',
                    'Best Historical Guide 2021',
                    'Tourism Innovation Award 2020'
                ]
            }
        ],
        
        // ENHANCED TRANSLATORS WITH DETAILED BIO
        translators: [
            {
                _id: 'translator-tite-iradukunda',
                name: 'Tite Iradukunda',
                specialty: 'Senior Chinese & Kinyarwanda Translator',
                languages: [
                    { language: 'Chinese (Mandarin)', level: 'Native Fluency', flag: '🇨🇳' },
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'French', level: 'Advanced', flag: '🇫🇷' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼' },
                    { language: 'Swahili', level: 'Intermediate', flag: '🇹🇿' }
                ],
                experience: '5+ years',
                rating: 4.9,
                dailyRate: 120,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767698065/di-li-bo_mfkxlk.jpg',
                certifications: [
                    'Certified Mandarin Translator (HSK Level 5)',                    
                    'Simultaneous Interpreter',
                    'Business Consulting Translation'
                ],
                bio: `Tite is a professional translator specializing in Chinese (Mandarin) and Kinyarwanda with 5+ years of experience in tourism, business, and diplomatic translation. He studied in China and understands both linguistic nuances and cultural contexts deeply.

EDUCATION & QUALIFICATIONS:
• Translation Studies, Beijing Language and Culture University
• Advanced Interpretation Course

TRANSLATION SPECIALTIES:
• Simultaneous interpretation for guided tours and safaris
• Document translation (menus, brochures, legal contracts)
• Business meeting interpretation for trade delegations
• Medical terminology translation for health tourism
• Conference interpretation for international events

NOTABLE PROJECTS:
• Official translator for China-Africa Forum 2023
• Interpreted for Chinese infrastructure investment delegations
• Translated Rwanda tourism materials for Chinese market
• Worked with multiple Chinese documentary film crews

Tite has worked with numerous Chinese tour groups, business delegations, and diplomatic missions visiting Rwanda. He is known for his accuracy, professionalism, and ability to bridge cultural gaps effectively while maintaining confidentiality and precision.`,
                availability: 'Available',
                translationSpecialties: [
                    'Tour guiding interpretation',
                    'Business negotiations',
                    'Medical translation',
                    'Legal documents',
                    'Conference interpretation'
                ],
                education: 'Translation Studies, Beijing Language and Culture University',
                notableClients: [                    
                    'Chinese Embassy in Rwanda',
                    'Multiple Fortune 500 Chinese companies',
                    'International conservation organizations'
                ]
            },
            {
                _id: 'translator-roberto-lateif',
                name: 'Roberto Lateif',
                specialty: 'Multilingual Diplomatic Translator',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'Arabic', level: 'Native', flag: '🇸🇦' },
                    { language: 'Portuguese', level: 'Fluent', flag: '🇵🇹' },
                    { language: 'Swahili', level: 'Advanced', flag: '🇹🇿' },
                    { language: 'French', level: 'Intermediate', flag: '🇫🇷' },
                    { language: 'Spanish', level: 'Intermediate', flag: '🇪🇸' }
                ],
                experience: '8+ years',
                rating: 4.8,
                dailyRate: 180,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767668483/roberto_eyubfo.png',
                certifications: [
                    'Certified Arabic Translator (UN Standards)',
                    'UN Interpreter Certified',
                    'Legal Translation Specialist',
                    'Diplomatic Protocol Training'
                ],
                bio: `Roberto is a highly experienced multilingual translator with over 8 years of professional translation experience across Africa, the Middle East, and Europe. He specializes in Arabic, Portuguese, and English translations for tourism, business, and diplomatic purposes.

PROFESSIONAL BACKGROUND:
• Linguistics Degree, University of Nairobi
• UN Interpretation Training, Geneva
• Diplomatic Protocol Course, Ethiopian Foreign Ministry

SPECIALIZED SERVICES:
• Diplomatic and embassy interpretation
• Legal and contract translation for international agreements
• Tourism and hospitality interpretation for luxury clients
• Conference simultaneous interpretation
• Media and press interpretation

INTERNATIONAL EXPERIENCE:
• UN Conference Interpreter for 5+ years
• Official translator for African Union summits
• Worked with multiple Middle Eastern royal families
• Translated for major hotel chains across Africa

Roberto has worked with international organizations, embassies, and major tourism companies throughout his career. His extensive experience includes interpreting for high-level diplomatic meetings, translating complex legal documents, and providing interpretation services for luxury tourism experiences across the continent.`,
                availability: 'Available on request',
                translationSpecialties: [
                    'Diplomatic interpretation',
                    'Legal document translation',
                    'Conference interpretation',
                    'Tourism material localization',
                    'Media and press interpretation'
                ],
                education: 'BA Linguistics, University of Nairobi',
                notableClients: [
                    'United Nations agencies',
                    'African Union Commission',
                    'Multiple Arab and European embassies',
                    'International luxury hotel chains',
                    'Major tourism development projects'
                ]
            }
        ]
    };

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentWelcomeIndex = 0;
    let preloadedTripPlanModal = null;
    let hasShownWelcome = false;
    let imageCache = new Map();
    let allItemsCache = {
        destinations: [],
        accommodations: [],
        blogPosts: [],
        guides: [],
        translators: []
    };

    // ===============================
    // GLOBAL FUNCTIONS (Exported to window)
    // ===============================
    window.closeModal = function() {
        const modal = document.getElementById('modal-container');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
                document.body.style.overflow = '';
            }, 300);
        }
    };

    window.showTripPlanningModal = function() {
        showTripPlanningModal();
    };

    // ===============================
    // UI UTILITIES
    // ===============================
    
    function showNotification(message, type = 'info', duration = 3000, title = null) {
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type} show`;
        
        const iconMap = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle',
            'welcome': 'fa-star'
        };
        
        const icon = iconMap[type] || 'fa-info-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="notification-body">
                    ${title ? `<div class="notification-title">${title}</div>` : ''}
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" aria-label="Close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        const removeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        };
        
        setTimeout(removeNotification, duration);
        notification.querySelector('.notification-close').addEventListener('click', removeNotification);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[+]?[0-9\s\-\(\)]{10,}$/.test(phone);
    }

    function showLoading(element, show = true) {
        if (!element) return;
        
        if (show) {
            const originalText = element.innerHTML;
            element.dataset.originalContent = originalText;
            element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            element.disabled = true;
        } else {
            if (element.dataset.originalContent) {
                element.innerHTML = element.dataset.originalContent;
            }
            element.disabled = false;
        }
    }

    function showLoadingSpinner(container) {
        const spinnerId = `spinner-${Date.now()}`;
        const spinnerHTML = `
            <div id="${spinnerId}" class="loading-container">
                <div class="spinner"></div>
            </div>
        `;
        
        if (container) {
            container.innerHTML = spinnerHTML;
        }
        
        return spinnerId;
    }

    function hideLoadingSpinner(spinnerId) {
        const spinner = document.getElementById(spinnerId);
        if (spinner) {
            spinner.remove();
        }
    }

    // ===============================
    // IMAGE HANDLING FUNCTIONS
    // ===============================
    function getImageUrl(imagePath, type = 'destination') {
        if (!imagePath || imagePath === '#' || imagePath === '') {
            return config.fallbackImages[type];
        }
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        return imagePath;
    }

    // ===============================
    // ENHANCED BIO MODAL FUNCTIONS
    // ===============================
    
    function showGuideBio(guideId) {
        const guide = seedData.guides.find(g => g._id === guideId) || 
                     allItemsCache.guides.find(g => g._id === guideId || g.id === guideId);
        
        if (!guide) {
            showNotification('Guide details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-user-tie"></i> ${guide.name}</h2>
                    <div class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${guide.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${guide.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${guide.rating || 4.5}</span>
                    </div>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="bio-header">
                        <div class="bio-avatar">
                            <img src="${getImageUrl(guide.image, 'guide')}" 
                                 alt="${guide.name}" 
                                 loading="lazy"
                                 width="150" 
                                 height="150">
                        </div>
                        <div class="bio-summary">
                            <div class="price-tag-large"><i class="fas fa-dollar-sign"></i> $${guide.dailyRate || 100}/day</div>
                            <div class="availability ${guide.availability ? 'available' : 'unavailable'}">
                                <i class="fas fa-circle"></i> ${guide.availability || 'Check Availability'}
                            </div>
                            ${guide.toursConducted ? `
                                <div class="stats">
                                    <i class="fas fa-route"></i> ${guide.toursConducted} Tours Conducted
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-user-circle"></i> Professional Bio</h3>
                            <div class="bio-content">${guide.bio ? guide.bio.replace(/\n/g, '<br>') : 'Professional guide with extensive experience in Rwandan tourism.'}</div>
                        </section>
                        
                        <section class="content-section">
                            <h3><i class="fas fa-language"></i> Languages</h3>
                            <div class="languages-detailed">
                                ${guide.languages.map(lang => {
                                    if (typeof lang === 'string') {
                                        return `<span class="language-tag-detailed">${lang}</span>`;
                                    }
                                    return `
                                        <div class="language-item">
                                            <span class="language-flag">${lang.flag || '🌐'}</span>
                                            <div class="language-info">
                                                <div class="language-name">${lang.language}</div>
                                                <div class="language-level">${lang.level}</div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </section>
                        
                        ${guide.certifications && guide.certifications.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-certificate"></i> Certifications</h3>
                            <div class="certifications-list">
                                ${guide.certifications.map(cert => `
                                    <div class="certification-item">
                                        <i class="fas fa-award"></i>
                                        <span>${cert}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${guide.education ? `
                        <section class="content-section">
                            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                            <div class="education-item">
                                <i class="fas fa-university"></i>
                                <span>${guide.education}</span>
                            </div>
                        </section>
                        ` : ''}
                        
                        ${guide.awards && guide.awards.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-trophy"></i> Awards & Recognition</h3>
                            <div class="awards-list">
                                ${guide.awards.map(award => `
                                    <div class="award-item">
                                        <i class="fas fa-medal"></i>
                                        <span>${award}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="guide" 
                                data-id="${guide._id || guide.id}"
                                data-name="${guide.name}">
                            <i class="fas fa-calendar-check"></i> Hire This Guide
                        </button>
                        <button class="btn btn-secondary plan-full-trip">
                            <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('guide', guide._id || guide.id, guide.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showTranslatorBio(translatorId) {
        const translator = seedData.translators.find(t => t._id === translatorId) || 
                         allItemsCache.translators.find(t => t._id === translatorId || t.id === translatorId);
        
        if (!translator) {
            showNotification('Translator details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-language"></i> ${translator.name}</h2>
                    <div class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${translator.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${translator.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${translator.rating || 4.5}</span>
                    </div>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="bio-header">
                        <div class="bio-avatar">
                            <img src="${getImageUrl(translator.image, 'translator')}" 
                                 alt="${translator.name}" 
                                 loading="lazy"
                                 width="150" 
                                 height="150">
                        </div>
                        <div class="bio-summary">
                            <div class="price-tag-large"><i class="fas fa-dollar-sign"></i> $${translator.dailyRate || 120}/day</div>
                            <div class="availability ${translator.availability ? 'available' : 'unavailable'}">
                                <i class="fas fa-circle"></i> ${translator.availability || 'Check Availability'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-user-circle"></i> Professional Bio</h3>
                            <div class="bio-content">${translator.bio ? translator.bio.replace(/\n/g, '<br>') : 'Professional translator with extensive experience.'}</div>
                        </section>
                        
                        <section class="content-section">
                            <h3><i class="fas fa-language"></i> Languages</h3>
                            <div class="languages-detailed">
                                ${translator.languages.map(lang => {
                                    if (typeof lang === 'string') {
                                        return `<span class="language-tag-detailed">${lang}</span>`;
                                    }
                                    return `
                                        <div class="language-item">
                                            <span class="language-flag">${lang.flag || '🌐'}</span>
                                            <div class="language-info">
                                                <div class="language-name">${lang.language}</div>
                                                <div class="language-level">${lang.level}</div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </section>
                        
                        ${translator.certifications && translator.certifications.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-certificate"></i> Certifications</h3>
                            <div class="certifications-list">
                                ${translator.certifications.map(cert => `
                                    <div class="certification-item">
                                        <i class="fas fa-award"></i>
                                        <span>${cert}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${translator.translationSpecialties && translator.translationSpecialties.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-cogs"></i> Translation Specialties</h3>
                            <div class="specialties-list">
                                ${translator.translationSpecialties.map(specialty => `
                                    <div class="specialty-item">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${specialty}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${translator.education ? `
                        <section class="content-section">
                            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                            <div class="education-item">
                                <i class="fas fa-university"></i>
                                <span>${translator.education}</span>
                            </div>
                        </section>
                        ` : ''}
                        
                        ${translator.notableClients && translator.notableClients.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-briefcase"></i> Notable Clients</h3>
                            <div class="clients-list">
                                ${translator.notableClients.map(client => `
                                    <div class="client-item">
                                        <i class="fas fa-building"></i>
                                        <span>${client}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="translator" 
                                data-id="${translator._id || translator.id}"
                                data-name="${translator.name}">
                            <i class="fas fa-calendar-check"></i> Hire This Translator
                        </button>
                        <button class="btn btn-secondary plan-full-trip">
                            <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('translator', translator._id || translator.id, translator.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    // ===============================
    // DETAILED VIEW MODALS
    // ===============================
    
    function showDestinationDetails(destinationId) {
        const destination = seedData.destinations.find(d => d._id === destinationId) || 
                          allItemsCache.destinations.find(d => d._id === destinationId || d.id === destinationId);
        
        if (!destination) {
            showNotification('Destination details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> ${destination.name}</h2>
                    <p class="modal-subtitle"><i class="fas fa-map-marker-alt"></i> ${destination.location}</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="destination-hero">
                        <img src="${getImageUrl(destination.mainImage, 'destination')}" 
                             alt="${destination.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-info-circle"></i> Overview</h3>
                            <p class="destination-description">${destination.description}</p>
                            
                            <div class="quick-info">
                                <div class="info-item">
                                    <i class="fas fa-star"></i>
                                    <div>
                                        <div class="info-label">Rating</div>
                                        <div class="info-value">${destination.rating}/5.0</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-calendar-alt"></i>
                                    <div>
                                        <div class="info-label">Best Season</div>
                                        <div class="info-value">${destination.bestSeason}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-clock"></i>
                                    <div>
                                        <div class="info-label">Duration</div>
                                        <div class="info-value">${destination.duration}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-hiking"></i>
                                    <div>
                                        <div class="info-label">Difficulty</div>
                                        <div class="info-value">${destination.difficulty}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        ${destination.highlights && destination.highlights.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-star"></i> Tour Highlights</h3>
                            <div class="highlights">
                                ${destination.highlights.map(highlight => `
                                    <div class="highlight-item">
                                        <i class="fas fa-check"></i>
                                        <span>${highlight}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.activities && destination.activities.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-map-signs"></i> Activities</h3>
                            <div class="activities-grid">
                                ${destination.activities.map(activity => `
                                    <div class="activity-card">
                                        <div class="activity-icon">
                                            <i class="${activity.icon}"></i>
                                        </div>
                                        <div class="activity-content">
                                            <h4>${activity.name}</h4>
                                            <p>${activity.description}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.features && destination.features.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-star"></i> Key Features</h3>
                            <div class="features-list">
                                ${destination.features.map(feature => `
                                    <div class="feature-item">
                                        <div class="feature-name">${feature.name}</div>
                                        <div class="feature-desc">${feature.description}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.tags && destination.tags.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-tags"></i> Tags</h3>
                            <div class="tags-container">
                                ${destination.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> 
                                ${destination.basePrice > 0 ? `From $${destination.basePrice} per person` : 'Free Entry'}
                            </div>
                            <p class="price-note">${destination.basePrice > 0 ? 'Prices include permits, guides, and basic amenities' : 'Donations support conservation efforts'}</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="destination" 
                                    data-id="${destination._id || destination.id}"
                                    data-name="${destination.name}">
                                <i class="fas fa-calendar-check"></i> Book Now
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('destination', destination._id || destination.id, destination.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showAccommodationDetails(accommodationId) {
        const accommodation = seedData.accommodations.find(a => a._id === accommodationId) || 
                            allItemsCache.accommodations.find(a => a._id === accommodationId || a.id === accommodationId);
        
        if (!accommodation) {
            showNotification('Accommodation details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-hotel"></i> ${accommodation.name}</h2>
                    <p class="modal-subtitle"><i class="fas fa-map-marker-alt"></i> ${accommodation.location}</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="accommodation-hero">
                        <img src="${getImageUrl(accommodation.mainImage, 'accommodation')}" 
                             alt="${accommodation.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-info-circle"></i> Overview</h3>
                            <p>${accommodation.description}</p>
                            
                            <div class="quick-info">
                                <div class="info-item">
                                    <i class="fas fa-star"></i>
                                    <div>
                                        <div class="info-label">Rating</div>
                                        <div class="info-value">${accommodation.rating}/5.0</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-bed"></i>
                                    <div>
                                        <div class="info-label">Type</div>
                                        <div class="info-value">${accommodation.type}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-users"></i>
                                    <div>
                                        <div class="info-label">Max Guests</div>
                                        <div class="info-value">${accommodation.maxGuests || 2}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-phone"></i>
                                    <div>
                                        <div class="info-label">Contact</div>
                                        <div class="info-value">${accommodation.contactPhone}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        ${accommodation.amenities && accommodation.amenities.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-concierge-bell"></i> Amenities</h3>
                            <div class="amenities-grid">
                                ${accommodation.amenities.map(amenity => `
                                    <div class="amenity-item ${amenity.included ? 'included' : 'not-included'}">
                                        <div class="amenity-icon">
                                            <i class="${amenity.icon}"></i>
                                        </div>
                                        <div class="amenity-content">
                                            <div class="amenity-name">${amenity.name}</div>
                                            <div class="amenity-status">${amenity.included ? 'Included' : 'Not Included'}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${accommodation.roomTypes && accommodation.roomTypes.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-door-open"></i> Room Types</h3>
                            <div class="room-types">
                                ${accommodation.roomTypes.map(room => `
                                    <div class="room-item">
                                        <div class="room-header">
                                            <h4>${room.name}</h4>
                                            <div class="room-price">$${room.price}/night</div>
                                        </div>
                                        <div class="room-details">
                                            <div class="room-capacity">
                                                <i class="fas fa-user-friends"></i>
                                                <span>Capacity: ${room.capacity} guests</span>
                                            </div>
                                            ${room.features ? `
                                            <div class="room-features">
                                                ${room.features.map(feature => `
                                                    <span class="room-feature">${feature}</span>
                                                `).join('')}
                                            </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${accommodation.features && accommodation.features.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-star"></i> Special Features</h3>
                            <div class="features-list">
                                ${accommodation.features.map(feature => `
                                    <div class="feature-item">
                                        <i class="fas fa-check"></i>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> 
                                From $${accommodation.pricePerNight || 0} per night
                            </div>
                            <p class="price-note">Rates vary by season and room type. Contact for special packages.</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="accommodation" 
                                    data-id="${accommodation._id || accommodation.id}"
                                    data-name="${accommodation.name}">
                                <i class="fas fa-calendar-check"></i> Book Now
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('accommodation', accommodation._id || accommodation.id, accommodation.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showBlogDetails(blogId) {
        const blog = seedData.blogPosts.find(b => b._id === blogId) || 
                    allItemsCache.blogPosts.find(b => b._id === blogId || b.id === blogId);
        
        if (!blog) {
            showNotification('Blog post details not found', 'error');
            return;
        }
        
        // Create detailed content based on blog category
        let detailedContent = '';
        
        if (blog.category.includes('Gorilla') || blog.category.includes('Wildlife')) {
            detailedContent = `
                <h3>Complete Guide to Gorilla Trekking in Rwanda</h3>
                
                <p>Rwanda's Volcanoes National Park offers one of the most profound wildlife experiences on Earth. Here's everything you need to know for your gorilla trekking adventure:</p>
                
                <h4>Permits and Planning</h4>
                <p>Gorilla trekking permits cost $1,500 per person and should be booked 6-12 months in advance through the Rwanda Development Board. Each permit allows one hour with the gorillas. We handle all permit applications and logistics for our clients.</p>
                
                <h4>Physical Preparation</h4>
                <ul>
                    <li><strong>Fitness Level:</strong> Moderate to good fitness required (2-6 hours hiking)</li>
                    <li><strong>Altitude:</strong> Trekking occurs at 2,500-4,000 meters</li>
                    <li><strong>Training:</strong> Regular walking/hiking recommended before your trip</li>
                    <li><strong>Age Restrictions:</strong> Minimum age is 15 years</li>
                </ul>
                
                <h4>What to Pack</h4>
                <div class="packing-list">
                    <div class="packing-item">
                        <i class="fas fa-hiking"></i>
                        <span>Waterproof hiking boots</span>
                    </div>
                    <div class="packing-item">
                        <i class="fas fa-tshirt"></i>
                        <span>Layered clothing for changing weather</span>
                    </div>
                    <div class="packing-item">
                        <i class="fas fa-camera"></i>
                        <span>Camera with no flash</span>
                    </div>
                    <div class="packing-item">
                        <i class="fas fa-tint"></i>
                        <span>2 liters of water minimum</span>
                    </div>
                </div>
                
                <h4>Conservation Impact</h4>
                <p>Your $1,500 permit directly funds:
                <br>• 10% to local communities
                <br>• 50% to park management and anti-poaching
                <br>• 40% to national conservation programs</p>
            `;
        } else if (blog.category.includes('Culture')) {
            detailedContent = `
                <h3>Immersive Cultural Experiences in Rwanda</h3>
                
                <p>Beyond the famous gorillas, Rwanda offers rich cultural experiences that connect you with local communities and traditions:</p>
                
                <h4>Traditional Experiences</h4>
                <div class="cultural-experiences">
                    <div class="experience-item">
                        <h5>Iby\'iwacu Cultural Village</h5>
                        <p>Participate in traditional activities: banana beer making, archery, traditional medicine demonstrations, and Intore warrior dances.</p>
                    </div>
                    <div class="experience-item">
                        <h5>King\'s Palace Museum</h5>
                        <p>Visit the reconstructed royal palace, see the famous Inyambo long-horned cows, and learn about Rwanda's monarchy.</p>
                    </div>
                    <div class="experience-item">
                        <h5>Traditional Craft Workshops</h5>
                        <p>Learn traditional crafts like basket weaving (agaseke), pottery, and Imigongo art from master artisans.</p>
                    </div>
                </div>
                
                <h4>Community Tourism</h4>
                <p>We partner with 12 communities across Rwanda to offer authentic experiences:
                <br>• Homestays with local families
                <br>• Community-led village tours
                <br>• Traditional cooking classes
                <br>• School and cooperative visits</p>
                
                <h4>Responsible Cultural Tourism</h4>
                <p>Our cultural tours follow strict ethical guidelines:
                <br>• Fair compensation to communities
                <br>• Respect for cultural protocols
                <br>• Photography only with permission
                <br>• Support for cultural preservation</p>
            `;
        } else {
            detailedContent = `
                <h3>${blog.title}</h3>
                
                <p>${blog.excerpt}</p>
                
                <h4>Key Information</h4>
                <p>Rwanda, known as the "Land of a Thousand Hills," offers diverse experiences from wildlife safaris to cultural immersion. Here are essential tips for your visit:</p>
                
                <div class="travel-tips">
                    <div class="tip-item">
                        <i class="fas fa-passport"></i>
                        <div>
                            <h5>Visa Requirements</h5>
                            <p>Most nationalities can get visa on arrival. East African Tourist Visa available for Rwanda, Uganda, and Kenya.</p>
                        </div>
                    </div>
                    <div class="tip-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <div>
                            <h5>Currency & Costs</h5>
                            <p>Rwandan Franc (RWF) is local currency. Credit cards accepted in cities. Budget $150-300/day excluding gorilla permits.</p>
                        </div>
                    </div>
                    <div class="tip-item">
                        <i class="fas fa-syringe"></i>
                        <div>
                            <h5>Health & Safety</h5>
                            <p>Yellow fever vaccination required. Malaria prophylaxis recommended. Rwanda is one of Africa's safest countries.</p>
                        </div>
                    </div>
                </div>
                
                <h4>Why Choose GoTrip?</h4>
                <div class="benefits">
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Local expert guides with 5+ years experience</span>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Customized itineraries based on your interests</span>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>24/7 customer support throughout your trip</span>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Support for local communities and conservation</span>
                    </div>
                </div>
            `;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-newspaper"></i> ${blog.title}</h2>
                    <div class="modal-subtitle">
                        <span><i class="fas fa-user"></i> ${blog.author}</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(blog.publishedDate).toLocaleDateString()}</span>
                        <span><i class="fas fa-clock"></i> ${blog.readTime} min read</span>
                    </div>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="blog-hero">
                        <img src="${getImageUrl(blog.featuredImage, 'blog')}" 
                             alt="${blog.title}" 
                             loading="lazy">
                        <div class="blog-category-large">${blog.category}</div>
                    </div>
                    
                    <div class="blog-content-detailed">
                        <div class="blog-meta-detailed">
                            <div class="author-info">
                                <i class="fas fa-user-circle"></i>
                                <div>
                                    <div class="author-name">${blog.author}</div>
                                    <div class="publish-date">Published on ${new Date(blog.publishedDate).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</div>
                                </div>
                            </div>
                            <div class="read-info">
                                <i class="fas fa-clock"></i>
                                <span>${blog.readTime} min read</span>
                            </div>
                        </div>
                        
                        <div class="blog-body">
                            ${detailedContent}
                            
                            <div class="cta-section">
                                <h4>Ready for Your Rwanda Adventure?</h4>
                                <p>Contact our travel experts today to start planning your dream Rwanda trip. We'll create a customized itinerary that matches your interests, budget, and travel style.</p>
                                <p><strong>Email:</strong> info@gotrip.africa<br>
                                <strong>Phone:</strong> +250 787 407 051<br>
                                <strong>Office:</strong> KG 7 Avenue, Kigali, Rwanda</p>
                            </div>
                        </div>
                        
                        ${blog.tags && blog.tags.length > 0 ? `
                        <div class="blog-tags-detailed">
                            <h4>Tags:</h4>
                            <div class="tags-container">
                                ${blog.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary plan-full-trip">
                            <i class="fas fa-map-marked-alt"></i> Plan Your Trip
                        </button>
                        <button class="btn btn-secondary explore-blog" data-page="blog">
                            <i class="fas fa-newspaper"></i> More Articles
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
        
        modal.querySelector('.explore-blog')?.addEventListener('click', () => {
            closeModal();
            showPage('blog');
        });
    }

    // ===============================
    // MODAL FUNCTIONS
    // ===============================
    
    function createModal(content) {
        closeModal();
        
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = content;
        document.body.appendChild(modalContainer);
        
        const closeBtn = modalContainer.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
        
        setTimeout(() => {
            modalContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
        
        return modalContainer;
    }

    function showBookingModal(serviceType, serviceId, serviceName) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-calendar-check"></i> Book ${serviceName}</h2>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-loading" id="modal-loading" style="display: none;">
                        <div class="loading-container">
                            <div class="spinner"></div>
                        </div>
                    </div>
                    <div id="modal-content">
                        <p>Complete this form to book ${serviceName}. We'll contact you shortly to confirm.</p>
                        <form id="booking-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="booking-name">Full Name *</label>
                                    <input type="text" id="booking-name" name="name" required placeholder="Your full name">
                                </div>
                                <div class="form-group">
                                    <label for="booking-email">Email *</label>
                                    <input type="email" id="booking-email" name="email" required placeholder="your.email@example.com">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="booking-phone">Phone Number *</label>
                                    <input type="tel" id="booking-phone" name="phone" required placeholder="+250 78X XXX XXX">
                                </div>
                                <div class="form-group">
                                    <label for="booking-date">Preferred Date *</label>
                                    <input type="date" id="booking-date" name="date" required min="${minDate}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="booking-message">Additional Details</label>
                                <textarea id="booking-message" name="message" placeholder="Any special requests or requirements..." rows="4"></textarea>
                            </div>
                            <input type="hidden" name="serviceType" value="${serviceType}">
                            <input type="hidden" name="serviceId" value="${serviceId}">
                            <input type="hidden" name="serviceName" value="${serviceName}">
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-large">
                                    <i class="fas fa-paper-plane"></i> Submit Booking Request
                                </button>
                                <button type="button" class="btn btn-outline" onclick="closeModal()">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#booking-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (!data.name || !data.email || !data.phone || !data.date) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!validatePhone(data.phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            // Simulate API call
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            setTimeout(() => {
                showNotification('Booking request submitted successfully! We\'ll contact you within 24 hours.', 'success');
                showLoading(submitBtn, false);
                closeModal();
            }, 1500);
        });
    }

    // ===============================
    // ENHANCED TRIP PLANNING MODAL
    // ===============================
    
    function showTripPlanningModal() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-content professional-trip-plan">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> Plan Your Rwanda Adventure</h2>
                    <p class="modal-subtitle">Tell us about your dream trip and we'll create a customized itinerary</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="trip-plan-form">
                        <!-- Personal Information -->
                        <div class="form-section">
                            <h3><i class="fas fa-user-circle"></i> Personal Information</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-name">Full Name *</label>
                                    <input type="text" id="trip-name" name="name" required placeholder="Your full name">
                                </div>
                                <div class="form-group">
                                    <label for="trip-email">Email Address *</label>
                                    <input type="email" id="trip-email" name="email" required placeholder="your.email@example.com">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-phone">Phone Number *</label>
                                    <input type="tel" id="trip-phone" name="phone" required placeholder="+250 78X XXX XXX">
                                </div>
                                <div class="form-group">
                                    <label for="trip-nationality">Nationality *</label>
                                    <input type="text" id="trip-nationality" name="nationality" required placeholder="e.g., American, British, Canadian">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Trip Details -->
                        <div class="form-section">
                            <h3><i class="fas fa-calendar-alt"></i> Trip Details</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-start">Arrival Date *</label>
                                    <input type="date" id="trip-start" name="startDate" required min="${minDate}">
                                </div>
                                <div class="form-group">
                                    <label for="trip-end">Departure Date *</label>
                                    <input type="date" id="trip-end" name="endDate" required min="${minDate}">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-travelers">Number of Travelers *</label>
                                    <input type="number" id="trip-travelers" name="travelers" min="1" max="20" value="2" required>
                                </div>
                                <div class="form-group">
                                    <label for="trip-budget">Estimated Budget per Person *</label>
                                    <select id="trip-budget" name="budget" required>
                                        <option value="">Select budget range...</option>
                                        <option value="budget">Budget ($800 - $1,500)</option>
                                        <option value="standard">Standard ($1,500 - $3,000)</option>
                                        <option value="premium">Premium ($3,000 - $5,000)</option>
                                        <option value="luxury">Luxury ($5,000+)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Interests -->
                        <div class="form-section">
                            <h3><i class="fas fa-heart"></i> Interests</h3>
                            <div class="interests-grid">
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="gorilla-trekking">
                                    <span>Gorilla Trekking</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="wildlife-safari">
                                    <span>Wildlife Safari</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="cultural-tours">
                                    <span>Cultural Tours</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="hiking">
                                    <span>Hiking & Trekking</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="relaxation">
                                    <span>Relaxation</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="photography">
                                    <span>Photography</span>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Message -->
                        <div class="form-section">
                            <h3><i class="fas fa-edit"></i> Additional Information</h3>
                            <div class="form-group">
                                <label for="trip-message">Tell us about your dream trip *</label>
                                <textarea id="trip-message" name="message" required placeholder="What are you most excited about? Any specific experiences you're looking for?" rows="6"></textarea>
                            </div>
                        </div>
                        
                        <!-- Submit -->
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary btn-large">
                                <i class="fas fa-paper-plane"></i> Submit Trip Request
                            </button>
                            <button type="button" class="btn btn-outline" onclick="closeModal()">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#trip-plan-form');
        
        // Set end date minimum based on start date
        const startDateInput = form.querySelector('#trip-start');
        const endDateInput = form.querySelector('#trip-end');
        
        startDateInput.addEventListener('change', () => {
            endDateInput.min = startDateInput.value;
            if (endDateInput.value && endDateInput.value < startDateInput.value) {
                endDateInput.value = startDateInput.value;
            }
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (!data.name || !data.email || !data.phone || !data.nationality || 
                !data.startDate || !data.endDate || !data.travelers || !data.budget || !data.message) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!validatePhone(data.phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            if (new Date(data.endDate) < new Date(data.startDate)) {
                showNotification('Departure date must be after arrival date', 'error');
                return;
            }
            
            // Simulate API call
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            setTimeout(() => {
                showNotification('Trip plan submitted successfully! Our travel expert will contact you within 24 hours.', 'success');
                showLoading(submitBtn, false);
                closeModal();
            }, 1500);
        });
    }

    // ===============================
    // ENHANCED RENDER FUNCTIONS
    // ===============================
    
    function renderDestinations(destinations, container, isHome = false) {
        if (!destinations || destinations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-map-marked-alt"></i>
                    <h3>No destinations available</h3>
                    <p>Check back soon for amazing Rwanda destinations!</p>
                </div>
            `;
            return;
        }
        
        // For home page, show 4 destinations; for full page, show all
        const displayDestinations = isHome ? destinations.slice(0, 4) : destinations;
        
        container.innerHTML = displayDestinations.map(dest => {
            const itemId = dest._id || dest.id || Math.random().toString();
            const name = dest.name || 'Amazing Destination';
            const location = dest.location || 'Rwanda';
            const description = dest.description || 'Experience the beauty of Rwanda';
            const rating = dest.rating || 4.5;
            const price = dest.basePrice || dest.price || 0;
            const imageUrl = getImageUrl(dest.mainImage, 'destination');
            
            return `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="500" 
                         height="300">
                    ${rating ? `<div class="destination-rating"><i class="fas fa-star"></i> ${rating}</div>` : ''}
                </div>
                <div class="destination-content">
                    <h3>${name}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${location}
                    </div>
                    <p class="destination-description">${description.substring(0, 100)}...</p>
                    <div class="destination-features">
                        ${dest.tags ? dest.tags.slice(0, 3).map(tag => 
                            `<span class="feature"><i class="fas fa-check"></i>${tag}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${price > 0 ? `$${price}` : 'Free Entry'}</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${itemId}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }
    
    function renderGuides(guides, container) {
        if (!guides || guides.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-user-tie"></i>
                    <h3>No guides available</h3>
                    <p>Our expert guides will be listed here soon!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = guides.map(guide => {
            const itemId = guide._id || guide.id || Math.random().toString();
            const name = guide.name || 'Professional Guide';
            const specialty = guide.specialty || 'Tour Guide';
            const languages = guide.languages || [{language: 'English'}, {language: 'Kinyarwanda'}];
            const experience = guide.experience || 'Experienced guide';
            const rating = guide.rating || 4.5;
            const dailyRate = guide.dailyRate || 100;
            const imageUrl = getImageUrl(guide.image, 'guide');
            
            return `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${name}</h3>
                    <p class="specialty">${specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${Array.isArray(languages) ? languages.slice(0, 3).map(lang => {
                                const langName = typeof lang === 'object' ? lang.language : lang;
                                return `<span class="language-tag">${langName}</span>`;
                            }).join('') : ''}
                            ${languages.length > 3 ? `<span class="language-tag more">+${languages.length - 3}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(rating))}<span>${rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> $${dailyRate}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="guide" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-user-check"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-bio" data-id="${itemId}">
                            <i class="fas fa-user-circle"></i> View Bio
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }
    
    function renderTranslators(translators, container) {
        if (!translators || translators.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-language"></i>
                    <h3>No translators available</h3>
                    <p>Our professional translators will be listed here soon!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = translators.map(translator => {
            const itemId = translator._id || translator.id || Math.random().toString();
            const name = translator.name || 'Professional Translator';
            const specialty = translator.specialty || 'Translator';
            const languages = translator.languages || [{language: 'English'}, {language: 'French'}, {language: 'Kinyarwanda'}];
            const experience = translator.experience || 'Experienced translator';
            const rating = translator.rating || 4.5;
            const dailyRate = translator.dailyRate || 100;
            const imageUrl = getImageUrl(translator.image, 'translator');
            
            return `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${name}</h3>
                    <p class="specialty">${specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${Array.isArray(languages) ? languages.slice(0, 3).map(lang => {
                                const langName = typeof lang === 'object' ? lang.language : lang;
                                return `<span class="language-tag">${langName}</span>`;
                            }).join('') : ''}
                            ${languages.length > 3 ? `<span class="language-tag more">+${languages.length - 3}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(rating))}<span>${rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> $${dailyRate}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="translator" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-language"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-bio" data-id="${itemId}">
                            <i class="fas fa-user-circle"></i> View Bio
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }

    function renderAccommodations(accommodations, container) {
        if (!accommodations || accommodations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-hotel"></i>
                    <h3>No accommodations available</h3>
                    <p>Check back soon for amazing places to stay in Rwanda!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = accommodations.map(acc => {
            const itemId = acc._id || acc.id || Math.random().toString();
            const name = acc.name || 'Comfortable Accommodation';
            const type = acc.type || 'Hotel';
            const location = acc.location || 'Rwanda';
            const description = acc.description || 'Comfortable accommodation for your stay';
            const pricePerNight = acc.pricePerNight || acc.dailyRate || 150;
            const rating = acc.rating || 4.5;
            const imageUrl = getImageUrl(acc.mainImage, 'accommodation');
            
            return `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    ${rating ? `<div class="accommodation-rating"><i class="fas fa-star"></i> ${rating}</div>` : ''}
                </div>
                <div class="accommodation-content">
                    <span class="type">${type}</span>
                    <h3>${name}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${location}
                    </div>
                    <p>${description.substring(0, 120)}...</p>
                    <div class="features">
                        ${acc.amenities ? acc.amenities.slice(0, 3).map(amenity => 
                            `<span class="feature-tag">${amenity.name}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> $${pricePerNight}/night</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="accommodation" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-more" 
                                data-id="${itemId}">
                            <i class="fas fa-info-circle"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }

    function renderBlogPosts(blogPosts, container, isHome = false) {
        if (!blogPosts || blogPosts.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-newspaper"></i>
                    <h3>No blog posts available</h3>
                    <p>Check back soon for travel tips and Rwanda insights!</p>
                </div>
            `;
            return;
        }
        
        // For home page, show 3 posts; for full page, show all
        const displayPosts = isHome ? blogPosts.slice(0, 3) : blogPosts;
        
        container.innerHTML = displayPosts.map(post => {
            const itemId = post._id || post.id || Math.random().toString();
            const title = post.title || 'Interesting Article';
            const category = post.category || 'Travel';
            const date = post.publishedDate || post.date ? new Date(post.publishedDate || post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : 'Recent';
            const readTime = post.readTime || '5 min read';
            const excerpt = post.excerpt || post.description || 'Read our latest article';
            const author = post.author || 'Go Trip Team';
            const imageUrl = getImageUrl(post.featuredImage, 'blog');
            
            return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${imageUrl}" 
                         alt="${title}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    <span class="blog-category">${category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date"><i class="fas fa-calendar"></i> ${date}</span>
                        <span class="blog-read-time">${readTime}</span>
                    </div>
                    <h3>${title}</h3>
                    <p class="blog-excerpt">${excerpt.substring(0, 120)}...</p>
                    <div class="author">
                        <i class="fas fa-user"></i> ${author}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-primary read-more" 
                                data-id="${itemId}">
                            <i class="fas fa-book-open"></i> Read More
                        </button>
                    </div>
                </div>
            </article>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }

    function attachEventListenersToContainer(container) {
        // Book now buttons
        container.querySelectorAll('.book-now').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const type = button.dataset.type;
                const id = button.dataset.id;
                const name = button.dataset.name;
                if (type && id && name) {
                    showBookingModal(type, id, name);
                }
            });
        });
        
        // View bio buttons for guides
        container.querySelectorAll('.view-bio').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    const card = button.closest('.guide-card, .translator-card');
                    if (card && card.classList.contains('guide-card')) {
                        showGuideBio(id);
                    } else {
                        showTranslatorBio(id);
                    }
                }
            });
        });
        
        // View details buttons for destinations
        container.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    showDestinationDetails(id);
                }
            });
        });
        
        // View more buttons for accommodations
        container.querySelectorAll('.view-more').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    showAccommodationDetails(id);
                }
            });
        });
        
        // Read more buttons for blogs
        container.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    showBlogDetails(id);
                }
            });
        });
    }

    // ===============================
    // ADD ENHANCED CSS STYLES
    // ===============================
    function addEnhancedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Modal Styles */
            .modal-subtitle {
                color: #666;
                font-size: 0.95rem;
                margin-top: 5px;
                display: flex;
                align-items: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .modal-subtitle span {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .bio-header {
                display: flex;
                align-items: center;
                gap: 25px;
                padding: 20px;
                background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
                border-radius: 12px;
                margin-bottom: 25px;
            }
            
            @media (max-width: 768px) {
                .bio-header {
                    flex-direction: column;
                    text-align: center;
                    gap: 15px;
                }
            }
            
            .bio-avatar {
                flex-shrink: 0;
            }
            
            .bio-avatar img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                object-fit: cover;
                border: 5px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            @media (max-width: 480px) {
                .bio-avatar img {
                    width: 120px;
                    height: 120px;
                }
            }
            
            .bio-summary {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .price-tag-large {
                font-size: 24px;
                font-weight: 700;
                color: #2E7D32;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            @media (max-width: 480px) {
                .price-tag-large {
                    font-size: 20px;
                }
            }
            
            .availability {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
                width: fit-content;
            }
            
            .availability.available {
                background: #d1fae5;
                color: #065f46;
            }
            
            .availability.unavailable {
                background: #fef3c7;
                color: #92400e;
            }
            
            .stats {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #4b5563;
                font-size: 14px;
            }
            
            .content-sections {
                margin-bottom: 25px;
            }
            
            .content-section {
                margin-bottom: 25px;
            }
            
            .content-section h3 {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .content-section h3 i {
                color: #2E7D32;
            }
            
            .bio-content {
                line-height: 1.8;
                color: #374151;
                font-size: 15px;
                white-space: pre-line;
            }
            
            .languages-detailed {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 12px;
                margin-top: 15px;
            }
            
            @media (max-width: 768px) {
                .languages-detailed {
                    grid-template-columns: 1fr;
                }
            }
            
            .language-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: white;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                transition: transform 0.2s;
            }
            
            .language-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .language-flag {
                font-size: 24px;
            }
            
            .language-info {
                flex: 1;
            }
            
            .language-name {
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 4px;
            }
            
            .language-level {
                font-size: 12px;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .certifications-list,
            .education-item {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 15px;
            }
            
            .certification-item,
            .education-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px;
                background: #f9fafb;
                border-radius: 6px;
                border-left: 3px solid #2E7D32;
            }
            
            .certification-item i,
            .education-item i {
                color: #2E7D32;
                width: 20px;
            }
            
            .modal-actions {
                display: flex;
                gap: 12px;
                padding-top: 25px;
                border-top: 1px solid #e5e7eb;
            }
            
            @media (max-width: 768px) {
                .modal-actions {
                    flex-direction: column;
                }
            }
            
            .modal-actions .btn {
                flex: 1;
            }
            
            /* Destination Details Styles */
            .destination-hero,
            .accommodation-hero,
            .blog-hero {
                width: 100%;
                height: 250px;
                overflow: hidden;
                border-radius: 12px;
                margin-bottom: 25px;
            }
            
            .destination-hero img,
            .accommodation-hero img,
            .blog-hero img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .quick-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            
            @media (max-width: 480px) {
                .quick-info {
                    grid-template-columns: 1fr;
                }
            }
            
            .info-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .info-item i {
                font-size: 20px;
                color: #2E7D32;
            }
            
            .info-label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .info-value {
                font-size: 14px;
                font-weight: 600;
                color: #1e293b;
            }
            
            .activities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            @media (max-width: 768px) {
                .activities-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            .activity-card {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            
            .activity-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .activity-icon {
                width: 40px;
                height: 40px;
                background: #2E7D32;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .activity-content h4 {
                font-size: 16px;
                margin: 0 0 5px 0;
                color: #1e293b;
            }
            
            .activity-content p {
                font-size: 14px;
                color: #64748b;
                margin: 0;
            }
            
            .features-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 12px;
                margin-top: 10px;
            }
            
            @media (max-width: 768px) {
                .features-list {
                    grid-template-columns: 1fr;
                }
            }
            
            .feature-item {
                padding: 12px;
                background: #f8fafc;
                border-radius: 6px;
                border-left: 3px solid #2E7D32;
            }
            
            .feature-name {
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 4px;
            }
            
            .feature-desc {
                font-size: 14px;
                color: #64748b;
            }
            
            .highlights {
                margin-top: 15px;
            }
            
            .highlight-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 0;
            }
            
            .highlight-item i {
                color: #2E7D32;
            }
            
            .tags-container {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }
            
            .tag {
                padding: 6px 12px;
                background: #e0f2fe;
                color: #0369a1;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            }
            
            .price-section {
                margin-bottom: 20px;
            }
            
            .price-note {
                color: #666;
                font-size: 14px;
                margin-top: 5px;
            }
            
            .action-buttons {
                display: flex;
                gap: 12px;
            }
            
            @media (max-width: 768px) {
                .action-buttons {
                    flex-direction: column;
                }
            }
            
            /* Amenities Grid */
            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            @media (max-width: 768px) {
                .amenities-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            .amenity-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .amenity-item.included {
                border-left: 3px solid #2E7D32;
            }
            
            .amenity-item.not-included {
                border-left: 3px solid #d1d5db;
                opacity: 0.7;
            }
            
            .amenity-icon {
                width: 40px;
                height: 40px;
                background: #e0f2fe;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0369a1;
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .amenity-item.not-included .amenity-icon {
                background: #f3f4f6;
                color: #6b7280;
            }
            
            .amenity-content {
                flex: 1;
            }
            
            .amenity-name {
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 4px;
            }
            
            .amenity-status {
                font-size: 12px;
                padding: 2px 8px;
                border-radius: 4px;
                display: inline-block;
            }
            
            .amenity-item.included .amenity-status {
                background: #d1fae5;
                color: #065f46;
            }
            
            .amenity-item.not-included .amenity-status {
                background: #f3f4f6;
                color: #6b7280;
            }
            
            /* Room Types */
            .room-types {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 15px;
            }
            
            .room-item {
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .room-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .room-header h4 {
                margin: 0;
                font-size: 16px;
            }
            
            .room-price {
                font-size: 18px;
                font-weight: 700;
                color: #2E7D32;
            }
            
            .room-details {
                font-size: 14px;
                color: #666;
            }
            
            .room-capacity {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            /* Blog Details */
            .blog-category-large {
                position: absolute;
                top: 15px;
                left: 15px;
                background: #2E7D32;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
            }
            
            .blog-meta-detailed {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e5e7eb;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .author-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .author-info i {
                font-size: 40px;
                color: #666;
            }
            
            .author-name {
                font-weight: 600;
                color: #1f2937;
            }
            
            .publish-date {
                font-size: 14px;
                color: #666;
            }
            
            .read-info {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #666;
            }
            
            .blog-excerpt-detailed {
                font-size: 18px;
                line-height: 1.6;
                color: #374151;
                margin-bottom: 25px;
                padding-bottom: 25px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .blog-body {
                line-height: 1.8;
                color: #374151;
            }
            
            .blog-body h3,
            .blog-body h4 {
                color: #1f2937;
                margin-top: 25px;
                margin-bottom: 15px;
            }
            
            .blog-body ul,
            .blog-body ol {
                margin-left: 20px;
                margin-bottom: 20px;
            }
            
            .blog-body li {
                margin-bottom: 8px;
            }
            
            .packing-list,
            .cultural-experiences,
            .travel-tips {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin: 20px 0;
            }
            
            .packing-item,
            .experience-item,
            .tip-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .packing-item i,
            .tip-item i {
                color: #2E7D32;
                font-size: 20px;
                margin-top: 2px;
            }
            
            .experience-item h5 {
                margin: 0 0 8px 0;
                color: #1f2937;
            }
            
            .tip-item h5 {
                margin: 0 0 5px 0;
                color: #1f2937;
            }
            
            .benefits {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin: 20px 0;
            }
            
            .benefit-item {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .benefit-item i {
                color: #2E7D32;
            }
            
            .cta-section {
                background: #f0f9ff;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #2E7D32;
            }
            
            .blog-tags-detailed {
                margin-top: 25px;
                padding-top: 25px;
                border-top: 1px solid #e5e7eb;
            }
            
            .blog-tags-detailed h4 {
                margin-bottom: 10px;
                color: #1f2937;
            }
            
            /* Trip Planning Form */
            .professional-trip-plan .form-section {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            @media (max-width: 768px) {
                .professional-trip-plan .form-section {
                    padding: 15px;
                }
            }
            
            .professional-trip-plan .form-section h3 {
                margin-top: 0;
                margin-bottom: 20px;
                color: #1f2937;
                font-size: 18px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .interests-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 10px;
                margin-top: 10px;
            }
            
            @media (max-width: 768px) {
                .interests-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            .interest-checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px;
                background: #f9fafb;
                border-radius: 6px;
                border: 1px solid #e5e7eb;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .interest-checkbox:hover {
                background: #f1f5f9;
                border-color: #cbd5e1;
            }
            
            .interest-checkbox input[type="checkbox"] {
                width: 16px;
                height: 16px;
                accent-color: #2E7D32;
            }
            
            .form-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            
            @media (max-width: 768px) {
                .form-actions {
                    flex-direction: column;
                }
            }
            
            .form-actions .btn {
                flex: 1;
            }
        `;
        document.head.appendChild(style);
    }

    // ===============================
    // EVENT HANDLERS
    // ===============================
    
    function setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('.nav-link') || target.closest('.nav-link')) {
                e.preventDefault();
                const navLink = target.matches('.nav-link') ? target : target.closest('.nav-link');
                const page = navLink.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.service-link') || target.closest('.service-link')) {
                e.preventDefault();
                const serviceLink = target.matches('.service-link') ? target : target.closest('.service-link');
                const page = serviceLink.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.explore-destinations-btn') || target.closest('.explore-destinations-btn')) {
                e.preventDefault();
                showPage('destinations');
            }
            
            if (target.matches('.plan-trip-nav-btn, .plan-trip-hero-btn') || 
                target.closest('.plan-trip-nav-btn, .plan-trip-hero-btn')) {
                e.preventDefault();
                showTripPlanningModal();
            }
            
            if (target.matches('.logo')) {
                e.preventDefault();
                showPage('home');
            }
            
            if (target.matches('.footer-links a[data-page]') || target.closest('.footer-links a[data-page]')) {
                e.preventDefault();
                const link = target.matches('a') ? target : target.closest('a');
                const page = link.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.footer-link')) {
                e.preventDefault();
                const action = target.dataset.action;
                if (action === 'privacy' || action === 'terms') {
                    showNotification(`${action === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} page coming soon!`, 'info');
                }
            }
        });
        
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const name = contactForm.querySelector('#contact-name').value.trim();
                const email = contactForm.querySelector('#contact-email').value.trim();
                const subject = contactForm.querySelector('#contact-subject').value.trim();
                const message = contactForm.querySelector('#contact-message').value.trim();
                
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill all fields', 'error');
                    return;
                }
                
                if (!validateEmail(email)) {
                    showNotification('Please enter a valid email', 'error');
                    return;
                }
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                showLoading(submitBtn, true);
                
                setTimeout(() => {
                    showNotification('Message sent successfully! We\'ll respond within 24 hours.', 'success');
                    contactForm.reset();
                    showLoading(submitBtn, false);
                }, 1500);
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
            const navLinks = document.getElementById('nav-links');
            
            if (navLinks && navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const navLinks = document.getElementById('nav-links');
            const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
            
            if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===============================
    // PAGE MANAGEMENT
    // ===============================
    
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');
            
            // Load content if not already loaded
            if (!targetPage.dataset.loaded) {
                loadPageContent(pageId);
                targetPage.dataset.loaded = 'true';
            }
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('nav-links');
        const mobileBtn = document.getElementById('mobile-menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (mobileBtn) mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    async function loadPageContent(pageId) {
        try {
            switch(pageId) {
                case 'home':
                    await loadHomePage();
                    break;
                case 'destinations':
                    await loadDestinationsPage();
                    break;
                case 'guides':
                    await loadGuidesPage();
                    break;
                case 'translators':
                    await loadTranslatorsPage();
                    break;
                case 'accommodations':
                    await loadAccommodationsPage();
                    break;
                case 'blog':
                    await loadBlogPage();
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${pageId}:`, error);
            showNotification(`Error loading ${pageId} content`, 'error');
        }
    }
    
    async function loadHomePage() {
        const destinationsGrid = document.getElementById('destinations-section');
        if (destinationsGrid) {
            try {
                const spinnerId = showLoadingSpinner(destinationsGrid);
                // Simulate API call delay
                setTimeout(() => {
                    hideLoadingSpinner(spinnerId);
                    const featured = seedData.destinations.slice(0, 4);
                    renderDestinations(featured, destinationsGrid, true);
                }, 500);
            } catch (error) {
                const fallback = seedData.destinations.slice(0, 4);
                renderDestinations(fallback, destinationsGrid, true);
            }
        }
    }
    
    async function loadDestinationsPage() {
        const grid = document.getElementById('destinations-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderDestinations(seedData.destinations, grid, false);
            }, 500);
        } catch (error) {
            renderDestinations(seedData.destinations, grid, false);
        }
    }
    
    async function loadGuidesPage() {
        const grid = document.getElementById('guides-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderGuides(seedData.guides, grid);
            }, 500);
        } catch (error) {
            renderGuides(seedData.guides, grid);
        }
    }
    
    async function loadTranslatorsPage() {
        const grid = document.getElementById('translators-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderTranslators(seedData.translators, grid);
            }, 500);
        } catch (error) {
            renderTranslators(seedData.translators, grid);
        }
    }
    
    async function loadAccommodationsPage() {
        const grid = document.getElementById('accommodations-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderAccommodations(seedData.accommodations, grid);
            }, 500);
        } catch (error) {
            renderAccommodations(seedData.accommodations, grid);
        }
    }
    
    async function loadBlogPage() {
        const grid = document.getElementById('blog-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderBlogPosts(seedData.blogPosts, grid, false);
            }, 500);
        } catch (error) {
            renderBlogPosts(seedData.blogPosts, grid, false);
        }
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing Go Trip Application v5.3');
        
        // Add enhanced styles
        addEnhancedStyles();
        
        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Initialize UI components
        setupEventListeners();
        
        // Load initial page
        showPage('home');
        
        // Show welcome message after delay
        setTimeout(() => {
            showNotification('Welcome to GoTrip! Experience authentic Rwandan culture and adventure.', 'info', 5000, 'Welcome!');
        }, 1000);
        
        console.log('✅ Application initialized successfully');
    }

    // ===============================
    // EXPORT TO WINDOW
    // ===============================
    window.GoTrip = {
        showPage,
        showNotification,
        showTripPlanningModal,
        showBookingModal,
        closeModal,
        showGuideBio,
        showTranslatorBio,
        showDestinationDetails,
        showAccommodationDetails,
        showBlogDetails
    };

    // ===============================
    // START APPLICATION
    // ===============================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        setTimeout(initializeApp, 100);
    }
})();// Go Trip Frontend Application v5.3 - Enhanced Content
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        debug: false,
        
        // Welcome messages for popup notifications
        welcomeMessages: [
            { 
                id: 1,
                title: "Welcome to GoTrip!", 
                message: "Experience authentic Rwandan culture, beauty and hospitality",
                icon: "fa-globe-africa",
                type: "welcome"
            },
            { 
                id: 2,
                title: "Adventure Awaits!", 
                message: "Enjoy adventurous journeys with us across Rwanda's beautiful landscapes",
                icon: "fa-mountain",
                type: "info"
            },
            { 
                id: 3,
                title: "Expert Guidance", 
                message: "Meet award-winning tour guides and translators for your perfect trip",
                icon: "fa-award",
                type: "info"
            },
            { 
                id: 4,
                title: "Start Planning", 
                message: "Let us help you create your dream Rwanda adventure",
                icon: "fa-map-marked-alt",
                type: "success",
                action: "Plan Your Trip"
            }
        ],
        
        bookingEmail: 'info@gotrip.africa',
        companyPhone: '+250787407051',
        companyAddress: 'KG 7 Ave, Kigali, Rwanda',
        
        // Image fallback configuration
        fallbackImages: {
            destination: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/destination-fallback_uo8qya.jpg',
            guide: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/guide-fallback_pfdjqp.jpg',
            translator: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/translator-fallback_h4hvpj.jpg',
            accommodation: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/accommodation-fallback_qijjhm.jpg',
            blog: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-fallback_tkz4cm.jpg',
            hero: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/hero-rwanda-gorilla_kmw5pv.jpg'
        }
    };

    // ===============================
    // ENHANCED SEED DATA WITH RICH CONTENT
    // ===============================
    const seedData = {
        destinations: [
            {
                _id: 'rw-volcanoes-park',
                name: 'Volcanoes National Park',
                location: 'Musanze District, Northern Province',
                description: 'Home to the endangered mountain gorillas in Rwanda\'s northern province. Experience once-in-a-lifetime gorilla trekking through lush bamboo forests with breathtaking views of five volcanoes. This UNESCO World Heritage site is Africa\'s oldest national park and offers one of the most profound wildlife experiences on Earth.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/volcanoes-national-park_hb3upg.jpg',
                rating: 4.9,
                basePrice: 1500,
                duration: '1-3 Days',
                difficulty: 'Moderate to Challenging',
                bestSeason: 'June-September, December-February',
                highlights: [
                    'Track endangered mountain gorillas',
                    'Visit the Karisoke Research Center',
                    'Hike to Dian Fossey\'s grave',
                    'Golden monkey tracking',
                    'Volcano hikes (Mount Bisoke, Karisimbi)'
                ],
                activities: [
                    { name: 'Mountain Gorilla Trekking', icon: 'fas fa-mountain', description: 'Track and observe endangered mountain gorillas in their natural habitat' },
                    { name: 'Golden Monkey Tracking', icon: 'fas fa-paw', description: 'Observe the playful golden monkeys unique to the Virunga region' },
                    { name: 'Volcano Hiking', icon: 'fas fa-hiking', description: 'Summit the Virunga volcanoes with breathtaking crater lakes' },
                    { name: 'Cultural Village Visits', icon: 'fas fa-home', description: 'Experience local Iby\'iwacu Cultural Village traditions' }
                ],
                features: [
                    { name: 'Mountain Gorillas', description: 'Home to 10 habituated gorilla families with 98% viewing success rate' },
                    { name: 'Volcano Views', description: 'Stunning views of 5 Virunga volcanoes including Mount Karisimbi' },
                    { name: 'Biodiversity', description: 'Over 200 bird species and rare flora including giant lobelias' },
                    { name: 'Conservation Legacy', description: 'Site of Dian Fossey\'s groundbreaking gorilla research' }
                ],
                tags: ['Wildlife', 'Adventure', 'Gorillas', 'Hiking', 'UNESCO', 'Photography']
            },
            {
                _id: 'rw-nyungwe-forest',
                name: 'Nyungwe National Park',
                location: 'Southwestern Rwanda',
                description: 'One of Africa\'s oldest rainforests featuring spectacular canopy walkways, chimpanzee tracking, and over 1,000 plant species. This biodiversity hotspot spans 1,019 km² and hosts 13 primate species including chimpanzees and colobus monkeys. Experience the breathtaking 70-meter canopy walkway suspended above the forest floor.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/nyungwe-forest_hnxbje.jpg',
                rating: 4.7,
                basePrice: 850,
                duration: '2-4 Days',
                difficulty: 'Moderate',
                bestSeason: 'December-February, June-August',
                highlights: [
                    '70m high canopy walkway experience',
                    'Chimpanzee habituation tracking',
                    'Colobus monkey trekking',
                    'Waterfall hikes and bird watching',
                    'Tea plantation cultural tours'
                ],
                activities: [
                    { name: 'Canopy Walk Adventure', icon: 'fas fa-walking', description: 'Walk 70m above the forest floor on Africa\'s longest canopy walkway' },
                    { name: 'Chimpanzee Tracking', icon: 'fas fa-tree', description: 'Track chimpanzee families through dense ancient rainforest' },
                    { name: 'Colobus Monkey Trekking', icon: 'fas fa-users', description: 'See large troops of black-and-white colobus monkeys' },
                    { name: 'Bird Watching', icon: 'fas fa-dove', description: 'Spot over 300 bird species including 29 endemics' }
                ],
                features: [
                    { name: 'Ancient Rainforest', description: 'Over 1,000 years old with pristine montane ecosystems' },
                    { name: 'Primate Capital', description: '13 primate species including chimpanzees and Angolan colobus' },
                    { name: 'Bird Paradise', description: 'Over 300 bird species including 29 Albertine Rift endemics' },
                    { name: 'Tea Plantations', description: 'Visit Rwanda\'s famous Gisakura and Kitabi tea estates' }
                ],
                tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy', 'Eco-Tourism']
            },
            {
                _id: 'rw-akagera-park',
                name: 'Akagera National Park',
                location: 'Eastern Rwanda',
                description: 'Rwanda\'s only savannah park featuring the Big 5 (lion, leopard, elephant, buffalo, rhino). Beautiful landscapes of rolling hills, wetlands, and lakes covering 1,122 km². A remarkable conservation success story where wildlife populations have rebounded dramatically since 2010.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/akagera-national-park_fvtuiv.jpg',
                rating: 4.6,
                basePrice: 650,
                duration: '2-3 Days',
                difficulty: 'Easy',
                bestSeason: 'June-September, December-February',
                highlights: [
                    'Big 5 wildlife safari experience',
                    'Boat safaris on Lake Ihema',
                    'Night drives for nocturnal wildlife',
                    'Rhino tracking experience',
                    'Bird watching with 490+ species'
                ],
                activities: [
                    { name: 'Big 5 Safari', icon: 'fas fa-lion', description: 'Game drives to see lions, elephants, rhinos, leopards, and buffalo' },
                    { name: 'Boat Safari', icon: 'fas fa-ship', description: 'Explore Lake Ihema and see hippos, crocodiles, and water birds' },
                    { name: 'Night Game Drive', icon: 'fas fa-moon', description: 'Spot nocturnal wildlife including leopards and hyenas' },
                    { name: 'Bird Watching', icon: 'fas fa-binoculars', description: 'Over 490 bird species including the rare shoebill stork' }
                ],
                features: [
                    { name: 'Big 5 Destination', description: 'Complete African Big 5 experience in Rwanda' },
                    { name: 'Lake System', description: 'Largest protected wetland in Central Africa' },
                    { name: 'Conservation Success', description: 'Remarkable wildlife restoration and community partnership' },
                    { name: 'Photographic Hides', description: 'Professional hides for wildlife photography' }
                ],
                tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography', 'Conservation']
            },
            {
                _id: 'rw-lake-kivu',
                name: 'Lake Kivu',
                location: 'Western Rwanda',
                description: 'Africa\'s sixth-largest lake and one of Africa\'s safest freshwater lakes. Stunning 89km coastline with beautiful beaches, island resorts, and water activities. Experience relaxation, water sports, and cultural interactions in Rwanda\'s lake district.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/lake-kivu_fzwaeq.jpg',
                rating: 4.8,
                basePrice: 450,
                duration: '2-4 Days',
                difficulty: 'Easy',
                bestSeason: 'Year-round',
                highlights: [
                    'Island hopping to Napoleon and Monkey Islands',
                    'Kayaking along scenic coastline',
                    'Coffee plantation tours and tastings',
                    'Swimming in bilharzia-free waters',
                    'Beautiful sunset boat cruises'
                ],
                activities: [
                    { name: 'Island Hopping', icon: 'fas fa-ship', description: 'Visit Napoleon Island (bat colony) and Monkey Island' },
                    { name: 'Kayaking Adventure', icon: 'fas fa-water', description: 'Paddle along the beautiful coastline and hidden coves' },
                    { name: 'Coffee Tours', icon: 'fas fa-coffee', description: 'Visit coffee cooperatives and learn processing' },
                    { name: 'Boat Cruises', icon: 'fas fa-sailboat', description: 'Sunset cruises and fishing experiences' }
                ],
                features: [
                    { name: 'Safe Swimming', description: 'Bilharzia-free and safe for swimming year-round' },
                    { name: 'Island Paradise', description: 'Numerous islands including bat and monkey sanctuaries' },
                    { name: 'Methane Gas', description: 'Unique methane extraction for clean energy production' },
                    { name: 'Beach Resorts', description: 'Luxury resorts and boutique hotels along the shore' }
                ],
                tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports', 'Culture']
            },
            {
                _id: 'rw-kigali-genocide-memorial',
                name: 'Kigali Genocide Memorial',
                location: 'Kigali, Rwanda',
                description: 'A powerful memorial to the 1994 genocide against the Tutsi, honoring the victims and promoting peace education. This important site includes mass graves, exhibition halls, and beautiful memorial gardens. An essential visit to understand Rwanda\'s journey from tragedy to remarkable recovery.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/kigali-memorial_djojzb.jpg',
                rating: 4.9,
                basePrice: 0,
                duration: 'Half Day',
                difficulty: 'Easy',
                bestSeason: 'Year-round',
                highlights: [
                    'Mass graves of 250,000 genocide victims',
                    'Comprehensive historical exhibitions',
                    'Children\'s memorial section',
                    'Peace education programs',
                    'Beautiful memorial gardens'
                ],
                activities: [
                    { name: 'Memorial Tour', icon: 'fas fa-history', description: 'Guided tour through exhibition halls and memorial grounds' },
                    { name: 'Peace Education', icon: 'fas fa-graduation-cap', description: 'Learn about reconciliation and peace-building' },
                    { name: 'Garden Reflection', icon: 'fas fa-leaf', description: 'Time for reflection in beautiful memorial gardens' },
                    { name: 'Documentary Viewing', icon: 'fas fa-film', description: 'Watch powerful documentaries about Rwanda\'s journey' }
                ],
                features: [
                    { name: 'Historical Education', description: 'Comprehensive understanding of Rwanda\'s history' },
                    { name: 'Peace Promotion', description: 'Focus on reconciliation and peace-building initiatives' },
                    { name: 'International Recognition', description: 'Award-winning memorial and education center' },
                    { name: 'Community Healing', description: 'Important site for national healing and remembrance' }
                ],
                tags: ['History', 'Culture', 'Education', 'Memorial', 'Peace', 'Reflection']
            },
            {
                _id: 'rw-kings-palace-museum',
                name: 'King\'s Palace Museum',
                location: 'Nyanza, Southern Rwanda',
                description: 'Experience traditional Rwandan royal life at this reconstructed royal palace, complete with traditional thatched dwellings, sacred cows, and cultural performances. Learn about Rwanda\'s monarchy history and traditional governance systems.',
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/kings-palace_j1dk4l.jpg',
                rating: 4.5,
                basePrice: 35,
                duration: 'Half Day',
                difficulty: 'Easy',
                bestSeason: 'Year-round',
                highlights: [
                    'Traditional royal palace reconstruction',
                    'Inyambo sacred long-horned cows',
                    'Cultural dance performances',
                    'Traditional architecture exhibits',
                    'Royal history and artifacts'
                ],
                activities: [
                    { name: 'Palace Tour', icon: 'fas fa-landmark', description: 'Explore traditional royal dwellings and compounds' },
                    { name: 'Cow Ceremony', icon: 'fas fa-cow', description: 'See the famous Inyambo long-horned cows' },
                    { name: 'Cultural Dance', icon: 'fas fa-music', description: 'Watch traditional Intore dance performances' },
                    { name: 'Craft Demonstrations', icon: 'fas fa-hammer', description: 'Traditional crafts and building techniques' }
                ],
                features: [
                    { name: 'Cultural Heritage', description: 'Preservation of Rwanda\'s royal traditions' },
                    { name: 'Traditional Architecture', description: 'Authentic thatched palace reconstruction' },
                    { name: 'Sacred Cattle', description: 'Inyambo cows bred for royal ceremonies' },
                    { name: 'Living Museum', description: 'Interactive cultural experiences and demonstrations' }
                ],
                tags: ['Culture', 'History', 'Royalty', 'Traditional', 'Museum', 'Performance']
            }
        ],
        
        accommodations: [
            {
                _id: 'acc-one-only-gorillas-nest',
                name: 'One&Only Gorilla\'s Nest',
                location: 'Volcanoes National Park, Musanze',
                type: 'Luxury Lodge',
                description: 'An exclusive luxury lodge nestled in the foothills of the Virunga volcanoes, offering unparalleled gorilla trekking access. Experience world-class amenities, organic cuisine, and breathtaking volcano views from your private suite.',
                pricePerNight: 3500,
                rating: 4.9,
                amenities: [
                    { name: 'Infinity Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Spa & Wellness Center', included: true, icon: 'fas fa-spa' },
                    { name: 'Fine Dining Restaurant', included: true, icon: 'fas fa-utensils' },
                    { name: 'Private Fireplace', included: true, icon: 'fas fa-fire' },
                    { name: 'Butler Service', included: true, icon: 'fas fa-concierge-bell' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/one-only-gorillas-nest_xjz2qx.jpg',
                available: true,
                contactPhone: '+250788123456',
                contactEmail: 'reservations@oneandonlygorillasnest.com',
                maxGuests: 2,
                roomTypes: [
                    { name: 'Forest View Suite', price: 2800, capacity: 2, features: ['Private balcony', 'Fireplace', 'Rainfall shower'] },
                    { name: 'Volcano View Suite', price: 3500, capacity: 2, features: ['Panoramic views', 'Private hot tub', 'Butler service'] },
                    { name: 'Presidential Villa', price: 5000, capacity: 4, features: ['Private pool', 'Two bedrooms', 'Dedicated guide'] }
                ],
                features: [
                    'Private gorilla trekking preparation',
                    'Conservation fund contribution',
                    'Organic farm-to-table dining',
                    'Guided nature walks',
                    'Cultural village visits'
                ]
            },
            {
                _id: 'acc-kigali-marriott',
                name: 'Kigali Marriott Hotel',
                location: 'Kigali City Center',
                type: '5-Star Hotel',
                description: 'Luxury hotel in the heart of Kigali with panoramic city views, world-class amenities, and exceptional service. Perfect for business and leisure travelers with easy access to city attractions and international airport.',
                pricePerNight: 450,
                rating: 4.8,
                amenities: [
                    { name: 'Rooftop Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Multiple Restaurants', included: true, icon: 'fas fa-utensils' },
                    { name: 'Business Center', included: true, icon: 'fas fa-briefcase' },
                    { name: 'Fitness Center', included: true, icon: 'fas fa-dumbbell' },
                    { name: 'Concierge Service', included: true, icon: 'fas fa-concierge-bell' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/kigali-marriott_tpkamf.jpg',
                available: true,
                contactPhone: '+250788111222',
                contactEmail: 'reservations@marriottkigali.com',
                maxGuests: 4,
                roomTypes: [
                    { name: 'Deluxe Room', price: 350, capacity: 2, features: ['City views', 'Work desk', 'Marriott bedding'] },
                    { name: 'Executive Suite', price: 600, capacity: 3, features: ['Lounge access', 'Separate living area', 'Premium amenities'] },
                    { name: 'Presidential Suite', price: 1200, capacity: 4, features: ['Private dining', 'Butler service', 'Panoramic views'] }
                ],
                features: [
                    'City center location',
                    'Panoramic Kigali views',
                    'Meeting and event facilities',
                    '24-hour room service',
                    'Valet parking'
                ]
            },
            {
                _id: 'acc-nyungwe-house',
                name: 'Nyungwe House',
                location: 'Nyungwe National Park',
                type: 'Boutique Lodge',
                description: 'Luxurious eco-lodge perched on the edge of Nyungwe Forest, offering stunning canopy views and exclusive chimpanzee trekking access. Modern comforts blend with natural surroundings for an unforgettable rainforest experience.',
                pricePerNight: 850,
                rating: 4.7,
                amenities: [
                    { name: 'Infinity Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Spa Services', included: true, icon: 'fas fa-spa' },
                    { name: 'Forest View Restaurant', included: true, icon: 'fas fa-utensils' },
                    { name: 'Guided Walks', included: true, icon: 'fas fa-hiking' },
                    { name: 'Free WiFi', included: true, icon: 'fas fa-wifi' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/nyungwe-house_q7srp7.jpg',
                available: true,
                contactPhone: '+250788333444',
                contactEmail: 'stay@nyungwehouse.com',
                maxGuests: 3,
                roomTypes: [
                    { name: 'Forest View Room', price: 750, capacity: 2, features: ['Private balcony', 'Canopy views', 'King bed'] },
                    { name: 'Canopy Suite', price: 950, capacity: 2, features: ['Extended balcony', 'Sitting area', 'Premium amenities'] },
                    { name: 'Family Suite', price: 1200, capacity: 4, features: ['Two bedrooms', 'Private deck', 'Forest views'] }
                ],
                features: [
                    'Direct forest access',
                    'Chimpanzee trekking packages',
                    'Canopy walkway proximity',
                    'Tea plantation tours',
                    'Bird watching guides'
                ]
            },
            {
                _id: 'acc-lake-kivu-serena',
                name: 'Lake Kivu Serena Hotel',
                location: 'Gisenyi, Lake Kivu',
                type: 'Resort Hotel',
                description: 'Lakeside resort offering water activities, beach access, and stunning sunset views over Lake Kivu. Perfect for relaxation after gorilla trekking or as a standalone lakeside getaway.',
                pricePerNight: 380,
                rating: 4.6,
                amenities: [
                    { name: 'Private Beach', included: true, icon: 'fas fa-umbrella-beach' },
                    { name: 'Water Sports', included: true, icon: 'fas fa-sailboat' },
                    { name: 'Multiple Dining Options', included: true, icon: 'fas fa-utensils' },
                    { name: 'Swimming Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Kids Club', included: true, icon: 'fas fa-child' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/lake-kivu-serena_yiof8x.jpg',
                available: true,
                contactPhone: '+250788555666',
                contactEmail: 'reservations@serenakivu.com',
                maxGuests: 4,
                roomTypes: [
                    { name: 'Garden View Room', price: 320, capacity: 2, features: ['Garden access', 'Private balcony', 'Lake breezes'] },
                    { name: 'Lake View Room', price: 400, capacity: 2, features: ['Direct lake views', 'Sunset viewing', 'Premium amenities'] },
                    { name: 'Family Room', price: 550, capacity: 4, features: ['Interconnecting rooms', 'Private terrace', 'Beach access'] }
                ],
                features: [
                    'Direct lake access',
                    'Water sports equipment',
                    'Island excursion packages',
                    'Spa and wellness center',
                    'Sunset cruise departures'
                ]
            },
            {
                _id: 'acc-akagera-game-lodge',
                name: 'Akagera Game Lodge',
                location: 'Akagera National Park',
                type: 'Safari Lodge',
                description: 'The only lodge inside Akagera National Park, offering authentic safari experience with wildlife viewing from your balcony. Perfect base for game drives and lake excursions.',
                pricePerNight: 320,
                rating: 4.5,
                amenities: [
                    { name: 'Waterhole Viewing', included: true, icon: 'fas fa-binoculars' },
                    { name: 'Swimming Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Safari Restaurant', included: true, icon: 'fas fa-utensils' },
                    { name: 'Game Drive Vehicles', included: true, icon: 'fas fa-car' },
                    { name: 'Bush Breakfasts', included: true, icon: 'fas fa-mug-hot' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/akagera-game-lodge_z4yqjp.jpg',
                available: true,
                contactPhone: '+250788777888',
                contactEmail: 'bookings@akageralodge.com',
                maxGuests: 3,
                roomTypes: [
                    { name: 'Standard Room', price: 280, capacity: 2, features: ['Park views', 'Private bathroom', 'Basic amenities'] },
                    { name: 'Superior Room', price: 350, capacity: 2, features: ['Waterhole views', 'Private balcony', 'Upgraded amenities'] },
                    { name: 'Family Room', price: 450, capacity: 4, features: ['Two bedrooms', 'Shared lounge', 'Park access'] }
                ],
                features: [
                    'Inside national park',
                    'Wildlife viewing deck',
                    'Professional safari guides',
                    'Boat trip arrangements',
                    'Conservation experiences'
                ]
            },
            {
                _id: 'acc-ubumwe-hotel',
                name: 'Ubumwe Grande Hotel',
                location: 'Kigali Heights',
                type: 'Business Hotel',
                description: 'Modern business hotel in Kigali\'s commercial district, offering excellent conference facilities and city access. Perfect for corporate travelers and business meetings.',
                pricePerNight: 280,
                rating: 4.4,
                amenities: [
                    { name: 'Conference Facilities', included: true, icon: 'fas fa-chalkboard' },
                    { name: 'Business Center', included: true, icon: 'fas fa-briefcase' },
                    { name: 'Restaurant & Bar', included: true, icon: 'fas fa-utensils' },
                    { name: 'Gym Access', included: true, icon: 'fas fa-dumbbell' },
                    { name: 'Airport Transfers', included: true, icon: 'fas fa-shuttle-van' }
                ],
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/ubumwe-grande_ji4btp.jpg',
                available: true,
                contactPhone: '+250788999000',
                contactEmail: 'reservations@ubumwegrande.com',
                maxGuests: 2,
                roomTypes: [
                    { name: 'Standard Room', price: 240, capacity: 2, features: ['City views', 'Work desk', 'WiFi'] },
                    { name: 'Executive Room', price: 320, capacity: 2, features: ['Larger workspace', 'Executive lounge', 'Premium amenities'] },
                    { name: 'Suite', price: 450, capacity: 3, features: ['Separate living area', 'Meeting space', 'Butler service'] }
                ],
                features: [
                    'Business district location',
                    'Conference and meeting rooms',
                    'Executive lounge access',
                    'Complimentary transfers',
                    'Corporate rates available'
                ]
            }
        ],
        
        blogPosts: [
            {
                _id: 'blog-gorilla-trekking-guide',
                title: 'Ultimate Guide to Gorilla Trekking in Rwanda: Everything You Need to Know',
                author: 'Dr. Jean de Dieu Nzabonimpa',
                excerpt: 'Complete guide to planning your gorilla trekking adventure in Rwanda. Learn about permits, preparation, what to expect, and conservation impact. Expert tips from our lead wildlife guide.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-gorilla-trekking_uiryfx.jpg',
                category: 'Wildlife & Adventure',
                featured: true,
                readTime: 15,
                publishedDate: '2024-01-15',
                tags: ['Gorilla Trekking', 'Wildlife', 'Adventure', 'Conservation', 'Volcanoes National Park', 'Photography']
            },
            {
                _id: 'blog-rwanda-itinerary-7days',
                title: '7-Day Ultimate Rwanda Itinerary: Gorillas, Culture & Nature',
                author: 'Marie Claire Uwimana',
                excerpt: 'Comprehensive 7-day itinerary covering Rwanda\'s best attractions including gorilla trekking, cultural experiences, and lake relaxation. Perfect for first-time visitors.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-itinerary_g0u8ml.jpg',
                category: 'Travel Planning',
                featured: true,
                readTime: 12,
                publishedDate: '2024-01-20',
                tags: ['Itinerary', 'Travel Planning', 'Rwanda', 'Gorillas', 'Lake Kivu', 'Cultural Tourism']
            },
            {
                _id: 'blog-cultural-experiences-rwanda',
                title: 'Cultural Experiences in Rwanda: Beyond Gorilla Trekking',
                author: 'Go Trip Cultural Team',
                excerpt: 'Immerse yourself in Rwandan culture through traditional dances, food, village visits, and royal heritage sites. Discover the rich cultural tapestry of Rwanda.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-culture_we4wke.jpg',
                category: 'Culture',
                featured: true,
                readTime: 10,
                publishedDate: '2024-01-25',
                tags: ['Culture', 'Tradition', 'Rwanda', 'Community', 'Heritage', 'Royalty']
            },
            {
                _id: 'blog-best-time-visit-rwanda',
                title: 'Best Time to Visit Rwanda: Seasonal Guide & Climate Tips',
                author: 'Weather & Travel Experts',
                excerpt: 'Comprehensive guide to Rwanda\'s climate, seasons, and optimal visiting times for different activities. Make the most of your Rwanda adventure with perfect timing.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-seasons_fqjgwy.jpg',
                category: 'Travel Tips',
                featured: false,
                readTime: 8,
                publishedDate: '2024-02-05',
                tags: ['Seasons', 'Climate', 'Travel Tips', 'Planning', 'Weather', 'Best Time']
            },
            {
                _id: 'blog-rwanda-conservation-success',
                title: 'Rwanda\'s Conservation Success Story: From Tragedy to Triumph',
                author: 'Patience Rutayisire',
                excerpt: 'How Rwanda transformed from environmental degradation to a global conservation leader. Learn about community-based conservation and wildlife restoration.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-conservation_qp7ljd.jpg',
                category: 'Conservation',
                featured: true,
                readTime: 14,
                publishedDate: '2024-02-15',
                tags: ['Conservation', 'Wildlife', 'Sustainability', 'Community', 'Environment', 'Success Story']
            },
            {
                _id: 'blog-rwandan-cuisine-guide',
                title: 'Rwandan Cuisine Guide: Traditional Foods & Dining Experiences',
                author: 'Culinary Tourism Team',
                excerpt: 'Explore Rwanda\'s culinary heritage from traditional dishes to modern fusion. Food tours, cooking classes, and must-try Rwandan delicacies.',
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-food_jnnbpe.jpg',
                category: 'Food & Culture',
                featured: false,
                readTime: 9,
                publishedDate: '2024-02-25',
                tags: ['Food', 'Cuisine', 'Culture', 'Dining', 'Traditional', 'Cooking']
            }
        ],
        
        // ENHANCED GUIDES WITH DETAILED BIO
        guides: [
            {
                _id: 'guide-patience-rutayisire',
                name: 'Patience Rutayisire',
                specialty: 'Senior Wildlife & Gorilla Specialist',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'German', level: 'Fluent', flag: '🇩🇪' },
                    { language: 'Spanish', level: 'Advanced', flag: '🇪🇸' },
                    { language: 'French', level: 'Fluent', flag: '🇫🇷' },
                    { language: 'Chinese (Mandarin)', level: 'Intermediate', flag: '🇨🇳' },
                    { language: 'Swahili', level: 'Native', flag: '🇹🇿' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼' }
                ],
                experience: '12+ years',
                rating: 4.9,
                dailyRate: 250,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/guide-patience_xgfahx.jpg',
                certifications: [
                    'Advanced Gorilla Trekking Specialist (RDB Certified)',
                    'Wilderness First Responder (WFR)',
                    'Bird Watching Expert (African Bird Club)',
                    'Professional Photography Guide',
                    'Conservation Leadership (African Wildlife Foundation)'
                ],
                bio: `Patience is Rwanda's foremost wildlife guide with over 12 years of specialized experience in gorilla trekking and conservation. Born and raised in Musanze near Volcanoes National Park, she has an intimate knowledge of the Virunga mountains ecosystem.

EDUCATION & TRAINING:
• BSc in Wildlife Management, University of Rwanda
• Advanced Primate Behavior Studies, Dian Fossey Gorilla Fund
• International Guide Training, Kenya Wildlife Service

SPECIAL EXPERTISE:
• Expert mountain gorilla tracking (guided 800+ treks)
• Wildlife photography guidance for professionals
• Conservation education and community engagement
• Customized private tours for discerning travelers

ACHIEVEMENTS:
• 2023: Rwanda Tourism Board "Guide of the Year"
• 2022: African Tourism "Best Wildlife Guide" Award
• 2021: National Geographic "Conservation Hero" Recognition
• 2019: Leading 200+ successful gorilla habituation experiences

Patience speaks 7 languages and has worked with numerous documentary crews, including BBC Natural History and National Geographic. Her deep understanding of gorilla behavior and mountain ecology makes every trek an educational and transformative experience.`,
                availability: 'Available',
                toursConducted: '800+',
                favoriteDestination: 'Volcanoes National Park',
                education: 'BSc Wildlife Management, University of Rwanda',
                awards: [
                    'Rwanda Tourism Board Guide of the Year 2023',
                    'African Tourism Best Wildlife Guide 2022',
                    'National Geographic Conservation Hero 2021',
                    'Rwanda Development Board Excellence Award 2020'
                ]
            },
            {
                _id: 'guide-celestin-hagenimana',
                name: 'Celestin Hagenimana',
                specialty: 'Cultural & Historical Expert Guide',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼' },
                    { language: 'Swahili', level: 'Advanced', flag: '🇹🇿' },
                    { language: 'French', level: 'Intermediate', flag: '🇫🇷' }
                ],
                experience: '8+ years',
                rating: 4.8,
                dailyRate: 180,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/guide-celestin_t1gpm2.jpg',
                certifications: [
                    'Cultural Heritage Specialist (Rwanda Cultural Heritage Academy)',
                    'Historical Tour Guide Certified',
                    'Community Tourism Expert',
                    'Language Interpretation Certified'
                ],
                bio: `Celestin is a passionate cultural guide specializing in Rwandan history, traditions, and community experiences. With deep roots in Rwandan culture, he provides authentic insights into local customs, traditional dances, and historical sites.

EDUCATION & BACKGROUND:
• MA in African History, University of Rwanda
• Cultural Heritage Management, UNESCO Training
• Mandarin Language Studies, Beijing Language Institute

SPECIALIZED SERVICES:
• Cultural immersion experiences with local communities
• Historical site explanations and contextual storytelling
• Traditional craft workshops and artisan visits
• Community village visits and homestay arrangements
• Genocide memorial education with sensitivity

NOTABLE EXPERIENCES:
• Guided Chinese diplomatic delegations for 5+ years
• Worked with Smithsonian Institution cultural researchers
• Developed community tourism programs in 12 villages
• Trained 50+ local guides in cultural interpretation

Celestin has a Master's degree in African History and is fluent in Mandarin Chinese, making him particularly valuable for Chinese-speaking visitors. He creates personalized cultural journeys that connect visitors with local communities in meaningful, responsible ways.`,
                availability: 'Available',
                toursConducted: '450+',
                favoriteDestination: 'Kigali Genocide Memorial & Cultural Sites',
                education: 'MA African History, University of Rwanda',
                awards: [
                    'Cultural Ambassador Award 2023',
                    'Community Tourism Excellence 2022',
                    'Best Historical Guide 2021',
                    'Tourism Innovation Award 2020'
                ]
            }
        ],
        
        // ENHANCED TRANSLATORS WITH DETAILED BIO
        translators: [
            {
                _id: 'translator-tite-iradukunda',
                name: 'Tite Iradukunda',
                specialty: 'Senior Chinese & Kinyarwanda Translator',
                languages: [
                    { language: 'Chinese (Mandarin)', level: 'Native Fluency', flag: '🇨🇳' },
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'French', level: 'Advanced', flag: '🇫🇷' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼' },
                    { language: 'Swahili', level: 'Intermediate', flag: '🇹🇿' }
                ],
                experience: '8+ years',
                rating: 4.9,
                dailyRate: 220,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/translator-tite_jhjuqj.jpg',
                certifications: [
                    'Certified Mandarin Translator (CATTI Level 2)',
                    'Tourism Translation Specialist (UNWTO Certified)',
                    'Simultaneous Interpreter (AIIC Trained)',
                    'Legal Translation Certified'
                ],
                bio: `Tite is a professional translator specializing in Chinese (Mandarin) and Kinyarwanda with 8+ years of experience in tourism, business, and diplomatic translation. She studied in China for 4 years and understands both linguistic nuances and cultural contexts deeply.

EDUCATION & QUALIFICATIONS:
• BA Translation Studies, Beijing Language and Culture University
• Advanced Interpretation Course, University of Nairobi
• Tourism Terminology Certification, World Tourism Organization

TRANSLATION SPECIALTIES:
• Simultaneous interpretation for guided tours and safaris
• Document translation (menus, brochures, legal contracts)
• Business meeting interpretation for trade delegations
• Medical terminology translation for health tourism
• Conference interpretation for international events

NOTABLE PROJECTS:
• Official translator for China-Africa Forum 2023
• Interpreted for Chinese infrastructure investment delegations
• Translated Rwanda tourism materials for Chinese market
• Worked with multiple Chinese documentary film crews

Tite has worked with numerous Chinese tour groups, business delegations, and diplomatic missions visiting Rwanda. She is known for her accuracy, professionalism, and ability to bridge cultural gaps effectively while maintaining confidentiality and precision.`,
                availability: 'Available',
                translationSpecialties: [
                    'Tour guiding interpretation',
                    'Business negotiations',
                    'Medical translation',
                    'Legal documents',
                    'Conference interpretation'
                ],
                education: 'BA Translation Studies, Beijing Language and Culture University',
                notableClients: [
                    'Rwanda Development Board',
                    'Chinese Embassy in Rwanda',
                    'Multiple Fortune 500 Chinese companies',
                    'International conservation organizations'
                ]
            },
            {
                _id: 'translator-roberto-lateif',
                name: 'Roberto Lateif',
                specialty: 'Multilingual Diplomatic Translator',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧' },
                    { language: 'Arabic', level: 'Native', flag: '🇸🇦' },
                    { language: 'Portuguese', level: 'Fluent', flag: '🇵🇹' },
                    { language: 'Swahili', level: 'Advanced', flag: '🇹🇿' },
                    { language: 'French', level: 'Intermediate', flag: '🇫🇷' },
                    { language: 'Spanish', level: 'Intermediate', flag: '🇪🇸' }
                ],
                experience: '12+ years',
                rating: 4.8,
                dailyRate: 280,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/translator-roberto_yxtxfz.jpg',
                certifications: [
                    'Certified Arabic Translator (UN Standards)',
                    'UN Interpreter Certified',
                    'Legal Translation Specialist',
                    'Diplomatic Protocol Training'
                ],
                bio: `Roberto is a highly experienced multilingual translator with over 12 years of professional translation experience across Africa, the Middle East, and Europe. He specializes in Arabic, Portuguese, and English translations for tourism, business, and diplomatic purposes.

PROFESSIONAL BACKGROUND:
• Linguistics Degree, University of Nairobi
• UN Interpretation Training, Geneva
• Diplomatic Protocol Course, Ethiopian Foreign Ministry

SPECIALIZED SERVICES:
• Diplomatic and embassy interpretation
• Legal and contract translation for international agreements
• Tourism and hospitality interpretation for luxury clients
• Conference simultaneous interpretation
• Media and press interpretation

INTERNATIONAL EXPERIENCE:
• UN Conference Interpreter for 5+ years
• Official translator for African Union summits
• Worked with multiple Middle Eastern royal families
• Translated for major hotel chains across Africa

Roberto has worked with international organizations, embassies, and major tourism companies throughout his career. His extensive experience includes interpreting for high-level diplomatic meetings, translating complex legal documents, and providing interpretation services for luxury tourism experiences across the continent.`,
                availability: 'Available on request',
                translationSpecialties: [
                    'Diplomatic interpretation',
                    'Legal document translation',
                    'Conference interpretation',
                    'Tourism material localization',
                    'Media and press interpretation'
                ],
                education: 'BA Linguistics, University of Nairobi',
                notableClients: [
                    'United Nations agencies',
                    'African Union Commission',
                    'Multiple Arab and European embassies',
                    'International luxury hotel chains',
                    'Major tourism development projects'
                ]
            }
        ]
    };

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentWelcomeIndex = 0;
    let preloadedTripPlanModal = null;
    let hasShownWelcome = false;
    let imageCache = new Map();
    let allItemsCache = {
        destinations: [],
        accommodations: [],
        blogPosts: [],
        guides: [],
        translators: []
    };

    // ===============================
    // GLOBAL FUNCTIONS (Exported to window)
    // ===============================
    window.closeModal = function() {
        const modal = document.getElementById('modal-container');
        if (modal) {
            modal.classList.remove('active');
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
                document.body.style.overflow = '';
            }, 300);
        }
    };

    window.showTripPlanningModal = function() {
        showTripPlanningModal();
    };

    // ===============================
    // UI UTILITIES
    // ===============================
    
    function showNotification(message, type = 'info', duration = 3000, title = null) {
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type} show`;
        
        const iconMap = {
            'success': 'fa-check-circle',
            'error': 'fa-exclamation-circle',
            'warning': 'fa-exclamation-triangle',
            'info': 'fa-info-circle',
            'welcome': 'fa-star'
        };
        
        const icon = iconMap[type] || 'fa-info-circle';
        
        notification.innerHTML = `
            <div class="notification-content">
                <div class="notification-icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="notification-body">
                    ${title ? `<div class="notification-title">${title}</div>` : ''}
                    <div class="notification-message">${message}</div>
                </div>
                <button class="notification-close" aria-label="Close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        const removeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        };
        
        setTimeout(removeNotification, duration);
        notification.querySelector('.notification-close').addEventListener('click', removeNotification);
    }

    function validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePhone(phone) {
        return /^[+]?[0-9\s\-\(\)]{10,}$/.test(phone);
    }

    function showLoading(element, show = true) {
        if (!element) return;
        
        if (show) {
            const originalText = element.innerHTML;
            element.dataset.originalContent = originalText;
            element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
            element.disabled = true;
        } else {
            if (element.dataset.originalContent) {
                element.innerHTML = element.dataset.originalContent;
            }
            element.disabled = false;
        }
    }

    function showLoadingSpinner(container) {
        const spinnerId = `spinner-${Date.now()}`;
        const spinnerHTML = `
            <div id="${spinnerId}" class="loading-container">
                <div class="spinner"></div>
            </div>
        `;
        
        if (container) {
            container.innerHTML = spinnerHTML;
        }
        
        return spinnerId;
    }

    function hideLoadingSpinner(spinnerId) {
        const spinner = document.getElementById(spinnerId);
        if (spinner) {
            spinner.remove();
        }
    }

    // ===============================
    // IMAGE HANDLING FUNCTIONS
    // ===============================
    function getImageUrl(imagePath, type = 'destination') {
        if (!imagePath || imagePath === '#' || imagePath === '') {
            return config.fallbackImages[type];
        }
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        return imagePath;
    }

    // ===============================
    // ENHANCED BIO MODAL FUNCTIONS
    // ===============================
    
    function showGuideBio(guideId) {
        const guide = seedData.guides.find(g => g._id === guideId) || 
                     allItemsCache.guides.find(g => g._id === guideId || g.id === guideId);
        
        if (!guide) {
            showNotification('Guide details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-user-tie"></i> ${guide.name}</h2>
                    <div class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${guide.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${guide.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${guide.rating || 4.5}</span>
                    </div>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="bio-header">
                        <div class="bio-avatar">
                            <img src="${getImageUrl(guide.image, 'guide')}" 
                                 alt="${guide.name}" 
                                 loading="lazy"
                                 width="150" 
                                 height="150">
                        </div>
                        <div class="bio-summary">
                            <div class="price-tag-large"><i class="fas fa-dollar-sign"></i> $${guide.dailyRate || 100}/day</div>
                            <div class="availability ${guide.availability ? 'available' : 'unavailable'}">
                                <i class="fas fa-circle"></i> ${guide.availability || 'Check Availability'}
                            </div>
                            ${guide.toursConducted ? `
                                <div class="stats">
                                    <i class="fas fa-route"></i> ${guide.toursConducted} Tours Conducted
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-user-circle"></i> Professional Bio</h3>
                            <div class="bio-content">${guide.bio ? guide.bio.replace(/\n/g, '<br>') : 'Professional guide with extensive experience in Rwandan tourism.'}</div>
                        </section>
                        
                        <section class="content-section">
                            <h3><i class="fas fa-language"></i> Languages</h3>
                            <div class="languages-detailed">
                                ${guide.languages.map(lang => {
                                    if (typeof lang === 'string') {
                                        return `<span class="language-tag-detailed">${lang}</span>`;
                                    }
                                    return `
                                        <div class="language-item">
                                            <span class="language-flag">${lang.flag || '🌐'}</span>
                                            <div class="language-info">
                                                <div class="language-name">${lang.language}</div>
                                                <div class="language-level">${lang.level}</div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </section>
                        
                        ${guide.certifications && guide.certifications.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-certificate"></i> Certifications</h3>
                            <div class="certifications-list">
                                ${guide.certifications.map(cert => `
                                    <div class="certification-item">
                                        <i class="fas fa-award"></i>
                                        <span>${cert}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${guide.education ? `
                        <section class="content-section">
                            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                            <div class="education-item">
                                <i class="fas fa-university"></i>
                                <span>${guide.education}</span>
                            </div>
                        </section>
                        ` : ''}
                        
                        ${guide.awards && guide.awards.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-trophy"></i> Awards & Recognition</h3>
                            <div class="awards-list">
                                ${guide.awards.map(award => `
                                    <div class="award-item">
                                        <i class="fas fa-medal"></i>
                                        <span>${award}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="guide" 
                                data-id="${guide._id || guide.id}"
                                data-name="${guide.name}">
                            <i class="fas fa-calendar-check"></i> Hire This Guide
                        </button>
                        <button class="btn btn-secondary plan-full-trip">
                            <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('guide', guide._id || guide.id, guide.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showTranslatorBio(translatorId) {
        const translator = seedData.translators.find(t => t._id === translatorId) || 
                         allItemsCache.translators.find(t => t._id === translatorId || t.id === translatorId);
        
        if (!translator) {
            showNotification('Translator details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-language"></i> ${translator.name}</h2>
                    <div class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${translator.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${translator.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${translator.rating || 4.5}</span>
                    </div>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="bio-header">
                        <div class="bio-avatar">
                            <img src="${getImageUrl(translator.image, 'translator')}" 
                                 alt="${translator.name}" 
                                 loading="lazy"
                                 width="150" 
                                 height="150">
                        </div>
                        <div class="bio-summary">
                            <div class="price-tag-large"><i class="fas fa-dollar-sign"></i> $${translator.dailyRate || 120}/day</div>
                            <div class="availability ${translator.availability ? 'available' : 'unavailable'}">
                                <i class="fas fa-circle"></i> ${translator.availability || 'Check Availability'}
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-user-circle"></i> Professional Bio</h3>
                            <div class="bio-content">${translator.bio ? translator.bio.replace(/\n/g, '<br>') : 'Professional translator with extensive experience.'}</div>
                        </section>
                        
                        <section class="content-section">
                            <h3><i class="fas fa-language"></i> Languages</h3>
                            <div class="languages-detailed">
                                ${translator.languages.map(lang => {
                                    if (typeof lang === 'string') {
                                        return `<span class="language-tag-detailed">${lang}</span>`;
                                    }
                                    return `
                                        <div class="language-item">
                                            <span class="language-flag">${lang.flag || '🌐'}</span>
                                            <div class="language-info">
                                                <div class="language-name">${lang.language}</div>
                                                <div class="language-level">${lang.level}</div>
                                            </div>
                                        </div>
                                    `;
                                }).join('')}
                            </div>
                        </section>
                        
                        ${translator.certifications && translator.certifications.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-certificate"></i> Certifications</h3>
                            <div class="certifications-list">
                                ${translator.certifications.map(cert => `
                                    <div class="certification-item">
                                        <i class="fas fa-award"></i>
                                        <span>${cert}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${translator.translationSpecialties && translator.translationSpecialties.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-cogs"></i> Translation Specialties</h3>
                            <div class="specialties-list">
                                ${translator.translationSpecialties.map(specialty => `
                                    <div class="specialty-item">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${specialty}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${translator.education ? `
                        <section class="content-section">
                            <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                            <div class="education-item">
                                <i class="fas fa-university"></i>
                                <span>${translator.education}</span>
                            </div>
                        </section>
                        ` : ''}
                        
                        ${translator.notableClients && translator.notableClients.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-briefcase"></i> Notable Clients</h3>
                            <div class="clients-list">
                                ${translator.notableClients.map(client => `
                                    <div class="client-item">
                                        <i class="fas fa-building"></i>
                                        <span>${client}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="translator" 
                                data-id="${translator._id || translator.id}"
                                data-name="${translator.name}">
                            <i class="fas fa-calendar-check"></i> Hire This Translator
                        </button>
                        <button class="btn btn-secondary plan-full-trip">
                            <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('translator', translator._id || translator.id, translator.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    // ===============================
    // DETAILED VIEW MODALS
    // ===============================
    
    function showDestinationDetails(destinationId) {
        const destination = seedData.destinations.find(d => d._id === destinationId) || 
                          allItemsCache.destinations.find(d => d._id === destinationId || d.id === destinationId);
        
        if (!destination) {
            showNotification('Destination details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> ${destination.name}</h2>
                    <p class="modal-subtitle"><i class="fas fa-map-marker-alt"></i> ${destination.location}</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="destination-hero">
                        <img src="${getImageUrl(destination.mainImage, 'destination')}" 
                             alt="${destination.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-info-circle"></i> Overview</h3>
                            <p class="destination-description">${destination.description}</p>
                            
                            <div class="quick-info">
                                <div class="info-item">
                                    <i class="fas fa-star"></i>
                                    <div>
                                        <div class="info-label">Rating</div>
                                        <div class="info-value">${destination.rating}/5.0</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-calendar-alt"></i>
                                    <div>
                                        <div class="info-label">Best Season</div>
                                        <div class="info-value">${destination.bestSeason}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-clock"></i>
                                    <div>
                                        <div class="info-label">Duration</div>
                                        <div class="info-value">${destination.duration}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-hiking"></i>
                                    <div>
                                        <div class="info-label">Difficulty</div>
                                        <div class="info-value">${destination.difficulty}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        ${destination.highlights && destination.highlights.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-star"></i> Tour Highlights</h3>
                            <div class="highlights">
                                ${destination.highlights.map(highlight => `
                                    <div class="highlight-item">
                                        <i class="fas fa-check"></i>
                                        <span>${highlight}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.activities && destination.activities.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-map-signs"></i> Activities</h3>
                            <div class="activities-grid">
                                ${destination.activities.map(activity => `
                                    <div class="activity-card">
                                        <div class="activity-icon">
                                            <i class="${activity.icon}"></i>
                                        </div>
                                        <div class="activity-content">
                                            <h4>${activity.name}</h4>
                                            <p>${activity.description}</p>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.features && destination.features.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-star"></i> Key Features</h3>
                            <div class="features-list">
                                ${destination.features.map(feature => `
                                    <div class="feature-item">
                                        <div class="feature-name">${feature.name}</div>
                                        <div class="feature-desc">${feature.description}</div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.tags && destination.tags.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-tags"></i> Tags</h3>
                            <div class="tags-container">
                                ${destination.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> 
                                ${destination.basePrice > 0 ? `From $${destination.basePrice} per person` : 'Free Entry'}
                            </div>
                            <p class="price-note">${destination.basePrice > 0 ? 'Prices include permits, guides, and basic amenities' : 'Donations support conservation efforts'}</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="destination" 
                                    data-id="${destination._id || destination.id}"
                                    data-name="${destination.name}">
                                <i class="fas fa-calendar-check"></i> Book Now
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('destination', destination._id || destination.id, destination.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showAccommodationDetails(accommodationId) {
        const accommodation = seedData.accommodations.find(a => a._id === accommodationId) || 
                            allItemsCache.accommodations.find(a => a._id === accommodationId || a.id === accommodationId);
        
        if (!accommodation) {
            showNotification('Accommodation details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-hotel"></i> ${accommodation.name}</h2>
                    <p class="modal-subtitle"><i class="fas fa-map-marker-alt"></i> ${accommodation.location}</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="accommodation-hero">
                        <img src="${getImageUrl(accommodation.mainImage, 'accommodation')}" 
                             alt="${accommodation.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-info-circle"></i> Overview</h3>
                            <p>${accommodation.description}</p>
                            
                            <div class="quick-info">
                                <div class="info-item">
                                    <i class="fas fa-star"></i>
                                    <div>
                                        <div class="info-label">Rating</div>
                                        <div class="info-value">${accommodation.rating}/5.0</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-bed"></i>
                                    <div>
                                        <div class="info-label">Type</div>
                                        <div class="info-value">${accommodation.type}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-users"></i>
                                    <div>
                                        <div class="info-label">Max Guests</div>
                                        <div class="info-value">${accommodation.maxGuests || 2}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-phone"></i>
                                    <div>
                                        <div class="info-label">Contact</div>
                                        <div class="info-value">${accommodation.contactPhone}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        ${accommodation.amenities && accommodation.amenities.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-concierge-bell"></i> Amenities</h3>
                            <div class="amenities-grid">
                                ${accommodation.amenities.map(amenity => `
                                    <div class="amenity-item ${amenity.included ? 'included' : 'not-included'}">
                                        <div class="amenity-icon">
                                            <i class="${amenity.icon}"></i>
                                        </div>
                                        <div class="amenity-content">
                                            <div class="amenity-name">${amenity.name}</div>
                                            <div class="amenity-status">${amenity.included ? 'Included' : 'Not Included'}</div>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${accommodation.roomTypes && accommodation.roomTypes.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-door-open"></i> Room Types</h3>
                            <div class="room-types">
                                ${accommodation.roomTypes.map(room => `
                                    <div class="room-item">
                                        <div class="room-header">
                                            <h4>${room.name}</h4>
                                            <div class="room-price">$${room.price}/night</div>
                                        </div>
                                        <div class="room-details">
                                            <div class="room-capacity">
                                                <i class="fas fa-user-friends"></i>
                                                <span>Capacity: ${room.capacity} guests</span>
                                            </div>
                                            ${room.features ? `
                                            <div class="room-features">
                                                ${room.features.map(feature => `
                                                    <span class="room-feature">${feature}</span>
                                                `).join('')}
                                            </div>
                                            ` : ''}
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${accommodation.features && accommodation.features.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-star"></i> Special Features</h3>
                            <div class="features-list">
                                ${accommodation.features.map(feature => `
                                    <div class="feature-item">
                                        <i class="fas fa-check"></i>
                                        <span>${feature}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> 
                                From $${accommodation.pricePerNight || 0} per night
                            </div>
                            <p class="price-note">Rates vary by season and room type. Contact for special packages.</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="accommodation" 
                                    data-id="${accommodation._id || accommodation.id}"
                                    data-name="${accommodation.name}">
                                <i class="fas fa-calendar-check"></i> Book Now
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('accommodation', accommodation._id || accommodation.id, accommodation.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showBlogDetails(blogId) {
        const blog = seedData.blogPosts.find(b => b._id === blogId) || 
                    allItemsCache.blogPosts.find(b => b._id === blogId || b.id === blogId);
        
        if (!blog) {
            showNotification('Blog post details not found', 'error');
            return;
        }
        
        // Create detailed content based on blog category
        let detailedContent = '';
        
        if (blog.category.includes('Gorilla') || blog.category.includes('Wildlife')) {
            detailedContent = `
                <h3>Complete Guide to Gorilla Trekking in Rwanda</h3>
                
                <p>Rwanda's Volcanoes National Park offers one of the most profound wildlife experiences on Earth. Here's everything you need to know for your gorilla trekking adventure:</p>
                
                <h4>Permits and Planning</h4>
                <p>Gorilla trekking permits cost $1,500 per person and should be booked 6-12 months in advance through the Rwanda Development Board. Each permit allows one hour with the gorillas. We handle all permit applications and logistics for our clients.</p>
                
                <h4>Physical Preparation</h4>
                <ul>
                    <li><strong>Fitness Level:</strong> Moderate to good fitness required (2-6 hours hiking)</li>
                    <li><strong>Altitude:</strong> Trekking occurs at 2,500-4,000 meters</li>
                    <li><strong>Training:</strong> Regular walking/hiking recommended before your trip</li>
                    <li><strong>Age Restrictions:</strong> Minimum age is 15 years</li>
                </ul>
                
                <h4>What to Pack</h4>
                <div class="packing-list">
                    <div class="packing-item">
                        <i class="fas fa-hiking"></i>
                        <span>Waterproof hiking boots</span>
                    </div>
                    <div class="packing-item">
                        <i class="fas fa-tshirt"></i>
                        <span>Layered clothing for changing weather</span>
                    </div>
                    <div class="packing-item">
                        <i class="fas fa-camera"></i>
                        <span>Camera with no flash</span>
                    </div>
                    <div class="packing-item">
                        <i class="fas fa-tint"></i>
                        <span>2 liters of water minimum</span>
                    </div>
                </div>
                
                <h4>Conservation Impact</h4>
                <p>Your $1,500 permit directly funds:
                <br>• 10% to local communities
                <br>• 50% to park management and anti-poaching
                <br>• 40% to national conservation programs</p>
            `;
        } else if (blog.category.includes('Culture')) {
            detailedContent = `
                <h3>Immersive Cultural Experiences in Rwanda</h3>
                
                <p>Beyond the famous gorillas, Rwanda offers rich cultural experiences that connect you with local communities and traditions:</p>
                
                <h4>Traditional Experiences</h4>
                <div class="cultural-experiences">
                    <div class="experience-item">
                        <h5>Iby\'iwacu Cultural Village</h5>
                        <p>Participate in traditional activities: banana beer making, archery, traditional medicine demonstrations, and Intore warrior dances.</p>
                    </div>
                    <div class="experience-item">
                        <h5>King\'s Palace Museum</h5>
                        <p>Visit the reconstructed royal palace, see the famous Inyambo long-horned cows, and learn about Rwanda's monarchy.</p>
                    </div>
                    <div class="experience-item">
                        <h5>Traditional Craft Workshops</h5>
                        <p>Learn traditional crafts like basket weaving (agaseke), pottery, and Imigongo art from master artisans.</p>
                    </div>
                </div>
                
                <h4>Community Tourism</h4>
                <p>We partner with 12 communities across Rwanda to offer authentic experiences:
                <br>• Homestays with local families
                <br>• Community-led village tours
                <br>• Traditional cooking classes
                <br>• School and cooperative visits</p>
                
                <h4>Responsible Cultural Tourism</h4>
                <p>Our cultural tours follow strict ethical guidelines:
                <br>• Fair compensation to communities
                <br>• Respect for cultural protocols
                <br>• Photography only with permission
                <br>• Support for cultural preservation</p>
            `;
        } else {
            detailedContent = `
                <h3>${blog.title}</h3>
                
                <p>${blog.excerpt}</p>
                
                <h4>Key Information</h4>
                <p>Rwanda, known as the "Land of a Thousand Hills," offers diverse experiences from wildlife safaris to cultural immersion. Here are essential tips for your visit:</p>
                
                <div class="travel-tips">
                    <div class="tip-item">
                        <i class="fas fa-passport"></i>
                        <div>
                            <h5>Visa Requirements</h5>
                            <p>Most nationalities can get visa on arrival. East African Tourist Visa available for Rwanda, Uganda, and Kenya.</p>
                        </div>
                    </div>
                    <div class="tip-item">
                        <i class="fas fa-money-bill-wave"></i>
                        <div>
                            <h5>Currency & Costs</h5>
                            <p>Rwandan Franc (RWF) is local currency. Credit cards accepted in cities. Budget $150-300/day excluding gorilla permits.</p>
                        </div>
                    </div>
                    <div class="tip-item">
                        <i class="fas fa-syringe"></i>
                        <div>
                            <h5>Health & Safety</h5>
                            <p>Yellow fever vaccination required. Malaria prophylaxis recommended. Rwanda is one of Africa's safest countries.</p>
                        </div>
                    </div>
                </div>
                
                <h4>Why Choose GoTrip?</h4>
                <div class="benefits">
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Local expert guides with 5+ years experience</span>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Customized itineraries based on your interests</span>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>24/7 customer support throughout your trip</span>
                    </div>
                    <div class="benefit-item">
                        <i class="fas fa-check-circle"></i>
                        <span>Support for local communities and conservation</span>
                    </div>
                </div>
            `;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-newspaper"></i> ${blog.title}</h2>
                    <div class="modal-subtitle">
                        <span><i class="fas fa-user"></i> ${blog.author}</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(blog.publishedDate).toLocaleDateString()}</span>
                        <span><i class="fas fa-clock"></i> ${blog.readTime} min read</span>
                    </div>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="blog-hero">
                        <img src="${getImageUrl(blog.featuredImage, 'blog')}" 
                             alt="${blog.title}" 
                             loading="lazy">
                        <div class="blog-category-large">${blog.category}</div>
                    </div>
                    
                    <div class="blog-content-detailed">
                        <div class="blog-meta-detailed">
                            <div class="author-info">
                                <i class="fas fa-user-circle"></i>
                                <div>
                                    <div class="author-name">${blog.author}</div>
                                    <div class="publish-date">Published on ${new Date(blog.publishedDate).toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}</div>
                                </div>
                            </div>
                            <div class="read-info">
                                <i class="fas fa-clock"></i>
                                <span>${blog.readTime} min read</span>
                            </div>
                        </div>
                        
                        <div class="blog-body">
                            ${detailedContent}
                            
                            <div class="cta-section">
                                <h4>Ready for Your Rwanda Adventure?</h4>
                                <p>Contact our travel experts today to start planning your dream Rwanda trip. We'll create a customized itinerary that matches your interests, budget, and travel style.</p>
                                <p><strong>Email:</strong> info@gotrip.africa<br>
                                <strong>Phone:</strong> +250 787 407 051<br>
                                <strong>Office:</strong> KG 7 Avenue, Kigali, Rwanda</p>
                            </div>
                        </div>
                        
                        ${blog.tags && blog.tags.length > 0 ? `
                        <div class="blog-tags-detailed">
                            <h4>Tags:</h4>
                            <div class="tags-container">
                                ${blog.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary plan-full-trip">
                            <i class="fas fa-map-marked-alt"></i> Plan Your Trip
                        </button>
                        <button class="btn btn-secondary explore-blog" data-page="blog">
                            <i class="fas fa-newspaper"></i> More Articles
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        // Add click events
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
        
        modal.querySelector('.explore-blog')?.addEventListener('click', () => {
            closeModal();
            showPage('blog');
        });
    }

    // ===============================
    // MODAL FUNCTIONS
    // ===============================
    
    function createModal(content) {
        closeModal();
        
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.className = 'modal-container';
        modalContainer.innerHTML = content;
        document.body.appendChild(modalContainer);
        
        const closeBtn = modalContainer.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
        
        setTimeout(() => {
            modalContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        }, 10);
        
        return modalContainer;
    }

    function showBookingModal(serviceType, serviceId, serviceName) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-calendar-check"></i> Book ${serviceName}</h2>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-loading" id="modal-loading" style="display: none;">
                        <div class="loading-container">
                            <div class="spinner"></div>
                        </div>
                    </div>
                    <div id="modal-content">
                        <p>Complete this form to book ${serviceName}. We'll contact you shortly to confirm.</p>
                        <form id="booking-form">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="booking-name">Full Name *</label>
                                    <input type="text" id="booking-name" name="name" required placeholder="Your full name">
                                </div>
                                <div class="form-group">
                                    <label for="booking-email">Email *</label>
                                    <input type="email" id="booking-email" name="email" required placeholder="your.email@example.com">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="booking-phone">Phone Number *</label>
                                    <input type="tel" id="booking-phone" name="phone" required placeholder="+250 78X XXX XXX">
                                </div>
                                <div class="form-group">
                                    <label for="booking-date">Preferred Date *</label>
                                    <input type="date" id="booking-date" name="date" required min="${minDate}">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="booking-message">Additional Details</label>
                                <textarea id="booking-message" name="message" placeholder="Any special requests or requirements..." rows="4"></textarea>
                            </div>
                            <input type="hidden" name="serviceType" value="${serviceType}">
                            <input type="hidden" name="serviceId" value="${serviceId}">
                            <input type="hidden" name="serviceName" value="${serviceName}">
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-large">
                                    <i class="fas fa-paper-plane"></i> Submit Booking Request
                                </button>
                                <button type="button" class="btn btn-outline" onclick="closeModal()">
                                    <i class="fas fa-times"></i> Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#booking-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (!data.name || !data.email || !data.phone || !data.date) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!validatePhone(data.phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            // Simulate API call
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            setTimeout(() => {
                showNotification('Booking request submitted successfully! We\'ll contact you within 24 hours.', 'success');
                showLoading(submitBtn, false);
                closeModal();
            }, 1500);
        });
    }

    // ===============================
    // ENHANCED TRIP PLANNING MODAL
    // ===============================
    
    function showTripPlanningModal() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-content professional-trip-plan">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> Plan Your Rwanda Adventure</h2>
                    <p class="modal-subtitle">Tell us about your dream trip and we'll create a customized itinerary</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="trip-plan-form">
                        <!-- Personal Information -->
                        <div class="form-section">
                            <h3><i class="fas fa-user-circle"></i> Personal Information</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-name">Full Name *</label>
                                    <input type="text" id="trip-name" name="name" required placeholder="Your full name">
                                </div>
                                <div class="form-group">
                                    <label for="trip-email">Email Address *</label>
                                    <input type="email" id="trip-email" name="email" required placeholder="your.email@example.com">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-phone">Phone Number *</label>
                                    <input type="tel" id="trip-phone" name="phone" required placeholder="+250 78X XXX XXX">
                                </div>
                                <div class="form-group">
                                    <label for="trip-nationality">Nationality *</label>
                                    <input type="text" id="trip-nationality" name="nationality" required placeholder="e.g., American, British, Canadian">
                                </div>
                            </div>
                        </div>
                        
                        <!-- Trip Details -->
                        <div class="form-section">
                            <h3><i class="fas fa-calendar-alt"></i> Trip Details</h3>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-start">Arrival Date *</label>
                                    <input type="date" id="trip-start" name="startDate" required min="${minDate}">
                                </div>
                                <div class="form-group">
                                    <label for="trip-end">Departure Date *</label>
                                    <input type="date" id="trip-end" name="endDate" required min="${minDate}">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="trip-travelers">Number of Travelers *</label>
                                    <input type="number" id="trip-travelers" name="travelers" min="1" max="20" value="2" required>
                                </div>
                                <div class="form-group">
                                    <label for="trip-budget">Estimated Budget per Person *</label>
                                    <select id="trip-budget" name="budget" required>
                                        <option value="">Select budget range...</option>
                                        <option value="budget">Budget ($800 - $1,500)</option>
                                        <option value="standard">Standard ($1,500 - $3,000)</option>
                                        <option value="premium">Premium ($3,000 - $5,000)</option>
                                        <option value="luxury">Luxury ($5,000+)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Interests -->
                        <div class="form-section">
                            <h3><i class="fas fa-heart"></i> Interests</h3>
                            <div class="interests-grid">
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="gorilla-trekking">
                                    <span>Gorilla Trekking</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="wildlife-safari">
                                    <span>Wildlife Safari</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="cultural-tours">
                                    <span>Cultural Tours</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="hiking">
                                    <span>Hiking & Trekking</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="relaxation">
                                    <span>Relaxation</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="photography">
                                    <span>Photography</span>
                                </label>
                            </div>
                        </div>
                        
                        <!-- Message -->
                        <div class="form-section">
                            <h3><i class="fas fa-edit"></i> Additional Information</h3>
                            <div class="form-group">
                                <label for="trip-message">Tell us about your dream trip *</label>
                                <textarea id="trip-message" name="message" required placeholder="What are you most excited about? Any specific experiences you're looking for?" rows="6"></textarea>
                            </div>
                        </div>
                        
                        <!-- Submit -->
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary btn-large">
                                <i class="fas fa-paper-plane"></i> Submit Trip Request
                            </button>
                            <button type="button" class="btn btn-outline" onclick="closeModal()">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#trip-plan-form');
        
        // Set end date minimum based on start date
        const startDateInput = form.querySelector('#trip-start');
        const endDateInput = form.querySelector('#trip-end');
        
        startDateInput.addEventListener('change', () => {
            endDateInput.min = startDateInput.value;
            if (endDateInput.value && endDateInput.value < startDateInput.value) {
                endDateInput.value = startDateInput.value;
            }
        });
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (!data.name || !data.email || !data.phone || !data.nationality || 
                !data.startDate || !data.endDate || !data.travelers || !data.budget || !data.message) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            if (!validatePhone(data.phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            if (new Date(data.endDate) < new Date(data.startDate)) {
                showNotification('Departure date must be after arrival date', 'error');
                return;
            }
            
            // Simulate API call
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            setTimeout(() => {
                showNotification('Trip plan submitted successfully! Our travel expert will contact you within 24 hours.', 'success');
                showLoading(submitBtn, false);
                closeModal();
            }, 1500);
        });
    }

    // ===============================
    // ENHANCED RENDER FUNCTIONS
    // ===============================
    
    function renderDestinations(destinations, container, isHome = false) {
        if (!destinations || destinations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-map-marked-alt"></i>
                    <h3>No destinations available</h3>
                    <p>Check back soon for amazing Rwanda destinations!</p>
                </div>
            `;
            return;
        }
        
        // For home page, show 4 destinations; for full page, show all
        const displayDestinations = isHome ? destinations.slice(0, 4) : destinations;
        
        container.innerHTML = displayDestinations.map(dest => {
            const itemId = dest._id || dest.id || Math.random().toString();
            const name = dest.name || 'Amazing Destination';
            const location = dest.location || 'Rwanda';
            const description = dest.description || 'Experience the beauty of Rwanda';
            const rating = dest.rating || 4.5;
            const price = dest.basePrice || dest.price || 0;
            const imageUrl = getImageUrl(dest.mainImage, 'destination');
            
            return `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="500" 
                         height="300">
                    ${rating ? `<div class="destination-rating"><i class="fas fa-star"></i> ${rating}</div>` : ''}
                </div>
                <div class="destination-content">
                    <h3>${name}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${location}
                    </div>
                    <p class="destination-description">${description.substring(0, 100)}...</p>
                    <div class="destination-features">
                        ${dest.tags ? dest.tags.slice(0, 3).map(tag => 
                            `<span class="feature"><i class="fas fa-check"></i>${tag}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${price > 0 ? `$${price}` : 'Free Entry'}</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${itemId}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }
    
    function renderGuides(guides, container) {
        if (!guides || guides.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-user-tie"></i>
                    <h3>No guides available</h3>
                    <p>Our expert guides will be listed here soon!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = guides.map(guide => {
            const itemId = guide._id || guide.id || Math.random().toString();
            const name = guide.name || 'Professional Guide';
            const specialty = guide.specialty || 'Tour Guide';
            const languages = guide.languages || [{language: 'English'}, {language: 'Kinyarwanda'}];
            const experience = guide.experience || 'Experienced guide';
            const rating = guide.rating || 4.5;
            const dailyRate = guide.dailyRate || 100;
            const imageUrl = getImageUrl(guide.image, 'guide');
            
            return `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${name}</h3>
                    <p class="specialty">${specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${Array.isArray(languages) ? languages.slice(0, 3).map(lang => {
                                const langName = typeof lang === 'object' ? lang.language : lang;
                                return `<span class="language-tag">${langName}</span>`;
                            }).join('') : ''}
                            ${languages.length > 3 ? `<span class="language-tag more">+${languages.length - 3}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(rating))}<span>${rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> $${dailyRate}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="guide" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-user-check"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-bio" data-id="${itemId}">
                            <i class="fas fa-user-circle"></i> View Bio
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }
    
    function renderTranslators(translators, container) {
        if (!translators || translators.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-language"></i>
                    <h3>No translators available</h3>
                    <p>Our professional translators will be listed here soon!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = translators.map(translator => {
            const itemId = translator._id || translator.id || Math.random().toString();
            const name = translator.name || 'Professional Translator';
            const specialty = translator.specialty || 'Translator';
            const languages = translator.languages || [{language: 'English'}, {language: 'French'}, {language: 'Kinyarwanda'}];
            const experience = translator.experience || 'Experienced translator';
            const rating = translator.rating || 4.5;
            const dailyRate = translator.dailyRate || 100;
            const imageUrl = getImageUrl(translator.image, 'translator');
            
            return `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${name}</h3>
                    <p class="specialty">${specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${Array.isArray(languages) ? languages.slice(0, 3).map(lang => {
                                const langName = typeof lang === 'object' ? lang.language : lang;
                                return `<span class="language-tag">${langName}</span>`;
                            }).join('') : ''}
                            ${languages.length > 3 ? `<span class="language-tag more">+${languages.length - 3}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(rating))}<span>${rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> $${dailyRate}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="translator" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-language"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-bio" data-id="${itemId}">
                            <i class="fas fa-user-circle"></i> View Bio
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }

    function renderAccommodations(accommodations, container) {
        if (!accommodations || accommodations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-hotel"></i>
                    <h3>No accommodations available</h3>
                    <p>Check back soon for amazing places to stay in Rwanda!</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = accommodations.map(acc => {
            const itemId = acc._id || acc.id || Math.random().toString();
            const name = acc.name || 'Comfortable Accommodation';
            const type = acc.type || 'Hotel';
            const location = acc.location || 'Rwanda';
            const description = acc.description || 'Comfortable accommodation for your stay';
            const pricePerNight = acc.pricePerNight || acc.dailyRate || 150;
            const rating = acc.rating || 4.5;
            const imageUrl = getImageUrl(acc.mainImage, 'accommodation');
            
            return `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${imageUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    ${rating ? `<div class="accommodation-rating"><i class="fas fa-star"></i> ${rating}</div>` : ''}
                </div>
                <div class="accommodation-content">
                    <span class="type">${type}</span>
                    <h3>${name}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${location}
                    </div>
                    <p>${description.substring(0, 120)}...</p>
                    <div class="features">
                        ${acc.amenities ? acc.amenities.slice(0, 3).map(amenity => 
                            `<span class="feature-tag">${amenity.name}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> $${pricePerNight}/night</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="accommodation" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-more" 
                                data-id="${itemId}">
                            <i class="fas fa-info-circle"></i> View Details
                        </button>
                    </div>
                </div>
            </div>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }

    function renderBlogPosts(blogPosts, container, isHome = false) {
        if (!blogPosts || blogPosts.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-newspaper"></i>
                    <h3>No blog posts available</h3>
                    <p>Check back soon for travel tips and Rwanda insights!</p>
                </div>
            `;
            return;
        }
        
        // For home page, show 3 posts; for full page, show all
        const displayPosts = isHome ? blogPosts.slice(0, 3) : blogPosts;
        
        container.innerHTML = displayPosts.map(post => {
            const itemId = post._id || post.id || Math.random().toString();
            const title = post.title || 'Interesting Article';
            const category = post.category || 'Travel';
            const date = post.publishedDate || post.date ? new Date(post.publishedDate || post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : 'Recent';
            const readTime = post.readTime || '5 min read';
            const excerpt = post.excerpt || post.description || 'Read our latest article';
            const author = post.author || 'Go Trip Team';
            const imageUrl = getImageUrl(post.featuredImage, 'blog');
            
            return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${imageUrl}" 
                         alt="${title}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    <span class="blog-category">${category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date"><i class="fas fa-calendar"></i> ${date}</span>
                        <span class="blog-read-time">${readTime}</span>
                    </div>
                    <h3>${title}</h3>
                    <p class="blog-excerpt">${excerpt.substring(0, 120)}...</p>
                    <div class="author">
                        <i class="fas fa-user"></i> ${author}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-primary read-more" 
                                data-id="${itemId}">
                            <i class="fas fa-book-open"></i> Read More
                        </button>
                    </div>
                </div>
            </article>
        `}).join('');
        
        attachEventListenersToContainer(container);
    }

    function attachEventListenersToContainer(container) {
        // Book now buttons
        container.querySelectorAll('.book-now').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const type = button.dataset.type;
                const id = button.dataset.id;
                const name = button.dataset.name;
                if (type && id && name) {
                    showBookingModal(type, id, name);
                }
            });
        });
        
        // View bio buttons for guides
        container.querySelectorAll('.view-bio').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    const card = button.closest('.guide-card, .translator-card');
                    if (card && card.classList.contains('guide-card')) {
                        showGuideBio(id);
                    } else {
                        showTranslatorBio(id);
                    }
                }
            });
        });
        
        // View details buttons for destinations
        container.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    showDestinationDetails(id);
                }
            });
        });
        
        // View more buttons for accommodations
        container.querySelectorAll('.view-more').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    showAccommodationDetails(id);
                }
            });
        });
        
        // Read more buttons for blogs
        container.querySelectorAll('.read-more').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                if (id) {
                    showBlogDetails(id);
                }
            });
        });
    }

    // ===============================
    // ADD ENHANCED CSS STYLES
    // ===============================
    function addEnhancedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Enhanced Modal Styles */
            .modal-subtitle {
                color: #666;
                font-size: 0.95rem;
                margin-top: 5px;
                display: flex;
                align-items: center;
                gap: 15px;
                flex-wrap: wrap;
            }
            
            .modal-subtitle span {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .bio-header {
                display: flex;
                align-items: center;
                gap: 25px;
                padding: 20px;
                background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
                border-radius: 12px;
                margin-bottom: 25px;
            }
            
            @media (max-width: 768px) {
                .bio-header {
                    flex-direction: column;
                    text-align: center;
                    gap: 15px;
                }
            }
            
            .bio-avatar {
                flex-shrink: 0;
            }
            
            .bio-avatar img {
                width: 150px;
                height: 150px;
                border-radius: 50%;
                object-fit: cover;
                border: 5px solid white;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            @media (max-width: 480px) {
                .bio-avatar img {
                    width: 120px;
                    height: 120px;
                }
            }
            
            .bio-summary {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 12px;
            }
            
            .price-tag-large {
                font-size: 24px;
                font-weight: 700;
                color: #2E7D32;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            @media (max-width: 480px) {
                .price-tag-large {
                    font-size: 20px;
                }
            }
            
            .availability {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 6px 12px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 500;
                width: fit-content;
            }
            
            .availability.available {
                background: #d1fae5;
                color: #065f46;
            }
            
            .availability.unavailable {
                background: #fef3c7;
                color: #92400e;
            }
            
            .stats {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #4b5563;
                font-size: 14px;
            }
            
            .content-sections {
                margin-bottom: 25px;
            }
            
            .content-section {
                margin-bottom: 25px;
            }
            
            .content-section h3 {
                font-size: 18px;
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .content-section h3 i {
                color: #2E7D32;
            }
            
            .bio-content {
                line-height: 1.8;
                color: #374151;
                font-size: 15px;
                white-space: pre-line;
            }
            
            .languages-detailed {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 12px;
                margin-top: 15px;
            }
            
            @media (max-width: 768px) {
                .languages-detailed {
                    grid-template-columns: 1fr;
                }
            }
            
            .language-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: white;
                border-radius: 8px;
                border: 1px solid #e5e7eb;
                transition: transform 0.2s;
            }
            
            .language-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .language-flag {
                font-size: 24px;
            }
            
            .language-info {
                flex: 1;
            }
            
            .language-name {
                font-weight: 600;
                color: #1f2937;
                margin-bottom: 4px;
            }
            
            .language-level {
                font-size: 12px;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .certifications-list,
            .education-item {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin-top: 15px;
            }
            
            .certification-item,
            .education-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 10px;
                background: #f9fafb;
                border-radius: 6px;
                border-left: 3px solid #2E7D32;
            }
            
            .certification-item i,
            .education-item i {
                color: #2E7D32;
                width: 20px;
            }
            
            .modal-actions {
                display: flex;
                gap: 12px;
                padding-top: 25px;
                border-top: 1px solid #e5e7eb;
            }
            
            @media (max-width: 768px) {
                .modal-actions {
                    flex-direction: column;
                }
            }
            
            .modal-actions .btn {
                flex: 1;
            }
            
            /* Destination Details Styles */
            .destination-hero,
            .accommodation-hero,
            .blog-hero {
                width: 100%;
                height: 250px;
                overflow: hidden;
                border-radius: 12px;
                margin-bottom: 25px;
            }
            
            .destination-hero img,
            .accommodation-hero img,
            .blog-hero img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
            
            .quick-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            
            @media (max-width: 480px) {
                .quick-info {
                    grid-template-columns: 1fr;
                }
            }
            
            .info-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .info-item i {
                font-size: 20px;
                color: #2E7D32;
            }
            
            .info-label {
                font-size: 12px;
                color: #64748b;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            
            .info-value {
                font-size: 14px;
                font-weight: 600;
                color: #1e293b;
            }
            
            .activities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            @media (max-width: 768px) {
                .activities-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            .activity-card {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 15px;
                background: white;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            
            .activity-card:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            
            .activity-icon {
                width: 40px;
                height: 40px;
                background: #2E7D32;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .activity-content h4 {
                font-size: 16px;
                margin: 0 0 5px 0;
                color: #1e293b;
            }
            
            .activity-content p {
                font-size: 14px;
                color: #64748b;
                margin: 0;
            }
            
            .features-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 12px;
                margin-top: 10px;
            }
            
            @media (max-width: 768px) {
                .features-list {
                    grid-template-columns: 1fr;
                }
            }
            
            .feature-item {
                padding: 12px;
                background: #f8fafc;
                border-radius: 6px;
                border-left: 3px solid #2E7D32;
            }
            
            .feature-name {
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 4px;
            }
            
            .feature-desc {
                font-size: 14px;
                color: #64748b;
            }
            
            .highlights {
                margin-top: 15px;
            }
            
            .highlight-item {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 8px 0;
            }
            
            .highlight-item i {
                color: #2E7D32;
            }
            
            .tags-container {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                margin-top: 10px;
            }
            
            .tag {
                padding: 6px 12px;
                background: #e0f2fe;
                color: #0369a1;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 500;
            }
            
            .price-section {
                margin-bottom: 20px;
            }
            
            .price-note {
                color: #666;
                font-size: 14px;
                margin-top: 5px;
            }
            
            .action-buttons {
                display: flex;
                gap: 12px;
            }
            
            @media (max-width: 768px) {
                .action-buttons {
                    flex-direction: column;
                }
            }
            
            /* Amenities Grid */
            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            @media (max-width: 768px) {
                .amenities-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            .amenity-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .amenity-item.included {
                border-left: 3px solid #2E7D32;
            }
            
            .amenity-item.not-included {
                border-left: 3px solid #d1d5db;
                opacity: 0.7;
            }
            
            .amenity-icon {
                width: 40px;
                height: 40px;
                background: #e0f2fe;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: #0369a1;
                font-size: 18px;
                flex-shrink: 0;
            }
            
            .amenity-item.not-included .amenity-icon {
                background: #f3f4f6;
                color: #6b7280;
            }
            
            .amenity-content {
                flex: 1;
            }
            
            .amenity-name {
                font-weight: 600;
                color: #1e293b;
                margin-bottom: 4px;
            }
            
            .amenity-status {
                font-size: 12px;
                padding: 2px 8px;
                border-radius: 4px;
                display: inline-block;
            }
            
            .amenity-item.included .amenity-status {
                background: #d1fae5;
                color: #065f46;
            }
            
            .amenity-item.not-included .amenity-status {
                background: #f3f4f6;
                color: #6b7280;
            }
            
            /* Room Types */
            .room-types {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-top: 15px;
            }
            
            .room-item {
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .room-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 10px;
            }
            
            .room-header h4 {
                margin: 0;
                font-size: 16px;
            }
            
            .room-price {
                font-size: 18px;
                font-weight: 700;
                color: #2E7D32;
            }
            
            .room-details {
                font-size: 14px;
                color: #666;
            }
            
            .room-capacity {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            /* Blog Details */
            .blog-category-large {
                position: absolute;
                top: 15px;
                left: 15px;
                background: #2E7D32;
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-size: 14px;
                font-weight: 600;
            }
            
            .blog-meta-detailed {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid #e5e7eb;
                flex-wrap: wrap;
                gap: 15px;
            }
            
            .author-info {
                display: flex;
                align-items: center;
                gap: 12px;
            }
            
            .author-info i {
                font-size: 40px;
                color: #666;
            }
            
            .author-name {
                font-weight: 600;
                color: #1f2937;
            }
            
            .publish-date {
                font-size: 14px;
                color: #666;
            }
            
            .read-info {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #666;
            }
            
            .blog-excerpt-detailed {
                font-size: 18px;
                line-height: 1.6;
                color: #374151;
                margin-bottom: 25px;
                padding-bottom: 25px;
                border-bottom: 1px solid #e5e7eb;
            }
            
            .blog-body {
                line-height: 1.8;
                color: #374151;
            }
            
            .blog-body h3,
            .blog-body h4 {
                color: #1f2937;
                margin-top: 25px;
                margin-bottom: 15px;
            }
            
            .blog-body ul,
            .blog-body ol {
                margin-left: 20px;
                margin-bottom: 20px;
            }
            
            .blog-body li {
                margin-bottom: 8px;
            }
            
            .packing-list,
            .cultural-experiences,
            .travel-tips {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin: 20px 0;
            }
            
            .packing-item,
            .experience-item,
            .tip-item {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 15px;
                background: #f8fafc;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .packing-item i,
            .tip-item i {
                color: #2E7D32;
                font-size: 20px;
                margin-top: 2px;
            }
            
            .experience-item h5 {
                margin: 0 0 8px 0;
                color: #1f2937;
            }
            
            .tip-item h5 {
                margin: 0 0 5px 0;
                color: #1f2937;
            }
            
            .benefits {
                display: flex;
                flex-direction: column;
                gap: 10px;
                margin: 20px 0;
            }
            
            .benefit-item {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .benefit-item i {
                color: #2E7D32;
            }
            
            .cta-section {
                background: #f0f9ff;
                padding: 20px;
                border-radius: 8px;
                margin: 25px 0;
                border-left: 4px solid #2E7D32;
            }
            
            .blog-tags-detailed {
                margin-top: 25px;
                padding-top: 25px;
                border-top: 1px solid #e5e7eb;
            }
            
            .blog-tags-detailed h4 {
                margin-bottom: 10px;
                color: #1f2937;
            }
            
            /* Trip Planning Form */
            .professional-trip-plan .form-section {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 10px;
                padding: 25px;
                margin-bottom: 25px;
            }
            
            @media (max-width: 768px) {
                .professional-trip-plan .form-section {
                    padding: 15px;
                }
            }
            
            .professional-trip-plan .form-section h3 {
                margin-top: 0;
                margin-bottom: 20px;
                color: #1f2937;
                font-size: 18px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .interests-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 10px;
                margin-top: 10px;
            }
            
            @media (max-width: 768px) {
                .interests-grid {
                    grid-template-columns: 1fr;
                }
            }
            
            .interest-checkbox {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px;
                background: #f9fafb;
                border-radius: 6px;
                border: 1px solid #e5e7eb;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .interest-checkbox:hover {
                background: #f1f5f9;
                border-color: #cbd5e1;
            }
            
            .interest-checkbox input[type="checkbox"] {
                width: 16px;
                height: 16px;
                accent-color: #2E7D32;
            }
            
            .form-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
            }
            
            @media (max-width: 768px) {
                .form-actions {
                    flex-direction: column;
                }
            }
            
            .form-actions .btn {
                flex: 1;
            }
        `;
        document.head.appendChild(style);
    }

    // ===============================
    // EVENT HANDLERS
    // ===============================
    
    function setupEventListeners() {
        // Navigation
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('.nav-link') || target.closest('.nav-link')) {
                e.preventDefault();
                const navLink = target.matches('.nav-link') ? target : target.closest('.nav-link');
                const page = navLink.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.service-link') || target.closest('.service-link')) {
                e.preventDefault();
                const serviceLink = target.matches('.service-link') ? target : target.closest('.service-link');
                const page = serviceLink.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.explore-destinations-btn') || target.closest('.explore-destinations-btn')) {
                e.preventDefault();
                showPage('destinations');
            }
            
            if (target.matches('.plan-trip-nav-btn, .plan-trip-hero-btn') || 
                target.closest('.plan-trip-nav-btn, .plan-trip-hero-btn')) {
                e.preventDefault();
                showTripPlanningModal();
            }
            
            if (target.matches('.logo')) {
                e.preventDefault();
                showPage('home');
            }
            
            if (target.matches('.footer-links a[data-page]') || target.closest('.footer-links a[data-page]')) {
                e.preventDefault();
                const link = target.matches('a') ? target : target.closest('a');
                const page = link.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.footer-link')) {
                e.preventDefault();
                const action = target.dataset.action;
                if (action === 'privacy' || action === 'terms') {
                    showNotification(`${action === 'privacy' ? 'Privacy Policy' : 'Terms of Service'} page coming soon!`, 'info');
                }
            }
        });
        
        // Mobile menu
        const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const name = contactForm.querySelector('#contact-name').value.trim();
                const email = contactForm.querySelector('#contact-email').value.trim();
                const subject = contactForm.querySelector('#contact-subject').value.trim();
                const message = contactForm.querySelector('#contact-message').value.trim();
                
                if (!name || !email || !subject || !message) {
                    showNotification('Please fill all fields', 'error');
                    return;
                }
                
                if (!validateEmail(email)) {
                    showNotification('Please enter a valid email', 'error');
                    return;
                }
                
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                showLoading(submitBtn, true);
                
                setTimeout(() => {
                    showNotification('Message sent successfully! We\'ll respond within 24 hours.', 'success');
                    contactForm.reset();
                    showLoading(submitBtn, false);
                }, 1500);
            });
        }
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
            const navLinks = document.getElementById('nav-links');
            
            if (navLinks && navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            const navLinks = document.getElementById('nav-links');
            const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
            
            if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===============================
    // PAGE MANAGEMENT
    // ===============================
    
    function showPage(pageId) {
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');
            
            // Load content if not already loaded
            if (!targetPage.dataset.loaded) {
                loadPageContent(pageId);
                targetPage.dataset.loaded = 'true';
            }
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu if open
        const mobileMenu = document.getElementById('nav-links');
        const mobileBtn = document.getElementById('mobile-menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (mobileBtn) mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    async function loadPageContent(pageId) {
        try {
            switch(pageId) {
                case 'home':
                    await loadHomePage();
                    break;
                case 'destinations':
                    await loadDestinationsPage();
                    break;
                case 'guides':
                    await loadGuidesPage();
                    break;
                case 'translators':
                    await loadTranslatorsPage();
                    break;
                case 'accommodations':
                    await loadAccommodationsPage();
                    break;
                case 'blog':
                    await loadBlogPage();
                    break;
            }
        } catch (error) {
            console.error(`Error loading ${pageId}:`, error);
            showNotification(`Error loading ${pageId} content`, 'error');
        }
    }
    
    async function loadHomePage() {
        const destinationsGrid = document.getElementById('destinations-section');
        if (destinationsGrid) {
            try {
                const spinnerId = showLoadingSpinner(destinationsGrid);
                // Simulate API call delay
                setTimeout(() => {
                    hideLoadingSpinner(spinnerId);
                    const featured = seedData.destinations.slice(0, 4);
                    renderDestinations(featured, destinationsGrid, true);
                }, 500);
            } catch (error) {
                const fallback = seedData.destinations.slice(0, 4);
                renderDestinations(fallback, destinationsGrid, true);
            }
        }
    }
    
    async function loadDestinationsPage() {
        const grid = document.getElementById('destinations-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderDestinations(seedData.destinations, grid, false);
            }, 500);
        } catch (error) {
            renderDestinations(seedData.destinations, grid, false);
        }
    }
    
    async function loadGuidesPage() {
        const grid = document.getElementById('guides-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderGuides(seedData.guides, grid);
            }, 500);
        } catch (error) {
            renderGuides(seedData.guides, grid);
        }
    }
    
    async function loadTranslatorsPage() {
        const grid = document.getElementById('translators-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderTranslators(seedData.translators, grid);
            }, 500);
        } catch (error) {
            renderTranslators(seedData.translators, grid);
        }
    }
    
    async function loadAccommodationsPage() {
        const grid = document.getElementById('accommodations-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderAccommodations(seedData.accommodations, grid);
            }, 500);
        } catch (error) {
            renderAccommodations(seedData.accommodations, grid);
        }
    }
    
    async function loadBlogPage() {
        const grid = document.getElementById('blog-section-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                renderBlogPosts(seedData.blogPosts, grid, false);
            }, 500);
        } catch (error) {
            renderBlogPosts(seedData.blogPosts, grid, false);
        }
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing Go Trip Application v5.3');
        
        // Add enhanced styles
        addEnhancedStyles();
        
        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Initialize UI components
        setupEventListeners();
        
        // Load initial page
        showPage('home');
        
        // Show welcome message after delay
        setTimeout(() => {
            showNotification('Welcome to GoTrip! Experience authentic Rwandan culture and adventure.', 'info', 5000, 'Welcome!');
        }, 1000);
        
        console.log('✅ Application initialized successfully');
    }

    // ===============================
    // EXPORT TO WINDOW
    // ===============================
    window.GoTrip = {
        showPage,
        showNotification,
        showTripPlanningModal,
        showBookingModal,
        closeModal,
        showGuideBio,
        showTranslatorBio,
        showDestinationDetails,
        showAccommodationDetails,
        showBlogDetails
    };

    // ===============================
    // START APPLICATION
    // ===============================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        setTimeout(initializeApp, 100);
    }
})();