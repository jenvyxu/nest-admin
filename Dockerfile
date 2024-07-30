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
RUN apt-get update -y && apt-get install -y openssl
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node --from=build /usr/src/app/package.json .
COPY --chown=node:node --from=build /usr/src/app/pnpm-lock.yaml .
COPY --chown=node:node --from=build /usr/src/app/prisma ./prisma

RUN  pnpm install --frozen-lockfile && pnpm prisma generate && npm install pm2 -g

# ENV DATABASE_URL="mysql://root:@xzw212647@10.22.104.117:3306/feigejiawei"
# ENV JWT_SECRET="feigejiawei"
# ENV ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC="7d"

EXPOSE 3000

CMD ["pm2-runtime", "dist/src/main.js"]