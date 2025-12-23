// Go Trip - Professional Edition (Fixed Navigation)
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        baseUrl: 'http://localhost:3000/api',
        debug: true,
        useMockMode: true,
        
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
            blog: '/blog'
        }
    };

    // ===============================
    // MOCK DATA
    // ===============================
    const mockData = {
        guides: [
            { 
                _id: 1, 
                name: "Jean Claude N.", 
                specialty: "Gorilla Trekking Expert", 
                languages: ["English", "French", "Kinyarwanda", "Swahili"],
                experience: "8 years experience",
                rating: 4.9,
                price: "$180/day",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                certifications: ["RDB Certified", "Wildlife First Aid", "CPR Certified"],
                languageCount: 4,
                experienceYears: 8,
                available: true
            },
            { 
                _id: 2, 
                name: "Marie Aimee K.", 
                specialty: "Cultural Tour Guide", 
                languages: ["English", "Swahili", "Kinyarwanda", "French"],
                experience: "6 years experience",
                rating: 4.8,
                price: "$160/day",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                certifications: ["Cultural Heritage", "Anthropology Degree", "RDB Certified"],
                languageCount: 4,
                experienceYears: 6,
                available: true
            },
            { 
                _id: 3, 
                name: "David M.", 
                specialty: "Bird Watching Specialist", 
                languages: ["English", "German", "Kinyarwanda", "French"],
                experience: "10 years experience",
                rating: 4.9,
                price: "$200/day",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                certifications: ["Ornithology Certified", "RDB Guide", "Photography Expert"],
                languageCount: 4,
                experienceYears: 10,
                available: true
            },
            { 
                _id: 4, 
                name: "Sarah T.", 
                specialty: "Adventure Hiking Guide", 
                languages: ["English", "French", "Spanish", "Kinyarwanda"],
                experience: "7 years experience",
                rating: 4.7,
                price: "$170/day",
                image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                certifications: ["Mountain Guide", "Wilderness First Responder", "RDB Certified"],
                languageCount: 4,
                experienceYears: 7,
                available: true
            },
            { 
                _id: 5, 
                name: "Peter K.", 
                specialty: "History & Culture Guide", 
                languages: ["English", "Kinyarwanda", "French"],
                experience: "5 years experience",
                rating: 4.6,
                price: "$140/day",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                certifications: ["History Degree", "RDB Certified", "Cultural Expert"],
                languageCount: 3,
                experienceYears: 5,
                available: true
            },
            { 
                _id: 6, 
                name: "Grace U.", 
                specialty: "Family Tour Specialist", 
                languages: ["English", "French", "Swahili"],
                experience: "4 years experience",
                rating: 4.5,
                price: "$130/day",
                image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                certifications: ["Child Safety Certified", "RDB Guide", "Family Specialist"],
                languageCount: 3,
                experienceYears: 4,
                available: true
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
                image: "./images/Patie.png",
                experience: "5 years experience",
                certifications: ["Certified Translator", "Tourism Diploma", "Business Communication"],
                languageCount: 7,
                experienceYears: 5,
                available: true
            },
            { 
                _id: 2, 
                name: "Eric M.", 
                languages: ["English", "German", "Chinese", "Kinyarwanda", "French"],
                specialty: "Medical & Technical Translation",
                rating: 4.8,
                price: "$150/day",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                experience: "8 years experience",
                certifications: ["Medical Translator", "Technical Certification", "RDB Approved"],
                languageCount: 5,
                experienceYears: 8,
                available: true
            },
            { 
                _id: 3, 
                name: "Grace U.", 
                languages: ["English", "Spanish", "Portuguese", "Kinyarwanda", "French"],
                specialty: "Legal & Government Translation",
                rating: 4.7,
                price: "$130/day",
                image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                experience: "6 years experience",
                certifications: ["Legal Translator", "Government Certified", "Diplomatic Experience"],
                languageCount: 5,
                experienceYears: 6,
                available: true
            },
            { 
                _id: 4, 
                name: "Robert K.", 
                languages: ["English", "Arabic", "Swahili", "Kinyarwanda", "French"],
                specialty: "Conference & Event Translation",
                rating: 4.8,
                price: "$145/day",
                image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                experience: "7 years experience",
                certifications: ["Conference Interpreter", "Event Management", "RDB Certified"],
                languageCount: 5,
                experienceYears: 7,
                available: true
            },
            { 
                _id: 5, 
                name: "Alice N.", 
                languages: ["English", "French", "Kinyarwanda"],
                specialty: "General Translation",
                rating: 4.6,
                price: "$90/day",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                experience: "3 years experience",
                certifications: ["Basic Translation", "RDB Certified", "Tourism Focus"],
                languageCount: 3,
                experienceYears: 3,
                available: true
            },
            { 
                _id: 6, 
                name: "Samuel T.", 
                languages: ["English", "Swahili", "Kinyarwanda", "French", "Spanish", "Portuguese"],
                specialty: "Multi-Language Specialist",
                rating: 4.9,
                price: "$160/day",
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                experience: "9 years experience",
                certifications: ["Advanced Translator", "Language Degree", "RDB Certified"],
                languageCount: 6,
                experienceYears: 9,
                available: true
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
                price: "From $1,500"
            },
            {
                _id: 2,
                name: "Lake Kivu",
                location: "Western Province, Rwanda",
                description: "One of Africa's Great Lakes, offering stunning views, water sports, beautiful beaches, and relaxing hot springs along its shores.",
                image: "./images/ruanda-lake-kivu-aussicht.jpg",
                features: ["Beaches", "Boating", "Swimming", "Hot Springs"],
                rating: 4.7,
                price: "From $300"
            },
            {
                _id: 3,
                name: "Nyungwe Forest National Park",
                location: "Southern Province, Rwanda",
                description: "Ancient rainforest with canopy walkway, home to chimpanzees and over 300 bird species. One of Africa's oldest forests.",
                image: "./images/nyungwe-weather.jpg",
                features: ["Canopy Walk", "Chimpanzee Tracking", "Hiking", "Waterfalls"],
                rating: 4.8,
                price: "From $600"
            },
            {
                _id: 4,
                name: "Kigali City",
                location: "Kigali, Rwanda",
                description: "The vibrant capital city known for its cleanliness, safety, and rich cultural experiences including museums, markets, and memorial sites.",
                image: "./images/mount-jali-hike.jpg",
                features: ["City Tours", "Cultural Museums", "Markets", "Nightlife"],
                rating: 4.8,
                price: "From $100"
            },
            {
                _id: 5,
                name: "Akagera National Park",
                location: "Eastern Province, Rwanda",
                description: "Rwanda's only Big Five safari destination, offering game drives, boat safaris, and beautiful landscapes.",
                image: "./images/Akagera-Hippos.jpg",
                features: ["Game Drives", "Boat Safaris", "Bird Watching", "Camping"],
                rating: 4.7,
                price: "From $700"
            },
            {
                _id: 6,
                name: "King's Palace Museum",
                location: "Nyanza, Rwanda",
                description: "Traditional royal palace offering insights into Rwanda's pre-colonial history, culture, and monarchy.",
                image: "./images/palace-museum-rwanda.jpg",
                features: ["Cultural History", "Traditional Architecture", "Royal Grounds", "Guided Tours"],
                rating: 4.6,
                price: "From $200"
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
                rating: 4.9,
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
                rating: 4.7,
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
                rating: 4.6,
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
                rating: 4.9,
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
                rating: 4.5,
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
                rating: 4.4,
                available: true
            }
        ],
        blog: [
            { 
                _id: 1, 
                title: "Complete Guide to Gorilla Trekking in Rwanda", 
                excerpt: "Everything you need to know about mountain gorilla trekking in Volcanoes National Park, including permits, preparation, and what to expect.",
                date: "May 15, 2024",
                category: "Adventure",
                image: "./images/gorilla-trekk-rwanda.jpg",
                readTime: "8 min read",
                author: "Jean Claude",
                content: "Full article content here...",
                tags: ["Gorilla Trekking", "Wildlife", "Adventure", "Rwanda"],
                views: 1250,
                createdAt: "2024-05-15T10:00:00.000Z"
            },
            { 
                _id: 2, 
                title: "Best Time to Visit Rwanda: Weather & Seasons Guide", 
                excerpt: "Planning your trip? Here's when to visit Rwanda for the best wildlife viewing, hiking conditions, and cultural experiences.",
                date: "April 28, 2024",
                category: "Travel Tips",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "6 min read",
                author: "Travel Team",
                content: "Full article content here...",
                tags: ["Travel Tips", "Weather", "Seasons", "Planning"],
                views: 980,
                createdAt: "2024-04-28T09:30:00.000Z"
            },
            { 
                _id: 3, 
                title: "Rwandan Culture: Traditions, Food & Etiquette", 
                excerpt: "Discover the rich cultural heritage of Rwanda, from traditional dances and ceremonies to delicious local cuisine.",
                date: "April 15, 2024",
                category: "Culture",
                image: "./images/intore-dancers.jpg",
                readTime: "7 min read",
                author: "Marie Aimee",
                content: "Full article content here...",
                tags: ["Culture", "Traditions", "Food", "Etiquette"],
                views: 1120,
                createdAt: "2024-04-15T11:15:00.000Z"
            },
            { 
                _id: 4, 
                title: "Top 10 Hiking Trails in the Land of a Thousand Hills", 
                excerpt: "Explore Rwanda's breathtaking landscapes through these incredible hiking trails suitable for all fitness levels.",
                date: "March 30, 2024",
                category: "Hiking",
                image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "9 min read",
                author: "Sarah T.",
                content: "Full article content here...",
                tags: ["Hiking", "Trails", "Outdoors", "Adventure"],
                views: 890,
                createdAt: "2024-03-30T14:20:00.000Z"
            },
            { 
                _id: 5, 
                title: "Bird Watching in Rwanda: A Birder's Paradise", 
                excerpt: "With over 700 bird species, Rwanda offers incredible bird watching opportunities across its national parks and forests.",
                date: "March 15, 2024",
                category: "Wildlife",
                image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "5 min read",
                author: "David M.",
                content: "Full article content here...",
                tags: ["Bird Watching", "Wildlife", "Nature", "Photography"],
                views: 750,
                createdAt: "2024-03-15T13:45:00.000Z"
            },
            { 
                _id: 6, 
                title: "Sustainable Tourism in Rwanda: Making a Positive Impact", 
                excerpt: "Learn how Rwanda is leading the way in sustainable tourism and how you can travel responsibly in this beautiful country.",
                date: "February 28, 2024",
                category: "Sustainability",
                image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
                readTime: "6 min read",
                author: "Patience R.",
                content: "Full article content here...",
                tags: ["Sustainability", "Eco-Tourism", "Responsible Travel", "Conservation"],
                views: 1050,
                createdAt: "2024-02-28T16:00:00.000Z"
            }
        ]
    };

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
                                phone: '+250 788 123 456',
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
                                phone: body.phone || '+250 788 123 456',
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
            const result = await apiRequest(config.endpoints.auth.login, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });
            
            if (result.success && result.token && result.user) {
                isAuthenticated = true;
                currentUser = result.user;
                saveUserData({ ...result.user, token: result.token });
                updateAuthUI(true, result.user);
                showNotification('✅ Login successful!', 'success');
                return { success: true };
            } else {
                throw new Error(result.message || 'Login failed');
            }
        } catch (error) {
            showNotification(`❌ ${error.message}`, 'error');
            return { success: false, message: error.message };
        }
    }

    async function register(userData) {
        try {
            const result = await apiRequest(config.endpoints.auth.register, {
                method: 'POST',
                body: JSON.stringify(userData)
            });
            
            if (result.success && result.token && result.user) {
                isAuthenticated = true;
                currentUser = result.user;
                saveUserData({ ...result.user, token: result.token });
                updateAuthUI(true, result.user);
                showNotification('✅ Registration successful!', 'success');
                return { success: true };
            } else {
                throw new Error(result.message || 'Registration failed');
            }
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
    // PAGE NAVIGATION SYSTEM - FIXED
    // ===============================
    
    function showPage(pageId, smooth = true) {
        console.log('Showing page:', pageId);
        
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
                if (isAuthenticated) {
                    loadDashboard();
                } else {
                    showNotification('Please login to access dashboard', 'warning');
                    showAuthModal('login');
                }
                break;
            case 'admin':
                if (isAuthenticated && currentUser?.role === 'admin') {
                    loadAdmin();
                } else {
                    showNotification('Admin access required', 'error');
                    showPage('home');
                }
                break;
        }
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

    async function loadDashboard() {
        console.log('Loading dashboard...');
        const dashboard = document.getElementById('dashboard');
        if (!dashboard) return;
        
        // Update user info
        const userName = dashboard.querySelector('#dashboard-user-name');
        const userEmail = dashboard.querySelector('#dashboard-user-email');
        if (userName && currentUser) userName.textContent = currentUser.name;
        if (userEmail && currentUser) userEmail.textContent = currentUser.email;
        
        // Load bookings
        const bookingsContainer = dashboard.querySelector('#user-bookings');
        if (bookingsContainer) {
            try {
                const result = await apiRequest(config.endpoints.bookings.user);
                const bookings = result.data || [];
                
                if (bookings.length > 0) {
                    bookingsContainer.innerHTML = bookings.map(booking => `
                        <div class="booking-item">
                            <div class="booking-header">
                                <h4>${booking.service_name}</h4>
                                <span class="booking-status ${booking.status}">${booking.status}</span>
                            </div>
                            <div class="booking-details">
                                <p><strong>Reference:</strong> ${booking.booking_reference}</p>
                                <p><strong>Date:</strong> ${new Date(booking.date).toLocaleDateString()}</p>
                                <p><strong>Type:</strong> ${booking.service_type}</p>
                            </div>
                        </div>
                    `).join('');
                } else {
                    bookingsContainer.innerHTML = `
                        <div class="empty-state">
                            <i class="fas fa-calendar-times"></i>
                            <p>No bookings yet</p>
                            <button class="btn btn-primary" data-page="destinations">Book a Tour</button>
                        </div>
                    `;
                }
            } catch (error) {
                bookingsContainer.innerHTML = `
                    <div class="empty-state">
                        <i class="fas fa-exclamation-triangle"></i>
                        <p>Could not load bookings</p>
                    </div>
                `;
            }
        }
    }

    async function loadAdmin() {
        console.log('Loading admin...');
        const adminPage = document.getElementById('admin');
        if (adminPage) {
            adminPage.innerHTML = `
                <div class="page-header">
                    <div class="container">
                        <h1>Admin Dashboard</h1>
                        <p>Manage your travel agency</p>
                    </div>
                </div>
                <div class="container">
                    <div class="admin-grid">
                        <div class="admin-card">
                            <h3><i class="fas fa-users"></i> Users</h3>
                            <p>Manage user accounts</p>
                        </div>
                        <div class="admin-card">
                            <h3><i class="fas fa-calendar-check"></i> Bookings</h3>
                            <p>View all bookings</p>
                        </div>
                        <div class="admin-card">
                            <h3><i class="fas fa-chart-line"></i> Analytics</h3>
                            <p>View statistics</p>
                        </div>
                    </div>
                </div>
            `;
        }
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
                
                <div class="auth-divider"></div>
                
                <div class="auth-option demo-mode-info">
                    <i class="fas fa-info-circle"></i> ${useMockData ? 'Demo Mode' : 'Connected'}
                </div>
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
                
                <div class="auth-divider"></div>
                
                <a href="#" class="auth-option demo-login-btn">
                    <i class="fas fa-rocket"></i> Quick Demo
                </a>
                
                <div class="auth-option demo-mode-info">
                    <i class="fas fa-info-circle"></i> ${useMockData ? 'Demo Mode' : 'Connected'}
                </div>
            `;
            
            // Add event listeners for new buttons
            const signInBtn = authDropdown.querySelector('.sign-in-btn');
            const signUpBtn = authDropdown.querySelector('.signup-btn');
            const demoLoginBtn = authDropdown.querySelector('.demo-login-btn');
            
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
            
            if (demoLoginBtn) {
                demoLoginBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    quickDemoLogin();
                });
            }
        }
    }

    function quickDemoLogin() {
        const demoUser = {
            _id: Date.now(),
            name: 'Demo User',
            email: 'demo@example.com',
            role: 'user',
            phone: '+250 788 123 456',
            country: 'Rwanda',
            token: 'demo-jwt-token-' + Date.now()
        };
        
        isAuthenticated = true;
        currentUser = demoUser;
        saveUserData(demoUser);
        updateAuthUI(true, demoUser);
        
        showNotification('✅ Demo login successful! Welcome!', 'success');
        
        setTimeout(() => {
            showPage('dashboard');
        }, 1000);
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

    function showBookingModal(type, id, name) {
        console.log('Showing booking modal:', type, name);
        const modal = createModal();
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2>Book ${name}</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="booking-form">
                    <input type="hidden" name="service_type" value="${type}">
                    <input type="hidden" name="service_id" value="${id}">
                    <input type="hidden" name="service_name" value="${name}">
                    
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" value="${currentUser?.name || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" value="${currentUser?.email || ''}" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Phone *</label>
                        <input type="tel" name="phone" value="${currentUser?.phone || ''}" required>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Date *</label>
                            <input type="date" name="date" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Duration (days) *</label>
                            <select name="duration" required>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Number of Travelers *</label>
                        <input type="number" name="travelers" min="1" value="1" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Special Requirements</label>
                        <textarea name="notes" rows="3"></textarea>
                    </div>
                    
                    <button type="submit" class="btn btn-primary btn-block">Confirm Booking</button>
                </form>
            </div>
        `;
        
        // Set default date to tomorrow
        const dateInput = modal.querySelector('input[name="date"]');
        if (dateInput) {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            dateInput.value = tomorrow.toISOString().split('T')[0];
            dateInput.min = new Date().toISOString().split('T')[0];
        }
        
        const form = modal.querySelector('#booking-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!isAuthenticated) {
                showNotification('Please login to book', 'error');
                closeModal();
                showAuthModal('login');
                return;
            }
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const result = await apiRequest(config.endpoints.bookings.submit, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                
                if (result.success) {
                    showNotification('✅ Booking confirmed!', 'success');
                    closeModal();
                    
                    // Refresh dashboard if open
                    if (document.querySelector('#dashboard.active')) {
                        loadDashboard();
                    }
                } else {
                    throw new Error(result.message || 'Booking failed');
                }
            } catch (error) {
                showNotification(`❌ ${error.message}`, 'error');
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
                <h2>Plan Your Trip</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="trip-plan-form">
                    <div class="form-group">
                        <label>Full Name *</label>
                        <input type="text" name="name" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Email *</label>
                        <input type="email" name="email" required>
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
        
        const form = modal.querySelector('#trip-plan-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Get interests
            const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked'))
                .map(input => input.value);
            data.interests = interests;
            
            try {
                const result = await apiRequest(config.endpoints.tripPlan, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                
                if (result.success) {
                    showNotification('✅ Trip plan submitted!', 'success');
                    closeModal();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                showNotification(`❌ ${error.message}`, 'error');
            }
        });
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
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
    }

    // ===============================
    // EVENT HANDLERS - FIXED NAVIGATION
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
                    showBookingModal(type, id, name);
                } else {
                    showNotification('Please login to book services', 'info');
                    showAuthModal('login');
                }
            }
            
            // Handle plan trip buttons
            if (e.target.matches('.plan-trip-btn') || e.target.closest('.plan-trip-btn')) {
                e.preventDefault();
                showTripPlanModal();
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
    // INITIALIZATION
    // ===============================
    
    async function init() {
        console.log('Initializing Go Trip...');
        
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
                showNotification('Welcome to Go Trip Rwanda!', 'info');
            }
        }, 1000);
        
        console.log('Go Trip initialized successfully');
    }

    // ===============================
    // START APPLICATION
    // ===============================
    
    // Export to global scope
    window.showPage = showPage;
    window.closeModal = closeModal;
    window.showAuthModal = showAuthModal;
    window.showNotification = showNotification;
    window.logout = logout;
    
    // Initialize when DOM is ready
    domReady(() => {
        setTimeout(init, 100);
    });
})();