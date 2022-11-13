-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "symbol" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCurrencyBalance" (
    "currencyId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,

    CONSTRAINT "UserCurrencyBalance_pkey" PRIMARY KEY ("currencyId","userId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_symbol_key" ON "Currency"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Currency_name_key" ON "Currency"("name");

-- AddForeignKey
ALTER TABLE "UserCurrencyBalance" ADD CONSTRAINT "UserCurrencyBalance_currencyId_fkey" FOREIGN KEY ("currencyId") REFERENCES "Currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCurrencyBalance" ADD CONSTRAINT "UserCurrencyBalance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
