/**
 * Data Protection and Privacy Compliance Module
 * This module implements GDPR and similar data protection regulation compliance features
 */

import { pool } from './db';

/**
 * Function to allow users to download all their personal data (GDPR data portability)
 * @param userId - The ID of the user requesting their data
 * @returns JSON object with all user data
 */
export async function exportUserData(userId: string): Promise<any> {
  try {
    // Get user profile data
    const userResult = await pool.query(
      `SELECT 
        id, username, email, first_name, last_name, email_verified, 
        created_at, updated_at, profile_image_url
      FROM users 
      WHERE id = $1`,
      [userId]
    );
    
    if (userResult.rows.length === 0) {
      throw new Error('User not found');
    }
    
    const userData = userResult.rows[0];
    
    // Get user's assessment results
    const assessmentResults = await pool.query(
      `SELECT id, timestamp, result_data, personality_type, personality_subtype
      FROM assessment_results
      WHERE user_id = $1
      ORDER BY timestamp DESC`,
      [userId]
    );
    
    // Combine all data into a single export object
    const exportData = {
      user: userData,
      assessments: assessmentResults.rows,
      exportDate: new Date().toISOString(),
      dataProtectionPolicy: {
        version: '1.0',
        company: 'Personality Mosaic',
        contact: 'privacy@personalitymosaic.example.com',
        lastUpdated: '2025-05-20'
      }
    };
    
    // Log the data export for audit purposes
    console.log(`[DATA-PROTECTION] Data export requested for user: ${userId}`);
    
    return exportData;
  } catch (error) {
    console.error('Error exporting user data:', error);
    throw error;
  }
}

/**
 * Function to delete all user data (GDPR right to be forgotten)
 * @param userId - The ID of the user to be deleted
 * @returns Success status
 */
export async function deleteUserData(userId: string): Promise<boolean> {
  const client = await pool.connect();
  
  try {
    // Start transaction for atomicity
    await client.query('BEGIN');
    
    // Record the deletion request for audit trail (anonymized)
    await client.query(
      `INSERT INTO data_deletion_logs (user_id, request_date, request_ip, status)
      VALUES ($1, NOW(), 'anonymized', 'completed')`,
      [userId]
    );
    
    // Delete assessment results
    await client.query(
      'DELETE FROM assessment_results WHERE user_id = $1',
      [userId]
    );
    
    // Finally delete or anonymize the user record
    // Option 1: Complete deletion
    await client.query('DELETE FROM users WHERE id = $1', [userId]);
    
    // Option 2 (alternate): Anonymization to maintain referential integrity
    // await client.query(
    //   `UPDATE users SET 
    //     email = 'deleted_' || $1 || '@example.com',
    //     username = 'deleted_user_' || $1,
    //     password = NULL,
    //     first_name = NULL,
    //     last_name = NULL,
    //     profile_image_url = NULL,
    //     is_deleted = TRUE,
    //     deleted_at = NOW()
    //   WHERE id = $1`,
    //   [userId]
    // );
    
    // Commit the transaction
    await client.query('COMMIT');
    
    // Log the data deletion for audit purposes
    console.log(`[DATA-PROTECTION] User data deletion completed for user: ${userId}`);
    
    return true;
  } catch (error) {
    // Rollback the transaction on error
    await client.query('ROLLBACK');
    console.error('Error deleting user data:', error);
    return false;
  } finally {
    client.release();
  }
}

/**
 * Function to generate the privacy policy with the current date
 * @returns HTML string of privacy policy
 */
export function getPrivacyPolicy(): string {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return `
  <h1>Privacy Policy for Personality Mosaic</h1>
  <p>Last updated: ${currentDate}</p>
  
  <h2>1. Introduction</h2>
  <p>Welcome to Personality Mosaic. We respect your privacy and are committed to protecting your personal data.</p>
  
  <h2>2. Data We Collect</h2>
  <p>We collect and process the following information:</p>
  <ul>
    <li>Account information (email, name)</li>
    <li>Assessment results and preferences</li>
    <li>Usage data and analytics</li>
  </ul>
  
  <h2>3. How We Use Your Data</h2>
  <p>We use your data to:</p>
  <ul>
    <li>Provide and improve our services</li>
    <li>Personalize your experience</li>
    <li>Communicate with you about your account</li>
  </ul>
  
  <h2>4. Your Rights</h2>
  <p>Under data protection laws, you have rights including:</p>
  <ul>
    <li>Right to access - You can request copies of your personal data.</li>
    <li>Right to rectification - You can request correction of inaccurate data.</li>
    <li>Right to erasure - You can request deletion of your data.</li>
    <li>Right to data portability - You can request transfer of your data.</li>
  </ul>
  
  <h2>5. Data Security</h2>
  <p>We implement appropriate security measures to protect your personal data.</p>
  
  <h2>6. Contact Us</h2>
  <p>For any privacy-related questions, please contact privacy@personalitymosaic.example.com</p>
  `;
}

/**
 * Create the necessary tables for data protection compliance
 */
export async function setupDataProtectionTables(): Promise<void> {
  try {
    // Create data deletion logs table for audit trail
    await pool.query(`
      CREATE TABLE IF NOT EXISTS data_deletion_logs (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        request_date TIMESTAMP NOT NULL,
        request_ip TEXT,
        status TEXT NOT NULL,
        completed_date TIMESTAMP
      )
    `);
    
    // Create data access logs table for GDPR compliance auditing
    await pool.query(`
      CREATE TABLE IF NOT EXISTS data_access_logs (
        id SERIAL PRIMARY KEY,
        user_id TEXT NOT NULL,
        access_type TEXT NOT NULL,
        access_date TIMESTAMP NOT NULL,
        request_ip TEXT,
        accessed_by TEXT
      )
    `);
    
    console.log('[DATA-PROTECTION] Data protection tables initialized successfully');
  } catch (error) {
    console.error('Error setting up data protection tables:', error);
    throw error;
  }
}