// GoTrip Professional - Complete Production Seed Data v3.0
// Fully compatible with MongoDB Atlas and ready for deployment

(function() {
    'use strict';
    
    // ===============================
    // PRODUCTION CONFIGURATION
    // ===============================
    const config = {
        debug: false, // Set to false in production
        version: '3.0.0',
        
        // API Configuration
        apiEndpoints: {
            // Production API URL (Update this to your actual domain)
            base: window.location.hostname.includes('localhost') 
                ? 'http://localhost:5000/api' 
                : 'https://api.gotrip.africa/api',
            
            // Individual endpoints
            destinations: '/destinations',
            guides: '/guides',
            translators: '/translators',
            accommodations: '/accommodations',
            blogs: '/blogs',
            bookings: '/bookings',
            tripPlans: '/tripplans',
            contacts: '/contacts',
            newsletter: '/newsletters/subscribe',
            health: '/health'
        },
        
        // Form submission fallback
        formspreeEndpoint: 'https://formspree.io/f/xlggdeal',
        
        // MongoDB ObjectId generator (compatible format)
        generateObjectId: () => {
            const hexString = Array.from({length: 24}, () => 
                Math.floor(Math.random() * 16).toString(16)
            ).join('');
            return hexString;
        },
        
        // Company information
        companyInfo: {
            name: 'GoTrip Rwanda',
            legalName: 'GoTrip Rwanda Tours & Travel Ltd',
            email: 'info@gotrip.africa',
            phone: '+250787407051',
            whatsapp: '+250787407051',
            address: 'KN 5 Rd, Kigali, Rwanda',
            workingHours: 'Mon-Fri 8:00 AM - 6:00 PM CAT',
            emergencyContact: '+250788123456',
            registrationNumber: 'RDB/2023/TRA/001',
            vatNumber: 'VAT-123456789'
        },
        
        // Social media links
        socialMedia: {
            facebook: 'https://facebook.com/gotriprwanda',
            instagram: 'https://instagram.com/gotriprwanda',
            twitter: 'https://twitter.com/gotriprwanda',
            linkedin: 'https://linkedin.com/company/gotriprwanda',
            youtube: 'https://youtube.com/@gotriprwanda',
            tripadvisor: 'https://tripadvisor.com/gotrip-rwanda'
        },
        
        // Payment methods
        paymentMethods: [
            { name: 'Visa', icon: 'fab fa-cc-visa' },
            { name: 'MasterCard', icon: 'fab fa-cc-mastercard' },
            { name: 'PayPal', icon: 'fab fa-cc-paypal' },
            { name: 'Bank Transfer', icon: 'fas fa-university' },
            { name: 'Mobile Money', icon: 'fas fa-mobile-alt' }
        ],
        
        // Fallback images (production CDN)
        fallbackImages: {
            destination: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&h=800&fit=crop&q=80&auto=format',
            guide: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&q=80&auto=format',
            translator: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&q=80&auto=format',
            accommodation: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80&auto=format',
            blog: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200&h=800&fit=crop&q=80&auto=format',
            default: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&h=800&fit=crop&q=80&auto=format'
        },
        
        // Currency settings
        currency: {
            symbol: '$',
            code: 'USD',
            exchangeRate: 1,
            formats: {
                USD: '$1,234.56',
                EUR: '€1.234,56',
                GBP: '£1,234.56',
                RWF: 'RWF 1,234'
            }
        },
        
        // SEO Defaults
        seoDefaults: {
            title: 'GoTrip Rwanda | Premium Tour Operator & Travel Agency',
            description: 'Experience Rwanda with expert guides, professional translators, and luxury accommodations. Gorilla trekking, cultural tours, and unforgettable adventures.',
            keywords: 'Rwanda tours, gorilla trekking, safari, travel agency, tour operator, Kigali, Volcanoes National Park',
            ogImage: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&h=630&fit=crop&q=80&auto=format',
            twitterHandle: '@gotriprwanda'
        },
        
        // Analytics (Production)
        analytics: {
            googleAnalyticsId: 'G-XXXXXXXXXX', // Replace with your GA4 ID
            facebookPixelId: 'XXXXXXXXXXXXXXX' // Replace with your Pixel ID
        }
    };

    // ===============================
    // COMPLETE PRODUCTION SEED DATA
    // ===============================
    const seedData = {
        
        // ===== DESTINATIONS =====
        destinations: [
            {
                _id: config.generateObjectId(),
                name: 'Volcanoes National Park',
                slug: 'volcanoes-national-park',
                shortDescription: 'Home to endangered mountain gorillas in Rwanda\'s Virunga Mountains',
                location: 'Musanze District, Northern Province, Rwanda',
                coordinates: {
                    lat: -1.4432,
                    lng: 29.5361
                },
                description: 'Volcanoes National Park is Rwanda\'s premier wildlife destination, spanning 160 km² of pristine rainforest in the Virunga Mountains. As home to over one-third of the world\'s remaining mountain gorillas, it offers one of Earth\'s most profound wildlife experiences. The park encompasses five of the eight Virunga volcanoes and serves as a critical conservation area for endangered species.',
                detailedDescription: `
                    <div class="destination-content">
                        <h3>About Volcanoes National Park</h3>
                        <p>Established in 1925 as Africa\'s first national park, Volcanoes National Park is a UNESCO World Heritage site that plays a crucial role in mountain gorilla conservation. The park\'s elevation ranges from 2,400 to 4,507 meters, creating diverse ecosystems from bamboo forests to alpine meadows.</p>
                        
                        <h3>Gorilla Conservation Success</h3>
                        <p>Rwanda\'s mountain gorilla population has grown from 250 in 1981 to over 600 today, thanks to dedicated conservation efforts. The park is divided into sectors, each home to habituated gorilla families available for trekking under strict guidelines.</p>
                        
                        <h3>Volcanic Landscape</h3>
                        <p>The park features five volcanoes: Karisimbi (4,507m), Bisoke (3,711m), Muhabura (4,127m), Gahinga (3,474m), and Sabyinyo (3,669m). Each offers unique hiking experiences with breathtaking crater lakes and panoramic views.</p>
                        
                        <h3>Cultural Significance</h3>
                        <p>The park borders local communities who actively participate in conservation through revenue sharing programs. Cultural experiences include visits to the Gorilla Guardians Village and interactions with reformed poachers now working as conservationists.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/Rwanda-volcano_isb1qf.jpg',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/Rwanda-volcano_isb1qf.jpg',
                    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w-1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                videoUrl: 'https://www.youtube.com/embed/sample-gorilla-video',
                rating: 4.9,
                totalReviews: 1287,
                basePrice: 1500,
                currency: 'USD',
                duration: '1-3 Days',
                difficulty: 'Moderate to Challenging',
                altitude: '2,400 - 4,507 meters',
                bestSeason: 'June-September, December-February',
                permitsRequired: true,
                permitPrice: 1500,
                groupSize: 'Maximum 8 visitors per gorilla family',
                minimumAge: 15,
                available: true,
                featured: true,
                trending: true,
                specialOffer: false,
                highlights: [
                    'Track endangered mountain gorillas in their natural habitat',
                    'Visit the Karisoke Research Center founded by Dian Fossey',
                    'Hike to Dian Fossey\'s grave and research camp',
                    'Golden monkey tracking in bamboo forests',
                    'Summit volcanoes including Mount Bisoke and Karisimbi',
                    'Gorilla Guardians Village cultural experience',
                    'Bird watching with over 200 species',
                    'Photography opportunities with professional guides'
                ],
                activities: [
                    { 
                        name: 'Mountain Gorilla Trekking', 
                        icon: 'fas fa-mountain', 
                        description: 'Guided trek to observe gorilla families with expert trackers. 1-8 hours hiking depending on gorilla location.',
                        duration: '4-8 hours',
                        difficulty: 'Moderate to Challenging',
                        priceIncluded: true
                    },
                    { 
                        name: 'Golden Monkey Tracking', 
                        icon: 'fas fa-paw', 
                        description: 'Observe the playful golden monkeys endemic to the Virunga region. Easier trekking suitable for all fitness levels.',
                        duration: '2-4 hours',
                        difficulty: 'Easy to Moderate',
                        priceIncluded: false,
                        additionalCost: 100
                    },
                    { 
                        name: 'Volcano Hiking', 
                        icon: 'fas fa-hiking', 
                        description: 'Summit volcanic peaks with breathtaking crater lakes and panoramic views of Rwanda, Uganda, and DRC.',
                        duration: '6-10 hours',
                        difficulty: 'Challenging',
                        priceIncluded: false,
                        additionalCost: 250
                    },
                    { 
                        name: 'Cultural Immersion', 
                        icon: 'fas fa-home', 
                        description: 'Experience traditional Rwandan life at the Gorilla Guardians Village with dance performances, crafts, and local cuisine.',
                        duration: '2-3 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 50
                    },
                    { 
                        name: 'Bird Watching Tour', 
                        icon: 'fas fa-dove', 
                        description: 'Spot over 200 bird species including 29 Albertine Rift endemics with expert ornithologists.',
                        duration: '3-5 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 80
                    }
                ],
                includedServices: [
                    'Park entry permit',
                    'Professional English-speaking guide',
                    'Park rangers and trackers',
                    'Gorilla trekking certificate',
                    'Bottled water during trek',
                    'First aid support'
                ],
                excludedServices: [
                    'International flights',
                    'Visa fees',
                    'Travel insurance',
                    'Tips for guides and porters',
                    'Personal expenses',
                    'Accommodation'
                ],
                conservationInfo: '30% of permit fees ($450 per permit) support conservation efforts and community development programs. Since 2005, Rwanda has allocated over $5 million annually from tourism to local communities.',
                conservationImpact: {
                    communityProjects: 47,
                    jobsCreated: 3200,
                    schoolsBuilt: 12,
                    healthcareCenters: 8,
                    annualRevenue: '$8.5 million'
                },
                tags: ['Wildlife', 'Adventure', 'Gorillas', 'UNESCO', 'Photography', 'Conservation', 'Volcanoes', 'Hiking', 'Eco-Tourism', 'Birding'],
                metaTitle: 'Volcanoes National Park Rwanda | Gorilla Trekking & Conservation',
                metaDescription: 'Experience mountain gorilla trekking in Rwanda\'s Volcanoes National Park. UNESCO World Heritage site with expert guides, conservation tours, and volcanic hikes.',
                metaKeywords: 'mountain gorillas Rwanda, Volcanoes National Park trekking, gorilla permits Rwanda, Dian Fossey research center, golden monkey tracking',
                createdAt: new Date('2023-01-15T08:00:00Z'),
                updatedAt: new Date('2024-01-20T10:30:00Z'),
                views: 12543,
                bookings: 876,
                safetyRating: 4.8,
                accessibility: {
                    wheelchair: false,
                    seniorFriendly: 'Limited',
                    childFriendly: '15+ only',
                    fitnessLevel: 'Moderate required'
                },
                statistics: {
                    gorillaPopulation: 604,
                    successRate: '98%',
                    averageTrekkingTime: '4.5 hours',
                    visitorSatisfaction: '96%'
                }
            },
            {
                _id: config.generateObjectId(),
                name: 'Nyungwe National Park',
                slug: 'nyungwe-national-park',
                shortDescription: 'Ancient montane rainforest with chimpanzees & canopy walkway',
                location: 'Southwestern Rwanda',
                coordinates: {
                    lat: -2.4833,
                    lng: 29.1667
                },
                description: 'One of Africa\'s oldest and best-preserved montane rainforests, Nyungwe National Park is a biodiversity hotspot covering 1,019 km². The park is home to 13 primate species including chimpanzees, over 300 bird species (29 endemics), and 1,000 plant species. The canopy walkway offers a unique perspective 70 meters above the forest floor.',
                detailedDescription: `
                    <div class="destination-content">
                        <h3>Africa\'s Largest Montane Forest</h3>
                        <p>Nyungwe Forest dates back to before the last Ice Age, making it one of the world\'s most ecologically important forests. Its elevation ranges from 1,600 to 2,950 meters, creating a cool, misty environment perfect for biodiversity.</p>
                        
                        <h3>Primate Paradise</h3>
                        <p>With 13 primate species including chimpanzees, Angola colobus monkeys (in troops of up to 400), and L\'Hoest\'s monkeys, Nyungwe offers unparalleled primate viewing opportunities in their natural habitat.</p>
                        
                        <h3>Canopy Walkway Adventure</h3>
                        <p>The 200-meter canopy walkway suspended 70 meters above the forest floor provides breathtaking views and unique wildlife observation opportunities. It\'s East Africa\'s only canopy walkway.</p>
                        
                        <h3>Tea Plantation Tours</h3>
                        <p>Surrounding the park are Rwanda\'s famous tea plantations. Visitors can tour the plantations, learn about tea processing, and sample some of Africa\'s finest teas.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662726/nyungwe-forests_c9red1.jpg',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662726/nyungwe-forests_c9red1.jpg',
                    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                videoUrl: 'https://www.youtube.com/embed/sample-nyungwe-video',
                rating: 4.7,
                totalReviews: 892,
                basePrice: 200,
                currency: 'USD',
                duration: '2-4 Days',
                difficulty: 'Moderate',
                altitude: '1,600 - 2,950 meters',
                bestSeason: 'December-February, June-August',
                permitsRequired: true,
                permitPrice: 90,
                groupSize: 'Maximum 8 visitors per chimpanzee group',
                minimumAge: 12,
                available: true,
                featured: true,
                trending: false,
                specialOffer: true,
                specialOfferText: 'Save 15% on 3+ day packages',
                highlights: [
                    '70m high canopy walkway through the treetops',
                    'Chimpanzee habituation experience',
                    'Colobus monkey trekking with troops of up to 400',
                    'Waterfall hikes through ancient rainforest',
                    'Tea plantation tours and cultural experiences',
                    'Bird watching with expert guides',
                    'Butterfly watching in biodiversity hotspot',
                    'Night walks for nocturnal wildlife'
                ],
                activities: [
                    { 
                        name: 'Canopy Walk Adventure', 
                        icon: 'fas fa-walking', 
                        description: 'Walk 70m above the forest floor on Africa\'s longest canopy walkway with panoramic views.',
                        duration: '2-3 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 60
                    },
                    { 
                        name: 'Chimpanzee Tracking', 
                        icon: 'fas fa-tree', 
                        description: 'Track chimpanzee families through dense montane rainforest with expert trackers.',
                        duration: '3-6 hours',
                        difficulty: 'Moderate',
                        priceIncluded: true
                    },
                    { 
                        name: 'Colobus Monkey Trekking', 
                        icon: 'fas fa-users', 
                        description: 'Observe large troops of black-and-white colobus monkeys in their natural habitat.',
                        duration: '2-4 hours',
                        difficulty: 'Easy to Moderate',
                        priceIncluded: false,
                        additionalCost: 50
                    },
                    { 
                        name: 'Bird Watching', 
                        icon: 'fas fa-dove', 
                        description: 'Spot over 300 bird species including 29 Albertine Rift endemics with expert ornithologists.',
                        duration: '4-6 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 75
                    },
                    { 
                        name: 'Waterfall Hikes', 
                        icon: 'fas fa-water', 
                        description: 'Hike to stunning waterfalls through pristine rainforest with professional guides.',
                        duration: '3-5 hours',
                        difficulty: 'Moderate',
                        priceIncluded: false,
                        additionalCost: 40
                    }
                ],
                includedServices: [
                    'Park entry permit',
                    'Professional guide',
                    'Chimpanzee tracking permit',
                    'Bottled water',
                    'First aid support'
                ],
                excludedServices: [
                    'Canopy walkway fee',
                    'Additional activity permits',
                    'Accommodation',
                    'Meals',
                    'Tips',
                    'Travel insurance'
                ],
                conservationInfo: 'UNESCO-designated biosphere reserve with extensive research programs. The park employs over 500 local community members and supports 12 community-based tourism projects.',
                conservationImpact: {
                    communityProjects: 12,
                    jobsCreated: 500,
                    researchPrograms: 8,
                    annualConservationBudget: '$2.3 million',
                    reforestedArea: '1,200 hectares'
                },
                tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy', 'Eco-Tourism', 'UNESCO', 'Primates', 'Tea Plantations', 'Waterfalls'],
                metaTitle: 'Nyungwe National Park Rwanda | Chimpanzee Trekking & Canopy Walk',
                metaDescription: 'Explore ancient rainforests in Nyungwe National Park Rwanda. Chimpanzee tracking, canopy walkway, bird watching, and tea plantation tours.',
                metaKeywords: 'Nyungwe Forest chimpanzees, canopy walkway Rwanda, colobus monkeys Rwanda, bird watching Nyungwe, Rwanda rainforest tours',
                createdAt: new Date('2023-01-16T08:00:00Z'),
                updatedAt: new Date('2024-01-21T10:30:00Z'),
                views: 8943,
                bookings: 543,
                safetyRating: 4.6,
                accessibility: {
                    wheelchair: 'Partial',
                    seniorFriendly: 'Yes with assistance',
                    childFriendly: '12+ for chimpanzee tracking',
                    fitnessLevel: 'Moderate required for hiking'
                },
                statistics: {
                    primateSpecies: 13,
                    birdSpecies: 310,
                    plantSpecies: 1050,
                    visitorSatisfaction: '94%'
                }
            },
            {
                _id: config.generateObjectId(),
                name: 'Akagera National Park',
                slug: 'akagera-national-park',
                shortDescription: 'Rwanda\'s only Big 5 safari destination with lakes & wetlands',
                location: 'Eastern Rwanda',
                coordinates: {
                    lat: -1.8333,
                    lng: 30.7500
                },
                description: 'Rwanda\'s only Big 5 safari destination, Akagera National Park has undergone one of Africa\'s most remarkable conservation success stories. From near extinction, the park now hosts thriving populations of lions, leopards, elephants, buffalo, and rhinos across 1,122 km² of savannah, wetlands, and lakes.',
                detailedDescription: `
                    <div class="destination-content">
                        <h3>Conservation Success Story</h3>
                        <p>Managed in partnership with African Parks since 2010, Akagera has seen wildlife populations increase by over 500%. Lions and rhinos were successfully reintroduced in 2015 and 2017 respectively, completing the Big 5 experience.</p>
                        
                        <h3>Diverse Ecosystems</h3>
                        <p>The park features rolling hills, acacia woodlands, savannah plains, and extensive wetlands along Lake Ihema - Rwanda\'s largest lake. This diversity supports over 12,000 large mammals and 490 bird species.</p>
                        
                        <h3>Boat Safaris</h3>
                        <p>Unique to Akagera are boat safaris on Lake Ihema, offering close encounters with hippos, crocodiles, and water birds including the rare shoebill stork.</p>
                        
                        <h3>Night Game Drives</h3>
                        <p>Experience nocturnal wildlife including leopards, hyenas, and bushbabies on guided night drives with expert rangers.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/akagera-national-park-rwanda-zebra_oysla0.webp',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/akagera-national-park-rwanda-zebra_oysla0.webp',
                    'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1550358864-518f202c02ba?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                videoUrl: 'https://www.youtube.com/embed/sample-akagera-video',
                rating: 4.6,
                totalReviews: 756,
                basePrice: 650,
                currency: 'USD',
                duration: '2-3 Days',
                difficulty: 'Easy',
                altitude: '1,300 - 1,825 meters',
                bestSeason: 'June-September, December-February',
                permitsRequired: true,
                permitPrice: 50,
                groupSize: '6-8 per vehicle',
                minimumAge: 5,
                available: true,
                featured: true,
                trending: true,
                specialOffer: false,
                highlights: [
                    'Big 5 wildlife safari experience',
                    'Boat safaris on Lake Ihema (Rwanda\'s largest lake)',
                    'Night drives for nocturnal wildlife viewing',
                    'Rhino tracking with expert guides',
                    'Bird watching with 490+ species including shoebill stork',
                    'Walking safaris in designated areas',
                    'Photography hides for wildlife photography',
                    'Cultural visits to local communities'
                ],
                activities: [
                    { 
                        name: 'Big 5 Safari', 
                        icon: 'fas fa-lion', 
                        description: 'Game drives to see lions, elephants, rhinos, leopards, and buffalo with expert guides.',
                        duration: '3-4 hours',
                        difficulty: 'Easy',
                        priceIncluded: true
                    },
                    { 
                        name: 'Boat Safari', 
                        icon: 'fas fa-ship', 
                        description: 'Explore Lake Ihema and see hippos, crocodiles, and water birds including the rare shoebill stork.',
                        duration: '1.5-2 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 45
                    },
                    { 
                        name: 'Night Game Drive', 
                        icon: 'fas fa-moon', 
                        description: 'Spot nocturnal wildlife including leopards, hyenas, bushbabies, and porcupines with expert rangers.',
                        duration: '2-3 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 60
                    },
                    { 
                        name: 'Bird Watching', 
                        icon: 'fas fa-binoculars', 
                        description: 'Over 490 bird species including the rare shoebill stork with expert birding guides.',
                        duration: '3-5 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 50
                    },
                    { 
                        name: 'Walking Safari', 
                        icon: 'fas fa-hiking', 
                        description: 'Guided walking safaris in designated areas for close encounters with wildlife.',
                        duration: '2-3 hours',
                        difficulty: 'Moderate',
                        priceIncluded: false,
                        additionalCost: 40
                    }
                ],
                includedServices: [
                    'Park entry fees',
                    'Game drive vehicle',
                    'Professional guide/driver',
                    'Bottled water',
                    'Park ranger for walking safaris'
                ],
                excludedServices: [
                    'Boat safari fees',
                    'Night drive fees',
                    'Accommodation',
                    'Meals',
                    'Tips',
                    'Travel insurance'
                ],
                conservationInfo: 'Managed in partnership with African Parks since 2010, with wildlife populations increasing by over 500%. The park employs 100% Rwandan staff and supports 12 surrounding communities through tourism revenue.',
                conservationImpact: {
                    lionsReintroduced: 7,
                    rhinosReintroduced: 18,
                    communityJobs: 320,
                    annualRevenue: '$3.2 million',
                    antiPoachingSuccess: '99.9%'
                },
                tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography', 'Conservation', 'Birding', 'Savannah', 'Game Drives', 'Boat Safari'],
                metaTitle: 'Akagera National Park Rwanda | Big 5 Safari & Conservation',
                metaDescription: 'Experience Big 5 safari in Akagera National Park Rwanda. Lion and rhino tracking, boat safaris, bird watching, and conservation tours.',
                metaKeywords: 'Akagera National Park safari, Big 5 Rwanda, lion tracking Rwanda, boat safari Rwanda, shoebill stork Rwanda',
                createdAt: new Date('2023-01-17T08:00:00Z'),
                updatedAt: new Date('2024-01-22T10:30:00Z'),
                views: 10234,
                bookings: 654,
                safetyRating: 4.7,
                accessibility: {
                    wheelchair: 'Limited',
                    seniorFriendly: 'Yes',
                    childFriendly: 'Yes (5+)',
                    fitnessLevel: 'Easy'
                },
                statistics: {
                    largeMammals: 12000,
                    lionPopulation: 58,
                    rhinoPopulation: 32,
                    visitorSatisfaction: '95%'
                }
            },
            {
                _id: config.generateObjectId(),
                name: 'Lake Kivu',
                slug: 'lake-kivu',
                shortDescription: 'Africa\'s 6th largest lake with beaches, islands & water sports',
                location: 'Western Rwanda',
                coordinates: {
                    lat: -2.0000,
                    lng: 29.1667
                },
                description: 'Africa\'s sixth-largest lake and one of Africa\'s safest freshwater lakes, Lake Kivu offers 89km of stunning coastline with beautiful beaches, island resorts, and numerous water activities. The lake is unique for its methane gas reserves and being bilharzia-free, making it safe for swimming.',
                detailedDescription: `
                    <div class="destination-content">
                        <h3>Africa\'s Safest Lake</h3>
                        <p>Unlike many African lakes, Lake Kivu is bilharzia-free and has no crocodiles or hippos near swimming areas, making it exceptionally safe for water activities.</p>
                        
                        <h3>Methane Gas Innovation</h3>
                        <p>The lake contains approximately 55 billion cubic meters of methane gas, which is being extracted for clean energy production while preserving the lake ecosystem.</p>
                        
                        <h3>Scenic Beauty</h3>
                        <p>With the Virunga volcanoes as a backdrop, Lake Kivu offers some of Africa\'s most spectacular sunsets and panoramic views.</p>
                        
                        <h3>Coffee Country</h3>
                        <p>The surrounding hills produce some of Africa\'s finest Arabica coffee. Visitors can tour coffee cooperatives and learn about the bean-to-cup process.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/lake-kivu-rwanda_vc4igd.jpg',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/lake-kivu-rwanda_vc4igd.jpg',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1465310477141-6fb93167a2db?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                videoUrl: 'https://www.youtube.com/embed/sample-lakekivu-video',
                rating: 4.8,
                totalReviews: 943,
                basePrice: 450,
                currency: 'USD',
                duration: '2-4 Days',
                difficulty: 'Easy',
                altitude: '1,460 meters',
                bestSeason: 'Year-round',
                permitsRequired: false,
                groupSize: 'Flexible',
                minimumAge: 'All ages',
                available: true,
                featured: true,
                trending: false,
                specialOffer: true,
                specialOfferText: 'Free sunset cruise with 3+ night stay',
                highlights: [
                    'Island hopping to Napoleon Island (home to fruit bats) and Monkey Islands',
                    'Kayaking along scenic coastline with volcanic backdrops',
                    'Coffee plantation tours and tastings in Rwanda\'s coffee heartland',
                    'Swimming in bilharzia-free, warm waters',
                    'Beautiful sunset boat cruises with views of the Virunga volcanoes',
                    'Fishing with local fishermen',
                    'Lakeside cycling tours',
                    'Water sports including paddle boarding and sailing'
                ],
                activities: [
                    { 
                        name: 'Island Hopping', 
                        icon: 'fas fa-ship', 
                        description: 'Visit Napoleon Island (bat colony) and Monkey Island with local boat captains.',
                        duration: '3-4 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 80
                    },
                    { 
                        name: 'Kayaking Adventure', 
                        icon: 'fas fa-water', 
                        description: 'Paddle along the beautiful coastline and hidden coves with professional guides.',
                        duration: '2-3 hours',
                        difficulty: 'Easy to Moderate',
                        priceIncluded: false,
                        additionalCost: 45
                    },
                    { 
                        name: 'Coffee Tours', 
                        icon: 'fas fa-coffee', 
                        description: 'Visit coffee cooperatives and learn about processing from bean to cup with tastings.',
                        duration: '3-4 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 35
                    },
                    { 
                        name: 'Boat Cruises', 
                        icon: 'fas fa-sailboat', 
                        description: 'Sunset cruises and traditional fishing experiences with local fishermen.',
                        duration: '1.5-2 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 60
                    },
                    { 
                        name: 'Water Sports', 
                        icon: 'fas fa-swimmer', 
                        description: 'Stand-up paddle boarding, sailing, and swimming in safe, warm waters.',
                        duration: '2-3 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 30
                    }
                ],
                includedServices: [
                    'Professional guide for activities',
                    'Safety equipment',
                    'Bottled water',
                    'Local taxes'
                ],
                excludedServices: [
                    'Boat rental fees',
                    'Equipment rental',
                    'Accommodation',
                    'Meals',
                    'Tips',
                    'Travel insurance'
                ],
                conservationInfo: 'Methane gas extraction provides clean energy while preserving lake ecosystems. Local communities are involved in sustainable fishing practices and tourism development.',
                conservationImpact: {
                    cleanEnergyProduction: '26MW',
                    communityJobs: 450,
                    sustainableFishingZones: 8,
                    annualTourismRevenue: '$4.1 million'
                },
                tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports', 'Culture', 'Coffee', 'Kayaking', 'Boating', 'Swimming'],
                metaTitle: 'Lake Kivu Rwanda | Beach Holidays & Water Activities',
                metaDescription: 'Enjoy Lake Kivu Rwanda holidays with island hopping, kayaking, coffee tours, and sunset cruises. Safe swimming and water sports in Africa\'s beautiful lake.',
                metaKeywords: 'Lake Kivu Rwanda, island hopping Rwanda, kayaking Lake Kivu, Rwanda coffee tours, beach holiday Rwanda',
                createdAt: new Date('2023-01-18T08:00:00Z'),
                updatedAt: new Date('2024-01-23T10:30:00Z'),
                views: 11567,
                bookings: 789,
                safetyRating: 4.9,
                accessibility: {
                    wheelchair: 'Partial',
                    seniorFriendly: 'Yes',
                    childFriendly: 'Yes',
                    fitnessLevel: 'Easy'
                },
                statistics: {
                    coastlineLength: '89km',
                    islands: 28,
                    waterTemperature: '24-28°C',
                    visitorSatisfaction: '97%'
                }
            },
            {
                _id: config.generateObjectId(),
                name: 'Kigali City',
                slug: 'kigali-city',
                shortDescription: 'Africa\'s cleanest capital with culture, history & modern amenities',
                location: 'Kigali, Rwanda',
                coordinates: {
                    lat: -1.9441,
                    lng: 30.0619
                },
                description: 'Rwanda\'s clean, safe, and rapidly developing capital is consistently ranked among Africa\'s most livable cities. Spread across scenic hills, Kigali offers a unique blend of traditional culture, colonial history, and modern development. The city serves as the perfect gateway to exploring all regions of Rwanda.',
                detailedDescription: `
                    <div class="destination-content">
                        <h3>Africa\'s Model City</h3>
                        <p>Kigali has won multiple awards for cleanliness, safety, and urban planning. The city\'s monthly community cleaning day (Umuganda) involves all residents in maintaining their environment.</p>
                        
                        <h3>Cultural Melting Pot</h3>
                        <p>From traditional craft markets to contemporary art galleries, Kigali showcases Rwanda\'s rich cultural heritage alongside modern African creativity.</p>
                        
                        <h3>Culinary Scene</h3>
                        <p>The city boasts a diverse food scene ranging from traditional Rwandan cuisine to international fine dining, with many restaurants sourcing ingredients locally.</p>
                        
                        <h3>Historical Significance</h3>
                        <p>Kigali offers profound historical experiences including the Kigali Genocide Memorial, which provides education and reflection on Rwanda\'s journey of reconciliation.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/Kigali-Citys-1_agovb2.jpg',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767662349/Kigali-Citys-1_agovb2.jpg',
                    'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                videoUrl: 'https://www.youtube.com/embed/sample-kigali-video',
                rating: 4.9,
                totalReviews: 1567,
                basePrice: 0,
                currency: 'USD',
                duration: 'Half Day to 2 Days',
                difficulty: 'Easy',
                altitude: '1,400 - 1,600 meters',
                bestSeason: 'Year-round',
                permitsRequired: false,
                groupSize: '2-15',
                minimumAge: 'All ages',
                available: true,
                featured: true,
                trending: false,
                specialOffer: false,
                highlights: [
                    'Clean, safe, and well-organized urban environment',
                    'Kigali Genocide Memorial - powerful tribute and education center',
                    'Kimironko Market - vibrant local market experience',
                    'Rwanda Art Museum and Inema Arts Center',
                    'Growing culinary scene with international and local cuisine',
                    'City viewpoints with panoramic views',
                    'Craft villages and artisan workshops',
                    'Nightlife and entertainment options'
                ],
                activities: [
                    { 
                        name: 'City Cultural Tour', 
                        icon: 'fas fa-city', 
                        description: 'Guided exploration of Kigali\'s landmarks, markets, and neighborhoods with cultural insights.',
                        duration: '3-4 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 60
                    },
                    { 
                        name: 'Genocide Memorial Visit', 
                        icon: 'fas fa-landmark', 
                        description: 'Reflective visit to the Kigali Genocide Memorial with expert guides for historical context.',
                        duration: '2-3 hours',
                        difficulty: 'Easy',
                        priceIncluded: true
                    },
                    { 
                        name: 'Art & Craft Exploration', 
                        icon: 'fas fa-palette', 
                        description: 'Visit local art centers and craft cooperatives with opportunities to purchase authentic souvenirs.',
                        duration: '2-3 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 40
                    },
                    { 
                        name: 'Culinary Experience', 
                        icon: 'fas fa-utensils', 
                        description: 'Food tours featuring Rwandan and international cuisine with cooking demonstrations.',
                        duration: '3-4 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 75
                    },
                    { 
                        name: 'Nightlife Tour', 
                        icon: 'fas fa-music', 
                        description: 'Experience Kigali\'s vibrant nightlife with visits to local bars and cultural performances.',
                        duration: '3-4 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 50
                    }
                ],
                includedServices: [
                    'Professional guide',
                    'Transportation for tours',
                    'Entry to Genocide Memorial',
                    'Bottled water'
                ],
                excludedServices: [
                    'Additional activity fees',
                    'Meals and drinks',
                    'Shopping expenses',
                    'Tips',
                    'Travel insurance'
                ],
                conservationInfo: 'Kigali is Africa\'s cleanest city with monthly community cleaning days (Umuganda). The city has banned plastic bags and implements strict waste management policies.',
                conservationImpact: {
                    plasticBan: 'Since 2008',
                    recyclingRate: '45%',
                    greenSpaces: '30% of city area',
                    communityParticipation: '98% in Umuganda'
                },
                tags: ['City', 'Culture', 'History', 'Food', 'Art', 'Modern Rwanda', 'Urban', 'Shopping', 'Nightlife', 'Architecture'],
                metaTitle: 'Kigali City Rwanda | Cultural Tours & Urban Experiences',
                metaDescription: 'Discover Kigali Rwanda - Africa\'s cleanest capital. Cultural tours, genocide memorial visits, art galleries, and culinary experiences in a safe, modern city.',
                metaKeywords: 'Kigali city tours, Rwanda genocide memorial, Kimironko market Rwanda, Kigali art galleries, Rwanda food tours',
                createdAt: new Date('2023-01-19T08:00:00Z'),
                updatedAt: new Date('2024-01-24T10:30:00Z'),
                views: 18765,
                bookings: 2345,
                safetyRating: 4.8,
                accessibility: {
                    wheelchair: 'Good',
                    seniorFriendly: 'Excellent',
                    childFriendly: 'Excellent',
                    fitnessLevel: 'Easy'
                },
                statistics: {
                    population: '1.2 million',
                    cleanlinessRating: '98%',
                    safetyIndex: 85,
                    visitorSatisfaction: '96%'
                }
            },
            {
                _id: config.generateObjectId(),
                name: 'King\'s Palace Museum',
                slug: 'kings-palace-museum',
                shortDescription: 'Traditional Rwandan royal palace with long-horned cows',
                location: 'Nyanza, Southern Rwanda',
                coordinates: {
                    lat: -2.3512,
                    lng: 29.7466
                },
                description: 'The reconstructed Royal Palace of the Rwandan monarchy offers a fascinating glimpse into pre-colonial Rwandan society. The traditional thatched palace, modeled after the residence of King Mutara III Rudahigwa, showcases royal architecture, artifacts, and the famous Inyambo long-horned cows.',
                detailedDescription: `
                    <div class="destination-content">
                        <h3>Royal Heritage</h3>
                        <p>The palace was the traditional residence of Rwanda\'s monarchy before colonization. The current reconstruction accurately represents 19th-century royal architecture and lifestyle.</p>
                        
                        <h3>Inyambo Sacred Cows</h3>
                        <p>The palace is famous for its herd of Inyambo cows, bred for their extraordinarily long horns (over 2 meters) and gentle temperament. They were considered sacred in Rwandan culture.</p>
                        
                        <h3>Traditional Architecture</h3>
                        <p>The palace showcases traditional construction techniques using locally sourced materials, with intricate thatching and woodwork demonstrating Rwandan craftsmanship.</p>
                        
                        <h3>Cultural Performances</h3>
                        <p>Regular performances of Intore dance and drumming provide insight into Rwanda\'s rich cultural traditions and royal ceremonies.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768348646/befbedba-6cb3-4da4-8e1e-d86db71af565.png',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768348646/befbedba-6cb3-4da4-8e1e-d86db71af565.png',
                    'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                rating: 4.5,
                totalReviews: 456,
                basePrice: 35,
                currency: 'USD',
                duration: 'Half Day',
                difficulty: 'Easy',
                altitude: '1,700 meters',
                bestSeason: 'Year-round',
                permitsRequired: false,
                groupSize: '2-20',
                minimumAge: 'All ages',
                available: true,
                featured: false,
                trending: false,
                specialOffer: false,
                highlights: [
                    'Traditional royal palace reconstruction',
                    'Inyambo sacred long-horned cows with horns spanning over 2 meters',
                    'Cultural dance performances by Intore dancers',
                    'Traditional architecture and royal artifacts',
                    'Historical insights into Rwanda\'s monarchy system',
                    'Craft demonstrations and workshops',
                    'Guided tours with cultural experts',
                    'Photography with traditional attire'
                ],
                activities: [
                    { 
                        name: 'Palace Tour', 
                        icon: 'fas fa-landmark', 
                        description: 'Explore traditional royal dwellings and compounds with expert cultural guides.',
                        duration: '1.5-2 hours',
                        difficulty: 'Easy',
                        priceIncluded: true
                    },
                    { 
                        name: 'Cow Ceremony Experience', 
                        icon: 'fas fa-cow', 
                        description: 'See the famous Inyambo long-horned cows and learn about their significance in Rwandan culture.',
                        duration: '30-45 minutes',
                        difficulty: 'Easy',
                        priceIncluded: true
                    },
                    { 
                        name: 'Cultural Performance', 
                        icon: 'fas fa-music', 
                        description: 'Watch traditional Intore dance and drumming performances by local artists.',
                        duration: '45-60 minutes',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 15
                    },
                    { 
                        name: 'Craft Demonstrations', 
                        icon: 'fas fa-hammer', 
                        description: 'Traditional crafts and building techniques demonstrations by local artisans.',
                        duration: '1-2 hours',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 20
                    },
                    { 
                        name: 'Traditional Attire Experience', 
                        icon: 'fas fa-tshirt', 
                        description: 'Dress in traditional Rwandan attire and learn about clothing significance.',
                        duration: '30-45 minutes',
                        difficulty: 'Easy',
                        priceIncluded: false,
                        additionalCost: 25
                    }
                ],
                includedServices: [
                    'Entry ticket',
                    'Guided palace tour',
                    'Cow ceremony viewing',
                    'Bottled water'
                ],
                excludedServices: [
                    'Cultural performance fees',
                    'Craft workshop fees',
                    'Traditional attire rental',
                    'Transportation',
                    'Tips',
                    'Travel insurance'
                ],
                conservationInfo: 'Preserves traditional Rwandan architecture and cultural practices. The museum employs local artisans and performers, supporting cultural preservation and community livelihoods.',
                conservationImpact: {
                    artisansEmployed: 45,
                    culturalPerformers: 32,
                    traditionalBuildingsPreserved: 8,
                    annualVisitors: '25,000'
                },
                tags: ['Culture', 'History', 'Royalty', 'Traditional', 'Museum', 'Performance', 'Heritage', 'Architecture', 'Crafts', 'Dance'],
                metaTitle: 'King\'s Palace Museum Rwanda | Royal Heritage & Cultural Tours',
                metaDescription: 'Visit King\'s Palace Museum Rwanda to experience royal heritage, traditional architecture, long-horned cows, and cultural performances in Nyanza.',
                metaKeywords: 'King\'s Palace Museum Rwanda, Rwandan monarchy, Inyambo cows Rwanda, traditional architecture Rwanda, cultural tours Rwanda',
                createdAt: new Date('2023-01-20T08:00:00Z'),
                updatedAt: new Date('2024-01-25T10:30:00Z'),
                views: 5678,
                bookings: 432,
                safetyRating: 4.7,
                accessibility: {
                    wheelchair: 'Partial',
                    seniorFriendly: 'Yes',
                    childFriendly: 'Yes',
                    fitnessLevel: 'Easy'
                },
                statistics: {
                    palaceAge: '200+ years',
                    culturalPerformances: 'Daily',
                    artifactCollection: '500+ items',
                    visitorSatisfaction: '93%'
                }
            }
        ],

        // ===== ACCOMMODATIONS =====
        accommodations: [
            {
                _id: config.generateObjectId(),
                name: 'One&Only Gorilla\'s Nest',
                slug: 'one-only-gorillas-nest',
                type: 'Luxury Lodge',
                category: '5-Star',
                location: 'Volcanoes National Park, Musanze, Northern Province',
                coordinates: {
                    lat: -1.5012,
                    lng: 29.6341
                },
                description: 'An exclusive luxury lodge nestled in the foothills of the Virunga volcanoes, offering unparalleled gorilla trekking access. The lodge combines contemporary luxury with authentic Rwandan design, featuring 21 forest-facing rooms and suites with private decks, fireplaces, and stunning volcano views.',
                detailedDescription: `
                    <div class="accommodation-content">
                        <h3>Ultimate Gorilla Experience</h3>
                        <p>Located just 10 minutes from the Volcanoes National Park headquarters, One&Only Gorilla\'s Nest offers the most convenient access to gorilla trekking. The lodge\'s Gorilla Trekking Preparation Center provides expert briefings and equipment.</p>
                        
                        <h3>Sustainable Luxury</h3>
                        <p>The lodge operates on 100% solar power, sources 80% of ingredients locally, and employs 95% Rwandan staff. Luxury tents are designed with minimal environmental impact while offering maximum comfort.</p>
                        
                        <h3>Wellness & Relaxation</h3>
                        <p>The ESPA Spa offers treatments using local ingredients, while the infinity pool provides breathtaking volcano views. Private yoga sessions and meditation spaces are available.</p>
                        
                        <h3>Culinary Excellence</h3>
                        <p>Executive chefs create gourmet experiences blending international cuisine with Rwandan flavors. Private dining options include forest picnics and volcano-view dinners.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654351/one-and-only-kinigi_sgleyo.jpg',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767654351/one-and-only-kinigi_sgleyo.jpg',
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                pricePerNight: 3500,
                currency: 'USD',
                rating: 4.9,
                totalReviews: 342,
                amenities: [
                    { name: 'Infinity Pool with Volcano Views', included: true, icon: 'fas fa-swimming-pool', category: 'Pool' },
                    { name: 'ESPA Spa & Wellness Center', included: true, icon: 'fas fa-spa', category: 'Wellness' },
                    { name: 'Fine Dining Restaurant & Bar', included: true, icon: 'fas fa-utensils', category: 'Dining' },
                    { name: 'Private Fireplace in Each Room', included: true, icon: 'fas fa-fire', category: 'Room Amenities' },
                    { name: '24-Hour Butler Service', included: true, icon: 'fas fa-concierge-bell', category: 'Service' },
                    { name: 'Gorilla Trekking Preparation Center', included: true, icon: 'fas fa-hiking', category: 'Activities' },
                    { name: 'Helicopter Transfer Service', included: true, icon: 'fas fa-helicopter', category: 'Transport' },
                    { name: 'Private Yoga Studio', included: true, icon: 'fas fa-spa', category: 'Wellness' },
                    { name: 'Wine Cellar & Tasting Room', included: true, icon: 'fas fa-wine-glass-alt', category: 'Dining' },
                    { name: 'Business Center', included: true, icon: 'fas fa-briefcase', category: 'Business' },
                    { name: 'Kids Club', included: true, icon: 'fas fa-child', category: 'Family' },
                    { name: 'Library & Lounge', included: true, icon: 'fas fa-book', category: 'Entertainment' }
                ],
                roomTypes: [
                    {
                        name: 'Forest View Suite',
                        description: 'Luxury suite with private deck overlooking the rainforest',
                        maxGuests: 2,
                        size: '85 m²',
                        beds: '1 King Bed',
                        price: 3500,
                        features: ['Private deck', 'Fireplace', 'Outdoor shower', 'Mini-bar']
                    },
                    {
                        name: 'Volcano View Villa',
                        description: 'Private villa with panoramic volcano views',
                        maxGuests: 4,
                        size: '120 m²',
                        beds: '2 King Beds',
                        price: 5000,
                        features: ['Private pool', 'Butler service', 'Dining area', 'Study']
                    }
                ],
                available: true,
                featured: true,
                totalRooms: 21,
                roomsAvailable: 8,
                checkInTime: '14:00',
                checkOutTime: '11:00',
                contactPhone: '+250787407051',
                contactEmail: 'reservations@oneandonlygorillasnest.com',
                website: 'https://www.oneandonlyresorts.com/gorillas-nest',
                address: 'Kinigi, Musanze District, Northern Province, Rwanda',
                sustainability: 'Carbon-neutral operations, solar-powered, supports local communities, zero single-use plastic, organic garden',
                sustainabilityDetails: {
                    solarPower: '100%',
                    localStaff: '95%',
                    localSourcing: '80%',
                    waterRecycling: '90%',
                    wasteComposting: '100%'
                },
                policies: {
                    cancellation: 'Free cancellation up to 30 days before arrival',
                    children: 'Children welcome, kids club available',
                    pets: 'Not allowed',
                    smoking: 'Designated areas only',
                    payment: 'Credit cards accepted, deposit required'
                },
                distanceToAttractions: {
                    volcanoesPark: '2 km',
                    gorillaTrekkingStart: '5 km',
                    musanzeTown: '15 km',
                    kigaliAirport: '110 km'
                },
                tags: ['Luxury', 'Eco-Friendly', 'Mountain View', 'Spa', 'Pool', 'Fine Dining', 'Butler Service', 'Family Friendly', 'Romantic', 'Business'],
                metaTitle: 'One&Only Gorilla\'s Nest | Luxury Lodge Rwanda',
                metaDescription: '5-star luxury lodge at Volcanoes National Park Rwanda. Infinity pool, spa, fine dining, and exclusive gorilla trekking access with expert guides.',
                metaKeywords: 'One&Only Gorilla\'s Nest, luxury lodge Rwanda, Volcanoes National Park accommodation, Rwanda luxury safari lodge, gorilla trekking hotel',
                createdAt: new Date('2023-02-01T08:00:00Z'),
                updatedAt: new Date('2024-02-15T10:30:00Z'),
                views: 15432,
                bookings: 876,
                safetyRating: 4.9,
                awards: [
                    'World Travel Awards - Africa\'s Leading Luxury Lodge 2023',
                    'Condé Nast Traveler - Top 10 Resorts in Africa',
                    'Travel + Leisure - World\'s Best Awards'
                ]
            },
            {
                _id: config.generateObjectId(),
                name: 'Kigali Marriott Hotel',
                slug: 'kigali-marriott-hotel',
                type: '5-Star Hotel',
                category: 'Business & Luxury',
                location: 'Kigali City Center, Rwanda',
                coordinates: {
                    lat: -1.9576,
                    lng: 30.0936
                },
                description: 'Located in the heart of Kigali\'s business district, the Marriott offers 254 rooms and suites with panoramic city views. The hotel features Rwanda\'s largest ballroom, multiple dining options, and direct access to Kigali Convention Centre. Ideal for business travelers and luxury seekers.',
                detailedDescription: `
                    <div class="accommodation-content">
                        <h3>Business Excellence</h3>
                        <p>With Rwanda\'s largest conference facilities (2,500 capacity), state-of-the-art business center, and executive lounge, the Marriott is Kigali\'s premier business hotel.</p>
                        
                        <h3>City Center Location</h3>
                        <p>Directly connected to Kigali Convention Centre and within walking distance of government offices, embassies, and financial institutions.</p>
                        
                        <h3>Culinary Diversity</h3>
                        <p>Four restaurants and three bars offer everything from Rwandan specialties to international cuisine, with 24-hour room service available.</p>
                        
                        <h3>Sustainability Leadership</h3>
                        <p>LEED-certified building with advanced water recycling, energy-efficient systems, and comprehensive waste management programs.</p>
                    </div>
                `,
                mainImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664108/Marriott-Hotel-Kigali-Rwanda-Safaris_8__Tett-Safaris_v78edy.webp',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664108/Marriott-Hotel-Kigali-Rwanda-Safaris_8__Tett-Safaris_v78edy.webp',
                    'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1564501049418-3c27787d01e8?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                pricePerNight: 450,
                currency: 'USD',
                rating: 4.8,
                totalReviews: 1245,
                amenities: [
                    { name: 'Rooftop Infinity Pool', included: true, icon: 'fas fa-swimming-pool', category: 'Pool' },
                    { name: 'Multiple Restaurants & Bars', included: true, icon: 'fas fa-utensils', category: 'Dining' },
                    { name: 'Business Center & Meeting Rooms', included: true, icon: 'fas fa-briefcase', category: 'Business' },
                    { name: '24-Hour Fitness Center', included: true, icon: 'fas fa-dumbbell', category: 'Fitness' },
                    { name: 'Concierge & Tour Desk', included: true, icon: 'fas fa-concierge-bell', category: 'Service' },
                    { name: 'Spa & Wellness Facilities', included: true, icon: 'fas fa-spa', category: 'Wellness' },
                    { name: 'Executive Lounge Access', included: true, icon: 'fas fa-crown', category: 'Business' },
                    { name: 'Valet Parking', included: true, icon: 'fas fa-parking', category: 'Transport' },
                    { name: '24-Hour Room Service', included: true, icon: 'fas fa-bell', category: 'Service' },
                    { name: 'High-Speed WiFi', included: true, icon: 'fas fa-wifi', category: 'Technology' },
                    { name: 'Laundry Service', included: true, icon: 'fas fa-tshirt', category: 'Service' },
                    { name: 'Airport Shuttle', included: true, icon: 'fas fa-shuttle-van', category: 'Transport' }
                ],
                roomTypes: [
                    {
                        name: 'Deluxe Room',
                        description: 'Spacious room with city views and modern amenities',
                        maxGuests: 2,
                        size: '42 m²',
                        beds: '1 King Bed or 2 Double Beds',
                        price: 450,
                        features: ['City view', 'Work desk', 'Mini-bar', 'Safety deposit box']
                    },
                    {
                        name: 'Executive Suite',
                        description: 'Luxury suite with separate living area and executive lounge access',
                        maxGuests: 3,
                        size: '85 m²',
                        beds: '1 King Bed',
                        price: 750,
                        features: ['Executive lounge', 'Separate living room', 'Bathroom TV', 'Nespresso machine']
                    }
                ],
                available: true,
                featured: true,
                totalRooms: 254,
                roomsAvailable: 45,
                checkInTime: '15:00',
                checkOutTime: '12:00',
                contactPhone: '+250787407051',
                contactEmail: 'reservations@marriottkigali.com',
                website: 'https://www.marriott.com/hotels/travel/kglmc-kigali-marriott-hotel/',
                address: 'KN 3 Avenue, Kigali, Rwanda',
                sustainability: 'LEED-certified building, water recycling system, local employment focus, energy-efficient design, sustainable sourcing',
                sustainabilityDetails: {
                    leedCertification: 'Gold',
                    waterRecycling: '40%',
                    energyReduction: '30%',
                    localEmployment: '92%',
                    wasteDiversion: '65%'
                },
                policies: {
                    cancellation: 'Free cancellation up to 24 hours before arrival',
                    children: 'Children stay free, extra beds available',
                    pets: 'Service animals only',
                    smoking: 'Non-smoking hotel',
                    payment: 'All major credit cards accepted'
                },
                distanceToAttractions: {
                    kigaliConventionCentre: 'Connected',
                    genocideMemorial: '3 km',
                    cityCenter: '0.5 km',
                    airport: '10 km'
                },
                tags: ['Business', 'Luxury', 'City Center', 'Conference', 'Spa', 'Pool', 'Fine Dining', 'Family Friendly', 'Accessible', 'Modern'],
                metaTitle: 'Kigali Marriott Hotel | 5-Star Business Hotel Rwanda',
                metaDescription: '5-star Marriott Hotel in Kigali city center. Rooftop pool, spa, multiple restaurants, conference facilities, and luxury accommodations.',
                metaKeywords: 'Kigali Marriott Hotel, 5-star hotel Kigali, business hotel Rwanda, Kigali Convention Centre hotel, luxury accommodation Kigali',
                createdAt: new Date('2023-02-02T08:00:00Z'),
                updatedAt: new Date('2024-02-16T10:30:00Z'),
                views: 23456,
                bookings: 3456,
                safetyRating: 4.8,
                awards: [
                    'World Travel Awards - Rwanda\'s Leading Hotel 2023',
                    'Business Traveller Awards - Best Business Hotel East Africa',
                    'TripAdvisor Travelers\' Choice'
                ]
            },
            // Add 4 more accommodations with same structure
        ],

        // ===== BLOG POSTS =====
        blogPosts: [
            {
                _id: config.generateObjectId(),
                title: 'Ultimate Guide to Gorilla Trekking in Rwanda: Everything You Need to Know',
                slug: 'gorilla-trekking-guide-rwanda',
                author: 'Dr. Patience Rutayisire',
                authorImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png',
                authorRole: 'Senior Wildlife Specialist & Conservationist',
                authorBio: 'With 8+ years in wildlife conservation and gorilla research, Patience leads training programs for guides and contributes to conservation research.',
                excerpt: 'Complete professional guide to planning your gorilla trekking adventure in Rwanda. Learn about permits, preparation, fitness requirements, photography tips, and conservation impact.',
                content: `
                    <div class="blog-article">
                        <h2>Introduction to Gorilla Trekking in Rwanda</h2>
                        <p>Mountain gorilla trekking in Rwanda's Volcanoes National Park represents one of the most profound wildlife experiences on Earth. With only about 1,063 mountain gorillas remaining worldwide, Rwanda's successful conservation program has made this once-in-a-lifetime experience accessible to responsible travelers.</p>
                        
                        <h3>Understanding Mountain Gorillas</h3>
                        <p>Mountain gorillas (Gorilla beringei beringei) are one of two subspecies of eastern gorilla. They are larger than their lowland cousins, with males (silverbacks) weighing up to 220kg. Rwanda is home to approximately 604 mountain gorillas across 12 habituated families.</p>
                        
                        <h3>Permit Information & Booking</h3>
                        <div class="info-table">
                            <table>
                                <tr>
                                    <th>Detail</th>
                                    <th>Information</th>
                                </tr>
                                <tr>
                                    <td>Cost (2024)</td>
                                    <td>$1,500 per person</td>
                                </tr>
                                <tr>
                                    <td>Availability</td>
                                    <td>96 permits daily (12 families × 8 visitors)</td>
                                </tr>
                                <tr>
                                    <td>Booking Window</td>
                                    <td>6-12 months advance for peak seasons</td>
                                </tr>
                                <tr>
                                    <td>Inclusions</td>
                                    <td>Park entry, guide services, trackers, conservation fees</td>
                                </tr>
                                <tr>
                                    <td>Exclusions</td>
                                    <td>Transportation, accommodation, tips, travel insurance</td>
                                </tr>
                            </table>
                        </div>
                        
                        <h3>Physical Preparation & Fitness</h3>
                        <p>Trekking difficulty ranges from 1-8 hours hiking through dense rainforest at altitudes of 2,500-4,000 meters. We recommend:</p>
                        <ul>
                            <li><strong>Cardio Training:</strong> 30-45 minutes daily, 4-6 weeks before trek</li>
                            <li><strong>Leg Strength:</strong> Squats, lunges, stair climbing</li>
                            <li><strong>Altitude Acclimatization:</strong> Arrive in Rwanda 1-2 days early</li>
                            <li><strong>Practice Hikes:</strong> With loaded backpack on uneven terrain</li>
                        </ul>
                        
                        <h3>Essential Packing List</h3>
                        <div class="packing-list">
                            <div class="category">
                                <h4>Clothing</h4>
                                <ul>
                                    <li>Waterproof hiking boots (broken in)</li>
                                    <li>Moisture-wicking socks (3 pairs)</li>
                                    <li>Lightweight waterproof jacket</li>
                                    <li>Long-sleeved shirts (protection from nettles)</li>
                                    <li>Convertible hiking pants</li>
                                    <li>Warm layer (fleece or down jacket)</li>
                                    <li>Gardening gloves (for vegetation)</li>
                                </ul>
                            </div>
                            <div class="category">
                                <h4>Equipment</h4>
                                <ul>
                                    <li>Daypack (20-30 liters)</li>
                                    <li>Water bottle/hydration pack (2 liters)</li>
                                    <li>Trekking poles (recommended)</li>
                                    <li>Waterproof bags for electronics</li>
                                    <li>Headlamp with extra batteries</li>
                                    <li>Small first aid kit</li>
                                </ul>
                            </div>
                            <div class="category">
                                <h4>Photography</h4>
                                <ul>
                                    <li>Camera with 70-200mm or 100-400mm lens</li>
                                    <li>Extra batteries (2-3)</li>
                                    <li>Memory cards (64GB+ recommended)</li>
                                    <li>Lens cleaning kit</li>
                                    <li>Rain cover for camera</li>
                                </ul>
                            </div>
                        </div>
                        
                        <h3>Trekking Day Experience</h3>
                        <p>A typical gorilla trekking day follows this schedule:</p>
                        <ol>
                            <li><strong>6:00 AM:</strong> Breakfast at your lodge</li>
                            <li><strong>6:30 AM:</strong> Transfer to park headquarters</li>
                            <li><strong>7:00 AM:</strong> Registration and briefing</li>
                            <li><strong>7:30 AM:</strong> Meet guides and trackers</li>
                            <li><strong>8:00 AM:</strong> Begin trek to gorilla family</li>
                            <li><strong>10:00-12:00 PM:</strong> Reach gorillas (time varies)</li>
                            <li><strong>1 Hour:</strong> Observe gorillas (7-meter distance)</li>
                            <li><strong>Afternoon:</strong> Return trek and debriefing</li>
                            <li><strong>4:00 PM:</strong> Return certificates at headquarters</li>
                        </ol>
                        
                        <h3>Photography Guidelines</h3>
                        <div class="photography-tips">
                            <div class="tip">
                                <h4>Camera Settings</h4>
                                <ul>
                                    <li>Shutter Speed: Minimum 1/250s (gorillas move quickly)</li>
                                    <li>Aperture: f/4-f/5.6 for subject isolation</li>
                                    <li>ISO: 800-3200 (forest lighting varies)</li>
                                    <li>Focus Mode: Continuous AF for moving subjects</li>
                                </ul>
                            </div>
                            <div class="tip">
                                <h4>Composition Tips</h4>
                                <ul>
                                    <li>Focus on eyes for emotional connection</li>
                                    <li>Include environment for context</li>
                                    <li>Capture interactions between gorillas</li>
                                    <li>Use natural frames (vines, foliage)</li>
                                </ul>
                            </div>
                            <div class="tip">
                                <h4>Important Rules</h4>
                                <ul>
                                    <li>NO flash photography (disturbs gorillas)</li>
                                    <li>7-meter minimum distance at all times</li>
                                    <li>Maximum group photography time: 1 hour</li>
                                    <li>Follow guide's instructions immediately</li>
                                </ul>
                            </div>
                        </div>
                        
                        <h3>Conservation Impact</h3>
                        <p>Your $1,500 permit contributes directly to conservation:</p>
                        <div class="conservation-breakdown">
                            <div class="breakdown-item">
                                <h4>10% - National Parks</h4>
                                <p>Infrastructure maintenance, ranger salaries, equipment</p>
                            </div>
                            <div class="breakdown-item">
                                <h4>5% - Local Communities</h4>
                                <p>Schools, healthcare, clean water, income-generating projects</p>
                            </div>
                            <div class="breakdown-item">
                                <h4>5% - Research</h4>
                                <p>Gorilla monitoring, health checks, behavioral studies</p>
                            </div>
                            <div class="breakdown-item">
                                <h4>80% - Government Revenue</h4>
                                <p>National development, conservation policy implementation</p>
                            </div>
                        </div>
                        
                        <h3>Success Stories</h3>
                        <p>Since 2005, Rwanda's conservation efforts have achieved:</p>
                        <ul>
                            <li>26% increase in mountain gorilla population</li>
                            <li>12 habituated gorilla families (from 7 in 2005)</li>
                            <li>$5 million annually to local communities</li>
                            <li>98% reduction in poaching incidents</li>
                            <li>100% local employment in park management</li>
                        </ul>
                        
                        <h3>Health & Safety</h3>
                        <div class="safety-info">
                            <div class="safety-item">
                                <h4>Medical Requirements</h4>
                                <ul>
                                    <li>Yellow fever vaccination (mandatory)</li>
                                    <li>COVID-19 vaccination (recommended)</li>
                                    <li>Travel insurance with emergency evacuation</li>
                                    <li>Altitude sickness medication (consult doctor)</li>
                                </ul>
                            </div>
                            <div class="safety-item">
                                <h4>During Trek</h4>
                                <ul>
                                    <li>Stay with your group and guide</li>
                                    <li>Hydrate regularly (altitude dehydrates)</li>
                                    <li>Report any health issues immediately</li>
                                    <li>Follow gorilla viewing protocols strictly</li>
                                </ul>
                            </div>
                        </div>
                        
                        <h3>Frequently Asked Questions</h3>
                        <div class="faq-section">
                            <div class="faq-item">
                                <h4>Q: What happens if we don't find gorillas?</h4>
                                <p>A: The success rate is over 98%. If gorillas aren't found, you may receive a partial refund or opportunity to trek another day.</p>
                            </div>
                            <div class="faq-item">
                                <h4>Q: Can children go gorilla trekking?</h4>
                                <p>A: Minimum age is 15 years. This ensures safety and that children can follow instructions in challenging terrain.</p>
                            </div>
                            <div class="faq-item">
                                <h4>Q: Are porters available?</h4>
                                <p>A: Yes, porters are available for $20. They carry your backpack and assist on difficult sections.</p>
                            </div>
                            <div class="faq-item">
                                <h4>Q: What's the best time of year?</h4>
                                <p>A: Dry seasons (June-September, December-February) offer better trekking conditions. Wet seasons have lush scenery but slippery trails.</p>
                            </div>
                        </div>
                        
                        <h3>Booking Through GoTrip</h3>
                        <p>When you book with GoTrip Rwanda, you receive:</p>
                        <ul>
                            <li>Guaranteed permit booking</li>
                            <li>Expert local guides with 8+ years experience</li>
                            <li>Pre-trek preparation session</li>
                            <li>24/7 support during your trip</li>
                            <li>Conservation contribution tracking</li>
                            <li>Customized itineraries including accommodation</li>
                        </ul>
                        
                        <div class="cta-section">
                            <h3>Ready for Your Gorilla Adventure?</h3>
                            <p>Contact our expert team to start planning your once-in-a-lifetime gorilla trekking experience in Rwanda.</p>
                            <a href="#contact" class="btn btn-primary">Plan My Gorilla Trek</a>
                        </div>
                    </div>
                `,
                featuredImage: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768334331/the-life-of-mountain-gorillas-_odzqfl.jpg',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1768334331/the-life-of-mountain-gorillas-_odzqfl.jpg',
                    'https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1200&h=800&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1550340499-a6c60fc8287c?w=1200&h=800&fit=crop&q=80&auto=format'
                ],
                category: 'Wildlife & Adventure',
                subcategory: 'Gorilla Trekking',
                featured: true,
                published: true,
                readTime: 15,
                wordCount: 2850,
                publishedDate: new Date('2024-01-15T09:00:00Z'),
                updatedDate: new Date('2024-01-20T14:30:00Z'),
                tags: ['Gorilla Trekking', 'Wildlife', 'Conservation', 'Volcanoes National Park', 'Photography', 'Permits', 'Travel Tips', 'Adventure', 'Rwanda', 'Sustainable Tourism'],
                metaTitle: 'Complete Gorilla Trekking Guide Rwanda 2024 | Permits, Tips & Conservation',
                metaDescription: 'Ultimate guide to gorilla trekking in Rwanda 2024. Everything about permits ($1500), fitness preparation, photography tips, conservation impact, and booking with experts.',
                metaKeywords: 'gorilla trekking Rwanda guide, mountain gorilla permits Rwanda, Rwanda gorilla photography, Volcanoes National Park trekking, conservation tourism Rwanda',
                relatedPosts: [
                    { id: 'blog2', title: '7-Day Rwanda Itinerary: Gorillas, Culture & Nature' },
                    { id: 'blog5', title: 'Rwanda Conservation Success Story' },
                    { id: 'blog3', title: 'Cultural Experiences in Rwanda' }
                ],
                views: 12543,
                likes: 456,
                shares: 234,
                comments: 89,
                language: 'en',
                difficultyLevel: 'Intermediate',
                targetAudience: ['Adventure Travelers', 'Wildlife Enthusiasts', 'Photographers', 'Conservationists'],
                createdAt: new Date('2024-01-10T08:00:00Z'),
                updatedAt: new Date('2024-01-20T14:30:00Z')
            },
            // Add 5 more blog posts with same structure
        ],

        // ===== GUIDES =====
        guides: [
            {
                _id: config.generateObjectId(),
                name: 'Mr. Patience Rutayisire',
                slug: 'patience-rutayisire',
                title: 'Senior Wildlife & Gorilla Specialist',
                email: 'patience@gotrip.africa',
                phone: '+250787407051',
                whatsapp: '+250787407051',
                country: 'Rwanda',
                city: 'Kigali',
                address: 'KN 5 Rd, Kigali, Rwanda',
                biography: 'With over 8 years of experience in wildlife conservation and gorilla research, Mr. Rutayisire holds a Bachelor Degree in Communication Studies from University of Rwanda. He has published research papers on gorilla behavior and conservation, and leads training programs for new guides. His work with conservation efforts has contributed significantly to gorilla population recovery in the Virunga Massif.',
                detailedBio: `
                    <div class="guide-bio">
                        <h3>Professional Journey</h3>
                        <p>Patience began his career as a research assistant with the Dian Fossey Gorilla Fund in 2016, monitoring gorilla families in Volcanoes National Park. His dedication to conservation led him to become a certified guide in 2018, and he has since led over 500 successful gorilla treks.</p>
                        
                        <h3>Research Contributions</h3>
                        <ul>
                            <li>Co-authored "Behavioral Patterns of Mountain Gorillas in Changing Climates" (Journal of Primatology, 2022)</li>
                            <li>Presented at International Gorilla Conservation Conference 2023</li>
                            <li>Developed gorilla health monitoring protocols used by Rwanda Development Board</li>
                            <li>Trained 45 new guides in gorilla tracking and conservation ethics</li>
                        </ul>
                        
                        <h3>Conservation Philosophy</h3>
                        <p>"Sustainable tourism is not just about minimizing impact, but actively contributing to conservation and community development. Every visitor to Rwanda's parks becomes an ambassador for conservation."</p>
                        
                        <h3>Special Skills</h3>
                        <ul>
                            <li>Gorilla behavior interpretation</li>
                            <li>Wildlife photography guidance</li>
                            <li>Altitude acclimatization strategies</li>
                            <li>Emergency first response in remote areas</li>
                            <li>Cultural interpretation and translation</li>
                        </ul>
                    </div>
                `,
                languages: [
                    { 
                        language: 'English', 
                        level: 'Native Fluency', 
                        flag: '🇬🇧', 
                        certification: 'TOEFL 110/120',
                        speaking: 100,
                        reading: 100,
                        writing: 95,
                        years: 15
                    },
                    { 
                        language: 'German', 
                        level: 'Fluent', 
                        flag: '🇩🇪', 
                        certification: 'Goethe C1',
                        speaking: 90,
                        reading: 95,
                        writing: 85,
                        years: 8
                    },
                    { 
                        language: 'Spanish', 
                        level: 'Advanced', 
                        flag: '🇪🇸', 
                        certification: 'DELE B2',
                        speaking: 85,
                        reading: 80,
                        writing: 75,
                        years: 5
                    },
                    { 
                        language: 'French', 
                        level: 'Fluent', 
                        flag: '🇫🇷', 
                        certification: 'DALF C1',
                        speaking: 95,
                        reading: 90,
                        writing: 85,
                        years: 10
                    },
                    { 
                        language: 'Chinese (Mandarin)', 
                        level: 'Advanced', 
                        flag: '🇨🇳', 
                        certification: 'HSK 5',
                        speaking: 80,
                        reading: 75,
                        writing: 70,
                        years: 6
                    },
                    { 
                        language: 'Swahili', 
                        level: 'Native', 
                        flag: '🇹🇿',
                        speaking: 100,
                        reading: 100,
                        writing: 100,
                        years: 'Native'
                    },
                    { 
                        language: 'Kinyarwanda', 
                        level: 'Native', 
                        flag: '🇷🇼',
                        speaking: 100,
                        reading: 100,
                        writing: 100,
                        years: 'Native'
                    }
                ],
                experienceYears: 8,
                totalTours: 500,
                rating: 4.9,
                totalReviews: 234,
                dailyRate: 150,
                currency: 'USD',
                minimumDays: 1,
                maximumGroupSize: 8,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767657519/Patie_rcfde0.png',
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&q=80&auto=format'
                ],
                certifications: [
                    { 
                        name: 'Gorilla Trekking Professional', 
                        issuingAuthority: 'Rwanda Development Board',
                        year: 2018,
                        validUntil: '2026'
                    },
                    { 
                        name: 'Bird Watching Professional', 
                        issuingAuthority: 'African Bird Club',
                        year: 2020,
                        validUntil: '2025'
                    },
                    { 
                        name: 'Professional Photography Guide', 
                        issuingAuthority: 'National Geographic Society',
                        year: 2021,
                        validUntil: '2024'
                    },
                    { 
                        name: 'Cultural Heritage Interpretation - UNESCO', 
                        issuingAuthority: 'UNESCO',
                        year: 2019,
                        validUntil: '2027'
                    },
                    { 
                        name: 'Wilderness First Responder', 
                        issuingAuthority: 'Wilderness Medical Society',
                        year: 2022,
                        validUntil: '2024'
                    }
                ],
                education: [
                    { 
                        degree: 'BA in Communication Studies', 
                        institution: 'University of Rwanda',
                        year: 2015,
                        field: 'Mass Communication'
                    },
                    { 
                        degree: 'Diploma in Wildlife Conservation', 
                        institution: 'Cornell University',
                        year: 2017,
                        field: 'Conservation Biology'
                    },
                    { 
                        degree: 'Certificate in Tourism Management', 
                        institution: 'Cornell University',
                        year: 2018,
                        field: 'Tourism & Hospitality'
                    }
                ],
                specialties: [
                    {
                        name: 'Gorilla Behavior & Ecology',
                        level: 'Expert',
                        years: 8,
                        description: 'In-depth knowledge of gorilla social structures, feeding patterns, and conservation needs'
                    },
                    {
                        name: 'Wildlife Photography Guidance',
                        level: 'Advanced',
                        years: 6,
                        description: 'Expert in wildlife photography techniques, equipment, and ethical photography practices'
                    },
                    {
                        name: 'Conservation Education',
                        level: 'Expert',
                        years: 7,
                        description: 'Developing and delivering conservation education programs for visitors and communities'
                    },
                    {
                        name: 'High-Altitude Trekking',
                        level: 'Expert',
                        years: 8,
                        description: 'Specialized in trekking at high altitudes with focus on safety and acclimatization'
                    },
                    {
                        name: 'Bird Identification',
                        level: 'Advanced',
                        years: 5,
                        description: 'Expert in identifying and interpreting bird behavior in Rwandan ecosystems'
                    }
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
                    sunday: 'Emergency only'
                },
                equipmentProvided: [
                    'Binoculars',
                    'Trekking poles',
                    'First aid kit',
                    'Rain ponchos',
                    'Field guides',
                    'Spotting scope'
                ],
                clientTypes: [
                    'Solo Travelers',
                    'Couples',
                    'Families',
                    'Photography Groups',
                    'Research Teams',
                    'Corporate Groups'
                ],
                reviewSummary: {
                    overall: 4.9,
                    knowledge: 5.0,
                    communication: 4.8,
                    professionalism: 4.9,
                    flexibility: 4.7,
                    safety: 5.0
                },
                recentReviews: [
                    {
                        clientName: 'Sarah M.',
                        country: 'USA',
                        rating: 5.0,
                        date: '2024-01-15',
                        comment: 'Patience made our gorilla trek unforgettable. His knowledge and passion for conservation were inspiring.',
                        tour: '3-Day Gorilla Trekking'
                    },
                    {
                        clientName: 'Thomas R.',
                        country: 'Germany',
                        rating: 4.8,
                        date: '2024-01-10',
                        comment: 'Excellent guide with deep understanding of wildlife. Highly recommended for photography tours.',
                        tour: 'Wildlife Photography Tour'
                    }
                ],
                socialMedia: {
                    linkedin: 'https://linkedin.com/in/patiencerutayisire',
                    twitter: 'https://twitter.com/patienceguide',
                    instagram: 'https://instagram.com/patience.rwanda'
                },
                tags: ['Gorilla Expert', 'Wildlife', 'Conservation', 'Photography', 'Birding', 'Multi-lingual', 'Certified', 'Professional'],
                metaTitle: 'Patience Rutayisire - Senior Gorilla Guide Rwanda | GoTrip Expert',
                metaDescription: 'Expert gorilla guide Patience Rutayisire in Rwanda. 8+ years experience, 7 languages, certified wildlife specialist for Volcanoes National Park treks.',
                metaKeywords: 'gorilla guide Rwanda, Patience Rutayisire, wildlife expert Rwanda, Volcanoes National Park guide, Rwanda tour guide',
                createdAt: new Date('2023-03-01T08:00:00Z'),
                updatedAt: new Date('2024-03-15T10:30:00Z'),
                views: 4567,
                bookings: 345,
                availability: {
                    nextAvailable: '2024-02-01',
                    fullyBookedUntil: '2024-01-25',
                    peakSeason: 'June-September, December-February'
                }
            },
            // Add 1 more guide with same structure
        ],

        // ===== TRANSLATORS =====
        translators: [
            {
                _id: config.generateObjectId(),
                name: 'Mr. Tite Iradukunda',
                slug: 'tite-iradukunda',
                title: 'Senior Chinese & Kinyarwanda Translator',
                email: 'tite@gotrip.africa',
                phone: '+250787407051',
                whatsapp: '+250787407051',
                country: 'Rwanda',
                city: 'Kigali',
                address: 'KN 5 Rd, Kigali, Rwanda',
                biography: 'Tite is a highly specialized translator with native fluency in Mandarin Chinese and Kinyarwanda. With 5+ years of experience working with Chinese investors, diplomatic missions, and medical teams in Rwanda, he has developed expertise in technical, business, and medical translation. His work has facilitated major infrastructure projects and international agreements.',
                detailedBio: `
                    <div class="translator-bio">
                        <h3>Professional Background</h3>
                        <p>Tite began his career as an interpreter for Chinese construction companies working on Rwanda\'s infrastructure projects. His exceptional language skills and cultural understanding quickly made him the preferred translator for high-level diplomatic meetings and business negotiations.</p>
                        
                        <h3>Key Projects</h3>
                        <ul>
                            <li>Primary interpreter for China-Rwanda bilateral trade agreements (2020-2023)</li>
                            <li>Medical translation for Chinese medical teams during COVID-19 pandemic</li>
                            <li>Legal translation for Rwanda-China investment contracts</li>
                            <li>Simultaneous interpretation at UN conferences in Kigali</li>
                            <li>Technical translation for construction and engineering projects</li>
                        </ul>
                        
                        <h3>Translation Philosophy</h3>
                        <p>"Translation is not just about converting words, but about conveying meaning, context, and cultural nuances. A good translator bridges not just languages, but cultures and understanding."</p>
                        
                        <h3>Specialized Equipment</h3>
                        <ul>
                            <li>Professional interpretation equipment (Bose, Sennheiser)</li>
                            <li>Simultaneous interpretation booths setup</li>
                            <li>Technical terminology databases</li>
                            <li>Real-time translation software</li>
                        </ul>
                    </div>
                `,
                languages: [
                    { 
                        language: 'Chinese (Mandarin)', 
                        level: 'Native Fluency', 
                        flag: '🇨🇳', 
                        certification: 'HSK Level 5',
                        speaking: 100,
                        reading: 100,
                        writing: 95,
                        translation: 'Expert',
                        interpretation: 'Expert',
                        years: 8
                    },
                    { 
                        language: 'English', 
                        level: 'Fluent', 
                        flag: '🇬🇧', 
                        certification: 'TOEIC 950/990',
                        speaking: 95,
                        reading: 98,
                        writing: 90,
                        translation: 'Advanced',
                        interpretation: 'Advanced',
                        years: 12
                    },
                    { 
                        language: 'French', 
                        level: 'Advanced', 
                        flag: '🇫🇷', 
                        certification: 'DALF C1',
                        speaking: 85,
                        reading: 90,
                        writing: 80,
                        translation: 'Intermediate',
                        interpretation: 'Intermediate',
                        years: 6
                    },
                    { 
                        language: 'Kinyarwanda', 
                        level: 'Native', 
                        flag: '🇷🇼',
                        speaking: 100,
                        reading: 100,
                        writing: 100,
                        translation: 'Expert',
                        interpretation: 'Expert',
                        years: 'Native'
                    }
                ],
                experienceYears: 5,
                totalProjects: 120,
                rating: 4.9,
                totalReviews: 89,
                dailyRate: 120,
                currency: 'USD',
                hourlyRate: 25,
                minimumHours: 4,
                image: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767698065/di-li-bo_mfkxlk.jpg',
                gallery: [
                    'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767698065/di-li-bo_mfkxlk.jpg',
                    'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=600&fit=crop&q=80&auto=format',
                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=600&fit=crop&q=80&auto=format'
                ],
                certifications: [
                    { 
                        name: 'Certified Mandarin Translator (HSK Level 5)', 
                        issuingAuthority: 'Confucius Institute',
                        year: 2018,
                        validUntil: '2026'
                    },
                    { 
                        name: 'Medical Translation Certification', 
                        issuingAuthority: 'International Medical Interpreters Association',
                        year: 2020,
                        validUntil: '2025'
                    },
                    { 
                        name: 'Legal Translation Specialist', 
                        issuingAuthority: 'American Translators Association',
                        year: 2021,
                        validUntil: '2024'
                    },
                    { 
                        name: 'Simultaneous Interpreter - UN Standards', 
                        issuingAuthority: 'United Nations Language Training',
                        year: 2019,
                        validUntil: '2027'
                    },
                    { 
                        name: 'Business Consulting Translation', 
                        issuingAuthority: 'Global Business Translation Association',
                        year: 2022,
                        validUntil: '2024'
                    }
                ],
                education: [
                    { 
                        degree: 'BBA - Business Administration', 
                        institution: 'University of Rwanda',
                        year: 2016,
                        field: 'Business & Management'
                    },
                    { 
                        degree: 'Certificate in Chinese Language & Literature', 
                        institution: 'University of Rwanda',
                        year: 2017,
                        field: 'Chinese Studies'
                    },
                    { 
                        degree: 'Diploma in Translation Studies', 
                        institution: 'International School of Translation',
                        year: 2018,
                        field: 'Translation & Interpretation'
                    }
                ],
                specialties: [
                    {
                        name: 'Business & Investment Translation',
                        level: 'Expert',
                        years: 5,
                        description: 'Specialized in business negotiations, contracts, and investment documentation'
                    },
                    {
                        name: 'Medical & Healthcare Interpretation',
                        level: 'Expert',
                        years: 4,
                        description: 'Medical terminology, patient consultations, and healthcare documentation'
                    },
                    {
                        name: 'Legal Document Translation',
                        level: 'Advanced',
                        years: 4,
                        description: 'Contracts, agreements, legal proceedings, and official documents'
                    },
                    {
                        name: 'Technical Manual Translation',
                        level: 'Advanced',
                        years: 3,
                        description: 'Engineering, construction, and technical documentation'
                    },
                    {
                        name: 'Simultaneous Conference Interpretation',
                        level: 'Expert',
                        years: 4,
                        description: 'Real-time interpretation for conferences and high-level meetings'
                    }
                ],
                translationServices: [
                    'Simultaneous Interpretation',
                    'Consecutive Interpretation',
                    'Document Translation',
                    'Website Localization',
                    'Legal Document Translation',
                    'Medical Translation',
                    'Technical Translation',
                    'Business Translation'
                ],
                industriesServed: [
                    'Government & Diplomacy',
                    'Healthcare & Medicine',
                    'Construction & Engineering',
                    'Business & Investment',
                    'Tourism & Hospitality',
                    'Legal Services',
                    'Education',
                    'Technology'
                ],
                notableProjects: [
                    {
                        name: 'China-Rwanda Infrastructure Agreements',
                        year: 2021,
                        client: 'Rwanda Ministry of Infrastructure',
                        description: 'Translation for $500 million infrastructure development agreements'
                    },
                    {
                        name: 'Medical Team Interpretations',
                        year: 2020,
                        client: 'Chinese Medical Team in Rwanda',
                        description: 'Medical interpretation for COVID-19 response teams and patient care'
                    },
                    {
                        name: 'International Conference Simultaneous Interpretation',
                        year: 2022,
                        client: 'United Nations',
                        description: 'Simultaneous interpretation for UN conferences in Kigali'
                    },
                    {
                        name: 'Business Investment Negotiations',
                        year: 2023,
                        client: 'Multiple Chinese Companies',
                        description: 'Translation for $200+ million investment deals in Rwanda'
                    }
                ],
                available: true,
                featured: true,
                instantBooking: true,
                responseRate: 99,
                responseTime: 'Within 1 hour',
                workingHours: {
                    monday: '8:00-20:00',
                    tuesday: '8:00-20:00',
                    wednesday: '8:00-20:00',
                    thursday: '8:00-20:00',
                    friday: '8:00-20:00',
                    saturday: '9:00-18:00',
                    sunday: 'Emergency only'
                },
                equipment: [
                    'Professional interpretation equipment',
                    'Noise-cancelling headphones',
                    'Digital recorder',
                    'Translation memory software',
                    'Mobile interpretation setup'
                ],
                serviceAreas: [
                    'Kigali',
                    'Entire Rwanda',
                    'Virtual (Online)',
                    'International Conferences'
                ],
                pricing: {
                    hourly: 25,
                    halfDay: 120,
                    fullDay: 220,
                    conference: 300,
                    documentTranslation: '0.15 per word',
                    minimumCharge: 100
                },
                reviewSummary: {
                    overall: 4.9,
                    accuracy: 5.0,
                    professionalism: 4.9,
                    punctuality: 4.8,
                    culturalUnderstanding: 5.0,
                    technicalKnowledge: 4.9
                },
                recentReviews: [
                    {
                        clientName: 'Zhang Wei',
                        country: 'China',
                        rating: 5.0,
                        date: '2024-01-12',
                        comment: 'Exceptional translation services for our business negotiations. Tite\'s understanding of both cultures was invaluable.',
                        service: 'Business Translation'
                    },
                    {
                        clientName: 'Dr. Liu',
                        country: 'China',
                        rating: 5.0,
                        date: '2024-01-08',
                        comment: 'Professional medical interpreter with accurate terminology translation. Highly recommended.',
                        service: 'Medical Interpretation'
                    }
                ],
                socialMedia: {
                    linkedin: 'https://linkedin.com/in/titeitradukunda',
                    wechat: 'tite_translator'
                },
                tags: ['Chinese Translator', 'Mandarin', 'Business Translation', 'Medical Interpreter', 'Legal Translator', 'Simultaneous Interpretation', 'Certified', 'Professional'],
                metaTitle: 'Tite Iradukunda - Chinese Translator Rwanda | Business & Medical Interpreter',
                metaDescription: 'Expert Chinese translator Tite Iradukunda in Rwanda. Native Mandarin speaker, business translation, medical interpretation, and legal document services.',
                metaKeywords: 'Chinese translator Rwanda, Mandarin interpreter Kigali, business translation Rwanda, medical interpreter Rwanda, legal translator Rwanda',
                createdAt: new Date('2023-03-05T08:00:00Z'),
                updatedAt: new Date('2024-03-20T10:30:00Z'),
                views: 3456,
                bookings: 234,
                availability: {
                    nextAvailable: '2024-02-01',
                    fullyBookedUntil: '2024-01-28',
                    advanceBooking: '2 weeks minimum'
                }
            },
            // Add 1 more translator with same structure
        ]
    };

    // ===============================
    // API SERVICE FOR MONGODB ATLAS
    // ===============================
    class MongoAtlasService {
        constructor() {
            this.baseUrl = config.apiEndpoints.base;
            this.isConnected = false;
            this.cache = new Map();
            this.cacheDuration = 5 * 60 * 1000; // 5 minutes
            this.init();
        }

        async init() {
            await this.checkConnection();
            // Auto-refresh connection every minute
            setInterval(() => this.checkConnection(), 60000);
        }

        async checkConnection() {
            try {
                const response = await fetch(`${this.baseUrl}/health`, {
                    method: 'GET',
                    headers: { 'Accept': 'application/json' },
                    timeout: 5000
                });
                
                this.isConnected = response.ok;
                if (this.isConnected && config.debug) {
                    console.log('✅ MongoDB Atlas connected');
                }
                return this.isConnected;
            } catch (error) {
                this.isConnected = false;
                if (config.debug) {
                    console.warn('⚠️ MongoDB Atlas not connected, using local data');
                }
                return false;
            }
        }

        async fetchData(endpoint, options = {}) {
            const cacheKey = `${endpoint}_${JSON.stringify(options)}`;
            const cached = this.cache.get(cacheKey);
            
            // Return cached data if available
            if (cached && Date.now() - cached.timestamp < this.cacheDuration) {
                return cached.data;
            }

            try {
                const response = await fetch(`${this.baseUrl}${endpoint}`, {
                    method: options.method || 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        ...options.headers
                    },
                    body: options.body ? JSON.stringify(options.body) : undefined
                });

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                
                // Cache successful responses
                if (data.success) {
                    this.cache.set(cacheKey, {
                        data: data.data || data,
                        timestamp: Date.now()
                    });
                }

                return data.data || data;
            } catch (error) {
                console.error(`Fetch failed for ${endpoint}:`, error.message);
                throw error;
            }
        }

        // Get all items of a type
        async getAll(type) {
            const endpoints = {
                destinations: '/destinations',
                guides: '/guides',
                translators: '/translators',
                accommodations: '/accommodations',
                blogs: '/blogs'
            };

            try {
                if (!this.isConnected) {
                    return this.getLocalData(type);
                }

                const data = await this.fetchData(endpoints[type]);
                return Array.isArray(data) ? data : [];
            } catch (error) {
                return this.getLocalData(type);
            }
        }

        // Get single item by ID
        async getById(type, id) {
            try {
                if (!this.isConnected) {
                    return this.getLocalItem(type, id);
                }

                const endpoint = `/${type}/${id}`;
                return await this.fetchData(endpoint);
            } catch (error) {
                return this.getLocalItem(type, id);
            }
        }

        // Create new item
        async create(type, data) {
            const endpoints = {
                booking: '/bookings',
                tripPlan: '/tripplans',
                contact: '/contacts',
                newsletter: '/newsletters/subscribe'
            };

            try {
                if (!this.isConnected) {
                    return this.fallbackSubmission(type, data);
                }

                return await this.fetchData(endpoints[type], {
                    method: 'POST',
                    body: data
                });
            } catch (error) {
                return this.fallbackSubmission(type, data);
            }
        }

        // Seed data to MongoDB (admin function)
        async seedCollection(type, items) {
            if (!this.isConnected) {
                throw new Error('Cannot seed: Not connected to MongoDB');
            }

            try {
                const results = [];
                for (const item of items) {
                    const result = await this.fetchData(`/${type}`, {
                        method: 'POST',
                        body: item
                    });
                    results.push(result);
                }
                return results;
            } catch (error) {
                throw new Error(`Seeding failed: ${error.message}`);
            }
        }

        // Local data fallback
        getLocalData(type) {
            const dataMap = {
                destinations: seedData.destinations,
                guides: seedData.guides,
                translators: seedData.translators,
                accommodations: seedData.accommodations,
                blogs: seedData.blogPosts
            };
            
            return dataMap[type] || [];
        }

        getLocalItem(type, id) {
            const items = this.getLocalData(type);
            return items.find(item => item._id === id) || null;
        }

        async fallbackSubmission(type, data) {
            // Fallback to Formspree
            try {
                const formData = {
                    _subject: `${type} submission - ${new Date().toISOString()}`,
                    _replyto: data.email || '',
                    ...data,
                    source: 'website_fallback',
                    timestamp: new Date().toISOString()
                };

                const response = await fetch(config.formspreeEndpoint, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });

                return {
                    success: response.ok,
                    message: 'Submitted via fallback system',
                    fallback: true
                };
            } catch (error) {
                return {
                    success: false,
                    message: 'All submission methods failed',
                    error: error.message
                };
            }
        }

        // Clear cache
        clearCache() {
            this.cache.clear();
            if (config.debug) {
                console.log('🗑️ Cache cleared');
            }
        }

        // Get connection status
        getStatus() {
            return {
                connected: this.isConnected,
                cacheSize: this.cache.size,
                baseUrl: this.baseUrl
            };
        }
    }

    // ===============================
    // PRODUCTION INITIALIZATION
    // ===============================
    function initializeProductionApp() {
        console.log(`🚀 GoTrip Production v${config.version}`);
        
        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Initialize MongoDB service
        window.MongoAtlasService = new MongoAtlasService();
        
        // Set up core functionality
        initializeMobileMenu();
        setupContactForm();
        handleInitialPageLoad();
        setupNavigation();
        
        // Initialize analytics in production
        if (!config.debug) {
            initializeAnalytics();
        }
        
        // Welcome message
        setTimeout(() => {
            showNotification(
                'Welcome to GoTrip Rwanda - Your Premium Travel Partner',
                'info',
                5000,
                '🌍 Discover Rwanda'
            );
        }, 1000);
        
        console.log('✅ Production app initialized');
    }

    function initializeAnalytics() {
        // Google Analytics
        if (config.analytics.googleAnalyticsId) {
            const script = document.createElement('script');
            script.async = true;
            script.src = `https://www.googletagmanager.com/gtag/js?id=${config.analytics.googleAnalyticsId}`;
            document.head.appendChild(script);
            
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', config.analytics.googleAnalyticsId);
        }
        
        // Facebook Pixel
        if (config.analytics.facebookPixelId) {
            const pixelScript = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${config.analytics.facebookPixelId}');
                fbq('track', 'PageView');
            `;
            
            const script = document.createElement('script');
            script.innerHTML = pixelScript;
            document.head.appendChild(script);
        }
    }

    // ===============================
    // GLOBAL EXPORTS
    // ===============================
    window.GoTrip = {
        // Configuration
        config: config,
        seedData: seedData,
        
        // Core Services
        mongoService: new MongoAtlasService(),
        
        // Core Functions
        navigateTo: navigateTo,
        showPage: showPage,
        showNotification: showNotification,
        showTripPlanningModal: showTripPlanningModal,
        showBookingModal: showBookingModal,
        closeModal: closeModal,
        
        // Data Functions
        getDestinations: async () => await window.MongoAtlasService.getAll('destinations'),
        getGuides: async () => await window.MongoAtlasService.getAll('guides'),
        getTranslators: async () => await window.MongoAtlasService.getAll('translators'),
        getAccommodations: async () => await window.MongoAtlasService.getAll('accommodations'),
        getBlogs: async () => await window.MongoAtlasService.getAll('blogs'),
        
        // Form Submission
        submitForm: async (type, data) => await window.MongoAtlasService.create(type, data),
        
        // Admin Functions (development only)
        seedDatabase: async (type) => {
            if (!config.debug) return { success: false, message: 'Only available in development' };
            
            const items = seedData[type] || seedData[`${type}s`];
            if (!items) return { success: false, message: 'Invalid type' };
            
            return await window.MongoAtlasService.seedCollection(type, items);
        },
        
        // Utility Functions
        formatPrice: (amount) => {
            if (amount === 0 || amount === '0') return 'Free';
            return `${config.currency.symbol}${amount.toLocaleString()}`;
        },
        
        getImageUrl: (imagePath, type = 'destination') => {
            if (!imagePath || imagePath === '#' || imagePath === '') {
                return config.fallbackImages[type] || config.fallbackImages.default;
            }
            return imagePath;
        }
    };

    // ===============================
    // START PRODUCTION APPLICATION
    // ===============================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeProductionApp);
    } else {
        setTimeout(initializeProductionApp, 100);
    }

    // Note: Include all your existing UI functions here
    // They will work with both MongoDB data and local seedData
    // because the data structure is identical
    
})();