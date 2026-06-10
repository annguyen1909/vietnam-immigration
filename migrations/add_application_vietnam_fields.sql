-- Vietnam apply flow: optional Application columns (safe to run on shared BudPal prod DB)
ALTER TABLE "Application"
  ADD COLUMN IF NOT EXISTS "urgency" TEXT,
  ADD COLUMN IF NOT EXISTS "portType" TEXT,
  ADD COLUMN IF NOT EXISTS "portName" TEXT;
