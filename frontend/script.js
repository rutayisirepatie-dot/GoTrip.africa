// Go Trip Frontend Application v3.0 (API-Only)
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        baseUrl: window.location.hostname.includes('onrender.com') 
            ? 'https://gotrip-backend-uwhn.onrender.com/api'
            : 'http://localhost:5000/api',
        debug: true,
        cacheDuration: 300000, // 5 minutes
        
        heroMessages: [
            { icon: 'fa-star', text: "Welcome to GoTrip!" },
            { icon: 'fa-globe-africa', text: "Experience authentic beauty, culture and hospitality." },
            { icon: 'fa-mountain', text: "Gorilla Trekking, Mountain Hiking, Bird Watching, Big Five Safari,..." },
            { icon: 'fa-award', text: "Meet our Award-winning tour guides and translators" },
            { icon: 'fa-gem', text: "Luxury accommodations at fair prices" }
        ],
        bookingEmail: 'info@gotrip.africa',
        companyPhone: '+250787407051',
        companyAddress: 'KG 7 Ave, Kigali, Rwanda'
    };

    // ===============================
    // STATE MANAGEMENT
    // ===============================
    let currentHeroMessageIndex = 0;
    let heroMessageTimer = null;
    let isModalOpen = false;
    let apiHealth = false;
    let isInitialized = false;
    let connectionStatus = 'checking';

    // ===============================
    // API SERVICE
    // ===============================
    const apiService = {
        /**
         * Send API request with timeout and fallback support
         */
        async request(endpoint, options = {}) {
            const url = `${config.baseUrl}${endpoint}`;
            
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
            
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                ...options.headers
            };

            try {
                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers,
                    credentials: 'include',
                    mode: 'cors'
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    const error = await response.json().catch(() => ({
                        success: false,
                        message: `HTTP ${response.status}: ${response.statusText}`
                    }));
                    throw new Error(error.message || `HTTP ${response.status}`);
                }

                const data = await response.json();
                
                if (config.debug && endpoint !== '/health') {
                    console.log(`✅ API ${options.method || 'GET'} ${endpoint}:`, data);
                }
                
                return data;
                
            } catch (error) {
                clearTimeout(timeoutId);
                
                // Network error or CORS issue
                if (error.name === 'TypeError' || error.message.includes('Failed to fetch')) {
                    console.warn(`🌐 Network error for ${endpoint}:`, error.message);
                    throw new Error('Cannot connect to server. Please check your connection.');
                }
                
                // Timeout error (Render cold start)
                if (error.name === 'AbortError') {
                    console.warn(`⏰ Timeout for ${endpoint} (Server may be starting up)`);
                    throw new Error('Server is starting up. Please try again.');
                }
                
                console.error(`❌ API request failed for ${endpoint}:`, error);
                throw error;
            }
        },

        // === CREATE OPERATIONS ===
        
        async createBooking(bookingData) {
            return await this.request('/bookings', {
                method: 'POST',
                body: JSON.stringify(bookingData)
            });
        },

        async createTripPlan(tripPlanData) {
            return await this.request('/tripPlan', {
                method: 'POST',
                body: JSON.stringify(tripPlanData)
            });
        },

        async subscribeNewsletter(emailData) {
            return await this.request('/newsletter/subscribe', {
                method: 'POST',
                body: JSON.stringify(emailData)
            });
        },

        async sendContactMessage(contactData) {
            return await this.request('/contact', {
                method: 'POST',
                body: JSON.stringify(contactData)
            });
        },

        // === READ OPERATIONS ===
        
        async getGuides() {
            return await this.request('/guides');
        },

        async getDestinations() {
            return await this.request('/destinations');
        },

        async getTranslators() {
            return await this.request('/translators');
        },

        async getAccommodations() {
            return await this.request('/accommodations');
        },

        async getBlogPosts() {
            return await this.request('/blog');
        },

        // === DASHBOARD DATA ===
        
        async getDashboardStats() {
            return await this.request('/dashboard/stats');
        },

        // === HEALTH CHECK ===
        async checkHealth() {
            try {
                const health = await this.request('/health');
                apiHealth = health.success;
                connectionStatus = health.database === 'connected' ? 'online' : 'limited';
                return health;
            } catch (error) {
                apiHealth = false;
                connectionStatus = 'offline';
                throw error;
            }
        }
    };

    // ===============================
    // DATA MANAGER
    // ===============================
    const dataManager = {
        cache: {
            guides: null,
            translators: null,
            destinations: null,
            accommodations: null,
            blog: null,
            timestamp: null
        },

        async fetchAllData() {
            console.log('📥 Fetching data from backend...');
            
            try {
                const [guides, destinations, translators, accommodations, blog] = await Promise.allSettled([
                    apiService.getGuides(),
                    apiService.getDestinations(),
                    apiService.getTranslators(),
                    apiService.getAccommodations(),
                    apiService.getBlogPosts()
                ]);

                this.cache = {
                    guides: guides.status === 'fulfilled' ? guides.value.data : [],
                    destinations: destinations.status === 'fulfilled' ? destinations.value.data : [],
                    translators: translators.status === 'fulfilled' ? translators.value.data : [],
                    accommodations: accommodations.status === 'fulfilled' ? accommodations.value.data : [],
                    blog: blog.status === 'fulfilled' ? blog.value.data : [],
                    timestamp: Date.now()
                };

                console.log(`✅ Data loaded from backend`);
                return this.cache;
                
            } catch (error) {
                console.error('❌ Failed to fetch data:', error);
                return {
                    guides: [],
                    translators: [],
                    destinations: [],
                    accommodations: [],
                    blog: [],
                    timestamp: Date.now()
                };
            }
        },

        getData(type) {
            return this.cache[type] || [];
        },

        async refreshData() {
            return this.fetchAllData();
        },

        clearCache() {
            this.cache = {
                guides: null,
                translators: null,
                destinations: null,
                accommodations: null,
                blog: null,
                timestamp: null
            };
        }
    };

    // ===============================
    // CORE UTILITIES
    // ===============================
    
    function showNotification(message, type = 'info', duration = 3000) {
        try {
            // Remove existing notifications
            document.querySelectorAll('.notification-toast').forEach(n => n.remove());
            
            const notification = document.createElement('div');
            notification.className = `notification-toast ${type}`;
            notification.setAttribute('role', 'alert');
            notification.setAttribute('aria-live', 'assertive');
            
            const icon = type === 'success' ? '✅' : type === 'error' ? '❌' : type === 'warning' ? '⚠️' : 'ℹ️';
            
            notification.innerHTML = `
                <div class="notification-content">
                    <span class="notification-message">${icon} ${message}</span>
                    <button class="notification-close" aria-label="Close notification">&times;</button>
                </div>
            `;
            
            document.body.appendChild(notification);
            
            // Animate in
            requestAnimationFrame(() => {
                notification.classList.add('show');
            });
            
            // Auto remove after duration
            const removeTimer = setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }, duration);
            
            // Close on click
            notification.querySelector('.notification-close').addEventListener('click', () => {
                clearTimeout(removeTimer);
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            });
            
        } catch (error) {
            console.error('Error showing notification:', error);
        }
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePhone(phone) {
        const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }

    function showLoading(element, show = true) {
        if (!element) return;
        
        if (show) {
            element.classList.add('loading');
            element.disabled = true;
            const originalText = element.textContent;
            element.dataset.originalText = originalText;
            element.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Processing...';
        } else {
            element.classList.remove('loading');
            element.disabled = false;
            if (element.dataset.originalText) {
                element.textContent = element.dataset.originalText;
            }
        }
    }

    // ===============================
    // NAVIGATION SYSTEM
    // ===============================
    
    const routeMap = {
        '/': 'home',
        '/home': 'home',
        '/destinations': 'destinations',
        '/guides': 'guides',
        '/translators': 'translators',
        '/accommodations': 'accommodations',
        '/blog': 'blog',
        '/contact': 'contact'
    };

    const pageIdMap = {
        'home': 'home-page',
        'destinations': 'destinations-page',
        'guides': 'guides-page',
        'translators': 'translators-page',
        'accommodations': 'accommodations-page',
        'blog': 'blog-page',
        'contact': 'contact-page'
    };

    function getCurrentPath() {
        return window.location.pathname;
    }

    function getPageFromPath(path) {
        const cleanPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
        return routeMap[cleanPath] || 'home';
    }

    function navigateTo(path) {
        try {
            const pageId = getPageFromPath(path);
            showPage(pageId);
            
            if (window.history.pushState) {
                window.history.pushState({ page: pageId }, '', path);
            }
            
            updateActiveNavLink(pageId);
            
        } catch (error) {
            console.error('Error navigating:', error);
            showNotification('Navigation error. Please try again.', 'error');
        }
    }

    function updateActiveNavLink(pageId) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            const isActive = (href === '/' && pageId === 'home') || 
                            (href === `/${pageId}`) || 
                            (link.dataset.page === pageId);
            
            link.classList.toggle('active', isActive);
        });
    }

    function showPage(pageId, smooth = true) {
        try {
            const elementId = pageIdMap[pageId] || 'home-page';
            
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show target page
            const targetPage = document.getElementById(elementId);
            if (!targetPage) {
                console.warn(`Page ${elementId} not found, redirecting to home`);
                return showPage('home');
            }
            
            targetPage.classList.add('active');
            updateActiveNavLink(pageId);
            
            // Close mobile menu if open
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            if (mobileMenuBtn && navLinks && navLinks.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
            
            // Load page content
            loadPageContent(pageId);
            
            // Scroll to top
            window.scrollTo({
                top: 0,
                behavior: smooth ? 'smooth' : 'auto'
            });
            
        } catch (error) {
            console.error('Error showing page:', error);
            showNotification('Error loading page. Please try again.', 'error');
            const homePage = document.getElementById('home-page');
            if (homePage) {
                document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
                homePage.classList.add('active');
            }
        }
    }

    async function loadPageContent(pageId) {
        try {
            switch(pageId) {
                case 'home':
                    await loadHomePage();
                    break;
                case 'destinations':
                    await loadDestinations();
                    break;
                case 'guides':
                    await loadGuides();
                    break;
                case 'translators':
                    await loadTranslators();
                    break;
                case 'accommodations':
                    await loadAccommodations();
                    break;
                case 'blog':
                    await loadBlog();
                    break;
                default:
                    await loadHomePage();
                    break;
            }
        } catch (error) {
            console.error('Error loading page content:', error);
            showNotification('Error loading content. Please try again.', 'error');
        }
    }

    // ===============================
    // PAGE LOADING FUNCTIONS
    // ===============================
    
    async function loadHomePage() {
        try {
            const data = await dataManager.fetchAllData();
            
            // Load destinations
            const destinationsGrid = document.querySelector('#home-page .destinations-grid');
            if (destinationsGrid) {
                const featuredDestinations = data.destinations.slice(0, 3);
                
                if (featuredDestinations.length === 0) {
                    destinationsGrid.innerHTML = `
                        <div class="no-data-message">
                            <i class="fas fa-map-marked-alt"></i>
                            <h3>No destinations available</h3>
                            <p>Check back soon for featured destinations.</p>
                        </div>
                    `;
                } else {
                    destinationsGrid.innerHTML = featuredDestinations.map(dest => `
                        <div class="destination-card">
                            <div class="destination-image">
                                <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                                <div class="destination-rating">
                                    <i class="fas fa-star" aria-hidden="true"></i> ${dest.rating || 'N/A'}
                                </div>
                            </div>
                            <div class="destination-content">
                                <h3>${dest.name}</h3>
                                <div class="destination-location">
                                    <i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${dest.location}
                                </div>
                                <p>${dest.description?.substring(0, 100) || ''}...</p>
                                <button class="btn btn-primary book-now" 
                                        data-type="destination" 
                                        data-id="${dest._id}"
                                        data-name="${dest.name}"
                                        aria-label="Book ${dest.name}">
                                    Book Now
                                </button>
                            </div>
                        </div>
                    `).join('');
                }
            }
            
            // Load blog posts
            const blogGrid = document.querySelector('#home-page .blog-grid');
            if (blogGrid) {
                const featuredBlogs = data.blog.slice(0, 3);
                
                if (featuredBlogs.length === 0) {
                    blogGrid.innerHTML = `
                        <div class="no-data-message">
                            <i class="fas fa-newspaper"></i>
                            <h3>No blog posts available</h3>
                            <p>Check back soon for travel stories and tips.</p>
                        </div>
                    `;
                } else {
                    blogGrid.innerHTML = featuredBlogs.map(blog => `
                        <article class="blog-card">
                            <div class="blog-image">
                                <img src="${blog.image}" alt="${blog.title}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                                <span class="blog-category">${blog.category || 'Travel'}</span>
                            </div>
                            <div class="blog-content">
                                <div class="blog-meta">
                                    <span class="blog-date">
                                        <i class="far fa-calendar" aria-hidden="true"></i> ${blog.date || new Date().toLocaleDateString()}
                                    </span>
                                    <span class="blog-read-time">${blog.readTime || '5 min read'}</span>
                                </div>
                                <h3>${blog.title}</h3>
                                <p>${blog.excerpt?.substring(0, 120) || ''}...</p>
                                <a href="#" class="view-article-link read-more-link" data-id="${blog._id}">
                                    Read More →
                                </a>
                            </div>
                        </article>
                    `).join('');
                }
            }
            
        } catch (error) {
            console.error('Error loading home page:', error);
            showNotification('Error loading homepage content. Please try again.', 'error');
        }
    }

    async function loadDestinations() {
        try {
            const response = await apiService.getDestinations();
            const data = response.data || [];
            const grid = document.querySelector('#destinations-page .destinations-grid-full');
            if (!grid) return;
            
            if (data.length === 0) {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-map-marked-alt"></i>
                        <h3>No destinations found</h3>
                        <p>Check back soon for available destinations.</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = data.map(dest => `
                <div class="destination-card" data-id="${dest._id}">
                    <div class="destination-image">
                        <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                        <div class="destination-rating">
                            <i class="fas fa-star" aria-hidden="true"></i> ${dest.rating || 'N/A'}
                        </div>
                    </div>
                    <div class="destination-content">
                        <h3>${dest.name}</h3>
                        <div class="destination-location">
                            <i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${dest.location}
                        </div>
                        <p>${dest.description}</p>
                        <div class="destination-features">
                            ${(dest.features || []).map(f => `<span class="feature">${f}</span>`).join('')}
                        </div>
                        <div class="destination-price">${dest.price || 'Price on request'}</div>
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${dest._id}"
                                data-name="${dest.name}"
                                aria-label="Book ${dest.name}">
                            Book Now
                        </button>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading destinations:', error);
            showNotification('Error loading destinations. Please try again.', 'error');
        }
    }

    async function loadGuides() {
        try {
            const response = await apiService.getGuides();
            const data = response.data || [];
            const grid = document.querySelector('#guides-page .guides-grid-full');
            if (!grid) return;
            
            if (data.length === 0) {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-user-tie"></i>
                        <h3>No tour guides available</h3>
                        <p>Check back soon for available guides.</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = data.map(guide => `
                <div class="guide-card" data-id="${guide._id}">
                    <div class="guide-avatar">
                        <img src="${guide.image}" alt="${guide.name}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                    </div>
                    
                    <div class="guide-info">
                        <h3>${guide.name}</h3>
                        <p class="specialty">${guide.specialty || 'Tour Guide'}</p>
                        
                        <div class="languages-section">
                            <div class="languages-header">
                                <i class="fas fa-language" aria-hidden="true"></i>
                                <strong>Languages:</strong>
                            </div>
                            <div class="languages-list">
                                ${(guide.languages || []).map(lang => `
                                    <span class="language-tag">${lang}</span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <p class="experience">
                            <i class="fas fa-briefcase" aria-hidden="true"></i> ${guide.experience || 'Experienced guide'}
                        </p>
                        
                        <div class="rating">
                            ${'★'.repeat(Math.floor(guide.rating || 0))}${(guide.rating || 0) % 1 ? '½' : ''}
                            <span>${guide.rating || 'N/A'}</span>
                        </div>
                        
                        <div class="price">${guide.price || 'Price on request'}</div>
                        
                        <button class="btn btn-primary hire-now" 
                                data-type="guide" 
                                data-id="${guide._id}"
                                data-name="${guide.name}"
                                aria-label="Hire ${guide.name}">
                            Hire Now
                        </button>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading guides:', error);
            showNotification('Error loading guides. Please try again.', 'error');
        }
    }

    async function loadTranslators() {
        try {
            const response = await apiService.getTranslators();
            const data = response.data || [];
            const grid = document.querySelector('#translators-page .translators-grid-full');
            if (!grid) return;
            
            if (data.length === 0) {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-language"></i>
                        <h3>No translators available</h3>
                        <p>Check back soon for available translators.</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = data.map(translator => `
                <div class="translator-card" data-id="${translator._id}">
                    <div class="guide-avatar">
                        <img src="${translator.image}" alt="${translator.name}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                    </div>
                    
                    <div class="guide-info">
                        <h3>${translator.name}</h3>
                        <p class="specialty">${translator.specialty || 'Translator'}</p>
                        
                        <div class="languages-section">
                            <div class="languages-header">
                                <i class="fas fa-language" aria-hidden="true"></i>
                                <strong>Languages:</strong>
                            </div>
                            <div class="languages-list">
                                ${(translator.languages || []).map(lang => `
                                    <span class="language-tag">${lang}</span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <p class="experience">
                            <i class="fas fa-briefcase" aria-hidden="true"></i> ${translator.experience || 'Experienced translator'}
                        </p>
                        
                        <div class="rating">
                            ${'★'.repeat(Math.floor(translator.rating || 0))}${(translator.rating || 0) % 1 ? '½' : ''}
                            <span>${translator.rating || 'N/A'}</span>
                        </div>
                        
                        <div class="price">${translator.price || 'Price on request'}</div>
                        
                        <button class="btn btn-primary hire-now" 
                                data-type="translator" 
                                data-id="${translator._id}"
                                data-name="${translator.name}"
                                aria-label="Hire ${translator.name}">
                            Hire Now
                        </button>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading translators:', error);
            showNotification('Error loading translators. Please try again.', 'error');
        }
    }

    async function loadAccommodations() {
        try {
            const response = await apiService.getAccommodations();
            const data = response.data || [];
            const grid = document.querySelector('#accommodations-page .accommodations-grid-full');
            if (!grid) return;
            
            if (data.length === 0) {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-hotel"></i>
                        <h3>No accommodations available</h3>
                        <p>Check back soon for available accommodations.</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = data.map(acc => `
                <div class="accommodation-card" data-id="${acc._id}">
                    <div class="accommodation-image">
                        <img src="${acc.image}" alt="${acc.name}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                    </div>
                    <div class="accommodation-content">
                        <span class="type">${acc.type || 'Accommodation'}</span>
                        <h3>${acc.name}</h3>
                        <div class="location">
                            <i class="fas fa-map-marker-alt" aria-hidden="true"></i> ${acc.location}
                        </div>
                        <p>${acc.description?.substring(0, 120) || ''}...</p>
                        <div class="features">
                            ${(acc.features || []).slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                        </div>
                        <div class="price-tag">${acc.price || 'Price on request'}</div>
                        <button class="btn btn-primary book-now" 
                                data-type="accommodation" 
                                data-id="${acc._id}"
                                data-name="${acc.name}"
                                aria-label="Book ${acc.name}">
                            Book Now
                        </button>
                    </div>
                </div>
            `).join('');
            
        } catch (error) {
            console.error('Error loading accommodations:', error);
            showNotification('Error loading accommodations. Please try again.', 'error');
        }
    }

    async function loadBlog() {
        try {
            const response = await apiService.getBlogPosts();
            const data = response.data || [];
            const grid = document.querySelector('#blog-page .blog-grid-full');
            if (!grid) return;
            
            if (data.length === 0) {
                grid.innerHTML = `
                    <div class="no-data-message">
                        <i class="fas fa-newspaper"></i>
                        <h3>No blog posts available</h3>
                        <p>Check back soon for travel stories and tips.</p>
                    </div>
                `;
                return;
            }
            
            grid.innerHTML = data.map(blog => `
                <article class="blog-card" data-id="${blog._id}">
                    <div class="blog-image">
                        <img src="${blog.image}" alt="${blog.title}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                        <span class="blog-category">${blog.category || 'Travel'}</span>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">
                                <i class="fas fa-calendar" aria-hidden="true"></i> ${blog.date || new Date().toLocaleDateString()}
                            </span>
                            <span class="blog-read-time">${blog.readTime || '5 min read'}</span>
                        </div>
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt}</p>
                        <p class="author"><i class="fas fa-user" aria-hidden="true"></i> ${blog.author || 'Go Trip Team'}</p>
                        <a href="#" class="view-article-link read-more-link" data-id="${blog._id}">
                            Read Full Article →
                        </a>
                    </div>
                </article>
            `).join('');
            
        } catch (error) {
            console.error('Error loading blog:', error);
            showNotification('Error loading blog posts. Please try again.', 'error');
        }
    }

    function viewBlogArticle(articleId) {
        try {
            const data = dataManager.getData('blog');
            const article = data.find(a => a._id == articleId);
            if (!article) {
                showNotification('Article not found. Please try another article.', 'error');
                return;
            }
            
            const blogPage = document.getElementById('blog-page');
            if (!blogPage) return;
            
            blogPage.innerHTML = `
                <div class="container">
                    <div class="article-detail">
                        <div class="article-header">
                            <button class="btn btn-outline back-to-blog-link">
                                <i class="fas fa-arrow-left" aria-hidden="true"></i> Back to Blog
                            </button>
                            <h1 class="article-title">${article.title}</h1>
                            <div class="article-meta">
                                <span><i class="fas fa-calendar" aria-hidden="true"></i> ${article.date}</span>
                                <span><i class="fas fa-user" aria-hidden="true"></i> ${article.author}</span>
                                <span><i class="fas fa-clock" aria-hidden="true"></i> ${article.readTime}</span>
                                <span class="article-category">${article.category}</span>
                            </div>
                        </div>
                        <div class="article-image">
                            <img src="${article.image}" alt="${article.title}" loading="lazy" onerror="this.src='./images/placeholder.jpg'">
                        </div>
                        <div class="article-content">
                            <p>${article.content}</p>
                        </div>
                        <div class="article-footer">
                            <button class="btn btn-primary back-to-blog-link">
                                <i class="fas fa-arrow-left" aria-hidden="true"></i> Back to Blog
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            blogPage.querySelectorAll('.back-to-blog-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    navigateTo('/blog');
                });
            });
        } catch (error) {
            console.error('Error viewing blog article:', error);
            showNotification('Error loading article. Please try again.', 'error');
        }
    }

    // ===============================
    // HERO WELCOME BANNER
    // ===============================
    
    function initializeHeroWelcomeBanner() {
        try {
            const banner = document.getElementById('hero-welcome-banner');
            if (!banner) return;
            
            const messagesContainer = banner.querySelector('.hero-messages');
            if (!messagesContainer) return;
            
            messagesContainer.innerHTML = config.heroMessages.map((message, index) => `
                <div class="hero-message ${index === 0 ? 'active' : ''}" 
                     role="status" 
                     aria-live="polite"
                     aria-label="Hero message ${index + 1}">
                    <i class="fas ${message.icon}" aria-hidden="true"></i>
                    <span>${message.text}</span>
                </div>
            `).join('');
            
            startHeroMessageRotation();
            
            const prevBtn = banner.querySelector('.hero-message-prev');
            const nextBtn = banner.querySelector('.hero-message-next');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    showHeroMessage(currentHeroMessageIndex - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    showHeroMessage(currentHeroMessageIndex + 1);
                });
            }
            
            banner.addEventListener('mouseenter', () => {
                if (heroMessageTimer) {
                    clearInterval(heroMessageTimer);
                    heroMessageTimer = null;
                }
            });
            
            banner.addEventListener('mouseleave', () => {
                startHeroMessageRotation();
            });
            
        } catch (error) {
            console.error('Error initializing hero welcome banner:', error);
        }
    }
    
    function startHeroMessageRotation() {
        try {
            if (heroMessageTimer) clearInterval(heroMessageTimer);
            heroMessageTimer = setInterval(() => {
                showHeroMessage(currentHeroMessageIndex + 1);
            }, 4000);
        } catch (error) {
            console.error('Error starting hero message rotation:', error);
        }
    }
    
    function showHeroMessage(index) {
        try {
            const messages = document.querySelectorAll('.hero-message');
            const totalMessages = messages.length;
            if (totalMessages === 0) return;
            
            if (messages[currentHeroMessageIndex]) {
                messages[currentHeroMessageIndex].classList.remove('active');
            }
            
            currentHeroMessageIndex = (index + totalMessages) % totalMessages;
            
            if (messages[currentHeroMessageIndex]) {
                messages[currentHeroMessageIndex].classList.add('active');
            }
            
            if (heroMessageTimer) {
                clearInterval(heroMessageTimer);
                startHeroMessageRotation();
            }
            
        } catch (error) {
            console.error('Error showing hero message:', error);
        }
    }

    // ===============================
    // MODAL SYSTEM
    // ===============================
    
    function createModal(content = null) {
        try {
            if (isModalOpen) return null;
            
            const existing = document.getElementById('modal-container');
            if (existing) existing.remove();
            
            const modalContainer = document.createElement('div');
            modalContainer.id = 'modal-container';
            modalContainer.className = 'modal-container';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modalContent.setAttribute('role', 'dialog');
            modalContent.setAttribute('aria-modal', 'true');
            
            if (content) {
                modalContent.innerHTML = content;
            }
            
            modalContainer.appendChild(modalContent);
            document.body.appendChild(modalContainer);
            
            requestAnimationFrame(() => {
                modalContainer.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
            
            isModalOpen = true;
            
            const closeBtn = modalContent.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', closeModal);
            }
            
            modalContainer.addEventListener('click', (e) => {
                if (e.target === modalContainer) {
                    closeModal();
                }
            });
            
            const escHandler = (e) => {
                if (e.key === 'Escape') {
                    closeModal();
                }
            };
            document.addEventListener('keydown', escHandler);
            
            modalContainer._escHandler = escHandler;
            
            const focusable = modalContent.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (focusable) {
                setTimeout(() => focusable.focus(), 100);
            }
            
            return modalContent;
        } catch (error) {
            console.error('Error creating modal:', error);
            showNotification('Error creating form. Please try again.', 'error');
            return null;
        }
    }

    function closeModal() {
        try {
            const modal = document.getElementById('modal-container');
            if (modal) {
                if (modal._escHandler) {
                    document.removeEventListener('keydown', modal._escHandler);
                }
                
                modal.classList.remove('active');
                document.body.style.overflow = '';
                isModalOpen = false;
                
                setTimeout(() => {
                    if (modal.parentNode) {
                        modal.parentNode.removeChild(modal);
                    }
                }, 300);
            }
        } catch (error) {
            console.error('Error closing modal:', error);
        }
    }

    // ===============================
    // FORM HANDLERS
    // ===============================
    
    async function showBookingModal(serviceType, serviceId, serviceName) {
        try {
            // Fetch service details from API
            let service = { name: serviceName, price: 'Price on request', rating: 'N/A' };
            
            // Try to get specific service details
            if (serviceId) {
                try {
                    const endpoint = `/${serviceType}s/${serviceId}`;
                    const response = await apiService.request(endpoint);
                    if (response.success && response.data) {
                        service = response.data;
                    }
                } catch (error) {
                    console.warn('Could not fetch service details:', error.message);
                }
            }
            
            const modalContent = `
                <div class="modal-header">
                    <h2><i class="fas fa-calendar-check" aria-hidden="true"></i> Book ${service.name}</h2>
                    <button class="modal-close" aria-label="Close modal">&times;</button>
                </div>
                
                <div class="modal-body">
                    <div class="modal-intro">
                        <p>Complete this form to book <strong>${service.name}</strong>. Your booking will be processed soon.</p>
                        <div class="service-info">
                            <span class="service-price">Price: ${service.price}</span>
                            <span class="service-rating">Rating: ${service.rating}</span>
                        </div>
                    </div>
                    
                    <form id="booking-form" novalidate>
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-name">Your Name *</label>
                                <input type="text" id="booking-name" name="name" required 
                                       placeholder="Your full name" autocomplete="name">
                            </div>
                            <div class="form-group">
                                <label for="booking-email">Your Email *</label>
                                <input type="email" id="booking-email" name="email" required 
                                       placeholder="Your email address" autocomplete="email">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-phone">Phone Number *</label>
                                <input type="tel" id="booking-phone" name="phone" required 
                                       placeholder="Your phone number" autocomplete="tel">
                            </div>
                            <div class="form-group">
                                <label for="booking-dates">Preferred Dates *</label>
                                <input type="text" id="booking-dates" name="dates" required 
                                       placeholder="e.g., June 15-25, 2024">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="booking-travelers">Number of Travelers *</label>
                                <select id="booking-travelers" name="travelers" required>
                                    <option value="">Select</option>
                                    <option value="1">1 person</option>
                                    <option value="2">2 people</option>
                                    <option value="3-4">3-4 people</option>
                                    <option value="5-6">5-6 people</option>
                                    <option value="7+">7+ people</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="booking-country">Country</label>
                                <input type="text" id="booking-country" name="country" 
                                       placeholder="Your country" autocomplete="country">
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label for="booking-message">Special Requests or Requirements</label>
                            <textarea id="booking-message" name="message" 
                                      placeholder="Any special requirements or additional information..." 
                                      rows="4"></textarea>
                        </div>
                        
                        <div class="modal-footer">
                            <div class="form-actions">
                                <button type="submit" class="btn btn-primary btn-large">
                                    <i class="fas fa-save" aria-hidden="true"></i> Submit Booking
                                </button>
                            </div>
                            <p class="form-note">
                                Your booking will be processed and you will receive a confirmation email.
                            </p>
                        </div>
                    </form>
                </div>
            `;
            
            const modal = createModal(modalContent);
            if (!modal) return;
            
            const form = modal.querySelector('#booking-form');
            const submitBtn = form.querySelector('button[type="submit"]');
            
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const data = Object.fromEntries(formData.entries());
                
                if (!data.name || !data.email || !data.phone || !data.dates || !data.travelers) {
                    showNotification('❌ Please fill in all required fields.', 'error');
                    return;
                }
                
                if (!validateEmail(data.email)) {
                    showNotification('❌ Please enter a valid email address.', 'error');
                    return;
                }
                
                if (!validatePhone(data.phone)) {
                    showNotification('❌ Please enter a valid phone number.', 'error');
                    return;
                }
                
                const bookingData = {
                    serviceType,
                    serviceId,
                    serviceName: service.name,
                    servicePrice: service.price,
                    serviceRating: service.rating,
                    customerName: data.name,
                    customerEmail: data.email,
                    customerPhone: data.phone,
                    country: data.country || 'Not specified',
                    travelDates: data.dates,
                    numberOfTravelers: data.travelers,
                    specialRequests: data.message || 'None',
                    status: 'pending',
                    paymentStatus: 'unpaid',
                    bookingDate: new Date().toISOString()
                };
                
                showLoading(submitBtn, true);
                
                try {
                    const response = await apiService.createBooking(bookingData);
                    
                    if (response.success) {
                        showNotification('✅ Booking submitted successfully!', 'success');
                        closeModal();
                    } else {
                        showNotification(`❌ ${response.message || 'Failed to save booking'}`, 'error');
                    }
                } catch (error) {
                    console.error('Booking error:', error);
                    showNotification('❌ Failed to save booking. Please try again.', 'error');
                } finally {
                    showLoading(submitBtn, false);
                }
            });
            
        } catch (error) {
            console.error('Error creating booking modal:', error);
            showNotification('Error loading booking form. Please try again.', 'error');
        }
    }

    function showTripPlanningModal() {
        const modalContent = `
            <div class="modal-header">
                <h2><i class="fas fa-map-marked-alt" aria-hidden="true"></i> Plan Your Custom Itinerary</h2>
                <button class="modal-close" aria-label="Close modal">&times;</button>
            </div>
            
            <div class="modal-body">
                <div class="modal-intro">
                    <p>Tell us about your dream Rwanda trip. Our experts will create a custom itinerary just for you.</p>
                </div>
                
                <form id="plan-trip-form" novalidate>
                    <div class="form-row">
                        <div class="form-group">
                            <label for="trip-name">Your Name *</label>
                            <input type="text" id="trip-name" name="name" required 
                                   placeholder="Your full name" autocomplete="name">
                        </div>
                        <div class="form-group">
                            <label for="trip-email">Your Email *</label>
                            <input type="email" id="trip-email" name="email" required 
                                   placeholder="Your email address" autocomplete="email">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="trip-phone">Phone Number *</label>
                            <input type="tel" id="trip-phone" name="phone" required 
                                   placeholder="Your phone number" autocomplete="tel">
                        </div>
                        <div class="form-group">
                            <label for="trip-country">Country *</label>
                            <input type="text" id="trip-country" name="country" required 
                                   placeholder="Your country" autocomplete="country">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label for="trip-dates">Travel Dates *</label>
                            <input type="text" id="trip-dates" name="dates" required 
                                   placeholder="e.g., June 15-25, 2024">
                        </div>
                        <div class="form-group">
                            <label for="trip-travelers">Number of Travelers *</label>
                            <select id="trip-travelers" name="travelers" required>
                                <option value="">Select</option>
                                <option value="1">1 person</option>
                                <option value="2">2 people</option>
                                <option value="3-4">3-4 people</option>
                                <option value="5-6">5-6 people</option>
                                <option value="7+">7+ people</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="trip-budget">Budget Range *</label>
                        <select id="trip-budget" name="budget" required>
                            <option value="">Select budget</option>
                            <option value="budget">Budget ($500 - $1,500)</option>
                            <option value="midrange">Mid-range ($1,500 - $3,000)</option>
                            <option value="premium">Premium ($3,000 - $5,000)</option>
                            <option value="luxury">Luxury ($5,000+)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="trip-accommodation">Accommodation Preference *</label>
                            <select id="trip-accommodation" name="accommodation" required>
                            <option value="">Select preference</option>
                            <option value="budget">Budget (Hostels, Guesthouses)</option>
                            <option value="midrange">Mid-range (Hotels, Eco-Lodges)</option>
                            <option value="luxury">Luxury (5-Star Hotels, Resorts)</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Travel Interests *</label>
                        <div class="interests-grid">
                            <label class="interest-checkbox">
                                <input type="checkbox" name="interests" value="gorilla">
                                <span class="checkbox-label">
                                    <i class="fas fa-ape"></i>
                                    Gorilla Trekking
                                </span>
                            </label>
                            <label class="interest-checkbox">
                                <input type="checkbox" name="interests" value="safari">
                                <span class="checkbox-label">
                                    <i class="fas fa-paw"></i>
                                    Safari & Wildlife
                                </span>
                            </label>
                            <label class="interest-checkbox">
                                <input type="checkbox" name="interests" value="culture">
                                <span class="checkbox-label">
                                    <i class="fas fa-theater-masks"></i>
                                    Cultural Experiences
                                </span>
                            </label>
                            <label class="interest-checkbox">
                                <input type="checkbox" name="interests" value="hiking">
                                <span class="checkbox-label">
                                    <i class="fas fa-mountain"></i>
                                    Hiking & Adventure
                                </span>
                            </label>
                            <label class="interest-checkbox">
                                <input type="checkbox" name="interests" value="beach">
                                <span class="checkbox-label">
                                    <i class="fas fa-umbrella-beach"></i>
                                    Beach & Relaxation
                                </span>
                            </label>
                            <label class="interest-checkbox">
                                <input type="checkbox" name="interests" value="birdwatching">
                                <span class="checkbox-label">
                                    <i class="fas fa-dove"></i>
                                    Bird Watching
                                </span>
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="trip-requirements">Special Requirements</label>
                        <textarea id="trip-requirements" name="requirements" 
                                  placeholder="Any dietary restrictions, mobility needs, special requests..." 
                                  rows="3"></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="trip-message">Tell us about your dream Rwanda trip *</label>
                        <textarea id="trip-message" name="message" required 
                                  placeholder="Describe your ideal Rwanda experience..." 
                                  rows="4"></textarea>
                    </div>
                    
                    <div class="modal-footer">
                        <div class="form-actions">
                            <button type="submit" class="btn btn-primary btn-large">
                                <i class="fas fa-save" aria-hidden="true"></i> Submit Trip Plan
                            </button>
                        </div>
                        <p class="form-note">
                            Your itinerary request will be processed and you will receive a response within 24 hours.
                        </p>
                    </div>
                </form>
            </div>
        `;
        
        const modal = createModal(modalContent);
        if (!modal) return;
        
        const form = modal.querySelector('#plan-trip-form');
        const submitBtn = form.querySelector('button[type="submit"]');
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            const interests = Array.from(form.querySelectorAll('input[name="interests"]:checked'))
                .map(cb => cb.value);
            
            const requiredFields = ['name', 'email', 'phone', 'country', 'dates', 'travelers', 'budget', 'accommodation', 'message'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                showNotification('❌ Please fill in all required fields.', 'error');
                return;
            }
            
            if (interests.length === 0) {
                showNotification('❌ Please select at least one travel interest.', 'error');
                return;
            }
            
            if (!validateEmail(data.email)) {
                showNotification('❌ Please enter a valid email address.', 'error');
                return;
            }
            
            if (!validatePhone(data.phone)) {
                showNotification('❌ Please enter a valid phone number.', 'error');
                return;
            }
            
            const tripPlanData = {
                customerName: data.name,
                customerEmail: data.email,
                customerPhone: data.phone,
                country: data.country,
                travelDates: data.dates,
                numberOfTravelers: data.travelers,
                budgetRange: data.budget,
                accommodationPreference: data.accommodation,
                interests: interests,
                specialRequirements: data.requirements || 'None',
                tripDescription: data.message,
                status: 'pending'
            };
            
            showLoading(submitBtn, true);
            
            try {
                const response = await apiService.createTripPlan(tripPlanData);
                
                if (response.success) {
                    showNotification('✅ Trip plan submitted successfully!', 'success');
                    closeModal();
                } else {
                    showNotification(`❌ ${response.message || 'Failed to save itinerary'}`, 'error');
                }
            } catch (error) {
                console.error('Trip plan error:', error);
                showNotification('❌ Failed to save itinerary. Please try again.', 'error');
            } finally {
                showLoading(submitBtn, false);
            }
        });
    }

    // ===============================
    // FORM HANDLERS
    // ===============================
    
    function setupFormHandlers() {
        // Newsletter form
        const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            
            newsletterForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const emailInput = newsletterForm.querySelector('input[type="email"]');
                const email = emailInput?.value.trim();
                
                if (!email || !validateEmail(email)) {
                    showNotification('❌ Please enter a valid email address.', 'error');
                    return;
                }
                
                showLoading(submitBtn, true);
                
                try {
                    const response = await apiService.subscribeNewsletter({ 
                        email,
                        subscribedAt: new Date().toISOString()
                    });
                    
                    if (response.success) {
                        showNotification('✅ Subscribed successfully!', 'success');
                        newsletterForm.reset();
                    } else {
                        showNotification(`❌ ${response.message || 'Subscription failed'}`, 'error');
                    }
                } catch (error) {
                    console.error('Newsletter subscription error:', error);
                    showNotification('❌ Failed to subscribe. Please try again.', 'error');
                } finally {
                    showLoading(submitBtn, false);
                }
            });
        }
        
        // Contact form
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const name = document.getElementById('contact-name')?.value.trim();
                const email = document.getElementById('contact-email')?.value.trim();
                const subject = document.getElementById('contact-subject')?.value.trim();
                const message = document.getElementById('contact-message')?.value.trim();
                
                if (!name || !email || !subject || !message) {
                    showNotification('❌ Please fill in all fields.', 'error');
                    return;
                }
                
                if (!validateEmail(email)) {
                    showNotification('❌ Please enter a valid email address.', 'error');
                    return;
                }
                
                const contactData = {
                    name,
                    email,
                    subject,
                    message
                };
                
                showLoading(submitBtn, true);
                
                try {
                    const response = await apiService.sendContactMessage(contactData);
                    
                    if (response.success) {
                        showNotification('✅ Message sent successfully!', 'success');
                        contactForm.reset();
                    } else {
                        showNotification(`❌ ${response.message || 'Failed to save message'}`, 'error');
                    }
                } catch (error) {
                    console.error('Contact form error:', error);
                    showNotification('❌ Failed to send message. Please try again.', 'error');
                } finally {
                    showLoading(submitBtn, false);
                }
            });
        }
    }

    // ===============================
    // EVENT DELEGATION
    // ===============================
    
    function setupEventDelegation() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.matches('.book-now, .hire-now') || 
                target.closest('.book-now, .hire-now')) {
                e.preventDefault();
                const button = target.matches('.book-now, .hire-now') ? target : target.closest('.book-now, .hire-now');
                const type = button.dataset.type;
                const id = button.dataset.id;
                const name = button.dataset.name;
                if (type && id && name) {
                    showBookingModal(type, id, name);
                }
            }
            
            else if (target.matches('.view-article-link') || 
                    target.closest('.view-article-link')) {
                e.preventDefault();
                const link = target.matches('.view-article-link') ? target : target.closest('.view-article-link');
                const articleId = link.dataset.id;
                if (articleId) {
                    viewBlogArticle(articleId);
                }
            }
            
            else if (target.matches('.nav-link') || 
                    target.closest('.nav-link')) {
                e.preventDefault();
                const link = target.matches('.nav-link') ? target : target.closest('.nav-link');
                const href = link.getAttribute('href');
                if (href && href.startsWith('/')) {
                    navigateTo(href);
                }
            }
            
            else if (target.matches('.plan-trip-btn, .plan-trip-hero-btn, .plan-trip-nav-btn, .plan-trip-footer-btn') ||
                    target.closest('.plan-trip-btn, .plan-trip-hero-btn, .plan-trip-nav-btn, .plan-trip-footer-btn')) {
                e.preventDefault();
                showTripPlanningModal();
            }
            
            else if (target.matches('.explore-destinations-btn') ||
                    target.closest('.explore-destinations-btn')) {
                e.preventDefault();
                navigateTo('/destinations');
            }
            
            else if (target.matches('.view-all-btn') ||
                    target.closest('.view-all-btn')) {
                e.preventDefault();
                const page = target.dataset.page || target.closest('.view-all-btn')?.dataset.page;
                if (page) {
                    navigateTo('/' + page);
                }
            }
            
            else if (target.matches('.service-link') ||
                    target.closest('.service-link')) {
                e.preventDefault();
                const page = target.dataset.page || target.closest('.service-link')?.dataset.page;
                if (page) {
                    navigateTo('/' + page);
                }
            }
            
            else if (target.matches('.footer-links a[data-page]') ||
                    target.closest('.footer-links a[data-page]')) {
                e.preventDefault();
                const page = target.dataset.page || target.closest('a[data-page]')?.dataset.page;
                if (page) {
                    navigateTo('/' + page);
                }
            }
            
            else if (target.matches('.back-to-blog-link') ||
                    target.closest('.back-to-blog-link')) {
                e.preventDefault();
                navigateTo('/blog');
            }
        });
    }

    // ===============================
    // MOBILE MENU
    // ===============================
    
    function setupMobileMenu() {
        try {
            const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
            const navLinks = document.querySelector('.nav-links');
            
            if (!mobileMenuBtn || !navLinks) return;
            
            const toggleMenu = () => {
                const isActive = mobileMenuBtn.classList.contains('active');
                mobileMenuBtn.classList.toggle('active');
                navLinks.classList.toggle('active');
                document.body.style.overflow = !isActive ? 'hidden' : '';
            };
            
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleMenu();
            });
            
            navLinks.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
            
            document.addEventListener('click', (e) => {
                if (window.innerWidth <= 768 && 
                    !mobileMenuBtn.contains(e.target) && 
                    !navLinks.contains(e.target) &&
                    navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
            
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
                        toggleMenu();
                    }
                }, 250);
            });
            
        } catch (error) {
            console.error('Error setting up mobile menu:', error);
        }
    }

    // ===============================
    // SEARCH SYSTEM
    // ===============================
    
    function setupSearchModal() {
        const searchBtn = document.getElementById('search-btn-desktop');
        const searchModal = document.getElementById('search-modal');
        
        if (!searchBtn || !searchModal) return;
        
        const searchClose = searchModal.querySelector('.search-close');
        const searchInput = document.getElementById('search-input');
        
        searchBtn.addEventListener('click', () => {
            searchModal.classList.add('active');
            setTimeout(() => {
                searchInput?.focus();
            }, 100);
        });
        
        searchClose.addEventListener('click', () => {
            searchModal.classList.remove('active');
        });
        
        searchModal.addEventListener('click', (e) => {
            if (e.target === searchModal) {
                searchModal.classList.remove('active');
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchModal.classList.add('active');
                setTimeout(() => {
                    searchInput?.focus();
                }, 100);
            }
            
            if (e.key === 'Escape' && searchModal.classList.contains('active')) {
                searchModal.classList.remove('active');
            }
        });
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function init() {
        if (isInitialized) return;
        isInitialized = true;
        
        console.log('🚀 Initializing Go Trip System v3.0');
        console.log('📡 Backend URL:', config.baseUrl);
        console.log('🌍 Environment:', window.location.hostname.includes('onrender.com') ? 'Render' : 'Local');
        
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
        
        // Initialize UI components immediately
        setupMobileMenu();
        setupSearchModal();
        setupEventDelegation();
        setupFormHandlers();
        initializeHeroWelcomeBanner();
        
        // Handle browser navigation
        window.addEventListener('popstate', () => {
            const path = getCurrentPath();
            const pageId = getPageFromPath(path);
            showPage(pageId, false);
        });
        
        // Load initial page
        const initialPath = getCurrentPath();
        const initialPage = getPageFromPath(initialPath);
        showPage(initialPage, false);
        
        // Check backend health in background
        setTimeout(async () => {
            try {
                console.log('🩺 Checking backend health...');
                const health = await apiService.checkHealth();
                console.log('✅ Backend Health:', health);
                apiHealth = health.success;
                connectionStatus = health.database === 'connected' ? 'online' : 'limited';
                
                if (health.database === 'connected') {
                    showNotification('✅ Connected to backend server', 'success', 2000);
                } else if (apiHealth) {
                    showNotification('⚠️ Backend online, database offline', 'warning', 3000);
                }
                
                // Pre-fetch data if backend is available
                if (apiHealth) {
                    await dataManager.fetchAllData();
                }
                
            } catch (error) {
                console.warn('⚠️ Backend check failed:', error.message);
                apiHealth = false;
                connectionStatus = 'offline';
                showNotification('⚠️ Backend unavailable. Some features may not work.', 'warning', 3000);
            }
        }, 1000);
        
        console.log('✅ Go Trip System initialized');
    }

    // ===============================
    // GLOBAL EXPORTS
    // ===============================
    window.GoTrip = {
        navigateTo,
        showPage,
        closeModal,
        showNotification,
        showTripPlanningModal,
        showBookingModal,
        apiService,
        dataManager,
        config,
        getApiHealth: () => apiHealth,
        getConnectionStatus: () => connectionStatus
    };

    // ===============================
    // INITIALIZE ON DOM READY
    // ===============================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM already loaded
        setTimeout(init, 100);
    }

    // Handle window load event
    window.addEventListener('load', () => {
        console.log('📄 Page fully loaded');
    });

})();