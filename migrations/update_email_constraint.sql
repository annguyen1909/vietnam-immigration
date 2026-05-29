-- Step 1: Drop the existing unique constraint on email (using dynamic lookup)
DO $$ 
BEGIN
    -- Find and drop the constraint if it exists
    EXECUTE (
        SELECT 'ALTER TABLE "Account" DROP CONSTRAINT "' || constraint_name || '"'
        FROM information_schema.table_constraints
        WHERE table_name = 'Account'
        AND constraint_type = 'UNIQUE'
        AND constraint_name LIKE '%email%'
    );
EXCEPTION
    WHEN OTHERS THEN
        -- If any error occurs, continue
        NULL;
END $$;

-- Step 2: Create a composite unique constraint for email + website
ALTER TABLE "Account" ADD CONSTRAINT "Account_email_websiteCreatedAt_key" UNIQUE ("email", "websiteCreatedAt");

-- Step 3: Add index on email for better query performance
CREATE INDEX IF NOT EXISTS "Account_email_idx" ON "Account"("email"); 