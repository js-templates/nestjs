FROM node:18-alpine as base

###################
# BUILD
###################

FROM base AS build

WORKDIR /build

COPY package.json yarn.lock* ./
RUN yarn install --frozen-lockfile && yarn cache clean

COPY . .
RUN yarn prisma generate
RUN yarn build

RUN rm -rf ./node_modules
RUN rm -rf ./.cache
RUN yarn --prod --frozen-lockfile

###################
# FINAL
###################

FROM base AS final

WORKDIR /final

COPY --from=build /build/node_modules ./node_modules
COPY --from=build /build/dist ./dist
COPY --from=build /build/prisma ./prisma
COPY --from=build /build/package.json ./package.json

ENV NODE_ENV production

CMD ["yarn", "start:prod"]