// GoTrip Professional Travel Application v7.0
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        debug: true,
        
        // Form submission endpoint
        formspreeEndpoint: 'https://formspree.io/f/xlggdeal',
        
        // Company information
        companyInfo: {
            name: 'GoTrip',
            email: 'info@gotrip.africa',
            phone: '+250787407051',
            address: 'KN 5 Rd, Kigali, Rwanda',
            workingHours: 'Mon-Fri 8:00 AM - 6:00 PM CAT'
        },
        
        // Fallback images
        fallbackImages: {
            destination: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/destination-fallback_uo8qya.jpg',
            guide: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/guide-fallback_pfdjqp.jpg',
            translator: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/translator-fallback_h4hvpj.jpg',
            accommodation: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/accommodation-fallback_qijjhm.jpg',
            blog: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-fallback_tkz4cm.jpg'
        },
        
        // Currency settings
        currency: {
            symbol: '',
            code: 'USD'
        }
    };

    // ===============================
    // ENHANCED SEED DATA
    // ===============================
    const seedData = {
        destinations: [
            {
                _id: 'rw-volcanoes-park',
                name: 'Volcanoes National Park',
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
                tags: ['Wildlife', 'Adventure', 'Gorillas', 'UNESCO', 'Photography', 'Conservation', 'Volcanoes']
            },
            {
                _id: 'rw-nyungwe-forest',
                name: 'Nyungwe National Park',
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
                tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy', 'Eco-Tourism', 'UNESCO']
            },
            {
                _id: 'rw-akagera-park',
                name: 'Akagera National Park',
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
                tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography', 'Conservation', 'Birding']
            },
            {
                _id: 'rw-lake-kivu',
                name: 'Lake Kivu',
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
                tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports', 'Culture', 'Coffee']
            },
            {
                _id: 'rw-kigali-city',
                name: 'Kigali City',
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
                tags: ['City', 'Culture', 'History', 'Food', 'Art', 'Modern Rwanda', 'Urban']
            },
            {
                _id: 'rw-kings-palace-museum',
                name: 'King\'s Palace Museum',
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
                tags: ['Culture', 'History', 'Royalty', 'Traditional', 'Museum', 'Performance', 'Heritage']
            }
        ],
        
        accommodations: [
            {
                _id: 'acc-one-only-gorillas-nest',
                name: 'One&Only Gorilla\'s Nest',
                location: 'Volcanoes National Park, Musanze',
                type: 'Luxury Lodge',
                description: 'An exclusive luxury lodge nestled in the foothills of the Virunga volcanoes, offering unparalleled gorilla trekking access. The lodge combines contemporary luxury with authentic Rwandan design, featuring 21 forest-facing rooms and suites with private decks, fireplaces, and stunning volcano views.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654351/one-and-only-kinigi_sgleyo.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'info@gotrip.africa',
                maxGuests: 2,
                sustainability: 'Carbon-neutral operations, solar-powered, supports local communities'
            },
            {
                _id: 'acc-kigali-marriott',
                name: 'Kigali Marriott Hotel',
                location: 'Kigali City Center',
                type: '5-Star Hotel',
                description: 'Located in the heart of Kigali\'s business district, the Marriott offers 254 rooms and suites with panoramic city views. The hotel features Rwanda\'s largest ballroom, multiple dining options, and direct access to Kigali Convention Centre. Ideal for business travelers and luxury seekers.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664108/Marriott-Hotel-Kigali-Rwanda-Safaris_8__Tett-Safaris_v78edy.webp',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'info@gotrip.africa',
                maxGuests: 4,
                sustainability: 'LEED-certified building, water recycling system, local employment focus'
            },
            {
                _id: 'acc-nyungwe-house',
                name: 'Nyungwe House',
                location: 'Nyungwe National Park',
                type: 'Boutique Lodge',
                description: 'Perched on the edge of Nyungwe Forest at 2,500 meters, this luxury eco-lodge offers stunning canopy views and exclusive chimpanzee trekking access. The lodge features 24 rooms designed with local materials, each offering private terraces overlooking the rainforest.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654350/one-only-nyungwe-house_oezq87.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'info@gotrip.africa',
                maxGuests: 3,
                sustainability: 'Solar-powered, rainwater harvesting, supports forest conservation'
            },
            {
                _id: 'acc-lake-kivu-serena',
                name: 'Lake Kivu Serena Hotel',
                location: 'Gisenyi, Lake Kivu',
                type: 'Resort Hotel',
                description: 'Located on the shores of Lake Kivu, this resort offers direct beach access, water sports, and stunning sunset views. The property features 66 rooms and suites with lake views, multiple dining options, and extensive recreational facilities.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654353/aeriel-view-serena_cuohuj.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'info@gotrip.africa',
                maxGuests: 4,
                sustainability: 'Waste management program, local community engagement, eco-friendly practices'
            },
            {
                _id: 'acc-akagera-game-lodge',
                name: 'Akagera Game Lodge',
                location: 'Akagera National Park',
                type: 'Safari Lodge',
                description: 'The only lodge inside Akagera National Park, offering authentic safari experience with wildlife viewing from your balcony. Overlooking Lake Ihema, the lodge features 60 rooms, a waterhole frequented by wildlife, and direct access to game drives.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349192/Akagera-Game-Lodge-Terrasse-upstairs-113-min_rofnsc.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'info@gotrip.africa',
                maxGuests: 3,
                sustainability: 'Supports park conservation, employs local guides, eco-friendly operations'
            },
            {
                _id: 'acc-ubumwe-hotel',
                name: 'Ubumwe Grande Hotel',
                location: 'Kigali Heights',
                type: 'Business Hotel',
                description: 'Modern business hotel in Kigali\'s commercial district, offering excellent conference facilities and city access. The hotel features 82 rooms, extensive meeting spaces, and convenient access to government offices and business centers.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349335/facade_fc6shj.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'info@gotrip.africa',
                maxGuests: 2,
                sustainability: 'Energy-efficient systems, local procurement policy, community partnerships'
            }
        ],
        
        blogPosts: [
            {
                _id: 'blog-gorilla-trekking-guide',
                title: 'Ultimate Guide to Gorilla Trekking in Rwanda: Everything You Need to Know',
                author: 'Dr. Patience Rutayisire',
                authorRole: 'Senior Wildlife Specialist & Conservationist',
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
                publishedDate: '2026-01-15',
                tags: ['Gorilla Trekking', 'Wildlife', 'Conservation', 'Volcanoes National Park', 'Photography', 'Permits']
            },
            {
                _id: 'blog-rwanda-itinerary-7days',
                title: '7-Day Ultimate Rwanda Itinerary: Gorillas, Culture & Nature',
                author: 'Marie Claire Uwimana',
                authorRole: 'Senior Tour Designer & Cultural Expert',
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
                publishedDate: '2026-01-14',
                tags: ['Itinerary', 'Travel Planning', 'Gorillas', 'Lake Kivu', 'Cultural Tourism', 'Logistics']
            },
            {
                _id: 'blog-cultural-experiences-rwanda',
                title: 'Cultural Experiences in Rwanda: Beyond Gorilla Trekking',
                author: 'Celestin Hagenimana',
                authorRole: 'Cultural Heritage Specialist',
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
                publishedDate: '2026-01-13',
                tags: ['Culture', 'Tradition', 'Community', 'Heritage', 'Cuisine', 'Arts']
            },
            {
                _id: 'blog-best-time-visit-rwanda',
                title: 'Best Time to Visit Rwanda: Seasonal Guide & Climate Tips',
                author: 'Weather & Travel Experts',
                authorRole: 'Meteorological & Tourism Specialists',
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
                publishedDate: '2026-01-05',
                tags: ['Seasons', 'Climate', 'Weather', 'Best Time', 'Planning', 'Activities']
            },
            {
                _id: 'blog-rwanda-conservation-success',
                title: 'Rwanda\'s Conservation Success Story: From Tragedy to Triumph',
                author: 'Patience Rutayisire',
                authorRole: 'Conservation Director',
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
                publishedDate: '2026-01-15',
                tags: ['Conservation', 'Wildlife', 'Sustainability', 'Community', 'Environment', 'Success']
            },
            {
                _id: 'blog-rwandan-cuisine-guide',
                title: 'Rwandan Cuisine Guide: Traditional Foods & Dining Experiences',
                author: 'Culinary Tourism Team',
                authorRole: 'Food & Culture Experts',
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
                publishedDate: '2026-01-12',
                tags: ['Food', 'Cuisine', 'Dining', 'Traditional', 'Cooking', 'Beverages']
            }
        ],
        
        guides: [
            {
                _id: 'guide-patience-rutayisire',
                name: 'Mr. Patience Rutayisire',
                specialty: 'Wildlife & Gorilla Trekking',
                biography: 'With over 8 years of experience in wildlife conservation and gorilla research, Dr. Rutayisire holds a PhD in Primatology from University of Rwanda. She has published 12 research papers on gorilla behavior and conservation, and leads training programs for new guides. Her work with the Dian Fossey Gorilla Fund has contributed significantly to gorilla population recovery.',
                languages: [
                    { language: 'English', level: 'Native Fluency', flag: '🇬🇧', certification: 'TOEFL 120/120' },
                    { language: 'German', level: 'Fluent', flag: '🇩🇪', certification: 'Goethe C1' },
                    { language: 'Spanish', level: 'Advanced', flag: '🇪🇸', certification: 'DELE B2' },
                    { language: 'French', level: 'Fluent', flag: '🇫🇷', certification: 'DALF C1' },
                    { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳', certification: 'HSK 5' },
                    { language: 'Swahili', level: 'Native', flag: '🇹🇿', certification: '' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', certification: '' }
                ],
                experience: '8+ years of guiding and research',
                rating: 4.9,
                dailyRate: 150,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png',
                certifications: [
                    'Gorilla Trekking Professional',
                    'Wilderness First Responder (WFR)',
                    'Bird Watching Professional',
                    'Professional Photography Guide',
                    'Business and conference Interpretation',
                    'Cultural Heritage Interpretation - UNESCO'
                ],
                education: [
                    'BA in Communications studies - University of Rwanda',
                    'Diploma in Wildlife Conservation - Cornell University',
                    'Certificate in Tourism Management - Cornell University'
                ],
                specialties: [
                    'Gorilla Behavior & Ecology',
                    'Wildlife Photography Guidance',
                    'Conservation Education',
                    'High-Altitude Trekking'
                ]
            },
            {
                _id: 'guide-celestin-hagenimana',
                name: 'Mr. Celestin Hagenimana',
                specialty: 'Cultural & Historical Guide',
                biography: 'Celestin brings 3+ years of specialized experience in Rwandan cultural heritage and historical interpretation. Fluent in multiple languages including Mandarin, he has guided diplomatic delegations, academic researchers, and cultural exchange groups. His deep knowledge of Rwanda\'s history from pre-colonial times to present day provides visitors with profound cultural insights.',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧', certification: 'IELTS 8.0' },
                    { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳', certification: 'HSK 4' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', certification: '' }                    
                ],
                experience: '3+ years of cultural guiding',
                rating: 4.8,
                dailyRate: 100,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664106/zhenfei_dvbmas.jpg',
                certifications: [
                    'Cultural Heritage Specialist',
                    'Historical Tour Guide',
                    'Community Tourism Professional',
                    'Language Interpretation Professional',
                    'HR analyst and Business Consultant'
                ],
                education: [
                    'MBA in Business and Human Resource Management- University of Rwanda',
                    'BA in Business Administration -University of Rwanda'
                ],
                specialties: [
                    'Royal History & Traditions',
                    'Cultural Performance Interpretation',
                    'Community Engagement',
                    'Historical Site Interpretation'
                ]
            }
        ],
        
        translators: [
            {
                _id: 'translator-tite-iradukunda',
                name: 'Mr. Tite Iradukunda',
                specialty: 'Chinese & Kinyarwanda Translator',
                biography: 'Tite is a highly specialized translator with native fluency in Mandarin Chinese and Kinyarwanda. With 5+ years of experience working with Chinese investors, diplomatic missions, and medical teams in Rwanda, he has developed expertise in technical, business, and medical translation. His work has facilitated major infrastructure projects and international agreements.',
                languages: [
                    { language: 'Chinese (Mandarin)', level: 'Native Fluency', flag: '🇨🇳', certification: 'HSK Level 6 (Highest)' },
                    { language: 'English', level: 'Fluent', flag: '🇬🇧', certification: 'TOEIC 950/990' },
                    { language: 'French', level: 'Advanced', flag: '🇫🇷', certification: 'DALF C1' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', certification: '' }                    
                ],
                experience: '5+ years of professional translation',
                rating: 4.9,
                dailyRate: 120,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767698065/di-li-bo_mfkxlk.jpg',
                certifications: [
                    'Certified Mandarin Translator (HSK Level 5)',                    
                    'Legal Translation',
                    'Simultaneous Interpreter - UN Standards',
                    'Business Consulting Translation'
                ],
                education: [
                    'BBA -University of Rwanda',
                    'Certified in Chinese Language & Literature - University of Rwanda'
                ],
                specialties: [
                    'Business & Investment Translation',
                    'Medical & Healthcare Interpretation',
                    'Legal Document Translation',
                    'Technical Manual Translation'
                ],
                notableProjects: [
                    'China-Rwanda Infrastructure Agreements',
                    'Medical Team Interpretations',
                    'International Conference Simultaneous Interpretation'
                ]
            },
            {
                _id: 'translator-roberto-lateif',
                name: 'Roberto Lateif',
                specialty: 'Multilingual Translator',
                biography: 'Roberto brings 8+ years of experience in diplomatic and high-level translation services. Fluent in 6 languages including Arabic and Portuguese, he has worked with UN agencies, diplomatic missions, and international corporations. His expertise in legal and diplomatic translation has facilitated major international agreements and high-level meetings.',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧', certification: 'Cambridge CPE' },
                    { language: 'Arabic', level: 'Native', flag: '🇸🇦', certification: '' },
                    { language: 'Portuguese', level: 'Fluent', flag: '🇵🇹', certification: 'CELPE-Bras' },
                    { language: 'Swahili', level: 'Advanced', flag: '🇹🇿', certification: '' },
                    { language: 'French', level: 'Intermediate', flag: '🇫🇷', certification: 'DELF B2' },
                    { language: 'Spanish', level: 'Intermediate', flag: '🇪🇸', certification: 'DELE B1' }
                ],
                experience: '8+ years of diplomatic translation',
                rating: 4.8,
                dailyRate: 180,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767668483/roberto_eyubfo.png',
                certifications: [
                    'Certified Arabic Translator (UN Standards)',
                    'UN Interpreter Certified',
                    'Legal Translation Specialist',
                    'Diplomatic Protocol Training',
                    'Conference Interpretation'
                ],
                education: [
                    'MA in International Relations - University of Nairobi',
                    'BA in Translation & Interpretation - University of Khartoum'
                ],
                specialties: [
                    'Diplomatic Protocol & Interpretation',
                    'Legal Document Translation',
                    'International Conference Interpretation',
                    'Business Negotiation Translation'
                ],
                notableProjects: [
                    'UN Peacekeeping Mission Translations',
                    'African Union Summit Interpretations',
                    'International Trade Agreement Translations'
                ]
            }
        ]
    };

    // ===============================
    // UTILITY FUNCTIONS
    // ===============================
    
    function showNotification(message, type = 'info', duration = 4000, title = null) {
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        
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
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        const removeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
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
            element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            element.disabled = true;
            element.style.opacity = '0.7';
        } else {
            if (element.dataset.originalContent) {
                element.innerHTML = element.dataset.originalContent;
            }
            element.disabled = false;
            element.style.opacity = '1';
        }
    }

    function showLoadingSpinner(container) {
        if (!container) return null;
        
        const spinnerId = `spinner-${Date.now()}`;
        const spinnerHTML = `
            <div id="${spinnerId}" class="loading-container">
                <div class="spinner"></div>
                <p class="loading-text">Loading content...</p>
            </div>
        `;
        
        container.innerHTML = spinnerHTML;
        return spinnerId;
    }

    function hideLoadingSpinner(spinnerId) {
        const spinner = document.getElementById(spinnerId);
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }

    function getImageUrl(imagePath, type = 'destination') {
        if (!imagePath || imagePath === '#' || imagePath === '') {
            return config.fallbackImages[type] || config.fallbackImages.destination;
        }
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        return imagePath;
    }

    function formatPrice(amount) {
        if (amount === 0 || amount === '0') return 'Free';
        return `${config.currency.symbol}${amount.toLocaleString()}`;
    }

    // ===============================
    // FORM SUBMISSION FUNCTION
    // ===============================
    
    async function submitFormToEmail(formData, formType = 'contact') {
        try {
            let emailSubject = 'GoTrip Form Submission';
            let submissionData = {
                _subject: emailSubject,
                _replyto: formData.email || '',
                name: formData.name || '',
                email: formData.email || '',
                phone: formData.phone || '',
                message: formData.message || '',
                form_type: formType
            };
            
            // Customize based on form type
            switch(formType) {
                case 'booking':
                    emailSubject = `Booking Request: ${formData.serviceName || 'Service'}`;
                    submissionData._subject = emailSubject;
                    submissionData.service_type = formData.serviceType || '';
                    submissionData.service_name = formData.serviceName || '';
                    submissionData.preferred_date = formData.date || '';
                    submissionData.participants = formData.participants || '';
                    break;
                    
                case 'trip-plan':
                    emailSubject = 'Trip Planning Request';
                    submissionData._subject = emailSubject;
                    submissionData.start_date = formData.startDate || '';
                    submissionData.end_date = formData.endDate || '';
                    submissionData.travelers = formData.travelers || '';
                    submissionData.budget = formData.budget || '';
                    submissionData.nationality = formData.nationality || '';
                    submissionData.interests = formData.interests || '';
                    break;
                    
                case 'contact':
                    emailSubject = formData.subject || 'Contact Form Submission';
                    submissionData._subject = emailSubject;
                    submissionData.subject = formData.subject || '';
                    break;
            }
            
            // Send to Formspree
            const response = await fetch(config.formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });
            
            if (response.ok) {
                return { 
                    success: true, 
                    message: 'Thank you! Your message has been sent successfully. We will respond within 24 hours.' 
                };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            return { 
                success: false, 
                message: 'Sorry, there was an error sending your message. Please try again or contact us directly at info@gotrip.africa' 
            };
        }
    }

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentPage = 'home';
    let imageCache = new Map();

    // ===============================
    // SEO-FRIENDLY PAGE MANAGEMENT
    // ===============================
    
    function navigateTo(pageId) {
        // Validate page exists
        const validPages = ['home', 'destinations', 'guides', 'translators', 'accommodations', 'blog', 'contact'];
        if (!validPages.includes(pageId)) {
            pageId = 'home';
        }
        
        // Update URL without hash for SEO
        const pageTitle = pageId.charAt(0).toUpperCase() + pageId.slice(1);
        const url = pageId === 'home' ? '/' : `/${pageId}`;
        
        // Update browser history and URL
        window.history.pushState({ pageId, title: `GoTrip - ${pageTitle}` }, '', url);
        
        // Update page title for SEO
        document.title = `GoTrip - ${pageTitle} | Premium Rwanda Tour Operator`;
        
        // Show the page
        showPage(pageId);
    }

    function showPage(pageId) {
        // Update current page
        currentPage = pageId;
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 10);
            
            // Load content if not already loaded
            if (!targetPage.dataset.loaded) {
                loadPageContent(pageId);
                targetPage.dataset.loaded = 'true';
            }
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const linkPage = href === '/' ? 'home' : href.replace('/', '');
            if (linkPage === pageId) {
                link.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.pageId) {
            showPage(event.state.pageId);
            if (event.state.title) {
                document.title = event.state.title;
            }
        } else {
            // Parse current URL
            const path = window.location.pathname;
            const pageId = path === '/' || path === '' ? 'home' : path.replace('/', '');
            navigateTo(pageId);
        }
    });

    // Handle direct URL access
    function handleInitialPageLoad() {
        const path = window.location.pathname;
        const pageId = path === '/' || path === '' ? 'home' : path.replace('/', '');
        
        // Validate page exists
        const validPages = ['home', 'destinations', 'guides', 'translators', 'accommodations', 'blog', 'contact'];
        const targetPageId = validPages.includes(pageId) ? pageId : 'home';
        
        // Set initial state
        const pageTitle = targetPageId.charAt(0).toUpperCase() + targetPageId.slice(1);
        window.history.replaceState(
            { pageId: targetPageId, title: `GoTrip - ${pageTitle}` },
            '',
            targetPageId === 'home' ? '/' : `/${targetPageId}`
        );
        
        document.title = `GoTrip - ${pageTitle} | Premium Rwanda Tour Operator`;
        showPage(targetPageId);
    }

    // ===============================
    // PROFESSIONAL MOBILE MENU
    // ===============================
    function initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');
        const menuIcon = document.getElementById('menu-icon');

        if (!mobileMenuBtn || !navLinks || !menuIcon) return;

        const toggleMenu = (forceClose = false) => {
            const isExpanding = forceClose ? false : !navLinks.classList.contains('active');
            
            if (isExpanding) {
                // Open menu
                navLinks.classList.add('active');
                mobileMenuBtn.classList.add('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
                
                // Add overlay
                let overlay = document.querySelector('.mobile-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'mobile-overlay';
                    document.body.appendChild(overlay);
                }
                overlay.classList.add('active');
                
                // Close overlay click
                overlay.onclick = () => toggleMenu(true);
                
            } else {
                // Close menu
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
                
                // Remove overlay
                const overlay = document.querySelector('.mobile-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    setTimeout(() => {
                        if (overlay.parentNode) {
                            overlay.parentNode.removeChild(overlay);
                        }
                    }, 300);
                }
            }
        };

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu(true);
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });
    }

    // ===============================
    // GLOBAL FUNCTIONS
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

    function showDestinationDetails(destinationId) {
        const destination = seedData.destinations.find(d => d._id === destinationId);
        if (!destination) {
            showNotification('Destination details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> ${destination.name}</h2>
                    <p class="modal-subtitle">
                        <span><i class="fas fa-map-marker-alt"></i> ${destination.location}</span>
                        <span><i class="fas fa-star"></i> ${destination.rating}/5.0</span>
                        <span><i class="fas fa-hiking"></i> ${destination.difficulty}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="destination-hero">
                        <img src="${getImageUrl(destination.mainImage, 'destination')}" 
                             alt="${destination.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="professional-bio">
                        <div class="bio-avatar-large">
                            <img src="${getImageUrl(destination.mainImage, 'destination')}" 
                                 alt="${destination.name}" 
                                 loading="lazy">
                        </div>
                        <div class="bio-details">
                            <h3>${destination.name}</h3>
                            <div class="bio-description">${destination.description}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-calendar-alt"></i> Best Season</h4>
                                    <p>${destination.bestSeason}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-clock"></i> Duration</h4>
                                    <p>${destination.duration}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-users"></i> Group Size</h4>
                                    <p>${destination.groupSize || 'Flexible'}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-file-alt"></i> Permits</h4>
                                    <p>${destination.permitsRequired ? 'Required' : 'Not Required'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ${destination.highlights && destination.highlights.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-star"></i> Tour Highlights</h3>
                        <div class="highlights-grid">
                            ${destination.highlights.map(highlight => `
                                <div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${highlight}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${destination.activities && destination.activities.length > 0 ? `
                    <div class="content-section">
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
                    </div>
                    ` : ''}
                    
                    ${destination.conservationInfo ? `
                    <div class="content-section">
                        <h3><i class="fas fa-leaf"></i> Conservation Impact</h3>
                        <div class="conservation-info">
                            <p>${destination.conservationInfo}</p>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> 
                                ${destination.basePrice > 0 ? `From ${formatPrice(destination.basePrice)} per person` : 'Free Entry'}
                            </div>
                            <p class="price-note">${destination.basePrice > 0 ? 'Prices include permits, expert guides, and conservation fees' : 'Donations support conservation efforts'}</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="destination" 
                                    data-id="${destination._id}"
                                    data-name="${destination.name}">
                                <i class="fas fa-calendar-check"></i> Book This Experience
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('destination', destination._id, destination.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showProfessionalGuideModal(guideId) {
        const guide = seedData.guides.find(g => g._id === guideId);
        if (!guide) {
            showNotification('Guide details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-user-tie"></i> ${guide.name}</h2>
                    <p class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${guide.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${guide.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${guide.rating}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="professional-bio">
                        <div class="bio-avatar-large">
                            <img src="${getImageUrl(guide.image, 'guide')}" 
                                 alt="${guide.name}" 
                                 loading="lazy">
                        </div>
                        <div class="bio-details">
                            <h3>${guide.name}</h3>
                            <div class="bio-title">${guide.specialty}</div>
                            <div class="bio-description">${guide.biography}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                                    ${guide.education ? guide.education.map(edu => `<p>${edu}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-award"></i> Specialties</h4>
                                    ${guide.specialties ? guide.specialties.map(spec => `<p>${spec}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <h3><i class="fas fa-language"></i> Language Proficiency</h3>
                        <div class="language-proficiency">
                            ${guide.languages.map(lang => `
                                <div class="language-item">
                                    <div class="language-flag">${lang.flag}</div>
                                    <div class="language-info">
                                        <div class="language-name">${lang.language}</div>
                                        <div class="language-level">${lang.level} ${lang.certification ? `<span class="language-certification">${lang.certification}</span>` : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    ${guide.certifications && guide.certifications.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-certificate"></i> Certifications</h3>
                        <div class="certifications-grid">
                            ${guide.certifications.map(cert => `
                                <div class="certification-item">
                                    <i class="fas fa-certificate"></i>
                                    <span>${cert}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> From ${formatPrice(guide.dailyRate)} per day
                            </div>
                            <p class="price-note">Rate includes guide services, local knowledge, and equipment as needed</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="guide" 
                                    data-id="${guide._id}"
                                    data-name="${guide.name}">
                                <i class="fas fa-user-check"></i> Hire This Guide
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('guide', guide._id, guide.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showProfessionalTranslatorModal(translatorId) {
        const translator = seedData.translators.find(t => t._id === translatorId);
        if (!translator) {
            showNotification('Translator details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-language"></i> ${translator.name}</h2>
                    <p class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${translator.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${translator.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${translator.rating}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="professional-bio">
                        <div class="bio-avatar-large">
                            <img src="${getImageUrl(translator.image, 'translator')}" 
                                 alt="${translator.name}" 
                                 loading="lazy">
                        </div>
                        <div class="bio-details">
                            <h3>${translator.name}</h3>
                            <div class="bio-title">${translator.specialty}</div>
                            <div class="bio-description">${translator.biography}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                                    ${translator.education ? translator.education.map(edu => `<p>${edu}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-award"></i> Specialties</h4>
                                    ${translator.specialties ? translator.specialties.map(spec => `<p>${spec}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <h3><i class="fas fa-language"></i> Language Proficiency</h3>
                        <div class="language-proficiency">
                            ${translator.languages.map(lang => `
                                <div class="language-item">
                                    <div class="language-flag">${lang.flag}</div>
                                    <div class="language-info">
                                        <div class="language-name">${lang.language}</div>
                                        <div class="language-level">${lang.level} ${lang.certification ? `<span class="language-certification">${lang.certification}</span>` : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    ${translator.certifications && translator.certifications.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-certificate"></i> Certifications</h3>
                        <div class="certifications-grid">
                            ${translator.certifications.map(cert => `
                                <div class="certification-item">
                                    <i class="fas fa-certificate"></i>
                                    <span>${cert}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${translator.notableProjects && translator.notableProjects.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-briefcase"></i> Notable Projects</h3>
                        <div class="projects-grid">
                            ${translator.notableProjects.map(project => `
                                <div class="project-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${project}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> From ${formatPrice(translator.dailyRate)} per day
                            </div>
                            <p class="price-note">Rate includes translation services, preparation time, and equipment</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="translator" 
                                    data-id="${translator._id}"
                                    data-name="${translator.name}">
                                <i class="fas fa-language"></i> Hire This Translator
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('translator', translator._id, translator.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showAccommodationDetails(accommodationId) {
        const accommodation = seedData.accommodations.find(a => a._id === accommodationId);
        if (!accommodation) {
            showNotification('Accommodation details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-hotel"></i> ${accommodation.name}</h2>
                    <p class="modal-subtitle">
                        <span><i class="fas fa-map-marker-alt"></i> ${accommodation.location}</span>
                        <span><i class="fas fa-star"></i> ${accommodation.rating}/5.0</span>
                        <span><i class="fas fa-bed"></i> ${accommodation.type}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="accommodation-hero">
                        <img src="${getImageUrl(accommodation.mainImage, 'accommodation')}" 
                             alt="${accommodation.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="professional-bio">
                        <div class="bio-details">
                            <h3>${accommodation.name}</h3>
                            <div class="bio-title">${accommodation.type}</div>
                            <div class="bio-description">${accommodation.description}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-phone"></i> Contact</h4>
                                    <p>${accommodation.contactPhone}</p>
                                    <p>${accommodation.contactEmail}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-users"></i> Capacity</h4>
                                    <p>Maximum ${accommodation.maxGuests} guests</p>
                                </div>
                                ${accommodation.sustainability ? `
                                <div class="detail-card">
                                    <h4><i class="fas fa-leaf"></i> Sustainability</h4>
                                    <p>${accommodation.sustainability}</p>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    ${accommodation.amenities && accommodation.amenities.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-concierge-bell"></i> Amenities & Services</h3>
                        <div class="amenities-grid">
                            ${accommodation.amenities.map(amenity => `
                                <div class="amenity-item ${amenity.included ? 'included' : 'not-included'}">
                                    <div class="amenity-icon">
                                        <i class="${amenity.icon}"></i>
                                    </div>
                                    <div class="amenity-content">
                                        <div class="amenity-name">${amenity.name}</div>
                                        <div class="amenity-status">${amenity.included ? '<i class="fas fa-check"></i> Included' : '<i class="fas fa-times"></i> Not Included'}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> From ${formatPrice(accommodation.pricePerNight)} per night
                            </div>
                            <p class="price-note">Rates vary by season and room type. Contact for special packages and long-stay discounts.</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="accommodation" 
                                    data-id="${accommodation._id}"
                                    data-name="${accommodation.name}">
                                <i class="fas fa-calendar-check"></i> Book This Accommodation
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('accommodation', accommodation._id, accommodation.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showBlogDetails(blogId) {
        const blog = seedData.blogPosts.find(b => b._id === blogId);
        if (!blog) {
            showNotification('Blog post details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-newspaper"></i> ${blog.title}</h2>
                    <div class="modal-subtitle">
                        <span><i class="fas fa-user"></i> ${blog.author} - ${blog.authorRole}</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
                                    <div class="author-role">${blog.authorRole}</div>
                                    <div class="publish-date">Published on ${new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            </div>
                            <div class="read-info">
                                <i class="fas fa-clock"></i>
                                <span>${blog.readTime} min read</span>
                            </div>
                        </div>
                        
                        <div class="blog-excerpt-large">
                            <p>${blog.excerpt}</p>
                        </div>
                        
                        <div class="blog-article-content">
                            ${blog.content}
                        </div>
                        
                        ${blog.tags && blog.tags.length > 0 ? `
                        <div class="blog-tags-detailed">
                            <h4><i class="fas fa-tags"></i> Tags:</h4>
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
                        <button class="btn btn-secondary explore-blog" onclick="GoTrip.navigateTo('blog'); return false;">
                            <i class="fas fa-newspaper"></i> More Articles
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
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
                    <p>Complete this form to request booking for ${serviceName}. Our team will contact you within 24 hours to confirm availability and provide payment details.</p>
                    <form id="booking-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-name">Full Name *</label>
                                <input type="text" id="booking-name" name="name" required placeholder="Your full name">
                            </div>
                            <div class="form-group">
                                <label for="booking-email">Email Address *</label>
                                <input type="email" id="booking-email" name="email" required placeholder="your.email@example.com">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-phone">Phone Number *</label>
                                <input type="tel" id="booking-phone" name="phone" required placeholder="+250 78X XXX XXX">
                            </div>
                            <div class="form-group">
                                <label for="booking-date">Preferred Start Date *</label>
                                <input type="date" id="booking-date" name="date" required min="${minDate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="booking-participants">Number of Participants</label>
                            <input type="number" id="booking-participants" name="participants" min="1" max="20" value="1">
                        </div>
                        <div class="form-group">
                            <label for="booking-message">Additional Requirements</label>
                            <textarea id="booking-message" name="message" placeholder="Any special requests, dietary requirements, or specific needs..." rows="4"></textarea>
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
            
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            try {
                const result = await submitFormToEmail(data, 'booking');
                if (result.success) {
                    showNotification(result.message, 'success');
                    closeModal();
                    form.reset();
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                showNotification('Error submitting form. Please try again.', 'error');
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    function showTripPlanningModal() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-content professional-trip-plan">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> Plan Your Rwanda Adventure</h2>
                    <p class="modal-subtitle">Tell us about your dream trip and our experts will create a customized itinerary</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="trip-plan-form">
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
                                    <select id="trip-travelers" name="travelers" required>
                                        <option value="">Select number...</option>
                                        <option value="1">1 Traveler</option>
                                        <option value="2" selected>2 Travelers</option>
                                        <option value="3">3 Travelers</option>
                                        <option value="4">4 Travelers</option>
                                        <option value="5-8">5-8 Travelers</option>
                                        <option value="9+">9+ Travelers (Group)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="trip-budget">Estimated Budget per Person *</label>
                                    <select id="trip-budget" name="budget" required>
                                        <option value="">Select budget range...</option>
                                        <option value="budget">Budget (${formatPrice(800)} - ${formatPrice(1500)})</option>
                                        <option value="standard">Standard (${formatPrice(1500)} - ${formatPrice(3000)})</option>
                                        <option value="premium">Premium (${formatPrice(3000)} - ${formatPrice(5000)})</option>
                                        <option value="luxury">Luxury (${formatPrice(5000)}+)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3><i class="fas fa-heart"></i> Interests & Activities</h3>
                            <div class="interests-grid">
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="gorilla-trekking" checked>
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
                                    <input type="checkbox" name="interests" value="hiking-trekking">
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
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="bird-watching">
                                    <span>Bird Watching</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="adventure-sports">
                                    <span>Adventure Sports</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3><i class="fas fa-edit"></i> Additional Information</h3>
                            <div class="form-group">
                                <label for="trip-message">Tell us about your dream trip *</label>
                                <textarea id="trip-message" name="message" required placeholder="What are you most excited about? Any specific experiences you're looking for? Special requirements?" rows="6"></textarea>
                            </div>
                        </div>
                        
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
            
            // Get selected interests
            const interests = [];
            form.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
                interests.push(checkbox.value);
            });
            data.interests = interests.join(', ');
            
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
            
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            try {
                const result = await submitFormToEmail(data, 'trip-plan');
                if (result.success) {
                    showNotification(result.message, 'success');
                    closeModal();
                    form.reset();
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                showNotification('Error submitting form. Please try again.', 'error');
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    // ===============================
    // RENDER FUNCTIONS
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
        
        const displayDestinations = isHome ? destinations.slice(0, 7) : destinations;
        
        container.innerHTML = displayDestinations.map(dest => {
            return `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${getImageUrl(dest.mainImage, 'destination')}" 
                         alt="${dest.name}" 
                         loading="lazy"
                         width="500" 
                         height="300">
                    <div class="destination-rating"><i class="fas fa-star"></i> ${dest.rating}</div>
                </div>
                <div class="destination-content">
                    <h3>${dest.name}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${dest.location}
                    </div>
                    <p class="destination-description">${dest.description.substring(0, 220)}...</p>
                    <div class="destination-features">
                        ${dest.tags ? dest.tags.slice(0, 4).map(tag => 
                            `<span class="feature"><i class="fas fa-check"></i>${tag}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${dest.basePrice > 0 ? formatPrice(dest.basePrice) : 'Free Entry'}</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${dest._id}"
                                data-name="${dest.name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${dest._id}">
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
            return `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${getImageUrl(guide.image, 'guide')}" 
                         alt="${guide.name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${guide.name}</h3>
                    <p class="specialty">${guide.specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${guide.languages.slice(0, 7).map(lang => 
                                `<span class="language-tag">${lang.language}</span>`
                            ).join('')}
                            ${guide.languages.length > 7 ? `<span class="language-tag more">+${guide.languages.length - 7}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${guide.languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${guide.experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(guide.rating))}<span>${guide.rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${formatPrice(guide.dailyRate)}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="guide" 
                                data-id="${guide._id}"
                                data-name="${guide.name}">
                            <i class="fas fa-user-check"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${guide._id}">
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
            return `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${getImageUrl(translator.image, 'translator')}" 
                         alt="${translator.name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${translator.name}</h3>
                    <p class="specialty">${translator.specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${translator.languages.slice(0, 7).map(lang => 
                                `<span class="language-tag">${lang.language}</span>`
                            ).join('')}
                            ${translator.languages.length > 7 ? `<span class="language-tag more">+${translator.languages.length - 7}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${translator.languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${translator.experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(translator.rating))}<span>${translator.rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${formatPrice(translator.dailyRate)}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="translator" 
                                data-id="${translator._id}"
                                data-name="${translator.name}">
                            <i class="fas fa-language"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${translator._id}">
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
            return `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${getImageUrl(acc.mainImage, 'accommodation')}" 
                         alt="${acc.name}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    <div class="accommodation-rating"><i class="fas fa-star"></i> ${acc.rating}</div>
                </div>
                <div class="accommodation-content">
                    <span class="type">${acc.type}</span>
                    <h3>${acc.name}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${acc.location}
                    </div>
                    <p>${acc.description.substring(0, 350)}...</p>
                    <div class="features">
                        ${acc.amenities ? acc.amenities.slice(0, 8).map(amenity => 
                            `<span class="feature-tag">${amenity.name}</span>`
                        ).join('') : ''}
                        ${acc.amenities && acc.amenities.length > 5 ? `<span class="feature-tag">+${acc.amenities.length - 5} more</span>` : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${formatPrice(acc.pricePerNight)}/night</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="accommodation" 
                                data-id="${acc._id}"
                                data-name="${acc.name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-details" 
                                data-id="${acc._id}">
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
        
        const displayPosts = isHome ? blogPosts.slice(0, 8) : blogPosts;
        
        container.innerHTML = displayPosts.map(post => {
            return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${getImageUrl(post.featuredImage, 'blog')}" 
                         alt="${post.title}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    <span class="blog-category">${post.category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date"><i class="fas fa-calendar"></i> ${new Date(post.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}</span>
                        <span class="blog-read-time">${post.readTime} min read</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt.substring(0, 350)}...</p>
                    <div class="author">
                        <i class="fas fa-user"></i> ${post.author}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-primary read-more" 
                                data-id="${post._id}">
                            <i class="fas fa-book-open"></i> Read Article
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
        
        // View details buttons
        container.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                const card = button.closest('.destination-card, .guide-card, .translator-card, .accommodation-card');
                
                if (!card || !id) return;
                
                if (card.classList.contains('destination-card')) {
                    showDestinationDetails(id);
                } else if (card.classList.contains('guide-card')) {
                    showProfessionalGuideModal(id);
                } else if (card.classList.contains('translator-card')) {
                    showProfessionalTranslatorModal(id);
                } else if (card.classList.contains('accommodation-card')) {
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
    // CONTACT FORM HANDLER
    // ===============================
    
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('#contact-name').value.trim();
            const email = contactForm.querySelector('#contact-email').value.trim();
            const subject = contactForm.querySelector('#contact-subject').value.trim();
            const message = contactForm.querySelector('#contact-message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            try {
                const formData = { name, email, subject, message };
                const result = await submitFormToEmail(formData, 'contact');
                if (result.success) {
                    showNotification(result.message, 'success');
                    contactForm.reset();
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                showNotification('Error submitting form. Please try again.', 'error');
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    async function loadPageContent(pageId) {
        try {
            const containers = {
                'home': { 
                    id: 'destinations-section', 
                    render: renderDestinations, 
                    data: seedData.destinations.slice(0, 8),
                    isHome: true
                },
                'destinations': { 
                    id: 'destinations-section-full', 
                    render: renderDestinations, 
                    data: seedData.destinations,
                    isHome: false
                },
                'guides': { 
                    id: 'guides-section-full', 
                    render: renderGuides, 
                    data: seedData.guides
                },
                'translators': { 
                    id: 'translators-section-full', 
                    render: renderTranslators, 
                    data: seedData.translators
                },
                'accommodations': { 
                    id: 'accommodations-section-full', 
                    render: renderAccommodations, 
                    data: seedData.accommodations
                },
                'blog': { 
                    id: 'blog-section-full', 
                    render: renderBlogPosts, 
                    data: seedData.blogPosts,
                    isHome: false
                }
            };
            
            const config = containers[pageId];
            if (!config) return;
            
            const container = document.getElementById(config.id);
            if (!container) return;
            
            const spinnerId = showLoadingSpinner(container);
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                if (config.isHome !== undefined) {
                    config.render(config.data, container, config.isHome);
                } else {
                    config.render(config.data, container);
                }
            }, 600);
            
        } catch (error) {
            console.error(`Error loading ${pageId}:`, error);
            showNotification(`Error loading ${pageId} content`, 'error');
        }
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing GoTrip Professional Application v7.0 - Production Ready');
        
        // Set current year in footer
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Initialize mobile menu
        initializeMobileMenu();
        
        // Setup contact form
        setupContactForm();
        
        // Handle initial page load with SEO-friendly URLs
        handleInitialPageLoad();
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            // Handle navigation links
            const navLink = e.target.closest('.nav-link');
            if (navLink && !navLink.classList.contains('active')) {
                e.preventDefault();
                const href = navLink.getAttribute('href');
                const pageId = href === '/' ? 'home' : href.replace('/', '');
                GoTrip.navigateTo(pageId);
            }
            
            // Handle footer links
            const footerLink = e.target.closest('.footer-link');
            if (footerLink && footerLink.tagName === 'A') {
                e.preventDefault();
                const href = footerLink.getAttribute('href');
                const pageId = href === '/' ? 'home' : href.replace('/', '');
                GoTrip.navigateTo(pageId);
            }
            
            // Handle service links
            const serviceLink = e.target.closest('.service-link');
            if (serviceLink) {
                e.preventDefault();
                const pageId = serviceLink.getAttribute('onclick')?.match(/GoTrip\.navigateTo\('([^']+)'/)?.[1];
                if (pageId) {
                    GoTrip.navigateTo(pageId);
                }
            }
            
            // Handle hero buttons
            const exploreBtn = e.target.closest('.explore-destinations-btn');
            if (exploreBtn) {
                e.preventDefault();
                GoTrip.navigateTo('destinations');
            }
        });
        
        // Show welcome notification
        setTimeout(() => {
            showNotification(
                'Welcome to GoTrip! Discover Rwanda with expert guides and professional translators.',
                'info',
                5000,
                'Welcome to Rwanda'
            );
        }, 1500);
        
        console.log('✅ Application initialized successfully');
        console.log('📧 Form submissions configured for:', config.formspreeEndpoint);
    }

    // ===============================
    // EXPORT TO WINDOW
    // ===============================
    window.GoTrip = {
        navigateTo,
        showPage,
        showNotification,
        showTripPlanningModal: function() {
            showTripPlanningModal();
        },
        showBookingModal: function(serviceType, serviceId, serviceName) {
            showBookingModal(serviceType, serviceId, serviceName);
        },
        closeModal,
        submitFormToEmail,
        showPrivacyModal: function() {
            showNotification('Privacy Policy document is being updated. Will be available soon.', 'info');
        },
        showTermsModal: function() {
            showNotification('Terms of Service document is being updated. Will be available soon.', 'info');
        },
        showCookieModal: function() {
            showNotification('Cookie Policy information will be available soon.', 'info');
        }
    };

    // ===============================
    // START APPLICATION
    // ===============================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        setTimeout(initializeApp, 100);
    }
})();// GoTrip Professional Travel Application v7.0
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        debug: true,
        
        // Form submission endpoint
        formspreeEndpoint: 'https://formspree.io/f/xlggdeal',
        
        // Company information
        companyInfo: {
            name: 'GoTrip Rwanda',
            email: 'info@gotrip.africa',
            phone: '+250787407051',
            address: 'KN 5 Rd, Kigali, Rwanda',
            workingHours: 'Mon-Fri 8:00 AM - 6:00 PM CAT'
        },
        
        // Fallback images
        fallbackImages: {
            destination: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/destination-fallback_uo8qya.jpg',
            guide: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/guide-fallback_pfdjqp.jpg',
            translator: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/translator-fallback_h4hvpj.jpg',
            accommodation: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/accommodation-fallback_qijjhm.jpg',
            blog: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768741098/blog-fallback_tkz4cm.jpg'
        },
        
        // Currency settings
        currency: {
            symbol: '',
            code: 'USD'
        }
    };

    // ===============================
    // ENHANCED SEED DATA
    // ===============================
    const seedData = {
        destinations: [
            {
                _id: 'rw-volcanoes-park',
                name: 'Volcanoes National Park',
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
                    'Gorilla Guardians Village experience'
                ],
                activities: [
                    { name: 'Mountain Gorilla Trekking', icon: 'fas fa-mountain', description: 'Guided trek to observe gorilla families with expert trackers and guides' },
                    { name: 'Golden Monkey Tracking', icon: 'fas fa-paw', description: 'Observe the playful golden monkeys endemic to the Virunga region' },
                    { name: 'Volcano Hiking', icon: 'fas fa-hiking', description: 'Summit volcanic peaks with breathtaking crater lakes and panoramic views' },
                    { name: 'Cultural Immersion', icon: 'fas fa-home', description: 'Experience traditional Rwandan life at the Gorilla Guardians Village' }
                ],
                conservationInfo: '30% of permit fees support conservation efforts and community development',
                tags: ['Wildlife', 'Adventure', 'Gorillas', 'UNESCO', 'Photography', 'Conservation', 'Volcanoes']
            },
            {
                _id: 'rw-nyungwe-forest',
                name: 'Nyungwe National Park',
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
                tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy', 'Eco-Tourism', 'UNESCO']
            },
            {
                _id: 'rw-akagera-park',
                name: 'Akagera National Park',
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
                tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography', 'Conservation', 'Birding']
            },
            {
                _id: 'rw-lake-kivu',
                name: 'Lake Kivu',
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
                tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports', 'Culture', 'Coffee']
            },
            {
                _id: 'rw-kigali-city',
                name: 'Kigali City',
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
                tags: ['City', 'Culture', 'History', 'Food', 'Art', 'Modern Rwanda', 'Urban']
            },
            {
                _id: 'rw-kings-palace-museum',
                name: 'King\'s Palace Museum',
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
                tags: ['Culture', 'History', 'Royalty', 'Traditional', 'Museum', 'Performance', 'Heritage']
            }
        ],
        
        accommodations: [
            {
                _id: 'acc-one-only-gorillas-nest',
                name: 'One&Only Gorilla\'s Nest',
                location: 'Volcanoes National Park, Musanze',
                type: 'Luxury Lodge',
                description: 'An exclusive luxury lodge nestled in the foothills of the Virunga volcanoes, offering unparalleled gorilla trekking access. The lodge combines contemporary luxury with authentic Rwandan design, featuring 21 forest-facing rooms and suites with private decks, fireplaces, and stunning volcano views.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654351/one-and-only-kinigi_sgleyo.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'reservations@oneandonlygorillasnest.com',
                maxGuests: 2,
                sustainability: 'Carbon-neutral operations, solar-powered, supports local communities'
            },
            {
                _id: 'acc-kigali-marriott',
                name: 'Kigali Marriott Hotel',
                location: 'Kigali City Center',
                type: '5-Star Hotel',
                description: 'Located in the heart of Kigali\'s business district, the Marriott offers 254 rooms and suites with panoramic city views. The hotel features Rwanda\'s largest ballroom, multiple dining options, and direct access to Kigali Convention Centre. Ideal for business travelers and luxury seekers.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664108/Marriott-Hotel-Kigali-Rwanda-Safaris_8__Tett-Safaris_v78edy.webp',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'reservations@marriottkigali.com',
                maxGuests: 4,
                sustainability: 'LEED-certified building, water recycling system, local employment focus'
            },
            {
                _id: 'acc-nyungwe-house',
                name: 'Nyungwe House',
                location: 'Nyungwe National Park',
                type: 'Boutique Lodge',
                description: 'Perched on the edge of Nyungwe Forest at 2,500 meters, this luxury eco-lodge offers stunning canopy views and exclusive chimpanzee trekking access. The lodge features 24 rooms designed with local materials, each offering private terraces overlooking the rainforest.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654350/one-only-nyungwe-house_oezq87.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'stay@nyungwehouse.com',
                maxGuests: 3,
                sustainability: 'Solar-powered, rainwater harvesting, supports forest conservation'
            },
            {
                _id: 'acc-lake-kivu-serena',
                name: 'Lake Kivu Serena Hotel',
                location: 'Gisenyi, Lake Kivu',
                type: 'Resort Hotel',
                description: 'Located on the shores of Lake Kivu, this resort offers direct beach access, water sports, and stunning sunset views. The property features 66 rooms and suites with lake views, multiple dining options, and extensive recreational facilities.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654353/aeriel-view-serena_cuohuj.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'reservations@serenakivu.com',
                maxGuests: 4,
                sustainability: 'Waste management program, local community engagement, eco-friendly practices'
            },
            {
                _id: 'acc-akagera-game-lodge',
                name: 'Akagera Game Lodge',
                location: 'Akagera National Park',
                type: 'Safari Lodge',
                description: 'The only lodge inside Akagera National Park, offering authentic safari experience with wildlife viewing from your balcony. Overlooking Lake Ihema, the lodge features 60 rooms, a waterhole frequented by wildlife, and direct access to game drives.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349192/Akagera-Game-Lodge-Terrasse-upstairs-113-min_rofnsc.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'bookings@akageralodge.com',
                maxGuests: 3,
                sustainability: 'Supports park conservation, employs local guides, eco-friendly operations'
            },
            {
                _id: 'acc-ubumwe-hotel',
                name: 'Ubumwe Grande Hotel',
                location: 'Kigali Heights',
                type: 'Business Hotel',
                description: 'Modern business hotel in Kigali\'s commercial district, offering excellent conference facilities and city access. The hotel features 82 rooms, extensive meeting spaces, and convenient access to government offices and business centers.',
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
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768349335/facade_fc6shj.jpg',
                available: true,
                contactPhone: '+250787407051',
                contactEmail: 'reservations@ubumwegrande.com',
                maxGuests: 2,
                sustainability: 'Energy-efficient systems, local procurement policy, community partnerships'
            }
        ],
        
        blogPosts: [
            {
                _id: 'blog-gorilla-trekking-guide',
                title: 'Ultimate Guide to Gorilla Trekking in Rwanda: Everything You Need to Know',
                author: 'Dr. Patience Rutayisire',
                authorRole: 'Senior Wildlife Specialist & Conservationist',
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
                publishedDate: '2026-01-15',
                tags: ['Gorilla Trekking', 'Wildlife', 'Conservation', 'Volcanoes National Park', 'Photography', 'Permits']
            },
            {
                _id: 'blog-rwanda-itinerary-7days',
                title: '7-Day Ultimate Rwanda Itinerary: Gorillas, Culture & Nature',
                author: 'Marie Claire Uwimana',
                authorRole: 'Senior Tour Designer & Cultural Expert',
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
                publishedDate: '2026-01-14',
                tags: ['Itinerary', 'Travel Planning', 'Gorillas', 'Lake Kivu', 'Cultural Tourism', 'Logistics']
            },
            {
                _id: 'blog-cultural-experiences-rwanda',
                title: 'Cultural Experiences in Rwanda: Beyond Gorilla Trekking',
                author: 'Celestin Hagenimana',
                authorRole: 'Cultural Heritage Specialist',
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
                publishedDate: '2026-01-13',
                tags: ['Culture', 'Tradition', 'Community', 'Heritage', 'Cuisine', 'Arts']
            },
            {
                _id: 'blog-best-time-visit-rwanda',
                title: 'Best Time to Visit Rwanda: Seasonal Guide & Climate Tips',
                author: 'Weather & Travel Experts',
                authorRole: 'Meteorological & Tourism Specialists',
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
                publishedDate: '2026-01-05',
                tags: ['Seasons', 'Climate', 'Weather', 'Best Time', 'Planning', 'Activities']
            },
            {
                _id: 'blog-rwanda-conservation-success',
                title: 'Rwanda\'s Conservation Success Story: From Tragedy to Triumph',
                author: 'Patience Rutayisire',
                authorRole: 'Conservation Director',
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
                publishedDate: '2026-01-15',
                tags: ['Conservation', 'Wildlife', 'Sustainability', 'Community', 'Environment', 'Success']
            },
            {
                _id: 'blog-rwandan-cuisine-guide',
                title: 'Rwandan Cuisine Guide: Traditional Foods & Dining Experiences',
                author: 'Culinary Tourism Team',
                authorRole: 'Food & Culture Experts',
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
                publishedDate: '2026-01-12',
                tags: ['Food', 'Cuisine', 'Dining', 'Traditional', 'Cooking', 'Beverages']
            }
        ],
        
        guides: [
            {
                _id: 'guide-patience-rutayisire',
                name: 'Mr. Patience Rutayisire',
                specialty: 'Senior Wildlife & Gorilla Specialist',
                biography: 'With over 8 years of experience in wildlife conservation and gorilla research, Mr. Rutayisire holds a Bachelor Degree in Communication Studies from University of Rwanda. He has published research papers on gorilla behavior and conservation, and leads training programs for new guides. His work with the conservation efforts has contributed significantly to gorilla population recovery.',
                languages: [
                    { language: 'English', level: 'Native Fluency', flag: '🇬🇧', certification: 'TOEFL 110/120' },
                    { language: 'German', level: 'Fluent', flag: '🇩🇪', certification: 'Goethe C1' },
                    { language: 'Spanish', level: 'Advanced', flag: '🇪🇸', certification: 'DELE B2' },
                    { language: 'French', level: 'Fluent', flag: '🇫🇷', certification: 'DALF C1' },
                    { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳', certification: 'HSK 5' },
                    { language: 'Swahili', level: 'Native', flag: '🇹🇿', certification: '' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', certification: '' }
                ],
                experience: '8+ years of guiding and research',
                rating: 4.9,
                dailyRate: 150,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png',
                certifications: [
                    'Gorilla Trekking Professional',                    
                    'Bird Watching Professional',
                    'Professional Photography Guide',                    
                    'Cultural Heritage Interpretation - UNESCO'
                ],
                education: [
                    'BA in Communication Studies - University of Rwanda',
                    'Diploma in Wildlife Conservation - Cornell University',
                    'Certificate in Tourism Management - Cornell University'
                ],
                specialties: [
                    'Gorilla Behavior & Ecology',
                    'Wildlife Photography Guidance',
                    'Conservation Education',
                    'High-Altitude Trekking'
                ]
            },
            {
                _id: 'guide-celestin-hagenimana',
                name: 'Mr. Celestin Hagenimana',
                specialty: 'Cultural & Historical Expert Guide',
                biography: 'Celestin brings 3+ years of specialized experience in Rwandan cultural heritage and historical interpretation. Fluent in multiple languages including Mandarin, he has guided diplomatic delegations, academic researchers, and cultural exchange groups. His deep knowledge of Rwanda\'s history from pre-colonial times to present day provides visitors with profound cultural insights.',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧', certification: 'IELTS 8.0' },
                    { language: 'Chinese (Mandarin)', level: 'Advanced', flag: '🇨🇳', certification: 'HSK 4' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', certification: '' },                    
                    { language: 'French', level: 'Intermediate', flag: '🇫🇷', certification: 'DELF B1' }
                ],
                experience: '3+ years of cultural guiding',
                rating: 4.8,
                dailyRate: 100,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664106/zhenfei_dvbmas.jpg',
                certifications: [
                    'Cultural Heritage Professional',
                    'Historical Tour Guide Certification',
                    'Community Tourism Professional',
                    'Language Interpretation Professional',
                    'Diplomatic Protocol Training'
                ],
                education: [
                    'MBA - University of Rwanda',
                    'BBA - University of Rwanda'
                ],
                specialties: [
                    'Royal History & Traditions',
                    'Cultural Performance Interpretation',
                    'Community Engagement',
                    'Historical Site Interpretation'
                ]
            }
        ],
        
        translators: [
            {
                _id: 'translator-tite-iradukunda',
                name: 'Mr. Tite Iradukunda',
                specialty: 'Senior Chinese & Kinyarwanda Translator',
                biography: 'Tite is a highly specialized translator with native fluency in Mandarin Chinese and Kinyarwanda. With 5+ years of experience working with Chinese investors, diplomatic missions, and medical teams in Rwanda, he has developed expertise in technical, business, and medical translation. His work has facilitated major infrastructure projects and international agreements.',
                languages: [
                    { language: 'Chinese (Mandarin)', level: 'Native Fluency', flag: '🇨🇳', certification: 'HSK Level 5' },
                    { language: 'English', level: 'Fluent', flag: '🇬🇧', certification: 'TOEIC 950/990' },
                    { language: 'French', level: 'Advanced', flag: '🇫🇷', certification: 'DALF C1' },
                    { language: 'Kinyarwanda', level: 'Native', flag: '🇷🇼', certification: '' }                    
                ],
                experience: '5+ years of professional translation',
                rating: 4.9,
                dailyRate: 120,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767698065/di-li-bo_mfkxlk.jpg',
                certifications: [
                    'Certified Mandarin Translator (HSK Level 5)',
                    'Medical Translation',
                    'Legal Translation',
                    'Simultaneous Interpreter - UN Standards',
                    'Business Consulting Translation'
                ],
                education: [
                    'BBA - University of Rwanda',
                    'Certificate in Chinese Language & Literature - University of Rwanda'
                ],
                specialties: [
                    'Business & Investment Translation',
                    'Medical & Healthcare Interpretation',
                    'Legal Document Translation',
                    'Technical Manual Translation'
                ],
                notableProjects: [
                    'China-Rwanda Infrastructure Agreements',
                    'Medical Team Interpretations',
                    'International Conference Simultaneous Interpretation'
                ]
            },
            {
                _id: 'translator-roberto-lateif',
                name: 'Roberto Lateif',
                specialty: 'Multilingual Diplomatic Translator',
                biography: 'Roberto brings 8+ years of experience in diplomatic and high-level translation services. Fluent in 6 languages including Arabic and Portuguese, he has worked with UN agencies, diplomatic missions, and international corporations. His expertise in legal and diplomatic translation has facilitated major international agreements and high-level meetings.',
                languages: [
                    { language: 'English', level: 'Fluent', flag: '🇬🇧', certification: 'Cambridge CPE' },
                    { language: 'Arabic', level: 'Native', flag: '🇸🇦', certification: '' },
                    { language: 'Portuguese', level: 'Fluent', flag: '🇵🇹', certification: 'CELPE-Bras' },
                    { language: 'Swahili', level: 'Advanced', flag: '🇹🇿', certification: '' },
                    { language: 'French', level: 'Intermediate', flag: '🇫🇷', certification: 'DELF B2' },
                    { language: 'Spanish', level: 'Intermediate', flag: '🇪🇸', certification: 'DELE B1' }
                ],
                experience: '8+ years of diplomatic translation',
                rating: 4.8,
                dailyRate: 180,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767668483/roberto_eyubfo.png',
                certifications: [
                    'Certified Arabic Translator (UN Standards)',
                    'UN Interpreter Certified',
                    'Legal Translation Specialist',
                    'Diplomatic Protocol Training',
                    'Conference Interpretation'
                ],
                education: [
                    'MA in International Relations - University of Nairobi',
                    'BA in Translation & Interpretation - University of Khartoum'
                ],
                specialties: [
                    'Diplomatic Protocol & Interpretation',
                    'Legal Document Translation',
                    'International Conference Interpretation',
                    'Business Negotiation Translation'
                ],
                notableProjects: [
                    'UN Peacekeeping Mission Translations',
                    'African Union Summit Interpretations',
                    'International Trade Agreement Translations'
                ]
            }
        ]
    };

    // ===============================
    // UTILITY FUNCTIONS
    // ===============================
    
    function showNotification(message, type = 'info', duration = 4000, title = null) {
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        
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
                <button class="notification-close" aria-label="Close notification">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        const removeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
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
            element.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            element.disabled = true;
            element.style.opacity = '0.7';
        } else {
            if (element.dataset.originalContent) {
                element.innerHTML = element.dataset.originalContent;
            }
            element.disabled = false;
            element.style.opacity = '1';
        }
    }

    function showLoadingSpinner(container) {
        if (!container) return null;
        
        const spinnerId = `spinner-${Date.now()}`;
        const spinnerHTML = `
            <div id="${spinnerId}" class="loading-container">
                <div class="spinner"></div>
                <p class="loading-text">Loading content...</p>
            </div>
        `;
        
        container.innerHTML = spinnerHTML;
        return spinnerId;
    }

    function hideLoadingSpinner(spinnerId) {
        const spinner = document.getElementById(spinnerId);
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }

    function getImageUrl(imagePath, type = 'destination') {
        if (!imagePath || imagePath === '#' || imagePath === '') {
            return config.fallbackImages[type] || config.fallbackImages.destination;
        }
        
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        return imagePath;
    }

    function formatPrice(amount) {
        if (amount === 0 || amount === '0') return 'Free';
        return `${config.currency.symbol}${amount.toLocaleString()}`;
    }

    // ===============================
    // FORM SUBMISSION FUNCTION
    // ===============================
    
    async function submitFormToEmail(formData, formType = 'contact') {
        try {
            let emailSubject = 'GoTrip Form Submission';
            let submissionData = {
                _subject: emailSubject,
                _replyto: formData.email || '',
                name: formData.name || '',
                email: formData.email || '',
                phone: formData.phone || '',
                message: formData.message || '',
                form_type: formType
            };
            
            // Customize based on form type
            switch(formType) {
                case 'booking':
                    emailSubject = `Booking Request: ${formData.serviceName || 'Service'}`;
                    submissionData._subject = emailSubject;
                    submissionData.service_type = formData.serviceType || '';
                    submissionData.service_name = formData.serviceName || '';
                    submissionData.preferred_date = formData.date || '';
                    submissionData.participants = formData.participants || '';
                    break;
                    
                case 'trip-plan':
                    emailSubject = 'Trip Planning Request';
                    submissionData._subject = emailSubject;
                    submissionData.start_date = formData.startDate || '';
                    submissionData.end_date = formData.endDate || '';
                    submissionData.travelers = formData.travelers || '';
                    submissionData.budget = formData.budget || '';
                    submissionData.nationality = formData.nationality || '';
                    submissionData.interests = formData.interests || '';
                    break;
                    
                case 'contact':
                    emailSubject = formData.subject || 'Contact Form Submission';
                    submissionData._subject = emailSubject;
                    submissionData.subject = formData.subject || '';
                    break;
            }
            
            // Send to Formspree
            const response = await fetch(config.formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(submissionData)
            });
            
            if (response.ok) {
                return { 
                    success: true, 
                    message: 'Thank you! Your message has been sent successfully. We will respond within 24 hours.' 
                };
            } else {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            return { 
                success: false, 
                message: 'Sorry, there was an error sending your message. Please try again or contact us directly at info@gotrip.africa' 
            };
        }
    }

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentPage = 'home';
    let imageCache = new Map();

    // ===============================
    // SEO-FRIENDLY PAGE MANAGEMENT
    // ===============================
    
    function navigateTo(pageId) {
        // Validate page exists
        const validPages = ['home', 'destinations', 'guides', 'translators', 'accommodations', 'blog', 'contact'];
        if (!validPages.includes(pageId)) {
            pageId = 'home';
        }
        
        // Update URL without hash for SEO
        const pageTitle = pageId.charAt(0).toUpperCase() + pageId.slice(1);
        const url = pageId === 'home' ? '/' : `/${pageId}`;
        
        // Update browser history and URL
        window.history.pushState({ pageId, title: `GoTrip - ${pageTitle}` }, '', url);
        
        // Update page title for SEO
        document.title = `GoTrip - ${pageTitle} | Premium Rwanda Tour Operator`;
        
        // Show the page
        showPage(pageId);
    }

    function showPage(pageId) {
        // Update current page
        currentPage = pageId;
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
            setTimeout(() => {
                targetPage.classList.add('active');
            }, 10);
            
            // Load content if not already loaded
            if (!targetPage.dataset.loaded) {
                loadPageContent(pageId);
                targetPage.dataset.loaded = 'true';
            }
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            const linkPage = href === '/' ? 'home' : href.replace('/', '');
            if (linkPage === pageId) {
                link.classList.add('active');
            }
        });
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        if (event.state && event.state.pageId) {
            showPage(event.state.pageId);
            if (event.state.title) {
                document.title = event.state.title;
            }
        } else {
            // Parse current URL
            const path = window.location.pathname;
            const pageId = path === '/' || path === '' ? 'home' : path.replace('/', '');
            navigateTo(pageId);
        }
    });

    // Handle direct URL access
    function handleInitialPageLoad() {
        const path = window.location.pathname;
        const pageId = path === '/' || path === '' ? 'home' : path.replace('/', '');
        
        // Validate page exists
        const validPages = ['home', 'destinations', 'guides', 'translators', 'accommodations', 'blog', 'contact'];
        const targetPageId = validPages.includes(pageId) ? pageId : 'home';
        
        // Set initial state
        const pageTitle = targetPageId.charAt(0).toUpperCase() + targetPageId.slice(1);
        window.history.replaceState(
            { pageId: targetPageId, title: `GoTrip - ${pageTitle}` },
            '',
            targetPageId === 'home' ? '/' : `/${targetPageId}`
        );
        
        document.title = `GoTrip - ${pageTitle} | Premium Rwanda Tour Operator`;
        showPage(targetPageId);
    }

    // ===============================
    // PROFESSIONAL MOBILE MENU
    // ===============================
    function initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
        const navLinks = document.getElementById('nav-links');
        const menuIcon = document.getElementById('menu-icon');

        if (!mobileMenuBtn || !navLinks || !menuIcon) return;

        const toggleMenu = (forceClose = false) => {
            const isExpanding = forceClose ? false : !navLinks.classList.contains('active');
            
            if (isExpanding) {
                // Open menu
                navLinks.classList.add('active');
                mobileMenuBtn.classList.add('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'true');
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
                
                // Add overlay
                let overlay = document.querySelector('.mobile-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'mobile-overlay';
                    document.body.appendChild(overlay);
                }
                overlay.classList.add('active');
                
                // Close overlay click
                overlay.onclick = () => toggleMenu(true);
                
            } else {
                // Close menu
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
                document.body.style.overflow = '';
                
                // Remove overlay
                const overlay = document.querySelector('.mobile-overlay');
                if (overlay) {
                    overlay.classList.remove('active');
                    setTimeout(() => {
                        if (overlay.parentNode) {
                            overlay.parentNode.removeChild(overlay);
                        }
                    }, 300);
                }
            }
        };

        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    toggleMenu(true);
                }
            });
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });

        // Handle Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                toggleMenu(true);
            }
        });
    }

    // ===============================
    // GLOBAL FUNCTIONS
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

    function showDestinationDetails(destinationId) {
        const destination = seedData.destinations.find(d => d._id === destinationId);
        if (!destination) {
            showNotification('Destination details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> ${destination.name}</h2>
                    <p class="modal-subtitle">
                        <span><i class="fas fa-map-marker-alt"></i> ${destination.location}</span>
                        <span><i class="fas fa-star"></i> ${destination.rating}/5.0</span>
                        <span><i class="fas fa-hiking"></i> ${destination.difficulty}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="destination-hero">
                        <img src="${getImageUrl(destination.mainImage, 'destination')}" 
                             alt="${destination.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="professional-bio">
                        <div class="bio-avatar-large">
                            <img src="${getImageUrl(destination.mainImage, 'destination')}" 
                                 alt="${destination.name}" 
                                 loading="lazy">
                        </div>
                        <div class="bio-details">
                            <h3>${destination.name}</h3>
                            <div class="bio-description">${destination.description}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-calendar-alt"></i> Best Season</h4>
                                    <p>${destination.bestSeason}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-clock"></i> Duration</h4>
                                    <p>${destination.duration}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-users"></i> Group Size</h4>
                                    <p>${destination.groupSize || 'Flexible'}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-file-alt"></i> Permits</h4>
                                    <p>${destination.permitsRequired ? 'Required' : 'Not Required'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    ${destination.highlights && destination.highlights.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-star"></i> Tour Highlights</h3>
                        <div class="highlights-grid">
                            ${destination.highlights.map(highlight => `
                                <div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${highlight}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${destination.activities && destination.activities.length > 0 ? `
                    <div class="content-section">
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
                    </div>
                    ` : ''}
                    
                    ${destination.conservationInfo ? `
                    <div class="content-section">
                        <h3><i class="fas fa-leaf"></i> Conservation Impact</h3>
                        <div class="conservation-info">
                            <p>${destination.conservationInfo}</p>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> 
                                ${destination.basePrice > 0 ? `From ${formatPrice(destination.basePrice)} per person` : 'Free Entry'}
                            </div>
                            <p class="price-note">${destination.basePrice > 0 ? 'Prices include permits, expert guides, and conservation fees' : 'Donations support conservation efforts'}</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="destination" 
                                    data-id="${destination._id}"
                                    data-name="${destination.name}">
                                <i class="fas fa-calendar-check"></i> Book This Experience
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('destination', destination._id, destination.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showProfessionalGuideModal(guideId) {
        const guide = seedData.guides.find(g => g._id === guideId);
        if (!guide) {
            showNotification('Guide details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-user-tie"></i> ${guide.name}</h2>
                    <p class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${guide.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${guide.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${guide.rating}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="professional-bio">
                        <div class="bio-avatar-large">
                            <img src="${getImageUrl(guide.image, 'guide')}" 
                                 alt="${guide.name}" 
                                 loading="lazy">
                        </div>
                        <div class="bio-details">
                            <h3>${guide.name}</h3>
                            <div class="bio-title">${guide.specialty}</div>
                            <div class="bio-description">${guide.biography}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                                    ${guide.education ? guide.education.map(edu => `<p>${edu}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-award"></i> Specialties</h4>
                                    ${guide.specialties ? guide.specialties.map(spec => `<p>${spec}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <h3><i class="fas fa-language"></i> Language Proficiency</h3>
                        <div class="language-proficiency">
                            ${guide.languages.map(lang => `
                                <div class="language-item">
                                    <div class="language-flag">${lang.flag}</div>
                                    <div class="language-info">
                                        <div class="language-name">${lang.language}</div>
                                        <div class="language-level">${lang.level} ${lang.certification ? `<span class="language-certification">${lang.certification}</span>` : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    ${guide.certifications && guide.certifications.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-certificate"></i> Certifications</h3>
                        <div class="certifications-grid">
                            ${guide.certifications.map(cert => `
                                <div class="certification-item">
                                    <i class="fas fa-certificate"></i>
                                    <span>${cert}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> From ${formatPrice(guide.dailyRate)} per day
                            </div>
                            <p class="price-note">Rate includes guide services, local knowledge, and equipment as needed</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="guide" 
                                    data-id="${guide._id}"
                                    data-name="${guide.name}">
                                <i class="fas fa-user-check"></i> Hire This Guide
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('guide', guide._id, guide.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showProfessionalTranslatorModal(translatorId) {
        const translator = seedData.translators.find(t => t._id === translatorId);
        if (!translator) {
            showNotification('Translator details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-language"></i> ${translator.name}</h2>
                    <p class="modal-subtitle">
                        <span class="specialty"><i class="fas fa-star"></i> ${translator.specialty}</span>
                        <span class="experience"><i class="fas fa-briefcase"></i> ${translator.experience}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${translator.rating}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="professional-bio">
                        <div class="bio-avatar-large">
                            <img src="${getImageUrl(translator.image, 'translator')}" 
                                 alt="${translator.name}" 
                                 loading="lazy">
                        </div>
                        <div class="bio-details">
                            <h3>${translator.name}</h3>
                            <div class="bio-title">${translator.specialty}</div>
                            <div class="bio-description">${translator.biography}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-graduation-cap"></i> Education</h4>
                                    ${translator.education ? translator.education.map(edu => `<p>${edu}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-award"></i> Specialties</h4>
                                    ${translator.specialties ? translator.specialties.map(spec => `<p>${spec}</p>`).join('') : '<p>Not specified</p>'}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="content-section">
                        <h3><i class="fas fa-language"></i> Language Proficiency</h3>
                        <div class="language-proficiency">
                            ${translator.languages.map(lang => `
                                <div class="language-item">
                                    <div class="language-flag">${lang.flag}</div>
                                    <div class="language-info">
                                        <div class="language-name">${lang.language}</div>
                                        <div class="language-level">${lang.level} ${lang.certification ? `<span class="language-certification">${lang.certification}</span>` : ''}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    ${translator.certifications && translator.certifications.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-certificate"></i> Certifications</h3>
                        <div class="certifications-grid">
                            ${translator.certifications.map(cert => `
                                <div class="certification-item">
                                    <i class="fas fa-certificate"></i>
                                    <span>${cert}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    ${translator.notableProjects && translator.notableProjects.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-briefcase"></i> Notable Projects</h3>
                        <div class="projects-grid">
                            ${translator.notableProjects.map(project => `
                                <div class="project-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>${project}</span>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> From ${formatPrice(translator.dailyRate)} per day
                            </div>
                            <p class="price-note">Rate includes translation services, preparation time, and equipment</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="translator" 
                                    data-id="${translator._id}"
                                    data-name="${translator.name}">
                                <i class="fas fa-language"></i> Hire This Translator
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('translator', translator._id, translator.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showAccommodationDetails(accommodationId) {
        const accommodation = seedData.accommodations.find(a => a._id === accommodationId);
        if (!accommodation) {
            showNotification('Accommodation details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-hotel"></i> ${accommodation.name}</h2>
                    <p class="modal-subtitle">
                        <span><i class="fas fa-map-marker-alt"></i> ${accommodation.location}</span>
                        <span><i class="fas fa-star"></i> ${accommodation.rating}/5.0</span>
                        <span><i class="fas fa-bed"></i> ${accommodation.type}</span>
                    </p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="accommodation-hero">
                        <img src="${getImageUrl(accommodation.mainImage, 'accommodation')}" 
                             alt="${accommodation.name}" 
                             loading="lazy">
                    </div>
                    
                    <div class="professional-bio">
                        <div class="bio-details">
                            <h3>${accommodation.name}</h3>
                            <div class="bio-title">${accommodation.type}</div>
                            <div class="bio-description">${accommodation.description}</div>
                            
                            <div class="professional-details">
                                <div class="detail-card">
                                    <h4><i class="fas fa-phone"></i> Contact</h4>
                                    <p>${accommodation.contactPhone}</p>
                                    <p>${accommodation.contactEmail}</p>
                                </div>
                                <div class="detail-card">
                                    <h4><i class="fas fa-users"></i> Capacity</h4>
                                    <p>Maximum ${accommodation.maxGuests} guests</p>
                                </div>
                                ${accommodation.sustainability ? `
                                <div class="detail-card">
                                    <h4><i class="fas fa-leaf"></i> Sustainability</h4>
                                    <p>${accommodation.sustainability}</p>
                                </div>
                                ` : ''}
                            </div>
                        </div>
                    </div>
                    
                    ${accommodation.amenities && accommodation.amenities.length > 0 ? `
                    <div class="content-section">
                        <h3><i class="fas fa-concierge-bell"></i> Amenities & Services</h3>
                        <div class="amenities-grid">
                            ${accommodation.amenities.map(amenity => `
                                <div class="amenity-item ${amenity.included ? 'included' : 'not-included'}">
                                    <div class="amenity-icon">
                                        <i class="${amenity.icon}"></i>
                                    </div>
                                    <div class="amenity-content">
                                        <div class="amenity-name">${amenity.name}</div>
                                        <div class="amenity-status">${amenity.included ? '<i class="fas fa-check"></i> Included' : '<i class="fas fa-times"></i> Not Included'}</div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="modal-actions">
                        <div class="price-section">
                            <div class="price-tag-large">
                                <i class="fas fa-dollar-sign"></i> From ${formatPrice(accommodation.pricePerNight)} per night
                            </div>
                            <p class="price-note">Rates vary by season and room type. Contact for special packages and long-stay discounts.</p>
                        </div>
                        
                        <div class="action-buttons">
                            <button class="btn btn-primary book-now" 
                                    data-type="accommodation" 
                                    data-id="${accommodation._id}"
                                    data-name="${accommodation.name}">
                                <i class="fas fa-calendar-check"></i> Book This Accommodation
                            </button>
                            <button class="btn btn-secondary plan-full-trip">
                                <i class="fas fa-map-marked-alt"></i> Plan Complete Trip
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.book-now')?.addEventListener('click', () => {
            closeModal();
            showBookingModal('accommodation', accommodation._id, accommodation.name);
        });
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
    }
    
    function showBlogDetails(blogId) {
        const blog = seedData.blogPosts.find(b => b._id === blogId);
        if (!blog) {
            showNotification('Blog post details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-newspaper"></i> ${blog.title}</h2>
                    <div class="modal-subtitle">
                        <span><i class="fas fa-user"></i> ${blog.author} - ${blog.authorRole}</span>
                        <span><i class="fas fa-calendar"></i> ${new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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
                                    <div class="author-role">${blog.authorRole}</div>
                                    <div class="publish-date">Published on ${new Date(blog.publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                </div>
                            </div>
                            <div class="read-info">
                                <i class="fas fa-clock"></i>
                                <span>${blog.readTime} min read</span>
                            </div>
                        </div>
                        
                        <div class="blog-excerpt-large">
                            <p>${blog.excerpt}</p>
                        </div>
                        
                        <div class="blog-article-content">
                            ${blog.content}
                        </div>
                        
                        ${blog.tags && blog.tags.length > 0 ? `
                        <div class="blog-tags-detailed">
                            <h4><i class="fas fa-tags"></i> Tags:</h4>
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
                        <button class="btn btn-secondary explore-blog" onclick="GoTrip.navigateTo('blog'); return false;">
                            <i class="fas fa-newspaper"></i> More Articles
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        
        modal.querySelector('.plan-full-trip')?.addEventListener('click', () => {
            closeModal();
            showTripPlanningModal();
        });
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
                    <p>Complete this form to request booking for ${serviceName}. Our team will contact you within 24 hours to confirm availability and provide payment details.</p>
                    <form id="booking-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-name">Full Name *</label>
                                <input type="text" id="booking-name" name="name" required placeholder="Your full name">
                            </div>
                            <div class="form-group">
                                <label for="booking-email">Email Address *</label>
                                <input type="email" id="booking-email" name="email" required placeholder="your.email@example.com">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-phone">Phone Number *</label>
                                <input type="tel" id="booking-phone" name="phone" required placeholder="+250 78X XXX XXX">
                            </div>
                            <div class="form-group">
                                <label for="booking-date">Preferred Start Date *</label>
                                <input type="date" id="booking-date" name="date" required min="${minDate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="booking-participants">Number of Participants</label>
                            <input type="number" id="booking-participants" name="participants" min="1" max="20" value="1">
                        </div>
                        <div class="form-group">
                            <label for="booking-message">Additional Requirements</label>
                            <textarea id="booking-message" name="message" placeholder="Any special requests, dietary requirements, or specific needs..." rows="4"></textarea>
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
            
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            try {
                const result = await submitFormToEmail(data, 'booking');
                if (result.success) {
                    showNotification(result.message, 'success');
                    closeModal();
                    form.reset();
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                showNotification('Error submitting form. Please try again.', 'error');
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    function showTripPlanningModal() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-content professional-trip-plan">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> Plan Your Rwanda Adventure</h2>
                    <p class="modal-subtitle">Tell us about your dream trip and our experts will create a customized itinerary</p>
                    <button class="modal-close" onclick="closeModal()" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="trip-plan-form">
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
                                    <select id="trip-travelers" name="travelers" required>
                                        <option value="">Select number...</option>
                                        <option value="1">1 Traveler</option>
                                        <option value="2" selected>2 Travelers</option>
                                        <option value="3">3 Travelers</option>
                                        <option value="4">4 Travelers</option>
                                        <option value="5-8">5-8 Travelers</option>
                                        <option value="9+">9+ Travelers (Group)</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="trip-budget">Estimated Budget per Person *</label>
                                    <select id="trip-budget" name="budget" required>
                                        <option value="">Select budget range...</option>
                                        <option value="budget">Budget (${formatPrice(800)} - ${formatPrice(1500)})</option>
                                        <option value="standard">Standard (${formatPrice(1500)} - ${formatPrice(3000)})</option>
                                        <option value="premium">Premium (${formatPrice(3000)} - ${formatPrice(5000)})</option>
                                        <option value="luxury">Luxury (${formatPrice(5000)}+)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3><i class="fas fa-heart"></i> Interests & Activities</h3>
                            <div class="interests-grid">
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="gorilla-trekking" checked>
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
                                    <input type="checkbox" name="interests" value="hiking-trekking">
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
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="bird-watching">
                                    <span>Bird Watching</span>
                                </label>
                                <label class="interest-checkbox">
                                    <input type="checkbox" name="interests" value="adventure-sports">
                                    <span>Adventure Sports</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h3><i class="fas fa-edit"></i> Additional Information</h3>
                            <div class="form-group">
                                <label for="trip-message">Tell us about your dream trip *</label>
                                <textarea id="trip-message" name="message" required placeholder="What are you most excited about? Any specific experiences you're looking for? Special requirements?" rows="6"></textarea>
                            </div>
                        </div>
                        
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
            
            // Get selected interests
            const interests = [];
            form.querySelectorAll('input[name="interests"]:checked').forEach(checkbox => {
                interests.push(checkbox.value);
            });
            data.interests = interests.join(', ');
            
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
            
            const submitBtn = form.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            try {
                const result = await submitFormToEmail(data, 'trip-plan');
                if (result.success) {
                    showNotification(result.message, 'success');
                    closeModal();
                    form.reset();
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                showNotification('Error submitting form. Please try again.', 'error');
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    // ===============================
    // RENDER FUNCTIONS
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
        
        const displayDestinations = isHome ? destinations.slice(0, 8) : destinations;
        
        container.innerHTML = displayDestinations.map(dest => {
            return `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${getImageUrl(dest.mainImage, 'destination')}" 
                         alt="${dest.name}" 
                         loading="lazy"
                         width="500" 
                         height="300">
                    <div class="destination-rating"><i class="fas fa-star"></i> ${dest.rating}</div>
                </div>
                <div class="destination-content">
                    <h3>${dest.name}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${dest.location}
                    </div>
                    <p class="destination-description">${dest.description.substring(0, 220)}...</p>
                    <div class="destination-features">
                        ${dest.tags ? dest.tags.slice(0, 4).map(tag => 
                            `<span class="feature"><i class="fas fa-check"></i>${tag}</span>`
                        ).join('') : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${dest.basePrice > 0 ? formatPrice(dest.basePrice) : 'Free Entry'}</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${dest._id}"
                                data-name="${dest.name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${dest._id}">
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
            return `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${getImageUrl(guide.image, 'guide')}" 
                         alt="${guide.name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${guide.name}</h3>
                    <p class="specialty">${guide.specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${guide.languages.slice(0, 8).map(lang => 
                                `<span class="language-tag">${lang.language}</span>`
                            ).join('')}
                            ${guide.languages.length > 8 ? `<span class="language-tag more">+${guide.languages.length - 8}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${guide.languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${guide.experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(guide.rating))}<span>${guide.rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${formatPrice(guide.dailyRate)}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="guide" 
                                data-id="${guide._id}"
                                data-name="${guide.name}">
                            <i class="fas fa-user-check"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${guide._id}">
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
            return `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${getImageUrl(translator.image, 'translator')}" 
                         alt="${translator.name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${translator.name}</h3>
                    <p class="specialty">${translator.specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-preview">
                            ${translator.languages.slice(0, 8).map(lang => 
                                `<span class="language-tag">${lang.language}</span>`
                            ).join('')}
                            ${translator.languages.length > 8 ? `<span class="language-tag more">+${translator.languages.length - 8}</span>` : ''}
                        </div>
                        <div class="languages-count">
                            <i class="fas fa-language"></i> ${translator.languages.length} languages
                        </div>
                    </div>
                    
                    <p class="experience"><i class="fas fa-briefcase"></i> ${translator.experience}</p>
                    <div class="rating">${'★'.repeat(Math.floor(translator.rating))}<span>${translator.rating}</span></div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${formatPrice(translator.dailyRate)}/day</div>
                    
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="translator" 
                                data-id="${translator._id}"
                                data-name="${translator.name}">
                            <i class="fas fa-language"></i> Hire Now
                        </button>
                        <button class="btn btn-secondary view-details" data-id="${translator._id}">
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
            return `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${getImageUrl(acc.mainImage, 'accommodation')}" 
                         alt="${acc.name}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    <div class="accommodation-rating"><i class="fas fa-star"></i> ${acc.rating}</div>
                </div>
                <div class="accommodation-content">
                    <span class="type">${acc.type}</span>
                    <h3>${acc.name}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${acc.location}
                    </div>
                    <p>${acc.description.substring(0, 350)}...</p>
                    <div class="features">
                        ${acc.amenities ? acc.amenities.slice(0, 5).map(amenity => 
                            `<span class="feature-tag">${amenity.name}</span>`
                        ).join('') : ''}
                        ${acc.amenities && acc.amenities.length > 8 ? `<span class="feature-tag">+${acc.amenities.length - 8} more</span>` : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> ${formatPrice(acc.pricePerNight)}/night</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="accommodation" 
                                data-id="${acc._id}"
                                data-name="${acc.name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        <button class="btn btn-secondary view-details" 
                                data-id="${acc._id}">
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
        
        const displayPosts = isHome ? blogPosts.slice(0, 8) : blogPosts;
        
        container.innerHTML = displayPosts.map(post => {
            return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${getImageUrl(post.featuredImage, 'blog')}" 
                         alt="${post.title}" 
                         loading="lazy"
                         width="500" 
                         height="250">
                    <span class="blog-category">${post.category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date"><i class="fas fa-calendar"></i> ${new Date(post.publishedDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}</span>
                        <span class="blog-read-time">${post.readTime} min read</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt.substring(0,350)}...</p>
                    <div class="author">
                        <i class="fas fa-user"></i> ${post.author}
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-primary read-more" 
                                data-id="${post._id}">
                            <i class="fas fa-book-open"></i> Read Article
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
        
        // View details buttons
        container.querySelectorAll('.view-details').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const id = button.dataset.id;
                const card = button.closest('.destination-card, .guide-card, .translator-card, .accommodation-card');
                
                if (!card || !id) return;
                
                if (card.classList.contains('destination-card')) {
                    showDestinationDetails(id);
                } else if (card.classList.contains('guide-card')) {
                    showProfessionalGuideModal(id);
                } else if (card.classList.contains('translator-card')) {
                    showProfessionalTranslatorModal(id);
                } else if (card.classList.contains('accommodation-card')) {
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
    // CONTACT FORM HANDLER
    // ===============================
    
    function setupContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const name = contactForm.querySelector('#contact-name').value.trim();
            const email = contactForm.querySelector('#contact-email').value.trim();
            const subject = contactForm.querySelector('#contact-subject').value.trim();
            const message = contactForm.querySelector('#contact-message').value.trim();
            
            if (!name || !email || !subject || !message) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            showLoading(submitBtn, true);
            
            try {
                const formData = { name, email, subject, message };
                const result = await submitFormToEmail(formData, 'contact');
                if (result.success) {
                    showNotification(result.message, 'success');
                    contactForm.reset();
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                showNotification('Error submitting form. Please try again.', 'error');
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    async function loadPageContent(pageId) {
        try {
            const containers = {
                'home': { 
                    id: 'destinations-section', 
                    render: renderDestinations, 
                    data: seedData.destinations.slice(0, 8),
                    isHome: true
                },
                'destinations': { 
                    id: 'destinations-section-full', 
                    render: renderDestinations, 
                    data: seedData.destinations,
                    isHome: false
                },
                'guides': { 
                    id: 'guides-section-full', 
                    render: renderGuides, 
                    data: seedData.guides
                },
                'translators': { 
                    id: 'translators-section-full', 
                    render: renderTranslators, 
                    data: seedData.translators
                },
                'accommodations': { 
                    id: 'accommodations-section-full', 
                    render: renderAccommodations, 
                    data: seedData.accommodations
                },
                'blog': { 
                    id: 'blog-section-full', 
                    render: renderBlogPosts, 
                    data: seedData.blogPosts,
                    isHome: false
                }
            };
            
            const config = containers[pageId];
            if (!config) return;
            
            const container = document.getElementById(config.id);
            if (!container) return;
            
            const spinnerId = showLoadingSpinner(container);
            
            // Simulate loading delay for better UX
            setTimeout(() => {
                hideLoadingSpinner(spinnerId);
                if (config.isHome !== undefined) {
                    config.render(config.data, container, config.isHome);
                } else {
                    config.render(config.data, container);
                }
            }, 600);
            
        } catch (error) {
            console.error(`Error loading ${pageId}:`, error);
            showNotification(`Error loading ${pageId} content`, 'error');
        }
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing GoTrip Professional Application v7.0 - Production Ready');
        
        // Set current year in footer
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Initialize mobile menu
        initializeMobileMenu();
        
        // Setup contact form
        setupContactForm();
        
        // Handle initial page load with SEO-friendly URLs
        handleInitialPageLoad();
        
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            // Handle navigation links
            const navLink = e.target.closest('.nav-link');
            if (navLink && !navLink.classList.contains('active')) {
                e.preventDefault();
                const href = navLink.getAttribute('href');
                const pageId = href === '/' ? 'home' : href.replace('/', '');
                GoTrip.navigateTo(pageId);
            }
            
            // Handle footer links
            const footerLink = e.target.closest('.footer-link');
            if (footerLink && footerLink.tagName === 'A') {
                e.preventDefault();
                const href = footerLink.getAttribute('href');
                const pageId = href === '/' ? 'home' : href.replace('/', '');
                GoTrip.navigateTo(pageId);
            }
            
            // Handle service links
            const serviceLink = e.target.closest('.service-link');
            if (serviceLink) {
                e.preventDefault();
                const pageId = serviceLink.getAttribute('onclick')?.match(/GoTrip\.navigateTo\('([^']+)'/)?.[1];
                if (pageId) {
                    GoTrip.navigateTo(pageId);
                }
            }
            
            // Handle hero buttons
            const exploreBtn = e.target.closest('.explore-destinations-btn');
            if (exploreBtn) {
                e.preventDefault();
                GoTrip.navigateTo('destinations');
            }
        });
        
        // Show welcome notification
        setTimeout(() => {
            showNotification(
                'Travel Rwanda with expert guides and professional translators.',
                'info',
                5000,
                'Welcome to GoTrip'
            );
        }, 1500);
        
        console.log('✅ Application initialized successfully');
        console.log('📧 Form submissions configured for:', config.formspreeEndpoint);
    }

    // ===============================
    // EXPORT TO WINDOW
    // ===============================
    window.GoTrip = {
        navigateTo,
        showPage,
        showNotification,
        showTripPlanningModal: function() {
            showTripPlanningModal();
        },
        showBookingModal: function(serviceType, serviceId, serviceName) {
            showBookingModal(serviceType, serviceId, serviceName);
        },
        closeModal,
        submitFormToEmail,
        showPrivacyModal: function() {
            showNotification('Privacy Policy document is being updated. Will be available soon.', 'info');
        },
        showTermsModal: function() {
            showNotification('Terms of Service document is being updated. Will be available soon.', 'info');
        },
        showCookieModal: function() {
            showNotification('Cookie Policy information will be available soon.', 'info');
        }
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
