import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

let db: ReturnType<typeof drizzle> | null = null;
let dbError: Error | null = null;

// Initialize database connection
try {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.warn('⚠️  DATABASE_URL is not set. Database features will be disabled.');
    dbError = new Error('DATABASE_URL is not configured');
  } else {
    console.log('🔌 Attempting to connect to database...');

    // Create postgres client with error handling
    const client = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      onnotice: () => {}, // Suppress notices
    });

    db = drizzle(client);
    console.log('✅ Database connection initialized successfully');
  }
} catch (error) {
  dbError = error instanceof Error ? error : new Error('Unknown database error');
  console.error('❌ Failed to initialize database connection:', dbError.message);
  db = null;
}

// Export db instance
export { db };

// Helper to check if database is available
export const isDatabaseAvailable = () => {
  return !!db && !dbError;
};

// Helper to get database error
export const getDatabaseError = () => {
  return dbError;
};

// Test database connection
export const testDatabaseConnection = async (): Promise<{ success: boolean; error?: string }> => {
  if (!db) {
    return { success: false, error: dbError?.message || 'Database not initialized' };
  }

  try {
    // Simple query to test connection using sql helper from drizzle
    const { sql } = await import('drizzle-orm');
    await db.execute(sql`SELECT 1 as test`);
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Database connection test failed:', errorMessage);
    return { success: false, error: errorMessage };
  }
};
