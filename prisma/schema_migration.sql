-- =============================================================================
-- JAMIA ISLAMABAD EMS PORTAL — PGADMIN 4 DIRECT SQL MIGRATION
-- Copy and paste this script directly into pgAdmin 4 Query Tool
-- =============================================================================

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum: User Roles
CREATE TYPE "Role" AS ENUM ('ADMIN', 'DIRECTOR', 'DEAN', 'STUDENT');

-- CreateEnum: Admission Status
CREATE TYPE "AdmissionStatus" AS ENUM ('PENDING', 'ENROLLED', 'GRADUATED', 'WITHDRAWN');

-- CreateTable: users
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "passwordHash" TEXT,
    "role" "Role" NOT NULL DEFAULT 'STUDENT',
    "studentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable: students
CREATE TABLE "students" (
    "id" TEXT NOT NULL,
    "formNo" TEXT NOT NULL,
    "date" TEXT,
    "department" TEXT NOT NULL,
    "classGrade" TEXT NOT NULL,
    "studentName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "phone" TEXT,
    "mobile" TEXT NOT NULL,
    "studentCnic" TEXT NOT NULL,
    "fatherCnic" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "temporaryAddress" TEXT,
    "guardianName" TEXT,
    "guardianRelation" TEXT,
    "guardianCnic" TEXT,
    "guardianPhone" TEXT,
    "guardianPermanentAddress" TEXT,
    "guardianTemporaryAddress" TEXT,
    "photo" TEXT NOT NULL,
    "studentSignature" TEXT NOT NULL,
    "guardianSignature" TEXT NOT NULL,
    "agreeToRules" BOOLEAN NOT NULL DEFAULT true,
    "status" "AdmissionStatus" NOT NULL DEFAULT 'PENDING',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateTable: accounts
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable: sessions
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable: verification_tokens
CREATE TABLE "verification_tokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndexes
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE UNIQUE INDEX "users_studentId_key" ON "users"("studentId");
CREATE UNIQUE INDEX "students_formNo_key" ON "students"("formNo");
CREATE UNIQUE INDEX "accounts_provider_providerAccountId_key" ON "accounts"("provider", "providerAccountId");
CREATE UNIQUE INDEX "sessions_sessionToken_key" ON "sessions"("sessionToken");
CREATE UNIQUE INDEX "verification_tokens_token_key" ON "verification_tokens"("token");
CREATE UNIQUE INDEX "verification_tokens_identifier_token_key" ON "verification_tokens"("identifier", "token");

-- AddForeignKeys
ALTER TABLE "users" ADD CONSTRAINT "users_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
