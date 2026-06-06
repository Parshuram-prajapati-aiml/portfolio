import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
// Get your credentials from: https://dashboard.emailjs.com/
const SERVICE_ID = 'service_n6ug863';
const TEMPLATE_ID = 'template_1957699';
const PUBLIC_KEY = 'PmSySh42nbW02oCEG';

emailjs.init(PUBLIC_KEY);

/**
 * Send email using EmailJS
 * @param {Object} formData - Object containing name, email, and message
 * @returns {Promise} - Returns promise that resolves when email is sent
 */
export const sendEmail = async (formData) => {
  try {
    // Prepare template parameters for the redesigned EmailJS template
    const templateParams = {
      to_email: 'your-email@example.com', // Your email to receive notifications
      name: formData.name,
      email: formData.email || 'no-reply@portfolio.com',
      message: formData.message,
      reply_to: formData.email || 'no-reply@portfolio.com',
      time: new Date().toLocaleString(),
      title: 'Portfolio Inquiry',
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Send notification email (optional - for system notifications)
 * @param {Object} notificationData - Notification details
 */
export const sendNotification = async (notificationData) => {
  try {
    const templateParams = {
      subject: notificationData.subject,
      message: notificationData.message,
      timestamp: new Date().toLocaleString(),
    };

    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams
    );
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
