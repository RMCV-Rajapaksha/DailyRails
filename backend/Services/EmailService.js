const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async (userData) => {
  const { Name, Email, Password, JobTitle, EmployeeID } = userData;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: Email,
    subject: `Welcome, ${Name}!`,
    text: `Hello ${Name},
  
  Welcome to the company! Here are your details:
  
  Employee ID: ${EmployeeID}
  Job Title: ${JobTitle}
  
  Please reach out if you have any questions.
  
  Best regards,
  Your Team`,
    html: `
        <h1>Welcome, ${Name}!</h1>
        <p>We're excited to have you join us as a <strong>${JobTitle}</strong>.</p>
        <h2>Your Details:</h2>
        <ul>
          <li><strong>Employee ID:</strong> ${EmployeeID}</li>
          <li><strong>Job Title:</strong> ${JobTitle}</li>
           <li><strong>Job Title:</strong> ${Email}</li>
          <li><strong>Job Title:</strong> ${Password}</li>
        </ul>
        <p>If you have any questions, feel free to reach out.</p>
        <p>Best regards,</p>
        <p>Your Team</p>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
const sendBookingEmail = async (bookingData) => {
  const { amount, trainDetails, seats, user } = bookingData;
  const { trainName, class: trainClass, date, time } = trainDetails;
  const { Name, Email } = user;

  // Format date and time more professionally
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = new Date(`2000-01-01T${time}`).toLocaleTimeString(
    "en-US",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: Email,
    subject: `Booking Confirmation - ${trainName} | Reference: ${generateBookingReference()}`,
    text: `
Dear ${Name},

Thank you for choosing our railway service! We're delighted to confirm your booking.

BOOKING DETAILS
--------------
Booking Reference: ${generateBookingReference()}
Train: ${trainName}
Class: ${trainClass}
Date: ${formattedDate}
Departure Time: ${formattedTime}
Seat(s): ${seats.join(", ")}
Total Amount: $${amount.toFixed(2)}

IMPORTANT INFORMATION
-------------------
- Please arrive at least 30 minutes before departure
- Keep this confirmation handy during your journey
- Valid ID is required for all passengers

For any queries, please contact our 24/7 customer service:
Phone: 1-800-RAILWAY
Email: support@railway.com

We wish you a pleasant journey!

Best regards,
The Railway Team
    `,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background-color: #1a365d;
              color: white;
              padding: 20px;
              text-align: center;
              border-radius: 5px 5px 0 0;
            }
            .booking-details {
              background-color: #f8fafc;
              padding: 20px;
              border: 1px solid #e2e8f0;
              border-radius: 5px;
              margin: 20px 0;
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #e2e8f0;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .important-info {
              background-color: #fff7ed;
              padding: 20px;
              border-left: 4px solid #f97316;
              margin: 20px 0;
            }
            .footer {
              text-align: center;
              padding: 20px;
              background-color: #f1f5f9;
              border-radius: 0 0 5px 5px;
            }
            .button {
              background-color: #1a365d;
              color: white;
              padding: 12px 24px;
              text-decoration: none;
              border-radius: 5px;
              display: inline-block;
              margin: 20px 0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Booking Confirmation</h1>
              <p>Thank you for choosing our railway service!</p>
            </div>

            <div class="booking-details">
              <h2>Booking Details</h2>
              <div class="detail-row">
                <strong>Booking Reference:</strong>
                <span>${generateBookingReference()}</span>
              </div>
              <div class="detail-row">
                <strong>Train:</strong>
                <span>${trainName}</span>
              </div>
              <div class="detail-row">
                <strong>Class:</strong>
                <span>${trainClass}</span>
              </div>
              <div class="detail-row">
                <strong>Date:</strong>
                <span>${formattedDate}</span>
              </div>
              <div class="detail-row">
                <strong>Departure Time:</strong>
                <span>${formattedTime}</span>
              </div>
              <div class="detail-row">
                <strong>Seat(s):</strong>
                <span>${seats.join(", ")}</span>
              </div>
              <div class="detail-row">
                <strong>Total Amount:</strong>
                <span>$${amount.toFixed(2)}</span>
              </div>
            </div>

            <div class="important-info">
              <h3>Important Information</h3>
              <ul>
                <li>Please arrive at least 30 minutes before departure</li>
                <li>Keep this confirmation handy during your journey</li>
                <li>Valid ID is required for all passengers</li>
              </ul>
            </div>

            <a href="https://railway.com/manage-booking" class="button">
              Manage Your Booking
            </a>

            <p>
              For any queries, please contact our 24/7 customer service:<br>
              Phone: 1-800-RAILWAY<br>
              Email: support@railway.com
            </p>

            <div class="footer">
              <p>We wish you a pleasant journey!</p>
              <p>Best regards,<br>The Railway Team</p>
            </div>
          </div>
        </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Booking confirmation email sent successfully");
  } catch (error) {
    console.error("Error sending booking confirmation email:", error);
    throw error;
  }
};

// Helper function to generate a booking reference
const generateBookingReference = () => {
  return "BK-" + Math.random().toString(36).substring(2, 8).toUpperCase();
};
module.exports = {
  sendEmail,
  sendBookingEmail,
};
