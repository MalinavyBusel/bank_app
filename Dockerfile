FROM node:20.12-alpine AS base
WORKDIR /home/node/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npm run build

FROM base AS prod

COPY --from=base /home/node/app/dist ./dist
COPY --from=base /home/node/app/node_modules ./node_modules
COPY --from=base /home/node/app/.env ./
CMD ["node", "./dist/main.js", "--mongo", "--http"]
