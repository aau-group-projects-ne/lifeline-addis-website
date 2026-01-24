# Usage of pnpm

due to it's easier overload, we use pnpm on this file. if you don't have it, it's a package manager like npm that can easily be installed

# After Cloning

go to the repo and say pnpm install /pnpm add

# To run file

use "pnpm dev"

# Changes to the db

For the databsae to work use the following lines of code
DATABASE_URL="mysql://{your username}:{Your password}@@localhost:3306/medical_homecare"
JWT_SECRET={your own secret in string format}

# to check the prisma db

npx prisma studio
