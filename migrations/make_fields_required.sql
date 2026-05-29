-- Step 1: Update existing NULL values with defaults
UPDATE "Account"
SET "fullName" = COALESCE("fullName", 'Unknown');

UPDATE "Account"
SET "areaCode" = COALESCE("areaCode", '+1');

UPDATE "Account"
SET "phoneNumber" = COALESCE("phoneNumber", 'Unknown');

UPDATE "Account"
SET "gender" = COALESCE("gender", 'Unknown');

-- Step 2: Make columns NOT NULL
ALTER TABLE "Account" 
  ALTER COLUMN "fullName" SET NOT NULL,
  ALTER COLUMN "areaCode" SET NOT NULL,
  ALTER COLUMN "phoneNumber" SET NOT NULL,
  ALTER COLUMN "gender" SET NOT NULL;

-- Step 3: Add default constraints for future inserts
ALTER TABLE "Account" 
  ALTER COLUMN "fullName" SET DEFAULT 'Unknown',
  ALTER COLUMN "areaCode" SET DEFAULT '+1',
  ALTER COLUMN "phoneNumber" SET DEFAULT 'Unknown',
  ALTER COLUMN "gender" SET DEFAULT 'Unknown'; 