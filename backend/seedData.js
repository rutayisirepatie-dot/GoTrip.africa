import mongoose from 'mongoose';
import {
    User,
    Guide,
    Translator,
    Destination,
    Accommodation,
    Blog,
    Booking,
    TripPlan
} from './models/index.js';

const seedData = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Guide.deleteMany({});
        await Translator.deleteMany({});
        await Destination.deleteMany({});
        await Accommodation.deleteMany({});
        await Blog.deleteMany({});
        await Booking.deleteMany({});
        await TripPlan.deleteMany({});

        console.log('Cleared existing data');

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@gotrip.africa',
            password: 'admin123',
            phone: '+250 787 407 051',
            country: 'Rwanda',
            role: 'admin',
            status: 'active'
        });

        // Create regular user
        const regularUser = await User.create({
            name: 'Test Customer',
            email: 'customer@example.com',
            password: 'customer123',
            phone: '+250 788 123 456',
            country: 'USA',
            role: 'user',
            status: 'active'
        });

        console.log('Created users');

        // Seed guides data
        const guides = [
            {
                name: "Jean Claude N.",
                specialty: "Gorilla Trekking Expert",
                languages: ["English", "French", "Swahili"],
                experience: "8 years experience",
                rating: 4.9,
                price: "$150/day",
                dailyRate: 180,
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                certifications: ["Wildlife First Aid", "CPR Certified"],
                experienceYears: 8,
                available: true,
                description: "Expert guide specializing in gorilla trekking with extensive knowledge of Volcanoes National Park."
            },
            // Add more guides from your mock data...
        ];

        await Guide.insertMany(guides);
        console.log('Seeded guides');

        // Seed translators data
        const translators = [
            {
                name: "Patience Rutayisire",
                languages: ["English", "German", "Spanish", "French", "Swahili", "Chinese", "Kinyarwanda"],
                specialty: "Tourism & Business Translation",
                rating: 4.9,
                price: "$140/day",
                dailyRate: 140,
                image: "./images/Patie.png",
                experience: "5 years experience",
                certifications: ["Certified Translator", "Tourism Diploma", "Business Communication"],
                experienceYears: 5,
                available: true,
                description: "Professional translator specializing in tourism and business communications."
            },
            // Add more translators...
        ];

        await Translator.insertMany(translators);
        console.log('Seeded translators');

        // Seed destinations data
        const destinations = [
            {
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
            // Add more destinations...
        ];

        await Destination.insertMany(destinations);
        console.log('Seeded destinations');

        // Seed accommodations data
        const accommodations = [
            {
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
            // Add more accommodations...
        ];

        await Accommodation.insertMany(accommodations);
        console.log('Seeded accommodations');

        // Seed blog data
        const blogs = [
            {
                title: "Complete Guide to Gorilla Trekking in Rwanda",
                excerpt: "Everything you need to know about mountain gorilla trekking in Volcanoes National Park, including permits, preparation, and what to expect.",
                content: "Full article content here...",
                date: "May 15, 2024",
                category: "Adventure",
                image: "./images/gorilla-trekk-rwanda.jpg",
                readTime: "8 min read",
                author: "Jean Claude",
                tags: ["Gorilla Trekking", "Wildlife", "Adventure", "Rwanda"],
                views: 1250
            },
            // Add more blogs...
        ];

        await Blog.insertMany(blogs);
        console.log('Seeded blog posts');

        // Create sample bookings
        const bookings = [
            {
                user: regularUser._id,
                userName: regularUser.name,
                userEmail: regularUser.email,
                serviceType: 'destination',
                serviceName: 'Volcanoes National Park',
                bookingReference: 'BOOK-001',
                date: new Date(Date.now() + 86400000 * 7),
                duration: 3,
                travelers: 2,
                totalAmount: 1500,
                status: 'confirmed',
                paymentStatus: 'paid',
                notes: 'Looking forward to gorilla trekking'
            },
            {
                user: regularUser._id,
                userName: regularUser.name,
                userEmail: regularUser.email,
                serviceType: 'guide',
                serviceName: 'Jean Claude N.',
                bookingReference: 'BOOK-002',
                date: new Date(Date.now() + 86400000 * 5),
                duration: 2,
                travelers: 4,
                totalAmount: 360,
                status: 'pending',
                paymentStatus: 'pending',
                notes: 'Need a gorilla trekking expert'
            }
        ];

        await Booking.insertMany(bookings);
        console.log('Seeded bookings');

        // Create sample trip plans
        const tripPlans = [
            {
                user: regularUser._id,
                userName: regularUser.name,
                userEmail: regularUser.email,
                tripReference: 'TRIP-001',
                startDate: new Date(Date.now() + 86400000 * 14),
                duration: '6-8 days',
                travelers: 3,
                budget: 'midrange',
                interests: ['gorilla', 'culture', 'hiking'],
                message: 'Looking for a family adventure with gorilla trekking and cultural experiences',
                status: 'review'
            }
        ];

        await TripPlan.insertMany(tripPlans);
        console.log('Seeded trip plans');

        console.log('Database seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

// Run seeding if called directly
if (process.argv[2] === '--seed') {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => seedData())
        .catch(error => {
            console.error('Database connection error:', error);
            process.exit(1);
        });
}

export default seedData;