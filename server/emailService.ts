// This file handles email-related functionality
// Currently implementing a console-based approach for development
// In production, this would be replaced with SendGrid or another email service

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
}

/**
 * Development mode email service
 * Logs emails to console instead of actually sending them
 */
export class DevEmailService {
  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      console.log('\n-------------------------');
      console.log('📧 EMAIL WOULD BE SENT:');
      console.log('-------------------------');
      console.log(`To: ${options.to}`);
      console.log(`From: ${options.from || 'noreply@personalitymosaic.com'}`);
      console.log(`Subject: ${options.subject}`);
      console.log('-------------------------');
      console.log('Body:');
      console.log(options.text || options.html);
      console.log('-------------------------\n');
      
      // Return true to simulate successful email sending
      return true;
    } catch (error) {
      console.error('Error in dev email service:', error);
      return false;
    }
  }
}

// Export a singleton instance
export const emailService = new DevEmailService();