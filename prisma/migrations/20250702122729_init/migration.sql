-- CreateEnum
CREATE TYPE "TagType" AS ENUM ('YCOMBINATOR', 'GSOC', 'WTFUND', 'HACKTOBERFEST', 'DEVFOLIO', 'MLH');

-- CreateEnum
CREATE TYPE "SuggestionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "githubUsername" TEXT NOT NULL,
    "githubProfile" TEXT,
    "bio" TEXT,
    "avatarUrl" TEXT,
    "skills" TEXT[],
    "experience" TEXT,
    "interests" TEXT[],
    "contributionScore" INTEGER NOT NULL DEFAULT 0,
    "totalCommits" INTEGER NOT NULL DEFAULT 0,
    "totalPRs" INTEGER NOT NULL DEFAULT 0,
    "totalStars" INTEGER NOT NULL DEFAULT 0,
    "githubFollowers" INTEGER NOT NULL DEFAULT 0,
    "topLanguages" TEXT[],
    "verifiedGithub" BOOLEAN NOT NULL DEFAULT false,
    "publicProfile" BOOLEAN NOT NULL DEFAULT true,
    "isDiscoverable" BOOLEAN NOT NULL DEFAULT true,
    "twitterHandle" TEXT,
    "linkedinUrl" TEXT,
    "mobile" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserFollow" (
    "id" TEXT NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "UserFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "liveLink" TEXT,
    "description" TEXT,
    "stars" INTEGER NOT NULL DEFAULT 0,
    "forks" INTEGER NOT NULL DEFAULT 0,
    "owner" TEXT,
    "license" TEXT,
    "topics" TEXT[],
    "languages" JSONB,
    "visibility" BOOLEAN NOT NULL DEFAULT true,
    "autoSynced" BOOLEAN NOT NULL DEFAULT false,
    "lastSyncedAt" TIMESTAMP(3),
    "approved" BOOLEAN NOT NULL DEFAULT false,
    "upvotes" INTEGER NOT NULL DEFAULT 0,
    "downvotes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectTag" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "TagType" NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ProjectTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectSuggestion" (
    "id" TEXT NOT NULL,
    "githubUrl" TEXT NOT NULL,
    "notes" TEXT,
    "submittedById" TEXT NOT NULL,
    "status" "SuggestionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectSuggestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SuggestedTag" (
    "id" TEXT NOT NULL,
    "suggestionId" TEXT NOT NULL,
    "type" "TagType" NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "SuggestedTag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bookmark" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bookmark_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectVote" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "type" "VoteType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_githubUsername_key" ON "User"("githubUsername");

-- CreateIndex
CREATE UNIQUE INDEX "UserFollow_followerId_followingId_key" ON "UserFollow"("followerId", "followingId");

-- CreateIndex
CREATE UNIQUE INDEX "Project_fullName_key" ON "Project"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Project_githubUrl_key" ON "Project"("githubUrl");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectTag_projectId_type_key" ON "ProjectTag"("projectId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_projectId_key" ON "Bookmark"("userId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectVote_userId_projectId_key" ON "ProjectVote"("userId", "projectId");

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followerId_fkey" FOREIGN KEY ("followerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFollow" ADD CONSTRAINT "UserFollow_followingId_fkey" FOREIGN KEY ("followingId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectTag" ADD CONSTRAINT "ProjectTag_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectSuggestion" ADD CONSTRAINT "ProjectSuggestion_submittedById_fkey" FOREIGN KEY ("submittedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SuggestedTag" ADD CONSTRAINT "SuggestedTag_suggestionId_fkey" FOREIGN KEY ("suggestionId") REFERENCES "ProjectSuggestion"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bookmark" ADD CONSTRAINT "Bookmark_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectVote" ADD CONSTRAINT "ProjectVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectVote" ADD CONSTRAINT "ProjectVote_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
