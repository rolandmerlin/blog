-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "pseudo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "group" INTEGER NOT NULL DEFAULT 0,
    "token" TEXT NOT NULL
);
INSERT INTO "new_User" ("email", "id", "password", "pseudo", "token") SELECT "email", "id", "password", "pseudo", "token" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_pseudo_key" ON "User"("pseudo");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
