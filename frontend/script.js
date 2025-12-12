// Adventure HillBound -javaScript

(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION - REAL DEPLOYMENT
    // ===============================
    const config = {
        baseUrl: 'https://api.adventurehillbound.com', // Production API
        debug: false, // Set to false in production
        apiEndpoints: {
            newsletter: '/api/newsletter/subscribe',
            contact: '/api/contact/submit',
            tripPlan: '/api/trip-plan/submit',
            auth: {
                login: '/api/auth/login',
                register: '/api/auth/register',
                verify: '/api/auth/verify',
                logout: '/api/auth/logout',
                profile: '/api/auth/profile'
            },
            booking: {
                submit: '/api/bookings/create',
                user: '/api/bookings/user',
                all: '/api/bookings/all',
                update: '/api/bookings/update',
                delete: '/api/bookings/delete',
                get: '/api/bookings'
            },
            guides: {
                list: '/api/guides',
                book: '/api/guides/book',
                availability: '/api/guides/availability'
            },
            translators: {
                list: '/api/translators',
                hire: '/api/translators/hire',
                availability: '/api/translators/availability'
            },
            accommodations: {
                list: '/api/accommodations',
                book: '/api/accommodations/book',
                availability: '/api/accommodations/availability'
            },
            destinations: {
                list: '/api/destinations',
                book: '/api/destinations/book'
            },
            users: {
                update: '/api/users/update',
                bookings: '/api/users/bookings',
                delete: '/api/users/delete'
            },
            admin: {
                stats: '/api/admin/stats',
                users: '/api/admin/users',
                analytics: '/api/admin/analytics'
            },
            blog: {
                list: '/api/blog/posts',
                create: '/api/blog/create',
                update: '/api/blog/update'
            }
        }
    };
    
    // ===============================
    // DATA SETS WITH INDIVIDUAL PRICING
    // ===============================
    
    // Guides Data with INDIVIDUAL PRICING based on experience and languages
    const guidesData = [
        { 
            id: 1, 
            name: "Jean Claude N.", 
            specialty: "Gorilla Trekking Expert", 
            languages: ["English", "French", "Kinyarwanda", "Swahili"],
            experience: "8 years experience",
            rating: 4.9,
            price: "180/day",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            certifications: ["RDB Certified", "Wildlife First Aid", "CPR Certified"],
            languageCount: 4,
            experienceYears: 8
        },
        { 
            id: 2, 
            name: "Marie Aimee K.", 
            specialty: "Cultural Tour Guide", 
            languages: ["English", "Swahili", "Kinyarwanda", "French"],
            experience: "6 years experience",
            rating: 4.8,
            price: "160/day",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            certifications: ["Cultural Heritage", "Anthropology Degree", "RDB Certified"],
            languageCount: 4,
            experienceYears: 6
        },
        { 
            id: 3, 
            name: "David M.", 
            specialty: "Bird Watching Specialist", 
            languages: ["English", "German", "Kinyarwanda", "French"],
            experience: "10 years experience",
            rating: 4.9,
            price: "200/day",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            certifications: ["Ornithology Certified", "RDB Guide", "Photography Expert"],
            languageCount: 4,
            experienceYears: 10
        },
        { 
            id: 4, 
            name: "Sarah T.", 
            specialty: "Adventure Hiking Guide", 
            languages: ["English", "French", "Spanish", "Kinyarwanda"],
            experience: "7 years experience",
            rating: 4.7,
            price: "170/day",
            image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            certifications: ["Mountain Guide", "Wilderness First Responder", "RDB Certified"],
            languageCount: 4,
            experienceYears: 7
        },
        { 
            id: 5, 
            name: "Peter K.", 
            specialty: "History & Culture Guide", 
            languages: ["English", "Kinyarwanda", "French"],
            experience: "5 years experience",
            rating: 4.6,
            price: "140/day",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            certifications: ["History Degree", "RDB Certified", "Cultural Expert"],
            languageCount: 3,
            experienceYears: 5
        },
        { 
            id: 6, 
            name: "Grace U.", 
            specialty: "Family Tour Specialist", 
            languages: ["English", "French", "Swahili"],
            experience: "4 years experience",
            rating: 4.5,
            price: "130/day",
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            certifications: ["Child Safety Certified", "RDB Guide", "Family Specialist"],
            languageCount: 3,
            experienceYears: 4
        }
    ];
    
    // Translators Data with INDIVIDUAL PRICING based on languages and expertise
    const translatorsData = [
        { 
            id: 1, 
            name: "Patience Rutayisire", 
            languages: ["English", "German", "Spanish", "French", "Swahili", "Chinese", "Kinyarwanda"],
            specialty: "Tourism & Business Translation",
            rating: 4.9,
            price: "140/day",
            image: "./images/Patie.png",
            experience: "5 years experience",
            certifications: ["Certified Translator", "Tourism Diploma", "Business Communication"],
            languageCount: 7,
            experienceYears: 5
        },
        { 
            id: 2, 
            name: "Eric M.", 
            languages: ["English", "German", "Chinese", "Kinyarwanda", "French"],
            specialty: "Medical & Technical Translation",
            rating: 4.8,
            price: "150/day",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "8 years experience",
            certifications: ["Medical Translator", "Technical Certification", "RDB Approved"],
            languageCount: 5,
            experienceYears: 8
        },
        { 
            id: 3, 
            name: "Grace U.", 
            languages: ["English", "Spanish", "Portuguese", "Kinyarwanda", "French"],
            specialty: "Legal & Government Translation",
            rating: 4.7,
            price: "130/day",
            image: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "6 years experience",
            certifications: ["Legal Translator", "Government Certified", "Diplomatic Experience"],
            languageCount: 5,
            experienceYears: 6
        },
        { 
            id: 4, 
            name: "Robert K.", 
            languages: ["English", "Arabic", "Swahili", "Kinyarwanda", "French"],
            specialty: "Conference & Event Translation",
            rating: 4.8,
            price: "145/day",
            image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "7 years experience",
            certifications: ["Conference Interpreter", "Event Management", "RDB Certified"],
            languageCount: 5,
            experienceYears: 7
        },
        { 
            id: 5, 
            name: "Alice N.", 
            languages: ["English", "French", "Kinyarwanda"],
            specialty: "General Translation",
            rating: 4.6,
            price: "90/day",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "3 years experience",
            certifications: ["Basic Translation", "RDB Certified", "Tourism Focus"],
            languageCount: 3,
            experienceYears: 3
        },
        { 
            id: 6, 
            name: "Samuel T.", 
            languages: ["English", "Swahili", "Kinyarwanda", "French", "Spanish", "Portuguese"],
            specialty: "Multi-Language Specialist",
            rating: 4.9,
            price: "160/day",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            experience: "9 years experience",
            certifications: ["Advanced Translator", "Language Degree", "RDB Certified"],
            languageCount: 6,
            experienceYears: 9
        }
    ];
    
    // Destinations Data
    const destinationsData = [
        {
            id: 1,
            name: "Volcanoes National Park",
            location: "Northern Province, Rwanda",
            description: "Home to the endangered mountain gorillas, this UNESCO World Heritage site offers unforgettable gorilla trekking experiences in the Virunga Mountains.",
            image: "./images/mount-bisoke-rwanda.jpg",
            features: ["Gorilla Trekking", "Mountain Hiking", "Bird Watching", "Cultural Villages"],
            rating: 4.9,
            price: "From $1,500"
        },
        {
            id: 2,
            name: "Lake Kivu",
            location: "Western Province, Rwanda",
            description: "One of Africa's Great Lakes, offering stunning views, water sports, beautiful beaches, and relaxing hot springs along its shores.",
            image: "./images/ruanda-lake-kivu-aussicht.jpg",
            features: ["Beaches", "Boating", "Swimming", "Hot Springs"],
            rating: 4.7,
            price: "From $300"
        },
        {
            id: 3,
            name: "Nyungwe Forest National Park",
            location: "Southern Province, Rwanda",
            description: "Ancient rainforest with canopy walkway, home to chimpanzees and over 300 bird species. One of Africa's oldest forests.",
            image: "./images/nyungwe-weather.jpg",
            features: ["Canopy Walk", "Chimpanzee Tracking", "Hiking", "Waterfalls"],
            rating: 4.8,
            price: "From $600"
        },
        {
            id: 4,
            name: "Kigali City",
            location: "Kigali, Rwanda",
            description: "The vibrant capital city known for its cleanliness, safety, and rich cultural experiences including museums, markets, and memorial sites.",
            image: "./images/mount-jali-hike.jpg",
            features: ["City Tours", "Cultural Museums", "Markets", "Nightlife"],
            rating: 4.8,
            price: "From $100"
        },
        {
            id: 5,
            name: "Akagera National Park",
            location: "Eastern Province, Rwanda",
            description: "Rwanda's only Big Five safari destination, offering game drives, boat safaris, and beautiful landscapes.",
            image: "./images/Akagera-Hippos.jpg",
            features: ["Game Drives", "Boat Safaris", "Bird Watching", "Camping"],
            rating: 4.7,
            price: "From $700"
        },
        {
            id: 6,
            name: "King's Palace Museum",
            location: "Nyanza, Rwanda",
            description: "Traditional royal palace offering insights into Rwanda's pre-colonial history, culture, and monarchy.",
            image: "./images/palace-museum-rwanda.jpg",
            features: ["Cultural History", "Traditional Architecture", "Royal Grounds", "Guided Tours"],
            rating: 4.6,
            price: "From $200"
        }
    ];
    
    // Accommodations Data
    const accommodationsData = [
        { 
            id: 1, 
            name: "Bisate Lodge", 
            location: "Volcanoes National Park",
            type: "Luxury Eco-Lodge",
            description: "Award-winning eco-lodge with stunning views of the volcanoes, offering luxury accommodation and direct gorilla trekking access.",
            image: "./images/Bisate-Lodge-Rwanda-Exterior.jpg",
            features: ["Private Villas", "Gorilla Views", "Spa", "Fine Dining"],
            price: "$2,500/night",
            rating: 4.9
        },
        { 
            id: 2, 
            name: "Lake Kivu Serena Hotel", 
            location: "Gisenyi, Lake Kivu",
            type: "5-Star Hotel",
            description: "Luxury resort on the shores of Lake Kivu with private beach, water sports, and panoramic lake views.",
            image: "./images/aeriel-view-serena.jpg",
            features: ["Lake View", "Private Beach", "Spa", "Water Sports"],
            price: "$450/night",
            rating: 4.7
        },
        { 
            id: 3, 
            name: "Kigali Marriott Hotel", 
            location: "Kigali City Center",
            type: "Business Hotel",
            description: "Modern luxury hotel in the heart of Kigali, perfect for business travelers and tourists alike.",
            image: "./images/mariot-kigali.png",
            features: ["City Center", "Business Center", "Pool", "Multiple Restaurants"],
            price: "$350/night",
            rating: 4.6
        },
        { 
            id: 4, 
            name: "One&Only Gorilla's Nest", 
            location: "Volcanoes National Park",
            type: "Luxury Resort",
            description: "Ultra-luxurious resort offering bespoke gorilla trekking experiences and unparalleled comfort.",
            image: "./images/one-and-only-kinigi.jpg",
            features: ["Butler Service", "Private Trekking", "Helicopter Transfer", "Fine Dining"],
            price: "$3,500/night",
            rating: 4.9
        },
        { 
            id: 5, 
            name: "One&Only Nyungwe", 
            location: "Nyungwe Forest",
            type: "Eco-Lodge",
            description: "Sustainable eco-lodge nestled in the Nyungwe Forest, offering immersive nature experiences.",
            image: "./images/one-only-nyungwe-house.jpg",
            features: ["Forest Views", "Bird Watching", "Sustainable", "Guided Hikes"],
            price: "$280/night",
            rating: 4.5
        },
        { 
            id: 6, 
            name: "Raddison Blu Hotel", 
            location: "Kigali",
            type: "4-Star Hotel",
            description: "Contemporary hotel with excellent amenities and convenient city center location.",
            image: "./images/radison-blue.jpg",
            features: ["City Views", "Restaurant", "Pool", "Fitness Center"],
            price: "$220/night",
            rating: 4.4
        }
    ];
    
    // Blog Data
    const blogData = [
        { 
            id: 1, 
            title: "Complete Guide to Gorilla Trekking in Rwanda", 
            excerpt: "Everything you need to know about mountain gorilla trekking in Volcanoes National Park, including permits, preparation, and what to expect.",
            date: "May 15, 2024",
            category: "Adventure",
            image: "./images/gorilla-trekk-rwanda.jpg",
            readTime: "8 min read",
            author: "Jean Claude",
            content: "Full article content here...",
            tags: ["Gorilla Trekking", "Wildlife", "Adventure", "Rwanda"]
        },
        { 
            id: 2, 
            title: "Best Time to Visit Rwanda: Weather & Seasons Guide", 
            excerpt: "Planning your trip? Here's when to visit Rwanda for the best wildlife viewing, hiking conditions, and cultural experiences.",
            date: "April 28, 2024",
            category: "Travel Tips",
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            readTime: "6 min read",
            author: "Travel Team",
            content: "Full article content here...",
            tags: ["Travel Tips", "Weather", "Seasons", "Planning"]
        },
        { 
            id: 3, 
            title: "Rwandan Culture: Traditions, Food & Etiquette", 
            excerpt: "Discover the rich cultural heritage of Rwanda, from traditional dances and ceremonies to delicious local cuisine.",
            date: "April 15, 2024",
            category: "Culture",
            image: "./images/intore-dancers.jpg",
            readTime: "7 min read",
            author: "Marie Aimee",
            content: "Full article content here...",
            tags: ["Culture", "Traditions", "Food", "Etiquette"]
        },
        { 
            id: 4, 
            title: "Top 10 Hiking Trails in the Land of a Thousand Hills", 
            excerpt: "Explore Rwanda's breathtaking landscapes through these incredible hiking trails suitable for all fitness levels.",
            date: "March 30, 2024",
            category: "Hiking",
            image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            readTime: "9 min read",
            author: "Sarah T.",
            content: "Full article content here...",
            tags: ["Hiking", "Trails", "Outdoors", "Adventure"]
        },
        { 
            id: 5, 
            title: "Bird Watching in Rwanda: A Birder's Paradise", 
            excerpt: "With over 700 bird species, Rwanda offers incredible bird watching opportunities across its national parks and forests.",
            date: "March 15, 2024",
            category: "Wildlife",
            image: "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            readTime: "5 min read",
            author: "David M.",
            content: "Full article content here...",
            tags: ["Bird Watching", "Wildlife", "Nature", "Photography"]
        },
        { 
            id: 6, 
            title: "Sustainable Tourism in Rwanda: Making a Positive Impact", 
            excerpt: "Learn how Rwanda is leading the way in sustainable tourism and how you can travel responsibly in this beautiful country.",
            date: "February 28, 2024",
            category: "Sustainability",
            image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            readTime: "6 min read",
            author: "Patience R.",
            content: "Full article content here...",
            tags: ["Sustainability", "Eco-Tourism", "Responsible Travel", "Conservation"]
        }
    ];
    
    // ===============================
    // UTILITY FUNCTIONS - ENHANCED
    // ===============================
    
    // DOM Ready Handler
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    
    // Enhanced Email Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Phone Validation
    function validatePhone(phone) {
        const re = /^\+?[\d\s\-\(\)]{8,}$/;
        return re.test(phone);
    }
    
    // Password Validation
    function validatePassword(password) {
        return password.length >= 8 && /\d/.test(password) && /[a-zA-Z]/.test(password);
    }
    
    // Get Auth Token
    function getAuthToken() {
        return localStorage.getItem('authToken');
    }
    
    // Get User Role
    function getUserRole() {
        return localStorage.getItem('userRole');
    }
    
    // Get User Data
    function getUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }
    
    // Save User Data
    function saveUserData(userData) {
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('userRole', userData.role || 'user');
    }
    
    // Enhanced POST request with better error handling
    async function submitForm(formData, endpoint, method = 'POST') {
        const headers = {
            'Content-Type': 'application/json',
        };
        
        // Add auth token if available
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(`${config.baseUrl}${endpoint}`, {
                method: method,
                headers: headers,
                body: JSON.stringify(formData),
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }
            
            return {
                success: true,
                data: data,
                message: data.message || 'Request successful'
            };
            
        } catch (error) {
            console.error('API Error:', error);
            
            // Check for network errors
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your internet connection and try again.');
            }
            
            throw error;
        }
    }
    
    // Enhanced GET request with caching
    async function fetchData(endpoint, useCache = false) {
        const headers = {};
        
        // Add auth token if available
        const token = getAuthToken();
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        // Check cache first if enabled
        if (useCache) {
            const cacheKey = `cache_${endpoint}`;
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const { data, timestamp } = JSON.parse(cached);
                // Use cache if less than 5 minutes old
                if (Date.now() - timestamp < 300000) {
                    return data;
                }
            }
        }
        
        try {
            const response = await fetch(`${config.baseUrl}${endpoint}`, {
                method: 'GET',
                headers: headers,
                credentials: 'include'
            });
            
            const data = await response.json();
            
            if (!response.ok) {
                throw new Error(data.message || `Server error: ${response.status}`);
            }
            
            // Cache the response if caching is enabled
            if (useCache) {
                const cacheKey = `cache_${endpoint}`;
                localStorage.setItem(cacheKey, JSON.stringify({
                    data: data,
                    timestamp: Date.now()
                }));
            }
            
            return data;
            
        } catch (error) {
            console.error('API Error:', error);
            
            // Check for network errors
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                throw new Error('Network error. Please check your internet connection and try again.');
            }
            
            throw error;
        }
    }
    
    // Show Notification with improved messaging
    function showNotification(message, type = 'info', duration = 6000) {
        const notificationArea = document.getElementById('notification-area');
        
        if (!notificationArea) {
            // Create notification area if it doesn't exist
            const newNotificationArea = document.createElement('div');
            newNotificationArea.id = 'notification-area';
            newNotificationArea.className = 'notification-area';
            newNotificationArea.setAttribute('role', 'alert');
            newNotificationArea.setAttribute('aria-live', 'polite');
            document.body.appendChild(newNotificationArea);
        }
        
        const notificationElement = document.getElementById('notification-area');
        
        // Remove any existing notification
        notificationElement.classList.remove('show');
        
        // Set message and type
        setTimeout(() => {
            notificationElement.textContent = message;
            notificationElement.className = 'notification-area';
            notificationElement.classList.add(type);
            
            // Add icon based on type
            let icon = '';
            switch(type) {
                case 'success': icon = '✅'; break;
                case 'error': icon = '❌'; break;
                case 'warning': icon = '⚠️'; break;
                case 'info': icon = 'ℹ️'; break;
            }
            notificationElement.innerHTML = `${icon} ${message}`;
            
            // Show notification
            setTimeout(() => {
                notificationElement.classList.add('show');
            }, 10);
            
            // Auto-hide after duration
            setTimeout(() => {
                notificationElement.classList.remove('show');
            }, duration);
        }, 100);
    }
    
    // Calculate Price Based on Experience and Languages
    function calculatePrice(experienceYears, languageCount, type) {
        let basePrice = type === 'guide' ? 100 : 80;
        let experienceMultiplier = 1 + (experienceYears * 0.05);
        let languageMultiplier = 1 + (languageCount * 0.02);
        
        let calculatedPrice = Math.round(basePrice * experienceMultiplier * languageMultiplier);
        
        // Apply caps
        if (type === 'guide') {
            calculatedPrice = Math.max(100, Math.min(200, calculatedPrice));
        } else {
            calculatedPrice = Math.max(80, Math.min(150, calculatedPrice));
        }
        
        return calculatedPrice;
    }
    
    // Format Price
    function formatPrice(price) {
        if (typeof price === 'number') {
            return `$${price}/day`;
        }
        return price;
    }
    
    // Format Date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Generate Booking Reference
    function generateBookingRef() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'AHB-';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    // Form Validation Helper
    function validateForm(formData, requiredFields) {
        const errors = [];
        
        requiredFields.forEach(field => {
            if (!formData[field] || formData[field].toString().trim() === '') {
                errors.push(`${field.replace('_', ' ')} is required`);
            }
        });
        
        if (formData.email && !validateEmail(formData.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (formData.phone && !validatePhone(formData.phone)) {
            errors.push('Please enter a valid phone number');
        }
        
        return errors;
    }
    
    // Get Client IP Address
    async function getClientIP() {
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();
            return data.ip;
        } catch (error) {
            return 'unknown';
        }
    }
    
    // ===============================
    // FORM VALIDATION CLASS
    // ===============================
    
    class FormValidator {
        constructor(formId) {
            this.form = document.getElementById(formId);
            this.errors = [];
            this.fields = {};
            
            if (this.form) {
                this.init();
            }
        }
        
        init() {
            // Add real-time validation to all inputs
            this.form.querySelectorAll('input, select, textarea').forEach(field => {
                this.setupFieldValidation(field);
            });
        }
        
        setupFieldValidation(field) {
            const fieldName = field.name || field.id;
            this.fields[fieldName] = field;
            
            // Validate on blur
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
            
            // Clear error on input
            field.addEventListener('input', () => {
                this.clearFieldError(field);
            });
        }
        
        validateField(field) {
            const value = field.value.trim();
            const isRequired = field.hasAttribute('required');
            const type = field.type;
            
            this.clearFieldError(field);
            
            if (isRequired && !value) {
                this.showFieldError(field, 'This field is required');
                return false;
            }
            
            if (value) {
                switch(type) {
                    case 'email':
                        if (!validateEmail(value)) {
                            this.showFieldError(field, 'Please enter a valid email address');
                            return false;
                        }
                        break;
                    case 'tel':
                        if (!validatePhone(value)) {
                            this.showFieldError(field, 'Please enter a valid phone number');
                            return false;
                        }
                        break;
                }
            }
            
            return true;
        }
        
        showFieldError(field, message) {
            // Remove existing error
            this.clearFieldError(field);
            
            // Add error class to field
            field.classList.add('error');
            
            // Create error message element
            const errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.textContent = message;
            
            // Insert after field
            field.parentNode.insertBefore(errorElement, field.nextSibling);
        }
        
        clearFieldError(field) {
            field.classList.remove('error');
            const existingError = field.parentNode.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
        }
        
        validateAll() {
            this.errors = [];
            
            this.form.querySelectorAll('input, select, textarea').forEach(field => {
                if (!this.validateField(field)) {
                    const fieldName = field.name || field.id;
                    this.errors.push(fieldName);
                }
            });
            
            return this.errors.length === 0;
        }
        
        getValues() {
            const formData = new FormData(this.form);
            const values = {};
            
            for (let [key, value] of formData.entries()) {
                // Handle arrays (checkboxes with same name)
                if (values[key]) {
                    if (!Array.isArray(values[key])) {
                        values[key] = [values[key]];
                    }
                    values[key].push(value);
                } else {
                    values[key] = value;
                }
            }
            
            return values;
        }
        
        reset() {
            this.form.reset();
            this.form.querySelectorAll('.error').forEach(field => {
                field.classList.remove('error');
            });
            this.form.querySelectorAll('.field-error').forEach(error => {
                error.remove();
            });
        }
    }
    
    // ===============================
    // CORE APPLICATION INITIALIZATION
    // ===============================
    
    // Initialize all modules
    async function initApplication() {
        console.log('Adventure HillBound Professional Edition initialized');
        
        // Set current year in footer
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Check authentication
        await checkAuthentication();
        
        // Initialize modules
        initMobileMenu();
        initDropdowns();
        initPageSystem();
        initEnhancedForms();
        initModals();
        initNotifications();
        initPricing();
        loadDynamicContent();
        setupEventListeners();
        initSmoothScroll();
        setupFormValidation();
        addPricingDetailsButtons();
        setupSocialSharing();
        enhanceAccessibility();
        optimizePerformance();
        setupOfflineSupport();
        
        // Setup footer navigation
        setupFooterNavigation();
        
        // Hide loading overlay
        setTimeout(() => {
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                loadingOverlay.style.visibility = 'hidden';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }
        }, 800);
        
        // Show welcome notification
        setTimeout(() => {
            const userData = getUserData();
            if (userData) {
                showNotification(`Welcome back, ${userData.name}! 🏔️ Ready for your next adventure?`, 'info');
            } else {
                showNotification('Welcome to Adventure HillBound! 🏔️ Discover Rwanda - The Land of a Thousand Hills', 'info');
            }
        }, 1000);
        
        // Add professional CSS
        addProfessionalStyles();
        
        // Initialize analytics
        initAnalytics();
    }
    
    // Check Authentication
    async function checkAuthentication() {
        const token = getAuthToken();
        if (token) {
            try {
                const response = await fetchData(config.apiEndpoints.auth.verify);
                if (response.success && response.user) {
                    saveUserData(response.user);
                    updateAuthUI(true, response.user);
                } else {
                    // Token expired or invalid
                    await logout();
                }
            } catch (error) {
                console.error('Auth verification failed:', error);
                await logout();
            }
        } else {
            updateAuthUI(false);
        }
    }
    
    // Update Authentication UI
    function updateAuthUI(isLoggedIn, user = null) {
        const authToggle = document.getElementById('auth-toggle');
        const authDropdown = document.getElementById('auth-dropdown-menu');
        
        if (!authToggle || !authDropdown) return;
        
        if (isLoggedIn && user) {
            // Update auth dropdown for logged in user
            authToggle.innerHTML = `
                <i class="fas fa-user" aria-hidden="true"></i>
                <span>${user.name.split(' ')[0]}</span>
                <i class="fas fa-chevron-down" aria-hidden="true"></i>
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
            
            // Add logout handler
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await logout();
                });
            }
        } else {
            // Default auth dropdown
            authToggle.innerHTML = `
                <i class="fas fa-user" aria-hidden="true"></i>
                <span>Account</span>
                <i class="fas fa-chevron-down" aria-hidden="true"></i>
            `;
            
            authDropdown.innerHTML = `
                <a href="#" class="auth-option sign-in-btn">
                    <i class="fas fa-sign-in-alt"></i> Sign In
                </a>
                <a href="#" class="auth-option signup-btn">
                    <i class="fas fa-user-plus"></i> Sign Up
                </a>
            `;
            
            // Re-attach auth handlers
            const signInBtn = document.querySelector('.sign-in-btn');
            const signUpBtn = document.querySelector('.signup-btn');
            
            if (signInBtn) {
                signInBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showAuthModal('login');
                });
            }
            
            if (signUpBtn) {
                signUpBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    showAuthModal('register');
                });
            }
        }
    }
    
    // Enhanced Logout function
    async function logout() {
        try {
            await submitForm({}, config.apiEndpoints.auth.logout);
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
            localStorage.removeItem('userRole');
            
            // Clear cached data
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('cache_')) {
                    localStorage.removeItem(key);
                }
            });
            
            // Update UI
            updateAuthUI(false);
            
            // Show notification
            showNotification('You have been logged out successfully. We hope to see you again soon!', 'info');
            
            // Redirect to home if on dashboard/admin pages
            const currentPage = document.querySelector('.page.active');
            if (currentPage && (currentPage.id === 'dashboard' || currentPage.id === 'admin')) {
                showPage('home');
            }
        }
    }
    
    // ===============================
    // MOBILE MENU & DROPDOWNS
    // ===============================
    
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.getElementById('nav-links');
        const hamburgerIcon = document.querySelector('.hamburger-icon');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', function() {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                navLinks.classList.toggle('active');
                
                if (hamburgerIcon) {
                    hamburgerIcon.classList.toggle('active');
                }
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                if (!mobileMenuBtn.contains(event.target) && !navLinks.contains(event.target)) {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    if (hamburgerIcon) {
                        hamburgerIcon.classList.remove('active');
                    }
                }
            });
            
            // Close menu when clicking a link
            navLinks.addEventListener('click', function(event) {
                if (event.target.tagName === 'A') {
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    navLinks.classList.remove('active');
                    if (hamburgerIcon) {
                        hamburgerIcon.classList.remove('active');
                    }
                }
            });
        }
    }
    
    function initDropdowns() {
        const authToggle = document.getElementById('auth-toggle');
        const authDropdown = document.getElementById('auth-dropdown-menu');
        
        if (authToggle && authDropdown) {
            authToggle.addEventListener('click', function(e) {
                e.stopPropagation();
                const isExpanded = this.getAttribute('aria-expanded') === 'true';
                this.setAttribute('aria-expanded', !isExpanded);
                authDropdown.classList.toggle('show');
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function() {
                authToggle.setAttribute('aria-expanded', 'false');
                authDropdown.classList.remove('show');
            });
        }
    }
    
    // ===============================
    // PAGE SYSTEM
    // ===============================
    
    function initPageSystem() {
        const navLinks = document.querySelectorAll('.nav-link[data-page]');
        const pages = document.querySelectorAll('.page');
        
        // Show home page by default
        showPage('home');
        
        // Handle navigation clicks
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                
                // Check if user is authenticated for dashboard/admin pages
                if ((pageId === 'dashboard' || pageId === 'admin') && !getAuthToken()) {
                    showNotification('Please log in to access this page.', 'error');
                    showAuthModal('login');
                    return;
                }
                
                // Check admin role for admin page
                if (pageId === 'admin' && getUserRole() !== 'admin') {
                    showNotification('Access denied. Admin privileges required.', 'error');
                    return;
                }
                
                showPage(pageId);
                
                // Update active nav link
                updateActiveNavLink(this);
                
                // Update URL hash
                if (history.pushState) {
                    history.pushState(null, null, `#${pageId}`);
                }
            });
        });
        
        // Handle footer navigation
        document.querySelectorAll('footer a[data-page]').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const pageId = this.getAttribute('data-page');
                const correspondingNavLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
                if (correspondingNavLink) {
                    correspondingNavLink.click();
                }
            });
        });
        
        // Handle browser back/forward
        window.addEventListener('popstate', function() {
            const hash = window.location.hash.replace('#', '') || 'home';
            showPage(hash);
            updateActiveNavLink(document.querySelector(`[data-page="${hash}"]`));
        });
        
        // Handle initial hash
        if (window.location.hash) {
            const hash = window.location.hash.replace('#', '');
            if (hash) {
                showPage(hash);
                updateActiveNavLink(document.querySelector(`[data-page="${hash}"]`));
            }
        }
    }
    
    function showPage(pageId) {
        const pages = document.querySelectorAll('.page');
        const targetPage = document.getElementById(pageId);
        
        if (!targetPage) {
            console.warn(`Page ${pageId} not found, redirecting to home`);
            showPage('home');
            return;
        }
        
        // Hide all pages
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // Show target page
        targetPage.classList.add('active');
        
        // Only scroll to top when in footer (contact page)
        if (pageId === 'contact') {
            window.scrollTo(0, 0);
        }
        
        // Load page-specific content
        switch(pageId) {
            case 'dashboard':
                loadDashboardContent();
                break;
            case 'admin':
                loadAdminDashboard();
                break;
            case 'guides':
                loadGuidesFromAPI();
                break;
            case 'translators':
                loadTranslatorsFromAPI();
                break;
            case 'destinations':
                loadDestinationsFromAPI();
                break;
            case 'accommodations':
                loadAccommodationsFromAPI();
                break;
            case 'blog':
                loadBlogFromAPI();
                break;
        }
    }
    
    function updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    // Setup Footer Navigation
    function setupFooterNavigation() {
        // Make footer links clickable
        document.querySelectorAll('footer a[href*="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const pageId = href.substring(1);
                    
                    // Check if it's a valid page
                    const validPages = ['home', 'destinations', 'guides', 'translators', 'accommodations', 'blog', 'contact', 'dashboard'];
                    if (validPages.includes(pageId)) {
                        // Check authentication for protected pages
                        if ((pageId === 'dashboard' || pageId === 'admin') && !getAuthToken()) {
                            showNotification('Please log in to access this page.', 'error');
                            showAuthModal('login');
                            return;
                        }
                        
                        // Find corresponding nav link and click it
                        const navLink = document.querySelector(`.nav-link[data-page="${pageId}"]`);
                        if (navLink) {
                            navLink.click();
                        } else {
                            showPage(pageId);
                        }
                    }
                }
            });
        });
    }
    
    // Smooth Scroll
    function initSmoothScroll() {
        document.addEventListener('click', function(e) {
            const link = e.target.closest('a[href^="#"]');
            if (link && link.getAttribute('href') !== '#') {
                const href = link.getAttribute('href');
                const targetElement = document.querySelector(href);
                
                if (targetElement && targetElement.classList.contains('page')) {
                    return;
                }
                
                if (targetElement && !targetElement.classList.contains('page')) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.main-nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // ===============================
    // ENHANCED FORMS - PROFESSIONAL
    // ===============================
    
    function initEnhancedForms() {
        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', handleNewsletterSubmit);
        }
        
        // Footer newsletter form
        const footerNewsletterForm = document.querySelector('.footer-newsletter-form');
        if (footerNewsletterForm) {
            footerNewsletterForm.addEventListener('submit', handleFooterNewsletterSubmit);
        }
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', handleContactSubmit);
        }
    }
    
    async function handleNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const emailInput = document.getElementById('newsletter-email');
        const errorElement = document.getElementById('newsletter-error');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Reset error
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            if (errorElement) {
                errorElement.textContent = 'Please enter a valid email address';
                errorElement.classList.add('show');
            }
            emailInput.focus();
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
        submitBtn.disabled = true;
        
        // Prepare form data for POST
        const formData = {
            email: emailInput.value.trim(),
            source: 'newsletter-main',
            timestamp: new Date().toISOString(),
            subscription_type: 'weekly_newsletter',
            ip_address: await getClientIP(),
            user_agent: navigator.userAgent
        };
        
        try {
            const result = await submitForm(formData, config.apiEndpoints.newsletter);
            
            if (result.success) {
                // Show success message with next steps
                showNotification('🎉 Successfully subscribed to our newsletter! Check your email for a welcome message.', 'success');
                
                // Reset form
                form.reset();
                
                // Restore button with success animation
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                submitBtn.classList.add('success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error(result.message || 'Subscription failed');
            }
            
        } catch (error) {
            showNotification(`⚠️ Failed to subscribe: ${error.message}. Please try again or contact support.`, 'error');
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }
    
    async function handleFooterNewsletterSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const emailInput = form.querySelector('input[type="email"]');
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showNotification('Please enter a valid email address.', 'error');
            emailInput.focus();
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Prepare form data for POST
        const formData = {
            email: emailInput.value.trim(),
            source: 'newsletter-footer',
            timestamp: new Date().toISOString(),
            subscription_type: 'weekly_newsletter',
            ip_address: await getClientIP(),
            user_agent: navigator.userAgent
        };
        
        try {
            const result = await submitForm(formData, config.apiEndpoints.newsletter);
            
            if (result.success) {
                // Show success message
                showNotification('🎉 Successfully subscribed! You\'ll receive our weekly travel updates.', 'success');
                
                // Reset form
                form.reset();
                
                // Restore button
                submitBtn.innerHTML = '<i class="fas fa-check"></i>';
                submitBtn.classList.add('success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error(result.message || 'Subscription failed');
            }
            
        } catch (error) {
            showNotification(`⚠️ Failed to subscribe: ${error.message}. Please try again later.`, 'error');
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }
    
    async function handleContactSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        
        // Collect form data
        const formData = {
            name: document.getElementById('contact-name').value.trim(),
            email: document.getElementById('contact-email').value.trim(),
            subject: document.getElementById('contact-subject').value.trim(),
            message: document.getElementById('contact-message').value.trim(),
            timestamp: new Date().toISOString(),
            form_type: 'contact',
            ip_address: await getClientIP(),
            user_agent: navigator.userAgent
        };
        
        // Validate required fields
        const errors = validateForm(formData, ['name', 'email', 'subject', 'message']);
        
        if (errors.length > 0) {
            showNotification(`⚠️ Please fix the following: ${errors.join(', ')}`, 'error');
            return;
        }
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            const result = await submitForm(formData, config.apiEndpoints.contact);
            
            if (result.success) {
                // Show success message with next steps
                showNotification('✅ Message sent successfully! We\'ll respond within 24 hours. Check your email for confirmation.', 'success');
                
                // Reset form
                form.reset();
                
                // Restore button
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
                submitBtn.classList.add('success');
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.classList.remove('success');
                    submitBtn.disabled = false;
                }, 2000);
            } else {
                throw new Error(result.message || 'Failed to send message');
            }
            
        } catch (error) {
            showNotification(`⚠️ Failed to send message: ${error.message}. Please try again or call us at +250 788 123 456`, 'error');
            submitBtn.innerHTML = originalContent;
            submitBtn.disabled = false;
        }
    }
    
    // ===============================
    // MODAL SYSTEM - ENHANCED
    // ===============================
    
    function initModals() {
        const modalContainer = document.getElementById('modal-container');
        const modalClose = document.querySelector('.modal-close');
        
        if (modalContainer && modalClose) {
            // Close modal button
            modalClose.addEventListener('click', function() {
                closeModal();
            });
            
            // Close modal when clicking outside
            modalContainer.addEventListener('click', function(e) {
                if (e.target === modalContainer) {
                    closeModal();
                }
            });
            
            // Close modal with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && modalContainer.classList.contains('active')) {
                    closeModal();
                }
            });
        }
        
        // Plan trip button
        const planTripBtn = document.querySelector('.plan-trip-btn');
        if (planTripBtn) {
            planTripBtn.addEventListener('click', function() {
                showPlanTripModal();
            });
        }
        
        // Also handle plan trip buttons in footer
        document.addEventListener('click', function(e) {
            if (e.target.closest('.plan-trip-btn') && !e.target.closest('.footer-column')) {
                showPlanTripModal();
            }
        });
    }
    
    function closeModal() {
        const modalContainer = document.getElementById('modal-container');
        if (modalContainer) {
            modalContainer.classList.remove('active');
            setTimeout(() => {
                const modalBody = document.querySelector('.modal-body');
                if (modalBody) {
                    modalBody.innerHTML = '';
                }
            }, 300);
        }
    }
    
    // ===============================
    // NOTIFICATIONS
    // ===============================
    
    function initNotifications() {
        // Create notification area if it doesn't exist
        if (!document.getElementById('notification-area')) {
            const notificationArea = document.createElement('div');
            notificationArea.id = 'notification-area';
            notificationArea.className = 'notification-area';
            notificationArea.setAttribute('role', 'alert');
            notificationArea.setAttribute('aria-live', 'polite');
            document.body.appendChild(notificationArea);
        }
    }
    
    // ===============================
    // PRICING SYSTEM
    // ===============================
    
    function initPricing() {
        // Update guide prices based on calculation
        guidesData.forEach(guide => {
            if (!guide.price || guide.price.includes('calculated')) {
                const calculatedPrice = calculatePrice(guide.experienceYears, guide.languageCount, 'guide');
                guide.price = `$${calculatedPrice}/day`;
            }
        });
        
        // Update translator prices based on calculation
        translatorsData.forEach(translator => {
            if (!translator.price || translator.price.includes('calculated')) {
                const calculatedPrice = calculatePrice(translator.experienceYears, translator.languageCount, 'translator');
                translator.price = `$${calculatedPrice}/day`;
            }
        });
    }
    
    // ===============================
    // DYNAMIC CONTENT LOADING FROM API
    // ===============================
    
    async function loadDynamicContent() {
        try {
            // Load data from APIs in parallel
            await Promise.all([
                populateHomePage(),
                loadGuidesFromAPI(),
                loadTranslatorsFromAPI(),
                loadDestinationsFromAPI(),
                loadAccommodationsFromAPI(),
                loadBlogFromAPI()
            ]);
            
            // After populating content, set up booking buttons
            setupBookingButtons();
            
        } catch (error) {
            console.error('Error loading dynamic content:', error);
            showNotification('⚠️ Some content failed to load. Please refresh the page.', 'warning');
            
            // Fallback to static data
            populateHomePage();
            populateDestinationsPage();
            populateGuidesPage();
            populateTranslatorsPage();
            populateAccommodationsPage();
            populateBlogPage();
            setupBookingButtons();
        }
    }
    
    async function loadGuidesFromAPI() {
        try {
            const response = await fetchData(config.apiEndpoints.guides.list, true);
            if (response && response.success) {
                // Use API data if available
                populateGuidesPage(response.data);
            } else {
                // Fallback to static data
                populateGuidesPage();
            }
        } catch (error) {
            console.warn('Using static guides data:', error);
            populateGuidesPage();
        }
    }
    
    async function loadTranslatorsFromAPI() {
        try {
            const response = await fetchData(config.apiEndpoints.translators.list, true);
            if (response && response.success) {
                populateTranslatorsPage(response.data);
            } else {
                populateTranslatorsPage();
            }
        } catch (error) {
            console.warn('Using static translators data:', error);
            populateTranslatorsPage();
        }
    }
    
    async function loadDestinationsFromAPI() {
        try {
            const response = await fetchData(config.apiEndpoints.destinations.list, true);
            if (response && response.success) {
                populateDestinationsPage(response.data);
            } else {
                populateDestinationsPage();
            }
        } catch (error) {
            console.warn('Using static destinations data:', error);
            populateDestinationsPage();
        }
    }
    
    async function loadAccommodationsFromAPI() {
        try {
            const response = await fetchData(config.apiEndpoints.accommodations.list, true);
            if (response && response.success) {
                populateAccommodationsPage(response.data);
            } else {
                populateAccommodationsPage();
            }
        } catch (error) {
            console.warn('Using static accommodations data:', error);
            populateAccommodationsPage();
        }
    }
    
    async function loadBlogFromAPI() {
        try {
            const response = await fetchData(config.apiEndpoints.blog.list, true);
            if (response && response.success) {
                populateBlogPage(response.data);
            } else {
                populateBlogPage();
            }
        } catch (error) {
            console.warn('Using static blog data:', error);
            populateBlogPage();
        }
    }
    
    function populateHomePage() {
        // Featured Destinations on Home Page
        const destinationsGrid = document.querySelector('.destinations-grid');
        if (destinationsGrid) {
            const featuredDestinations = destinationsData.slice(0, 3);
            destinationsGrid.innerHTML = featuredDestinations.map(destination => `
                <div class="destination-card" role="listitem">
                    <div class="destination-image">
                        <img src="${destination.image}" alt="${destination.name}" loading="lazy">
                        <div class="destination-rating">
                            <i class="fas fa-star"></i> ${destination.rating}
                        </div>
                    </div>
                    <div class="destination-content">
                        <h3>${destination.name}</h3>
                        <div class="destination-location">
                            <i class="fas fa-map-marker-alt"></i> ${destination.location}
                        </div>
                        <p class="destination-description">${destination.description}</p>
                        <div class="destination-features">
                            ${destination.features.map(feature => `
                                <span class="feature">
                                    <i class="fas fa-check"></i> ${feature}
                                </span>
                            `).join('')}
                        </div>
                        <div class="price-tag">
                            <i class="fas fa-tag"></i> ${destination.price}
                        </div>
                        <button class="btn btn-primary book-service-btn" 
                                data-type="destination"
                                data-id="${destination.id}"
                                data-name="${destination.name}"
                                data-price="${destination.price}">
                            <i class="fas fa-calendar-plus"></i> Book Now
                        </button>
                    </div>
                </div>
            `).join('');
        }

        // Blog Preview on Home Page
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            const featuredBlogs = blogData.slice(0, 3);
            blogGrid.innerHTML = featuredBlogs.map(blog => `
                <div class="blog-card" role="listitem">
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
                        <p class="blog-excerpt">${blog.excerpt}</p>
                        <a href="#blog" class="blog-link" data-page="blog">
                            Read More <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function populateDestinationsPage(data = destinationsData) {
        const destinationsGridFull = document.querySelector('.destinations-grid-full');
        if (destinationsGridFull) {
            const destinations = Array.isArray(data) ? data : [data];
            destinationsGridFull.innerHTML = destinations.map(destination => `
                <div class="destination-card" role="listitem">
                    <div class="destination-image">
                        <img src="${destination.image}" alt="${destination.name}" loading="lazy">
                        <div class="destination-rating">
                            <i class="fas fa-star"></i> ${destination.rating}
                        </div>
                    </div>
                    <div class="destination-content">
                        <h3>${destination.name}</h3>
                        <div class="destination-location">
                            <i class="fas fa-map-marker-alt"></i> ${destination.location}
                        </div>
                        <p class="destination-description">${destination.description}</p>
                        <div class="destination-features">
                            ${destination.features.map(feature => `
                                <span class="feature">
                                    <i class="fas fa-check"></i> ${feature}
                                </span>
                            `).join('')}
                        </div>
                        <div class="price-tag">
                            <i class="fas fa-tag"></i> ${destination.price}
                        </div>
                        <button class="btn btn-primary book-service-btn" 
                                data-type="destination"
                                data-id="${destination.id}"
                                data-name="${destination.name}"
                                data-price="${destination.price}">
                            <i class="fas fa-calendar-plus"></i> Book Tour
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function populateGuidesPage(data = guidesData) {
        const guidesGridFull = document.querySelector('.guides-grid-full');
        if (guidesGridFull) {
            const guides = Array.isArray(data) ? data : [data];
            guidesGridFull.innerHTML = guides.map(guide => `
                <div class="guide-card" role="listitem">
                    <div class="guide-avatar">
                        <img src="${guide.image}" alt="${guide.name}" loading="lazy">
                        <span class="guide-status"></span>
                    </div>
                    <div class="guide-info">
                        <h3>${guide.name}</h3>
                        <p class="guide-specialty">${guide.specialty}</p>
                        <p class="guide-languages">
                            <i class="fas fa-language"></i> 
                            ${guide.languages.length} languages: ${guide.languages.join(', ')}
                        </p>
                        <p class="guide-experience">
                            <i class="fas fa-briefcase"></i> ${guide.experience}
                        </p>
                        <div class="rating">
                            <div class="stars">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(guide.rating))}
                                ${guide.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            </div>
                            <span class="rating-value">${guide.rating}</span>
                        </div>
                        <div class="price-tag">
                            <i class="fas fa-dollar-sign"></i> ${guide.price}
                        </div>
                        <button class="btn btn-primary book-service-btn" 
                                data-type="guide"
                                data-id="${guide.id}"
                                data-name="${guide.name}"
                                data-price="${guide.price}"
                                data-specialty="${guide.specialty}"
                                data-languages='${JSON.stringify(guide.languages)}'>
                            <i class="fas fa-user-tie"></i> Hire Now
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function populateTranslatorsPage(data = translatorsData) {
        const translatorsGridFull = document.querySelector('.translators-grid-full');
        if (translatorsGridFull) {
            const translators = Array.isArray(data) ? data : [data];
            translatorsGridFull.innerHTML = translators.map(translator => `
                <div class="translator-card" role="listitem">
                    <div class="guide-avatar">
                        <img src="${translator.image}" alt="${translator.name}" loading="lazy">
                        <span class="guide-status"></span>
                    </div>
                    <div class="guide-info">
                        <h3>${translator.name}</h3>
                        <p class="guide-specialty">${translator.specialty}</p>
                        <p class="guide-languages">
                            <i class="fas fa-language"></i> 
                            ${translator.languages.length} languages: ${translator.languages.join(', ')}
                        </p>
                        <p class="guide-experience">
                            <i class="fas fa-briefcase"></i> ${translator.experience}
                        </p>
                        <div class="rating">
                            <div class="stars">
                                ${'<i class="fas fa-star"></i>'.repeat(Math.floor(translator.rating))}
                                ${translator.rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : ''}
                            </div>
                            <span class="rating-value">${translator.rating}</span>
                        </div>
                        <div class="price-tag">
                            <i class="fas fa-dollar-sign"></i> ${translator.price}
                        </div>
                        <button class="btn btn-primary book-service-btn" 
                                data-type="translator"
                                data-id="${translator.id}"
                                data-name="${translator.name}"
                                data-price="${translator.price}"
                                data-specialty="${translator.specialty}"
                                data-languages='${JSON.stringify(translator.languages)}'>
                            <i class="fas fa-language"></i> Hire Now
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function populateAccommodationsPage(data = accommodationsData) {
        const accommodationsGridFull = document.querySelector('.accommodations-grid-full');
        if (accommodationsGridFull) {
            const accommodations = Array.isArray(data) ? data : [data];
            accommodationsGridFull.innerHTML = accommodations.map(accommodation => `
                <div class="accommodation-card" role="listitem">
                    <div class="accommodation-image">
                        <img src="${accommodation.image}" alt="${accommodation.name}" loading="lazy">
                    </div>
                    <div class="accommodation-content">
                        <span class="accommodation-type">${accommodation.type}</span>
                        <h3>${accommodation.name}</h3>
                        <div class="accommodation-location">
                            <i class="fas fa-map-marker-alt"></i> ${accommodation.location}
                        </div>
                        <p class="destination-description">${accommodation.description}</p>
                        <div class="accommodation-features">
                            ${accommodation.features.map(feature => `
                                <span class="feature">
                                    <i class="fas fa-check"></i> ${feature}
                                </span>
                            `).join('')}
                        </div>
                        <div class="price-tag">
                            <i class="fas fa-tag"></i> ${accommodation.price}
                        </div>
                        <button class="btn btn-primary book-service-btn" 
                                data-type="accommodation"
                                data-id="${accommodation.id}"
                                data-name="${accommodation.name}"
                                data-price="${accommodation.price}">
                            <i class="fas fa-hotel"></i> Book Now
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }
    
    function populateBlogPage(data = blogData) {
        const blogGridFull = document.querySelector('.blog-grid-full');
        if (blogGridFull) {
            const blogs = Array.isArray(data) ? data : [data];
            blogGridFull.innerHTML = blogs.map(blog => `
                <div class="blog-card" role="listitem">
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
                        <p class="blog-excerpt">${blog.excerpt}</p>
                        <p class="blog-author"><i class="fas fa-user"></i> By ${blog.author}</p>
                        <a href="#blog" class="blog-link" data-page="blog">
                            Read Full Article <i class="fas fa-arrow-right"></i>
                        </a>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // ===============================
    // PROFESSIONAL BOOKING MODALS
    // ===============================
    
    function setupBookingButtons() {
        document.addEventListener('click', (e) => {
            const bookBtn = e.target.closest('.book-service-btn');
            if (bookBtn) {
                e.preventDefault();
                
                const type = bookBtn.dataset.type;
                const data = {
                    id: bookBtn.dataset.id,
                    name: bookBtn.dataset.name,
                    price: bookBtn.dataset.price,
                    specialty: bookBtn.dataset.specialty,
                    languages: bookBtn.dataset.languages ? JSON.parse(bookBtn.dataset.languages) : []
                };
                
                showBookingModal(type, data);
            }
        });
    }
    
    // Professional Booking Modal
    function showBookingModal(type, data) {
        const modalContainer = document.getElementById('modal-container');
        const modalBody = document.querySelector('.modal-body');
        
        if (!modalContainer || !modalBody) return;
        
        let title = '';
        let icon = '';
        let endpoint = '';
        
        switch(type) {
            case 'guide':
                title = 'Book Tour Guide';
                icon = 'fa-user-tie';
                endpoint = config.apiEndpoints.guides.book;
                break;
            case 'translator':
                title = 'Book Translator';
                icon = 'fa-language';
                endpoint = config.apiEndpoints.translators.hire;
                break;
            case 'accommodation':
                title = 'Book Accommodation';
                icon = 'fa-hotel';
                endpoint = config.apiEndpoints.accommodations.book;
                break;
            case 'destination':
                title = 'Book Destination Tour';
                icon = 'fa-map-marked-alt';
                endpoint = config.apiEndpoints.destinations.book;
                break;
        }
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas ${icon}"></i> ${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="booking-summary professional-summary">
                <h3><i class="fas fa-info-circle"></i> Service Summary</h3>
                <div class="summary-grid">
                    <div class="summary-item">
                        <span class="summary-label">Service:</span>
                        <span class="summary-value">${data.name}</span>
                    </div>
                    ${data.specialty ? `
                        <div class="summary-item">
                            <span class="summary-label">Specialty:</span>
                            <span class="summary-value">${data.specialty}</span>
                        </div>
                    ` : ''}
                    ${data.languages?.length > 0 ? `
                        <div class="summary-item">
                            <span class="summary-label">Languages:</span>
                            <span class="summary-value">${data.languages.join(', ')}</span>
                        </div>
                    ` : ''}
                    <div class="summary-item">
                        <span class="summary-label">Price:</span>
                        <span class="summary-price">${data.price}</span>
                    </div>
                </div>
            </div>
            
            <form class="booking-form professional-form" id="booking-modal-form">
                <input type="hidden" name="service_type" value="${type}">
                <input type="hidden" name="service_id" value="${data.id}">
                <input type="hidden" name="service_name" value="${data.name}">
                <input type="hidden" name="service_price" value="${data.price}">
                
                <div class="form-section">
                    <h3><i class="fas fa-user-circle"></i> Personal Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="booking-name">
                                <i class="fas fa-user"></i> Full Name *
                            </label>
                            <input type="text" id="booking-name" name="name" required 
                                   placeholder="John Doe" value="${getUserData()?.name || ''}">
                        </div>
                        <div class="form-group">
                            <label for="booking-email">
                                <i class="fas fa-envelope"></i> Email Address *
                            </label>
                            <input type="email" id="booking-email" name="email" required 
                                   placeholder="john@example.com" value="${getUserData()?.email || ''}">
                        </div>
                        <div class="form-group">
                            <label for="booking-phone">
                                <i class="fas fa-phone"></i> Phone Number *
                            </label>
                            <input type="tel" id="booking-phone" name="phone" required 
                                   placeholder="+250 788 123 456" value="${getUserData()?.phone || ''}">
                        </div>
                        <div class="form-group">
                            <label for="booking-country">
                                <i class="fas fa-globe"></i> Country
                            </label>
                            <input type="text" id="booking-country" name="country" 
                                   placeholder="Your country" value="${getUserData()?.country || ''}">
                        </div>
                    </div>
                </div>
                
                ${type === 'accommodation' ? generateAccommodationFormFields() : ''}
                ${type === 'destination' ? generateDestinationFormFields() : ''}
                ${['guide', 'translator'].includes(type) ? generateGuideTranslatorFormFields(type) : ''}
                
                <div class="form-section">
                    <h3><i class="fas fa-comment-alt"></i> Additional Information</h3>
                    <div class="form-group">
                        <label for="booking-notes">
                            <i class="fas fa-sticky-note"></i> Special Requirements
                        </label>
                        <textarea id="booking-notes" name="notes" rows="4" 
                                  placeholder="Any special requirements, dietary restrictions, accessibility needs, or specific requests..."></textarea>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-large">
                        <i class="fas fa-check-circle"></i> Confirm Booking
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="window.closeModal()">
                        Cancel
                    </button>
                </div>
                
                <div class="form-footer">
                    <p><i class="fas fa-lock"></i> Your information is secure. We'll contact you to confirm details.</p>
                </div>
            </form>
        `;
        
        modalContainer.classList.add('active');
        setupModalFormValidation('booking-modal-form', endpoint, type, data);
        
        // Close modal handlers
        modalBody.querySelector('.modal-close').addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }
    
    function generateAccommodationFormFields() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        const nextWeekStr = nextWeek.toISOString().split('T')[0];
        
        return `
            <div class="form-section">
                <h3><i class="fas fa-calendar-alt"></i> Stay Details</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="checkin-date">
                            <i class="fas fa-calendar-check"></i> Check-in Date *
                        </label>
                        <input type="date" id="checkin-date" name="checkin_date" required 
                               min="${new Date().toISOString().split('T')[0]}" value="${tomorrowStr}">
                    </div>
                    <div class="form-group">
                        <label for="checkout-date">
                            <i class="fas fa-calendar-times"></i> Check-out Date *
                        </label>
                        <input type="date" id="checkout-date" name="checkout_date" required 
                               min="${tomorrowStr}" value="${nextWeekStr}">
                    </div>
                    <div class="form-group">
                        <label for="guests">
                            <i class="fas fa-users"></i> Number of Guests *
                        </label>
                        <select id="guests" name="guests" required>
                            <option value="">Select guests</option>
                            ${[1,2,3,4,5,6].map(num => `<option value="${num}">${num} ${num === 1 ? 'guest' : 'guests'}</option>`).join('')}
                            <option value="7+">7+ guests</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="rooms">
                            <i class="fas fa-bed"></i> Number of Rooms
                        </label>
                        <select id="rooms" name="rooms">
                            <option value="1">1 room</option>
                            ${[2,3,4,5].map(num => `<option value="${num}">${num} rooms</option>`).join('')}
                        </select>
                    </div>
                </div>
                
                <div class="form-group">
                    <label><i class="fas fa-concierge-bell"></i> Room Type</label>
                    <div class="options-grid">
                        <label class="option-card">
                            <input type="radio" name="room_type" value="standard" checked>
                            <div class="option-content">
                                <i class="fas fa-bed"></i>
                                <span>Standard</span>
                                <small>Comfortable room with basic amenities</small>
                            </div>
                        </label>
                        <label class="option-card">
                            <input type="radio" name="room_type" value="deluxe">
                            <div class="option-content">
                                <i class="fas fa-crown"></i>
                                <span>Deluxe</span>
                                <small>Spacious room with premium amenities</small>
                            </div>
                        </label>
                        <label class="option-card">
                            <input type="radio" name="room_type" value="suite">
                            <div class="option-content">
                                <i class="fas fa-home"></i>
                                <span>Suite</span>
                                <small>Luxurious suite with separate living area</small>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        `;
    }
    
    function generateDestinationFormFields() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        
        return `
            <div class="form-section">
                <h3><i class="fas fa-map-marked-alt"></i> Tour Details</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="tour-date">
                            <i class="fas fa-calendar"></i> Tour Date *
                        </label>
                        <input type="date" id="tour-date" name="tour_date" required 
                               min="${new Date().toISOString().split('T')[0]}" value="${tomorrowStr}">
                    </div>
                    <div class="form-group">
                        <label for="tour-travelers">
                            <i class="fas fa-users"></i> Number of Travelers *
                        </label>
                        <select id="tour-travelers" name="travelers" required>
                            <option value="">Select travelers</option>
                            ${[1,2,3,4,5,6].map(num => `<option value="${num}">${num} ${num === 1 ? 'person' : 'people'}</option>`).join('')}
                            <option value="7+">7+ people</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tour-package">
                            <i class="fas fa-box"></i> Tour Package *
                        </label>
                        <select id="tour-package" name="package" required>
                            <option value="">Select package</option>
                            <option value="basic">Basic Tour</option>
                            <option value="standard">Standard Package</option>
                            <option value="premium">Premium Package</option>
                            <option value="deluxe">Deluxe Package</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="tour-guide">
                            <i class="fas fa-user-tie"></i> Include Guide?
                        </label>
                        <div class="toggle-group">
                            <label class="toggle-switch">
                                <input type="checkbox" name="include_guide">
                                <span class="toggle-slider"></span>
                            </label>
                            <span class="toggle-label">Yes, include a guide</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    function generateGuideTranslatorFormFields(type) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toISOString().split('T')[0];
        
        return `
            <div class="form-section">
                <h3><i class="fas fa-calendar-alt"></i> Service Details</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="service-date">
                            <i class="fas fa-calendar"></i> Start Date *
                        </label>
                        <input type="date" id="service-date" name="start_date" required 
                               min="${new Date().toISOString().split('T')[0]}" value="${tomorrowStr}">
                    </div>
                    <div class="form-group">
                        <label for="service-duration">
                            <i class="fas fa-clock"></i> Duration *
                        </label>
                        <select id="service-duration" name="duration" required>
                            <option value="">Select duration</option>
                            ${[1,2,3,4,5,6,7].map(num => `<option value="${num}">${num} ${num === 1 ? 'day' : 'days'}</option>`).join('')}
                            <option value="8+">8+ days</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="service-location">
                            <i class="fas fa-map-marker-alt"></i> Location *
                        </label>
                        <select id="service-location" name="location" required>
                            <option value="">Select location</option>
                            <option value="kigali">Kigali</option>
                            <option value="volcanoes">Volcanoes National Park</option>
                            <option value="nyungwe">Nyungwe Forest</option>
                            <option value="akagera">Akagera National Park</option>
                            <option value="multiple">Multiple Locations</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="service-group">
                            <i class="fas fa-users"></i> Group Size *
                        </label>
                        <select id="service-group" name="group_size" required>
                            <option value="">Select group size</option>
                            <option value="1">1 person</option>
                            <option value="2">2 people</option>
                            <option value="3-4">3-4 people</option>
                            <option value="5-6">5-6 people</option>
                            <option value="7-10">7-10 people</option>
                            <option value="10+">10+ people</option>
                        </select>
                    </div>
                </div>
                
                ${type === 'guide' ? `
                    <div class="form-group">
                        <label><i class="fas fa-hiking"></i> Activities Needed</label>
                        <div class="checkbox-grid">
                            <label class="checkbox-option">
                                <input type="checkbox" name="activities[]" value="hiking">
                                <span class="checkbox-custom"></span>
                                <span>Hiking</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="activities[]" value="wildlife">
                                <span class="checkbox-custom"></span>
                                <span>Wildlife Viewing</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="activities[]" value="culture">
                                <span class="checkbox-custom"></span>
                                <span>Cultural Tours</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="activities[]" value="photography">
                                <span class="checkbox-custom"></span>
                                <span>Photography</span>
                            </label>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }
    
    function setupModalFormValidation(formId, endpoint, type, originalData) {
        const form = document.getElementById(formId);
        if (!form) return;
        
        const validator = new FormValidator(formId);
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validator.validateAll()) {
                showNotification('Please fix the errors in the form.', 'error');
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            const formData = validator.getValues();
            
            // Calculate total price
            let totalPrice = 0;
            const priceMatch = originalData.price.match(/\$(\d+)/);
            const basePrice = priceMatch ? parseInt(priceMatch[1]) : 0;
            
            if (type === 'accommodation') {
                const checkin = new Date(formData.checkin_date);
                const checkout = new Date(formData.checkout_date);
                const nights = Math.ceil((checkout - checkin) / (1000 * 60 * 60 * 24));
                totalPrice = basePrice * nights;
            } else if (['guide', 'translator'].includes(type)) {
                const duration = parseInt(formData.duration) || 1;
                totalPrice = basePrice * duration;
            } else {
                totalPrice = basePrice;
            }
            
            const bookingData = {
                ...formData,
                service_type: type,
                service_id: originalData.id,
                service_name: originalData.name,
                total_amount: totalPrice,
                booking_reference: generateBookingRef(),
                status: 'pending',
                timestamp: new Date().toISOString()
            };
            
            // Add user info if logged in
            const userData = getUserData();
            if (userData) {
                bookingData.user_id = userData._id;
                bookingData.user_name = userData.name;
                bookingData.user_email = userData.email;
            }
            
            try {
                const result = await submitForm(bookingData, endpoint);
                
                if (result.success) {
                    showNotification(`Booking confirmed! Reference: ${bookingData.booking_reference}. We'll contact you soon.`, 'success');
                    closeModal();
                    
                    if (userData) {
                        setTimeout(() => {
                            showPage('dashboard');
                        }, 1500);
                    }
                } else {
                    throw new Error(result.message || 'Booking failed');
                }
            } catch (error) {
                showNotification(`Booking failed: ${error.message}`, 'error');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ===============================
    // TRIP PLAN MODAL
    // ===============================
    
    function showTripPlanModal() {
        const modalContainer = document.getElementById('modal-container');
        const modalBody = document.querySelector('.modal-body');
        
        if (!modalContainer || !modalBody) return;
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-map-marked-alt"></i> Plan Your Rwanda Adventure</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <form class="trip-plan-form professional-form" id="trip-plan-form">
                <div class="form-section">
                    <h3><i class="fas fa-user-circle"></i> Personal Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="trip-name">
                                <i class="fas fa-user"></i> Full Name *
                            </label>
                            <input type="text" id="trip-name" name="name" required 
                                   placeholder="John Doe" value="${getUserData()?.name || ''}">
                        </div>
                        <div class="form-group">
                            <label for="trip-email">
                                <i class="fas fa-envelope"></i> Email Address *
                            </label>
                            <input type="email" id="trip-email" name="email" required 
                                   placeholder="john@example.com" value="${getUserData()?.email || ''}">
                        </div>
                        <div class="form-group">
                            <label for="trip-phone">
                                <i class="fas fa-phone"></i> Phone Number *
                            </label>
                            <input type="tel" id="trip-phone" name="phone" required 
                                   placeholder="+250 788 123 456" value="${getUserData()?.phone || ''}">
                        </div>
                        <div class="form-group">
                            <label for="trip-country">
                                <i class="fas fa-globe"></i> Country
                            </label>
                            <input type="text" id="trip-country" name="country" 
                                   placeholder="Your country" value="${getUserData()?.country || ''}">
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3><i class="fas fa-calendar-alt"></i> Trip Details</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="trip-start-date">
                                <i class="fas fa-calendar"></i> Start Date *
                            </label>
                            <input type="date" id="trip-start-date" name="start_date" required 
                                   min="${new Date().toISOString().split('T')[0]}">
                        </div>
                        <div class="form-group">
                            <label for="trip-duration">
                                <i class="fas fa-clock"></i> Duration *
                            </label>
                            <select id="trip-duration" name="duration" required>
                                <option value="">Select duration</option>
                                <option value="3-5">3-5 days</option>
                                <option value="6-8">6-8 days</option>
                                <option value="9-12">9-12 days</option>
                                <option value="13+">13+ days</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="trip-travelers">
                                <i class="fas fa-users"></i> Travelers *
                            </label>
                            <select id="trip-travelers" name="travelers" required>
                                <option value="">Select travelers</option>
                                ${[1,2,3,4,5,6].map(num => `<option value="${num}">${num} ${num === 1 ? 'person' : 'people'}</option>`).join('')}
                                <option value="7+">7+ people</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="trip-budget">
                                <i class="fas fa-wallet"></i> Budget Range *
                            </label>
                            <select id="trip-budget" name="budget" required>
                                <option value="">Select budget</option>
                                <option value="budget">Budget ($500-$1000)</option>
                                <option value="midrange">Mid-range ($1000-$2500)</option>
                                <option value="luxury">Luxury ($2500+)</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3><i class="fas fa-heart"></i> Interests</h3>
                    <div class="form-group">
                        <label>What are you interested in?</label>
                        <div class="checkbox-grid">
                            <label class="checkbox-option">
                                <input type="checkbox" name="interests[]" value="gorilla">
                                <span class="checkbox-custom"></span>
                                <span>Gorilla Trekking</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="interests[]" value="culture">
                                <span class="checkbox-custom"></span>
                                <span>Cultural Tours</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="interests[]" value="hiking">
                                <span class="checkbox-custom"></span>
                                <span>Hiking</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="interests[]" value="wildlife">
                                <span class="checkbox-custom"></span>
                                <span>Wildlife Safari</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="interests[]" value="relaxation">
                                <span class="checkbox-custom"></span>
                                <span>Relaxation</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="interests[]" value="photography">
                                <span class="checkbox-custom"></span>
                                <span>Photography</span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3><i class="fas fa-concierge-bell"></i> Services Needed</h3>
                    <div class="form-group">
                        <label>Select services you require:</label>
                        <div class="checkbox-grid">
                            <label class="checkbox-option">
                                <input type="checkbox" name="services[]" value="guide">
                                <span class="checkbox-custom"></span>
                                <span>Tour Guide</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="services[]" value="translator">
                                <span class="checkbox-custom"></span>
                                <span>Translator</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="services[]" value="accommodation">
                                <span class="checkbox-custom"></span>
                                <span>Accommodation</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="services[]" value="transport">
                                <span class="checkbox-custom"></span>
                                <span>Transportation</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="services[]" value="meals">
                                <span class="checkbox-custom"></span>
                                <span>Meals</span>
                            </label>
                            <label class="checkbox-option">
                                <input type="checkbox" name="services[]" value="activities">
                                <span class="checkbox-custom"></span>
                                <span>Activities</span>
                            </label>
                        </div>
                    </div>
                </div>
                
                <div class="form-section">
                    <h3><i class="fas fa-comment-alt"></i> Additional Information</h3>
                    <div class="form-group">
                        <label for="trip-message">
                            <i class="fas fa-sticky-note"></i> Tell us about your dream trip
                        </label>
                        <textarea id="trip-message" name="message" rows="4" 
                                  placeholder="Describe your ideal Rwanda adventure, any special requirements, or specific places you want to visit..."></textarea>
                    </div>
                </div>
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-large">
                        <i class="fas fa-paper-plane"></i> Submit Trip Plan
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="window.closeModal()">
                        Cancel
                    </button>
                </div>
                
                <div class="form-footer">
                    <p><i class="fas fa-info-circle"></i> We'll create a custom itinerary and contact you within 24 hours.</p>
                </div>
            </form>
        `;
        
        modalContainer.classList.add('active');
        
        // Set default date
        const dateInput = document.getElementById('trip-start-date');
        if (dateInput) {
            const nextMonth = new Date();
            nextMonth.setMonth(nextMonth.getMonth() + 1);
            dateInput.value = nextMonth.toISOString().split('T')[0];
        }
        
        // Setup form validation and submission
        const form = document.getElementById('trip-plan-form');
        const validator = new FormValidator('trip-plan-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validator.validateAll()) {
                showNotification('Please fix the errors in the form.', 'error');
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating Your Plan...';
            submitBtn.disabled = true;
            
            const formData = validator.getValues();
            
            // Process arrays
            if (formData.interests) {
                formData.interests = Array.isArray(formData.interests) ? formData.interests : [formData.interests];
            }
            if (formData.services) {
                formData.services = Array.isArray(formData.services) ? formData.services : [formData.services];
            }
            
            // Add metadata
            formData.trip_reference = generateBookingRef();
            formData.timestamp = new Date().toISOString();
            
            // Add user info if logged in
            const userData = getUserData();
            if (userData) {
                formData.user_id = userData._id;
                formData.user_name = userData.name;
                formData.user_email = userData.email;
            }
            
            try {
                const result = await submitForm(formData, config.apiEndpoints.tripPlan);
                
                if (result.success) {
                    showNotification(`Trip plan submitted! Reference: ${formData.trip_reference}. We'll contact you within 24 hours.`, 'success');
                    closeModal();
                } else {
                    throw new Error(result.message || 'Submission failed');
                }
            } catch (error) {
                showNotification(`Failed to submit trip plan: ${error.message}`, 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Close modal handlers
        modalBody.querySelector('.modal-close').addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }
    
    // ===============================
    // PROFESSIONAL AUTH MODAL
    // ===============================
    
    function showAuthModal(type) {
        const modalContainer = document.getElementById('modal-container');
        const modalBody = document.querySelector('.modal-body');
        
        if (!modalContainer || !modalBody) return;
        
        const isLogin = type === 'login';
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-user-circle"></i> ${isLogin ? 'Sign In' : 'Create Account'}</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <form class="auth-form professional-form" id="auth-form">
                ${!isLogin ? `
                    <div class="form-section">
                        <h3><i class="fas fa-id-card"></i> Personal Information</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="auth-firstname">
                                    <i class="fas fa-user"></i> First Name *
                                </label>
                                <input type="text" id="auth-firstname" name="first_name" required 
                                       placeholder="John">
                            </div>
                            <div class="form-group">
                                <label for="auth-lastname">
                                    <i class="fas fa-user"></i> Last Name *
                                </label>
                                <input type="text" id="auth-lastname" name="last_name" required 
                                       placeholder="Doe">
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="form-section">
                    <h3><i class="fas fa-envelope"></i> Account Information</h3>
                    <div class="form-grid">
                        <div class="form-group">
                            <label for="auth-email">
                                <i class="fas fa-at"></i> Email Address *
                            </label>
                            <input type="email" id="auth-email" name="email" required 
                                   placeholder="your.email@example.com">
                        </div>
                        
                        <div class="form-group">
                            <label for="auth-password">
                                <i class="fas fa-lock"></i> Password *
                            </label>
                            <input type="password" id="auth-password" name="password" required 
                                   placeholder="Enter your password">
                            ${!isLogin ? '<small class="password-hint"><i class="fas fa-info-circle"></i> Minimum 8 characters with letters and numbers</small>' : ''}
                        </div>
                        
                        ${!isLogin ? `
                            <div class="form-group">
                                <label for="auth-confirm-password">
                                    <i class="fas fa-lock"></i> Confirm Password *
                                </label>
                                <input type="password" id="auth-confirm-password" name="confirm_password" required 
                                       placeholder="Confirm your password">
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                ${!isLogin ? `
                    <div class="form-section">
                        <h3><i class="fas fa-phone"></i> Contact Details</h3>
                        <div class="form-grid">
                            <div class="form-group">
                                <label for="auth-phone">
                                    <i class="fas fa-phone-alt"></i> Phone Number
                                </label>
                                <input type="tel" id="auth-phone" name="phone" 
                                       placeholder="+250 788 123 456">
                            </div>
                            <div class="form-group">
                                <label for="auth-country">
                                    <i class="fas fa-globe"></i> Country
                                </label>
                                <input type="text" id="auth-country" name="country" 
                                       placeholder="Your country">
                            </div>
                        </div>
                    </div>
                    
                    <div class="form-section">
                        <h3><i class="fas fa-bell"></i> Preferences</h3>
                        <div class="form-group">
                            <div class="checkbox-grid">
                                <label class="checkbox-option">
                                    <input type="checkbox" name="newsletter" checked>
                                    <span class="checkbox-custom"></span>
                                    <span>Subscribe to newsletter</span>
                                </label>
                                <label class="checkbox-option">
                                    <input type="checkbox" name="marketing" checked>
                                    <span class="checkbox-custom"></span>
                                    <span>Receive travel offers</span>
                                </label>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label class="checkbox-option required">
                                <input type="checkbox" name="terms" required>
                                <span class="checkbox-custom"></span>
                                <span>I agree to the Terms & Conditions and Privacy Policy *</span>
                            </label>
                        </div>
                    </div>
                ` : `
                    <div class="form-options">
                        <label class="checkbox-option">
                            <input type="checkbox" name="remember">
                            <span class="checkbox-custom"></span>
                            <span>Remember me</span>
                        </label>
                        <a href="#" class="forgot-password">Forgot password?</a>
                    </div>
                `}
                
                <div class="form-actions">
                    <button type="submit" class="btn btn-primary btn-large">
                        <i class="fas fa-sign-in-alt"></i> ${isLogin ? 'Sign In' : 'Create Account'}
                    </button>
                    <button type="button" class="btn btn-secondary" onclick="window.closeModal()">
                        Cancel
                    </button>
                </div>
            </form>
            
            <div class="auth-footer">
                <p>
                    ${isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
                    <a href="#" class="auth-switch">${isLogin ? 'Sign Up' : 'Sign In'}</a>
                </p>
            </div>
        `;
        
        modalContainer.classList.add('active');
        
        // Setup form validation and submission
        const form = document.getElementById('auth-form');
        const validator = new FormValidator('auth-form');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validator.validateAll()) {
                showNotification('Please fix the errors in the form.', 'error');
                return;
            }
            
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            submitBtn.disabled = true;
            
            const formData = validator.getValues();
            
            // Validate passwords match for registration
            if (!isLogin) {
                if (formData.password !== formData.confirm_password) {
                    showNotification('Passwords do not match. Please check and try again.', 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                if (!validatePassword(formData.password)) {
                    showNotification('Password must be at least 8 characters with letters and numbers.', 'error');
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    return;
                }
                
                // Combine first and last name
                formData.name = `${formData.first_name} ${formData.last_name}`;
                delete formData.first_name;
                delete formData.last_name;
                delete formData.confirm_password;
            }
            
            try {
                const endpoint = isLogin ? config.apiEndpoints.auth.login : config.apiEndpoints.auth.register;
                const result = await submitForm(formData, endpoint);
                
                if (result.success && result.data) {
                    const { token, user } = result.data;
                    
                    // Save token and user data
                    localStorage.setItem('authToken', token);
                    saveUserData(user);
                    updateAuthUI(true, user);
                    
                    showNotification(`Welcome ${user.name}!`, 'success');
                    
                    // Reset form
                    form.reset();
                    closeModal();
                    
                    // Redirect to dashboard
                    setTimeout(() => {
                        showPage('dashboard');
                    }, 1000);
                } else {
                    throw new Error(result.message || 'Authentication failed');
                }
            } catch (error) {
                showNotification(`Authentication failed: ${error.message}`, 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
        
        // Switch between login/register
        const switchLink = modalBody.querySelector('.auth-switch');
        if (switchLink) {
            switchLink.addEventListener('click', (e) => {
                e.preventDefault();
                showAuthModal(isLogin ? 'register' : 'login');
            });
        }
        
        // Close modal handlers
        modalBody.querySelector('.modal-close').addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }
    
    // ===============================
    // EVENT LISTENERS
    // ===============================
    
    function setupEventListeners() {
        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
        
        // Plan trip button in footer
        document.querySelectorAll('.plan-trip-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                showTripPlanModal();
            });
        });
    }
    
    // ===============================
    // FORM VALIDATION SETUP
    // ===============================
    
    function setupFormValidation() {
        // Add real-time validation to email inputs
        document.querySelectorAll('input[type="email"]').forEach(input => {
            input.addEventListener('blur', function() {
                if (this.value && !validateEmail(this.value)) {
                    this.classList.add('error');
                    
                    // Show error message
                    let errorElement = this.nextElementSibling;
                    if (!errorElement || !errorElement.classList.contains('field-error')) {
                        errorElement = document.createElement('div');
                        errorElement.className = 'field-error';
                        this.parentNode.appendChild(errorElement);
                    }
                    errorElement.textContent = 'Please enter a valid email address';
                } else {
                    this.classList.remove('error');
                    
                    // Remove error message
                    const errorElement = this.nextElementSibling;
                    if (errorElement && errorElement.classList.contains('field-error')) {
                        errorElement.remove();
                    }
                }
            });
            
            input.addEventListener('input', function() {
                this.classList.remove('error');
                
                // Remove error message
                const errorElement = this.nextElementSibling;
                if (errorElement && errorElement.classList.contains('field-error')) {
                    errorElement.remove();
                }
            });
        });
    }
    
    // ===============================
    // PRICING DETAILS
    // ===============================
    
    function showPricingDetailsModal(type) {
        const modalContainer = document.getElementById('modal-container');
        const modalBody = document.querySelector('.modal-body');
        
        if (!modalContainer || !modalBody) return;
        
        const isGuide = type === 'guide';
        const title = isGuide ? 'Tour Guide Pricing Details' : 'Translator Pricing Details';
        const icon = isGuide ? 'fa-user-tie' : 'fa-language';
        const data = isGuide ? guidesData : translatorsData;
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas ${icon}"></i> ${title}</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="pricing-explanation">
                <h3><i class="fas fa-calculator"></i> Price Calculation Formula</h3>
                <div class="formula-card">
                    <div class="formula-item">
                        <span class="formula-label">Base Price:</span>
                        <span class="formula-value">${isGuide ? '$100/day' : '$80/day'}</span>
                    </div>
                    <div class="formula-item">
                        <span class="formula-label">Experience Bonus:</span>
                        <span class="formula-value">+5% per year</span>
                    </div>
                    <div class="formula-item">
                        <span class="formula-label">Language Bonus:</span>
                        <span class="formula-value">+2% per language</span>
                    </div>
                    <div class="formula-item">
                        <span class="formula-label">Price Range:</span>
                        <span class="formula-value price-range">${isGuide ? '$100 - $200/day' : '$80 - $150/day'}</span>
                    </div>
                </div>
                
                <div class="example-calculation">
                    <h4><i class="fas fa-chart-line"></i> Example Calculation</h4>
                    <p>A ${isGuide ? 'guide' : 'translator'} with 5 years experience and 3 languages:</p>
                    <div class="calculation-steps">
                        <div class="step">$100 × (1 + (5 × 0.05)) = $125</div>
                        <div class="step">$125 × (1 + (3 × 0.02)) = $132.50</div>
                        <div class="step final">Final Price: <strong>$132.50/day</strong></div>
                    </div>
                </div>
            </div>
            
            <div class="detailed-pricing">
                <h3><i class="fas fa-list-alt"></i> Individual Pricing</h3>
                <div class="pricing-table-container">
                    <table class="pricing-table">
                        <thead>
                            <tr>
                                <th>Professional</th>
                                <th>Experience</th>
                                <th>Languages</th>
                                <th>Certifications</th>
                                <th>Daily Rate</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.map(item => `
                                <tr>
                                    <td>
                                        <div class="professional-info">
                                            <strong>${item.name}</strong>
                                            <small>${item.specialty}</small>
                                        </div>
                                    </td>
                                    <td>${item.experienceYears} years</td>
                                    <td>${item.languageCount}</td>
                                    <td>${item.certifications.length}</td>
                                    <td class="price-cell">
                                        <strong>${item.price}</strong>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            
            <div class="modal-footer">
                <div class="footer-note">
                    <i class="fas fa-info-circle"></i> All prices are in USD. Final quote may vary based on specific requirements.
                </div>
                <button class="btn btn-primary" onclick="window.closeModal()">
                    <i class="fas fa-check"></i> Got It
                </button>
            </div>
        `;
        
        modalContainer.classList.add('active');
        
        // Close modal handlers
        modalBody.querySelector('.modal-close').addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }
    
    function addPricingDetailsButtons() {
        // Add to guide page header
        const guideHeader = document.querySelector('#guides .page-header .container');
        if (guideHeader) {
            const pricingBtn = document.createElement('button');
            pricingBtn.className = 'btn btn-secondary pricing-details-btn';
            pricingBtn.innerHTML = '<i class="fas fa-info-circle"></i> View Pricing Details';
            pricingBtn.style.marginTop = '10px';
            pricingBtn.onclick = () => showPricingDetailsModal('guide');
            guideHeader.appendChild(pricingBtn);
        }
        
        // Add to translator page header
        const translatorHeader = document.querySelector('#translators .page-header .container');
        if (translatorHeader) {
            const pricingBtn = document.createElement('button');
            pricingBtn.className = 'btn btn-secondary pricing-details-btn';
            pricingBtn.innerHTML = '<i class="fas fa-info-circle"></i> View Pricing Details';
            pricingBtn.style.marginTop = '10px';
            pricingBtn.onclick = () => showPricingDetailsModal('translator');
            translatorHeader.appendChild(pricingBtn);
        }
    }
    
    // ===============================
    // SOCIAL SHARING
    // ===============================
    
    function setupSocialSharing() {
        // Add social sharing to blog cards
        document.querySelectorAll('.blog-card').forEach(card => {
            const shareBtn = document.createElement('button');
            shareBtn.className = 'btn btn-secondary share-btn';
            shareBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share';
            shareBtn.style.marginTop = '10px';
            
            shareBtn.addEventListener('click', () => {
                const title = card.querySelector('h3').textContent;
                const url = window.location.href;
                showSocialShareModal(title, url);
            });
            
            const content = card.querySelector('.blog-content');
            if (content) {
                content.appendChild(shareBtn);
            }
        });
    }
    
    function showSocialShareModal(title, url) {
        const modalContainer = document.getElementById('modal-container');
        const modalBody = document.querySelector('.modal-body');
        
        if (!modalContainer || !modalBody) return;
        
        modalBody.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-share-alt"></i> Share</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="share-content">
                <p>Share "${title}"</p>
                
                <div class="share-buttons">
                    <button class="share-btn facebook">
                        <i class="fab fa-facebook-f"></i> Facebook
                    </button>
                    <button class="share-btn twitter">
                        <i class="fab fa-twitter"></i> Twitter
                    </button>
                    <button class="share-btn linkedin">
                        <i class="fab fa-linkedin-in"></i> LinkedIn
                    </button>
                    <button class="share-btn whatsapp">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </button>
                </div>
                
                <div class="share-link">
                    <label>Or copy the link:</label>
                    <div class="copy-container">
                        <input type="text" class="share-url" value="${url}" readonly>
                        <button class="btn btn-primary copy-btn">
                            <i class="fas fa-copy"></i> Copy
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        modalContainer.classList.add('active');
        
        // Social sharing functionality
        modalBody.querySelector('.facebook').addEventListener('click', () => {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        });
        
        modalBody.querySelector('.twitter').addEventListener('click', () => {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        });
        
        modalBody.querySelector('.linkedin').addEventListener('click', () => {
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        });
        
        modalBody.querySelector('.whatsapp').addEventListener('click', () => {
            window.open(`https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`, '_blank');
        });
        
        // Copy link functionality
        const copyBtn = modalBody.querySelector('.copy-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', () => {
                const urlInput = modalBody.querySelector('.share-url');
                urlInput.select();
                document.execCommand('copy');
                
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                }, 2000);
            });
        }
        
        // Close modal handlers
        modalBody.querySelector('.modal-close').addEventListener('click', closeModal);
        modalContainer.addEventListener('click', (e) => {
            if (e.target === modalContainer) closeModal();
        });
    }
    
    // ===============================
    // ACCESSIBILITY
    // ===============================
    
    function enhanceAccessibility() {
        // Add aria labels to buttons
        document.querySelectorAll('button').forEach(button => {
            if (!button.getAttribute('aria-label')) {
                const text = button.textContent.trim();
                if (text) {
                    button.setAttribute('aria-label', text);
                }
            }
        });
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    // ===============================
    // PERFORMANCE OPTIMIZATION
    // ===============================
    
    function optimizePerformance() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.classList.remove('lazy');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Debounce resize events
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                // Handle responsive behavior
            }, 250);
        });
    }
    
    // ===============================
    // OFFLINE SUPPORT
    // ===============================
    
    function setupOfflineSupport() {
        // Check online status
        window.addEventListener('online', () => {
            showNotification('Back online. Syncing any pending data...', 'info');
        });
        
        window.addEventListener('offline', () => {
            showNotification('You are offline. Some features may be limited.', 'warning');
        });
    }
    
    // ===============================
    // ANALYTICS
    // ===============================
    
    function initAnalytics() {
        // Track page views
        const trackPageView = (page) => {
            if (config.debug) {
                console.log('Page view:', page);
            }
        };
        
        // Track user actions
        const trackEvent = (category, action, label) => {
            if (config.debug) {
                console.log('Event:', { category, action, label });
            }
        };
        
        // Expose to window for easy access
        window.trackEvent = trackEvent;
    }
    
    // ===============================
    // DASHBOARD & ADMIN CONTENT
    // ===============================
    
    async function loadDashboardContent() {
        // Simplified dashboard implementation
        const dashboardPage = document.getElementById('dashboard');
        if (!dashboardPage) return;
        
        // Load user bookings
        try {
            const response = await fetchData(config.apiEndpoints.booking.user);
            if (response && response.success) {
                // Update dashboard with user data
                const userData = getUserData();
                if (userData) {
                    const userName = document.getElementById('dashboard-user-name');
                    const userEmail = document.getElementById('dashboard-user-email');
                    if (userName) userName.textContent = userData.name;
                    if (userEmail) userEmail.textContent = userData.email;
                }
            }
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        }
    }
    
    async function loadAdminDashboard() {
        // Simplified admin implementation
        const adminPage = document.getElementById('admin');
        if (!adminPage) return;
        
        // Load admin stats
        try {
            const response = await fetchData(config.apiEndpoints.admin.stats);
            if (response && response.success) {
                // Update admin dashboard with stats
            }
        } catch (error) {
            console.error('Failed to load admin data:', error);
        }
    }
    
    // ===============================
    // PROFESSIONAL STYLES
    // ===============================
    
    function addProfessionalStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Professional Form Styles */
            .professional-form {
                max-width: 800px;
                margin: 0 auto;
            }
            
            .form-section {
                background: white;
                border-radius: 12px;
                padding: 25px;
                margin-bottom: 20px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.08);
                border: 1px solid #eaeaea;
            }
            
            .form-section h3 {
                color: #2c3e50;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 2px solid #f0f0f0;
                font-size: 1.1rem;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .form-section h3 i {
                color: #FF9800;
            }
            
            .form-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
                margin-bottom: 20px;
            }
            
            .form-group {
                margin-bottom: 20px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #444;
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .form-group label i {
                color: #666;
                width: 16px;
            }
            
            .form-group input,
            .form-group select,
            .form-group textarea {
                width: 100%;
                padding: 12px 15px;
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                font-size: 1rem;
                transition: all 0.3s ease;
                background: white;
            }
            
            .form-group input:focus,
            .form-group select:focus,
            .form-group textarea:focus {
                outline: none;
                border-color: #FF9800;
                box-shadow: 0 0 0 3px rgba(255, 152, 0, 0.1);
            }
            
            .form-group input.error,
            .form-group select.error,
            .form-group textarea.error {
                border-color: #dc2626;
                background: #fff5f5;
            }
            
            .field-error {
                color: #dc2626;
                font-size: 0.85rem;
                margin-top: 5px;
                padding: 5px 10px;
                background: #fee;
                border-radius: 4px;
            }
            
            /* Checkbox Grid */
            .checkbox-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 12px;
                margin-top: 10px;
            }
            
            .checkbox-option {
                display: flex;
                align-items: center;
                gap: 10px;
                cursor: pointer;
                padding: 12px;
                border-radius: 8px;
                border: 2px solid #e0e0e0;
                transition: all 0.3s ease;
            }
            
            .checkbox-option:hover {
                border-color: #FF9800;
                background: #FFF8E1;
            }
            
            .checkbox-option input[type="checkbox"] {
                display: none;
            }
            
            .checkbox-custom {
                width: 20px;
                height: 20px;
                border: 2px solid #ccc;
                border-radius: 4px;
                position: relative;
                transition: all 0.3s ease;
                flex-shrink: 0;
            }
            
            .checkbox-option input[type="checkbox"]:checked + .checkbox-custom {
                background: #FF9800;
                border-color: #FF9800;
            }
            
            .checkbox-option input[type="checkbox"]:checked + .checkbox-custom::after {
                content: '✓';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 12px;
                font-weight: bold;
            }
            
            .checkbox-option.required {
                border-color: #FF9800;
                background: #FFF8E1;
            }
            
            /* Option Cards (Radio buttons) */
            .options-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
                gap: 15px;
                margin-top: 10px;
            }
            
            .option-card {
                border: 2px solid #e0e0e0;
                border-radius: 8px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-align: center;
            }
            
            .option-card:hover {
                border-color: #FF9800;
                background: #FFF8E1;
            }
            
            .option-card input[type="radio"] {
                display: none;
            }
            
            .option-card input[type="radio"]:checked + .option-content {
                color: #FF9800;
            }
            
            .option-card input[type="radio"]:checked + .option-content {
                border-color: #FF9800;
                background: #FFF8E1;
            }
            
            .option-content {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 8px;
            }
            
            .option-content i {
                font-size: 1.5rem;
                color: #666;
            }
            
            .option-card input[type="radio"]:checked + .option-content i {
                color: #FF9800;
            }
            
            .option-content span {
                font-weight: 600;
            }
            
            .option-content small {
                color: #888;
                font-size: 0.8rem;
            }
            
            /* Toggle Switch */
            .toggle-group {
                display: flex;
                align-items: center;
                gap: 10px;
                margin-top: 10px;
            }
            
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 50px;
                height: 24px;
            }
            
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
                border-radius: 24px;
            }
            
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 16px;
                width: 16px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
                border-radius: 50%;
            }
            
            input:checked + .toggle-slider {
                background-color: #FF9800;
            }
            
            input:checked + .toggle-slider:before {
                transform: translateX(26px);
            }
            
            /* Booking Summary */
            .professional-summary {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                border-radius: 12px;
                padding: 20px;
                margin-bottom: 25px;
            }
            
            .summary-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .summary-item {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .summary-label {
                font-size: 0.9rem;
                opacity: 0.9;
            }
            
            .summary-value {
                font-weight: 600;
                font-size: 1.1rem;
            }
            
            .summary-price {
                font-weight: bold;
                font-size: 1.2rem;
                color: #FFD700;
            }
            
            /* Form Actions */
            .form-actions {
                display: flex;
                gap: 15px;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #eaeaea;
            }
            
            .btn-large {
                padding: 15px 30px;
                font-size: 1.1rem;
            }
            
            /* Form Footer */
            .form-footer {
                margin-top: 20px;
                padding: 15px;
                background: #f8f9fa;
                border-radius: 8px;
                border-left: 4px solid #FF9800;
            }
            
            .form-footer p {
                color: #666;
                font-size: 0.9rem;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            /* Modal Styles */
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #f0f0f0;
            }
            
            .modal-header h2 {
                color: #2c3e50;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.8rem;
                color: #666;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .modal-close:hover {
                color: #333;
            }
            
            /* Remove black buttons and fix subscribe button */
            .btn {
                background: linear-gradient(135deg, #FF9800, #FF5722);
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
            }
            
            .btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(255, 152, 0, 0.3);
            }
            
            .btn-primary {
                background: linear-gradient(135deg, #2E7D32, #2E7D32);
            }
            
            .btn-secondary {
                background: #6c757d;
            }
            
            .btn-secondary:hover {
                background: #5a6268;
                box-shadow: 0 4px 12px rgba(108, 117, 125, 0.3);
            }
            
            /* Fix footer subscribe button */
            .footer-newsletter-form button {
                background: #FF9800 !important;
                color: white !important;
                border: none !important;
            }
            
            .footer-newsletter-form button:hover {
                background: #FF5722 !important;
            }
            
            /* Password Hint */
            .password-hint {
                color: #666;
                font-size: 0.85rem;
                margin-top: 5px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            /* Auth Options */
            .form-options {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin: 20px 0;
            }
            
            .forgot-password {
                color: #3b82f6;
                text-decoration: none;
                font-size: 0.9rem;
            }
            
            .forgot-password:hover {
                text-decoration: underline;
            }
            
            .auth-footer {
                text-align: center;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #eaeaea;
            }
            
            .auth-switch {
                color: #3b82f6;
                text-decoration: none;
                font-weight: 600;
            }
            
            .auth-switch:hover {
                text-decoration: underline;
            }
            
            /* Share Modal */
            .share-buttons {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
                gap: 10px;
                margin: 20px 0;
            }
            
            .share-btn {
                padding: 10px;
                border: none;
                border-radius: 8px;
                color: white;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                font-size: 0.9rem;
            }
            
            .share-btn.facebook {
                background: #4267B2;
            }
            
            .share-btn.twitter {
                background: #1DA1F2;
            }
            
            .share-btn.linkedin {
                background: #0077B5;
            }
            
            .share-btn.whatsapp {
                background: #25D366;
            }
            
            .copy-container {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            
            .share-url {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 0.9rem;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .form-grid {
                    grid-template-columns: 1fr;
                }
                
                .checkbox-grid {
                    grid-template-columns: 1fr;
                }
                
                .options-grid {
                    grid-template-columns: 1fr;
                }
                
                .form-actions {
                    flex-direction: column;
                }
                
                .form-actions button {
                    width: 100%;
                }
            }
            
            /* Success button state */
            .btn.success {
                background: linear-gradient(135deg, #4CAF50, #2E7D32) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===============================
    // EXPORT FUNCTIONS TO WINDOW
    // ===============================
    
    window.closeModal = closeModal;
    window.showNotification = showNotification;
    window.showAuthModal = showAuthModal;
    window.showTripPlanModal = showTripPlanModal;
    window.showPricingDetailsModal = showPricingDetailsModal;
    window.showBookingModal = showBookingModal;
    
    // ===============================
    // INITIALIZE APPLICATION
    // ===============================
    
    domReady(initApplication);
    
    console.log('Adventure HillBound Professional Edition loaded successfully!');
})();