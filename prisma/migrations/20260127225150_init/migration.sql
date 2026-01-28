-- CreateEnum
CREATE TYPE "user_role" AS ENUM ('patient', 'doctor', 'nurse', 'admin');

-- CreateTable
CREATE TABLE "assessment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "doctorId" INTEGER NOT NULL,
    "document" TEXT NOT NULL,
    "estimatedPrice" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assignment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "nurseId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "age" INTEGER,
    "sex" TEXT,
    "phoneNumber" TEXT,

    CONSTRAINT "patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "assessmentId" INTEGER NOT NULL,
    "slipUrl" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rating" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "ratedUserId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "rating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "update" (
    "id" SERIAL NOT NULL,
    "assessmentId" INTEGER NOT NULL,
    "nurseId" INTEGER NOT NULL,
    "statusUpdate" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "update_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "user_role" NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "assessment_doctorId_idx" ON "assessment"("doctorId");

-- CreateIndex
CREATE INDEX "assessment_patientId_idx" ON "assessment"("patientId");

-- CreateIndex
CREATE INDEX "assignment_nurseId_idx" ON "assignment"("nurseId");

-- CreateIndex
CREATE INDEX "assignment_patientId_idx" ON "assignment"("patientId");

-- CreateIndex
CREATE UNIQUE INDEX "patient_userId_key" ON "patient"("userId");

-- CreateIndex
CREATE INDEX "payment_assessmentId_idx" ON "payment"("assessmentId");

-- CreateIndex
CREATE INDEX "payment_patientId_idx" ON "payment"("patientId");

-- CreateIndex
CREATE INDEX "rating_patientId_idx" ON "rating"("patientId");

-- CreateIndex
CREATE INDEX "rating_ratedUserId_idx" ON "rating"("ratedUserId");

-- CreateIndex
CREATE INDEX "update_assessmentId_idx" ON "update"("assessmentId");

-- CreateIndex
CREATE INDEX "update_nurseId_idx" ON "update"("nurseId");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_doctorId_fkey" FOREIGN KEY ("doctorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment" ADD CONSTRAINT "assessment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignment" ADD CONSTRAINT "assignment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient" ADD CONSTRAINT "patient_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment" ADD CONSTRAINT "payment_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rating" ADD CONSTRAINT "rating_ratedUserId_fkey" FOREIGN KEY ("ratedUserId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "update" ADD CONSTRAINT "update_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "update" ADD CONSTRAINT "update_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
