-- First, update any NULL values with defaults
UPDATE "Account"
SET "fullName" = 'Unknown'
WHERE "fullName" IS NULL;

UPDATE "Account"
SET "areaCode" = '+1'
WHERE "areaCode" IS NULL;

UPDATE "Account"
SET "phoneNumber" = 'Unknown'
WHERE "phoneNumber" IS NULL;

UPDATE "Account"
SET "gender" = 'Unknown'
WHERE "gender" IS NULL;

-- Then make the columns NOT NULL
ALTER TABLE "Account"
ALTER COLUMN "fullName" SET NOT NULL,
ALTER COLUMN "areaCode" SET NOT NULL,
ALTER COLUMN "phoneNumber" SET NOT NULL,
ALTER COLUMN "gender" SET NOT NULL; 