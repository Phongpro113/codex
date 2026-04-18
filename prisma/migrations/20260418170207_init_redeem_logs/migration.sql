-- CreateTable
CREATE TABLE "redeem_logs" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "key_type" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "term" TEXT NOT NULL,
    "service" TEXT NOT NULL,
    "subscription_hours" INTEGER NOT NULL,
    "activated_email" TEXT,
    "date_active" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "redeem_logs_pkey" PRIMARY KEY ("id")
);
