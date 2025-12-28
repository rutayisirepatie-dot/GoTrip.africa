// Go Trip - Complete Professional Tourism System
(function() {
    'use strict';
    
    // ===============================
    // CONFIGURATION
    // ===============================
    const config = {
        baseUrl: 'https://gotrip-backend-uwhn.onrender.com/api',
        debug: true,
        useMockMode: false, // Changed to false to use real backend
        
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
                user: '/bookings/user',
                cancel: '/bookings'
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
    // STATE MANAGEMENT
    // ===============================
    let isAuthenticated = false;
    let currentUser = null;

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
    // API SERVICE - UPDATED FOR MONGODB
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
        
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000);
            
            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal
            });
            
            clearTimeout(timeoutId);
            
            // Handle 401 Unauthorized
            if (response.status === 401) {
                clearUserData();
                updateAuthUI();
                throw new Error('Session expired. Please login again.');
            }
            
            if (!response.ok) {
                const error = await response.json().catch(() => ({}));
                throw new Error(error.message || `HTTP ${response.status}`);
            }
            
            return await response.json();
            
        } catch (error) {
            console.error('API Error:', error);
            
            // Re-throw error for handling in calling functions
            throw new Error(error.message || 'Network error. Please check your connection.');
        }
    }

    // ===============================
    // AUTHENTICATION - UPDATED FOR MONGODB
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
            
            if (result.success) {
                isAuthenticated = true;
                currentUser = result.user;
                saveUserData({ ...result.user, token: result.token });
                updateAuthUI(true, result.user);
                
                showNotification(`✅ Welcome back, ${result.user.name}!`, 'success');
                
                // Redirect to dashboard after login
                setTimeout(() => {
                    if (result.user.role === 'admin') {
                        showPage('admin');
                    } else {
                        showPage('dashboard');
                    }
                }, 1000);
                
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
            
            if (result.success) {
                isAuthenticated = true;
                currentUser = result.user;
                saveUserData({ ...result.user, token: result.token });
                updateAuthUI(true, result.user);
                
                showNotification('✅ Registration successful! Welcome to Go Trip!', 'success');
                
                // Redirect to dashboard after registration
                setTimeout(() => {
                    showPage('dashboard');
                }, 1500);
                
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
        }
    }

    // ===============================
    // ENHANCED DASHBOARD FUNCTIONS - UPDATED FOR MONGODB
    // ===============================
    
    async function loadDashboard() {
        console.log('Loading enhanced user dashboard...');
        
        const dashboard = document.getElementById('dashboard');
        if (!dashboard) return;
        
        if (!isAuthenticated) {
            showPage('home');
            showNotification('Please login to access dashboard', 'warning');
            return;
        }
        
        try {
            // Get user dashboard data from backend
            const result = await apiRequest(config.endpoints.dashboard.user);
            
            if (!result.success) {
                throw new Error(result.message || 'Failed to load dashboard');
            }
            
            const data = result.data;
            const userBookings = data.recentBookings || [];
            const userTripPlans = data.recentTripPlans || [];
            const stats = data.stats || {};
            
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
                                            <strong>${stats.totalBookings || 0}</strong>
                                            <span>Bookings</span>
                                        </div>
                                        <div class="stat">
                                            <strong>$${stats.totalSpent || 0}</strong>
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
                                            <span class="nav-badge">${stats.totalBookings || 0}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="dashboard-tab-link" data-tab="trip-plans">
                                            <i class="fas fa-route"></i>
                                            Trip Plans
                                            <span class="nav-badge">${stats.pendingTripPlans || 0}</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" class="dashboard-tab-link" data-tab="profile">
                                            <i class="fas fa-user-cog"></i>
                                            Profile Settings
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
                                                <p class="dashboard-stat-number">${stats.totalBookings || 0}</p>
                                                <p class="dashboard-stat-subtitle">All-time bookings</p>
                                            </div>
                                        </div>
                                        
                                        <div class="dashboard-stat-card">
                                            <div class="dashboard-stat-icon pending">
                                                <i class="fas fa-clock"></i>
                                            </div>
                                            <div class="dashboard-stat-content">
                                                <h3>Upcoming</h3>
                                                <p class="dashboard-stat-number">${stats.upcomingBookings || 0}</p>
                                                <p class="dashboard-stat-subtitle">Active bookings</p>
                                            </div>
                                        </div>
                                        
                                        <div class="dashboard-stat-card">
                                            <div class="dashboard-stat-icon completed">
                                                <i class="fas fa-check-circle"></i>
                                            </div>
                                            <div class="dashboard-stat-content">
                                                <h3>Completed</h3>
                                                <p class="dashboard-stat-number">${stats.completedBookings || 0}</p>
                                                <p class="dashboard-stat-subtitle">Past experiences</p>
                                            </div>
                                        </div>
                                        
                                        <div class="dashboard-stat-card">
                                            <div class="dashboard-stat-icon revenue">
                                                <i class="fas fa-wallet"></i>
                                            </div>
                                            <div class="dashboard-stat-content">
                                                <h3>Total Spent</h3>
                                                <p class="dashboard-stat-number">$${stats.totalSpent || 0}</p>
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
                                            ${renderRecentBookings(userBookings)}
                                        </div>
                                    </div>
                                    
                                    <div class="dashboard-section">
                                        <div class="section-header">
                                            <h3><i class="fas fa-route"></i> Recent Trip Plans</h3>
                                            <a href="#" class="btn-link view-all" data-tab="trip-plans">View All</a>
                                        </div>
                                        <div id="dashboard-recent-trip-plans" class="dashboard-booking-cards">
                                            ${renderRecentTripPlans(userTripPlans)}
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
        if (!bookings || bookings.length === 0) {
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
                        <span class="service-badge service-${booking.serviceType || 'general'}">
                            ${booking.serviceType || 'Service'}
                        </span>
                    </div>
                    <span class="dashboard-booking-status dashboard-status-${booking.status || 'pending'}">
                        ${(booking.status || 'pending').toUpperCase()}
                    </span>
                </div>
                
                <h4 class="dashboard-booking-title">${booking.serviceName || 'Service'}</h4>
                
                <div class="dashboard-booking-details">
                    <p><i class="far fa-calendar"></i> ${new Date(booking.date || booking.createdAt).toLocaleDateString()}</p>
                    <p><i class="fas fa-users"></i> ${booking.travelers || 1} travelers</p>
                    <p><i class="fas fa-hashtag"></i> ${booking.bookingReference || booking._id || ''}</p>
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
        if (!bookings || bookings.length === 0) {
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
                        <div class="service-icon-small service-${booking.serviceType || 'general'}">
                            <i class="fas fa-${getServiceIcon(booking.serviceType)}"></i>
                        </div>
                        <div>
                            <strong>${booking.serviceName || 'Service'}</strong>
                            <small>${booking.bookingReference || booking._id || ''}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <span class="badge badge-service">${booking.serviceType || 'general'}</span>
                </td>
                <td>
                    ${new Date(booking.date || booking.createdAt).toLocaleDateString()}<br>
                    <small>${booking.duration || 1} days</small>
                </td>
                <td>
                    <strong>$${booking.totalAmount || '0'}</strong>
                </td>
                <td>
                    <span class="badge badge-${booking.status || 'pending'}">
                        ${(booking.status || 'pending').toUpperCase()}
                    </span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="btn-action btn-view" onclick="viewBookingDetails('${booking._id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        ${booking.status === 'pending' ? `
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
        if (!tripPlans || tripPlans.length === 0) {
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
                    <span class="dashboard-booking-status dashboard-status-${trip.status || 'review'}">
                        ${(trip.status || 'review').toUpperCase()}
                    </span>
                </div>
                
                <h4 class="dashboard-booking-title">${trip.duration || 'Custom'} Trip</h4>
                
                <div class="dashboard-booking-details">
                    <p><i class="far fa-calendar"></i> Start: ${new Date(trip.startDate).toLocaleDateString()}</p>
                    <p><i class="fas fa-users"></i> ${trip.travelers || 1} travelers</p>
                    <p><i class="fas fa-wallet"></i> Budget: ${trip.budget || 'Custom'}</p>
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
        if (!tripPlans || tripPlans.length === 0) {
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
                        <h4>${trip.tripReference || trip._id}</h4>
                        <span class="badge badge-${trip.status || 'review'}">${trip.status || 'review'}</span>
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
                </div>
                
                <div class="trip-plan-footer">
                    <div class="trip-plan-actions">
                        ${trip.status === 'review' ? `
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
                    const result = await apiRequest(config.endpoints.dashboard.updateProfile, {
                        method: 'PUT',
                        body: JSON.stringify(data)
                    });
                    
                    if (result.success) {
                        showNotification('✅ Profile updated successfully!', 'success');
                        currentUser = result.user;
                        saveUserData(currentUser);
                    }
                } catch (error) {
                    showNotification('❌ Error updating profile', 'error');
                }
            });
        }
    }

    // ===============================
    // ADMIN DASHBOARD FUNCTIONS - UPDATED FOR MONGODB
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
            const result = await apiRequest(config.endpoints.dashboard.admin);
            
            if (!result.success) {
                throw new Error(result.message || 'Failed to load admin dashboard');
            }
            
            const data = result.data;
            const stats = data.stats || {};
            const monthlyRevenue = data.monthlyRevenue || [];
            const recentActivity = data.recentActivity || [];
            const recentBookings = data.recentBookings || [];
            const recentUsers = data.recentUsers || [];
            
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
                                    <p class="dashboard-stat-number">${stats.totalUsers || 0}</p>
                                    <p class="dashboard-stat-subtitle">
                                        <span class="stat-change positive">Active</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="dashboard-stat-card admin-stat">
                                <div class="dashboard-stat-icon bookings">
                                    <i class="fas fa-calendar-alt"></i>
                                </div>
                                <div class="dashboard-stat-content">
                                    <h3>Total Bookings</h3>
                                    <p class="dashboard-stat-number">${stats.totalBookings || 0}</p>
                                    <p class="dashboard-stat-subtitle">
                                        <span class="stat-change positive">This month</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="dashboard-stat-card admin-stat">
                                <div class="dashboard-stat-icon revenue">
                                    <i class="fas fa-dollar-sign"></i>
                                </div>
                                <div class="dashboard-stat-content">
                                    <h3>Total Revenue</h3>
                                    <p class="dashboard-stat-number">$${stats.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}</p>
                                    <p class="dashboard-stat-subtitle">
                                        <span class="stat-change positive">All time</span>
                                    </p>
                                </div>
                            </div>
                            
                            <div class="dashboard-stat-card admin-stat">
                                <div class="dashboard-stat-icon pending">
                                    <i class="fas fa-clock"></i>
                                </div>
                                <div class="dashboard-stat-content">
                                    <h3>Active Bookings</h3>
                                    <p class="dashboard-stat-number">${stats.activeBookings || 0}</p>
                                    <p class="dashboard-stat-subtitle">
                                        ${stats.pendingTripPlans || 0} pending trips
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
                                                    Loading users...
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
                                                    Loading bookings...
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
                                                    Loading trip plans...
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            // Load tables data
            loadAdminUsersTable();
            loadAdminBookingsTable();
            loadAdminTripsTable();
            
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

    async function loadAdminUsersTable() {
        try {
            const result = await apiRequest(config.endpoints.dashboard.allUsers);
            if (result.success) {
                const tableBody = document.getElementById('users-table-body');
                if (tableBody) {
                    tableBody.innerHTML = renderUsersTable(result.data || []);
                }
            }
        } catch (error) {
            console.error('Error loading users table:', error);
        }
    }

    async function loadAdminBookingsTable() {
        try {
            const result = await apiRequest(config.endpoints.dashboard.allBookings);
            if (result.success) {
                const tableBody = document.getElementById('bookings-table-body');
                if (tableBody) {
                    tableBody.innerHTML = renderAdminBookingsTable(result.data || []);
                }
            }
        } catch (error) {
            console.error('Error loading bookings table:', error);
        }
    }

    async function loadAdminTripsTable() {
        try {
            const result = await apiRequest('/api/tripPlan/all');
            if (result.success) {
                const tableBody = document.getElementById('trips-table-body');
                if (tableBody) {
                    tableBody.innerHTML = renderAdminTripsTable(result.data || []);
                }
            }
        } catch (error) {
            console.error('Error loading trips table:', error);
        }
    }

    function renderRevenueChart(monthlyRevenue) {
        if (!monthlyRevenue || monthlyRevenue.length === 0) {
            return '<p class="text-center">No revenue data available</p>';
        }
        
        const maxRevenue = Math.max(...monthlyRevenue.map(m => m.revenue));
        
        return monthlyRevenue.map(item => {
            const height = maxRevenue > 0 ? (item.revenue / maxRevenue) * 100 : 0;
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

    function renderRecentUsers(users) {
        if (!users || users.length === 0) {
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
            </div>
        `).join('');
    }

    function renderAdminRecentBookings(bookings) {
        if (!bookings || bookings.length === 0) {
            return '<p class="text-center">No recent bookings</p>';
        }
        
        return bookings.map(booking => `
            <div class="booking-item">
                <div class="booking-icon">
                    <i class="fas fa-${getServiceIcon(booking.serviceType)}"></i>
                </div>
                <div class="booking-info">
                    <strong>${booking.serviceName}</strong>
                    <small>${booking.bookingReference || booking._id}</small>
                    <div>
                        <span class="badge badge-${booking.status}">${booking.status}</span>
                        <span class="amount">$${booking.totalAmount || '0'}</span>
                    </div>
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
                        <button class="btn-action btn-view" onclick="viewUserDetails('${user._id}')">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn-action btn-edit" onclick="editUser('${user._id}')">
                            <i class="fas fa-edit"></i>
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
                    <strong>${booking.bookingReference || booking._id}</strong>
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
                    <strong>${trip.tripReference || trip._id}</strong>
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
    // DATA LOADING FUNCTIONS - UPDATED FOR MONGODB
    // ===============================
    
    async function loadHomePage() {
        console.log('Loading home page...');
        // Load featured destinations
        const destinationsGrid = document.querySelector('.destinations-grid');
        if (destinationsGrid) {
            try {
                const result = await apiRequest(config.endpoints.destinations);
                const featuredDestinations = result.data?.slice(0, 3) || [];
                
                destinationsGrid.innerHTML = featuredDestinations.map(dest => `
                    <div class="destination-card">
                        <div class="destination-image">
                            <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='./images/default-destination.jpg'">
                            <div class="destination-rating">
                                <i class="fas fa-star"></i> ${dest.rating || 4.5}
                            </div>
                        </div>
                        <div class="destination-content">
                            <h3>${dest.name}</h3>
                            <div class="destination-location">
                                <i class="fas fa-map-marker-alt"></i> ${dest.location}
                            </div>
                            <p>${dest.description ? dest.description.substring(0, 100) + '...' : 'Discover this amazing destination'}</p>
                            <button class="btn btn-primary book-now" 
                                    data-type="destination" 
                                    data-id="${dest._id}"
                                    data-name="${dest.name}">
                                Book Now
                            </button>
                        </div>
                    </div>
                `).join('');
            } catch (error) {
                console.error('Error loading destinations:', error);
            }
        }
        
        // Load featured blog posts
        const blogGrid = document.querySelector('.blog-grid');
        if (blogGrid) {
            try {
                const result = await apiRequest(config.endpoints.blog);
                const featuredBlogs = result.data?.slice(0, 3) || [];
                
                blogGrid.innerHTML = featuredBlogs.map(blog => `
                    <div class="blog-card">
                        <div class="blog-image">
                            <img src="${blog.image}" alt="${blog.title}" loading="lazy" onerror="this.src='./images/default-blog.jpg'">
                            <span class="blog-category">${blog.category || 'Travel'}</span>
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span class="blog-date">
                                    <i class="far fa-calendar"></i> ${new Date(blog.createdAt).toLocaleDateString()}
                                </span>
                                <span class="blog-read-time">${blog.readTime || '5 min read'}</span>
                            </div>
                            <h3>${blog.title}</h3>
                            <p>${blog.excerpt ? blog.excerpt.substring(0, 120) + '...' : 'Read this interesting article...'}</p>
                            <a href="#" class="read-more-link" data-page="blog">Read More <i class="fas fa-arrow-right"></i></a>
                        </div>
                    </div>
                `).join('');
            } catch (error) {
                console.error('Error loading blog posts:', error);
            }
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
        
        try {
            const result = await apiRequest(config.endpoints.destinations);
            const destinations = result.data || [];
            
            grid.innerHTML = destinations.map(dest => `
                <div class="destination-card">
                    <div class="destination-image">
                        <img src="${dest.image}" alt="${dest.name}" loading="lazy" onerror="this.src='./images/default-destination.jpg'">
                        <div class="destination-rating">
                            <i class="fas fa-star"></i> ${dest.rating || 4.5}
                        </div>
                    </div>
                    <div class="destination-content">
                        <h3>${dest.name}</h3>
                        <div class="destination-location">
                            <i class="fas fa-map-marker-alt"></i> ${dest.location}
                        </div>
                        <p>${dest.description || 'Discover this amazing destination'}</p>
                        <div class="features">
                            ${(dest.features || []).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                        </div>
                        <div class="price-tag">${dest.price || 'Contact for price'}</div>
                        <button class="btn btn-primary book-now" 
                                data-type="destination" 
                                data-id="${dest._id}"
                                data-name="${dest.name}">
                            Book Tour
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading destinations:', error);
            grid.innerHTML = '<p class="text-center">Error loading destinations. Please try again later.</p>';
        }
    }

    async function loadGuides() {
        console.log('Loading guides...');
        const grid = document.querySelector('.guides-grid-full');
        if (!grid) return;
        
        try {
            const result = await apiRequest(config.endpoints.guides);
            const guides = result.data || [];
            
            grid.innerHTML = guides.map(guide => `
                <div class="guide-card">
                    <div class="guide-avatar">
                        <img src="${guide.image}" alt="${guide.name}" loading="lazy" onerror="this.src='./images/default-guide.jpg'">
                    </div>
                    
                    <div class="guide-info">
                        <h3>${guide.name}</h3>
                        
                        <p class="specialty">${guide.specialty || 'Tour Guide'}</p>
                        
                        <div class="languages-section">
                            <div class="languages-header">
                                <i class="fas fa-language"></i>
                                <strong>Languages:</strong>
                            </div>
                            <div class="languages-list">
                                ${(guide.languages || []).map(lang => `
                                    <span class="language-tag">
                                        ${lang}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <p class="experience">
                            <i class="fas fa-briefcase"></i> ${guide.experience || 'Professional guide'}
                        </p>
                        
                        <div class="rating">
                            ${'★'.repeat(Math.floor(guide.rating || 4))}${(guide.rating || 4) % 1 ? '½' : ''}
                            <span>${guide.rating || 4.0}</span>
                        </div>
                        
                        <div class="price">${guide.price || '$100/day'}</div>
                        
                        <button class="btn btn-primary book-now" 
                                data-type="guide" 
                                data-id="${guide._id}"
                                data-name="${guide.name}">
                            Hire Now
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading guides:', error);
            grid.innerHTML = '<p class="text-center">Error loading guides. Please try again later.</p>';
        }
    }

    async function loadTranslators() {
        console.log('Loading translators...');
        const grid = document.querySelector('.translators-grid-full');
        if (!grid) return;
        
        try {
            const result = await apiRequest(config.endpoints.translators);
            const translators = result.data || [];
            
            grid.innerHTML = translators.map(translator => `
                <div class="translator-card">
                    <div class="guide-avatar">
                        <img src="${translator.image}" alt="${translator.name}" loading="lazy" onerror="this.src='./images/default-translator.jpg'">
                    </div>
                    
                    <div class="guide-info">
                        <h3>${translator.name}</h3>
                        
                        <p class="specialty">${translator.specialty || 'Translator'}</p>
                        
                        <div class="languages-section">
                            <div class="languages-header">
                                <i class="fas fa-language"></i>
                                <strong>Languages:</strong>
                            </div>
                            <div class="languages-list">
                                ${(translator.languages || []).map(lang => `
                                    <span class="language-tag">
                                        ${lang}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                        
                        <p class="experience">
                            <i class="fas fa-briefcase"></i> ${translator.experience || 'Professional translator'}
                        </p>
                        
                        <div class="rating">
                            ${'★'.repeat(Math.floor(translator.rating || 4))}${(translator.rating || 4) % 1 ? '½' : ''}
                            <span>${translator.rating || 4.0}</span>
                        </div>
                        
                        <div class="price">${translator.price || '$80/day'}</div>
                        
                        <button class="btn btn-primary book-now" 
                                data-type="translator" 
                                data-id="${translator._id}"
                                data-name="${translator.name}">
                            Hire Now
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading translators:', error);
            grid.innerHTML = '<p class="text-center">Error loading translators. Please try again later.</p>';
        }
    }

    async function loadAccommodations() {
        console.log('Loading accommodations...');
        const grid = document.querySelector('.accommodations-grid-full');
        if (!grid) return;
        
        try {
            const result = await apiRequest(config.endpoints.accommodations);
            const accommodations = result.data || [];
            
            grid.innerHTML = accommodations.map(acc => `
                <div class="accommodation-card">
                    <div class="accommodation-image">
                        <img src="${acc.image}" alt="${acc.name}" loading="lazy" onerror="this.src='./images/default-accommodation.jpg'">
                    </div>
                    <div class="accommodation-content">
                        <span class="type">${acc.type || 'Accommodation'}</span>
                        <h3>${acc.name}</h3>
                        <div class="location">
                            <i class="fas fa-map-marker-alt"></i> ${acc.location}
                        </div>
                        <p>${acc.description ? acc.description.substring(0, 120) + '...' : 'Comfortable accommodation'}</p>
                        <div class="features">
                            ${(acc.features || []).slice(0, 3).map(f => `<span class="feature-tag">${f}</span>`).join('')}
                        </div>
                        <div class="price-tag">${acc.price || 'Contact for price'}</div>
                        <button class="btn btn-primary book-now" 
                                data-type="accommodation" 
                                data-id="${acc._id}"
                                data-name="${acc.name}">
                            Book Now
                        </button>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading accommodations:', error);
            grid.innerHTML = '<p class="text-center">Error loading accommodations. Please try again later.</p>';
        }
    }

    async function loadBlog() {
        console.log('Loading blog...');
        const grid = document.querySelector('.blog-grid-full');
        if (!grid) return;
        
        try {
            const result = await apiRequest(config.endpoints.blog);
            const blogs = result.data || [];
            
            grid.innerHTML = blogs.map(blog => `
                <div class="blog-card">
                    <div class="blog-image">
                        <img src="${blog.image}" alt="${blog.title}" loading="lazy" onerror="this.src='./images/default-blog.jpg'">
                        <span class="blog-category">${blog.category || 'Travel'}</span>
                    </div>
                    <div class="blog-content">
                        <div class="blog-meta">
                            <span class="blog-date">
                                <i class="fas fa-calendar"></i> ${new Date(blog.createdAt).toLocaleDateString()}
                            </span>
                            <span class="blog-read-time">${blog.readTime || '5 min read'}</span>
                        </div>
                        <h3>${blog.title}</h3>
                        <p>${blog.excerpt || 'Read this interesting article...'}</p>
                        <p class="author"><i class="fas fa-user"></i> ${blog.author || 'Admin'}</p>
                        <a href="#" class="read-more-link" onclick="viewBlogPost('${blog._id}')">Read Full Article</a>
                    </div>
                </div>
            `).join('');
        } catch (error) {
            console.error('Error loading blog:', error);
            grid.innerHTML = '<p class="text-center">Error loading blog posts. Please try again later.</p>';
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
        
        modal.innerHTML = `
            <div class="modal-header">
                <h2><i class="fas fa-calendar-plus"></i> Book ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)}</h2>
                <button class="modal-close">&times;</button>
            </div>
            
            <div class="modal-body">
                <form id="enhanced-booking-form">
                    <input type="hidden" name="service_type" value="${serviceType}">
                    <input type="hidden" name="service_id" value="${serviceId || ''}">
                    <input type="hidden" name="service_name" value="${serviceName || ''}">
                    
                    ${serviceName ? `
                        <div class="booking-service-preview">
                            <h4>${serviceName}</h4>
                        </div>
                    ` : ''}
                    
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
                                <label>Total Amount ($) *</label>
                                <input type="number" name="total_amount" required min="0" placeholder="Enter total amount">
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
            });
        });
        
        // Form submission
        const form = modal.querySelector('#enhanced-booking-form');
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const result = await apiRequest(config.endpoints.bookings.submit, {
                    method: 'POST',
                    body: JSON.stringify(data)
                });
                
                if (result.success) {
                    showNotification(`✅ Booking created successfully! ${result.message || ''}`, 'success');
                    closeModal();
                    
                    // Refresh dashboard to show new booking
                    setTimeout(() => {
                        if (currentUser.role === 'user') {
                            loadDashboard();
                        } else if (currentUser.role === 'admin') {
                            loadAdminDashboard();
                        }
                    }, 500);
                } else {
                    throw new Error(result.message || 'Booking failed');
                }
                
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
                    
                    <div class="form-group">
                        <label>Travelers *</label>
                        <input type="number" name="travelers" min="1" value="2" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Budget *</label>
                        <select name="budget" required>
                            <option value="budget">Budget ($500-$1000)</option>
                            <option value="midrange">Mid-range ($1000-$2500)</option>
                            <option value="luxury">Luxury ($2500+)</option>
                        </select>
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
                    showNotification(`✅ Trip plan submitted! ${result.message || ''}`, 'success');
                    closeModal();
                    
                    // Refresh dashboard to show new trip plan
                    setTimeout(() => {
                        if (currentUser.role === 'user') {
                            loadDashboard();
                        }
                    }, 500);
                } else {
                    throw new Error(result.message || 'Trip plan submission failed');
                }
                
            } catch (error) {
                showNotification(`❌ Error: ${error.message}`, 'error');
            }
        });
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
    }

    // ===============================
    // FORM HANDLERS - UPDATED FOR MONGODB
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
                    
                    document.querySelector(`.dashboard-tab-link[data-tab="${tab}"]`).classList.add('active');
                    document.getElementById(`dashboard-${tab}`).classList.add('active');
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
    // BOOKING MANAGEMENT FUNCTIONS - UPDATED FOR MONGODB
    // ===============================

    async function viewBookingDetails(bookingId) {
        try {
            const result = await apiRequest(`${config.endpoints.bookings.user}/${bookingId}`);
            
            if (!result.success) {
                throw new Error(result.message || 'Booking not found');
            }
            
            const booking = result.data;
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
                                <h3>${booking.bookingReference || booking._id}</h3>
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
                                    <label>Travelers</label>
                                    <p>${booking.travelers || 1} person(s)</p>
                                </div>
                            </div>
                            
                            <div class="info-section">
                                <h4><i class="fas fa-file-invoice-dollar"></i> Payment Details</h4>
                                <div class="info-item">
                                    <label>Total Amount</label>
                                    <p class="amount">$${booking.totalAmount || '0'}</p>
                                </div>
                                <div class="info-item">
                                    <label>Payment Status</label>
                                    <p>${booking.paymentStatus || 'Pending'}</p>
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
                            ${currentUser.role === 'user' && booking.status === 'pending' ? `
                                <button class="btn btn-danger" onclick="cancelBooking('${booking._id}')">
                                    <i class="fas fa-times"></i> Cancel Booking
                                </button>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
            
        } catch (error) {
            showNotification(`❌ Error loading booking details: ${error.message}`, 'error');
        }
    }

    async function cancelBooking(bookingId) {
        if (!confirm('Are you sure you want to cancel this booking?')) return;
        
        try {
            const result = await apiRequest(`${config.endpoints.bookings.cancel}/${bookingId}/cancel`, {
                method: 'PUT'
            });
            
            if (result.success) {
                showNotification('✅ Booking cancelled successfully!', 'success');
                closeModal();
                
                // Refresh dashboard
                setTimeout(() => {
                    loadDashboard();
                }, 500);
            } else {
                throw new Error(result.message || 'Cancellation failed');
            }
        } catch (error) {
            showNotification(`❌ Error cancelling booking: ${error.message}`, 'error');
        }
    }

    async function confirmBooking(bookingId) {
        try {
            const result = await apiRequest(`${config.endpoints.bookings.cancel}/${bookingId}/confirm`, {
                method: 'PUT'
            });
            
            if (result.success) {
                showNotification(`✅ Booking ${bookingId} confirmed!`, 'success');
                
                // Refresh admin dashboard
                setTimeout(() => {
                    loadAdminDashboard();
                }, 500);
            } else {
                throw new Error(result.message || 'Confirmation failed');
            }
        } catch (error) {
            showNotification(`❌ Error confirming booking: ${error.message}`, 'error');
        }
    }

    function downloadBookingInvoice(bookingId) {
        // Create invoice HTML (this would normally come from the backend)
        const invoiceHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Invoice ${bookingId}</title>
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
                    <p><strong>Invoice #:</strong> ${bookingId}</p>
                    <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                </div>
                
                <div class="footer">
                    <p>Thank you for choosing Go Trip Rwanda!</p>
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
        a.download = `invoice-${bookingId}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        showNotification('✅ Invoice downloaded successfully!', 'success');
    }

    // ===============================
    // TRIP PLAN FUNCTIONS - UPDATED FOR MONGODB
    // ===============================

    async function viewTripPlan(tripId) {
        try {
            const result = await apiRequest(`${config.endpoints.tripPlan}/${tripId}`);
            
            if (!result.success) {
                throw new Error(result.message || 'Trip plan not found');
            }
            
            const trip = result.data;
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
                                <h3>${trip.tripReference || trip._id}</h3>
                                <span class="badge badge-${trip.status}">${trip.status.toUpperCase()}</span>
                            </div>
                            <div class="trip-date">
                                <small>Requested: ${new Date(trip.createdAt).toLocaleDateString()}</small>
                            </div>
                        </div>
                        
                        <div class="trip-info-grid">
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
                                    <label>Travelers</label>
                                    <p>${trip.travelers} people</p>
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
                        
                        ${trip.assignedTo ? `
                            <div class="info-section">
                                <h4><i class="fas fa-user-tie"></i> Assigned To</h4>
                                <div class="assigned-info">
                                    <p><strong>${trip.assignedTo}</strong></p>
                                    <small>Assigned on: ${new Date(trip.assignedAt).toLocaleDateString()}</small>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            
        } catch (error) {
            showNotification(`❌ Error loading trip plan details: ${error.message}`, 'error');
        }
    }

    async function cancelTripPlan(tripId) {
        if (!confirm('Are you sure you want to cancel this trip plan?')) return;
        
        try {
            const result = await apiRequest(`${config.endpoints.tripPlan}/${tripId}/cancel`, {
                method: 'PUT'
            });
            
            if (result.success) {
                showNotification('✅ Trip plan cancelled successfully!', 'success');
                
                // Refresh dashboard
                setTimeout(() => {
                    loadDashboard();
                }, 500);
            } else {
                throw new Error(result.message || 'Cancellation failed');
            }
        } catch (error) {
            showNotification(`❌ Error cancelling trip plan: ${error.message}`, 'error');
        }
    }

    async function processTripPlan(tripId) {
        try {
            const result = await apiRequest(`${config.endpoints.tripPlan}/${tripId}/process`, {
                method: 'PUT',
                body: JSON.stringify({
                    assignedTo: currentUser.name,
                    status: 'processing'
                })
            });
            
            if (result.success) {
                showNotification(`✅ Trip plan ${tripId} is now being processed!`, 'success');
                closeModal();
                
                // Refresh admin dashboard
                setTimeout(() => {
                    loadAdminDashboard();
                }, 500);
            } else {
                throw new Error(result.message || 'Processing failed');
            }
        } catch (error) {
            showNotification(`❌ Error processing trip plan: ${error.message}`, 'error');
        }
    }

    // ===============================
    // HELPER FUNCTIONS
    // ===============================

    function filterBookings(status) {
        // This would normally filter on the backend
        // For now, we'll just reload the dashboard
        loadDashboard();
    }

    function filterAdminBookings(type) {
        // This would normally filter on the backend
        // For now, we'll just reload the admin dashboard
        loadAdminDashboard();
    }

    function filterAdminTrips(status) {
        // This would normally filter on the backend
        // For now, we'll just reload the admin dashboard
        loadAdminDashboard();
    }

    function searchAdminContent(query) {
        // This would normally search on the backend
        showNotification('Search functionality coming soon!', 'info');
    }

    // ===============================
    // INITIALIZATION
    // ===============================
    
    async function init() {
        console.log('Initializing Go Trip Professional System...');
        
        // Hide loading overlay
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
                showNotification('Welcome to Go Trip! Book your Rwanda adventure today.', 'info');
            }
        }, 1000);
        
        console.log('Go Trip Professional System initialized successfully');
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
    window.showServiceSelectionModal = showServiceSelectionModal;
    window.showEnhancedBookingModal = showEnhancedBookingModal;
    window.showTripPlanModal = showTripPlanModal;
    window.viewBookingDetails = viewBookingDetails;
    window.cancelBooking = cancelBooking;
    window.confirmBooking = confirmBooking;
    window.downloadBookingInvoice = downloadBookingInvoice;
    window.viewTripPlan = viewTripPlan;
    window.cancelTripPlan = cancelTripPlan;
    window.processTripPlan = processTripPlan;

    // Initialize when DOM is ready
    domReady(() => {
        setTimeout(init, 100);
    });
})();