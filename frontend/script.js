// Go Trip Frontend Application v4.1
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        // Simplified backend URL detection
        baseUrl: window.location.hostname === 'localhost' || 
                window.location.hostname === '127.0.0.1' 
                ? 'http://localhost:5000' 
                : 'https://gotrip-backend-uwhn.onrender.com',
        
        debug: true,
        
        heroMessages: [
            { icon: 'fa-star', text: "Welcome to GoTrip!" },
            { icon: 'fa-globe-africa', text: "Experience authentic beauty, culture and hospitality." },
            { icon: 'fa-mountain', text: "Gorilla Trekking, Mountain Hiking, Bird Watching, Big Five Safari,..." },
            { icon: 'fa-award', text: "Meet our Award-winning tour guides and translators" },
            { icon: 'fa-gem', text: "Luxury accommodations at fair prices" }
        ],
        
        bookingEmail: 'info@gotrip.africa',
        companyPhone: '+250787407051',
        companyAddress: 'KG 7 Ave, Kigali, Rwanda',
        
        // API endpoints
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
            contact: '/api/contacts'
        }
    };

    console.log('🔧 Configuration loaded:', {
        frontend: window.location.href,
        backend: config.baseUrl,
        apiEndpoints: config.endpoints
    });

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentHeroMessageIndex = 0;
    let heroMessageTimer = null;
    let preloadedTripPlanModal = null;
    const appData = {
        guides: [],
        destinations: [],
        translators: [],
        accommodations: [],
        blog: []
    };

    // ===============================
    // UI UTILITIES
    // ===============================
    
    function showNotification(message, type = 'info', duration = 3000) {
        // Remove existing notifications
        document.querySelectorAll('.notification-toast').forEach(n => n.remove());
        
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type} show`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close" aria-label="Close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove
        const removeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        };
        
        setTimeout(removeNotification, duration);
        
        // Close on click
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

    // ===============================
    // API SERVICE
    // ===============================
    const apiService = {
        /**
         * Universal API request handler
         */
        async request(endpoint, options = {}) {
            const url = `${config.baseUrl}${endpoint}`;
            const method = options.method || 'GET';
            
            console.log(`🌐 API ${method}: ${url}`);
            
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const defaultHeaders = {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            };

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        ...defaultHeaders,
                        ...(options.headers || {})
                    }
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const errorText = await response.text();
                    console.error(`❌ API Error ${response.status}:`, errorText);
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const data = await response.json();
                console.log(`✅ API Success:`, data);
                return data;
                
            } catch (error) {
                clearTimeout(timeoutId);
                
                if (error.name === 'AbortError') {
                    console.error('⏰ Request timeout');
                    throw new Error('Request timeout. Please try again.');
                }
                
                console.error(`❌ Request failed:`, error.message);
                throw error;
            }
        },

        // === HEALTH CHECK ===
        async checkHealth() {
            try {
                const health = await this.request(config.endpoints.health);
                return {
                    api: true,
                    message: health.status === 'ok' ? 'API is healthy' : 'API running',
                    timestamp: health.timestamp || new Date().toISOString()
                };
            } catch (error) {
                console.warn('⚠️ Health check failed:', error.message);
                return {
                    api: false,
                    message: 'API unavailable',
                    error: error.message
                };
            }
        },

        // === DATA FETCHING ===
        async getGuides() {
            try {
                const data = await this.request(config.endpoints.guides);
                // Handle both response formats
                return data.data || data.guides || data || [];
            } catch (error) {
                console.warn('⚠️ Using fallback guides data');
                return this.getFallbackGuides();
            }
        },

        async getDestinations() {
            try {
                const data = await this.request(config.endpoints.destinations);
                return data.data || data.destinations || data || [];
            } catch (error) {
                console.warn('⚠️ Using fallback destinations data');
                return this.getFallbackDestinations();
            }
        },

        async getTranslators() {
            try {
                const data = await this.request(config.endpoints.translators);
                return data.data || data.translators || data || [];
            } catch (error) {
                console.warn('⚠️ Using fallback translators data');
                return this.getFallbackTranslators();
            }
        },

        async getAccommodations() {
            try {
                const data = await this.request(config.endpoints.accommodations);
                return data.data || data.accommodations || data || [];
            } catch (error) {
                console.warn('⚠️ Using fallback accommodations data');
                return this.getFallbackAccommodations();
            }
        },

        async getBlogPosts() {
            try {
                const data = await this.request(config.endpoints.blog);
                return data.data || data.blog || data || [];
            } catch (error) {
                console.warn('⚠️ Using fallback blog data');
                return this.getFallbackBlogPosts();
            }
        },

        // === CREATE OPERATIONS ===
        async createBooking(bookingData) {
            try {
                return await this.request(config.endpoints.bookings, {
                    method: 'POST',
                    body: JSON.stringify(bookingData)
                });
            } catch (error) {
                console.error('Booking creation failed:', error);
                // Simulate success for demo
                return { success: true, message: 'Booking received (offline mode)' };
            }
        },

        async createTripPlan(tripPlanData) {
            try {
                return await this.request(config.endpoints.tripPlan, {
                    method: 'POST',
                    body: JSON.stringify(tripPlanData)
                });
            } catch (error) {
                console.error('Trip plan creation failed:', error);
                return { success: true, message: 'Trip plan received (offline mode)' };
            }
        },

        async subscribeNewsletter(emailData) {
            try {
                return await this.request(config.endpoints.newsletter, {
                    method: 'POST',
                    body: JSON.stringify(emailData)
                });
            } catch (error) {
                console.error('Newsletter subscription failed:', error);
                return { success: true, message: 'Subscription received (offline mode)' };
            }
        },

        async sendContactMessage(contactData) {
            try {
                return await this.request(config.endpoints.contact, {
                    method: 'POST',
                    body: JSON.stringify(contactData)
                });
            } catch (error) {
                console.error('Contact message failed:', error);
                return { success: true, message: 'Message received (offline mode)' };
            }
        },

        // === FALLBACK DATA (For offline/demo use) ===
        getFallbackGuides() {
            return [
                {
                    id: 'guide1',
                    name: 'Jean Pierre',
                    specialty: 'Wildlife Expert',
                    languages: ['English', 'French', 'Kinyarwanda'],
                    experience: '10+ years',
                    rating: 4.8,
                    dailyRate: 150,
                    image: '#'
                },
                {
                    id: 'guide2',
                    name: 'Marie Claire',
                    specialty: 'Cultural Guide',
                    languages: ['English', 'Swahili', 'Kinyarwanda'],
                    experience: '7+ years',
                    rating: 4.9,
                    dailyRate: 120,
                    image: '#'
                }
            ];
        },

        getFallbackDestinations() {
            return [
                {
                    id: 'dest1',
                    name: 'Volcanoes National Park',
                    location: 'Northern Province, Rwanda',
                    description: 'Home to the endangered mountain gorillas, offering unforgettable gorilla trekking experiences.',
                    rating: 4.9,
                    price: '$1500',
                    features: ['Gorilla Trekking', 'Bird Watching', 'Hiking'],
                    image: 'images/virunga-mountains.jpg'
                },
                {
                    id: 'dest2',
                    name: 'Nyungwe Forest',
                    location: 'Southwestern Rwanda',
                    description: 'Ancient rainforest with canopy walks, chimpanzee tracking, and diverse wildlife.',
                    rating: 4.7,
                    price: '$1200',
                    features: ['Canopy Walk', 'Chimpanzee Tracking', 'Waterfalls'],
                    image: 'images/nyungwe-weather.jpg'
                }
            ];
        },

        getFallbackTranslators() {
            return [
                {
                    id: 'translator1',
                    name: 'Alice Mukamana',
                    specialty: 'French & Kinyarwanda Translator',
                    languages: ['French', 'English', 'Kinyarwanda'],
                    experience: '5+ years',
                    rating: 4.7,
                    dailyRate: 100,
                    image: '#'
                },
                {
                    id: 'translator2',
                    name: 'John Habimana',
                    specialty: 'English & Swahili Translator',
                    languages: ['English', 'Swahili', 'Kinyarwanda'],
                    experience: '8+ years',
                    rating: 4.9,
                    dailyRate: 120,
                    image: '#'
                }
            ];
        },

        getFallbackAccommodations() {
            return [
                {
                    id: 'acc1',
                    name: 'Kigali Serena Hotel',
                    type: 'Luxury Hotel',
                    location: 'Kigali, Rwanda',
                    description: '5-star luxury hotel in the heart of Kigali with excellent amenities.',
                    dailyRate: 350,
                    features: ['Pool', 'Spa', 'WiFi', 'Restaurant'],
                    image: 'aeriel-view-serena.jpg'
                }
            ];
        },

        getFallbackBlogPosts() {
            return [
                {
                    id: 'blog1',
                    title: 'Discovering Rwanda: The Land of a Thousand Hills',
                    excerpt: 'A comprehensive guide to Rwanda\'s most beautiful destinations.',
                    category: 'Travel Guide',
                    date: new Date().toISOString(),
                    readTime: '5 min read',
                    author: 'Go Trip Team',
                    image: 'mount-bisoke-rwanda.jpg'
                }
            ];
        }
    };

    // ===============================
    // NAVIGATION SYSTEM
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
            setTimeout(() => targetPage.classList.add('active'), 10);
            loadPageContent(pageId);
        } else {
            // Fallback to home
            showPage('home');
        }
        
        // Update active nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.page === pageId) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu
        const mobileMenu = document.querySelector('.nav-links');
        const mobileBtn = document.querySelector('.mobile-menu-btn');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            if (mobileBtn) mobileBtn.classList.remove('active');
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

    // ===============================
    // PAGE CONTENT LOADERS
    // ===============================
    
    async function loadHomePage() {
        console.log('🏠 Loading home page...');
        
        // Load featured destinations
        const destinationsGrid = document.querySelector('.destinations-grid');
        if (destinationsGrid) {
            try {
                const destinations = await apiService.getDestinations();
                const featured = destinations.slice(0, 4);
                renderDestinations(featured, destinationsGrid);
            } catch (error) {
                destinationsGrid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-map-marked-alt"></i>
                        <p>Loading destinations...</p>
                    </div>
                `;
            }
        }
        
        // Load blog preview
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            try {
                const blogPosts = await apiService.getBlogPosts();
                const featured = blogPosts.slice(0, 3);
                renderBlogPosts(featured, blogGrid);
            } catch (error) {
                blogGrid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-newspaper"></i>
                        <p>Loading blog posts...</p>
                    </div>
                `;
            }
        }
    }

    async function loadDestinationsPage() {
        const grid = document.querySelector('.destinations-grid-full');
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1/-1; margin: 40px auto;"></div>
        `;
        
        try {
            const destinations = await apiService.getDestinations();
            renderDestinations(destinations, grid);
        } catch (error) {
            grid.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-map-marked-alt"></i>
                    <h3>No destinations available</h3>
                    <p>Check back soon or contact us directly.</p>
                </div>
            `;
        }
    }

    async function loadGuidesPage() {
        const grid = document.querySelector('.guides-grid-full');
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1/-1; margin: 40px auto;"></div>
        `;
        
        try {
            const guides = await apiService.getGuides();
            renderGuides(guides, grid);
        } catch (error) {
            grid.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-user-tie"></i>
                    <h3>No guides available</h3>
                    <p>Check back soon or contact us directly.</p>
                </div>
            `;
        }
    }

    async function loadTranslatorsPage() {
        const grid = document.querySelector('.translators-grid-full');
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1/-1; margin: 40px auto;"></div>
        `;
        
        try {
            const translators = await apiService.getTranslators();
            renderTranslators(translators, grid);
        } catch (error) {
            grid.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-language"></i>
                    <h3>No translators available</h3>
                    <p>Check back soon or contact us directly.</p>
                </div>
            `;
        }
    }

    async function loadAccommodationsPage() {
        const grid = document.querySelector('.accommodations-grid-full');
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1/-1; margin: 40px auto;"></div>
        `;
        
        try {
            const accommodations = await apiService.getAccommodations();
            renderAccommodations(accommodations, grid);
        } catch (error) {
            grid.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-hotel"></i>
                    <h3>No accommodations available</h3>
                    <p>Check back soon or contact us directly.</p>
                </div>
            `;
        }
    }

    async function loadBlogPage() {
        const grid = document.querySelector('.blog-grid-full');
        if (!grid) return;
        
        grid.innerHTML = `
            <div class="loading-spinner" style="grid-column: 1/-1; margin: 40px auto;"></div>
        `;
        
        try {
            const blogPosts = await apiService.getBlogPosts();
            renderBlogPosts(blogPosts, grid);
        } catch (error) {
            grid.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-newspaper"></i>
                    <h3>No blog posts available</h3>
                    <p>Check back soon for updates.</p>
                </div>
            `;
        }
    }

    // ===============================
    // RENDER FUNCTIONS
    // ===============================
    
    function renderDestinations(destinations, container) {
        if (!destinations || destinations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-map-marked-alt"></i>
                    <h3>No destinations found</h3>
                    <p>Please check back later.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = destinations.map(dest => {
            const imageUrl = dest.image || 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
            const rating = dest.rating ? dest.rating.toFixed(1) : null;
            const price = dest.price || dest.dailyRate ? `$${dest.dailyRate || dest.price}` : 'Contact for price';
            
            return `
            <div class="destination-card" role="listitem">
                <div class="destination-image">
                    <img src="${imageUrl}" 
                         alt="${dest.name || 'Destination'}" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
                    ${rating ? `
                        <div class="destination-rating">
                            <i class="fas fa-star"></i> ${rating}
                        </div>
                    ` : ''}
                </div>
                <div class="destination-content">
                    <h3>${dest.name || 'Destination'}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${dest.location || 'Rwanda'}
                    </div>
                    <p class="destination-description">
                        ${(dest.description || dest.shortDescription || '').substring(0, 100)}...
                    </p>
                    ${dest.features ? `
                        <div class="destination-features">
                            ${dest.features.slice(0, 3).map(f => 
                                `<span class="feature">${f}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    <div class="price-tag">
                        <i class="fas fa-tag"></i> ${price}
                    </div>
                    <button class="btn btn-primary book-now" 
                            data-type="destination" 
                            data-id="${dest.id || dest._id || dest.name}"
                            data-name="${dest.name}">
                        Book Now
                    </button>
                </div>
            </div>
        `}).join('');
    }

    function renderGuides(guides, container) {
        if (!guides || guides.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-user-tie"></i>
                    <h3>No guides available</h3>
                    <p>Please check back later.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = guides.map(guide => {
            const imageUrl = guide.image || '#';
            const rating = guide.rating ? guide.rating.toFixed(1) : null;
            
            return `
            <div class="guide-card" role="listitem">
                <div class="guide-avatar">
                    <img src="${imageUrl}" 
                         alt="${guide.name || 'Tour Guide'}" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1540569876033-6e5d046a1d77?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
                    <div class="guide-status"></div>
                </div>
                <div class="guide-info">
                    <h3>${guide.name || 'Tour Guide'}</h3>
                    <p class="specialty">${guide.specialty || 'Professional Guide'}</p>
                    
                    ${guide.languages ? `
                        <div class="languages-section">
                            <div class="languages-header">
                                <i class="fas fa-language"></i>
                                <strong>Languages:</strong>
                            </div>
                            <div class="languages-list">
                                ${guide.languages.map(lang => 
                                    `<span class="language-tag">${lang}</span>`
                                ).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${guide.experience ? `
                        <p class="experience">
                            <i class="fas fa-briefcase"></i> ${guide.experience}
                        </p>
                    ` : ''}
                    
                    ${rating ? `
                        <div class="rating">
                            ${'★'.repeat(Math.floor(guide.rating))}${guide.rating % 1 ? '½' : ''}
                            <span>${rating}</span>
                        </div>
                    ` : ''}
                    
                    ${guide.dailyRate ? `
                        <div class="price-tag">$${guide.dailyRate}/day</div>
                    ` : ''}
                    
                    <button class="btn btn-primary book-now" 
                            data-type="guide" 
                            data-id="${guide.id || guide._id || guide.name}"
                            data-name="${guide.name}">
                        Hire Now
                    </button>
                </div>
            </div>
        `}).join('');
    }

    function renderTranslators(translators, container) {
        if (!translators || translators.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-language"></i>
                    <h3>No translators available</h3>
                    <p>Please check back later.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = translators.map(translator => {
            const imageUrl = translator.image || '#';
            const rating = translator.rating ? translator.rating.toFixed(1) : null;
            
            return `
            <div class="translator-card" role="listitem">
                <div class="guide-avatar">
                    <img src="${imageUrl}" 
                         alt="${translator.name || 'Translator'}" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
                    <div class="guide-status"></div>
                </div>
                <div class="guide-info">
                    <h3>${translator.name || 'Translator'}</h3>
                    <p class="specialty">${translator.specialty || 'Professional Translator'}</p>
                    
                    ${translator.languages ? `
                        <div class="languages-section">
                            <div class="languages-header">
                                <i class="fas fa-language"></i>
                                <strong>Languages:</strong>
                            </div>
                            <div class="languages-list">
                                ${translator.languages.map(lang => 
                                    `<span class="language-tag">${lang}</span>`
                                ).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    ${translator.experience ? `
                        <p class="experience">
                            <i class="fas fa-briefcase"></i> ${translator.experience}
                        </p>
                    ` : ''}
                    
                    ${rating ? `
                        <div class="rating">
                            ${'★'.repeat(Math.floor(translator.rating))}${translator.rating % 1 ? '½' : ''}
                            <span>${rating}</span>
                        </div>
                    ` : ''}
                    
                    ${translator.dailyRate ? `
                        <div class="price-tag">$${translator.dailyRate}/day</div>
                    ` : ''}
                    
                    <button class="btn btn-primary book-now" 
                            data-type="translator" 
                            data-id="${translator.id || translator._id || translator.name}"
                            data-name="${translator.name}">
                        Hire Now
                    </button>
                </div>
            </div>
        `}).join('');
    }

    function renderAccommodations(accommodations, container) {
        if (!accommodations || accommodations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-hotel"></i>
                    <h3>No accommodations available</h3>
                    <p>Please check back later.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = accommodations.map(acc => {
            const imageUrl = acc.image || '#';
            
            return `
            <div class="accommodation-card" role="listitem">
                <div class="accommodation-image">
                    <img src="${imageUrl}" 
                         alt="${acc.name || 'Accommodation'}" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
                </div>
                <div class="accommodation-content">
                    ${acc.type ? `<span class="type">${acc.type}</span>` : ''}
                    <h3>${acc.name || 'Accommodation'}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${acc.location || 'Rwanda'}
                    </div>
                    <p>${(acc.description || '').substring(0, 120)}...</p>
                    ${acc.features ? `
                        <div class="features">
                            ${acc.features.slice(0, 3).map(f => 
                                `<span class="feature-tag">${f}</span>`
                            ).join('')}
                        </div>
                    ` : ''}
                    ${acc.dailyRate ? `
                        <div class="price-tag">$${acc.dailyRate}/night</div>
                    ` : ''}
                    <button class="btn btn-primary book-now" 
                            data-type="accommodation" 
                            data-id="${acc.id || acc._id || acc.name}"
                            data-name="${acc.name}">
                        Book Now
                    </button>
                </div>
            </div>
        `}).join('');
    }

    function renderBlogPosts(blogPosts, container) {
        if (!blogPosts || blogPosts.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-newspaper"></i>
                    <h3>No blog posts available</h3>
                    <p>Please check back later.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = blogPosts.map(post => {
            const imageUrl = post.image || '#';
            const date = post.date ? new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : 'Recent';
            
            return `
            <article class="blog-card" role="listitem">
                <div class="blog-image">
                    <img src="${imageUrl}" 
                         alt="${post.title || 'Blog Post'}" 
                         loading="lazy"
                         onerror="this.src='https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'">
                    ${post.category ? `
                        <span class="blog-category">${post.category}</span>
                    ` : ''}
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date">
                            <i class="fas fa-calendar"></i> ${date}
                        </span>
                        <span class="blog-read-time">${post.readTime || '5 min read'}</span>
                    </div>
                    <h3>${post.title || 'Blog Post'}</h3>
                    <p class="blog-excerpt">
                        ${(post.excerpt || post.description || '').substring(0, 120)}...
                    </p>
                    <div class="author">
                        <i class="fas fa-user"></i> ${post.author || 'Go Trip Team'}
                    </div>
                    <a href="#" class="read-more-link" data-id="${post.id || post._id || post.title}">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `}).join('');
    }

    // ===============================
    // MODAL FUNCTIONS
    // ===============================
    
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
                    <p>Complete this form to book ${serviceName}. We'll contact you shortly to confirm.</p>
                    <form id="booking-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-name">Full Name *</label>
                                <input type="text" id="booking-name" name="name" required placeholder="Your full name">
                            </div>
                            <div class="form-group">
                                <label for="booking-email">Email *</label>
                                <input type="email" id="booking-email" name="email" required placeholder="Your email">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-phone">Phone *</label>
                                <input type="tel" id="booking-phone" name="phone" required placeholder="Your phone number">
                            </div>
                            <div class="form-group">
                                <label for="booking-date">Preferred Date *</label>
                                <input type="date" id="booking-date" name="date" required min="${minDate}">
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="booking-message">Additional Details</label>
                            <textarea id="booking-message" name="message" placeholder="Any special requests..." rows="4"></textarea>
                        </div>
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary btn-large">
                                <i class="fas fa-paper-plane"></i> Submit Booking
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#booking-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            if (!data.name || !data.email || !data.phone || !data.date) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            if (!validatePhone(data.phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            const bookingData = {
                serviceType,
                serviceId,
                serviceName,
                ...data,
                submittedAt: new Date().toISOString()
            };
            
            showLoading(submitBtn, true);
            
            try {
                const result = await apiService.createBooking(bookingData);
                showNotification('Booking submitted successfully! We\'ll contact you soon.', 'success');
                closeModal();
            } catch (error) {
                showNotification('Booking submitted (offline mode)', 'info');
                closeModal();
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    // Preload trip plan modal HTML for faster loading
    function preloadTripPlanModal() {
        if (preloadedTripPlanModal) return preloadedTripPlanModal;
        
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const minDate = tomorrow.toISOString().split('T')[0];
        
        preloadedTripPlanModal = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-map-marked-alt"></i> Plan Your Trip</h2>
                    <button class="modal-close" aria-label="Close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Tell us about your dream Rwanda adventure. We'll create a custom itinerary just for you.</p>
                    <form id="trip-plan-form">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="trip-name">Full Name *</label>
                                <input type="text" id="trip-name" name="name" required placeholder="Your full name">
                            </div>
                            <div class="form-group">
                                <label for="trip-email">Email *</label>
                                <input type="email" id="trip-email" name="email" required placeholder="Your email">
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="trip-phone">Phone *</label>
                                <input type="tel" id="trip-phone" name="phone" required placeholder="Your phone number">
                            </div>
                            <div class="form-group">
                                <label for="trip-travelers">Number of Travelers *</label>
                                <select id="trip-travelers" name="travelers" required>
                                    <option value="">Select...</option>
                                    <option value="1">1 person</option>
                                    <option value="2">2 people</option>
                                    <option value="3-4">3-4 people</option>
                                    <option value="5+">5+ people</option>
                                </select>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="trip-start">Start Date *</label>
                                <input type="date" id="trip-start" name="startDate" required min="${minDate}">
                            </div>
                            <div class="form-group">
                                <label for="trip-duration">Duration (days) *</label>
                                <input type="number" id="trip-duration" name="duration" required min="1" max="30" placeholder="e.g., 7">
                            </div>
                        </div>
                        
                        <div class="form-section">
                            <h4><i class="fas fa-heart"></i> Select Your Interests</h4>
                            <p class="section-description">Choose activities that interest you (select all that apply):</p>
                            
                            <div class="interests-grid">
                                <div class="interest-category">
                                    <h5><i class="fas fa-paw"></i> Wildlife & Nature</h5>
                                    <div class="interest-options">
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="gorilla_trekking">
                                            <span class="interest-label">
                                                Gorilla Trekking
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="wildlife_safari">
                                            <span class="interest-label">
                                                Wildlife Safari
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="bird_watching">
                                            <span class="interest-label">
                                                Bird Watching
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="chimpanzee_tracking">
                                            <span class="interest-label">
                                                Chimpanzee Tracking
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="interest-category">
                                    <h5><i class="fas fa-hiking"></i> Adventure & Outdoors</h5>
                                    <div class="interest-options">
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="mountain_hiking">
                                            <span class="interest-label">
                                                Mountain Hiking
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="canopy_walk">
                                            <span class="interest-label">
                                                Canopy Walk
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="waterfall_exploration">
                                            <span class="interest-label">
                                                Waterfall Exploration
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="nature_walks">
                                            <span class="interest-label">
                                                Nature Walks
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="interest-category">
                                    <h5><i class="fas fa-landmark"></i> Culture & History</h5>
                                    <div class="interest-options">
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="cultural_tours">
                                            <span class="interest-label">
                                                Cultural Village Tours
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="historical_sites">
                                            <span class="interest-label">
                                                Historical Sites
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="local_cuisine">
                                            <span class="interest-label">
                                                Local Cuisine Experience
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="art_crafts">
                                            <span class="interest-label">
                                                Arts & Crafts
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                
                                <div class="interest-category">
                                    <h5><i class="fas fa-spa"></i> Relaxation & Luxury</h5>
                                    <div class="interest-options">
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="luxury_accommodation">
                                            <span class="interest-label">
                                                Luxury Accommodations
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="spa_wellness">
                                            <span class="interest-label">
                                                Spa & Wellness
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="photography_tour">
                                            <span class="interest-label">
                                                Photography Tour
                                            </span>
                                        </label>
                                        <label class="interest-checkbox">
                                            <input type="checkbox" name="interests" value="city_exploration">
                                            <span class="interest-label">
                                                City Exploration
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="trip-message">Tell us about your dream trip *</label>
                            <textarea id="trip-message" name="message" required placeholder="What would you like to experience in Rwanda?" rows="4"></textarea>
                        </div>
                        
                        <div class="form-check">
                            <input type="checkbox" id="trip-newsletter" name="newsletter" checked>
                            <label for="trip-newsletter">Subscribe to our newsletter for travel tips and offers</label>
                        </div>
                        
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary btn-large">
                                <i class="fas fa-paper-plane"></i> Submit Trip Plan
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        
        return preloadedTripPlanModal;
    }

    function showTripPlanningModal() {
        // Use preloaded modal HTML for faster loading
        const modalHTML = preloadTripPlanModal();
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#trip-plan-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
            
            if (!data.name || !data.email || !data.phone || !data.travelers || !data.startDate || !data.duration || !data.message) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            if (!validatePhone(data.phone)) {
                showNotification('Please enter a valid phone number', 'error');
                return;
            }
            
            if (interests.length === 0) {
                showNotification('Please select at least one interest', 'error');
                return;
            }
            
            const tripData = {
                ...data,
                interests,
                submittedAt: new Date().toISOString()
            };
            
            showLoading(submitBtn, true);
            
            try {
                const result = await apiService.createTripPlan(tripData);
                showNotification('Trip plan submitted successfully! We\'ll contact you soon.', 'success');
                closeModal();
            } catch (error) {
                showNotification('Trip plan submitted (offline mode)', 'info');
                closeModal();
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    function createModal(content) {
        // Close any existing modal
        closeModal();
        
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal-container';
        modalContainer.className = 'modal-container';
        modalContainer.setAttribute('role', 'dialog');
        modalContainer.setAttribute('aria-modal', 'true');
        
        modalContainer.innerHTML = content;
        document.body.appendChild(modalContainer);
        
        // Add close handlers
        const closeBtn = modalContainer.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
        
        const handleClickOutside = (e) => {
            if (e.target === modalContainer) {
                closeModal();
            }
        };
        
        const handleEscape = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        
        modalContainer.addEventListener('click', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        
        // Store handlers for cleanup
        modalContainer._handlers = { handleClickOutside, handleEscape };
        
        // Show modal
        requestAnimationFrame(() => {
            modalContainer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
        
        return modalContainer;
    }

    function closeModal() {
        const modal = document.getElementById('modal-container');
        if (modal) {
            modal.classList.remove('active');
            
            // Cleanup event listeners
            if (modal._handlers) {
                modal.removeEventListener('click', modal._handlers.handleClickOutside);
                document.removeEventListener('keydown', modal._handlers.handleEscape);
            }
            
            setTimeout(() => {
                if (modal.parentNode) {
                    modal.parentNode.removeChild(modal);
                }
                document.body.style.overflow = '';
            }, 300);
        }
    }

    // ===============================
    // HERO MESSAGE ROTATION
    // ===============================
    
    function initializeHeroMessages() {
        const messagesContainer = document.querySelector('.hero-messages');
        const messages = config.heroMessages;
        
        if (!messagesContainer || !messages.length) return;
        
        // Initialize messages
        messagesContainer.innerHTML = messages.map((msg, index) => `
            <div class="hero-message ${index === 0 ? 'active' : ''}">
                <i class="fas ${msg.icon}"></i>
                <span>${msg.text}</span>
            </div>
        `).join('');
        
        // Start rotation
        startMessageRotation();
        
        // Add control handlers
        const prevBtn = document.querySelector('.hero-message-prev');
        const nextBtn = document.querySelector('.hero-message-next');
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                changeMessage(-1);
                restartRotation();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                changeMessage(1);
                restartRotation();
            });
        }
    }
    
    function changeMessage(direction) {
        const messages = document.querySelectorAll('.hero-message');
        const total = messages.length;
        
        messages[currentHeroMessageIndex].classList.remove('active');
        currentHeroMessageIndex = (currentHeroMessageIndex + direction + total) % total;
        messages[currentHeroMessageIndex].classList.add('active');
    }
    
    function startMessageRotation() {
        if (heroMessageTimer) clearInterval(heroMessageTimer);
        heroMessageTimer = setInterval(() => {
            changeMessage(1);
        }, 4000);
    }
    
    function restartRotation() {
        startMessageRotation();
    }

    // ===============================
    // SEARCH FUNCTIONALITY
    // ===============================
    
    function initializeSearch() {
        const heroSearchBtn = document.querySelector('.hero-search-btn');
        const heroSearchForm = document.querySelector('.hero-search-form');
        const searchModal = document.getElementById('search-modal');
        
        // Hero search form submission
        if (heroSearchForm) {
            heroSearchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchInput = this.querySelector('input[type="search"]');
                const searchTerm = searchInput.value.trim();
                
                if (searchTerm) {
                    showNotification(`Searching for "${searchTerm}"...`, 'info', 2000);
                    // Navigate to destinations page and highlight search results
                    showPage('destinations');
                    // You could add search filtering logic here
                }
            });
        }
        
        // Hero search button (if separate from form)
        if (heroSearchBtn && !heroSearchBtn.closest('form')) {
            heroSearchBtn.addEventListener('click', function(e) {
                e.preventDefault();
                if (searchModal) {
                    searchModal.hidden = false;
                    requestAnimationFrame(() => {
                        const searchInput = searchModal.querySelector('input[type="search"]');
                        if (searchInput) searchInput.focus();
                    });
                } else {
                    // Fallback: navigate to destinations page
                    showPage('destinations');
                }
            });
        }
    }

    // ===============================
    // EVENT HANDLERS
    // ===============================
    
    function setupEventListeners() {
        // Navigation links
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            // Navigation
            if (target.matches('.nav-link')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
            
            // Service links
            if (target.matches('.service-link')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
            
            // Explore Destinations button (hero section)
            if (target.matches('.explore-destinations-btn') || target.closest('.explore-destinations-btn')) {
                e.preventDefault();
                showPage('destinations');
            }
            
            // Book now buttons
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
            
            // Plan trip buttons (FAST LOADING)
            if (target.matches('.plan-trip-nav-btn, .plan-trip-hero-btn, .plan-trip-footer-btn') || 
                target.closest('.plan-trip-nav-btn, .plan-trip-hero-btn, .plan-trip-footer-btn')) {
                e.preventDefault();
                showTripPlanningModal();
            }
            
            // View all buttons
            if (target.matches('.view-all-btn')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
            
            // Read more links
            if (target.matches('.read-more-link') || target.closest('.read-more-link')) {
                e.preventDefault();
                const link = target.matches('.read-more-link') ? target : target.closest('.read-more-link');
                const page = link.dataset.page || 'blog';
                showPage(page);
            }
            
            // Footer links
            if (target.matches('.footer-links a[data-page]')) {
                e.preventDefault();
                const page = target.dataset.page;
                if (page) showPage(page);
            }
        });
        
        // Mobile menu
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });
        }
        
        // Search modal
        const searchBtn = document.getElementById('search-btn-desktop');
        const searchModal = document.getElementById('search-modal');
        const searchClose = searchModal?.querySelector('.search-close');
        
        if (searchBtn && searchModal) {
            searchBtn.addEventListener('click', () => {
                searchModal.hidden = false;
                requestAnimationFrame(() => {
                    const searchInput = searchModal.querySelector('input[type="search"]');
                    if (searchInput) searchInput.focus();
                });
            });
        }
        
        if (searchClose) {
            searchClose.addEventListener('click', () => {
                searchModal.hidden = true;
            });
        }
        
        // Initialize search functionality
        initializeSearch();
        
        // Newsletter forms
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
                    const result = await apiService.subscribeNewsletter({ email });
                    showNotification('Successfully subscribed to newsletter!', 'success');
                    form.reset();
                } catch (error) {
                    showNotification('Subscribed (offline mode)', 'info');
                    form.reset();
                } finally {
                    showLoading(submitBtn, false);
                }
            });
        });
        
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
                
                try {
                    const result = await apiService.sendContactMessage({ name, email, subject, message });
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                } catch (error) {
                    showNotification('Message sent (offline mode)', 'info');
                    contactForm.reset();
                } finally {
                    showLoading(submitBtn, false);
                }
            });
        }
        
        // Window resize - close mobile menu on large screens
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                if (mobileMenuBtn) mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ===============================
    // IMAGE LAZY LOADING
    // ===============================
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.1
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for older browsers
            images.forEach(img => {
                img.classList.add('loaded');
            });
        }
    }

    // ===============================
    // CONNECTION STATUS
    // ===============================
    function updateConnectionStatus(status) {
        const statusEl = document.getElementById('connection-status');
        if (!statusEl) return;
        
        let icon = 'fa-circle';
        let text = 'Checking connection...';
        
        switch(status) {
            case 'online':
                icon = 'fa-check-circle';
                text = 'Connected';
                break;
            case 'offline':
                icon = 'fa-times-circle';
                text = 'Offline';
                break;
            case 'limited':
                icon = 'fa-exclamation-triangle';
                text = 'Limited connection';
                break;
        }
        
        statusEl.className = `connection-status ${status}`;
        statusEl.innerHTML = `<i class="fas ${icon}"></i><span>${text}</span>`;
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing Go Trip Application');
        
        // Hide loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.style.opacity = '0';
                setTimeout(() => {
                    loadingOverlay.style.display = 'none';
                }, 500);
            }, 500);
        }
        
        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Preload trip plan modal for faster loading
        preloadTripPlanModal();
        
        // Initialize UI components
        initializeHeroMessages();
        setupEventListeners();
        initLazyLoading();
        
        // Add connection status element if not exists
        if (!document.getElementById('connection-status')) {
            const statusDiv = document.createElement('div');
            statusDiv.id = 'connection-status';
            statusDiv.className = 'connection-status checking';
            statusDiv.innerHTML = '<i class="fas fa-circle"></i><span>Checking connection...</span>';
            document.body.appendChild(statusDiv);
        }
        
        // Test backend connection
        try {
            const health = await apiService.checkHealth();
            connectionStatus = health.api ? 'online' : 'offline';
            updateConnectionStatus(connectionStatus);
            console.log(`✅ Backend status: ${connectionStatus}`);
        } catch (error) {
            connectionStatus = 'offline';
            updateConnectionStatus('offline');
            console.log('⚠️ Running in offline mode');
        }
        
        // Online/offline detection
        window.addEventListener('online', () => {
            updateConnectionStatus('online');
            showNotification('Back online', 'success', 2000);
        });
        
        window.addEventListener('offline', () => {
            updateConnectionStatus('offline');
            showNotification('You are offline. Some features may not work.', 'warning', 3000);
        });
        
        // Load initial page
        const path = window.location.pathname;
        let page = 'home';
        
        if (path !== '/') {
            const pageMatch = path.match(/\/(\w+)/);
            if (pageMatch && pageMatch[1]) {
                page = pageMatch[1];
            }
        }
        
        showPage(page);
        
        console.log('✅ Application initialized');
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
        utils: {
            validateEmail,
            validatePhone,
            showLoading
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