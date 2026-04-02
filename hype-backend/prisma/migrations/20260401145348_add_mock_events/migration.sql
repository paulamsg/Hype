-- CreateTable
CREATE TABLE "MockEvent" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "subGenre" TEXT NOT NULL,
    "priceMin" DOUBLE PRECISION NOT NULL,
    "priceMax" DOUBLE PRECISION NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "MockEvent_pkey" PRIMARY KEY ("id")
);
