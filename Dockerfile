FROM node:22 AS base
 
FROM base AS deps
 
RUN corepack enable
WORKDIR  /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN  pnpm fetch --frozen-lockfile
RUN  pnpm install --frozen-lockfile --prod
# RUN  pnpm install --frozen-lockfile

FROM base AS build
 
RUN corepack enable
WORKDIR  /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN  pnpm fetch --frozen-lockfile
RUN  pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm build

FROM node:22-slim
RUN corepack enable
# RUN apt update && apt install libssl-dev dumb-init -y --no-install-recommends
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
# COPY --chown=node:node --from=build /usr/src/app/.env .env
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/pnpm-lock.yaml .
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma
# COPY --from=build /usr/src/app/src/generated/client ./dist/src/generated/client
RUN  pnpm install --frozen-lockfile

RUN  pnpm prisma generate
RUN npm install pm2 -g
# COPY --chown=node:node --from=build /usr/src/app/node_modules/@nestjs ./dist/node_modules/@nestjs
# COPY --chown=node:node --from=build  /usr/src/app/node_modules/.pnpm/@prisma+client@5.16.1_prisma@5.16.1/node_modules/@prisma/client ./node_modules/.prisma/client

# ENV NODE_ENV="production"
# ENV DATABASE_URL="mysql://root:123456@localhost:3307/feige-admin"

# ENV DATABASE_URL="mysql://root:@xzw212647@sh-cynosdbmysql-grp-eifjw072.sql.tencentcdb.com:23115/feigejiawei"
ENV DATABASE_URL="mysql://root:@xzw212647@10.22.104.117:3306/feigejiawei"
ENV JWT_SECRET="feigejiawei"
ENV ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC="7d"

EXPOSE 3000
# CMD ["dumb-init", "node", "dist/src/main"]
CMD ["pm2-runtime", "dist/src/main.js"]