import Newsletter from '../models/Newsletter.js';
import logger from '../utils/logger.js';

export const getStats = async (req, res, next) => {
  try {
    const total = await Newsletter.countDocuments();
    const sent = await Newsletter.countDocuments({ sent: true });
    res.json({ success: true, data: { total, sent } });
  } catch (error) {
    logger.error(`Error getting newsletter stats: ${error.message}`);
    next(error);
  }
};

export const broadcast = async (req, res, next) => {
  try {
    const { subject, content } = req.body;
    // Send emails logic here
    res.json({ success: true, message: 'Newsletter broadcasted successfully' });
  } catch (error) {
    logger.error(`Error broadcasting newsletter: ${error.message}`);
    next(error);
  }
};

export default { getStats, broadcast };