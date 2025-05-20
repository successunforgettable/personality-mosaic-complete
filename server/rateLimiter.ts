// Simple in-memory rate limiter for failed login attempts

interface RateLimitRecord {
  count: number;
  firstAttempt: number;
  lastAttempt: number;
  blocked: boolean;
  blockedUntil?: number;
}

class RateLimiter {
  private attempts: Map<string, RateLimitRecord> = new Map();
  private readonly maxAttempts: number = 5;         // Max failed attempts allowed
  private readonly timeWindow: number = 15 * 60000; // 15 minutes in milliseconds
  private readonly blockDuration: number = 30 * 60000; // 30 minutes block duration
  
  // Clean up expired records periodically
  constructor() {
    setInterval(() => this.cleanupExpiredRecords(), 5 * 60000); // Clean every 5 minutes
  }
  
  /**
   * Record a failed attempt
   * @param identifier - User identifier (email or IP)
   * @returns Object with isBlocked and timeRemaining properties
   */
  recordFailedAttempt(identifier: string): { isBlocked: boolean; timeRemaining?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier) || {
      count: 0,
      firstAttempt: now,
      lastAttempt: now,
      blocked: false
    };
    
    // Check if currently blocked
    if (record.blocked && record.blockedUntil) {
      if (now < record.blockedUntil) {
        // Still blocked
        const timeRemaining = Math.ceil((record.blockedUntil - now) / 60000); // Remaining minutes
        return { isBlocked: true, timeRemaining };
      } else {
        // Block expired, reset
        record.blocked = false;
        record.blockedUntil = undefined;
        record.count = 0;
        record.firstAttempt = now;
      }
    }
    
    // Check if the time window expired
    if (now - record.firstAttempt > this.timeWindow) {
      // Reset window
      record.count = 1;
      record.firstAttempt = now;
    } else {
      // Increment counter
      record.count++;
    }
    
    record.lastAttempt = now;
    
    // Check if should be blocked
    if (record.count >= this.maxAttempts) {
      record.blocked = true;
      record.blockedUntil = now + this.blockDuration;
      const timeRemaining = Math.ceil(this.blockDuration / 60000); // Time in minutes
      this.attempts.set(identifier, record);
      return { isBlocked: true, timeRemaining };
    }
    
    this.attempts.set(identifier, record);
    return { isBlocked: false };
  }
  
  /**
   * Check if a user is blocked
   * @param identifier - User identifier (email or IP)
   * @returns Object with isBlocked and timeRemaining properties
   */
  isBlocked(identifier: string): { isBlocked: boolean; timeRemaining?: number } {
    const now = Date.now();
    const record = this.attempts.get(identifier);
    
    if (!record || !record.blocked || !record.blockedUntil) {
      return { isBlocked: false };
    }
    
    if (now < record.blockedUntil) {
      // Still blocked
      const timeRemaining = Math.ceil((record.blockedUntil - now) / 60000); // Remaining minutes
      return { isBlocked: true, timeRemaining };
    }
    
    // Block expired
    record.blocked = false;
    record.blockedUntil = undefined;
    record.count = 0;
    this.attempts.set(identifier, record);
    return { isBlocked: false };
  }
  
  /**
   * Reset rate limit for an identifier (e.g., after successful login)
   * @param identifier - User identifier (email or IP)
   */
  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }
  
  /**
   * Clean up expired records to free memory
   */
  private cleanupExpiredRecords(): void {
    const now = Date.now();
    for (const [key, record] of this.attempts.entries()) {
      // Remove unblocked records older than time window
      if (!record.blocked && (now - record.lastAttempt > this.timeWindow)) {
        this.attempts.delete(key);
      }
      // Remove expired blocks
      else if (record.blocked && record.blockedUntil && now > record.blockedUntil) {
        this.attempts.delete(key);
      }
    }
  }
}

// Create and export singleton instance
export const rateLimiter = new RateLimiter();