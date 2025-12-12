import Contact from '../models/Contact.js';
import logger from '../utils/logger.js';

// Submit contact form (public)
export const submitContactForm = async (req, res, next) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: contact });
  } catch (error) {
    logger.error(`Error submitting contact form: ${error.message}`);
    next(error);
  }
};

// Get all contacts (admin)
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json({ success: true, data: contacts });
  } catch (error) {
    logger.error(`Error fetching all contact forms: ${error.message}`);
    next(error);
  }
};

// Get contact by ID (admin)
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.json({ success: true, data: contact });
  } catch (error) {
    logger.error(`Error fetching contact: ${error.message}`);
    next(error);
  }
};

// Delete contact (admin)
export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.json({ success: true, message: "Contact deleted" });
  } catch (error) {
    logger.error(`Error deleting contact: ${error.message}`);
    next(error);
  }
};