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
    const { trainName, class: trainClass, date } = trainDetails;
    const { Name, Email } = user;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: Email,
      subject: `Your Seat Booking Confirmation for ${trainName}`,
      text: `Hello ${Name},
  
  Thank you for booking with us!
  
  Here are your booking details:
  
  Train: ${trainName}
  Class: ${trainClass}
  Date: ${date}
  Seats: ${seats.join(", ")}
  Total Amount: $${amount}
  
  We hope you have a comfortable journey!
  
  Best regards,
  Your Booking Team`,
      html: `
          <h1>Your Booking Confirmation</h1>
          <p>Thank you for booking with us, ${Name}!</p>
          <h2>Booking Details:</h2>
          <ul>
            <li><strong>Train:</strong> ${trainName}</li>
            <li><strong>Class:</strong> ${trainClass}</li>
            <li><strong>Date:</strong> ${date}</li>
            <li><strong>Seats:</strong> ${seats.join(", ")}</li>
            <li><strong>Total Amount:</strong> $${amount}</li>
          </ul>
          <p>We hope you have a comfortable journey!</p>
          <p>Best regards,</p>
          <p>Your Booking Team</p>
        `,
    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log("Booking confirmation email sent successfully");
    } catch (error) {
      console.error("Error sending booking confirmation email:", error);
    }
  };
  
module.exports = {
  sendEmail,
  sendBookingEmail,
};
