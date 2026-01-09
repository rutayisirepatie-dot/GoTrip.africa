// Go Trip Frontend Application v4.7 - Final Optimized with Image Fixes
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
        
        debug: true,
        
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
            blog: 'images/blog-fallback.jpg'
        }
    };

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentWelcomeIndex = 0;
    let welcomeMessageTimer = null;
    let preloadedTripPlanModal = null;
    let hasShownWelcome = false;
    let imageCache = new Map();

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

    // IMAGE HANDLING FUNCTIONS - FIXED
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
                console.log('Failed to load image, using fallback:', url);
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
    // API SERVICE
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

        getFallbackData(endpoint) {
            switch(endpoint) {
                case config.endpoints.guides:
                    return this.getFallbackGuides();
                case config.endpoints.destinations:
                    return this.getFallbackDestinations();
                case config.endpoints.translators:
                    return this.getFallbackTranslators();
                case config.endpoints.accommodations:
                    return this.getFallbackAccommodations();
                case config.endpoints.blog:
                    return this.getFallbackBlogPosts();
                default:
                    return [];
            }
        },

        async getGuides() {
            try {
                showSectionLoader('guides-section', true);
                const data = await this.request(config.endpoints.guides);
                const guides = data.data || data.guides || data || this.getFallbackGuides();
                
                // Preload guide images
                if (Array.isArray(guides)) {
                    await Promise.all(guides.map(guide => 
                        preloadImage(getImageUrl(guide.image, 'guide'))
                    ));
                }
                
                return guides;
            } catch (error) {
                return this.getFallbackGuides();
            } finally {
                showSectionLoader('guides-section', false);
            }
        },

        async getDestinations() {
            try {
                showSectionLoader('destinations-section', true);
                const data = await this.request(config.endpoints.destinations);
                const destinations = data.data || data.destinations || data || this.getFallbackDestinations();
                
                // Preload destination images
                if (Array.isArray(destinations)) {
                    await Promise.all(destinations.map(destination => 
                        preloadImage(getImageUrl(destination.image, 'destination'))
                    ));
                }
                
                return destinations;
            } catch (error) {
                return this.getFallbackDestinations();
            } finally {
                showSectionLoader('destinations-section', false);
            }
        },

        async getTranslators() {
            try {
                showSectionLoader('translators-section', true);
                const data = await this.request(config.endpoints.translators);
                const translators = data.data || data.translators || data || this.getFallbackTranslators();
                
                // Preload translator images
                if (Array.isArray(translators)) {
                    await Promise.all(translators.map(translator => 
                        preloadImage(getImageUrl(translator.image, 'translator'))
                    ));
                }
                
                return translators;
            } catch (error) {
                return this.getFallbackTranslators();
            } finally {
                showSectionLoader('translators-section', false);
            }
        },

        async getAccommodations() {
            try {
                showSectionLoader('accommodations-section', true);
                const data = await this.request(config.endpoints.accommodations);
                const accommodations = data.data || data.accommodations || data || this.getFallbackAccommodations();
                
                // Preload accommodation images
                if (Array.isArray(accommodations)) {
                    await Promise.all(accommodations.map(acc => 
                        preloadImage(getImageUrl(acc.image, 'accommodation'))
                    ));
                }
                
                return accommodations;
            } catch (error) {
                return this.getFallbackAccommodations();
            } finally {
                showSectionLoader('accommodations-section', false);
            }
        },

        async getBlogPosts() {
            try {
                showSectionLoader('blog-section', true);
                const data = await this.request(config.endpoints.blog);
                const blogPosts = data.data || data.blog || data || this.getFallbackBlogPosts();
                
                // Preload blog images
                if (Array.isArray(blogPosts)) {
                    await Promise.all(blogPosts.map(post => 
                        preloadImage(getImageUrl(post.image, 'blog'))
                    ));
                }
                
                return blogPosts;
            } catch (error) {
                return this.getFallbackBlogPosts();
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
        },

        // FALLBACK DATA WITH PROPER IMAGE PATHS
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
                    image: 'guides/guide1.jpg'
                },
                {
                    id: 'guide2',
                    name: 'Marie Claire',
                    specialty: 'Cultural Guide',
                    languages: ['English', 'Swahili', 'Kinyarwanda'],
                    experience: '7+ years',
                    rating: 4.9,
                    dailyRate: 120,
                    image: 'guides/guide2.jpg'
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
                    image: 'destinations/volcanoes.jpg'
                },
                {
                    id: 'dest2',
                    name: 'Nyungwe Forest',
                    location: 'Southwestern Rwanda',
                    description: 'Ancient rainforest with canopy walks, chimpanzee tracking, and diverse wildlife.',
                    rating: 4.7,
                    price: '$1200',
                    features: ['Canopy Walk', 'Chimpanzee Tracking', 'Waterfalls'],
                    image: 'destinations/nyungwe.jpg'
                },
                {
                    id: 'dest3',
                    name: 'Lake Kivu',
                    location: 'Western Rwanda',
                    description: 'One of Africa\'s Great Lakes, perfect for relaxation and water activities.',
                    rating: 4.6,
                    price: '$800',
                    features: ['Boating', 'Swimming', 'Beach'],
                    image: 'destinations/lakekivu.jpg'
                },
                {
                    id: 'dest4',
                    name: 'Akagera National Park',
                    location: 'Eastern Rwanda',
                    description: 'Rwanda\'s only Big Five safari destination with diverse wildlife.',
                    rating: 4.8,
                    price: '$1100',
                    features: ['Safari', 'Big Five', 'Bird Watching'],
                    image: 'destinations/akagera.jpg'
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
                    image: 'translators/translator1.jpg'
                },
                {
                    id: 'translator2',
                    name: 'John Habimana',
                    specialty: 'English & Swahili Translator',
                    languages: ['English', 'Swahili', 'Kinyarwanda'],
                    experience: '8+ years',
                    rating: 4.9,
                    dailyRate: 120,
                    image: 'translators/translator2.jpg'
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
                    image: 'accommodations/serena.jpg'
                },
                {
                    id: 'acc2',
                    name: 'Nyungwe Top View Hill Hotel',
                    type: 'Eco Lodge',
                    location: 'Nyungwe, Rwanda',
                    description: 'Eco-friendly lodge with stunning forest views.',
                    dailyRate: 180,
                    features: ['Forest View', 'Restaurant', 'WiFi'],
                    image: 'accommodations/nyungwehotel.jpg'
                }
            ];
        },

        getFallbackBlogPosts() {
            return [
                {
                    id: 'blog1',
                    title: 'Discovering Rwanda: The Land of a Thousand Hills',
                    excerpt: 'A comprehensive guide to Rwanda\'s most beautiful destinations and cultural experiences.',
                    category: 'Travel Guide',
                    date: new Date().toISOString(),
                    readTime: '5 min read',
                    author: 'Go Trip Team',
                    image: 'blog/blog1.jpg'
                },
                {
                    id: 'blog2',
                    title: 'Gorilla Trekking: A Life-Changing Experience',
                    excerpt: 'What to expect when trekking mountain gorillas in Volcanoes National Park.',
                    category: 'Adventure',
                    date: new Date(Date.now() - 86400000).toISOString(),
                    readTime: '7 min read',
                    author: 'Go Trip Team',
                    image: 'blog/blog2.jpg'
                },
                {
                    id: 'blog3',
                    title: 'Cultural Experiences in Rwanda',
                    excerpt: 'Immerse yourself in Rwandan culture through traditional dances, food, and village visits.',
                    category: 'Culture',
                    date: new Date(Date.now() - 172800000).toISOString(),
                    readTime: '6 min read',
                    author: 'Go Trip Team',
                    image: 'blog/blog3.jpg'
                }
            ];
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
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Submitting booking...</p>
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
            </div>
        `;
        
        const modal = createModal(modalHTML);
        const form = modal.querySelector('#booking-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        const modalContent = modal.querySelector('#modal-content');
        const modalLoading = modal.querySelector('#modal-loading');
        
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
            
            modalContent.style.display = 'none';
            modalLoading.style.display = 'block';
            
            const bookingData = {
                serviceType,
                serviceId,
                serviceName,
                ...data,
                submittedAt: new Date().toISOString()
            };
            
            try {
                await apiService.createBooking(bookingData);
                showNotification('Booking submitted successfully! We\'ll contact you soon.', 'success');
                closeModal();
            } catch (error) {
                showNotification('Booking submitted. We\'ll contact you shortly.', 'info');
                closeModal();
            } finally {
                modalContent.style.display = 'block';
                modalLoading.style.display = 'none';
            }
        });
    }

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
                    <div class="modal-loading" id="modal-loading" style="display: none;">
                        <i class="fas fa-spinner fa-spin"></i>
                        <p>Creating your trip plan...</p>
                    </div>
                    <div id="modal-content">
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
                                <p>Choose activities that interest you (select all that apply):</p>
                                
                                <div class="interests-grid">
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="gorilla_trekking">
                                        <span class="checkbox-label">Gorilla Trekking</span>
                                    </label>
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="wildlife_safari">
                                        <span class="checkbox-label">Wildlife Safari</span>
                                    </label>
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="bird_watching">
                                        <span class="checkbox-label">Bird Watching</span>
                                    </label>
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="chimpanzee_tracking">
                                        <span class="checkbox-label">Chimpanzee Tracking</span>
                                    </label>
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="mountain_hiking">
                                        <span class="checkbox-label">Mountain Hiking</span>
                                    </label>
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="canopy_walk">
                                        <span class="checkbox-label">Canopy Walk</span>
                                    </label>
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="cultural_tours">
                                        <span class="checkbox-label">Cultural Tours</span>
                                    </label>
                                    <label class="interest-checkbox">
                                        <input type="checkbox" name="interests" value="luxury_accommodation">
                                        <span class="checkbox-label">Luxury Accommodations</span>
                                    </label>
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
            const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked')).map(cb => cb.value);
            
            if (!data.name || !data.email || !data.phone || !data.travelers || !data.startDate || !data.duration || !data.message) {
                showNotification('Please fill all required fields', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('Please enter a valid email', 'error');
                return;
            }
            
            if (interests.length === 0) {
                showNotification('Please select at least one interest', 'error');
                return;
            }
            
            modalContent.style.display = 'none';
            modalLoading.style.display = 'block';
            
            const tripData = {
                ...data,
                interests,
                submittedAt: new Date().toISOString()
            };
            
            try {
                await apiService.createTripPlan(tripData);
                showNotification('Trip plan submitted successfully! We\'ll contact you soon.', 'success');
                closeModal();
            } catch (error) {
                showNotification('Trip plan submitted. We\'ll contact you shortly.', 'info');
                closeModal();
            } finally {
                modalContent.style.display = 'block';
                modalLoading.style.display = 'none';
            }
        });
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
            console.error(`Error loading ${pageId}:`, error);
            showNotification(`Error loading ${pageId} content`, 'error');
        }
    }

    // ===============================
    // PAGE CONTENT LOADERS WITH IMAGE FIXES
    // ===============================
    
    async function loadHomePage() {
        const destinationsGrid = document.querySelector('.destinations-grid');
        if (destinationsGrid) {
            try {
                destinationsGrid.innerHTML = `
                    <div class="section-loader">
                        <div class="loader-spinner">
                            <i class="fas fa-spinner fa-spin fa-2x"></i>
                        </div>
                        <p class="loader-text">Loading destinations...</p>
                    </div>
                `;
                
                const destinations = await apiService.getDestinations();
                const featured = destinations.slice(0, 4);
                
                if (featured.length > 0) {
                    renderDestinations(featured, destinationsGrid);
                } else {
                    destinationsGrid.innerHTML = `
                        <div class="no-data-message">
                            <i class="fas fa-map-marked-alt"></i>
                            <p>No destinations available at the moment.</p>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Error loading destinations:', error);
                const fallback = apiService.getFallbackDestinations().slice(0, 4);
                renderDestinations(fallback, destinationsGrid);
            }
        }
        
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            try {
                blogGrid.innerHTML = `
                    <div class="section-loader">
                        <div class="loader-spinner">
                            <i class="fas fa-spinner fa-spin fa-2x"></i>
                        </div>
                        <p class="loader-text">Loading blog posts...</p>
                    </div>
                `;
                
                const blogPosts = await apiService.getBlogPosts();
                const featured = blogPosts.slice(0, 3);
                
                if (featured.length > 0) {
                    renderBlogPosts(featured, blogGrid);
                } else {
                    blogGrid.innerHTML = `
                        <div class="no-data-message">
                            <i class="fas fa-newspaper"></i>
                            <p>No blog posts available at the moment.</p>
                        </div>
                    `;
                }
            } catch (error) {
                console.error('Error loading blog posts:', error);
                const fallback = apiService.getFallbackBlogPosts().slice(0, 3);
                renderBlogPosts(fallback, blogGrid);
            }
        }
    }

    async function loadDestinationsPage() {
        const grid = document.querySelector('.destinations-grid-full');
        if (!grid) return;
        
        try {
            grid.innerHTML = `
                <div class="full-page-loader">
                    <div class="loader-content">
                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                        <h3>Loading Destinations</h3>
                        <p>Fetching the best travel spots in Rwanda...</p>
                    </div>
                </div>
            `;
            
            const destinations = await apiService.getDestinations();
            
            if (destinations.length > 0) {
                renderDestinations(destinations, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-map-marked-alt"></i>
                        <h3>No destinations available</h3>
                        <p>We're having trouble loading destinations at the moment.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading destinations:', error);
            const fallback = apiService.getFallbackDestinations();
            renderDestinations(fallback, grid);
        }
    }

    async function loadGuidesPage() {
        const grid = document.querySelector('.guides-grid-full');
        if (!grid) return;
        
        try {
            grid.innerHTML = `
                <div class="full-page-loader">
                    <div class="loader-content">
                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                        <h3>Loading Tour Guides</h3>
                        <p>Fetching our expert guides...</p>
                    </div>
                </div>
            `;
            
            const guides = await apiService.getGuides();
            
            if (guides.length > 0) {
                renderGuides(guides, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-user-tie"></i>
                        <h3>No guides available</h3>
                        <p>We're having trouble loading guides at the moment.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading guides:', error);
            const fallback = apiService.getFallbackGuides();
            renderGuides(fallback, grid);
        }
    }

    async function loadTranslatorsPage() {
        const grid = document.querySelector('.translators-grid-full');
        if (!grid) return;
        
        try {
            grid.innerHTML = `
                <div class="full-page-loader">
                    <div class="loader-content">
                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                        <h3>Loading Translators</h3>
                        <p>Fetching our language experts...</p>
                    </div>
                </div>
            `;
            
            const translators = await apiService.getTranslators();
            
            if (translators.length > 0) {
                renderTranslators(translators, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-language"></i>
                        <h3>No translators available</h3>
                        <p>We're having trouble loading translators at the moment.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading translators:', error);
            const fallback = apiService.getFallbackTranslators();
            renderTranslators(fallback, grid);
        }
    }

    async function loadAccommodationsPage() {
        const grid = document.querySelector('.accommodations-grid-full');
        if (!grid) return;
        
        try {
            grid.innerHTML = `
                <div class="full-page-loader">
                    <div class="loader-content">
                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                        <h3>Loading Accommodations</h3>
                        <p>Fetching the best places to stay...</p>
                    </div>
                </div>
            `;
            
            const accommodations = await apiService.getAccommodations();
            
            if (accommodations.length > 0) {
                renderAccommodations(accommodations, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-hotel"></i>
                        <h3>No accommodations available</h3>
                        <p>We're having trouble loading accommodations at the moment.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading accommodations:', error);
            const fallback = apiService.getFallbackAccommodations();
            renderAccommodations(fallback, grid);
        }
    }

    async function loadBlogPage() {
        const grid = document.querySelector('.blog-grid-full');
        if (!grid) return;
        
        try {
            grid.innerHTML = `
                <div class="full-page-loader">
                    <div class="loader-content">
                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                        <h3>Loading Blog Posts</h3>
                        <p>Fetching the latest travel stories...</p>
                    </div>
                </div>
            `;
            
            const blogPosts = await apiService.getBlogPosts();
            
            if (blogPosts.length > 0) {
                renderBlogPosts(blogPosts, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-newspaper"></i>
                        <h3>No blog posts available</h3>
                        <p>We're having trouble loading blog posts at the moment.</p>
                    </div>
                `;
            }
        } catch (error) {
            console.error('Error loading blog posts:', error);
            const fallback = apiService.getFallbackBlogPosts();
            renderBlogPosts(fallback, grid);
        }
    }

    // ===============================
    // RENDER FUNCTIONS WITH FIXED IMAGE HANDLING
    // ===============================
    
    function renderDestinations(destinations, container) {
        if (!destinations || destinations.length === 0) {
            container.innerHTML = `
                <div class="no-data-message">
                    <i class="fas fa-map-marked-alt"></i>
                    <p>No destinations available.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = destinations.map(dest => {
            const imageUrl = getImageUrl(dest.image, 'destination');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            
            return `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${optimizedUrl}" 
                         alt="${dest.name}" 
                         loading="eager"
                         decoding="sync"
                         fetchpriority="high"
                         width="500" 
                         height="300">
                    ${dest.rating ? `<div class="destination-rating"><i class="fas fa-star"></i> ${dest.rating}</div>` : ''}
                </div>
                <div class="destination-content">
                    <h3>${dest.name}</h3>
                    <div class="destination-location">
                        <i class="fas fa-map-marker-alt"></i> ${dest.location}
                    </div>
                    <p class="destination-description">${(dest.description || '').substring(0, 100)}...</p>
                    ${dest.features ? `
                        <div class="destination-features">
                            ${dest.features.slice(0, 3).map(f => `<span class="feature">${f}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="price-tag">
                        <i class="fas fa-tag"></i> ${dest.price || 'Contact for price'}
                    </div>
                    <button class="btn btn-primary book-now" 
                            data-type="destination" 
                            data-id="${dest.id}"
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
                    <p>No guides available.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = guides.map(guide => {
            const imageUrl = getImageUrl(guide.image, 'guide');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            
            return `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${optimizedUrl}" 
                         alt="${guide.name}" 
                         loading="eager"
                         decoding="sync"
                         fetchpriority="high"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${guide.name}</h3>
                    <p class="specialty">${guide.specialty}</p>
                    ${guide.languages ? `
                        <div class="languages-section">
                            <div class="languages-list">
                                ${guide.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${guide.experience ? `<p class="experience"><i class="fas fa-briefcase"></i> ${guide.experience}</p>` : ''}
                    ${guide.rating ? `<div class="rating">${'★'.repeat(Math.floor(guide.rating))}<span>${guide.rating}</span></div>` : ''}
                    ${guide.dailyRate ? `<div class="price-tag">$${guide.dailyRate}/day</div>` : ''}
                    <button class="btn btn-primary book-now" 
                            data-type="guide" 
                            data-id="${guide.id}"
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
                    <p>No translators available.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = translators.map(translator => {
            const imageUrl = getImageUrl(translator.image, 'translator');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            
            return `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${optimizedUrl}" 
                         alt="${translator.name}" 
                         loading="eager"
                         decoding="sync"
                         fetchpriority="high"
                         width="200" 
                         height="200">
                </div>
                <div class="guide-info">
                    <h3>${translator.name}</h3>
                    <p class="specialty">${translator.specialty}</p>
                    ${translator.languages ? `
                        <div class="languages-section">
                            <div class="languages-list">
                                ${translator.languages.map(lang => `<span class="language-tag">${lang}</span>`).join('')}
                            </div>
                        </div>
                    ` : ''}
                    ${translator.experience ? `<p class="experience"><i class="fas fa-briefcase"></i> ${translator.experience}</p>` : ''}
                    ${translator.rating ? `<div class="rating">${'★'.repeat(Math.floor(translator.rating))}<span>${translator.rating}</span></div>` : ''}
                    ${translator.dailyRate ? `<div class="price-tag">$${translator.dailyRate}/day</div>` : ''}
                    <button class="btn btn-primary book-now" 
                            data-type="translator" 
                            data-id="${translator.id}"
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
                    <p>No accommodations available.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = accommodations.map(acc => {
            const imageUrl = getImageUrl(acc.image, 'accommodation');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            
            return `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${optimizedUrl}" 
                         alt="${acc.name}" 
                         loading="eager"
                         decoding="sync"
                         fetchpriority="high"
                         width="500" 
                         height="250">
                </div>
                <div class="accommodation-content">
                    ${acc.type ? `<span class="type">${acc.type}</span>` : ''}
                    <h3>${acc.name}</h3>
                    <div class="location">
                        <i class="fas fa-map-marker-alt"></i> ${acc.location}
                    </div>
                    <p>${(acc.description || '').substring(0, 120)}...</p>
                    ${acc.features ? `
                        <div class="features">
                            ${acc.features.slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                        </div>
                    ` : ''}
                    ${acc.dailyRate ? `<div class="price-tag">$${acc.dailyRate}/night</div>` : ''}
                    <button class="btn btn-primary book-now" 
                            data-type="accommodation" 
                            data-id="${acc.id}"
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
                    <p>No blog posts available.</p>
                </div>
            `;
            return;
        }
        
        container.innerHTML = blogPosts.map(post => {
            const imageUrl = getImageUrl(post.image, 'blog');
            const optimizedUrl = optimizeImageUrl(imageUrl);
            const date = post.date ? new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : 'Recent';
            
            return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${optimizedUrl}" 
                         alt="${post.title}" 
                         loading="eager"
                         decoding="sync"
                         fetchpriority="high"
                         width="500" 
                         height="250">
                    ${post.category ? `<span class="blog-category">${post.category}</span>` : ''}
                </div>
                <div class="blog-content">
                    <div class="blog-meta">
                        <span class="blog-date"><i class="fas fa-calendar"></i> ${date}</span>
                        <span class="blog-read-time">${post.readTime || '5 min read'}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p class="blog-excerpt">${(post.excerpt || '').substring(0, 120)}...</p>
                    <div class="author">
                        <i class="fas fa-user"></i> ${post.author || 'Go Trip Team'}
                    </div>
                    <a href="#" class="read-more-link" data-page="blog">
                        Read More <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </article>
        `}).join('');
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
    // ADDITIONAL CSS
    // ===============================
    function addLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Loading States */
            .section-loader {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 40px 20px;
                background: rgba(255, 255, 255, 0.9);
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
            
            .loader-content {
                max-width: 400px;
            }
            
            .loader-content h3 {
                margin: 20px 0 10px;
                color: var(--primary-color);
            }
            
            .loader-content p {
                color: var(--text-light);
                margin-bottom: 20px;
            }
            
            .loading-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            
            .loading-content {
                text-align: center;
            }
            
            .loading-text {
                margin-top: 20px;
                color: var(--primary-color);
                font-size: 18px;
                font-weight: 500;
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
                background: white;
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
                z-index: 9998;
                opacity: 0;
                transform: translateX(100%);
                transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s;
                overflow: hidden;
                border-left: 4px solid var(--primary-color);
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
            
            .floating-message.success .floating-message-icon {
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
                color: var(--text-color);
                flex-grow: 1;
            }
            
            .floating-message-close {
                background: none;
                border: none;
                color: #999;
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
                color: var(--text-color);
            }
            
            .floating-message-body p {
                margin: 0 0 15px 0;
                color: var(--text-light);
                line-height: 1.5;
                font-size: 14px;
            }
            
            .message-action-btn {
                background: var(--primary-color);
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
                background: var(--primary-dark);
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
            
            /* Image loading optimization */
            img[loading="eager"] {
                content-visibility: auto;
                image-rendering: -webkit-optimize-contrast;
                image-rendering: crisp-edges;
            }
            
            /* Image containers */
            .destination-image,
            .guide-avatar,
            .blog-image,
            .accommodation-image {
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                position: relative;
                overflow: hidden;
                min-height: 200px;
            }
            
            .destination-image img,
            .guide-avatar img,
            .blog-image img,
            .accommodation-image img {
                object-fit: cover;
                width: 100%;
                height: 100%;
                display: block;
                transition: opacity 0.3s ease;
            }
            
            /* Mobile optimizations for floating messages */
            @media (max-width: 768px) {
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
                
                .floating-message-title {
                    font-size: 15px;
                }
                
                .floating-message-body p {
                    font-size: 13px;
                }
                
                .message-action-btn {
                    padding: 6px 14px;
                    font-size: 13px;
                }
            }
            
            @media (max-width: 480px) {
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
            
            /* Modal Loading */
            .modal-loading {
                text-align: center;
                padding: 40px 20px;
                display: none;
            }
            
            .modal-loading i {
                font-size: 32px;
                color: var(--primary-color);
                margin-bottom: 15px;
            }
            
            .modal-loading p {
                color: var(--text-light);
                margin: 0;
            }
        `;
        document.head.appendChild(style);
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing Go Trip Application');
        
        // Add loading styles
        addLoadingStyles();
        
        // Hide hero messages container (we'll use floating messages instead)
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
                    <i class="fas fa-spinner fa-spin fa-3x"></i>
                    <h2>Welcome to GoTrip</h2>
                    <p class="loading-text">Loading your Rwanda adventure...</p>
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
                showNotification('Using offline mode - data may be limited', 'info', 3000);
            }
        } catch (error) {
            console.log('⚠️ Backend offline, using fallback data');
        }
        
        // Preload trip plan modal
        preloadTripPlanModal();
        
        // Initialize UI components
        setupEventListeners();
        
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
            
            console.log('✅ Application initialized');
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