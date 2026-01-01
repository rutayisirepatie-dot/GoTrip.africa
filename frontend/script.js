// Go Trip
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        baseUrl: 'https://gotrip-backend-uwhn.onrender.com/api',
        debug: true,
        useMockMode: false, // mock data functionality
        
        endpoints: {
            newsletter: '/newsletter',
            contact: '/contact',
            tripPlan: '/tripPlan',
            auth: {
                login: '/auth/login',
                register: '/auth/register',
                verify: '/auth/verify'
            },
            bookings: {
                submit: '/bookings',
                user: '/bookings/user'
            },
            guides: '/guides',
            translators: '/translators',
            destinations: '/destinations',
            accommodations: '/accommodations',
            blog: '/blog',
            dashboard: {
                user: '/dashboard/user',
                admin: '/dashboard/admin',
                userBookings: '/dashboard/user/bookings',
                allUsers: '/dashboard/admin/users',
                allBookings: '/dashboard/admin/bookings',
                updateProfile: '/dashboard/user/profile',
                cancelBooking: '/dashboard/bookings'
            }
        },
        prices: {
            guides: {
                min: 80,
                max: 200
            },
            translators: {
                min: 50,
                max: 150
            },
            accommodations: {
                budget: [50, 150],
                midrange: [150, 300],
                luxury: [300, 5000]
            }
        }
    };

    // ===============================
    // DATA SYNC MANAGER 
    // ===============================
    class DataSyncManager {
        constructor() {
            this.pendingOperations = [];
            this.isOnline = true;
        }

        async syncToBackend(type, data, method = 'POST') {
            try {
                let endpoint;
                
                switch(type) {
                    case 'booking':
                        endpoint = config.endpoints.bookings.submit;
                        break;
                    case 'trip_plan':
                        endpoint = config.endpoints.tripPlan;
                        break;
                    case 'update_profile':
                        endpoint = config.endpoints.dashboard.updateProfile;
                        method = 'PUT';
                        break;
                    case 'cancel_booking':
                        endpoint = `${config.endpoints.dashboard.cancelBooking}/${data.bookingId}`;
                        method = 'PUT';
                        break;
                    case 'confirm_booking':
                        endpoint = `${config.endpoints.dashboard.cancelBooking}/${data.bookingId}/confirm`;
                        method = 'PUT';
                        break;
                    default:
                        return { success: false };
                }

                const token = getAuthToken();
                const response = await fetch(`${config.baseUrl}${endpoint}`, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                return result;
            } catch (error) {
                console.log('Sync failed, will retry later:', error);
                this.queueOperation(type, data, method);
                return { success: false };
            }
        }

        queueOperation(type, data, method) {
            this.pendingOperations.push({ type, data, method, timestamp: Date.now() });
        }
    }

    // Initialize Data Sync Manager
    const dataSync = new DataSyncManager();

    // ===============================
    // MOCK DATA
    // ===============================
    const mockData = {
        guides: [
            { 
                _id: 1, 
                name: "Jean Claude N.", 
                specialty: "Gorilla Trekking Expert", 
                languages: ["English", "French", "Swahili"],
                experience: "8 years experience",
                rating: 4.9,
                price: "$150/day",
                dailyRate: 150,
                image: "#",
                certifications: ["Wildlife First Aid", "CPR Certified"],
                languageCount: 3,
                experienceYears: 8,
                available: true,
                description: "Expert guide specializing in gorilla trekking with extensive knowledge of Volcanoes National Park."
            },
            { 
                _id: 2, 
                name: "Marie Aimee K.", 
                specialty: "Cultural Tour Guide", 
                languages: ["English", "Swahili", "Kinyarwanda", "French"],
                experience: "6 years experience",
                rating: 4.8,
                price: "$160/day",
                dailyRate: 160,
                image: "#",
                certifications: ["Cultural Heritage", "Anthropology Degree"],
                languageCount: 4,
                experienceYears: 6,
                available: true,
                description: "Cultural expert providing deep insights into Rwandan traditions and history."
            },
            { 
                _id: 3, 
                name: "David M.", 
                specialty: "Bird Watching Specialist", 
                languages: ["English", "German", "French"],
                experience: "10 years experience",
                rating: 4.9,
                price: "$180/day",
                dailyRate: 180,
                image: "#",
                certifications: ["Ornithology Certified", "Photography Expert"],
                languageCount: 3,
                experienceYears: 10,
                available: true,
                description: "Specialized bird watching guide with extensive knowledge of avian species."
            },
            { 
                _id: 4, 
                name: "Sarah T.", 
                specialty: "Adventure Hiking Guide", 
                languages: ["English", "French", "Spanish"],
                experience: "7 years experience",
                rating: 4.7,
                price: "$150/day",
                dailyRate: 150,
                image: "#",
                certifications: ["Mountain Guide", "Wilderness First Responder"],
                languageCount: 3,
                experienceYears: 7,
                available: true,
                description: "Experienced hiking guide for mountain trails and adventure tours."
            },
            { 
                _id: 5, 
                name: "Peter K.", 
                specialty: "History & Culture Guide", 
                languages: ["English", "Kinyarwanda", "French"],
                experience: "5 years experience",
                rating: 4.6,
                price: "$140/day",
                dailyRate: 140,
                image: "#",
                certifications: ["History Degree", "Cultural Expert"],
                languageCount: 3,
                experienceYears: 5,
                available: true,
                description: "History expert providing comprehensive cultural and historical tours."
            },
            { 
                _id: 6, 
                name: "Grace U.", 
                specialty: "Family Tour Specialist", 
                languages: ["English", "French", "Swahili", "Kinyarwanda"],
                experience: "4 years experience",
                rating: 4.5,
                price: "$130/day",
                dailyRate: 130,
                image: "#",
                certifications: ["Child Safety Certified", "Family Specialist"],
                languageCount: 4,
                experienceYears: 4,
                available: true,
                description: "Family-friendly guide specializing in tours suitable for all ages."
            }
        ],
        translators: [
            { 
                _id: 1, 
                name: "Patience Rutayisire", 
                languages: ["English", "German", "Spanish", "French", "Swahili", "Chinese", "Kinyarwanda"],
                specialty: "Tourism & Business Translation",
                rating: 4.9,
                price: "$140/day",
                dailyRate: 140,
                image: "./images/Patie.png",
                experience: "5 years experience",
                certifications: ["Certified Translator", "Tourism Diploma", "Business Communication"],
                languageCount: 7,
                experienceYears: 5,
                available: true,
                description: "Professional translator specializing in tourism and business communications."
            },
            { 
                _id: 2, 
                name: "Eric M.", 
                languages: ["English", "German", "Chinese", "Kinyarwanda", "French"],
                specialty: "Medical & Technical Translation",
                rating: 4.8,
                price: "$150/day",
                dailyRate: 150,
                image: "#",
                experience: "8 years experience",
                certifications: ["Medical Translator", "Technical Certification"],
                languageCount: 5,
                experienceYears: 8,
                available: true,
                description: "Specialized in medical and technical translations"
            },
            { 
                _id: 3, 
                name: "Grace U.", 
                languages: ["English", "Spanish", "Portuguese", "Kinyarwanda", "French"],
                specialty: "Legal & Government Translation",
                rating: 4.7,
                price: "$130/day",
                dailyRate: 130,
                image: "#",
                experience: "6 years experience",
                certifications: ["Legal Translator", "Government Experience", "Diplomatic Experience"],
                languageCount: 5,
                experienceYears: 6,
                available: true,
                description: "Expert in legal documents and government communications translation."
            },
            { 
                _id: 4, 
                name: "Robert K.", 
                languages: ["English", "Arabic", "Swahili", "Kinyarwanda", "French"],
                specialty: "Conference & Event Translation",
                rating: 4.8,
                price: "$145/day",
                dailyRate: 145,
                image: "#",
                experience: "7 years experience",
                certifications: ["Conference Interpreter", "Event Management"],
                languageCount: 5,
                experienceYears: 7,
                available: true,
                description: "Specialized in conference interpreting and large event translation services."
            },
            { 
                _id: 5, 
                name: "Alice N.", 
                languages: ["English", "French", "Kinyarwanda"],
                specialty: "General Translation",
                rating: 4.6,
                price: "$90/day",
                dailyRate: 90,
                image: "#",
                experience: "3 years experience",
                certifications: ["Basic Translation", "Tourism Focus"],
                languageCount: 3,
                experienceYears: 3,
                available: true,
                description: "General translator with focus on tourism and everyday communication."
            },
            { 
                _id: 6, 
                name: "Samuel T.", 
                languages: ["English", "Swahili", "Kinyarwanda", "French", "Spanish", "Portuguese"],
                specialty: "Multi-Language Specialist",
                rating: 4.9,
                price: "$160/day",
                dailyRate: 160,
                image: "#",
                experience: "9 years experience",
                certifications: ["Advanced Translator", "Language Degree"],
                languageCount: 6,
                experienceYears: 9,
                available: true,
                description: "Multi-lingual expert translator with extensive international experience."
            }
        ],
        destinations: [
            {
                _id: 1,
                name: "Volcanoes National Park",
                location: "Northern Province, Rwanda",
                description: "Home to the endangered mountain gorillas, this UNESCO World Heritage site offers unforgettable gorilla trekking experiences in the Virunga Mountains.",
                image: "./images/mount-bisoke-rwanda.jpg",
                features: ["Gorilla Trekking", "Mountain Hiking", "Bird Watching", "Cultural Villages"],
                rating: 4.9,
                price: "From $1,500",
                basePrice: 1500,
                duration: "3-5 days",
                bestSeason: ["June", "July", "August", "September"]
            },
            {
                _id: 2,
                name: "Lake Kivu",
                location: "Western Province, Rwanda",
                description: "One of Africa's Great Lakes, offering stunning views, water sports, beautiful beaches, and relaxing hot springs along its shores.",
                image: "./images/ruanda-lake-kivu-aussicht.jpg",
                features: ["Beaches", "Boating", "Swimming", "Hot Springs"],
                rating: 4.7,
                price: "From $300",
                basePrice: 300,
                duration: "2-3 days",
                bestSeason: ["All year"]
            },
            {
                _id: 3,
                name: "Nyungwe Forest National Park",
                location: "Southern Province, Rwanda",
                description: "Ancient rainforest with canopy walkway, home to chimpanzees and over 300 bird species. One of Africa's oldest forests.",
                image: "./images/nyungwe-weather.jpg",
                features: ["Canopy Walk", "Chimpanzee Tracking", "Hiking", "Waterfalls"],
                rating: 4.8,
                price: "From $600",
                basePrice: 600,
                duration: "2-4 days",
                bestSeason: ["December", "January", "February", "June", "July", "August"]
            },
            {
                _id: 4,
                name: "Kigali City",
                location: "Kigali, Rwanda",
                description: "The vibrant capital city known for its cleanliness, safety, and rich cultural experiences including museums, markets, and memorial sites.",
                image: "./images/mount-jali-hike.jpg",
                features: ["City Tours", "Cultural Museums", "Markets", "Nightlife"],
                rating: 4.8,
                price: "From $100",
                basePrice: 100,
                duration: "1-3 days",
                bestSeason: ["All year"]
            },
            {
                _id: 5,
                name: "Akagera National Park",
                location: "Eastern Province, Rwanda",
                description: "Rwanda's only Big Five safari destination, offering game drives, boat safaris, and beautiful landscapes.",
                image: "./images/Akagera-Hippos.jpg",
                features: ["Game Drives", "Boat Safaris", "Bird Watching", "Camping"],
                rating: 4.7,
                price: "From $700",
                basePrice: 700,
                duration: "2-3 days",
                bestSeason: ["June", "July", "August", "September"]
            },
            {
                _id: 6,
                name: "King's Palace Museum",
                location: "Nyanza, Rwanda",
                description: "Traditional royal palace offering insights into Rwanda's pre-colonial history, culture, and monarchy.",
                image: "./images/palace-museum-rwanda.jpg",
                features: ["Cultural History", "Traditional Architecture", "Royal Grounds", "Guided Tours"],
                rating: 4.6,
                price: "From $200",
                basePrice: 200,
                duration: "1 day",
                bestSeason: ["All year"]
            }
        ],
        accommodations: [
            { 
                _id: 1, 
                name: "Bisate Lodge", 
                location: "Volcanoes National Park",
                type: "Luxury Eco-Lodge",
                description: "Award-winning eco-lodge with stunning views of the volcanoes, offering luxury accommodation and direct gorilla trekking access.",
                image: "./images/Bisate-Lodge-Rwanda-Exterior.jpg",
                features: ["Private Villas", "Gorilla Views", "Spa", "Fine Dining"],
                price: "$2,500/night",
                dailyRate: 2500,
                rating: 4.9,
                category: "luxury",
                capacity: 2,
                available: true
            },
            { 
                _id: 2, 
                name: "Lake Kivu Serena Hotel", 
                location: "Gisenyi, Lake Kivu",
                type: "5-Star Hotel",
                description: "Luxury resort on the shores of Lake Kivu with private beach, water sports, and panoramic lake views.",
                image: "./images/aeriel-view-serena.jpg",
                features: ["Lake View", "Private Beach", "Spa", "Water Sports"],
                price: "$450/night",
                dailyRate: 450,
                rating: 4.7,
                category: "luxury",
                capacity: 4,
                available: true
            },
            { 
                _id: 3, 
                name: "Kigali Marriott Hotel", 
                location: "Kigali City Center",
                type: "Business Hotel",
                description: "Modern luxury hotel in the heart of Kigali, perfect for business travelers and tourists alike.",
                image: "./images/mariot-kigali.png",
                features: ["City Center", "Business Center", "Pool", "Multiple Restaurants"],
                price: "$350/night",
                dailyRate: 350,
                rating: 4.6,
                category: "midrange",
                capacity: 3,
                available: true
            },
            { 
                _id: 4, 
                name: "One&Only Gorilla's Nest", 
                location: "Volcanoes National Park",
                type: "Luxury Resort",
                description: "Ultra-luxurious resort offering bespoke gorilla trekking experiences and unparalleled comfort.",
                image: "./images/one-and-only-kinigi.jpg",
                features: ["Butler Service", "Private Trekking", "Helicopter Transfer", "Fine Dining"],
                price: "$3,500/night",
                dailyRate: 3500,
                rating: 4.9,
                category: "luxury",
                capacity: 2,
                available: true
            },
            { 
                _id: 5, 
                name: "One&Only Nyungwe", 
                location: "Nyungwe Forest",
                type: "Eco-Lodge",
                description: "Sustainable eco-lodge nestled in the Nyungwe Forest, offering immersive nature experiences.",
                image: "./images/one-only-nyungwe-house.jpg",
                features: ["Forest Views", "Bird Watching", "Sustainable", "Guided Hikes"],
                price: "$280/night",
                dailyRate: 280,
                rating: 4.5,
                category: "midrange",
                capacity: 2,
                available: true
            },
            { 
                _id: 6, 
                name: "Raddison Blu Hotel", 
                location: "Kigali",
                type: "4-Star Hotel",
                description: "Contemporary hotel with excellent amenities and convenient city center location.",
                image: "./images/radison-blue.jpg",
                features: ["City Views", "Restaurant", "Pool", "Fitness Center"],
                price: "$220/night",
                dailyRate: 220,
                rating: 4.4,
                category: "midrange",
                capacity: 2,
                available: true
            }
        ],
        blog: [
            { 
                _id: 1, 
                title: "Complete Guide to Gorilla Trekking in Rwanda", 
                excerpt: "Everything you need to know about mountain gorilla trekking in Volcanoes National Park, including permits, preparation, and what to expect.",
                date: "December 25, 2025",
                category: "Adventure",
                image: "./images/gorilla-trekk-rwanda.jpg",
                readTime: "8 min read",
                author: "Jean Claude",
                content: "Full article content here...",
                tags: ["Gorilla Trekking", "Wildlife", "Adventure", "Rwanda"],
                views: 1250,
                createdAt: "2025-12-15T10:00:00.000Z"
            },
            { 
                _id: 2, 
                title: "Best Time to Visit Rwanda: Weather & Seasons Guide", 
                excerpt: "Planning your trip? Here's when to visit Rwanda for the best wildlife viewing, hiking conditions, and cultural experiences.",
                date: "December 28, 2025",
                category: "Travel Tips",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "6 min read",
                author: "Travel Team",
                content: "Full article content here...",
                tags: ["Travel Tips", "Weather", "Seasons", "Planning"],
                views: 980,
                createdAt: "2025-12-28T09:30:00.000Z"
            },
            { 
                _id: 3, 
                title: "Rwandan Culture: Traditions, Food & Etiquette", 
                excerpt: "Discover the rich cultural heritage of Rwanda, from traditional dances and ceremonies to delicious local cuisine.",
                date: "December 15, 2025",
                category: "Culture",
                image: "./images/intore-dancers.jpg",
                readTime: "7 min read",
                author: "Marie Aimee",
                content: "Full article content here...",
                tags: ["Culture", "Traditions", "Food", "Etiquette"],
                views: 1120,
                createdAt: "2025-12-15T11:15:00.000Z"
            },
            { 
                _id: 4, 
                title: "Top 10 Hiking Trails in the Land of a Thousand Hills", 
                excerpt: "Explore Rwanda's breathtaking landscapes through these incredible hiking trails suitable for all fitness levels.",
                date: "October 30, 2025",
                category: "Hiking",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "9 min read",
                author: "Sarah T.",
                content: "Full article content here...",
                tags: ["Hiking", "Trails", "Outdoors", "Adventure"],
                views: 890,
                createdAt: "2025-10-30T14:20:00.000Z"
            },
            { 
                _id: 5, 
                title: "Bird Watching in Rwanda: A Birder's Paradise", 
                excerpt: "With over 700 bird species, Rwanda offers incredible bird watching opportunities across its national parks and forests.",
                date: "October 15, 2025",
                category: "Wildlife",
                image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "5 min read",
                author: "David M.",
                content: "Full article content here...",
                tags: ["Bird Watching", "Wildlife", "Nature", "Photography"],
                views: 750,
                createdAt: "2025-10-15T13:45:00.000Z"
            },
            { 
                _id: 6, 
                title: "Sustainable Tourism in Rwanda: Making a Positive Impact", 
                excerpt: "Learn how Rwanda is leading the way in sustainable tourism and how you can travel responsibly in this beautiful country.",
                date: "September 28, 2025",
                category: "Sustainability",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "6 min read",
                author: "Patience R.",
                content: "Full article content here...",
                tags: ["Sustainability", "Eco-Tourism", "Responsible Travel", "Conservation"],
                views: 1050,
                createdAt: "2025-09-28T16:00:00.000Z"
            }
        ]
    };

    // ===============================
    // USER MANAGEMENT SYSTEM
    // ===============================
    class UserManager {
        constructor() {
            this.users = this.loadUsersFromStorage();
            this.bookings = this.loadBookingsFromStorage();
            this.tripPlans = this.loadTripPlansFromStorage();
        }

        loadUsersFromStorage() {
            const stored = localStorage.getItem('goTrip_users');
            if (stored) {
                return JSON.parse(stored);
            }
            return [
                {
                    _id: 1,
                    name: 'Admin User',
                    email: 'admin@gotrip.africa',
                    password: 'admin123',
                    role: 'admin',
                    phone: '+250 787 407 051',
                    country: 'Rwanda',
                    createdAt: new Date().toISOString(),
                    status: 'active',
                    lastLogin: new Date().toISOString()
                },
                {
                    _id: 2,
                    name: 'Test Customer',
                    email: 'customer@example.com',
                    password: 'customer123',
                    role: 'user',
                    phone: '+250 788 123 456',
                    country: 'USA',
                    createdAt: new Date().toISOString(),
                    status: 'active',
                    lastLogin: new Date().toISOString()
                }
            ];
        }

        loadBookingsFromStorage() {
            const stored = localStorage.getItem('goTrip_bookings');
            if (stored) return JSON.parse(stored);
            
            return [
                {
                    _id: 'BOOK-001',
                    userId: 2,
                    serviceType: 'destination',
                    serviceId: 1,
                    serviceName: 'Volcanoes National Park',
                    userEmail: 'customer@example.com',
                    userName: 'Test Customer',
                    date: new Date(Date.now() + 86400000 * 7).toISOString(),
                    endDate: new Date(Date.now() + 86400000 * 9).toISOString(),
                    travelers: 2,
                    duration: 3,
                    status: 'confirmed',
                    totalAmount: 1500,
                    createdAt: new Date().toISOString(),
                    notes: 'Looking forward to gorilla trekking'
                },
                {
                    _id: 'BOOK-002',
                    userId: 2,
                    serviceType: 'guide',
                    serviceId: 1,
                    serviceName: 'Jean Claude N.',
                    userEmail: 'customer@example.com',
                    userName: 'Test Customer',
                    date: new Date(Date.now() + 86400000 * 5).toISOString(),
                    endDate: new Date(Date.now() + 86400000 * 6).toISOString(),
                    travelers: 4,
                    duration: 2,
                    status: 'pending',
                    totalAmount: 300,
                    createdAt: new Date().toISOString(),
                    notes: 'Need a gorilla trekking expert'
                }
            ];
        }

        loadTripPlansFromStorage() {
            const stored = localStorage.getItem('goTrip_tripPlans');
            if (stored) return JSON.parse(stored);
            
            return [
                {
                    _id: 'TRIP-001',
                    userId: 2,
                    userName: 'Test Customer',
                    userEmail: 'customer@example.com',
                    startDate: new Date(Date.now() + 86400000 * 14).toISOString(),
                    duration: '6-8 days',
                    travelers: 3,
                    budget: 'midrange',
                    interests: ['gorilla', 'culture', 'hiking'],
                    message: 'Looking for a family adventure with gorilla trekking and cultural experiences',
                    status: 'review',
                    createdAt: new Date().toISOString(),
                    assignedTo: null,
                    itinerary: null
                }
            ];
        }

        saveUsers() {
            localStorage.setItem('goTrip_users', JSON.stringify(this.users));
        }

        saveBookings() {
            localStorage.setItem('goTrip_bookings', JSON.stringify(this.bookings));
        }

        saveTripPlans() {
            localStorage.setItem('goTrip_tripPlans', JSON.stringify(this.tripPlans));
        }

        // User methods
        async registerUser(userData) {
            const existingUser = this.users.find(u => u.email === userData.email);
            if (existingUser) {
                throw new Error('User already exists');
            }

            const newUser = {
                _id: Date.now(),
                ...userData,
                role: 'user',
                status: 'active',
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };

            this.users.push(newUser);
            this.saveUsers();
            
            // Try to register with backend
            try {
                const response = await fetch(`${config.baseUrl}${config.endpoints.auth.register}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userData)
                });
                const result = await response.json();
                console.log('Backend registration result:', result);
            } catch (error) {
                console.log('Backend registration failed, using local only');
            }
            
            return newUser;
        }

        async authenticateUser(email, password) {
            // Try backend authentication first
            try {
                const response = await fetch(`${config.baseUrl}${config.endpoints.auth.login}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password })
                });
                
                if (response.ok) {
                    const result = await response.json();
                    if (result.success) {
                        return result.user;
                    }
                }
            } catch (error) {
                console.log('Backend auth failed, trying local');
            }
            
            // Fallback to local authentication
            const user = this.users.find(u => 
                u.email === email && u.password === password && u.status === 'active'
            );
            
            if (user) {
                const { password, ...userWithoutPassword } = user;
                userWithoutPassword.lastLogin = new Date().toISOString();
                this.saveUsers();
                return userWithoutPassword;
            }
            
            return null;
        }

        async updateUser(userId, updates) {
            const index = this.users.findIndex(u => u._id === userId);
            if (index !== -1) {
                this.users[index] = { ...this.users[index], ...updates };
                this.saveUsers();
                
                // Sync to MongoDB in background
                dataSync.syncToBackend('update_profile', { userId, ...updates });
                
                return this.users[index];
            }
            return null;
        }

        deleteUser(userId) {
            this.users = this.users.filter(u => u._id !== userId);
            this.saveUsers();
            return true;
        }

        // Booking methods
        async createBooking(bookingData) {
            const bookingId = `BOOK-${Date.now().toString().slice(-6)}`;
            const booking = {
                _id: bookingId,
                ...bookingData,
                createdAt: new Date().toISOString(),
                status: 'pending'
            };

            // Save to local storage immediately
            this.bookings.push(booking);
            this.saveBookings();
            
            // Sync to MongoDB in background
            dataSync.syncToBackend('booking', booking);
            
            return booking;
        }

        updateBooking(bookingId, updates) {
            const index = this.bookings.findIndex(b => b._id === bookingId);
            if (index !== -1) {
                this.bookings[index] = { ...this.bookings[index], ...updates };
                this.saveBookings();
                return this.bookings[index];
            }
            return null;
        }

        async cancelBooking(bookingId) {
            const booking = this.updateBooking(bookingId, { status: 'cancelled' });
            if (booking) {
                // Sync to MongoDB in background
                dataSync.syncToBackend('cancel_booking', { bookingId });
            }
            return booking;
        }

        async confirmBooking(bookingId) {
            const booking = this.updateBooking(bookingId, { status: 'confirmed' });
            if (booking) {
                // Sync to MongoDB in background
                dataSync.syncToBackend('confirm_booking', { bookingId });
            }
            return booking;
        }

        getUserBookings(userId) {
            return this.bookings.filter(b => b.userId === userId);
        }

        // Trip Plan methods
        async createTripPlan(tripData) {
            const tripId = `TRIP-${Date.now().toString().slice(-6)}`;
            const trip = {
                _id: tripId,
                ...tripData,
                createdAt: new Date().toISOString(),
                status: 'review'
            };

            // Save to local storage immediately
            this.tripPlans.push(trip);
            this.saveTripPlans();
            
            // Sync to MongoDB in background
            dataSync.syncToBackend('trip_plan', trip);
            
            return trip;
        }

        updateTripPlan(tripId, updates) {
            const index = this.tripPlans.findIndex(t => t._id === tripId);
            if (index !== -1) {
                this.tripPlans[index] = { ...this.tripPlans[index], ...updates };
                this.saveTripPlans();
                return this.tripPlans[index];
            }
            return null;
        }

        // Analytics methods
        getStats() {
            const totalUsers = this.users.length;
            const totalBookings = this.bookings.length;
            const activeBookings = this.bookings.filter(b => 
                ['confirmed', 'pending'].includes(b.status)
            ).length;
            
            const totalRevenue = this.bookings
                .filter(b => b.status === 'confirmed')
                .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
            
            const pendingTripPlans = this.tripPlans.filter(t => t.status === 'review').length;

            return {
                totalUsers,
                totalBookings,
                activeBookings,
                totalRevenue,
                pendingTripPlans
            };
        }

        getMonthlyRevenue() {
            const monthlyRevenue = {};
            const confirmedBookings = this.bookings.filter(b => b.status === 'confirmed');
            
            confirmedBookings.forEach(booking => {
                const date = new Date(booking.createdAt);
                const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
                
                if (!monthlyRevenue[monthYear]) {
                    monthlyRevenue[monthYear] = 0;
                }
                monthlyRevenue[monthYear] += booking.totalAmount || 0;
            });

            return Object.entries(monthlyRevenue).map(([month, revenue]) => ({
                month,
                revenue
            }));
        }

        getRecentActivity() {
            const allActivities = [
                ...this.users.map(u => ({
                    type: 'user',
                    id: u._id,
                    name: u.name,
                    email: u.email,
                    action: 'registered',
                    timestamp: u.createdAt
                })),
                ...this.bookings.map(b => ({
                    type: 'booking',
                    id: b._id,
                    name: b.serviceName,
                    email: b.userEmail,
                    action: b.status,
                    timestamp: b.createdAt
                })),
                ...this.tripPlans.map(t => ({
                    type: 'trip_plan',
                    id: t._id,
                    name: t.userName,
                    email: t.userEmail,
                    action: 'requested',
                    timestamp: t.createdAt
                }))
            ];

            return allActivities.sort((a, b) => 
                new Date(b.timestamp) - new Date(a.timestamp)
            ).slice(0, 20);
        }
    }

    // Initialize User Manager
    const userManager = new UserManager();

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let isAuthenticated = false;
    let currentUser = null;
    let useMockData = config.useMockMode;

    // ===============================
    // CORE UTILITIES
    // ===============================
    
    // DOM Ready Helper
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    // Validation Functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^\+?[\d\s\-\(\)]{10,}$/;
        return re.test(phone);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    // Storage Functions
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }

    function getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    function saveUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        if (userData.token) {
            localStorage.setItem('authToken', userData.token);
        }
    }

    function clearUserData() {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        isAuthenticated = false;
        currentUser = null;
    }

    // ===============================
    // API SERVICE
    // ===============================
    
    async function apiRequest(endpoint, options = {}) {
        const url = `${config.baseUrl}${endpoint}`;
        const token = getAuthToken();
        
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        // If using mock mode, simulate response
        if (useMockData) {
            return simulateMockResponse(endpoint, options);
        }
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000);
            
            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || `HTTP ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('API Error:', error);
            
            // Fall back to mock data on network error
            if (!useMockData) {
                console.log('Falling back to mock data');
                useMockData = true;
            }
            
            return simulateMockResponse(endpoint, options);
        }
    }

    function simulateMockResponse(endpoint, options) {
        return new Promise(resolve => {
            setTimeout(() => {
                let response = { success: true, data: [], message: 'Mock response' };
                
                const method = options?.method || 'GET';
                const body = options?.body ? JSON.parse(options.body) : {};
                
                if (endpoint.includes('/auth')) {
                    if (endpoint.includes('/login') && method === 'POST') {
                        response = {
                            success: true,
                            token: 'mock-jwt-token-' + Date.now(),
                            user: {
                                _id: Date.now(),
                                name: body.email.split('@')[0],
                                email: body.email,
                                role: 'user',
                                phone: '+250 787 407 051',
                                country: 'Rwanda'
                            },
                            message: 'Login successful (demo)'
                        };
                    } else if (endpoint.includes('/register') && method === 'POST') {
                        response = {
                            success: true,
                            token: 'mock-jwt-token-' + Date.now(),
                            user: {
                                _id: Date.now(),
                                name: body.name,
                                email: body.email,
                                role: 'user',
                                phone: body.phone || '+250 787 407 051',
                                country: body.country || 'Rwanda'
                            },
                            message: 'Registration successful (demo)'
                        };
                    } else if (endpoint.includes('/verify')) {
                        const userData = getUserData();
                        response = {
                            success: !!userData,
                            user: userData || null,
                            message: userData ? 'User verified (demo)' : 'Not authenticated'
                        };
                    }
                } else if (endpoint.includes('/newsletter')) {
                    response = {
                        success: true,
                        data: { email: body.email, subscribed: true },
                        message: 'Subscribed to newsletter (demo)'
                    };
                } else if (endpoint.includes('/contact')) {
                    response = {
                        success: true,
                        data: { reference: 'CONTACT-' + Date.now(), status: 'received' },
                        message: 'Message received (demo)'
                    };
                } else if (endpoint.includes('/bookings')) {
                    if (method === 'POST') {
                        response = {
                            success: true,
                            data: {
                                booking_reference: 'BOOK-' + Date.now(),
                                service_name: body.service_name,
                                status: 'confirmed'
                            },
                            message: 'Booking confirmed (demo)'
                        };
                    } else {
                        response = {
                            success: true,
                            data: [
                                {
                                    _id: 'mock-1',
                                    service_name: 'Gorilla Trekking Tour',
                                    booking_reference: 'GT-2024-001',
                                    status: 'confirmed',
                                    date: new Date().toISOString(),
                                    service_type: 'destination'
                                }
                            ]
                        };
                    }
                } else if (endpoint.includes('/tripPlan')) {
                    response = {
                        success: true,
                        data: {
                            trip_reference: 'TRIP-' + Date.now(),
                            status: 'pending'
                        },
                        message: 'Trip plan submitted (demo)'
                    };
                } else if (endpoint.includes('/guides')) {
                    response = { success: true, data: mockData.guides };
                } else if (endpoint.includes('/translators')) {
                    response = { success: true, data: mockData.translators };
                } else if (endpoint.includes('/destinations')) {
                    response = { success: true, data: mockData.destinations };
                } else if (endpoint.includes('/accommodations')) {
                    response = { success: true, data: mockData.accommodations };
                } else if (endpoint.includes('/blog')) {
                    response = { success: true, data: mockData.blog };
                } else if (endpoint.includes('/dashboard')) {
                    if (endpoint.includes('/admin')) {
                        const stats = userManager.getStats();
                        const monthlyRevenue = userManager.getMonthlyRevenue();
                        const recentActivity = userManager.getRecentActivity();
                        const recentUsers = userManager.users.slice(-5).reverse();
                        const recentBookings = userManager.bookings.slice(-5).reverse();
                        
                        response = {
                            success: true,
                            data: {
                                stats,
                                monthlyRevenue,
                                recentActivity,
                                recentUsers,
                                recentBookings
                            }
                        };
                    } else {
                        const userBookings = userManager.getUserBookings(currentUser?._id || 2);
                        const userTripPlans = userManager.tripPlans.filter(t => t.userId === (currentUser?._id || 2));
                        
                        response = {
                            success: true,
                            data: {
                                stats: {
                                    totalBookings: userBookings.length,
                                    upcomingBookings: userBookings.filter(b => ['confirmed', 'pending'].includes(b.status)).length,
                                    completedBookings: userBookings.filter(b => b.status === 'completed').length,
                                    pendingTripPlans: userTripPlans.filter(t => t.status === 'review').length,
                                    totalSpent: [{ total: userBookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + (b.totalAmount || 0), 0) }]
                                },
                                recentBookings: userBookings.slice(-3).reverse(),
                                recentTripPlans: userTripPlans.slice(-2).reverse()
                            }
                        };
                    }
                }
                
                resolve(response);
            }, 300);
        });
    }

    // ===============================
    // AUTHENTICATION
    // ===============================
    
    async function checkAuth() {
        const token = getAuthToken();
        if (!token) {
            updateAuthUI();
            return false;
        }
        
        try {
            const result = await apiRequest(config.endpoints.auth.verify);
            if (result.success && result.user) {
                isAuthenticated = true;
                currentUser = result.user;
                saveUserData(result.user);
                updateAuthUI(true, result.user);
                return true;
            } else {
                clearUserData();
                updateAuthUI();
                return false;
            }
        } catch (error) {
            console.error('Auth check error:', error);
            updateAuthUI();
            return false;
        }
    }

    async function login(email, password) {
        try {
            const user = await userManager.authenticateUser(email, password);
            if (user) {
                const { password, ...userWithoutPassword } = user;
                
                isAuthenticated = true;
                currentUser = userWithoutPassword;
                saveUserData(userWithoutPassword);
                updateAuthUI(true, userWithoutPassword);
                
                showNotification(`✅ Welcome back, ${user.name}!`, 'success');
                
                // Redirect to dashboard after login
                setTimeout(() => {
                    if (user.role === 'admin') {
                        showPage('admin');
                    } else {
                        showPage('dashboard');
                    }
                }, 1000);
                
                return { success: true };
            } else {
                throw new Error('Invalid email or password');
            }
        } catch (error) {
            showNotification(`❌ ${error.message}`, 'error');
            return { success: false, message: error.message };
        }
    }

    async function register(userData) {
        try {
            const newUser = await userManager.registerUser(userData);
            
            // Remove password from user object before storing
            const { password, ...userWithoutPassword } = newUser;
            
            isAuthenticated = true;
            currentUser = userWithoutPassword;
            saveUserData(userWithoutPassword);
            updateAuthUI(true, userWithoutPassword);
            
            showNotification('✅ Registration successful! Welcome to Go Trip!', 'success');
            
            // Redirect to dashboard after registration
            setTimeout(() => {
                showPage('dashboard');
            }, 1500);
            
            return { success: true };
        } catch (error) {
            showNotification(`❌ ${error.message}`, 'error');
            return { success: false, message: error.message };
        }
    }

    function logout() {
        clearUserData();
        updateAuthUI();
        showNotification('👋 Logged out successfully', 'info');
        
        // Redirect to home if on protected pages
        const currentPage = document.querySelector('.page.active');
        if (currentPage && (currentPage.id === 'dashboard' || currentPage.id === 'admin')) {
            showPage('home');
        }
    }

    // ===============================
    // PAGE NAVIGATION SYSTEM
    // ===============================
    
    function showPage(pageId, smooth = true) {
        console.log('Showing page:', pageId);
        
        // Authentication checks
        if ((pageId === 'dashboard' || pageId === 'admin') && !isAuthenticated) {
            showNotification('Please login to access this page', 'warning');
            showAuthModal('login');
            return;
        }
        
        if (pageId === 'admin' && currentUser?.role !== 'admin') {
            showNotification('Admin access required', 'error');
            return;
        }
        
        // Hide all pages
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // Update navigation
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === pageId) {
                    link.classList.add('active');
                }
            });
            
            // Load page content
            loadPageContent(pageId);
            
            // Smooth scroll to top
            if (smooth) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                window.scrollTo(0, 0);
            }
            
            // Update URL hash
            if (history.pushState) {
                history.pushState(null, null, `#${pageId}`);
            }
            
        } else {
            // Fallback to home
            showPage('home');
        }
    }

    function loadPageContent(pageId) {
        console.log('Loading content for:', pageId);
        switch(pageId) {
            case 'home':
                loadHomePage();
                break;
            case 'destinations':
                loadDestinations();
                break;
            case 'guides':
                loadGuides();
                break;
            case 'translators':
                loadTranslators();
                break;
            case 'accommodations':
                loadAccommodations();
                break;
            case 'blog':
                loadBlog();
                break;
            case 'dashboard':
                loadDashboard();
                break;
            case 'admin':
                loadAdminDashboard();
                break;
            default:
                loadHomePage();
                break;
        }
    }

    // ===============================
    // DASHBOARD FUNCTIONS
    // ===============================
    
    async function loadDashboard() {
        console.log('Loading user dashboard...');
        
        const dashboard = document.getElementById('dashboard');
        if (!dashboard) return;
        
        if (!isAuthenticated) {
            showPage('home');
            showNotification('Please login to access dashboard', 'warning');
            return;
        }
        
        try {
            // Get user data
            const userBookings = userManager.getUserBookings(currentUser._id);
            const userTripPlans = userManager.tripPlans.filter(t => t.userId === currentUser._id);
            
            // Calculate user stats
            const totalBookings = userBookings.length;
            const upcomingBookings = userBookings.filter(b => 
                ['confirmed', 'pending'].includes(b.status)
            ).length;
            const completedBookings = userBookings.filter(b => 
                b.status === 'completed'
            ).length;
            const totalSpent = userBookings
                .filter(b => b.status === 'confirmed')
                .reduce((sum, b) => sum + (b.totalAmount || 0), 0);
            
            // Render dashboard
            dashboard.innerHTML = `
                <div class="dashboard">
                    <div class="dashboard-header">
                        <div class="container">
                            <h1><i class="fas fa-tachometer-alt"></i> Dashboard</h1>
                            <p>Welcome back, ${currentUser.name}! Manage your travel plans and bookings</p>
                        </div>
                    </div>
                    
                    <div class="container">
                        <div class="dashboard-grid">
                            <div class="dashboard-sidebar">
                                <div class="dashboard-user-profile">
                                    <div class="dashboard-user-avatar-large">
                                        <i class="fas fa-user-circle"></i>
                                    </div>
                                    <h3 class="dashboard-user-name">${currentUser.name}</h3>
                                    <p class="dashboard-user-email">${currentUser.email}</p>
                                    <p class="user-role"><span class="badge badge-${currentUser.role === 'admin' ? 'danger' : 'primary'}">${currentUser.role.toUpperCase()}</span></p>
                                    <div class="user-stats-mini">
                                        <div class="stat">
                                            <strong>${totalBookings}</strong>
                                            <span>Bookings</span>
                                        </div>
                                        <div class="stat">
                                            <strong>$${totalSpent}</strong>
                                            <span>Spent</span>
                                        </div>
                                    </div>
                                </div>
                                
                                <ul class="dashboard-nav">
                                    <li>
                                        <a href="#" class="dashboard-tab-link active" data-tab="overview">
                                            <i class="fas fa-chart-pie"></i>
                                            Overview
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="dashboard-tab-link" data-tab="bookings">
                                            <i class="fas fa-calendar-check"></i>
                                            My Bookings
                                            <span class="nav-badge">${totalBookings}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="dashboard-tab-link" data-tab="trip-plans">
                                            <i class="fas fa-route"></i>
                                            Trip Plans
                                            <span class="nav-badge">${userTripPlans.length}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="dashboard-tab-link" data-tab="profile">
                                            <i class="fas fa-user-cog"></i>
                                            Profile Settings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="dashboard-tab-link" data-tab="documents">
                                            <i class="fas fa-file-alt"></i>
                                            Travel Documents
                                        </a>
                                    </li>
                                </ul>
                                
                                <div class="sidebar-actions">
                                    <button class="btn btn-primary btn-block mt-3" id="dashboard-new-booking-btn">
                                        <i class="fas fa-plus"></i> New Booking
                                    </button>
                                    <button class="btn btn-outline btn-block mt-2" id="dashboard-plan-trip-btn">
                                        <i class="fas fa-map-marked-alt"></i> Plan a Trip
                                    </button>
                                </div>
                            </div>
                            
                            <div class="dashboard-content">
                                <!-- Overview Tab -->
                                <div id="dashboard-overview" class="dashboard-tab-container active">
                                    <div class="dashboard-stats">
                                        <div class="dashboard-stat-card">
                                            <div class="dashboard-stat-icon bookings">
                                                <i class="fas fa-calendar-alt"></i>
                                            </div>
                                            <div class="dashboard-stat-content">
                                                <h3>Total Bookings</h3>
                                                <p class="dashboard-stat-number">${totalBookings}</p>
                                                <p class="dashboard-stat-subtitle">All-time bookings</p>
                                            </div>
                                        </div>
                                        
                                        <div class="dashboard-stat-card">
                                            <div class="dashboard-stat-icon pending">
                                                <i class="fas fa-clock"></i>
                                            </div>
                                            <div class="dashboard-stat-content">
                                                <h3>Upcoming</h3>
                                                <p class="dashboard-stat-number">${upcomingBookings}</p>
                                                <p class="dashboard-stat-subtitle">Active bookings</p>
                                            </div>
                                        </div>
                                        
                                        <div class="dashboard-stat-card">
                                            <div class="dashboard-stat-icon completed">
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                            <div class="dashboard-stat-content">
                                                <h3>Completed</h3>
                                                <p class="dashboard-stat-number">${completedBookings}</p>
                                                <p class="dashboard-stat-subtitle">Past experiences</p>
                                            </div>
                                        </div>
                                        
                                        <div class="dashboard-stat-card">
                                            <div class="dashboard-stat-icon revenue">
                                                <i class="fas fa-wallet"></i>
                                            </div>
                                            <div class="dashboard-stat-content">
                                                <h3>Total Spent</h3>
                                                <p class="dashboard-stat-number">$${totalSpent}</p>
                                                <p class="dashboard-stat-subtitle">All transactions</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="dashboard-section">
                                        <div class="section-header">
                                            <h3><i class="fas fa-history"></i> Recent Bookings</h3>
                                            <a href="#" class="btn-link view-all" data-tab="bookings">View All</a>
                                        </div>
                                        <div id="dashboard-recent-bookings" class="dashboard-booking-cards">
                                            ${renderRecentBookings(userBookings.slice(0, 3))}
                                        </div>
                                    </div>
                                    
                                    <div class="dashboard-section">
                                        <div class="section-header">
                                            <h3><i class="fas fa-route"></i> Recent Trip Plans</h3>
                                            <a href="#" class="btn-link view-all" data-tab="trip-plans">View All</a>
                                        </div>
                                        <div id="dashboard-recent-trip-plans" class="dashboard-booking-cards">
                                            ${renderRecentTripPlans(userTripPlans.slice(0, 2))}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Bookings Tab -->
                                <div id="dashboard-bookings" class="dashboard-tab-container">
                                    <div class="tab-header">
                                        <h2><i class="fas fa-calendar-check"></i> My Bookings</h2>
                                        <div class="tab-filters">
                                            <select id="dashboard-booking-filter" class="form-select">
                                                <option value="">All Status</option>
                                                <option value="pending">Pending</option>
                                                <option value="confirmed">Confirmed</option>
                                                <option value="completed">Completed</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <button class="btn btn-primary" id="new-booking-modal-btn">
                                                <i class="fas fa-plus"></i> New Booking
                                            </button>
                                        </div>
                                    </div>
                                    <div class="dashboard-section">
                                        <div class="bookings-table-container">
                                            <table class="dashboard-table">
                                                <thead>
                                                    <tr>
                                                        <th>Service</th>
                                                        <th>Type</th>
                                                        <th>Date</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="dashboard-bookings-list">
                                                    ${renderBookingsTable(userBookings)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Trip Plans Tab -->
                                <div id="dashboard-trip-plans" class="dashboard-tab-container">
                                    <div class="tab-header">
                                        <h2><i class="fas fa-route"></i> My Trip Plans</h2>
                                        <button class="btn btn-primary" id="new-trip-plan-btn">
                                            <i class="fas fa-plus"></i> Request New Trip Plan
                                        </button>
                                    </div>
                                    <div class="dashboard-section">
                                        <div class="trip-plans-container">
                                            ${renderTripPlans(userTripPlans)}
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Profile Tab -->
                                <div id="dashboard-profile" class="dashboard-tab-container">
                                    <div class="tab-header">
                                        <h2><i class="fas fa-user-cog"></i> Profile Settings</h2>
                                    </div>
                                    <div class="dashboard-section">
                                        <form id="dashboard-profile-form" class="dashboard-form-grid">
                                            <div class="dashboard-form-group">
                                                <label><i class="fas fa-user"></i> Full Name</label>
                                                <input type="text" name="name" value="${currentUser.name}" required>
                                            </div>
                                            
                                            <div class="dashboard-form-group">
                                                <label><i class="fas fa-envelope"></i> Email</label>
                                                <input type="email" value="${currentUser.email}" disabled>
                                                <small class="text-muted">Contact support to change email</small>
                                            </div>
                                            
                                            <div class="dashboard-form-group">
                                                <label><i class="fas fa-phone"></i> Phone Number</label>
                                                <input type="tel" name="phone" value="${currentUser.phone || ''}" required>
                                            </div>
                                            
                                            <div class="dashboard-form-group">
                                                <label><i class="fas fa-globe"></i> Country</label>
                                                <input type="text" name="country" value="${currentUser.country || ''}" required>
                                            </div>
                                            
                                            <div class="dashboard-form-group full-width">
                                                <label><i class="fas fa-home"></i> Address</label>
                                                <textarea name="address" rows="2">${currentUser.address || ''}</textarea>
                                            </div>
                                            
                                            <div class="dashboard-form-group">
                                                <label><i class="fas fa-birthday-cake"></i> Date of Birth</label>
                                                <input type="date" name="dob" value="${currentUser.dob || ''}">
                                            </div>
                                            
                                            <div class="dashboard-form-group">
                                                <label><i class="fas fa-passport"></i> Passport Number</label>
                                                <input type="text" name="passport" value="${currentUser.passport || ''}">
                                            </div>
                                            
                                            <div class="dashboard-form-group full-width">
                                                <label><i class="fas fa-heart"></i> Travel Preferences</label>
                                                <textarea name="preferences" rows="3" placeholder="Any specific preferences, dietary requirements, or special needs...">${currentUser.preferences || ''}</textarea>
                                            </div>
                                            
                                            <div class="form-actions">
                                                <button type="submit" class="btn btn-primary">
                                                    <i class="fas fa-save"></i> Update Profile
                                                </button>
                                                <button type="button" class="btn btn-outline" id="change-password-btn">
                                                    <i class="fas fa-key"></i> Change Password
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                
                                <!-- Documents Tab -->
                                <div id="dashboard-documents" class="dashboard-tab-container">
                                    <div class="tab-header">
                                        <h2><i class="fas fa-file-alt"></i> Travel Documents</h2>
                                        <button class="btn btn-primary" id="upload-document-btn">
                                            <i class="fas fa-upload"></i> Upload Document
                                        </button>
                                    </div>
                                    <div class="dashboard-section">
                                        <div class="documents-container">
                                            <div class="document-cards">
                                                <div class="document-card">
                                                    <div class="document-icon">
                                                        <i class="fas fa-passport"></i>
                                                    </div>
                                                    <div class="document-content">
                                                        <h4>Passport</h4>
                                                        <p>Upload your passport copy for visa processing</p>
                                                        <div class="document-actions">
                                                            <button class="btn btn-sm btn-outline">
                                                                <i class="fas fa-upload"></i> Upload
                                                            </button>
                                                            <button class="btn btn-sm btn-outline" disabled>
                                                                <i class="fas fa-eye"></i> View
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="document-card">
                                                    <div class="document-icon">
                                                        <i class="fas fa-plane"></i>
                                                    </div>
                                                    <div class="document-content">
                                                        <h4>Flight Tickets</h4>
                                                        <p>Upload flight itinerary or e-tickets</p>
                                                        <div class="document-actions">
                                                            <button class="btn btn-sm btn-outline">
                                                                <i class="fas fa-upload"></i> Upload
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div class="document-card">
                                                    <div class="document-icon">
                                                        <i class="fas fa-file-medical"></i>
                                                    </div>
                                                    <div class="document-content">
                                                        <h4>Medical Insurance</h4>
                                                        <p>Travel medical insurance documents</p>
                                                        <div class="document-actions">
                                                            <button class="btn btn-sm btn-outline">
                                                                <i class="fas fa-upload"></i> Upload
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Setup dashboard event listeners
            setupEnhancedDashboardListeners();
            
        } catch (error) {
            console.error('Error loading dashboard:', error);
            dashboard.innerHTML = `
                <div class="container">
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle fa-3x"></i>
                        <h3>Error loading dashboard</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="location.reload()">
                            <i class="fas fa-redo"></i> Retry
                        </button>
                    </div>
                </div>
            `;
        }
    }

    function renderRecentBookings(bookings) {
        if (bookings.length === 0) {
            return `
                <div class="dashboard-empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No recent bookings</p>
                    <button class="btn btn-sm btn-outline" onclick="showServiceSelectionModal()">
                        Book Your First Trip
                    </button>
                </div>
            `;
        }
        
        return bookings.map(booking => `
            <div class="dashboard-booking-card">
                <div class="dashboard-booking-header">
                    <div class="booking-service-type">
                        <span class="service-badge service-${booking.serviceType}">
                            ${booking.serviceType}
                        </span>
                    </div>
                    <span class="dashboard-booking-status dashboard-status-${booking.status}">
                        ${booking.status.toUpperCase()}
                    </span>
                </div>
                
                <h4 class="dashboard-booking-title">${booking.serviceName}</h4>
                
                <div class="dashboard-booking-details">
                    <p><i class="far fa-calendar"></i> ${new Date(booking.date).toLocaleDateString()}</p>
                    <p><i class="fas fa-users"></i> ${booking.travelers} travelers</p>
                    <p><i class="fas fa-hashtag"></i> ${booking._id}</p>
                </div>
                
                <div class="dashboard-booking-footer">
                    <div class="booking-amount">
                        <strong>$${booking.totalAmount || '0'}</strong>
                    </div>
                    <div class="dashboard-booking-actions">
                        <button class="btn btn-sm btn-outline" onclick="viewBookingDetails('${booking._id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${booking.status === 'pending' ? `
                            <button class="btn btn-sm btn-danger" onclick="cancelBooking('${booking._id}')">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderBookingsTable(bookings) {
        if (bookings.length === 0) {
            return `
                <tr>
                    <td colspan="6" class="text-center">
                        <div class="empty-table-state">
                            <i class="fas fa-calendar-times fa-2x"></i>
                            <p>No bookings yet</p>
                            <button class="btn btn-primary" onclick="showServiceSelectionModal()">
                                Book Your First Trip
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        }
        
        return bookings.map(booking => `
            <tr>
                <td>
                    <div class="service-cell">
                        <div class="service-icon-small service-${booking.serviceType}">
                            <i class="fas fa-${getServiceIcon(booking.serviceType)}"></i>
                        </div>
                        <div>
                            <strong>${booking.serviceName}</strong>
                            <small>${booking._id}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge badge-service">${booking.serviceType}</span>
                </td>
                <td>
                    ${new Date(booking.date).toLocaleDateString()}<br>
                    <small>${booking.duration || 1} days</small>
                </td>
                <td>
                    <strong>$${booking.totalAmount || '0'}</strong>
                </td>
                <td>
                    <span class="badge badge-${booking.status}">
                        ${booking.status.toUpperCase()}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-action btn-view" onclick="viewBookingDetails('${booking._id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${booking.status === 'pending' ? `
                            <button class="btn-action btn-edit" onclick="editBooking('${booking._id}')">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="btn-action btn-cancel" onclick="cancelBooking('${booking._id}')">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                        <button class="btn-action btn-download" onclick="downloadBookingInvoice('${booking._id}')">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function renderRecentTripPlans(tripPlans) {
        if (tripPlans.length === 0) {
            return `
                <div class="dashboard-empty-state">
                    <i class="fas fa-route"></i>
                    <p>No trip plans yet</p>
                    <button class="btn btn-sm btn-outline" onclick="showTripPlanModal()">
                        Plan Your First Trip
                    </button>
                </div>
            `;
        }
        
        return tripPlans.map(trip => `
            <div class="dashboard-booking-card">
                <div class="dashboard-booking-header">
                    <div class="booking-service-type">
                        <span class="service-badge service-trip">
                            <i class="fas fa-route"></i> TRIP PLAN
                        </span>
                    </div>
                    <span class="dashboard-booking-status dashboard-status-${trip.status}">
                        ${trip.status.toUpperCase()}
                    </span>
                </div>
                
                <h4 class="dashboard-booking-title">${trip.duration} Trip</h4>
                
                <div class="dashboard-booking-details">
                    <p><i class="far fa-calendar"></i> Start: ${new Date(trip.startDate).toLocaleDateString()}</p>
                    <p><i class="fas fa-users"></i> ${trip.travelers} travelers</p>
                    <p><i class="fas fa-wallet"></i> Budget: ${trip.budget}</p>
                </div>
                
                <div class="trip-interests">
                    ${trip.interests && trip.interests.length > 0 ? 
                        trip.interests.map(interest => `
                            <span class="interest-tag">${interest}</span>
                        `).join('') : 
                        '<small>No specific interests</small>'
                    }
                </div>
                
                <div class="dashboard-booking-footer">
                    <div class="trip-plan-date">
                        <small>Requested: ${new Date(trip.createdAt).toLocaleDateString()}</small>
                    </div>
                    <div class="dashboard-booking-actions">
                        <button class="btn btn-sm btn-outline" onclick="viewTripPlan('${trip._id}')">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderTripPlans(tripPlans) {
        if (tripPlans.length === 0) {
            return `
                <div class="empty-state">
                    <div class="empty-state-icon">
                        <i class="fas fa-route fa-3x"></i>
                    </div>
                    <h3>No Trip Plans Yet</h3>
                    <p>Start planning your perfect Rwanda adventure</p>
                    <button class="btn btn-primary" onclick="showTripPlanModal()">
                        <i class="fas fa-plus"></i> Request Trip Plan
                    </button>
                </div>
            `;
        }
        
        return tripPlans.map(trip => `
            <div class="trip-plan-card">
                <div class="trip-plan-header">
                    <div class="trip-plan-id">
                        <h4>${trip._id}</h4>
                        <span class="badge badge-${trip.status}">${trip.status}</span>
                    </div>
                    <div class="trip-plan-date">
                        <small>Requested: ${new Date(trip.createdAt).toLocaleDateString()}</small>
                    </div>
                </div>
                
                <div class="trip-plan-details">
                    <div class="detail-row">
                        <div class="detail-item">
                            <i class="fas fa-calendar"></i>
                            <div>
                                <label>Start Date</label>
                                <p>${new Date(trip.startDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-clock"></i>
                            <div>
                                <label>Duration</label>
                                <p>${trip.duration}</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-users"></i>
                            <div>
                                <label>Travelers</label>
                                <p>${trip.travelers} people</p>
                            </div>
                        </div>
                        <div class="detail-item">
                            <i class="fas fa-wallet"></i>
                            <div>
                                <label>Budget</label>
                                <p>${trip.budget}</p>
                            </div>
                        </div>
                    </div>
                    
                    ${trip.interests && trip.interests.length > 0 ? `
                        <div class="detail-row">
                            <div class="detail-item full-width">
                                <i class="fas fa-heart"></i>
                                <div>
                                    <label>Interests</label>
                                    <div class="interests-container">
                                        ${trip.interests.map(interest => `
                                            <span class="interest-tag">${interest}</span>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${trip.message ? `
                        <div class="detail-row">
                            <div class="detail-item full-width">
                                <i class="fas fa-comment"></i>
                                <div>
                                    <label>Notes</label>
                                    <p>${trip.message}</p>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${trip.itinerary ? `
                        <div class="detail-row">
                            <div class="detail-item full-width">
                                <i class="fas fa-map"></i>
                                <div>
                                    <label>Itinerary</label>
                                    <div class="itinerary-container">
                                        ${renderItinerary(trip.itinerary)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="trip-plan-footer">
                    <div class="trip-plan-actions">
                        ${trip.status === 'review' ? `
                            <button class="btn btn-sm btn-outline" onclick="editTripPlan('${trip._id}')">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="cancelTripPlan('${trip._id}')">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        ` : ''}
                        
                        ${trip.itinerary ? `
                            <button class="btn btn-sm btn-primary" onclick="downloadItinerary('${trip._id}')">
                                <i class="fas fa-download"></i> Download Itinerary
                            </button>
                        ` : `
                            <button class="btn btn-sm btn-outline" disabled>
                                <i class="fas fa-clock"></i> Processing...
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `).join('');
    }

    function renderItinerary(itinerary) {
        if (!itinerary || !itinerary.days) return '<p>No itinerary available</p>';
        
        return itinerary.days.map(day => `
            <div class="itinerary-day">
                <h5>Day ${day.day}: ${day.title}</h5>
                <div class="itinerary-activities">
                    ${day.activities.map(activity => `
                        <div class="itinerary-activity">
                            <i class="fas fa-${activity.icon || 'map-marker-alt'}"></i>
                            <div>
                                <strong>${activity.time}</strong>
                                <p>${activity.description}</p>
                                ${activity.location ? `<small><i class="fas fa-map-pin"></i> ${activity.location}</small>` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `).join('');
    }

    function getServiceIcon(serviceType) {
        const icons = {
            'destination': 'map-marked-alt',
            'guide': 'user-tie',
            'translator': 'language',
            'accommodation': 'hotel',
            'trip': 'route'
        };
        return icons[serviceType] || 'question-circle';
    }

    function setupEnhancedDashboardListeners() {
        // Tab switching
        document.querySelectorAll('.dashboard-tab-link').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tabs
                document.querySelectorAll('.dashboard-tab-link').forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.dashboard-tab-container').forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                const tabId = 'dashboard-' + this.dataset.tab;
                const tabElement = document.getElementById(tabId);
                if (tabElement) {
                    tabElement.classList.add('active');
                }
            });
        });
        
        // New booking button
        document.getElementById('dashboard-new-booking-btn')?.addEventListener('click', () => {
            showServiceSelectionModal();
        });
        
        // Plan trip button
        document.getElementById('dashboard-plan-trip-btn')?.addEventListener('click', () => {
            showTripPlanModal();
        });
        
        // New booking modal button
        document.getElementById('new-booking-modal-btn')?.addEventListener('click', () => {
            showServiceSelectionModal();
        });
        
        // New trip plan button
        document.getElementById('new-trip-plan-btn')?.addEventListener('click', () => {
            showTripPlanModal();
        });
        
        // Change password button
        document.getElementById('change-password-btn')?.addEventListener('click', () => {
            showChangePasswordModal();
        });
        
        // Upload document button
        document.getElementById('upload-document-btn')?.addEventListener('click', () => {
            showUploadDocumentModal();
        });
        
        // Booking filter
        const bookingFilter = document.getElementById('dashboard-booking-filter');
        if (bookingFilter) {
            bookingFilter.addEventListener('change', function(e) {
                filterBookings(this.value);
            });
        }
        
        // Profile form submission
        const profileForm = document.getElementById('dashboard-profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                try {
                    const updatedUser = await userManager.updateUser(currentUser._id, data);
                    if (updatedUser) {
                        currentUser = updatedUser;
                        saveUserData(currentUser);
                        showNotification('✅ Profile updated successfully!', 'success');
                        setTimeout(() => {
                            loadDashboard();
                        }, 1000);
                    }
                } catch (error) {
                    showNotification('❌ Error updating profile', 'error');
                }
            });
        }
    }

    // ===============================
    // ADMIN DASHBOARD FUNCTIONS
    // ===============================

    async function loadAdminDashboard() {
        console.log('Loading admin dashboard...');
        
        // Check admin access
        if (!isAuthenticated || currentUser?.role !== 'admin') {
            showNotification('Admin access required', 'error');
            showPage('home');
            return;
        }
        
        const admin = document.getElementById('admin');
        if (!admin) return;
        
        try {
            const stats = userManager.getStats();
            const monthlyRevenue = userManager.getMonthlyRevenue();
            const recentActivity = userManager.getRecentActivity();
            const recentBookings = userManager.bookings.slice(-5).reverse();
            const recentUsers = userManager.users.slice(-5).reverse();
            
            admin.innerHTML = `
                <div class="admin-dashboard">
                    <div class="dashboard-header">
                        <div class="container">
                            <h1><i class="fas fa-crown"></i> Admin Dashboard</h1>
                            <p>System administration and management panel</p>
                        </div>
                    </div>
                    
                    <div class="container">
                        <div class="admin-controls">
                            <div class="admin-search">
                                <input type="text" placeholder="Search users, bookings, trips..." id="admin-search-input">
                                <button class="btn btn-primary">
                                    <i class="fas fa-search"></i>
                                </button>
                            </div>
                            <div class="admin-actions">
                                <button class="btn btn-success" id="add-user-btn">
                                    <i class="fas fa-user-plus"></i> Add User
                                </button>
                                <button class="btn btn-primary" id="generate-report-btn">
                                    <i class="fas fa-file-export"></i> Generate Report
                                </button>
                            </div>
                        </div>
                        
                        <div class="dashboard-stats">
                            <div class="dashboard-stat-card admin-stat">
                                <div class="dashboard-stat-icon users">
                                    <i class="fas fa-users"></i>
                                </div>
                                <div class="dashboard-stat-content">
                                    <h3>Total Users</h3>
                                    <p class="dashboard-stat-number">${stats.totalUsers}</p>
                                    <p class="dashboard-stat-subtitle">
                                        <span class="stat-change positive">+2 this week</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="dashboard-stat-card admin-stat">
                                <div class="dashboard-stat-icon bookings">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="dashboard-stat-content">
                                    <h3>Total Bookings</h3>
                                    <p class="dashboard-stat-number">${stats.totalBookings}</p>
                                    <p class="dashboard-stat-subtitle">
                                        <span class="stat-change positive">+5 this month</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="dashboard-stat-card admin-stat">
                                <div class="dashboard-stat-icon revenue">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                                <div class="dashboard-stat-content">
                                    <h3>Total Revenue</h3>
                                    <p class="dashboard-stat-number">$${stats.totalRevenue.toLocaleString()}</p>
                                    <p class="dashboard-stat-subtitle">
                                        <span class="stat-change positive">+15% this month</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="dashboard-stat-card admin-stat">
                                <div class="dashboard-stat-icon pending">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="dashboard-stat-content">
                                    <h3>Active Bookings</h3>
                                    <p class="dashboard-stat-number">${stats.activeBookings}</p>
                                    <p class="dashboard-stat-subtitle">
                                        ${stats.pendingTripPlans} pending trips
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="admin-grid">
                            <div class="admin-column">
                                <div class="admin-widget">
                                    <div class="widget-header">
                                        <h3><i class="fas fa-chart-line"></i> Revenue Overview</h3>
                                        <select class="form-select-sm" id="revenue-period">
                                            <option value="monthly">Monthly</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="yearly">Yearly</option>
                                        </select>
                                    </div>
                                    <div class="widget-body">
                                        <div class="revenue-chart">
                                            ${renderRevenueChart(monthlyRevenue)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="admin-widget">
                                    <div class="widget-header">
                                        <h3><i class="fas fa-bell"></i> Recent Activity</h3>
                                        <button class="btn-link" id="view-all-activity">View All</button>
                                    </div>
                                    <div class="widget-body">
                                        <div class="activity-list">
                                            ${renderRecentActivity(recentActivity)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="admin-column">
                                <div class="admin-widget">
                                    <div class="widget-header">
                                        <h3><i class="fas fa-users"></i> Recent Users</h3>
                                        <button class="btn-link" id="view-all-users">View All</button>
                                    </div>
                                    <div class="widget-body">
                                        <div class="users-list">
                                            ${renderRecentUsers(recentUsers)}
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="admin-widget">
                                    <div class="widget-header">
                                        <h3><i class="fas fa-calendar-check"></i> Recent Bookings</h3>
                                        <button class="btn-link" id="view-all-bookings">View All</button>
                                    </div>
                                    <div class="widget-body">
                                        <div class="bookings-list">
                                            ${renderAdminRecentBookings(recentBookings)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Tabs for detailed management -->
                        <div class="admin-tabs">
                            <nav class="admin-tab-nav">
                                <button class="admin-tab-link active" data-tab="users-management">
                                    <i class="fas fa-users-cog"></i> Users Management
                                </button>
                                <button class="admin-tab-link" data-tab="bookings-management">
                                    <i class="fas fa-calendar-check"></i> Bookings Management
                                </button>
                                <button class="admin-tab-link" data-tab="trip-plans-management">
                                    <i class="fas fa-route"></i> Trip Plans Management
                                </button>
                                <button class="admin-tab-link" data-tab="services-management">
                                    <i class="fas fa-concierge-bell"></i> Services Management
                                </button>
                                <button class="admin-tab-link" data-tab="reports">
                                    <i class="fas fa-chart-bar"></i> Reports
                                </button>
                            </nav>
                            
                            <div class="admin-tab-content">
                                <!-- Users Management Tab -->
                                <div id="users-management" class="admin-tab-pane active">
                                    <div class="admin-table-container">
                                        <div class="table-header">
                                            <h3>Users Management</h3>
                                            <div class="table-actions">
                                                <button class="btn btn-sm btn-success" id="add-new-user-btn">
                                                    <i class="fas fa-plus"></i> Add User
                                                </button>
                                                <button class="btn btn-sm btn-outline" id="export-users-btn">
                                                    <i class="fas fa-download"></i> Export
                                                </button>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>User</th>
                                                        <th>Email</th>
                                                        <th>Role</th>
                                                        <th>Status</th>
                                                        <th>Joined</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="users-table-body">
                                                    ${renderUsersTable(userManager.users)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Bookings Management Tab -->
                                <div id="bookings-management" class="admin-tab-pane">
                                    <div class="admin-table-container">
                                        <div class="table-header">
                                            <h3>Bookings Management</h3>
                                            <div class="table-actions">
                                                <select class="form-select-sm" id="booking-type-filter">
                                                    <option value="">All Types</option>
                                                    <option value="destination">Destinations</option>
                                                    <option value="guide">Guides</option>
                                                    <option value="translator">Translators</option>
                                                    <option value="accommodation">Accommodations</option>
                                                </select>
                                                <button class="btn btn-sm btn-outline" id="export-bookings-btn">
                                                    <i class="fas fa-download"></i> Export
                                                </button>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Booking ID</th>
                                                        <th>User</th>
                                                        <th>Service</th>
                                                        <th>Amount</th>
                                                        <th>Status</th>
                                                        <th>Date</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="bookings-table-body">
                                                    ${renderAdminBookingsTable(userManager.bookings)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Trip Plans Management Tab -->
                                <div id="trip-plans-management" class="admin-tab-pane">
                                    <div class="admin-table-container">
                                        <div class="table-header">
                                            <h3>Trip Plans Management</h3>
                                            <div class="table-actions">
                                                <select class="form-select-sm" id="trip-status-filter">
                                                    <option value="">All Status</option>
                                                    <option value="review">Review</option>
                                                    <option value="processing">Processing</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                                <button class="btn btn-sm btn-outline" id="export-trips-btn">
                                                    <i class="fas fa-download"></i> Export
                                                </button>
                                            </div>
                                        </div>
                                        <div class="table-responsive">
                                            <table class="admin-table">
                                                <thead>
                                                    <tr>
                                                        <th>Trip ID</th>
                                                        <th>User</th>
                                                        <th>Duration</th>
                                                        <th>Budget</th>
                                                        <th>Status</th>
                                                        <th>Requested</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody id="trips-table-body">
                                                    ${renderAdminTripsTable(userManager.tripPlans)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Services Management Tab -->
                                <div id="services-management" class="admin-tab-pane">
                                    <div class="services-management">
                                        <div class="services-tabs">
                                            <button class="service-tab active" data-service="guides">
                                                <i class="fas fa-user-tie"></i> Guides
                                            </button>
                                            <button class="service-tab" data-service="translators">
                                                <i class="fas fa-language"></i> Translators
                                            </button>
                                            <button class="service-tab" data-service="accommodations">
                                                <i class="fas fa-hotel"></i> Accommodations
                                            </button>
                                            <button class="service-tab" data-service="destinations">
                                                <i class="fas fa-map-marked-alt"></i> Destinations
                                            </button>
                                            <button class="service-tab" data-service="blog">
                                                <i class="fas fa-newspaper"></i> Blog Posts
                                            </button>
                                        </div>
                                        
                                        <div class="services-content">
                                            <div id="guides-management" class="service-tab-content active">
                                                <div class="service-header">
                                                    <h3>Tour Guides Management</h3>
                                                    <button class="btn btn-success" id="add-guide-btn">
                                                        <i class="fas fa-plus"></i> Add Guide
                                                    </button>
                                                </div>
                                                <div class="service-table-container">
                                                    <table class="admin-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Guide</th>
                                                                <th>Specialty</th>
                                                                <th>Languages</th>
                                                                <th>Rate</th>
                                                                <th>Status</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            ${mockData.guides.map(guide => `
                                                                <tr>
                                                                    <td>
                                                                        <div class="user-cell">
                                                                            <div class="user-avatar-small">
                                                                                <i class="fas fa-user-tie"></i>
                                                                            </div>
                                                                            <div>
                                                                                <strong>${guide.name}</strong>
                                                                                <small>${guide.experience}</small>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                    <td>${guide.specialty}</td>
                                                                    <td>${guide.languages.slice(0, 2).join(', ')}${guide.languages.length > 2 ? '...' : ''}</td>
                                                                    <td>${guide.price}</td>
                                                                    <td>
                                                                        <span class="badge badge-${guide.available ? 'success' : 'secondary'}">
                                                                            ${guide.available ? 'Available' : 'Busy'}
                                                                        </span>
                                                                    </td>
                                                                    <td>
                                                                        <div class="table-actions">
                                                                            <button class="btn-action btn-view" onclick="viewGuideDetails(${guide._id})">
                                                                                <i class="fas fa-eye"></i>
                                                                            </button>
                                                                            <button class="btn-action btn-edit" onclick="editGuide(${guide._id})">
                                                                                <i class="fas fa-edit"></i>
                                                                            </button>
                                                                            <button class="btn-action btn-delete" onclick="deleteGuide(${guide._id})">
                                                                                <i class="fas fa-trash"></i>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            `).join('')}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                            <!-- Other services tabs -->
                                        </div>
                                    </div>
                                </div>
                                
                                <!-- Reports Tab -->
                                <div id="reports" class="admin-tab-pane">
                                    <div class="reports-container">
                                        <h3>Generate Reports</h3>
                                        <div class="reports-grid">
                                            <div class="report-card">
                                                <div class="report-icon">
                                                    <i class="fas fa-file-invoice-dollar"></i>
                                                </div>
                                                <h4>Revenue Report</h4>
                                                <p>Monthly revenue breakdown</p>
                                                <button class="btn btn-primary" onclick="generateReport('revenue')">
                                                    Generate
                                                </button>
                                            </div>
                                            <div class="report-card">
                                                <div class="report-icon">
                                                    <i class="fas fa-users"></i>
                                                </div>
                                                <h4>User Report</h4>
                                                <p>User statistics and growth</p>
                                                <button class="btn btn-primary" onclick="generateReport('users')">
                                                    Generate
                                                </button>
                                            </div>
                                            <div class="report-card">
                                                <div class="report-icon">
                                                    <i class="fas fa-calendar-alt"></i>
                                                </div>
                                                <h4>Bookings Report</h4>
                                                <p>Booking trends and performance</p>
                                                <button class="btn btn-primary" onclick="generateReport('bookings')">
                                                    Generate
                                                </button>
                                            </div>
                                            <div class="report-card">
                                                <div class="report-icon">
                                                    <i class="fas fa-chart-pie"></i>
                                                </div>
                                                <h4>Custom Report</h4>
                                                <p>Create custom report</p>
                                                <button class="btn btn-primary" onclick="showCustomReportModal()">
                                                    Create
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Setup admin dashboard event listeners
            setupAdminDashboardListeners();
            
        } catch (error) {
            console.error('Error loading admin dashboard:', error);
            admin.innerHTML = `
                <div class="container">
                    <div class="error-state">
                        <i class="fas fa-exclamation-triangle fa-3x"></i>
                        <h3>Error loading admin dashboard</h3>
                        <p>${error.message}</p>
                        <button class="btn btn-primary" onclick="location.reload()">
                            Retry
                        </button>
                    </div>
                </div>
            `;
        }
    }

    function renderRevenueChart(monthlyRevenue) {
        if (monthlyRevenue.length === 0) {
            return '<p class="text-center">No revenue data available</p>';
        }
        
        const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
        
        return monthlyRevenue.map(item => {
            const height = (item.revenue / maxRevenue) * 100;
            return `
                <div class="chart-bar-container">
                    <div class="chart-bar" style="height: ${height}%">
                        <div class="chart-bar-value">$${item.revenue.toLocaleString()}</div>
                    </div>
                    <div class="chart-bar-label">${item.month.split('-')[1]}/${item.month.split('-')[0].slice(2)}</div>
                </div>
            `;
        }).join('');
    }

    function renderRecentActivity(activities) {
        if (activities.length === 0) {
            return '<p class="text-center">No recent activity</p>';
        }
        
        return activities.slice(0, 6).map(activity => `
            <div class="activity-item">
                <div class="activity-icon">
                    <i class="fas fa-${getActivityIcon(activity.type)}"></i>
                </div>
                <div class="activity-content">
                    <p>
                        <strong>${activity.name}</strong> ${activity.action} 
                        ${activity.type === 'user' ? 'account' : activity.type}
                    </p>
                    <small>${formatTimeAgo(activity.timestamp)}</small>
                </div>
            </div>
        `).join('');
    }

    function renderRecentUsers(users) {
        if (users.length === 0) {
            return '<p class="text-center">No recent users</p>';
        }
        
        return users.map(user => `
            <div class="user-item">
                <div class="user-avatar">
                    <i class="fas fa-user-circle"></i>
                </div>
                <div class="user-info">
                    <strong>${user.name}</strong>
                    <small>${user.email}</small>
                    <span class="badge badge-${user.role === 'admin' ? 'danger' : 'primary'}">
                        ${user.role}
                    </span>
                </div>
                <div class="user-actions">
                    <button class="btn-action btn-sm" onclick="viewUserDetails(${user._id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderAdminRecentBookings(bookings) {
        if (bookings.length === 0) {
            return '<p class="text-center">No recent bookings</p>';
        }
        
        return bookings.map(booking => `
            <div class="booking-item">
                <div class="booking-icon">
                    <i class="fas fa-${getServiceIcon(booking.serviceType)}"></i>
                </div>
                <div class="booking-info">
                    <strong>${booking.serviceName}</strong>
                    <small>${booking._id}</small>
                    <div>
                        <span class="badge badge-${booking.status}">${booking.status}</span>
                        <span class="amount">$${booking.totalAmount || '0'}</span>
                    </div>
                </div>
                <div class="booking-actions">
                    <button class="btn-action btn-sm" onclick="viewBookingDetails('${booking._id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderUsersTable(users) {
        return users.map(user => `
            <tr>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar-small">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div>
                            <strong>${user.name}</strong>
                            <small>ID: ${user._id}</small>
                        </div>
                    </div>
                </td>
                <td>${user.email}</td>
                <td>
                    <span class="badge badge-${user.role === 'admin' ? 'danger' : 'primary'}">
                        ${user.role}
                    </span>
                </td>
                <td>
                    <span class="badge badge-${user.status === 'active' ? 'success' : 'secondary'}">
                        ${user.status}
                    </span>
                </td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-action btn-view" onclick="viewUserDetails(${user._id})">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-edit" onclick="editUser(${user._id})">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="btn-action btn-delete" onclick="deleteUserConfirm(${user._id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function renderAdminBookingsTable(bookings) {
        return bookings.map(booking => `
            <tr>
                <td>
                    <strong>${booking._id}</strong>
                </td>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar-small">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div>
                            <strong>${booking.userName}</strong>
                            <small>${booking.userEmail}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="service-cell">
                        <div class="service-icon-small service-${booking.serviceType}">
                            <i class="fas fa-${getServiceIcon(booking.serviceType)}"></i>
                        </div>
                        <div>
                            <strong>${booking.serviceName}</strong>
                            <small>${booking.serviceType}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <strong>$${booking.totalAmount || '0'}</strong>
                </td>
                <td>
                    <span class="badge badge-${booking.status}">
                        ${booking.status.toUpperCase()}
                    </span>
                </td>
                <td>${new Date(booking.createdAt).toLocaleDateString()}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-action btn-view" onclick="viewBookingDetails('${booking._id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${booking.status === 'pending' ? `
                            <button class="btn-action btn-confirm" onclick="confirmBooking('${booking._id}')">
                                <i class="fas fa-check"></i>
                            </button>
                            <button class="btn-action btn-cancel" onclick="cancelBookingAdmin('${booking._id}')">
                                <i class="fas fa-times"></i>
                            </button>
                        ` : ''}
                        <button class="btn-action btn-download" onclick="downloadBookingInvoice('${booking._id}')">
                            <i class="fas fa-download"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function renderAdminTripsTable(tripPlans) {
        return tripPlans.map(trip => `
            <tr>
                <td>
                    <strong>${trip._id}</strong>
                </td>
                <td>
                    <div class="user-cell">
                        <div class="user-avatar-small">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div>
                            <strong>${trip.userName}</strong>
                            <small>${trip.userEmail}</small>
                        </div>
                    </div>
                </td>
                <td>${trip.duration}</td>
                <td>${trip.budget}</td>
                <td>
                    <span class="badge badge-${trip.status}">
                        ${trip.status.toUpperCase()}
                    </span>
                </td>
                <td>${new Date(trip.createdAt).toLocaleDateString()}</td>
                <td>
                    <div class="table-actions">
                        <button class="btn-action btn-view" onclick="viewTripPlanAdmin('${trip._id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-edit" onclick="editTripPlanAdmin('${trip._id}')">
                            <i class="fas fa-edit"></i>
                        </button>
                        ${trip.status === 'review' ? `
                            <button class="btn-action btn-process" onclick="processTripPlan('${trip._id}')">
                                <i class="fas fa-cogs"></i>
                            </button>
                        ` : ''}
                    </div>
                </td>
            </tr>
        `).join('');
    }

    function getActivityIcon(activityType) {
        const icons = {
            'user': 'user-plus',
            'booking': 'calendar-check',
            'trip_plan': 'route'
        };
        return icons[activityType] || 'bell';
    }

    function formatTimeAgo(timestamp) {
        const now = new Date();
        const past = new Date(timestamp);
        const diff = now - past;
        
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);
        
        if (minutes < 60) return `${minutes} minutes ago`;
        if (hours < 24) return `${hours} hours ago`;
        return `${days} days ago`;
    }

    function setupAdminDashboardListeners() {
        // Admin tab switching
        document.querySelectorAll('.admin-tab-link').forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all tabs
                document.querySelectorAll('.admin-tab-link').forEach(l => l.classList.remove('active'));
                document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                const tabId = this.dataset.tab;
                document.getElementById(tabId).classList.add('active');
            });
        });
        
        // Service tabs
        document.querySelectorAll('.service-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                document.querySelectorAll('.service-tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('.service-tab-content').forEach(c => c.classList.remove('active'));
                
                this.classList.add('active');
                const service = this.dataset.service;
                document.getElementById(`${service}-management`).classList.add('active');
            });
        });
        
        // Add user button
        document.getElementById('add-user-btn')?.addEventListener('click', () => {
            showAddUserModal();
        });
        
        // Generate report button
        document.getElementById('generate-report-btn')?.addEventListener('click', () => {
            generateReport('full');
        });
        
        // Search functionality
        const searchInput = document.getElementById('admin-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                searchAdminContent(this.value);
            });
        }
        
        // Filter functionality
        document.getElementById('booking-type-filter')?.addEventListener('change', function() {
            filterAdminBookings(this.value);
        });
        
        document.getElementById('trip-status-filter')?.addEventListener('change', function() {
            filterAdminTrips(this.value);
        });
    }

    // ===============================
    // DATA LOADING FUNCTIONS
    // ===============================
    
    async function loadHomePage() {
        console.log('Loading home page...');
        // Load featured destinations
        const destinationsGrid = document.querySelector('.destinations-grid');
        if (destinationsGrid) {
            const result = await apiRequest(config.endpoints.destinations);
            const featuredDestinations = result.data?.slice(0, 3) || mockData.destinations.slice(0, 3);
            
            destinationsGrid.innerHTML = featuredDestinations.map(dest => `
                <div class="destination-card">
                    <div class="destination-image">
                        <img src="${dest.image}" alt="${dest.name}" loading="lazy">
                        <div class="destination-rating">
                            <i class="fas fa-star"></i> ${dest.rating}
                        </div>
                    </div>
                    <div class="destination-content">
                        <h3>${dest.name}</h3>
                        <div class="destination-location">
                            <i class="fas fa-map-marker-alt"></i> ${dest.location}
                        </div>
                        <p>${dest.description.substring(0, 100)}...</p>
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${dest._id}"
                                data-name="${dest.name}">
                            Book Now
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        // Load featured blog posts
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            const result = await apiRequest(config.endpoints.blog);
            const featuredBlogs = result.data?.slice(0, 3) || mockData.blog.slice(0, 3);
            
            blogGrid.innerHTML = featuredBlogs.map(blog => `
                <div class="blog-card">
                    <div class="blog-image">
                        <img src="${blog.image}" alt="${blog.title}" loading="lazy">
                        <span class="blog-category">${blog.category}</span>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">
                                <i class="far fa-calendar"></i> ${blog.date}
                            </span>
                            <span class="blog-read-time">${blog.readTime}</span>
                        </div>
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt.substring(0, 120)}...</p>
                        <a href="#" class="read-more-link" data-page="blog">Read More <i class="fas fa-arrow-right"></i></a>
                    </div>
                </div>
            `).join('');
        }
        
        // Update plan trip button
        const planTripBtn = document.querySelector('.plan-trip-btn');
        if (planTripBtn) {
            planTripBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showTripPlanModal();
            });
        }
    }

    async function loadDestinations() {
        console.log('Loading destinations...');
        const grid = document.querySelector('.destinations-grid-full');
        if (!grid) return;
        
        const result = await apiRequest(config.endpoints.destinations);
        const destinations = result.data || mockData.destinations;
        
        grid.innerHTML = destinations.map(dest => `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${dest.image}" alt="${dest.name}" loading="lazy">
                    <div class="destination-rating">
                        <i class="fas fa-star"></i> ${dest.rating}
                    </div>
                </div>
                <div class="destination-content">
                    <h3>${dest.name}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${dest.location}
                    </div>
                    <p>${dest.description}</p>
                    <div class="features">
                        ${dest.features.map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    </div>
                    <div class="price-tag">${dest.price}</div>
                    <button class="btn btn-primary book-now" 
                            data-type="destination" 
                            data-id="${dest._id}"
                            data-name="${dest.name}">
                        Book Tour
                    </button>
                </div>
            </div>
        `).join('');
    }

    async function loadGuides() {
        console.log('Loading guides...');
        const grid = document.querySelector('.guides-grid-full');
        if (!grid) return;
        
        const result = await apiRequest(config.endpoints.guides);
        const guides = result.data || mockData.guides;
        
        grid.innerHTML = guides.map(guide => `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${guide.image}" alt="${guide.name}" loading="lazy">
                </div>
                
                <div class="guide-info">
                    <h3>${guide.name}</h3>
                    
                    <p class="specialty">${guide.specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-header">
                            <i class="fas fa-language"></i>
                            <strong>Languages:</strong>
                        </div>
                        <div class="languages-list">
                            ${guide.languages.map(lang => `
                                <span class="language-tag">
                                    ${lang}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <p class="experience">
                        <i class="fas fa-briefcase"></i> ${guide.experience}
                    </p>
                    
                    <div class="rating">
                        ${'★'.repeat(Math.floor(guide.rating))}${guide.rating % 1 ? '½' : ''}
                        <span>${guide.rating}</span>
                    </div>
                    
                    <div class="price">${guide.price}</div>
                    
                    <button class="btn btn-primary book-now" 
                            data-type="guide" 
                            data-id="${guide._id}"
                            data-name="${guide.name}">
                        Hire Now
                    </button>
                </div>
            </div>
        `).join('');
    }

    async function loadTranslators() {
        console.log('Loading translators...');
        const grid = document.querySelector('.translators-grid-full');
        if (!grid) return;
        
        const result = await apiRequest(config.endpoints.translators);
        const translators = result.data || mockData.translators;
        
        grid.innerHTML = translators.map(translator => `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${translator.image}" alt="${translator.name}" loading="lazy">
                </div>
                
                <div class="guide-info">
                    <h3>${translator.name}</h3>
                    
                    <p class="specialty">${translator.specialty}</p>
                    
                    <div class="languages-section">
                        <div class="languages-header">
                            <i class="fas fa-language"></i>
                            <strong>Languages:</strong>
                        </div>
                        <div class="languages-list">
                            ${translator.languages.map(lang => `
                                <span class="language-tag">
                                    ${lang}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    
                    <p class="experience">
                        <i class="fas fa-briefcase"></i> ${translator.experience}
                    </p>
                    
                    <div class="rating">
                        ${'★'.repeat(Math.floor(translator.rating))}${translator.rating % 1 ? '½' : ''}
                        <span>${translator.rating}</span>
                    </div>
                    
                    <div class="price">${translator.price}</div>
                    
                    <button class="btn btn-primary book-now" 
                            data-type="translator" 
                            data-id="${translator._id}"
                            data-name="${translator.name}">
                        Hire Now
                    </button>
                </div>
            </div>
        `).join('');
    }

    async function loadAccommodations() {
        console.log('Loading accommodations...');
        const grid = document.querySelector('.accommodations-grid-full');
        if (!grid) return;
        
        const result = await apiRequest(config.endpoints.accommodations);
        const accommodations = result.data || mockData.accommodations;
        
        grid.innerHTML = accommodations.map(acc => `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${acc.image}" alt="${acc.name}" loading="lazy">
                </div>
                <div class="accommodation-content">
                    <span class="type">${acc.type}</span>
                    <h3>${acc.name}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${acc.location}
                    </div>
                    <p>${acc.description.substring(0, 120)}...</p>
                    <div class="features">
                        ${acc.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                    </div>
                    <div class="price-tag">${acc.price}</div>
                    <button class="btn btn-primary book-now" 
                            data-type="accommodation" 
                            data-id="${acc._id}"
                            data-name="${acc.name}">
                        Book Now
                    </button>
                </div>
            </div>
        `).join('');
    }

    async function loadBlog() {
        console.log('Loading blog...');
        const grid = document.querySelector('.blog-grid-full');
        if (!grid) return;
        
        const result = await apiRequest(config.endpoints.blog);
        const blogs = result.data || mockData.blog;
        
        grid.innerHTML = blogs.map(blog => `
            <div class="blog-card">
                <div class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}" loading="lazy">
                    <span class="blog-category">${blog.category}</span>
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="fas fa-calendar"></i> ${blog.date}
                        </span>
                        <span class="blog-read-time">${blog.readTime}</span>
                    </div>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <p class="author"><i class="fas fa-user"></i> ${blog.author}</p>
                    <a href="#" class="read-more-link">Read Full Article</a>
                </div>
            </div>
        `).join('');
    }

    // ===============================
    // UI COMPONENTS
    // ===============================
    
    function showNotification(message, type = 'info', duration = 5000) {
        // Remove existing notifications
        const existing = document.querySelectorAll('.notification-toast');
        existing.forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Auto remove
        const removeTimer = setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, duration);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            clearTimeout(removeTimer);
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }

    function updateAuthUI(isLoggedIn = false, user = null) {
        console.log('Updating auth UI:', isLoggedIn ? 'Logged in' : 'Logged out');
        const authToggle = document.getElementById('auth-toggle');
        const authDropdown = document.getElementById('auth-dropdown-menu');
        
        if (!authToggle || !authDropdown) return;
        
        if (isLoggedIn && user) {
            authToggle.innerHTML = `
                <i class="fas fa-user"></i>
                <span>${user.name.split(' ')[0]}</span>
                <i class="fas fa-chevron-down"></i>
            `;
            
            authDropdown.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar">
                        <i class="fas fa-user-circle"></i>
                    </div>
                    <div class="user-details">
                        <strong>${user.name}</strong>
                        <small>${user.email}</small>
                    </div>
                </div>
                
                <a href="#" class="auth-option" data-page="dashboard">
                    <i class="fas fa-tachometer-alt"></i> Dashboard
                </a>
                
                ${user.role === 'admin' ? `
                    <a href="#" class="auth-option" data-page="admin">
                        <i class="fas fa-crown"></i> Admin Panel
                    </a>
                ` : ''}
                
                <a href="#" class="auth-option" id="logout-btn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            `;
            
            document.getElementById('logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                logout();
            });
        } else {
            authToggle.innerHTML = `
                <i class="fas fa-user"></i>
                <span>Account</span>
                <i class="fas fa-chevron-down"></i>
            `;
            
            authDropdown.innerHTML = `
                <a href="#" class="auth-option sign-in-btn">
                    <i class="fas fa-sign-in-alt"></i> Sign In
                </a>
                
                <a href="#" class="auth-option signup-btn">
                    <i class="fas fa-user-plus"></i> Sign Up
                </a>
            `;
            
            // Add event listeners for new buttons
            const signInBtn = authDropdown.querySelector('.sign-in-btn');
            const signUpBtn = authDropdown.querySelector('.signup-btn');
            
            if (signInBtn) {
                signInBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showAuthModal('login');
                });
            }
            
            if (signUpBtn) {
                signUpBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    showAuthModal('register');
                });
            }
        }
    }

    // ===============================
    // MODAL SYSTEM
    // ===============================
    
    function showAuthModal(type = 'login') {
        console.log('Showing auth modal:', type);
        const modal = createModal();
        const isLogin = type === 'login';
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2>${isLogin ? 'Sign In' : 'Create Account'}</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="auth-form">
                    ${!isLogin ? `
                        <div class="form-group">
                            <label>Full Name *</label>
                            <input type="text" name="name" required>
                        </div>
                    ` : ''}
                    
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Password *</label>
                        <input type="password" name="password" required>
                        ${!isLogin ? '<small>Minimum 6 characters</small>' : ''}
                    </div>
                    
                    ${!isLogin ? `
                        <div class="form-group">
                            <label>Phone</label>
                            <input type="tel" name="phone">
                        </div>
                        
                        <div class="form-group">
                            <label>Country</label>
                            <input type="text" name="country">
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox">
                                <input type="checkbox" name="newsletter" checked>
                                Subscribe to newsletter
                            </label>
                        </div>
                    ` : ''}
                    
                    <button type="submit" class="btn btn-primary btn-block">
                        ${isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                    
                    <div class="auth-switch">
                        ${isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                        <a href="#" class="switch-link">${isLogin ? 'Sign Up' : 'Sign In'}</a>
                    </div>
                </form>
            </div>
        `;
        
        const form = modal.querySelector('#auth-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (isLogin) {
                await login(data.email, data.password);
                if (isAuthenticated) closeModal();
            } else {
                await register(data);
                if (isAuthenticated) closeModal();
            }
        });
        
        // Switch between login/register
        modal.querySelector('.switch-link').addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            showAuthModal(isLogin ? 'register' : 'login');
        });
    }

    function showServiceSelectionModal() {
        const modal = createModal();
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-plus-circle"></i> Book a Service</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="service-selection">
                    <h3>Select Service Type</h3>
                    <p>Choose what you'd like to book for your Rwanda adventure</p>
                    
                    <div class="service-options">
                        <div class="service-option" data-type="destination">
                            <div class="service-option-icon">
                                <i class="fas fa-map-marked-alt"></i>
                            </div>
                            <div class="service-option-content">
                                <h4>Destination</h4>
                                <p>Book tours and experiences at Rwanda's top destinations</p>
                            </div>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        
                        <div class="service-option" data-type="guide">
                            <div class="service-option-icon">
                                <i class="fas fa-user-tie"></i>
                            </div>
                            <div class="service-option-content">
                                <h4>Tour Guide</h4>
                                <p>Hire an expert local guide for your journey</p>
                            </div>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        
                        <div class="service-option" data-type="translator">
                            <div class="service-option-icon">
                                <i class="fas fa-language"></i>
                            </div>
                            <div class="service-option-content">
                                <h4>Translator</h4>
                                <p>Get language assistance from professional translators</p>
                            </div>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        
                        <div class="service-option" data-type="accommodation">
                            <div class="service-option-icon">
                                <i class="fas fa-hotel"></i>
                            </div>
                            <div class="service-option-content">
                                <h4>Accommodation</h4>
                                <p>Book hotels, lodges, and guesthouses</p>
                            </div>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                        
                        <div class="service-option" data-type="package">
                            <div class="service-option-icon">
                                <i class="fas fa-suitcase-rolling"></i>
                            </div>
                            <div class="service-option-content">
                                <h4>Complete Package</h4>
                                <p>Get a customized all-inclusive travel package</p>
                            </div>
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add click handlers for service options
        modal.querySelectorAll('.service-option').forEach(option => {
            option.addEventListener('click', () => {
                const serviceType = option.dataset.type;
                closeModal();
                
                if (serviceType === 'package') {
                    showTripPlanModal();
                } else {
                    showEnhancedBookingModal(serviceType);
                }
            });
        });
    }

    function showEnhancedBookingModal(serviceType, serviceId = null, serviceName = null) {
        const modal = createModal();
        
        // Get service details if ID is provided
        let serviceDetails = null;
        if (serviceId) {
            // Find the service in mock data
            let allServices = [];
            if (serviceType === 'guide') allServices = mockData.guides;
            else if (serviceType === 'translator') allServices = mockData.translators;
            else if (serviceType === 'accommodation') allServices = mockData.accommodations;
            else if (serviceType === 'destination') allServices = mockData.destinations;
            
            serviceDetails = allServices.find(s => s._id == serviceId);
        }
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-calendar-plus"></i> Book ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="enhanced-booking-form">
                    <input type="hidden" name="service_type" value="${serviceType}">
                    <input type="hidden" name="service_id" value="${serviceId || ''}">
                    <input type="hidden" name="service_name" value="${serviceDetails?.name || serviceName || ''}">
                    
                    ${serviceDetails ? `
                        <div class="booking-service-preview">
                            <h4>${serviceDetails.name}</h4>
                            <p><strong>Price:</strong> ${serviceDetails.price}</p>
                            ${serviceDetails.description ? `<p>${serviceDetails.description.substring(0, 100)}...</p>` : ''}
                        </div>
                    ` : ''}
                    
                    <div class="form-section">
                        <h4><i class="fas fa-user"></i> Personal Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" value="${currentUser?.name || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" value="${currentUser?.email || ''}" required>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Phone *</label>
                                <input type="tel" name="phone" value="${currentUser?.phone || ''}" required>
                            </div>
                            <div class="form-group">
                                <label>Nationality</label>
                                <input type="text" name="nationality" value="${currentUser?.country || ''}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4><i class="fas fa-calendar-alt"></i> Booking Details</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Start Date *</label>
                                <input type="date" name="date" required min="${new Date().toISOString().split('T')[0]}">
                            </div>
                            <div class="form-group">
                                <label>Duration (days) *</label>
                                <select name="duration" required>
                                    <option value="1">1 day</option>
                                    <option value="2">2 days</option>
                                    <option value="3">3 days</option>
                                    <option value="4">4 days</option>
                                    <option value="5">5 days</option>
                                    <option value="6">6 days</option>
                                    <option value="7">7 days</option>
                                    <option value="8">8+ days</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Number of Travelers *</label>
                                <div class="travelers-input">
                                    <button type="button" class="btn-counter" data-action="decrease">-</button>
                                    <input type="number" name="travelers" value="1" min="1" max="20" readonly>
                                    <button type="button" class="btn-counter" data-action="increase">+</button>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Total Amount ($)</label>
                                <input type="number" name="total_amount" placeholder="Estimated total" min="0" 
                                       value="${serviceDetails?.dailyRate ? serviceDetails.dailyRate : serviceDetails?.basePrice ? serviceDetails.basePrice : ''}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4><i class="fas fa-comment-dots"></i> Additional Information</h4>
                        <div class="form-group">
                            <label>Special Requirements</label>
                            <textarea name="notes" rows="3" placeholder="Any dietary restrictions, accessibility needs, or special requests..."></textarea>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4><i class="fas fa-file-invoice-dollar"></i> Payment Method</h4>
                        <div class="payment-options">
                            <label class="payment-option">
                                <input type="radio" name="payment_method" value="pay_now" checked>
                                <div class="payment-content">
                                    <i class="fas fa-credit-card"></i>
                                    <div>
                                        <strong>Pay Now</strong>
                                        <small>Secure online payment</small>
                                    </div>
                                </div>
                            </label>
                            <label class="payment-option">
                                <input type="radio" name="payment_method" value="pay_later">
                                <div class="payment-content">
                                    <i class="fas fa-clock"></i>
                                    <div>
                                        <strong>Pay Later</strong>
                                        <small>Pay upon arrival</small>
                                    </div>
                                </div>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary btn-lg">
                            <i class="fas fa-check-circle"></i> Confirm Booking
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeModal()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // Set default date to tomorrow
        const dateInput = modal.querySelector('input[name="date"]');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().split('T')[0];
        }
        
        // Travelers counter functionality
        modal.querySelectorAll('.btn-counter').forEach(button => {
            button.addEventListener('click', function() {
                const action = this.dataset.action;
                const input = this.parentElement.querySelector('input[name="travelers"]');
                let value = parseInt(input.value);
                
                if (action === 'increase' && value < 20) {
                    value++;
                } else if (action === 'decrease' && value > 1) {
                    value--;
                }
                
                input.value = value;
                
                // Update total amount if service has daily rate
                if (serviceDetails?.dailyRate) {
                    const duration = parseInt(modal.querySelector('select[name="duration"]').value);
                    const totalAmount = serviceDetails.dailyRate * duration * value;
                    modal.querySelector('input[name="total_amount"]').value = totalAmount;
                } else if (serviceDetails?.basePrice) {
                    const totalAmount = serviceDetails.basePrice * value;
                    modal.querySelector('input[name="total_amount"]').value = totalAmount;
                }
            });
        });
        
        // Update amount when duration changes
        const durationSelect = modal.querySelector('select[name="duration"]');
        if (durationSelect && (serviceDetails?.dailyRate || serviceDetails?.basePrice)) {
            durationSelect.addEventListener('change', function() {
                const travelers = parseInt(modal.querySelector('input[name="travelers"]').value);
                const duration = parseInt(this.value);
                
                if (serviceDetails.dailyRate) {
                    const totalAmount = serviceDetails.dailyRate * duration * travelers;
                    modal.querySelector('input[name="total_amount"]').value = totalAmount;
                } else if (serviceDetails.basePrice) {
                    const totalAmount = serviceDetails.basePrice * travelers;
                    modal.querySelector('input[name="total_amount"]').value = totalAmount;
                }
            });
        }
        
        // Form submission
        const form = modal.querySelector('#enhanced-booking-form');
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Add user ID and calculate end date
            data.userId = currentUser._id;
            data.userName = currentUser.name;
            data.userEmail = currentUser.email;
            
            const startDate = new Date(data.date);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + parseInt(data.duration));
            data.endDate = endDate.toISOString();
            
            try {
                const booking = await userManager.createBooking(data);
                
                // Show success message and generate invoice
                showNotification(`✅ Booking created successfully! Reference: ${booking._id}`, 'success');
                closeModal();
                
                // Refresh dashboard to show new booking
                setTimeout(() => {
                    if (currentUser.role === 'user') {
                        loadDashboard();
                    } else if (currentUser.role === 'admin') {
                        loadAdminDashboard();
                    }
                }, 500);
                
            } catch (error) {
                showNotification(`❌ Error creating booking: ${error.message}`, 'error');
            }
        });
    }

    function createModal() {
        // Remove existing modal
        const existing = document.getElementById('modal-container');
        if (existing) existing.remove();
        
        // Create modal container
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.innerHTML = `
            <div class="modal-overlay"></div>
            <div class="modal-content"></div>
        `;
        
        document.body.appendChild(modalContainer);
        modalContainer.style.display = 'block';
        
        // Add close handlers
        const overlay = modalContainer.querySelector('.modal-overlay');
        overlay.addEventListener('click', closeModal);
        
        // Close on Escape key
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
        
        return modalContainer.querySelector('.modal-content');
    }

    function closeModal() {
        const modal = document.getElementById('modal-container');
        if (modal) {
            modal.remove();
        }
    }

    function showTripPlanModal() {
        console.log('Showing trip plan modal');
        const modal = createModal();
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-route"></i> Plan Your Trip</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="trip-plan-form">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" value="${currentUser?.name || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value="${currentUser?.email || ''}" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Start Date *</label>
                            <input type="date" name="start_date" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Duration *</label>
                            <select name="duration" required>
                                <option value="3-5">3-5 days</option>
                                <option value="6-8">6-8 days</option>
                                <option value="9-12">9-12 days</option>
                                <option value="13+">13+ days</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Travelers *</label>
                            <input type="number" name="travelers" min="1" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Budget *</label>
                            <select name="budget" required>
                                <option value="budget">Budget ($500-$1000)</option>
                                <option value="midrange">Mid-range ($1000-$2500)</option>
                                <option value="luxury">Luxury ($2500+)</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Interests</label>
                        <div class="checkbox-group">
                            <label class="checkbox">
                                <input type="checkbox" name="interests" value="gorilla">
                                Gorilla Trekking
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="interests" value="culture">
                                Cultural Tours
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="interests" value="hiking">
                                Hiking
                            </label>
                            <label class="checkbox">
                                <input type="checkbox" name="interests" value="wildlife">
                                Wildlife Safari
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Additional Information</label>
                        <textarea name="message" rows="4" placeholder="Tell us about your dream trip..."></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">Submit Trip Plan</button>
                </form>
            </div>
        `;
        
        // Set default date
        const dateInput = modal.querySelector('input[name="start_date"]');
        if (dateInput) {
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            dateInput.value = nextMonth.toISOString().split('T')[0];
            dateInput.min = new Date().toISOString().split('T')[0];
        }
        
        // Set default travelers
        modal.querySelector('input[name="travelers"]').value = currentUser?.travelers || 2;
        
        const form = modal.querySelector('#trip-plan-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Get interests
            const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked'))
                .map(input => input.value);
            data.interests = interests;
            
            // Add user information
            data.userId = currentUser._id;
            data.userName = currentUser.name;
            data.userEmail = currentUser.email;
            data.status = 'review';
            
            try {
                const tripPlan = await userManager.createTripPlan(data);
                
                showNotification(`✅ Trip plan submitted! Our team will review it and get back to you within 24 hours. Reference: ${tripPlan._id}`, 'success');
                closeModal();
                
                // Refresh dashboard to show new trip plan
                setTimeout(() => {
                    if (currentUser.role === 'user') {
                        loadDashboard();
                    }
                }, 500);
                
            } catch (error) {
                showNotification(`❌ Error: ${error.message}`, 'error');
            }
        });
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
    }

    function showAddUserModal() {
        const modal = createModal();
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-user-plus"></i> Add New User</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="add-user-form">
                    <div class="form-section">
                        <h4>Basic Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" required>
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Password *</label>
                                <input type="password" name="password" required minlength="6">
                            </div>
                            <div class="form-group">
                                <label>Confirm Password *</label>
                                <input type="password" name="confirm_password" required minlength="6">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>Role & Permissions</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>User Role *</label>
                                <select name="role" required>
                                    <option value="user">User (Customer)</option>
                                    <option value="admin">Administrator</option>
                                    <option value="agent">Travel Agent</option>
                                    <option value="guide">Tour Guide</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select name="status">
                                    <option value="active">Active</option>
                                    <option value="inactive">Inactive</option>
                                    <option value="pending">Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>Contact Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone">
                            </div>
                            <div class="form-group">
                                <label>Country</label>
                                <input type="text" name="country">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Create User
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeModal()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        const form = modal.querySelector('#add-user-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validate passwords match
            if (data.password !== data.confirm_password) {
                showNotification('❌ Passwords do not match', 'error');
                return;
            }
            
            try {
                const newUser = userManager.registerUser(data);
                showNotification(`✅ User ${newUser.name} created successfully!`, 'success');
                closeModal();
                
                // Refresh admin dashboard
                setTimeout(() => {
                    loadAdminDashboard();
                }, 500);
                
            } catch (error) {
                showNotification(`❌ Error creating user: ${error.message}`, 'error');
            }
        });
    }

    // ===============================
    // FORM HANDLERS
    // ===============================
    
    function setupForms() {
        console.log('Setting up forms...');
        
        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = newsletterForm.querySelector('input[type="email"]').value;
                
                if (!validateEmail(email)) {
                    showNotification('Please enter a valid email', 'error');
                    return;
                }
                
                try {
                    const result = await apiRequest(config.endpoints.newsletter, {
                        method: 'POST',
                        body: JSON.stringify({ email })
                    });
                    
                    if (result.success) {
                        showNotification('✅ Subscribed to newsletter!', 'success');
                        newsletterForm.reset();
                    }
                } catch (error) {
                    showNotification('Subscription failed', 'error');
                }
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());
                
                try {
                    const result = await apiRequest(config.endpoints.contact, {
                        method: 'POST',
                        body: JSON.stringify(data)
                    });
                    
                    if (result.success) {
                        showNotification('✅ Message sent!', 'success');
                        contactForm.reset();
                    }
                } catch (error) {
                    showNotification('Failed to send message', 'error');
                }
            });
        }
        
        // Footer newsletter form
        const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
        if (footerNewsletterForm) {
            footerNewsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = footerNewsletterForm.querySelector('input[type="email"]').value;
                
                if (!validateEmail(email)) {
                    showNotification('Please enter a valid email', 'error');
                    return;
                }
                
                try {
                    const result = await apiRequest(config.endpoints.newsletter, {
                        method: 'POST',
                        body: JSON.stringify({ email })
                    });
                    
                    if (result.success) {
                        showNotification('✅ Subscribed to newsletter!', 'success');
                        footerNewsletterForm.reset();
                    }
                } catch (error) {
                    showNotification('Subscription failed', 'error');
                }
            });
        }
    }

    // ===============================
    // EVENT HANDLERS
    // ===============================
    
    function setupEventListeners() {
        console.log('Setting up event listeners...');
        
        // Main navigation links
        document.addEventListener('click', (e) => {
            // Handle navbar links
            if (e.target.matches('.nav-link[data-page]') || e.target.closest('.nav-link[data-page]')) {
                e.preventDefault();
                const link = e.target.matches('.nav-link[data-page]') ? e.target : e.target.closest('.nav-link[data-page]');
                const pageId = link.dataset.page;
                handlePageNavigation(pageId);
            }
            
            // Handle footer links
            if (e.target.matches('footer a[data-page]') || e.target.closest('footer a[data-page]')) {
                e.preventDefault();
                const link = e.target.matches('footer a[data-page]') ? e.target : e.target.closest('footer a[data-page]');
                const pageId = link.dataset.page;
                handlePageNavigation(pageId);
            }
            
            // Handle read more links
            if (e.target.matches('.read-more-link[data-page]') || e.target.closest('.read-more-link[data-page]')) {
                e.preventDefault();
                const link = e.target.matches('.read-more-link[data-page]') ? e.target : e.target.closest('.read-more-link[data-page]');
                const pageId = link.dataset.page;
                handlePageNavigation(pageId);
            }
            
            // Handle booking buttons
            if (e.target.matches('.book-now') || e.target.closest('.book-now')) {
                e.preventDefault();
                const button = e.target.matches('.book-now') ? e.target : e.target.closest('.book-now');
                const type = button.dataset.type;
                const id = button.dataset.id;
                const name = button.dataset.name;
                
                if (isAuthenticated) {
                    showEnhancedBookingModal(type, id, name);
                } else {
                    showNotification('Please login to book services', 'info');
                    showAuthModal('login');
                }
            }
            
            // Handle plan trip buttons
            if (e.target.matches('.plan-trip-btn') || e.target.closest('.plan-trip-btn')) {
                e.preventDefault();
                if (isAuthenticated) {
                    showTripPlanModal();
                } else {
                    showNotification('Please login to plan a trip', 'info');
                    showAuthModal('login');
                }
            }
            
            // Handle view all links in dashboard
            if (e.target.matches('.view-all[data-tab]') || e.target.closest('.view-all[data-tab]')) {
                e.preventDefault();
                const link = e.target.matches('.view-all[data-tab]') ? e.target : e.target.closest('.view-all[data-tab]');
                const tab = link.dataset.tab;
                
                // Switch to the specified tab
                const dashboard = document.getElementById('dashboard');
                if (dashboard) {
                    document.querySelectorAll('.dashboard-tab-link').forEach(l => l.classList.remove('active'));
                    document.querySelectorAll('.dashboard-tab-container').forEach(c => c.classList.remove('active'));
                    
                    const tabLink = document.querySelector(`.dashboard-tab-link[data-tab="${tab}"]`);
                    const tabElement = document.getElementById(`dashboard-${tab}`);
                    
                    if (tabLink) tabLink.classList.add('active');
                    if (tabElement) tabElement.classList.add('active');
                }
            }
        });
        
        // Auth dropdown
        const authToggle = document.getElementById('auth-toggle');
        const authDropdown = document.getElementById('auth-dropdown-menu');
        
        if (authToggle && authDropdown) {
            authToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                authDropdown.classList.toggle('show');
            });
            
            document.addEventListener('click', (e) => {
                if (!authToggle.contains(e.target) && !authDropdown.contains(e.target)) {
                    authDropdown.classList.remove('show');
                }
            });
        }
        
        // Mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
            });
            
            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
            
            // Close mobile menu when clicking a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.tagName === 'A') {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            });
        }
        
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            const hash = window.location.hash.replace('#', '') || 'home';
            showPage(hash, false);
        });
        
        // Handle initial hash
        if (window.location.hash) {
            const hash = window.location.hash.replace('#', '');
            if (hash) {
                setTimeout(() => {
                    showPage(hash, false);
                }, 100);
            }
        }
    }

    function handlePageNavigation(pageId) {
        console.log('Navigating to:', pageId);
        
        // Authentication checks
        if ((pageId === 'dashboard' || pageId === 'admin') && !isAuthenticated) {
            showNotification('Please login to access this page', 'warning');
            showAuthModal('login');
            return;
        }
        
        if (pageId === 'admin' && currentUser?.role !== 'admin') {
            showNotification('Admin access required', 'error');
            return;
        }
        
        showPage(pageId);
    }

    // ===============================
    // ADMIN FUNCTIONS
    // ===============================

    function viewUserDetails(userId) {
        const user = userManager.users.find(u => u._id === userId);
        if (!user) {
            showNotification('User not found', 'error');
            return;
        }
        
        const modal = createModal();
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-user-circle"></i> User Details</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="user-details">
                    <div class="user-header">
                        <div class="user-avatar-large">
                            <i class="fas fa-user-circle"></i>
                        </div>
                        <div class="user-info">
                            <h3>${user.name}</h3>
                            <p>${user.email}</p>
                            <div class="user-badges">
                                <span class="badge badge-${user.role === 'admin' ? 'danger' : 'primary'}">
                                    ${user.role.toUpperCase()}
                                </span>
                                <span class="badge badge-${user.status === 'active' ? 'success' : 'secondary'}">
                                    ${user.status.toUpperCase()}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="user-details-grid">
                        <div class="detail-item">
                            <label><i class="fas fa-phone"></i> Phone</label>
                            <p>${user.phone || 'Not provided'}</p>
                        </div>
                        <div class="detail-item">
                            <label><i class="fas fa-globe"></i> Country</label>
                            <p>${user.country || 'Not provided'}</p>
                        </div>
                        <div class="detail-item">
                            <label><i class="fas fa-calendar-plus"></i> Joined</label>
                            <p>${new Date(user.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div class="detail-item">
                            <label><i class="fas fa-sign-in-alt"></i> Last Login</label>
                            <p>${user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}</p>
                        </div>
                    </div>
                    
                    <div class="user-stats">
                        <h4><i class="fas fa-chart-bar"></i> User Statistics</h4>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-number">
                                    ${userManager.getUserBookings(user._id).length}
                                </div>
                                <div class="stat-label">Total Bookings</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number">
                                    $${userManager.getUserBookings(user._id)
                                        .filter(b => b.status === 'confirmed')
                                        .reduce((sum, b) => sum + (b.totalAmount || 0), 0)}
                                </div>
                                <div class="stat-label">Total Spent</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number">
                                    ${userManager.tripPlans.filter(t => t.userId === user._id).length}
                                </div>
                                <div class="stat-label">Trip Plans</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="user-actions">
                        <button class="btn btn-primary" onclick="editUser(${user._id})">
                            <i class="fas fa-edit"></i> Edit User
                        </button>
                        ${user.role !== 'admin' ? `
                            <button class="btn btn-danger" onclick="deleteUserConfirm(${user._id})">
                                <i class="fas fa-trash"></i> Delete User
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    function editUser(userId) {
        const user = userManager.users.find(u => u._id === userId);
        if (!user) {
            showNotification('User not found', 'error');
            return;
        }
        
        const modal = createModal();
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-edit"></i> Edit User</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="edit-user-form">
                    <input type="hidden" name="user_id" value="${user._id}">
                    
                    <div class="form-section">
                        <h4>Basic Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Full Name *</label>
                                <input type="text" name="name" value="${user.name}" required>
                            </div>
                            <div class="form-group">
                                <label>Email *</label>
                                <input type="email" name="email" value="${user.email}" required>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>Role & Status</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>User Role *</label>
                                <select name="role" required>
                                    <option value="user" ${user.role === 'user' ? 'selected' : ''}>User (Customer)</option>
                                    <option value="admin" ${user.role === 'admin' ? 'selected' : ''}>Administrator</option>
                                    <option value="agent" ${user.role === 'agent' ? 'selected' : ''}>Travel Agent</option>
                                    <option value="guide" ${user.role === 'guide' ? 'selected' : ''}>Tour Guide</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Status</label>
                                <select name="status">
                                    <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                                    <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                                    <option value="pending" ${user.status === 'pending' ? 'selected' : ''}>Pending</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>Contact Information</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Phone Number</label>
                                <input type="tel" name="phone" value="${user.phone || ''}">
                            </div>
                            <div class="form-group">
                                <label>Country</label>
                                <input type="text" name="country" value="${user.country || ''}">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h4>Change Password (Optional)</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>New Password</label>
                                <input type="password" name="new_password" minlength="6">
                            </div>
                            <div class="form-group">
                                <label>Confirm Password</label>
                                <input type="password" name="confirm_password" minlength="6">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Save Changes
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeModal()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        const form = modal.querySelector('#edit-user-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            // Validate passwords if provided
            if (data.new_password && data.new_password !== data.confirm_password) {
                showNotification('❌ Passwords do not match', 'error');
                return;
            }
            
            // Prepare update data
            const updateData = {
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status,
                phone: data.phone,
                country: data.country
            };
            
            // Add password if changed
            if (data.new_password) {
                updateData.password = data.new_password;
            }
            
            try {
                const updatedUser = userManager.updateUser(parseInt(data.user_id), updateData);
                showNotification(`✅ User ${updatedUser.name} updated successfully!`, 'success');
                closeModal();
                
                // Refresh admin dashboard
                setTimeout(() => {
                    loadAdminDashboard();
                }, 500);
                
            } catch (error) {
                showNotification(`❌ Error updating user: ${error.message}`, 'error');
            }
        });
    }

    function deleteUserConfirm(userId) {
        if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            return;
        }
        
        try {
            const user = userManager.users.find(u => u._id === userId);
            if (!user) {
                showNotification('User not found', 'error');
                return;
            }
            
            if (user.role === 'admin') {
                showNotification('Cannot delete admin users', 'error');
                return;
            }
            
            const success = userManager.deleteUser(userId);
            if (success) {
                showNotification('✅ User deleted successfully!', 'success');
                closeModal();
                
                // Refresh admin dashboard
                setTimeout(() => {
                    loadAdminDashboard();
                }, 500);
            }
        } catch (error) {
            showNotification(`❌ Error deleting user: ${error.message}`, 'error');
        }
    }

    function confirmBooking(bookingId) {
        try {
            const booking = userManager.confirmBooking(bookingId);
            showNotification(`✅ Booking ${bookingId} confirmed!`, 'success');
            
            // Refresh admin dashboard
            setTimeout(() => {
                loadAdminDashboard();
            }, 500);
        } catch (error) {
            showNotification(`❌ Error confirming booking: ${error.message}`, 'error');
        }
    }

    function viewBookingDetails(bookingId) {
        const booking = userManager.bookings.find(b => b._id === bookingId);
        if (!booking) {
            showNotification('Booking not found', 'error');
            return;
        }
        
        const modal = createModal();
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-calendar-check"></i> Booking Details</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="booking-details">
                    <div class="booking-header">
                        <div class="booking-id">
                            <h3>${booking._id}</h3>
                            <span class="badge badge-${booking.status}">${booking.status.toUpperCase()}</span>
                        </div>
                        <div class="booking-date">
                            <small>Created: ${new Date(booking.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                    
                    <div class="booking-info-grid">
                        <div class="info-section">
                            <h4><i class="fas fa-info-circle"></i> Service Details</h4>
                            <div class="info-item">
                                <label>Service Type</label>
                                <p>${booking.serviceType}</p>
                            </div>
                            <div class="info-item">
                                <label>Service Name</label>
                                <p>${booking.serviceName}</p>
                            </div>
                            <div class="info-item">
                                <label>Service ID</label>
                                <p>${booking.serviceId || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h4><i class="fas fa-user"></i> Customer Details</h4>
                            <div class="info-item">
                                <label>Customer Name</label>
                                <p>${booking.userName}</p>
                            </div>
                            <div class="info-item">
                                <label>Email</label>
                                <p>${booking.userEmail}</p>
                            </div>
                            <div class="info-item">
                                <label>Phone</label>
                                <p>${booking.phone || 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h4><i class="fas fa-calendar-alt"></i> Booking Dates</h4>
                            <div class="info-item">
                                <label>Start Date</label>
                                <p>${new Date(booking.date).toLocaleDateString()}</p>
                            </div>
                            <div class="info-item">
                                <label>Duration</label>
                                <p>${booking.duration || 1} days</p>
                            </div>
                            <div class="info-item">
                                <label>End Date</label>
                                <p>${booking.endDate ? new Date(booking.endDate).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h4><i class="fas fa-file-invoice-dollar"></i> Payment Details</h4>
                            <div class="info-item">
                                <label>Total Amount</label>
                                <p class="amount">$${booking.totalAmount || '0'}</p>
                            </div>
                            <div class="info-item">
                                <label>Payment Method</label>
                                <p>${booking.payment_method || 'Not specified'}</p>
                            </div>
                            <div class="info-item">
                                <label>Travelers</label>
                                <p>${booking.travelers || 1} person(s)</p>
                            </div>
                        </div>
                    </div>
                    
                    ${booking.notes ? `
                        <div class="info-section">
                            <h4><i class="fas fa-comment"></i> Special Requirements</h4>
                            <div class="notes-container">
                                <p>${booking.notes}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="booking-actions">
                        <button class="btn btn-primary" onclick="downloadBookingInvoice('${booking._id}')">
                            <i class="fas fa-download"></i> Download Invoice
                        </button>
                        ${currentUser?.role === 'admin' && booking.status === 'pending' ? `
                            <button class="btn btn-success" onclick="confirmBooking('${booking._id}')">
                                <i class="fas fa-check"></i> Confirm Booking
                            </button>
                            <button class="btn btn-danger" onclick="cancelBookingAdmin('${booking._id}')">
                                <i class="fas fa-times"></i> Cancel Booking
                            </button>
                        ` : ''}
                        ${currentUser?.role === 'user' && booking.status === 'pending' ? `
                            <button class="btn btn-danger" onclick="cancelBooking('${booking._id}')">
                                <i class="fas fa-times"></i> Cancel Booking
                            </button>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    function downloadBookingInvoice(bookingId) {
        const booking = userManager.bookings.find(b => b._id === bookingId);
        if (!booking) {
            showNotification('Booking not found', 'error');
            return;
        }
        
        // Create invoice HTML
        const invoiceHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice ${booking._id}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .invoice-header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                    .invoice-details { margin: 20px 0; }
                    .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    .invoice-total { text-align: right; margin-top: 20px; }
                    .footer { margin-top: 50px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="invoice-header">
                    <h1>GO TRIP RWANDA</h1>
                    <h2>INVOICE</h2>
                    <p><strong>Invoice #:</strong> ${booking._id}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="invoice-details">
                    <h3>Bill To:</h3>
                    <p>${booking.userName}<br>
                    ${booking.userEmail}<br>
                    ${booking.phone || ''}</p>
                </div>
                
                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Travelers</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${booking.serviceName} (${booking.serviceType})</td>
                            <td>${new Date(booking.date).toLocaleDateString()}</td>
                            <td>${booking.travelers || 1}</td>
                            <td>$${booking.totalAmount || '0'}</td>
                        </tr>
                    </tbody>
                </table>
                
                <div class="invoice-total">
                    <h3>Total Amount: $${booking.totalAmount || '0'}</h3>
                </div>
                
                <div class="footer">
                    <p>Thank you for choosing Go Trip!</p>
                    <p>For any queries, contact: info@gotrip.africa | +250 787 407 051</p>
                </div>
            </body>
            </html>
        `;
        
        // Create and download the invoice
        const blob = new Blob([invoiceHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `invoice-${booking._id}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('✅ Invoice downloaded successfully!', 'success');
    }

    function cancelBooking(bookingId) {
        if (!confirm('Are you sure you want to cancel this booking?')) return;
        
        try {
            const booking = userManager.cancelBooking(bookingId);
            showNotification('✅ Booking cancelled successfully!', 'success');
            
            // Refresh dashboard
            setTimeout(() => {
                loadDashboard();
            }, 500);
        } catch (error) {
            showNotification('❌ Error cancelling booking', 'error');
        }
    }

    function cancelBookingAdmin(bookingId) {
        if (!confirm('Are you sure you want to cancel this booking?')) {
            return;
        }
        
        try {
            const booking = userManager.cancelBooking(bookingId);
            showNotification(`✅ Booking ${bookingId} cancelled!`, 'success');
            
            // Refresh dashboard
            setTimeout(() => {
                if (currentUser?.role === 'admin') {
                    loadAdminDashboard();
                } else {
                    loadDashboard();
                }
            }, 500);
        } catch (error) {
            showNotification(`❌ Error cancelling booking: ${error.message}`, 'error');
        }
    }

    function viewTripPlanAdmin(tripId) {
        const trip = userManager.tripPlans.find(t => t._id === tripId);
        if (!trip) {
            showNotification('Trip plan not found', 'error');
            return;
        }
        
        const modal = createModal();
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-route"></i> Trip Plan Details</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="trip-plan-details-admin">
                    <div class="trip-header">
                        <div class="trip-id">
                            <h3>${trip._id}</h3>
                            <span class="badge badge-${trip.status}">${trip.status.toUpperCase()}</span>
                        </div>
                        <div class="trip-date">
                            <small>Requested: ${new Date(trip.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                    
                    <div class="trip-info-grid">
                        <div class="info-section">
                            <h4><i class="fas fa-user"></i> Customer Information</h4>
                            <div class="info-item">
                                <label>Name</label>
                                <p>${trip.userName}</p>
                            </div>
                            <div class="info-item">
                                <label>Email</label>
                                <p>${trip.userEmail}</p>
                            </div>
                            <div class="info-item">
                                <label>Travelers</label>
                                <p>${trip.travelers} people</p>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h4><i class="fas fa-calendar-alt"></i> Trip Details</h4>
                            <div class="info-item">
                                <label>Start Date</label>
                                <p>${new Date(trip.startDate).toLocaleDateString()}</p>
                            </div>
                            <div class="info-item">
                                <label>Duration</label>
                                <p>${trip.duration}</p>
                            </div>
                            <div class="info-item">
                                <label>Budget</label>
                                <p>${trip.budget}</p>
                            </div>
                        </div>
                    </div>
                    
                    ${trip.interests && trip.interests.length > 0 ? `
                        <div class="info-section">
                            <h4><i class="fas fa-heart"></i> Interests</h4>
                            <div class="interests-container">
                                ${trip.interests.map(interest => `
                                    <span class="interest-tag">${interest}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${trip.message ? `
                        <div class="info-section">
                            <h4><i class="fas fa-comment"></i> Customer Message</h4>
                            <div class="message-container">
                                <p>${trip.message}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="trip-actions-admin">
                        ${trip.status === 'review' ? `
                            <button class="btn btn-success" onclick="processTripPlan('${trip._id}')">
                                <i class="fas fa-cogs"></i> Process Trip Plan
                            </button>
                        ` : ''}
                        <button class="btn btn-outline" onclick="downloadTripPlan('${trip._id}')">
                            <i class="fas fa-download"></i> Export
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    function processTripPlan(tripId) {
        const trip = userManager.updateTripPlan(tripId, { 
            status: 'processing',
            assignedTo: currentUser.name,
            assignedAt: new Date().toISOString()
        });
        
        showNotification(`✅ Trip plan ${tripId} is now being processed!`, 'success');
        closeModal();
        
        // Refresh admin dashboard
        setTimeout(() => {
            loadAdminDashboard();
        }, 500);
    }

    function viewTripPlan(tripId) {
        const trip = userManager.tripPlans.find(t => t._id === tripId);
        if (!trip) {
            showNotification('Trip plan not found', 'error');
            return;
        }
        
        const modal = createModal();
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-route"></i> Trip Plan Details</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="trip-plan-details-admin">
                    <div class="trip-header">
                        <div class="trip-id">
                            <h3>${trip._id}</h3>
                            <span class="badge badge-${trip.status}">${trip.status.toUpperCase()}</span>
                        </div>
                        <div class="trip-date">
                            <small>Requested: ${new Date(trip.createdAt).toLocaleDateString()}</small>
                        </div>
                    </div>
                    
                    <div class="trip-info-grid">
                        <div class="info-section">
                            <h4><i class="fas fa-user"></i> Your Information</h4>
                            <div class="info-item">
                                <label>Name</label>
                                <p>${trip.userName}</p>
                            </div>
                            <div class="info-item">
                                <label>Email</label>
                                <p>${trip.userEmail}</p>
                            </div>
                            <div class="info-item">
                                <label>Travelers</label>
                                <p>${trip.travelers} people</p>
                            </div>
                        </div>
                        
                        <div class="info-section">
                            <h4><i class="fas fa-calendar-alt"></i> Trip Details</h4>
                            <div class="info-item">
                                <label>Start Date</label>
                                <p>${new Date(trip.startDate).toLocaleDateString()}</p>
                            </div>
                            <div class="info-item">
                                <label>Duration</label>
                                <p>${trip.duration}</p>
                            </div>
                            <div class="info-item">
                                <label>Budget</label>
                                <p>${trip.budget}</p>
                            </div>
                        </div>
                    </div>
                    
                    ${trip.interests && trip.interests.length > 0 ? `
                        <div class="info-section">
                            <h4><i class="fas fa-heart"></i> Your Interests</h4>
                            <div class="interests-container">
                                ${trip.interests.map(interest => `
                                    <span class="interest-tag">${interest}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${trip.message ? `
                        <div class="info-section">
                            <h4><i class="fas fa-comment"></i> Your Message</h4>
                            <div class="message-container">
                                <p>${trip.message}</p>
                            </div>
                        </div>
                    ` : ''}
                    
                    ${trip.assignedTo ? `
                        <div class="info-section">
                            <h4><i class="fas fa-user-tie"></i> Assigned To</h4>
                            <div class="assigned-info">
                                <p><strong>${trip.assignedTo}</strong></p>
                                <small>Assigned on: ${new Date(trip.assignedAt).toLocaleDateString()}</small>
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="trip-status-info">
                        <div class="status-message">
                            ${trip.status === 'review' ? `
                                <i class="fas fa-clock text-warning"></i>
                                <div>
                                    <h5>Under Review</h5>
                                    <p>Our team is reviewing your trip plan. We'll contact you within 24 hours.</p>
                                </div>
                            ` : trip.status === 'processing' ? `
                                <i class="fas fa-cogs text-info"></i>
                                <div>
                                    <h5>Processing</h5>
                                    <p>Our travel experts are creating your customized itinerary.</p>
                                </div>
                            ` : trip.status === 'completed' ? `
                                <i class="fas fa-check-circle text-success"></i>
                                <div>
                                    <h5>Completed</h5>
                                    <p>Your trip plan is ready! Check your email for the complete itinerary.</p>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function editTripPlan(tripId) {
        const trip = userManager.tripPlans.find(t => t._id === tripId);
        if (!trip) {
            showNotification('Trip plan not found', 'error');
            return;
        }
        
        showTripPlanModal();
    }

    function cancelTripPlan(tripId) {
        if (!confirm('Are you sure you want to cancel this trip plan?')) return;
        
        try {
            const trip = userManager.updateTripPlan(tripId, { status: 'cancelled' });
            showNotification('✅ Trip plan cancelled successfully!', 'success');
            
            // Refresh dashboard
            setTimeout(() => {
                loadDashboard();
            }, 500);
        } catch (error) {
            showNotification('❌ Error cancelling trip plan', 'error');
        }
    }

    function downloadItinerary(tripId) {
        const trip = userManager.tripPlans.find(t => t._id === tripId);
        if (!trip || !trip.itinerary) {
            showNotification('Itinerary not available yet', 'warning');
            return;
        }
        
        // Create itinerary HTML
        const itineraryHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Itinerary ${trip._id}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                    .day-section { margin: 30px 0; border-left: 4px solid #4CAF50; padding-left: 20px; }
                    .activity { margin: 15px 0; padding: 10px; background: #f5f5f5; border-radius: 5px; }
                    .footer { margin-top: 50px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>GO TRIP RWANDA</h1>
                    <h2>TRIP ITINERARY</h2>
                    <p><strong>Trip ID:</strong> ${trip._id}</p>
                    <p><strong>Customer:</strong> ${trip.userName}</p>
                    <p><strong>Duration:</strong> ${trip.duration}</p>
                    <p><strong>Budget:</strong> ${trip.budget}</p>
                </div>
                
                ${trip.itinerary.days ? trip.itinerary.days.map(day => `
                    <div class="day-section">
                        <h3>Day ${day.day}: ${day.title}</h3>
                        ${day.activities ? day.activities.map(activity => `
                            <div class="activity">
                                <h4>${activity.time}</h4>
                                <p><strong>${activity.description}</strong></p>
                                ${activity.location ? `<p><i>Location:</i> ${activity.location}</p>` : ''}
                            </div>
                        `).join('') : ''}
                    </div>
                `).join('') : ''}
                
                ${trip.itinerary.total_cost ? `
                    <div class="cost-summary">
                        <h3>Cost Summary</h3>
                        <p><strong>Total Cost:</strong> $${trip.itinerary.total_cost.total || 'N/A'}</p>
                    </div>
                ` : ''}
                
                <div class="footer">
                    <p>Thank you for choosing Go Trip!</p>
                    <p>For any queries, contact: info@gotrip.africa | +250 787 407 051</p>
                </div>
            </body>
            </html>
        `;
        
        // Create and download the itinerary
        const blob = new Blob([itineraryHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `itinerary-${trip._id}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('✅ Itinerary downloaded successfully!', 'success');
    }

    function generateReport(type) {
        let reportData;
        let reportTitle;
        
        switch(type) {
            case 'revenue':
                reportData = userManager.getMonthlyRevenue();
                reportTitle = 'Monthly Revenue Report';
                break;
            case 'users':
                reportData = {
                    total: userManager.users.length,
                    byRole: userManager.users.reduce((acc, user) => {
                        acc[user.role] = (acc[user.role] || 0) + 1;
                        return acc;
                    }, {}),
                    active: userManager.users.filter(u => u.status === 'active').length
                };
                reportTitle = 'User Statistics Report';
                break;
            case 'bookings':
                reportData = {
                    total: userManager.bookings.length,
                    byStatus: userManager.bookings.reduce((acc, booking) => {
                        acc[booking.status] = (acc[booking.status] || 0) + 1;
                        return acc;
                    }, {}),
                    byType: userManager.bookings.reduce((acc, booking) => {
                        acc[booking.serviceType] = (acc[booking.serviceType] || 0) + 1;
                        return acc;
                    }, {})
                };
                reportTitle = 'Bookings Analysis Report';
                break;
            case 'full':
                reportData = {
                    stats: userManager.getStats(),
                    monthlyRevenue: userManager.getMonthlyRevenue(),
                    recentActivity: userManager.getRecentActivity(),
                    topUsers: userManager.users.slice(0, 5),
                    topBookings: userManager.bookings.slice(0, 5)
                };
                reportTitle = 'Comprehensive System Report';
                break;
            default:
                reportData = {};
                reportTitle = 'Custom Report';
        }
        
        // Create report HTML
        const reportHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>${reportTitle} - Go Trip</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; }
                    .report-header { border-bottom: 2px solid #333; padding-bottom: 20px; margin-bottom: 30px; }
                    .report-section { margin: 30px 0; }
                    .report-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
                    .report-table th, .report-table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; }
                    .stat-card { background: #f8f9fa; padding: 20px; border-radius: 5px; text-align: center; }
                    .footer { margin-top: 50px; font-size: 12px; color: #666; }
                </style>
            </head>
            <body>
                <div class="report-header">
                    <h1>GO TRIP</h1>
                    <h2>${reportTitle}</h2>
                    <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
                    <p><strong>Generated by:</strong> ${currentUser?.name || 'System'}</p>
                </div>
                
                ${renderReportContent(type, reportData)}
                
                <div class="footer">
                    <p>This report was generated automatically by the Go Trip system.</p>
                    <p>© ${new Date().getFullYear()} Go Trip. All rights reserved.</p>
                </div>
            </body>
            </html>
        `;
        
        // Download the report
        const blob = new Blob([reportHTML], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `report-${type}-${Date.now()}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification(`✅ ${reportTitle} downloaded successfully!`, 'success');
    }

    function renderReportContent(type, data) {
        switch(type) {
            case 'revenue':
                return `
                    <div class="report-section">
                        <h3>Revenue Overview</h3>
                        <table class="report-table">
                            <thead>
                                <tr>
                                    <th>Month</th>
                                    <th>Revenue</th>
                                    <th>Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.map((item, index) => `
                                    <tr>
                                        <td>${item.month}</td>
                                        <td>$${item.revenue.toLocaleString()}</td>
                                        <td>${index > 0 ? 
                                            (((item.revenue - data[index-1].revenue) / data[index-1].revenue * 100).toFixed(1) + '%') : 
                                            'N/A'}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                
            case 'users':
                return `
                    <div class="report-section">
                        <h3>User Statistics</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <h4>Total Users</h4>
                                <p class="stat-number">${data.total}</p>
                            </div>
                            <div class="stat-card">
                                <h4>Active Users</h4>
                                <p class="stat-number">${data.active}</p>
                            </div>
                            <div class="stat-card">
                                <h4>Inactive Users</h4>
                                <p class="stat-number">${data.total - data.active}</p>
                            </div>
                        </div>
                        
                        <h4>Users by Role</h4>
                        <table class="report-table">
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Count</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Object.entries(data.byRole).map(([role, count]) => `
                                    <tr>
                                        <td>${role}</td>
                                        <td>${count}</td>
                                        <td>${((count / data.total) * 100).toFixed(1)}%</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                
            case 'bookings':
                return `
                    <div class="report-section">
                        <h3>Booking Statistics</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <h4>Total Bookings</h4>
                                <p class="stat-number">${data.total}</p>
                            </div>
                        </div>
                        
                        <h4>Bookings by Status</h4>
                        <table class="report-table">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Count</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Object.entries(data.byStatus).map(([status, count]) => `
                                    <tr>
                                        <td>${status}</td>
                                        <td>${count}</td>
                                        <td>${((count / data.total) * 100).toFixed(1)}%</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        
                        <h4>Bookings by Service Type</h4>
                        <table class="report-table">
                            <thead>
                                <tr>
                                    <th>Service Type</th>
                                    <th>Count</th>
                                    <th>Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${Object.entries(data.byType).map(([type, count]) => `
                                    <tr>
                                        <td>${type}</td>
                                        <td>${count}</td>
                                        <td>${((count / data.total) * 100).toFixed(1)}%</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                
            case 'full':
                return `
                    <div class="report-section">
                        <h3>System Overview</h3>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <h4>Total Users</h4>
                                <p class="stat-number">${data.stats.totalUsers}</p>
                            </div>
                            <div class="stat-card">
                                <h4>Total Bookings</h4>
                                <p class="stat-number">${data.stats.totalBookings}</p>
                            </div>
                            <div class="stat-card">
                                <h4>Total Revenue</h4>
                                <p class="stat-number">$${data.stats.totalRevenue.toLocaleString()}</p>
                            </div>
                            <div class="stat-card">
                                <h4>Active Bookings</h4>
                                <p class="stat-number">${data.stats.activeBookings}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="report-section">
                        <h3>Recent Activity</h3>
                        <table class="report-table">
                            <thead>
                                <tr>
                                    <th>Type</th>
                                    <th>User</th>
                                    <th>Action</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.recentActivity.slice(0, 10).map(activity => `
                                    <tr>
                                        <td>${activity.type}</td>
                                        <td>${activity.name}</td>
                                        <td>${activity.action}</td>
                                        <td>${formatTimeAgo(activity.timestamp)}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="report-section">
                        <h3>Top Users by Activity</h3>
                        <table class="report-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Joined</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${data.topUsers.map(user => `
                                    <tr>
                                        <td>${user.name}</td>
                                        <td>${user.role}</td>
                                        <td>${user.status}</td>
                                        <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `;
                
            default:
                return '<p>No data available for this report type.</p>';
        }
    }

    function showCustomReportModal() {
        const modal = createModal();
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-chart-pie"></i> Custom Report</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="custom-report-form">
                    <div class="form-section">
                        <h4>Report Parameters</h4>
                        <div class="form-row">
                            <div class="form-group">
                                <label>Report Type</label>
                                <select name="report_type" required>
                                    <option value="custom_booking">Booking Analysis</option>
                                    <option value="custom_user">User Analysis</option>
                                    <option value="custom_revenue">Revenue Analysis</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Date Range</label>
                                <select name="date_range" required>
                                    <option value="last_week">Last Week</option>
                                    <option value="last_month">Last Month</option>
                                    <option value="last_quarter">Last Quarter</option>
                                    <option value="last_year">Last Year</option>
                                    <option value="all_time">All Time</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Include Charts</label>
                            <div class="checkbox-group">
                                <label class="checkbox">
                                    <input type="checkbox" name="include_charts" checked>
                                    Include Charts
                                </label>
                                <label class="checkbox">
                                    <input type="checkbox" name="include_tables" checked>
                                    Include Detailed Tables
                                </label>
                                <label class="checkbox">
                                    <input type="checkbox" name="include_summary">
                                    Include Executive Summary
                                </label>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-file-export"></i> Generate Report
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeModal()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        const form = modal.querySelector('#custom-report-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            showNotification('✅ Custom report generated!', 'success');
            closeModal();
            generateReport('full');
        });
    }

    function showChangePasswordModal() {
        const modal = createModal();
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-key"></i> Change Password</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="change-password-form">
                    <div class="form-group">
                        <label>Current Password</label>
                        <input type="password" name="current_password" required>
                    </div>
                    
                    <div class="form-group">
                        <label>New Password</label>
                        <input type="password" name="new_password" required minlength="6">
                    </div>
                    
                    <div class="form-group">
                        <label>Confirm New Password</label>
                        <input type="password" name="confirm_password" required minlength="6">
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-save"></i> Change Password
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeModal()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        const form = modal.querySelector('#change-password-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            if (data.new_password !== data.confirm_password) {
                showNotification('❌ New passwords do not match', 'error');
                return;
            }
            
            // In a real app, you would verify current password first
            // For demo, we'll just update it
            try {
                const updatedUser = userManager.updateUser(currentUser._id, { password: data.new_password });
                showNotification('✅ Password changed successfully!', 'success');
                closeModal();
            } catch (error) {
                showNotification('❌ Error changing password', 'error');
            }
        });
    }

    function showUploadDocumentModal() {
        const modal = createModal();
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-upload"></i> Upload Document</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="upload-document-form">
                    <div class="form-group">
                        <label>Document Type</label>
                        <select name="document_type" required>
                            <option value="">Select Document Type</option>
                            <option value="passport">Passport</option>
                            <option value="visa">Visa</option>
                            <option value="flight_tickets">Flight Tickets</option>
                            <option value="insurance">Travel Insurance</option>
                            <option value="medical">Medical Certificate</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Document Name</label>
                        <input type="text" name="document_name" placeholder="e.g., Passport Copy" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Expiry Date (if applicable)</label>
                        <input type="date" name="expiry_date">
                    </div>
                    
                    <div class="form-group">
                        <label>Upload File</label>
                        <div class="file-upload">
                            <input type="file" name="document_file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" required>
                            <div class="file-upload-label">
                                <i class="fas fa-cloud-upload-alt"></i>
                                <span>Click to upload or drag and drop</span>
                                <small>PDF, JPG, PNG, DOC up to 10MB</small>
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea name="notes" rows="3" placeholder="Any additional notes about this document..."></textarea>
                    </div>
                    
                    <div class="form-actions">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-upload"></i> Upload Document
                        </button>
                        <button type="button" class="btn btn-outline" onclick="closeModal()">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        `;
        
        // File upload styling
        const fileInput = modal.querySelector('input[type="file"]');
        const fileLabel = modal.querySelector('.file-upload-label');
        
        fileInput.addEventListener('change', function() {
            if (this.files.length > 0) {
                fileLabel.innerHTML = `
                    <i class="fas fa-file"></i>
                    <span>${this.files[0].name}</span>
                    <small>${(this.files[0].size / 1024 / 1024).toFixed(2)} MB</small>
                `;
            }
        });
        
        // Form submission
        const form = modal.querySelector('#upload-document-form');
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // In a real app, you would upload the file to a server
            // For demo, we'll just show a success message
            showNotification('✅ Document uploaded successfully!', 'success');
            closeModal();
        });
    }

    function filterBookings(status) {
        const bookings = userManager.getUserBookings(currentUser._id);
        const filteredBookings = status ? 
            bookings.filter(b => b.status === status) : 
            bookings;
        
        const tableBody = document.getElementById('dashboard-bookings-list');
        if (tableBody) {
            tableBody.innerHTML = renderBookingsTable(filteredBookings);
        }
    }

    function filterAdminBookings(type) {
        const filteredBookings = type ? 
            userManager.bookings.filter(b => b.serviceType === type) : 
            userManager.bookings;
        
        const tableBody = document.getElementById('bookings-table-body');
        if (tableBody) {
            tableBody.innerHTML = renderAdminBookingsTable(filteredBookings);
        }
    }

    function filterAdminTrips(status) {
        const filteredTrips = status ? 
            userManager.tripPlans.filter(t => t.status === status) : 
            userManager.tripPlans;
        
        const tableBody = document.getElementById('trips-table-body');
        if (tableBody) {
            tableBody.innerHTML = renderAdminTripsTable(filteredTrips);
        }
    }

    function searchAdminContent(query) {
        if (!query.trim()) {
            // Reset all tables to show all data
            const usersTable = document.getElementById('users-table-body');
            const bookingsTable = document.getElementById('bookings-table-body');
            const tripsTable = document.getElementById('trips-table-body');
            
            if (usersTable) usersTable.innerHTML = renderUsersTable(userManager.users);
            if (bookingsTable) bookingsTable.innerHTML = renderAdminBookingsTable(userManager.bookings);
            if (tripsTable) tripsTable.innerHTML = renderAdminTripsTable(userManager.tripPlans);
            return;
        }
        
        const lowerQuery = query.toLowerCase();
        
        // Search users
        const filteredUsers = userManager.users.filter(user => 
            user.name.toLowerCase().includes(lowerQuery) ||
            user.email.toLowerCase().includes(lowerQuery) ||
            user.role.toLowerCase().includes(lowerQuery) ||
            user.country?.toLowerCase().includes(lowerQuery)
        );
        const usersTable = document.getElementById('users-table-body');
        if (usersTable) usersTable.innerHTML = renderUsersTable(filteredUsers);
        
        // Search bookings
        const filteredBookings = userManager.bookings.filter(booking => 
            booking._id.toLowerCase().includes(lowerQuery) ||
            booking.userName.toLowerCase().includes(lowerQuery) ||
            booking.userEmail.toLowerCase().includes(lowerQuery) ||
            booking.serviceName.toLowerCase().includes(lowerQuery) ||
            booking.serviceType.toLowerCase().includes(lowerQuery)
        );
        const bookingsTable = document.getElementById('bookings-table-body');
        if (bookingsTable) bookingsTable.innerHTML = renderAdminBookingsTable(filteredBookings);
        
        // Search trip plans
        const filteredTrips = userManager.tripPlans.filter(trip => 
            trip._id.toLowerCase().includes(lowerQuery) ||
            trip.userName.toLowerCase().includes(lowerQuery) ||
            trip.userEmail.toLowerCase().includes(lowerQuery) ||
            trip.duration.toLowerCase().includes(lowerQuery) ||
            trip.budget.toLowerCase().includes(lowerQuery)
        );
        const tripsTable = document.getElementById('trips-table-body');
        if (tripsTable) tripsTable.innerHTML = renderAdminTripsTable(filteredTrips);
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function init() {
        console.log('Initializing Go Trip System...');
        
        // Hide loading overlay immediately
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
        
        // Set current year in footer
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Check authentication
        await checkAuth();
        
        // Setup event listeners
        setupEventListeners();
        setupForms();
        
        // Load initial page
        const initialPage = window.location.hash ? window.location.hash.replace('#', '') : 'home';
        showPage(initialPage, false);
        
        // Show welcome notification
        setTimeout(() => {
            if (currentUser) {
                showNotification(`Welcome back, ${currentUser.name}!`, 'info');
            } else {
                showNotification('Welcome to Go Trip!', 'info');
            }
        }, 1000);
        
        console.log('Go Trip System initialized successfully');
    }

    // ===============================
    // EXPORT TO GLOBAL SCOPE
    // ===============================
    
    // Make functions globally available
    window.showPage = showPage;
    window.closeModal = closeModal;
    window.showAuthModal = showAuthModal;
    window.showNotification = showNotification;
    window.logout = logout;
    window.apiRequest = apiRequest;
    window.config = config;
    window.currentUser = () => currentUser;
    window.isAuthenticated = () => isAuthenticated;
    window.showServiceSelectionModal = showServiceSelectionModal;
    window.showEnhancedBookingModal = showEnhancedBookingModal;
    window.showTripPlanModal = showTripPlanModal;
    window.showAddUserModal = showAddUserModal;
    window.viewUserDetails = viewUserDetails;
    window.editUser = editUser;
    window.deleteUserConfirm = deleteUserConfirm;
    window.confirmBooking = confirmBooking;
    window.viewBookingDetails = viewBookingDetails;
    window.downloadBookingInvoice = downloadBookingInvoice;
    window.cancelBooking = cancelBooking;
    window.cancelBookingAdmin = cancelBookingAdmin;
    window.viewTripPlan = viewTripPlan;
    window.viewTripPlanAdmin = viewTripPlanAdmin;
    window.processTripPlan = processTripPlan;
    window.editTripPlan = editTripPlan;
    window.cancelTripPlan = cancelTripPlan;
    window.downloadItinerary = downloadItinerary;
    window.generateReport = generateReport;
    window.showCustomReportModal = showCustomReportModal;
    window.showChangePasswordModal = showChangePasswordModal;
    window.showUploadDocumentModal = showUploadDocumentModal;
    window.userManager = userManager;

    // Initialize when DOM is ready
    domReady(() => {
        setTimeout(init, 100);
    });
})();