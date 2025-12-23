// emails/templates.js

// Welcome email for new users
exports.welcome = (name) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Welcome to GoTrip, ${name}!</h2>
    <p>Thank you for signing up. Explore the Land of a Thousand Hills and plan your unforgettable adventure in Rwanda.</p>
    <p>Start planning your trip: <a href="https://gotrip.africa">GoTrip Website</a></p>
    <hr>
    <p>GoTrip Team</p>
  </div>
`;

// Password reset email
exports.resetPassword = (name, link) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Password Reset Request</h2>
    <p>Hi ${name},</p>
    <p>We received a request to reset your password. Click the link below to proceed (valid for 15 minutes):</p>
    <p><a href="${link}" style="background-color:#007bff;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Reset Password</a></p>
    <p>If you did not request this, you can safely ignore this email.</p>
    <hr>
    <p>GoTrip Team</p>
  </div>
`;

// Trip planning submission notification to admin
exports.tripBookingAdmin = (trip) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>New Trip Request Submitted</h2>
    <p><strong>Name:</strong> ${trip.name}</p>
    <p><strong>Email:</strong> ${trip.email}</p>
    <p><strong>Phone:</strong> ${trip.phone}</p>
    <p><strong>Destination:</strong> ${trip.destination}</p>
    <p><strong>Arrival:</strong> ${trip.arrival}</p>
    <p><strong>Departure:</strong> ${trip.departure}</p>
    <p><strong>Travelers:</strong> ${trip.travelers}</p>
    <p><strong>Services:</strong> ${trip.services.join(', ')}</p>
    <p><strong>Budget:</strong> ${trip.budget || 'Not specified'}</p>
    <p><strong>Comments:</strong> ${trip.comments || 'None'}</p>
    <hr>
    <p>Check the admin dashboard for details.</p>
  </div>
`;

// Tour guide booking email (to admin)
exports.guideBookingAdmin = (booking) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>New Tour Guide Booking</h2>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Tour Date:</strong> ${booking.tourDate}</p>
    <p><strong>Duration:</strong> ${booking.duration} hours</p>
    <p><strong>Group Size:</strong> ${booking.groupSize}</p>
    <p><strong>Language:</strong> ${booking.language}</p>
    <p><strong>Special Requests:</strong> ${booking.specialRequests || 'None'}</p>
    <hr>
    <p>Check the admin dashboard for more details.</p>
  </div>
`;

// Translator hiring email (to admin)
exports.translatorBookingAdmin = (booking) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>New Translator Service Request</h2>
    <p><strong>Name:</strong> ${booking.name}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Service Date:</strong> ${booking.serviceDate}</p>
    <p><strong>Service Type:</strong> ${booking.serviceType}</p>
    <p><strong>Duration:</strong> ${booking.duration} hours</p>
    <p><strong>Location:</strong> ${booking.location || 'Not specified'}</p>
    <p><strong>Additional Details:</strong> ${booking.details || 'None'}</p>
    <hr>
    <p>Check the admin dashboard for more details.</p>
  </div>
`;

// Accommodation booking email (to admin)
exports.accommodationBookingAdmin = (booking) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>New Accommodation Booking</h2>
    <p><strong>Guest Name:</strong> ${booking.guestName}</p>
    <p><strong>Email:</strong> ${booking.email}</p>
    <p><strong>Check-in:</strong> ${booking.checkin}</p>
    <p><strong>Check-out:</strong> ${booking.checkout}</p>
    <p><strong>Guests:</strong> ${booking.guests}</p>
    <p><strong>Rooms:</strong> ${booking.rooms || 1}</p>
    <p><strong>Room Type:</strong> ${booking.roomType || 'Standard'}</p>
    <p><strong>Special Requests:</strong> ${booking.specialRequests || 'None'}</p>
    <hr>
    <p>Check the admin dashboard for more details.</p>
  </div>
`;

// Newsletter subscription confirmation (to user)
exports.newsletterConfirmation = (email) => `
  <div style="font-family: Arial, sans-serif; color: #333;">
    <h2>Newsletter Subscription Confirmed</h2>
    <p>Hi ${email},</p>
    <p>Thank you for subscribing to the GoTrip newsletter. You will now receive weekly updates, travel tips, and special offers.</p>
    <hr>
    <p>GoTrip Team</p>
  </div>
`;