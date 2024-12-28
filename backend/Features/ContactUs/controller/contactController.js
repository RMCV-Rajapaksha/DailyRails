const ContactMessage = require('../models/ContactMessage');

// Add a new contact message
exports.addContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  const contactMessage = new ContactMessage({
    name,
    email,
    message,
  });

  try {
    const newMessage = await contactMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all contact messages (for admin viewing)
exports.getContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a message
exports.deleteContactMessage = async (req, res) => {
  const { id } = req.params;

  try {
    await ContactMessage.findByIdAndDelete(id);
    res.status(200).json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
