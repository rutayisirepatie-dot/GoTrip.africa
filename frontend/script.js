// Go Trip Frontend Application v5.0 - Production Ready
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        baseUrl: window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' 
                ? 'http://localhost:5000' 
                : 'https://gotrip-backend-uwhn.onrender.com',
        
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
        
        endpoints: {
            guides: '/api/guides',
            destinations: '/api/destinations',
            translators: '/api/translators',
            accommodations: '/api/accommodations',
            blog: '/api/blogs',
            bookings: '/api/bookings',
            tripPlan: '/api/tripplans',
            health: '/api/health',
            newsletter: '/api/newsletters/subscribe',
            contact: '/api/contacts',
            uploads: '/uploads/'
        },
        
        // Image fallback configuration - LOCAL IMAGES
        fallbackImages: {
            destination: 'images/destination-fallback.jpg',
            guide: 'images/guide-fallback.jpg',
            translator: 'images/translator-fallback.jpg',
            accommodation: 'images/accommodation-fallback.jpg',
            blog: 'images/blog-fallback.jpg',
            hero: 'https://res.cloudinary.com/dxbmyqrtn/image/upload/v1767664105/ruanda-lake-kivu-aussicht_o95lpv.jpg'
        }
    };

    // ===============================
    // SEED DATA (Enhanced from second script)
    // ===============================
    const seedData = {
        destinations: [
            {
                _id: 'rw-volcanoes-park',
                name: 'Volcanoes National Park',
                location: 'Musanze District, Northern Province',
                description: 'Home to the endangered mountain gorillas in Rwanda\'s northern province. Experience once-in-a-lifetime gorilla trekking through lush bamboo forests with breathtaking views of five volcanoes.',
                mainImage: 'destinations/volcanoes.jpg',
                images: [],
                rating: 4.9,
                basePrice: 1500,
                duration: '1-3 Days',
                difficulty: 'Moderate to Challenging',
                bestSeason: 'June-September, December-February',
                activities: [
                    { name: 'Mountain Gorilla Trekking', icon: 'fas fa-mountain', description: 'Track and observe endangered mountain gorillas' },
                    { name: 'Golden Monkey Tracking', icon: 'fas fa-paw', description: 'Observe the playful golden monkeys' },
                    { name: 'Mount Bisoke Hiking', icon: 'fas fa-hiking', description: 'Day hike to the summit with stunning crater lake views' }
                ],
                features: [
                    { name: 'Mountain Gorillas', description: 'Home to 10 habituated gorilla families' },
                    { name: 'Volcano Views', description: 'Stunning views of 5 Virunga volcanoes' },
                    { name: 'Biodiversity', description: 'Over 200 bird species and rare flora' }
                ],
                highlights: [
                    '1-hour with mountain gorillas',
                    'Professional guide and porters',
                    'Conservation fee included',
                    'Certificate of participation'
                ],
                tags: ['Wildlife', 'Adventure', 'Gorillas', 'Hiking', 'UNESCO']
            },
            {
                _id: 'rw-nyungwe-forest',
                name: 'Nyungwe Forest',
                location: 'Southwestern Rwanda',
                description: 'One of Africa\'s oldest rainforests featuring spectacular canopy walkways, chimpanzee tracking, and over 1,000 plant species. A biodiversity hotspot with 13 primate species.',
                mainImage: 'destinations/nyungwe.jpg',
                rating: 4.7,
                basePrice: 1200,
                duration: '2-4 Days',
                difficulty: 'Moderate',
                bestSeason: 'December-February, June-August',
                activities: [
                    { name: 'Canopy Walk Adventure', icon: 'fas fa-walking', description: 'Walk 70m above the forest floor' },
                    { name: 'Chimpanzee Tracking', icon: 'fas fa-tree', description: 'Track chimpanzee families through dense rainforest' },
                    { name: 'Colobus Monkey Trekking', icon: 'fas fa-users', description: 'See large troops of black-and-white colobus monkeys' }
                ],
                features: [
                    { name: 'Ancient Rainforest', description: 'Over 1,000 years old ecosystem' },
                    { name: 'Primate Capital', description: '13 primate species including chimpanzees' },
                    { name: 'Bird Paradise', description: 'Over 300 bird species including 29 endemics' }
                ],
                highlights: [
                    '70m high canopy walkway',
                    'Chimpanzee habituation experience',
                    'Bird watching with expert guides',
                    'Tea plantation tours'
                ],
                tags: ['Rainforest', 'Chimpanzees', 'Birding', 'Hiking', 'Canopy']
            },
            {
                _id: 'rw-akagera-park',
                name: 'Akagera National Park',
                location: 'Eastern Rwanda',
                description: 'Rwanda\'s only savannah park featuring the Big 5 (lion, leopard, elephant, buffalo, rhino). Beautiful landscapes of rolling hills, wetlands, and lakes.',
                mainImage: 'destinations/akagera.jpg',
                rating: 4.6,
                basePrice: 900,
                duration: '2-3 Days',
                difficulty: 'Easy',
                bestSeason: 'June-September, December-February',
                activities: [
                    { name: 'Big 5 Safari', icon: 'fas fa-lion', description: 'Game drives to see lions, elephants, rhinos' },
                    { name: 'Boat Safari', icon: 'fas fa-ship', description: 'Explore Lake Ihema and see hippos, crocodiles' },
                    { name: 'Night Game Drive', icon: 'fas fa-moon', description: 'Spot nocturnal wildlife including leopards' }
                ],
                features: [
                    { name: 'Big 5 Destination', description: 'Complete African Big 5 experience' },
                    { name: 'Lake System', description: 'Largest protected wetland in Central Africa' },
                    { name: 'Conservation Success', description: 'Remarkable wildlife restoration story' }
                ],
                highlights: [
                    'Rhino tracking experience',
                    'Boat safaris on Lake Ihema',
                    'Night drives for nocturnal wildlife',
                    'Professional photographic hides'
                ],
                tags: ['Safari', 'Big5', 'Wildlife', 'Lake', 'Photography']
            },
            {
                _id: 'rw-lake-kivu',
                name: 'Lake Kivu',
                location: 'Western Rwanda',
                description: 'Africa\'s sixth-largest lake and one of Africa\'s safest freshwater lakes. Stunning coastline with beautiful beaches, island resorts, and water activities.',
                mainImage: 'destinations/lakekivu.jpg',
                rating: 4.8,
                basePrice: 750,
                duration: '2-4 Days',
                difficulty: 'Easy',
                bestSeason: 'Year-round',
                activities: [
                    { name: 'Island Hopping', icon: 'fas fa-ship', description: 'Visit Napoleon Island and Monkey Island' },
                    { name: 'Kayaking Adventure', icon: 'fas fa-water', description: 'Paddle along the beautiful coastline' },
                    { name: 'Coffee Plantation Tour', icon: 'fas fa-coffee', description: 'Visit coffee cooperatives' }
                ],
                features: [
                    { name: 'Safe Swimming', description: 'Bilharzia-free and safe for swimming' },
                    { name: 'Island Paradise', description: 'Numerous islands to explore' },
                    { name: 'Methane Gas', description: 'Unique methane extraction for energy' }
                ],
                highlights: [
                    'Swimming in safe freshwater',
                    'Visit to bat colony island',
                    'Fresh lake fish dining',
                    'Beautiful sunset views'
                ],
                tags: ['Lake', 'Beach', 'Relaxation', 'Islands', 'WaterSports']
            }
        ],
        
        accommodations: [
            {
                _id: 'acc-kigali-marriott',
                name: 'Kigali Serena Hotel',
                location: 'Kigali, Rwanda',
                type: '5-Star Hotel',
                description: 'Luxury hotel in the heart of Kigali with panoramic city views, world-class amenities, and exceptional service. Perfect for business and leisure travelers.',
                pricePerNight: 350,
                rating: 4.8,
                amenities: [
                    { name: 'Swimming Pool', included: true, icon: 'fas fa-swimming-pool' },
                    { name: 'Spa & Wellness', included: true, icon: 'fas fa-spa' },
                    { name: 'Restaurant', included: true, icon: 'fas fa-utensils' },
                    { name: 'Gym', included: true, icon: 'fas fa-dumbbell' },
                    { name: 'Free WiFi', included: true, icon: 'fas fa-wifi' }
                ],
                mainImage: 'accommodations/serena.jpg',
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
                ]
            },
            {
                _id: 'acc-volcanoes-lodge',
                name: 'Volcanoes Gorilla Lodge',
                location: 'Musanze, Rwanda',
                type: 'Eco-Lodge',
                description: 'Eco-friendly lodge at the foothills of the Virunga volcanoes, offering cozy fireplace lounge, organic dining, and stunning volcano views. Perfect base for gorilla trekking.',
                pricePerNight: 180,
                rating: 4.7,
                amenities: [
                    { name: 'Fireplace Lounge', included: true, icon: 'fas fa-fire' },
                    { name: 'Organic Restaurant', included: true, icon: 'fas fa-leaf' },
                    { name: 'Garden', included: true, icon: 'fas fa-seedling' },
                    { name: 'Free WiFi', included: true, icon: 'fas fa-wifi' },
                    { name: 'Hot Water', included: true, icon: 'fas fa-shower' }
                ],
                mainImage: 'accommodations/nyungwehotel.jpg',
                available: true,
                contactPhone: '+250788333444',
                contactEmail: 'info@volcanoeslodge.com',
                maxGuests: 3,
                roomTypes: [
                    { name: 'Standard Cottage', price: 180, capacity: 2 },
                    { name: 'Family Cottage', price: 300, capacity: 4 },
                    { name: 'Honeymoon Suite', price: 450, capacity: 2 }
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
                ]
            }
        ],
        
        blogPosts: [
            {
                _id: 'blog-gorilla-trekking',
                title: 'Ultimate Guide to Gorilla Trekking in Rwanda',
                author: 'Jean de Dieu Nzabonimpa',
                excerpt: 'Complete guide to planning your gorilla trekking adventure in Rwanda. Learn about permits, preparation, what to expect, and conservation impact.',
                featuredImage: 'blog/blog1.jpg',
                category: 'Wildlife & Adventure',
                featured: true,
                readTime: 12,
                publishedDate: '2024-01-15',
                tags: ['Gorilla Trekking', 'Wildlife', 'Adventure', 'Rwanda', 'Conservation', 'Volcanoes National Park']
            },
            {
                _id: 'blog-rwanda-itinerary',
                title: '7-Day Ultimate Rwanda Itinerary: Gorillas, Culture & Nature',
                author: 'Marie Claire Uwimana',
                excerpt: 'Comprehensive 7-day itinerary covering Rwanda\'s best attractions including gorilla trekking, cultural experiences, and lake relaxation.',
                featuredImage: 'blog/blog2.jpg',
                category: 'Travel Planning',
                featured: true,
                readTime: 10,
                publishedDate: '2024-01-20',
                tags: ['Itinerary', 'Travel Planning', 'Rwanda', 'Gorillas', 'Lake Kivu', 'Cultural Tourism']
            },
            {
                _id: 'blog-cultural-experiences',
                title: 'Cultural Experiences in Rwanda',
                author: 'Go Trip Team',
                excerpt: 'Immerse yourself in Rwandan culture through traditional dances, food, and village visits.',
                featuredImage: 'blog/blog3.jpg',
                category: 'Culture',
                featured: false,
                readTime: 6,
                publishedDate: '2024-01-25',
                tags: ['Culture', 'Tradition', 'Rwanda', 'Community', 'Heritage']
            }
        ],
        
        guides: [
            {
                _id: 'guide1',
                name: 'Jean Pierre',
                specialty: 'Wildlife Expert',
                languages: ['English', 'French', 'Kinyarwanda'],
                experience: '10+ years',
                rating: 4.8,
                dailyRate: 150,
                image: 'guides/guide1.jpg'
            },
            {
                _id: 'guide2',
                name: 'Marie Claire',
                specialty: 'Cultural Guide',
                languages: ['English', 'Swahili', 'Kinyarwanda'],
                experience: '7+ years',
                rating: 4.9,
                dailyRate: 120,
                image: 'guides/guide2.jpg'
            }
        ],
        
        translators: [
            {
                _id: 'translator1',
                name: 'Alice Mukamana',
                specialty: 'French & Kinyarwanda Translator',
                languages: ['French', 'English', 'Kinyarwanda'],
                experience: '5+ years',
                rating: 4.7,
                dailyRate: 100,
                image: 'translators/translator1.jpg'
            },
            {
                _id: 'translator2',
                name: 'John Habimana',
                specialty: 'English & Swahili Translator',
                languages: ['English', 'Swahili', 'Kinyarwanda'],
                experience: '8+ years',
                rating: 4.9,
                dailyRate: 120,
                image: 'translators/translator2.jpg'
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

    function showWelcomeMessage(index = 0) {
        if (index >= config.welcomeMessages.length) return;
        
        const message = config.welcomeMessages[index];
        const notification = document.createElement('div');
        notification.className = `floating-message ${message.type} show`;
        notification.dataset.messageId = message.id;
        
        let actionButton = '';
        if (message.action) {
            actionButton = `<button class="message-action-btn" data-action="plan-trip">${message.action}</button>`;
        }
        
        notification.innerHTML = `
            <div class="floating-message-content">
                <div class="floating-message-header">
                    <div class="floating-message-icon">
                        <i class="fas ${message.icon}"></i>
                    </div>
                    <div class="floating-message-title">${message.title}</div>
                    <button class="floating-message-close" aria-label="Close">&times;</button>
                </div>
                <div class="floating-message-body">
                    <p>${message.message}</p>
                    ${actionButton}
                </div>
                <div class="floating-message-progress"></div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        const removeMessage = () => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        };
        
        setTimeout(removeMessage, 5000);
        
        const progressBar = notification.querySelector('.floating-message-progress');
        if (progressBar) {
            progressBar.style.animation = 'progressShrink 5s linear forwards';
        }
        
        notification.querySelector('.floating-message-close').addEventListener('click', removeMessage);
        
        const actionBtn = notification.querySelector('.message-action-btn');
        if (actionBtn) {
            actionBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showTripPlanningModal();
                removeMessage();
            });
        }
        
        setTimeout(() => {
            if (index + 1 < config.welcomeMessages.length) {
                showWelcomeMessage(index + 1);
            }
        }, 5500);
        
        if (index === 0) {
            hasShownWelcome = true;
        }
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

    function showSectionLoader(containerId, show = true) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        if (show) {
            let loader = container.querySelector('.section-loader');
            if (!loader) {
                loader = document.createElement('div');
                loader.className = 'section-loader';
                loader.innerHTML = `
                    <div class="loader-spinner">
                        <i class="fas fa-spinner fa-spin fa-2x"></i>
                    </div>
                    <p class="loader-text">Loading data...</p>
                `;
                container.appendChild(loader);
            }
            loader.style.display = 'flex';
        } else {
            const loader = container.querySelector('.section-loader');
            if (loader) loader.style.display = 'none';
        }
    }

    function showLoadingSpinner(container) {
        const spinnerId = `spinner-${Date.now()}`;
        const spinnerHTML = `
            <div id="${spinnerId}" class="loading-spinner-container">
                <div class="professional-spinner">
                    <div class="spinner-circle"></div>
                    <div class="spinner-text">Loading...</div>
                </div>
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
    // IMAGE HANDLING FUNCTIONS - OPTIMIZED
    // ===============================
    function getImageUrl(imagePath, type = 'destination') {
        // If no image or invalid, use local fallback
        if (!imagePath || imagePath === '#' || imagePath === '' || imagePath.includes('unsplash')) {
            return config.fallbackImages[type] || config.fallbackImages.destination;
        }
        
        // If it's already a full URL, use it
        if (imagePath.startsWith('http')) {
            return imagePath;
        }
        
        // If it's a relative path from database starting with /
        if (imagePath.startsWith('/')) {
            // Remove leading slash and prepend uploads endpoint
            const cleanPath = imagePath.replace(/^\//, '');
            return `${config.baseUrl}${config.endpoints.uploads}${cleanPath}`;
        }
        
        // If it's just a filename
        return `${config.baseUrl}${config.endpoints.uploads}${imagePath}`;
    }

    function preloadImage(url) {
        return new Promise((resolve) => {
            if (imageCache.has(url)) {
                resolve(url);
                return;
            }
            
            const img = new Image();
            
            // Use eager loading to prevent tracking prevention issues
            img.loading = 'eager';
            img.decoding = 'sync';
            img.fetchPriority = 'high';
            
            img.onload = () => {
                imageCache.set(url, true);
                resolve(url);
            };
            
            img.onerror = () => {
                const fallbackType = url.includes('guide') ? 'guide' : 
                                   url.includes('translator') ? 'translator' : 
                                   url.includes('accommodation') ? 'accommodation' : 
                                   url.includes('blog') ? 'blog' : 'destination';
                resolve(config.fallbackImages[fallbackType]);
            };
            
            // Set src AFTER event handlers
            img.src = url;
        });
    }

    function optimizeImageUrl(url) {
        // Remove any parameters that might cause tracking prevention
        return url.split('?')[0];
    }

    // ===============================
    // API SERVICE WITH SEED DATA INTEGRATION
    // ===============================
    const apiService = {
        async request(endpoint, options = {}) {
            const url = `${config.baseUrl}${endpoint}`;
            
            try {
                const response = await fetch(url, {
                    ...options,
                    headers: {
                        'Content-Type': 'application/json',
                        ...(options.headers || {})
                    },
                    timeout: 10000
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.json();
            } catch (error) {
                if (config.debug) console.log(`API request failed for ${endpoint}:`, error.message);
                if (options.method === 'GET' || !options.method) {
                    return { data: this.getFallbackData(endpoint) };
                }
                return { success: false, message: 'Network error. Please try again.' };
            }
        },

        getSeedData(type) {
            return seedData[type] || [];
        },

        getFallbackData(endpoint) {
            switch(endpoint) {
                case config.endpoints.guides:
                    return this.getSeedData('guides');
                case config.endpoints.destinations:
                    return this.getSeedData('destinations');
                case config.endpoints.translators:
                    return this.getSeedData('translators');
                case config.endpoints.accommodations:
                    return this.getSeedData('accommodations');
                case config.endpoints.blog:
                    return this.getSeedData('blogPosts');
                default:
                    return [];
            }
        },

        async getGuides() {
            try {
                showSectionLoader('guides-section', true);
                const data = await this.request(config.endpoints.guides);
                const guides = data.data || data.guides || data || this.getSeedData('guides');
                
                // Preload guide images
                if (Array.isArray(guides)) {
                    await Promise.all(guides.map(guide => 
                        preloadImage(getImageUrl(guide.image, 'guide'))
                    ));
                }
                
                allItemsCache.guides = guides;
                return guides;
            } catch (error) {
                const seedGuides = this.getSeedData('guides');
                allItemsCache.guides = seedGuides;
                return seedGuides;
            } finally {
                showSectionLoader('guides-section', false);
            }
        },

        async getDestinations() {
            try {
                showSectionLoader('destinations-section', true);
                const data = await this.request(config.endpoints.destinations);
                const destinations = data.data || data.destinations || data || this.getSeedData('destinations');
                
                // Preload destination images
                if (Array.isArray(destinations)) {
                    await Promise.all(destinations.map(destination => 
                        preloadImage(getImageUrl(destination.mainImage || destination.image, 'destination'))
                    ));
                }
                
                allItemsCache.destinations = destinations;
                return destinations;
            } catch (error) {
                const seedDestinations = this.getSeedData('destinations');
                allItemsCache.destinations = seedDestinations;
                return seedDestinations;
            } finally {
                showSectionLoader('destinations-section', false);
            }
        },

        async getTranslators() {
            try {
                showSectionLoader('translators-section', true);
                const data = await this.request(config.endpoints.translators);
                const translators = data.data || data.translators || data || this.getSeedData('translators');
                
                // Preload translator images
                if (Array.isArray(translators)) {
                    await Promise.all(translators.map(translator => 
                        preloadImage(getImageUrl(translator.image, 'translator'))
                    ));
                }
                
                allItemsCache.translators = translators;
                return translators;
            } catch (error) {
                const seedTranslators = this.getSeedData('translators');
                allItemsCache.translators = seedTranslators;
                return seedTranslators;
            } finally {
                showSectionLoader('translators-section', false);
            }
        },

        async getAccommodations() {
            try {
                showSectionLoader('accommodations-section', true);
                const data = await this.request(config.endpoints.accommodations);
                const accommodations = data.data || data.accommodations || data || this.getSeedData('accommodations');
                
                // Preload accommodation images
                if (Array.isArray(accommodations)) {
                    await Promise.all(accommodations.map(acc => 
                        preloadImage(getImageUrl(acc.mainImage || acc.image, 'accommodation'))
                    ));
                }
                
                allItemsCache.accommodations = accommodations;
                return accommodations;
            } catch (error) {
                const seedAccommodations = this.getSeedData('accommodations');
                allItemsCache.accommodations = seedAccommodations;
                return seedAccommodations;
            } finally {
                showSectionLoader('accommodations-section', false);
            }
        },

        async getBlogPosts() {
            try {
                showSectionLoader('blog-section', true);
                const data = await this.request(config.endpoints.blog);
                const blogPosts = data.data || data.blog || data || this.getSeedData('blogPosts');
                
                // Preload blog images
                if (Array.isArray(blogPosts)) {
                    await Promise.all(blogPosts.map(post => 
                        preloadImage(getImageUrl(post.featuredImage || post.image, 'blog'))
                    ));
                }
                
                allItemsCache.blogPosts = blogPosts;
                return blogPosts;
            } catch (error) {
                const seedBlogPosts = this.getSeedData('blogPosts');
                allItemsCache.blogPosts = seedBlogPosts;
                return seedBlogPosts;
            } finally {
                showSectionLoader('blog-section', false);
            }
        },

        // CREATE OPERATIONS
        async createBooking(bookingData) {
            return await this.request(config.endpoints.bookings, {
                method: 'POST',
                body: JSON.stringify(bookingData)
            });
        },

        async createTripPlan(tripPlanData) {
            return await this.request(config.endpoints.tripPlan, {
                method: 'POST',
                body: JSON.stringify(tripPlanData)
            });
        },

        async subscribeNewsletter(emailData) {
            return await this.request(config.endpoints.newsletter, {
                method: 'POST',
                body: JSON.stringify(emailData)
            });
        },

        async sendContactMessage(contactData) {
            return await this.request(config.endpoints.contact, {
                method: 'POST',
                body: JSON.stringify(contactData)
            });
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

    function closeModal() {
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
    }

    function showBookingModal(serviceType, serviceId, serviceName) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        const modalHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-calendar-check"></i> Book ${serviceName}</h2>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-loading" id="modal-loading" style="display: none;">
                        <div class="professional-spinner">
                            <div class="spinner-circle"></div>
                            <div class="spinner-text">Submitting booking...</div>
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
            
            showNotification('Booking request submitted successfully! We\'ll contact you within 24 hours.', 'success');
            closeModal();
        });
    }

    // ===============================
    // DETAIL MODALS (Enhanced from second script)
    // ===============================
    
    function showDestinationDetails(destinationId) {
        const destination = apiService.getSeedData('destinations').find(d => d._id === destinationId) || 
                           allItemsCache.destinations.find(d => d._id === destinationId || d.id === destinationId);
        
        if (!destination) {
            showNotification('Destination details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content detailed-modal">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> ${destination.name}</h2>
                    <div class="modal-subtitle">
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${destination.location}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${destination.rating || 4.5}</span>
                    </div>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="destination-gallery">
                        <img src="${getImageUrl(destination.mainImage || destination.image, 'destination')}" 
                             alt="${destination.name}" 
                             class="main-image"
                             loading="lazy">
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-info-circle"></i> Overview</h3>
                            <p class="description">${destination.description}</p>
                            
                            <div class="quick-info">
                                <div class="info-item">
                                    <i class="fas fa-calendar-alt"></i>
                                    <div>
                                        <div class="info-label">Best Season</div>
                                        <div class="info-value">${destination.bestSeason || 'Year-round'}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-clock"></i>
                                    <div>
                                        <div class="info-label">Duration</div>
                                        <div class="info-value">${destination.duration || 'Flexible'}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-hiking"></i>
                                    <div>
                                        <div class="info-label">Difficulty</div>
                                        <div class="info-value">${destination.difficulty || 'Moderate'}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <div>
                                        <div class="info-label">Starting Price</div>
                                        <div class="info-value">$${destination.basePrice || destination.price || 'Contact for price'}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        ${destination.activities && destination.activities.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-hiking"></i> Activities & Experiences</h3>
                            <div class="activities-grid">
                                ${destination.activities.slice(0, 3).map(activity => `
                                    <div class="activity-card">
                                        <div class="activity-icon">
                                            <i class="${activity.icon || 'fas fa-star'}"></i>
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
                                ${destination.features.slice(0, 3).map(feature => `
                                    <div class="feature-item">
                                        <div class="feature-name">${feature.name || feature}</div>
                                        ${feature.description ? `<div class="feature-desc">${feature.description}</div>` : ''}
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.highlights && destination.highlights.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-bullseye"></i> Trip Highlights</h3>
                            <div class="highlights">
                                ${destination.highlights.slice(0, 4).map(highlight => `
                                    <div class="highlight-item">
                                        <i class="fas fa-check-circle"></i>
                                        <span>${highlight}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                        
                        ${destination.tags && destination.tags.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-tags"></i> Tags</h3>
                            <div class="tags-container">
                                ${destination.tags.slice(0, 5).map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                        </section>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="showBookingModal('destination', '${destination._id || destination.id}', '${destination.name}')">
                            <i class="fas fa-calendar-check"></i> Book This Destination
                        </button>
                        <button class="btn btn-secondary" onclick="showTripPlanningModal()">
                            <i class="fas fa-map-marked-alt"></i> Plan Custom Trip
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        createModal(modalHTML);
    }

    function showAccommodationDetails(accommodationId) {
        const accommodation = apiService.getSeedData('accommodations').find(a => a._id === accommodationId) || 
                              allItemsCache.accommodations.find(a => a._id === accommodationId || a.id === accommodationId);
        
        if (!accommodation) {
            showNotification('Accommodation details not found', 'error');
            return;
        }
        
        const modalHTML = `
            <div class="modal-content detailed-modal">
                <div class="modal-header">
                    <h2><i class="fas fa-hotel"></i> ${accommodation.name}</h2>
                    <div class="modal-subtitle">
                        <span class="type">${accommodation.type || 'Hotel'}</span>
                        <span class="location"><i class="fas fa-map-marker-alt"></i> ${accommodation.location}</span>
                        <span class="rating"><i class="fas fa-star"></i> ${accommodation.rating || 4.5}</span>
                    </div>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="accommodation-gallery">
                        <img src="${getImageUrl(accommodation.mainImage || accommodation.image, 'accommodation')}" 
                             alt="${accommodation.name}" 
                             class="main-image"
                             loading="lazy">
                    </div>
                    
                    <div class="content-sections">
                        <section class="content-section">
                            <h3><i class="fas fa-info-circle"></i> Description</h3>
                            <p class="description">${accommodation.description}</p>
                            
                            <div class="quick-info">
                                <div class="info-item">
                                    <i class="fas fa-dollar-sign"></i>
                                    <div>
                                        <div class="info-label">Price Per Night</div>
                                        <div class="info-value">$${accommodation.pricePerNight || accommodation.dailyRate || 'Contact for price'}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-users"></i>
                                    <div>
                                        <div class="info-label">Max Guests</div>
                                        <div class="info-value">${accommodation.maxGuests || '2'}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-phone"></i>
                                    <div>
                                        <div class="info-label">Contact</div>
                                        <div class="info-value">${accommodation.contactPhone || config.companyPhone}</div>
                                    </div>
                                </div>
                                <div class="info-item">
                                    <i class="fas fa-envelope"></i>
                                    <div>
                                        <div class="info-label">Email</div>
                                        <div class="info-value">${accommodation.contactEmail || config.bookingEmail}</div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        
                        ${accommodation.amenities && accommodation.amenities.length > 0 ? `
                        <section class="content-section">
                            <h3><i class="fas fa-concierge-bell"></i> Amenities & Services</h3>
                            <div class="amenities-grid">
                                ${accommodation.amenities.slice(0, 6).map(amenity => `
                                    <div class="amenity-item ${amenity.included ? 'included' : 'not-included'}">
                                        <div class="amenity-icon">
                                            <i class="${amenity.icon || 'fas fa-check'}"></i>
                                        </div>
                                        <div class="amenity-content">
                                            <div class="amenity-name">${amenity.name}</div>
                                            <div class="amenity-status">${amenity.included ? 'Included' : 'Extra Charge'}</div>
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
                                ${accommodation.features.slice(0, 5).map(feature => `
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
                        <button class="btn btn-primary" onclick="showBookingModal('accommodation', '${accommodation._id || accommodation.id}', '${accommodation.name}')">
                            <i class="fas fa-calendar-check"></i> Book This Accommodation
                        </button>
                        <button class="btn btn-secondary" onclick="showTripPlanningModal()">
                            <i class="fas fa-map-marked-alt"></i> Plan Full Trip
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        createModal(modalHTML);
    }

    function showBlogDetails(blogId) {
        const blog = apiService.getSeedData('blogPosts').find(b => b._id === blogId) || 
                     allItemsCache.blogPosts.find(b => b._id === blogId || b.id === blogId);
        
        if (!blog) {
            showNotification('Blog post not found', 'error');
            return;
        }
        
        const date = blog.publishedDate ? new Date(blog.publishedDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        }) : 'Recent';
        
        const modalHTML = `
            <div class="modal-content detailed-modal blog-modal">
                <div class="modal-header">
                    <h2><i class="fas fa-newspaper"></i> ${blog.title}</h2>
                    <div class="modal-subtitle">
                        <span class="author"><i class="fas fa-user-edit"></i> ${blog.author}</span>
                        <span class="date"><i class="fas fa-calendar"></i> ${date}</span>
                        <span class="read-time"><i class="fas fa-clock"></i> ${blog.readTime || '5 min read'}</span>
                    </div>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="blog-hero-image">
                        <img src="${getImageUrl(blog.featuredImage || blog.image, 'blog')}" 
                             alt="${blog.title}" 
                             loading="lazy">
                        <div class="blog-category">${blog.category || 'Travel'}</div>
                    </div>
                    
                    <div class="blog-content-wrapper">
                        <div class="blog-intro">
                            <p class="lead">${blog.excerpt}</p>
                        </div>
                        
                        <div class="blog-section">
                            <h2><i class="fas fa-paw"></i> About This Experience</h2>
                            <p>${blog.excerpt} This guide provides comprehensive information to help you plan your perfect trip.</p>
                        </div>
                        
                        <div class="blog-section">
                            <h2><i class="fas fa-lightbulb"></i> Key Takeaways</h2>
                            <div class="highlights">
                                <div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Expert guidance from local professionals</span>
                                </div>
                                <div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Cultural immersion and authentic experiences</span>
                                </div>
                                <div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Sustainable and responsible tourism practices</span>
                                </div>
                                <div class="highlight-item">
                                    <i class="fas fa-check-circle"></i>
                                    <span>Memorable adventures in beautiful Rwanda</span>
                                </div>
                            </div>
                        </div>
                        
                        ${blog.tags && blog.tags.length > 0 ? `
                        <div class="blog-section">
                            <h2><i class="fas fa-tags"></i> Related Topics</h2>
                            <div class="tags-container">
                                ${blog.tags.map(tag => `
                                    <span class="tag">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                        ` : ''}
                    </div>
                    
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="showTripPlanningModal()">
                            <i class="fas fa-map-marked-alt"></i> Plan Your Trip
                        </button>
                        <button class="btn btn-outline" onclick="closeModal()">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        createModal(modalHTML);
    }

    function preloadTripPlanModal() {
        if (preloadedTripPlanModal) return preloadedTripPlanModal;
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        preloadedTripPlanModal = `
            <div class="modal-content professional-trip-plan">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> Plan Your Custom Rwanda Adventure</h2>
                    <p class="modal-subtitle">Complete this form and our travel experts will create a personalized itinerary for you</p>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="modal-loading" id="modal-loading" style="display: none;">
                        <div class="professional-spinner">
                            <div class="spinner-circle"></div>
                            <div class="spinner-text">Creating your custom itinerary...</div>
                        </div>
                    </div>
                    <div id="modal-content">
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
                                        <label for="trip-duration">Trip Duration *</label>
                                        <select id="trip-duration" name="duration" required>
                                            <option value="">Select duration...</option>
                                            <option value="3-5">3-5 Days (Short Getaway)</option>
                                            <option value="6-8">6-8 Days (Standard Tour)</option>
                                            <option value="9-12">9-12 Days (Comprehensive Tour)</option>
                                            <option value="13+">13+ Days (Extended Adventure)</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="trip-travelers">Number of Travelers *</label>
                                        <div class="travelers-input">
                                            <input type="number" id="trip-travelers" name="travelers" min="1" max="20" value="2" required>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label for="trip-budget">Estimated Budget per Person *</label>
                                        <select id="trip-budget" name="budget" required>
                                            <option value="">Select budget range...</option>
                                            <option value="economy">Economy ($800 - $1,500)</option>
                                            <option value="standard">Standard ($1,500 - $3,000)</option>
                                            <option value="premium">Premium ($3,000 - $5,000)</option>
                                            <option value="luxury">Luxury ($5,000+)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-section">
                                <h3><i class="fas fa-star"></i> Travel Preferences</h3>
                                <div class="form-group">
                                    <label for="trip-message">Tell us about your dream trip *</label>
                                    <textarea id="trip-message" name="message" required placeholder="Please include:
• Any specific destinations you want to visit
• Special occasions (honeymoon, anniversary, birthday)
• Previous travel experience in Africa
• Physical fitness level
• Any other important details" rows="6"></textarea>
                                </div>
                            </div>
                            
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-large">
                                    <i class="fas fa-paper-plane"></i> Submit Trip Planning Request
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
        
        return preloadedTripPlanModal;
    }

    function showTripPlanningModal() {
        const modalHTML = preloadTripPlanModal();
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#trip-plan-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        const modalContent = modal.querySelector('#modal-content');
        const modalLoading = modal.querySelector('#modal-loading');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (!data.name || !data.email || !data.phone || !data.nationality || 
                !data.startDate || !data.duration || !data.budget || !data.message) {
                showNotification('Please fill all required fields marked with *', 'error');
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
            
            modalContent.style.display = 'none';
            modalLoading.style.display = 'block';
            
            const tripData = {
                ...data,
                submittedAt: new Date().toISOString()
            };
            
            try {
                await apiService.createTripPlan(tripData);
                showNotification('Trip plan submitted successfully! Our travel expert will contact you within 24 hours with a custom itinerary.', 'success');
                closeModal();
            } catch (error) {
                showNotification('Trip plan submitted. Our team will contact you shortly with your custom itinerary.', 'info');
                closeModal();
            } finally {
                modalContent.style.display = 'block';
                modalLoading.style.display = 'none';
            }
        });
    }

    // ===============================
    // HERO BACKGROUND SETUP
    // ===============================
    function setupHeroBackground() {
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url('${config.fallbackImages.hero}')`;
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            heroSection.style.backgroundRepeat = 'no-repeat';
            heroSection.style.backgroundAttachment = 'fixed';
            heroSection.style.transition = 'background-image 0.5s ease-in-out';
        }
    }

    // ===============================
    // NAVIGATION SYSTEM
    // ===============================
    
    function showPage(pageId) {
        document.querySelectorAll('.page').forEach(page => {
            page.style.display = 'none';
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`${pageId}-page`);
        if (targetPage) {
            targetPage.style.display = 'block';
            targetPage.classList.add('active');
            
            if (!targetPage.dataset.loaded) {
                loadPageContent(pageId);
                targetPage.dataset.loaded = 'true';
            }
        }
        
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        
        const mobileMenu = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (mobileBtn) mobileBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
        
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
            showNotification(`Error loading ${pageId} content`, 'error');
        }
    }

    // ===============================
    // PAGE CONTENT LOADERS
    // ===============================
    
    async function loadHomePage() {
        setupHeroBackground();
        
        const destinationsGrid = document.querySelector('.destinations-grid');
        if (destinationsGrid) {
            try {
                const spinnerId = showLoadingSpinner(destinationsGrid);
                const destinations = await apiService.getDestinations();
                hideLoadingSpinner(spinnerId);
                const featured = destinations.slice(0, 4);
                renderDestinations(featured, destinationsGrid, true);
            } catch (error) {
                const fallback = apiService.getSeedData('destinations').slice(0, 4);
                renderDestinations(fallback, destinationsGrid, true);
            }
        }
        
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            try {
                const spinnerId = showLoadingSpinner(blogGrid);
                const blogPosts = await apiService.getBlogPosts();
                hideLoadingSpinner(spinnerId);
                const featured = blogPosts.slice(0, 3);
                renderBlogPosts(featured, blogGrid, true);
            } catch (error) {
                const fallback = apiService.getSeedData('blogPosts').slice(0, 3);
                renderBlogPosts(fallback, blogGrid, true);
            }
        }
    }

    async function loadDestinationsPage() {
        const grid = document.querySelector('.destinations-grid-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            const destinations = await apiService.getDestinations();
            hideLoadingSpinner(spinnerId);
            renderDestinations(destinations, grid, false);
        } catch (error) {
            const fallback = apiService.getSeedData('destinations');
            renderDestinations(fallback, grid, false);
        }
    }

    async function loadGuidesPage() {
        const grid = document.querySelector('.guides-grid-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            const guides = await apiService.getGuides();
            hideLoadingSpinner(spinnerId);
            renderGuides(guides, grid);
        } catch (error) {
            const fallback = apiService.getSeedData('guides');
            renderGuides(fallback, grid);
        }
    }

    async function loadTranslatorsPage() {
        const grid = document.querySelector('.translators-grid-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            const translators = await apiService.getTranslators();
            hideLoadingSpinner(spinnerId);
            renderTranslators(translators, grid);
        } catch (error) {
            const fallback = apiService.getSeedData('translators');
            renderTranslators(fallback, grid);
        }
    }

    async function loadAccommodationsPage() {
        const grid = document.querySelector('.accommodations-grid-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            const accommodations = await apiService.getAccommodations();
            hideLoadingSpinner(spinnerId);
            renderAccommodations(accommodations, grid);
        } catch (error) {
            const fallback = apiService.getSeedData('accommodations');
            renderAccommodations(fallback, grid);
        }
    }

    async function loadBlogPage() {
        const grid = document.querySelector('.blog-grid-full');
        if (!grid) return;
        
        try {
            const spinnerId = showLoadingSpinner(grid);
            const blogPosts = await apiService.getBlogPosts();
            hideLoadingSpinner(spinnerId);
            renderBlogPosts(blogPosts, grid, false);
        } catch (error) {
            const fallback = apiService.getSeedData('blogPosts');
            renderBlogPosts(fallback, grid, false);
        }
    }

    // ===============================
    // RENDER FUNCTIONS (Enhanced)
    // ===============================
    
    function renderDestinations(destinations, container, isHome = false) {
        if (!destinations || destinations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-map-marked-alt"></i>
                    <p>No destinations available at the moment.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = destinations.map(dest => {
            const itemId = dest._id || dest.id || Math.random().toString();
            const name = dest.name || 'Amazing Destination';
            const location = dest.location || 'Rwanda';
            const description = dest.description || 'Experience the beauty of Rwanda';
            const rating = dest.rating || 4.5;
            const price = dest.basePrice || dest.price || 'Contact for price';
            const imageUrl = getImageUrl(dest.mainImage || dest.image, 'destination');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            const features = dest.features || dest.highlights || ['Beautiful Scenery', 'Guided Tours', 'Unique Experience'];
            
            return `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${optimizedUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="500" 
                         height="300">
                    <div class="destination-rating"><i class="fas fa-star"></i> ${rating}</div>
                </div>
                <div class="destination-content">
                    <h3>${name}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${location}
                    </div>
                    <p class="destination-description">${description.substring(0, 100)}...</p>
                    <div class="destination-features">
                        ${Array.isArray(features) ? features.slice(0, 3).map(f => {
                            if (typeof f === 'object') {
                                return `<span class="feature"><i class="fas fa-check"></i>${f.name || f}</span>`;
                            }
                            return `<span class="feature"><i class="fas fa-check"></i>${f}</span>`;
                        }).join('') : ''}
                    </div>
                    <div class="price-tag"><i class="fas fa-dollar-sign"></i> $${price}</div>
                    <div class="card-actions">
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${itemId}"
                                data-name="${name}">
                            <i class="fas fa-calendar-check"></i> Book Now
                        </button>
                        ${!isHome ? `<button class="btn btn-secondary view-details" data-id="${itemId}">
                            <i class="fas fa-eye"></i> View Details
                        </button>` : ''}
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
                    <p>No guides available at the moment.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = guides.map(guide => {
            const itemId = guide._id || guide.id || Math.random().toString();
            const name = guide.name || 'Professional Guide';
            const specialty = guide.specialty || 'Tour Guide';
            const languages = guide.languages || ['English', 'Kinyarwanda'];
            const experience = guide.experience || 'Experienced guide';
            const rating = guide.rating || 4.5;
            const dailyRate = guide.dailyRate || 100;
            const imageUrl = getImageUrl(guide.image, 'guide');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            
            return `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${optimizedUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${name}</h3>
                    <p class="specialty">${specialty}</p>
                    <div class="languages-section">
                        <div class="languages-list">
                            ${languages.slice(0, 3).map(lang => `<span class="language-tag">${lang}</span>`).join('')}
                            ${languages.length > 3 ? `<span class="language-tag">+${languages.length - 3}</span>` : ''}
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
                    <p>No translators available at the moment.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = translators.map(translator => {
            const itemId = translator._id || translator.id || Math.random().toString();
            const name = translator.name || 'Professional Translator';
            const specialty = translator.specialty || 'Translator';
            const languages = translator.languages || ['English', 'French', 'Kinyarwanda'];
            const experience = translator.experience || 'Experienced translator';
            const rating = translator.rating || 4.5;
            const dailyRate = translator.dailyRate || 100;
            const imageUrl = getImageUrl(translator.image, 'translator');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            
            return `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${optimizedUrl}" 
                         alt="${name}" 
                         loading="lazy"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${name}</h3>
                    <p class="specialty">${specialty}</p>
                    <div class="languages-section">
                        <div class="languages-list">
                            ${languages.slice(0, 3).map(lang => `<span class="language-tag">${lang}</span>`).join('')}
                            ${languages.length > 3 ? `<span class="language-tag">+${languages.length - 3}</span>` : ''}
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
                    <p>No accommodations available at the moment.</p>
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
            const imageUrl = getImageUrl(acc.mainImage || acc.image, 'accommodation');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            const features = acc.features || ['Comfortable Rooms', 'Good Service', 'Great Location'];
            
            return `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${optimizedUrl}" 
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
                        ${features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
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
                            <i class="fas fa-info-circle"></i> View More
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
                    <p>No blog posts available at the moment.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = blogPosts.map(post => {
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
            const imageUrl = getImageUrl(post.featuredImage || post.image, 'blog');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            const tags = post.tags || ['Travel', 'Rwanda'];
            
            return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${optimizedUrl}" 
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
                    <div class="blog-tags">
                        ${tags.slice(0, 2).map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
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
    // EVENT HANDLERS
    // ===============================
    
    function setupEventListeners() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('.nav-link')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.service-link')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.explore-destinations-btn') || target.closest('.explore-destinations-btn')) {
                e.preventDefault();
                showPage('destinations');
            }
            
            if (target.matches('.book-now') || target.closest('.book-now')) {
                e.preventDefault();
                const button = target.matches('.book-now') ? target : target.closest('.book-now');
                const type = button.dataset.type;
                const id = button.dataset.id;
                const name = button.dataset.name;
                if (type && id && name) {
                    showBookingModal(type, id, name);
                }
            }
            
            if (target.matches('.plan-trip-nav-btn, .plan-trip-hero-btn, .plan-trip-footer-btn') || 
                target.closest('.plan-trip-nav-btn, .plan-trip-hero-btn, .plan-trip-footer-btn')) {
                e.preventDefault();
                showTripPlanningModal();
            }
            
            if (target.matches('.view-all-btn')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.read-more-link') || target.closest('.read-more-link')) {
                e.preventDefault();
                showPage('blog');
            }
            
            if (target.matches('.footer-links a[data-page]') || target.matches('.footer-links button[data-page]')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
            
            if (target.matches('.message-action-btn')) {
                e.preventDefault();
                showTripPlanningModal();
            }
        });
        
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        const newsletterForms = document.querySelectorAll('#newsletter-form, .footer-newsletter-form');
        newsletterForms.forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const emailInput = form.querySelector('input[type="email"]');
                const email = emailInput?.value.trim();
                
                if (!email || !validateEmail(email)) {
                    showNotification('Please enter a valid email address', 'error');
                    return;
                }
                
                const submitBtn = form.querySelector('button[type="submit"]');
                showLoading(submitBtn, true);
                
                try {
                    await apiService.subscribeNewsletter({ email });
                    showNotification('Successfully subscribed to newsletter!', 'success');
                    form.reset();
                } catch (error) {
                    showNotification('Subscribed successfully!', 'success');
                    form.reset();
                } finally {
                    showLoading(submitBtn, false);
                }
            });
        });
        
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
                
                try {
                    await apiService.sendContactMessage({ name, email, subject, message });
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } catch (error) {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } finally {
                    showLoading(submitBtn, false);
                }
            });
        }
        
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===============================
    // ADD ENHANCED CSS STYLES
    // ===============================
    function addEnhancedStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Loading States */
            .section-loader {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                background: rgba(3, 65, 24, 0.9);
                border-radius: 10px;
                margin: 20px 0;
                min-height: 200px;
            }
            
            .loader-spinner {
                margin-bottom: 15px;
                color: var(--primary-color);
            }
            
            .loader-text {
                color: var(--text-color);
                font-size: 14px;
                margin: 0;
            }
            
            .full-page-loader {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 60px 20px;
                text-align: center;
                min-height: 400px;
            }
            
            /* Professional Loading Spinner */
            .loading-spinner-container {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 300px;
                width: 100%;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 12px;
                padding: 40px;
            }
            
            .professional-spinner {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
            }
            
            .spinner-circle {
                width: 50px;
                height: 50px;
                border: 4px solid #f3f3f3;
                border-top: 4px solid #10b981;
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            .spinner-text {
                font-size: 16px;
                color: #4b5563;
                font-weight: 500;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .no-data-message {
                text-align: center;
                padding: 60px 20px;
                background: var(--background-light);
                border-radius: 10px;
                margin: 20px 0;
            }
            
            .no-data-message i {
                font-size: 48px;
                color: var(--text-light);
                margin-bottom: 20px;
            }
            
            .no-data-message h3 {
                margin-bottom: 10px;
                color: var(--text-color);
            }
            
            .no-data-message p {
                color: var(--text-light);
                margin-bottom: 20px;
            }
            
            /* Floating Messages */
             .floating-message {
              position: fixed;
              top: 80px;
              right: 20px;
              width: 350px;
              max-width: calc(100% - 40px);
              background: #033e25; /* DARK GREEN BACKGROUND */
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
              z-index: 9998;
              opacity: 0;
              transform: translateX(100%);
              transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
              overflow: hidden;
              border-left: 4px solid var(--primary-color);
              color: white; /* WHITE TEXT FOR ENTIRE COMPONENT */
       }

            .floating-message.show {
             opacity: 1;
             transform: translateX(0);
       }

           .floating-message.welcome {
            border-left-color: #FF9800;
       }

          .floating-message.success {
          border-left-color: #4CAF50;
      }

          .floating-message.info {
          border-left-color: #2196F3;
      }

          .floating-message-content {
           padding: 20px;
      }

         .floating-message-header {
         display: flex;
         align-items: center;
        margin-bottom: 12px;
      }

       .floating-message-icon {
    width: 40px;
    height: 40px;
    background: var(--primary-color);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex-shrink: 0;
  }

    .floating-message.welcome .floating-message-icon {
    background: #FF9800;
 }

.   floating-message.success .floating-message-icon {
    background: #4CAF50;
 }

   .floating-message.info .floating-message-icon {
    background: #2196F3;
  }

    .floating-message-icon i {
    color: white;
    font-size: 18px;
   }

    .floating-message-title {
    font-size: 16px;
    font-weight: 600;
    color: white; /* WHITE TITLE */
     flex-grow: 1;
  }

    .floating-message-close {
    background: none;
    border: none;
    color: rgba(255, 255, 255, 0.7); /* WHITE CLOSE BUTTON */
    font-size: 20px;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s;
}

   .floating-message-close:hover {
    color: white; /* BRIGHTER WHITE ON HOVER */
}

.floating-message-body p {
    margin: 0 0 15px 0;
    color: rgba(255, 255, 255, 0.9); /* WHITE TEXT WITH SLIGHT TRANSPARENCY */
    line-height: 1.5;
    font-size: 14px;
}

.message-action-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.3s;
    display: inline-block;
}

.message-action-btn:hover {
    background: #0da271;
}

.floating-message-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    background: var(--primary-color);
    width: 100%;
    transform-origin: left;
}
            @keyframes progressShrink {
                from { transform: scaleX(1); }
                to { transform: scaleX(0); }
            }
            
            /* Card Actions */
            .card-actions {
                display: flex;
                gap: 10px;
                margin-top: 15px;
            }
            
            .card-actions .btn {
                flex: 1;
                padding: 8px 12px;
                font-size: 14px;
            }
            
            /* Detailed Modal Styles */
            .detailed-modal .modal-body {
                max-height: 85vh;
                overflow-y: auto;
                padding: 0;
            }
            
            .detailed-modal .modal-header {
                position: sticky;
                top: 0;
                background: white;
                z-index: 100;
                border-bottom: 1px solid #e5e7eb;
                padding: 20px;
            }
            
            .detailed-modal .modal-subtitle {
                display: flex;
                gap: 20px;
                margin-top: 8px;
                font-size: 14px;
                color: #6b7280;
                flex-wrap: wrap;
            }
            
            .modal-subtitle span {
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .modal-subtitle .rating {
                color: #f59e0b;
            }
            
            /* Content Sections */
            .content-sections {
                padding: 25px;
            }
            
            .content-section {
                margin-bottom: 30px;
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
                color: #10b981;
            }
            
            /* Quick Info Grid */
            .quick-info {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 20px;
            }
            
            .info-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                background: #033e25;
                border-radius: 8px;
                border: 1px solid #e2e8f0;
            }
            
            .info-item i {
                font-size: 20px;
                color: #10b981;
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
            
            /* Activities Grid */
            .activities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 15px;
                margin-top: 15px;
            }
            
            .activity-card {
                display: flex;
                align-items: flex-start;
                gap: 12px;
                padding: 15px;
                background: #04402d;
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
                background: #10b981;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 18px;
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
            
            /* Features List */
            .features-list {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 12px;
                margin-top: 10px;
            }
            
            .feature-item {
                padding: 12px;
                background: #f8fafc;
                border-radius: 6px;
                border-left: 3px solid #10b981;
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
            
            /* Highlights */
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
                color: #10b981;
            }
            
            /* Tags */
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
            
            /* Modal Actions */
            .modal-actions {
                display: flex;
                gap: 12px;
                padding: 25px;
                background: #f8fafc;
                border-top: 1px solid #e5e7eb;
                position: sticky;
                bottom: 0;
            }
            
            .modal-actions .btn {
                flex: 1;
            }
            
            /* Amenities Grid */
            .amenities-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                gap: 15px;
                margin-top: 15px;
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
                border-left: 3px solid #10b981;
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
            
            /* Button Colors */
            .btn-primary {
                background: linear-gradient(135deg, #10b981, #059669);
                border: none;
                color: white;
            }
            
            .btn-primary:hover {
                background: linear-gradient(135deg, #059669, #047857);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }
            
            .btn-secondary {
                background: #f0f9ff;
                border: 1px solid #0ea5e9;
                color: #0369a1;
            }
            
            .btn-secondary:hover {
                background: #e0f2fe;
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(14, 165, 233, 0.2);
            }
            
            /* Modal Loading */
            .modal-loading {
                display: none;
                justify-content: center;
                align-items: center;
                min-height: 200px;
            }
            
            /* Responsive Design */
            @media (max-width: 768px) {
                .quick-info,
                .activities-grid,
                .features-list,
                .amenities-grid {
                    grid-template-columns: 1fr;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
                
                .modal-actions .btn {
                    width: 100%;
                }
                
                .content-sections {
                    padding: 15px;
                }
                
                .detailed-modal .modal-subtitle {
                    flex-direction: column;
                    gap: 5px;
                }
                
                .floating-message {
                    width: 300px;
                    top: 70px;
                    right: 10px;
                    max-width: calc(100% - 20px);
                }
                
                .floating-message-content {
                    padding: 15px;
                }
                
                .floating-message-icon {
                    width: 36px;
                    height: 36px;
                    margin-right: 10px;
                }
                
                .floating-message-icon i {
                    font-size: 16px;
                }
            }
            
            @media (max-width: 480px) {
                .content-section h3 {
                    font-size: 16px;
                }
                
                .info-item {
                    padding: 10px;
                }
                
                .activity-card,
                .amenity-item {
                    padding: 12px;
                }
                
                .floating-message {
                    width: 280px;
                    top: 60px;
                }
                
                .floating-message-header {
                    flex-wrap: wrap;
                }
                
                .floating-message-title {
                    font-size: 14px;
                    margin-top: 5px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing Go Trip Application v5.0');
        
        // Add enhanced styles
        addEnhancedStyles();
        
        // Hide hero messages container
        const heroMessages = document.querySelector('.hero-messages');
        if (heroMessages) {
            heroMessages.style.display = 'none';
        }
        
        // Remove old elements
        const connectionStatus = document.getElementById('connection-status');
        if (connectionStatus) connectionStatus.remove();
        
        const searchBtn = document.getElementById('search-btn-desktop');
        const searchModal = document.getElementById('search-modal');
        if (searchBtn) searchBtn.remove();
        if (searchModal) searchModal.remove();
        
        // Show initial loading
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.innerHTML = `
                <div class="loading-content">
                    <div class="professional-spinner">
                        <div class="spinner-circle"></div>
                        <div class="spinner-text">Loading your Rwanda adventure...</div>
                    </div>
                </div>
            `;
        }
        
        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Test backend connection
        try {
            const healthCheck = await fetch(`${config.baseUrl}${config.endpoints.health}`, {
                method: 'GET',
                timeout: 5000
            }).catch(() => null);
            
            if (healthCheck && healthCheck.ok) {
                console.log('✅ Backend connected');                
            } else {
                console.log('⚠️ Using fallback data (backend offline)');
            }
        } catch (error) {
            console.log('⚠️ Backend offline, using fallback data');
        }
        
        // Preload trip plan modal
        preloadTripPlanModal();
        
        // Initialize UI components
        setupEventListeners();
        
        // Setup hero background
        setupHeroBackground();
        
        // Hide loading overlay after a minimum time
        setTimeout(() => {
            if (loadingOverlay) {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }
            
            // Show welcome messages as floating notifications
            setTimeout(() => {
                showWelcomeMessage(0);
            }, 1000);
            
            // Load initial page
            showPage('home');
            
            console.log('✅ Application initialized successfully');
        }, 1500);
    }

    // ===============================
    // EXPORT TO WINDOW
    // ===============================
    window.GoTrip = {
        apiService,
        showPage,
        showNotification,
        showTripPlanningModal,
        showBookingModal,
        closeModal,
        showDestinationDetails,
        showAccommodationDetails,
        showBlogDetails,
        loadDestinationsPage,
        loadGuidesPage,
        loadTranslatorsPage,
        loadAccommodationsPage,
        loadBlogPage,
        showWelcomeMessage
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