// DASHBOARD SYSTEM
class Dashboard {
    constructor() {
        this.config = window.config || {
            baseUrl: 'http://localhost:3000/api',
            endpoints: {
                userDashboard: '/dashboard/user',
                adminDashboard: '/dashboard/admin',
                userBookings: '/dashboard/user/bookings',
                allUsers: '/dashboard/admin/users',
                allBookings: '/dashboard/admin/bookings',
                updateProfile: '/dashboard/user/profile',
                cancelBooking: '/dashboard/bookings'
            }
        };
        
        this.currentUser = null;
        this.currentTab = 'overview';
    }
    
    async init() {
        await this.checkAuth();
        if (window.location.hash === '#dashboard' || window.location.hash === '#admin') {
            this.loadDashboard();
        }
    }
    
    async checkAuth() {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        
        if (!token || !userData) {
            return;
        }
        
        this.currentUser = JSON.parse(userData);
    }
    
    async loadDashboard() {
        if (window.location.hash === '#admin') {
            if (this.currentUser?.role === 'admin') {
                await this.loadAdminDashboard();
            }
        } else if (window.location.hash === '#dashboard') {
            await this.loadUserDashboard();
        }
    }
    
    async loadUserDashboard() {
        try {
            const response = await this.apiRequest(this.config.endpoints.userDashboard);
            
            if (response.success) {
                this.renderUserDashboard(response.data);
            }
        } catch (error) {
            console.error('Error loading dashboard:', error);
        }
    }
    
    async loadUserBookings() {
        try {
            const response = await this.apiRequest(this.config.endpoints.userBookings);
            
            if (response.success) {
                this.renderUserBookings(response.data);
            }
        } catch (error) {
            console.error('Error loading bookings:', error);
        }
    }
    
    async loadAdminDashboard() {
        try {
            const response = await this.apiRequest(this.config.endpoints.adminDashboard);
            
            if (response.success) {
                this.renderAdminDashboard(response.data);
            }
        } catch (error) {
            console.error('Error loading admin dashboard:', error);
        }
    }
    
    renderUserDashboard(data) {
        const container = document.querySelector('#dashboard .dashboard');
        if (!container) return;
        
        container.innerHTML = `
            <div class="dashboard-header">
                <div class="container">
                    <h1>Welcome back, ${this.currentUser.name}!</h1>
                    <p>Manage your bookings, profile, and travel plans</p>
                </div>
            </div>
            
            <div class="container">
                <div class="dashboard-grid">
                    <div class="dashboard-sidebar">
                        <div class="dashboard-user-profile">
                            <div class="dashboard-user-avatar-large">
                                <i class="fas fa-user"></i>
                            </div>
                            <h3 class="dashboard-user-name">${this.currentUser.name}</h3>
                            <p class="dashboard-user-email">${this.currentUser.email}</p>
                            <p class="user-role">${this.currentUser.role.toUpperCase()}</p>
                        </div>
                        
                        <ul class="dashboard-nav">
                            <li>
                                <a href="#" class="dashboard-tab-link active" data-tab="overview">
                                    <i class="fas fa-tachometer-alt"></i>
                                    Overview
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dashboard-tab-link" data-tab="bookings">
                                    <i class="fas fa-calendar-check"></i>
                                    My Bookings
                                </a>
                            </li>
                            <li>
                                <a href="#" class="dashboard-tab-link" data-tab="trip-plans">
                                    <i class="fas fa-route"></i>
                                    Trip Plans
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
                        </div>
                    </div>
                    
                    <div class="dashboard-content">
                        <div id="dashboard-overview" class="dashboard-tab-container active">
                            <div class="dashboard-stats">
                                <div class="dashboard-stat-card">
                                    <div class="dashboard-stat-icon bookings">
                                        <i class="fas fa-calendar-alt"></i>
                                    </div>
                                    <div class="dashboard-stat-content">
                                        <h3>Total Bookings</h3>
                                        <p class="dashboard-stat-number">${data.stats?.totalBookings || 0}</p>
                                    </div>
                                </div>
                                
                                <div class="dashboard-stat-card">
                                    <div class="dashboard-stat-icon pending">
                                        <i class="fas fa-clock"></i>
                                    </div>
                                    <div class="dashboard-stat-content">
                                        <h3>Upcoming</h3>
                                        <p class="dashboard-stat-number">${data.stats?.upcomingBookings || 0}</p>
                                    </div>
                                </div>
                                
                                <div class="dashboard-stat-card">
                                    <div class="dashboard-stat-icon revenue">
                                        <i class="fas fa-check-circle"></i>
                                    </div>
                                    <div class="dashboard-stat-content">
                                        <h3>Completed</h3>
                                        <p class="dashboard-stat-number">${data.stats?.completedBookings || 0}</p>
                                    </div>
                                </div>
                                
                                <div class="dashboard-stat-card">
                                    <div class="dashboard-stat-icon users">
                                        <i class="fas fa-wallet"></i>
                                    </div>
                                    <div class="dashboard-stat-content">
                                        <h3>Total Spent</h3>
                                        <p class="dashboard-stat-number">$${data.stats?.totalSpent?.[0]?.total || 0}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div class="recent-section">
                                <h3>Recent Bookings</h3>
                                <div id="dashboard-recent-bookings" class="dashboard-booking-cards">
                                    ${this.renderRecentBookings(data.recentBookings || [])}
                                </div>
                            </div>
                        </div>
                        
                        <div id="dashboard-bookings" class="dashboard-tab-container">
                            <div class="tab-header">
                                <h2>My Bookings</h2>
                                <div class="tab-filters">
                                    <select id="dashboard-booking-filter" class="form-select">
                                        <option value="">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="confirmed">Confirmed</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </div>
                            </div>
                            <div id="dashboard-bookings-list" class="dashboard-booking-cards">
                                <!-- Bookings will be loaded here -->
                            </div>
                        </div>
                        
                        <div id="dashboard-trip-plans" class="dashboard-tab-container">
                            <div class="tab-header">
                                <h2>My Trip Plans</h2>
                            </div>
                            <div id="dashboard-trip-plans-list">
                                <div class="dashboard-empty-state">
                                    <i class="fas fa-route fa-3x"></i>
                                    <h3>No trip plans yet</h3>
                                    <p>Plan your perfect Rwanda adventure!</p>
                                    <button class="btn btn-primary plan-trip-btn">
                                        <i class="fas fa-plus"></i> Create Trip Plan
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <div id="dashboard-profile" class="dashboard-tab-container">
                            <div class="tab-header">
                                <h2>Profile Settings</h2>
                            </div>
                            <form id="dashboard-profile-form" class="dashboard-form-grid">
                                <div class="dashboard-form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" value="${this.currentUser.name}" required>
                                </div>
                                
                                <div class="dashboard-form-group">
                                    <label>Email</label>
                                    <input type="email" value="${this.currentUser.email}" disabled>
                                    <small class="text-muted">Email cannot be changed</small>
                                </div>
                                
                                <div class="dashboard-form-group">
                                    <label>Phone Number</label>
                                    <input type="tel" name="phone" value="${this.currentUser.phone || ''}">
                                </div>
                                
                                <div class="dashboard-form-group">
                                    <label>Country</label>
                                    <input type="text" name="country" value="${this.currentUser.country || ''}">
                                </div>
                                
                                <div class="form-actions">
                                    <button type="submit" class="btn btn-primary">Update Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.setupDashboardTabListeners();
        this.setupDashboardEventListeners();
        this.loadUserBookings();
    }
    
    renderAdminDashboard(data) {
        const container = document.querySelector('#admin .admin-dashboard');
        if (!container) return;
        
        container.innerHTML = `
            <div class="dashboard-header">
                <div class="container">
                    <h1>Admin Dashboard</h1>
                    <p>Manage users, bookings, revenue, and system activity</p>
                </div>
            </div>
            
            <div class="container">
                <div class="dashboard-stats">
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon users">
                            <i class="fas fa-users"></i>
                        </div>
                        <div class="dashboard-stat-content">
                            <h3>Total Users</h3>
                            <p class="dashboard-stat-number">${data.stats?.totalUsers || 0}</p>
                        </div>
                    </div>
                    
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon bookings">
                            <i class="fas fa-calendar-alt"></i>
                        </div>
                        <div class="dashboard-stat-content">
                            <h3>Total Bookings</h3>
                            <p class="dashboard-stat-number">${data.stats?.totalBookings || 0}</p>
                        </div>
                    </div>
                    
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon revenue">
                            <i class="fas fa-dollar-sign"></i>
                        </div>
                        <div class="dashboard-stat-content">
                            <h3>Total Revenue</h3>
                            <p class="dashboard-stat-number">$${data.stats?.totalRevenue || 0}</p>
                        </div>
                    </div>
                    
                    <div class="dashboard-stat-card">
                        <div class="dashboard-stat-icon pending">
                            <i class="fas fa-clock"></i>
                        </div>
                        <div class="dashboard-stat-content">
                            <h3>Active Bookings</h3>
                            <p class="dashboard-stat-number">${data.stats?.activeBookings || 0}</p>
                        </div>
                    </div>
                </div>
                
                <div class="admin-table-container">
                    <h3>Recent Bookings</h3>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>User</th>
                                <th>Service</th>
                                <th>Date</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderAdminRecentBookings(data.recentBookings || [])}
                        </tbody>
                    </table>
                </div>
                
                <div class="admin-table-container mt-4">
                    <h3>Recent Users</h3>
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Joined</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${this.renderAdminRecentUsers(data.recentUsers || [])}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    renderUserBookings(bookings) {
        const container = document.getElementById('dashboard-bookings-list');
        if (!container) return;
        
        if (bookings.length === 0) {
            container.innerHTML = `
                <div class="dashboard-empty-state">
                    <i class="fas fa-calendar-times fa-3x"></i>
                    <h3>No bookings yet</h3>
                    <p>Start exploring and book your next adventure!</p>
                    <button class="btn btn-primary" id="dashboard-explore-btn">
                        Explore Services
                    </button>
                </div>
            `;
            return;
        }
        
        container.innerHTML = bookings.map(booking => `
            <div class="dashboard-booking-card">
                <div class="dashboard-booking-header">
                    <h4 class="dashboard-booking-title">${booking.serviceName}</h4>
                    <span class="dashboard-booking-status dashboard-status-${booking.status}">
                        ${booking.status.toUpperCase()}
                    </span>
                </div>
                
                <div class="dashboard-booking-details">
                    <p><i class="far fa-calendar"></i> ${new Date(booking.date).toLocaleDateString()}</p>
                    <p><i class="far fa-clock"></i> ${booking.duration} day(s)</p>
                    <p><i class="fas fa-users"></i> ${booking.travelers} traveler(s)</p>
                    <p><i class="fas fa-tag"></i> ${booking.serviceType}</p>
                    <p><i class="fas fa-dollar-sign"></i> $${booking.totalAmount || '0'}</p>
                </div>
                
                <div class="dashboard-booking-actions">
                    <button class="btn btn-sm btn-primary" onclick="dashboard.viewBooking('${booking._id}')">
                        View Details
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    renderRecentBookings(bookings) {
        if (bookings.length === 0) {
            return `
                <div class="dashboard-empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No recent bookings</p>
                </div>
            `;
        }
        
        return bookings.slice(0, 3).map(booking => `
            <div class="dashboard-booking-card">
                <div class="dashboard-booking-header">
                    <h4 class="dashboard-booking-title">${booking.service_name}</h4>
                    <span class="dashboard-booking-status dashboard-status-${booking.status}">
                        ${booking.status.toUpperCase()}
                    </span>
                </div>
                <div class="dashboard-booking-details">
                    <p><i class="fas fa-hashtag"></i> ${booking.booking_reference}</p>
                    <p><i class="far fa-calendar"></i> ${new Date(booking.date).toLocaleDateString()}</p>
                </div>
            </div>
        `).join('');
    }
    
    renderAdminRecentBookings(bookings) {
        if (bookings.length === 0) {
            return `<tr><td colspan="6" class="text-center">No recent bookings</td></tr>`;
        }
        
        return bookings.slice(0, 5).map(booking => `
            <tr>
                <td>${booking.booking_reference || 'N/A'}</td>
                <td>${booking.user?.name || 'N/A'}</td>
                <td>${booking.service_name || 'N/A'}</td>
                <td>${new Date(booking.date).toLocaleDateString()}</td>
                <td>$${booking.totalAmount || 0}</td>
                <td><span class="dashboard-badge dashboard-status-${booking.status}">${booking.status?.toUpperCase()}</span></td>
            </tr>
        `).join('');
    }
    
    renderAdminRecentUsers(users) {
        if (users.length === 0) {
            return `<tr><td colspan="5" class="text-center">No recent users</td></tr>`;
        }
        
        return users.slice(0, 5).map(user => `
            <tr>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td><span class="dashboard-badge dashboard-badge-info">${user.role?.toUpperCase()}</span></td>
                <td>${new Date(user.createdAt).toLocaleDateString()}</td>
                <td><span class="dashboard-badge dashboard-badge-success">ACTIVE</span></td>
            </tr>
        `).join('');
    }
    
    setupDashboardTabListeners() {
        const tabLinks = document.querySelectorAll('.dashboard-tab-link');
        const tabContainers = document.querySelectorAll('.dashboard-tab-container');
        
        tabLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Remove active class from all tabs
                tabLinks.forEach(l => l.classList.remove('active'));
                tabContainers.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab
                link.classList.add('active');
                const tabId = 'dashboard-' + link.dataset.tab;
                document.getElementById(tabId).classList.add('active');
                
                // Load content for tab if needed
                if (link.dataset.tab === 'bookings') {
                    this.loadUserBookings();
                }
            });
        });
    }
    
    setupDashboardEventListeners() {
        // New booking button
        const newBookingBtn = document.getElementById('dashboard-new-booking-btn');
        if (newBookingBtn) {
            newBookingBtn.addEventListener('click', () => {
                window.showPage('destinations');
            });
        }
        
        // Explore button
        const exploreBtn = document.getElementById('dashboard-explore-btn');
        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                window.showPage('destinations');
            });
        }
        
        // Plan trip button in dashboard
        const planTripBtn = document.querySelector('#dashboard-trip-plans .plan-trip-btn');
        if (planTripBtn) {
            planTripBtn.addEventListener('click', () => {
                window.showTripPlanModal();
            });
        }
        
        // Profile form
        const profileForm = document.getElementById('dashboard-profile-form');
        if (profileForm) {
            profileForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                await this.updateProfile(new FormData(profileForm));
            });
        }
        
        // Booking filter
        const bookingFilter = document.getElementById('dashboard-booking-filter');
        if (bookingFilter) {
            bookingFilter.addEventListener('change', (e) => {
                this.loadUserBookings();
            });
        }
    }
    
    async updateProfile(formData) {
        try {
            const data = Object.fromEntries(formData.entries());
            
            const response = await this.apiRequest(this.config.endpoints.updateProfile, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
            
            if (response.success) {
                window.showNotification('Profile updated successfully', 'success');
                localStorage.setItem('userData', JSON.stringify(response.data));
                this.currentUser = response.data;
            }
        } catch (error) {
            window.showNotification('Error updating profile', 'error');
        }
    }
    
    viewBooking(bookingId) {
        window.showNotification('Viewing booking details', 'info');
        // You can implement a modal to show booking details here
    }
    
    async apiRequest(endpoint, options = {}) {
        if (typeof window.apiRequest === 'function') {
            return window.apiRequest(endpoint, options);
        }
        
        // Fallback if window.apiRequest is not available
        const token = localStorage.getItem('authToken');
        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };
        
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        
        try {
            const response = await fetch(`${this.config.baseUrl}${endpoint}`, {
                ...options,
                headers
            });
            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            return { success: false, message: error.message };
        }
    }
}

// Initialize dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new Dashboard();
    window.dashboard.init();
    
    // Listen for hash changes to load dashboard when navigated to
    window.addEventListener('hashchange', () => {
        if (window.location.hash === '#dashboard' || window.location.hash === '#admin') {
            window.dashboard.init();
        }
    });
});