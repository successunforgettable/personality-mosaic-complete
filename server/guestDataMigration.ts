import { db } from './db';
import { pool } from './db';

/**
 * Migrates assessment data from a guest user to a registered user
 * @param guestId - The ID of the guest user
 * @param userId - The ID of the registered user
 * @returns Success status and number of migrated items
 */
export async function migrateGuestData(guestId: string, userId: string): Promise<{ 
  success: boolean; 
  migratedCount: number;
  error?: string;
}> {
  const client = await pool.connect();
  
  try {
    // Start a transaction to ensure data consistency
    await client.query('BEGIN');
    
    console.log(`Starting migration of guest data from ${guestId} to registered user ${userId}`);
    
    // First, query all assessment results for the guest user
    const guestResults = await client.query(
      'SELECT * FROM assessment_results WHERE user_id = $1',
      [guestId]
    );
    
    if (!guestResults.rows.length) {
      console.log('No guest data found to migrate');
      await client.query('COMMIT');
      return { success: true, migratedCount: 0 };
    }
    
    console.log(`Found ${guestResults.rows.length} results to migrate`);
    
    // Update each result to the new user ID
    for (const result of guestResults.rows) {
      await client.query(
        'UPDATE assessment_results SET user_id = $1 WHERE id = $2',
        [userId, result.id]
      );
    }
    
    console.log(`Successfully migrated ${guestResults.rows.length} assessment results`);
    
    // Mark the guest user as having data migrated
    await client.query(
      'UPDATE users SET data_migrated_to = $1, data_migrated_at = NOW() WHERE id = $2',
      [userId, guestId]
    );
    
    // Commit the transaction
    await client.query('COMMIT');
    
    return { 
      success: true, 
      migratedCount: guestResults.rows.length 
    };
  } catch (error) {
    // Rollback the transaction on error
    await client.query('ROLLBACK');
    
    console.error('Error during guest data migration:', error);
    return { 
      success: false, 
      migratedCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error during migration'
    };
  } finally {
    // Release the client back to the pool
    client.release();
  }
}