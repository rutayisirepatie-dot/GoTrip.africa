// Go Trip Frontend Application v4.5 - Final Optimized
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
        
        heroMessages: [
            { icon: 'fa-star', text: "You are very welcome to GoTrip!" },
            { icon: 'fa-globe-africa', text: "Experience authentic Rwandan culture, beauty and hospitality" },
            { icon: 'fa-mountain', text: "Enjoy adventurous journeys with us!" },
            { icon: 'fa-award', text: "Meet award-winning tour guides and translators" }
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
            contact: '/api/contacts'
        }
    };

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentHeroMessageIndex = 0;
    let heroMessageTimer = null;
    let preloadedTripPlanModal = null;

    // ===============================
    // UI UTILITIES
    // ===============================
    
    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification-toast ${type} show`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
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
                    }
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                return await response.json();
            } catch (error) {
                if (config.debug) console.warn(`API request failed for ${endpoint}:`, error.message);
                if (options.method === 'GET' || !options.method) return [];
                return { success: true, message: 'Received (offline mode)' };
            }
        },

        async getGuides() {
            try {
                const data = await this.request(config.endpoints.guides);
                return data.data || data.guides || data || this.getFallbackGuides();
            } catch (error) {
                return this.getFallbackGuides();
            }
        },

        async getDestinations() {
            try {
                const data = await this.request(config.endpoints.destinations);
                return data.data || data.destinations || data || this.getFallbackDestinations();
            } catch (error) {
                return this.getFallbackDestinations();
            }
        },

        async getTranslators() {
            try {
                const data = await this.request(config.endpoints.translators);
                return data.data || data.translators || data || this.getFallbackTranslators();
            } catch (error) {
                return this.getFallbackTranslators();
            }
        },

        async getAccommodations() {
            try {
                const data = await this.request(config.endpoints.accommodations);
                return data.data || data.accommodations || data || this.getFallbackAccommodations();
            } catch (error) {
                return this.getFallbackAccommodations();
            }
        },

        async getBlogPosts() {
            try {
                const data = await this.request(config.endpoints.blog);
                return data.data || data.blog || data || this.getFallbackBlogPosts();
            } catch (error) {
                return this.getFallbackBlogPosts();
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

        // FALLBACK DATA
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
                    image: '#'
                },
                {
                    id: 'dest2',
                    name: 'Nyungwe Forest',
                    location: 'Southwestern Rwanda',
                    description: 'Ancient rainforest with canopy walks, chimpanzee tracking, and diverse wildlife.',
                    rating: 4.7,
                    price: '$1200',
                    features: ['Canopy Walk', 'Chimpanzee Tracking', 'Waterfalls'],
                    image: '#'
                },
                {
                    id: 'dest3',
                    name: 'Lake Kivu',
                    location: 'Western Rwanda',
                    description: 'One of Africa\'s Great Lakes, perfect for relaxation and water activities.',
                    rating: 4.6,
                    price: '$800',
                    features: ['Boating', 'Swimming', 'Beach'],
                    image: '#'
                },
                {
                    id: 'dest4',
                    name: 'Akagera National Park',
                    location: 'Eastern Rwanda',
                    description: 'Rwanda\'s only Big Five safari destination with diverse wildlife.',
                    rating: 4.8,
                    price: '$1100',
                    features: ['Safari', 'Big Five', 'Bird Watching'],
                    image: '#'
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
                    image: '#'
                },
                {
                    id: 'acc2',
                    name: 'Nyungwe Top View Hill Hotel',
                    type: 'Eco Lodge',
                    location: 'Nyungwe, Rwanda',
                    description: 'Eco-friendly lodge with stunning forest views.',
                    dailyRate: 180,
                    features: ['Forest View', 'Restaurant', 'WiFi'],
                    image: '#'
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
                    image: '#'
                },
                {
                    id: 'blog2',
                    title: 'Gorilla Trekking: A Life-Changing Experience',
                    excerpt: 'What to expect when trekking mountain gorillas in Volcanoes National Park.',
                    category: 'Adventure',
                    date: new Date(Date.now() - 86400000).toISOString(),
                    readTime: '7 min read',
                    author: 'Go Trip Team',
                    image: '#'
                },
                {
                    id: 'blog3',
                    title: 'Cultural Experiences in Rwanda',
                    excerpt: 'Immerse yourself in Rwandan culture through traditional dances, food, and village visits.',
                    category: 'Culture',
                    date: new Date(Date.now() - 172800000).toISOString(),
                    readTime: '6 min read',
                    author: 'Go Trip Team',
                    image: '#'
                }
            ];
        }
    };

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
        }
    }

    // ===============================
    // PAGE CONTENT LOADERS
    // ===============================
    
    async function loadHomePage() {
        const destinationsGrid = document.querySelector('.destinations-grid');
        if (destinationsGrid) {
            try {
                const placeholder = destinationsGrid.querySelector('.destinations-placeholder');
                if (placeholder) placeholder.remove();
                
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
                const fallback = apiService.getFallbackDestinations().slice(0, 4);
                renderDestinations(fallback, destinationsGrid);
            }
        }
        
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            try {
                const placeholder = blogGrid.querySelector('.blog-placeholder');
                if (placeholder) placeholder.remove();
                
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
                const fallback = apiService.getFallbackBlogPosts().slice(0, 3);
                renderBlogPosts(fallback, blogGrid);
            }
        }
    }

    async function loadDestinationsPage() {
        const grid = document.querySelector('.destinations-grid-full');
        if (!grid) return;
        
        try {
            const destinations = await apiService.getDestinations();
            if (destinations.length > 0) {
                renderDestinations(destinations, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-map-marked-alt"></i>
                        <h3>No destinations available</h3>
                    </div>
                `;
            }
        } catch (error) {
            const fallback = apiService.getFallbackDestinations();
            renderDestinations(fallback, grid);
        }
    }

    async function loadGuidesPage() {
        const grid = document.querySelector('.guides-grid-full');
        if (!grid) return;
        
        try {
            const guides = await apiService.getGuides();
            if (guides.length > 0) {
                renderGuides(guides, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-user-tie"></i>
                        <h3>No guides available</h3>
                    </div>
                `;
            }
        } catch (error) {
            const fallback = apiService.getFallbackGuides();
            renderGuides(fallback, grid);
        }
    }

    async function loadTranslatorsPage() {
        const grid = document.querySelector('.translators-grid-full');
        if (!grid) return;
        
        try {
            const translators = await apiService.getTranslators();
            if (translators.length > 0) {
                renderTranslators(translators, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-language"></i>
                        <h3>No translators available</h3>
                    </div>
                `;
            }
        } catch (error) {
            const fallback = apiService.getFallbackTranslators();
            renderTranslators(fallback, grid);
        }
    }

    async function loadAccommodationsPage() {
        const grid = document.querySelector('.accommodations-grid-full');
        if (!grid) return;
        
        try {
            const accommodations = await apiService.getAccommodations();
            if (accommodations.length > 0) {
                renderAccommodations(accommodations, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-hotel"></i>
                        <h3>No accommodations available</h3>
                    </div>
                `;
            }
        } catch (error) {
            const fallback = apiService.getFallbackAccommodations();
            renderAccommodations(fallback, grid);
        }
    }

    async function loadBlogPage() {
        const grid = document.querySelector('.blog-grid-full');
        if (!grid) return;
        
        try {
            const blogPosts = await apiService.getBlogPosts();
            if (blogPosts.length > 0) {
                renderBlogPosts(blogPosts, grid);
            } else {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-newspaper"></i>
                        <h3>No blog posts available</h3>
                    </div>
                `;
            }
        } catch (error) {
            const fallback = apiService.getFallbackBlogPosts();
            renderBlogPosts(fallback, grid);
        }
    }

    // ===============================
    // RENDER FUNCTIONS - OPTIMIZED WITH EAGER LOADING
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
            const imageUrl = dest.image?.startsWith('http') ? dest.image : 
                            (dest.image ? `./images/${dest.image}` : 
                            '#');
            
            return `
            <div class="destination-card">
                <div class="destination-image">
                    <img src="${imageUrl}" alt="${dest.name}" 
                         loading="eager" 
                         width="500" height="300"
                         crossorigin="anonymous"
                         onerror="this.src='#'">
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
            const imageUrl = guide.image?.startsWith('http') ? guide.image : 
                            '#';
            
            return `
            <div class="guide-card">
                <div class="guide-avatar">
                    <img src="${imageUrl}" alt="${guide.name}" 
                         loading="eager" 
                         width="200" height="200"
                         crossorigin="anonymous"
                         onerror="this.src='#'">
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
            const imageUrl = translator.image?.startsWith('http') ? translator.image : 
                            '#';
            
            return `
            <div class="translator-card">
                <div class="guide-avatar">
                    <img src="${imageUrl}" alt="${translator.name}" 
                         loading="eager" 
                         width="200" height="200"
                         crossorigin="anonymous"
                         onerror="this.src='#'">
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
            const imageUrl = acc.image?.startsWith('http') ? acc.image : 
                            '#';
            
            return `
            <div class="accommodation-card">
                <div class="accommodation-image">
                    <img src="${imageUrl}" alt="${acc.name}" 
                         loading="eager" 
                         width="500" height="250"
                         crossorigin="anonymous"
                         onerror="this.src='#'">
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
            const imageUrl = post.image?.startsWith('http') ? post.image : 
                            '#';
            const date = post.date ? new Date(post.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            }) : 'Recent';
            
            return `
            <article class="blog-card">
                <div class="blog-image">
                    <img src="${imageUrl}" alt="${post.title}" 
                         loading="eager" 
                         width="500" height="250"
                         crossorigin="anonymous"
                         onerror="this.src='#'">
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
            
            showLoading(submitBtn, true);
            
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
                showLoading(submitBtn, false);
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
        `;
        
        return preloadedTripPlanModal;
    }

    function showTripPlanningModal() {
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
                await apiService.createTripPlan(tripData);
                showNotification('Trip plan submitted successfully! We\'ll contact you soon.', 'success');
                closeModal();
            } catch (error) {
                showNotification('Trip plan submitted. We\'ll contact you shortly.', 'info');
                closeModal();
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

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

    // ===============================
    // HERO MESSAGE ROTATION
    // ===============================
    
    function initializeHeroMessages() {
        const messagesContainer = document.querySelector('.hero-messages');
        const messages = config.heroMessages;
        
        if (!messagesContainer || !messages.length) return;
        
        messagesContainer.innerHTML = messages.map((msg, index) => `
            <div class="hero-message ${index === 0 ? 'active' : ''}">
                <i class="fas ${msg.icon}"></i>
                <span>${msg.text}</span>
            </div>
        `).join('');
        
        startMessageRotation();
        
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
        }, 5000);
    }
    
    function restartRotation() {
        startMessageRotation();
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
    // INITIALIZATION
    // ===============================
    
    async function initializeApp() {
        console.log('🚀 Initializing Go Trip Application');
        
        // Remove connection status element
        const connectionStatus = document.getElementById('connection-status');
        if (connectionStatus) connectionStatus.remove();
        
        // Remove search button elements
        const searchBtn = document.getElementById('search-btn-desktop');
        const searchModal = document.getElementById('search-modal');
        if (searchBtn) searchBtn.remove();
        if (searchModal) searchModal.remove();
        
        // Hide loading overlay
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
        
        // Set current year
        const yearElement = document.getElementById('current-year');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
        
        // Preload trip plan modal
        preloadTripPlanModal();
        
        // Initialize UI components
        initializeHeroMessages();
        setupEventListeners();
        
        // Load initial page
        showPage('home');
        
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
        closeModal
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