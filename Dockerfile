FROM node:alpine3.15 as client
WORKDIR /app/client
COPY ./client/package-lock.json /app/client
COPY ./client/package.json /app/client
RUN npm ci --only=production && npm cache clean --force
COPY ./client /app/client
RUN ["npm", "run", "build"]

FROM node:alpine3.15 as server 
WORKDIR /app/server
COPY ./server/package-lock.json /app/server
COPY ./server/package.json /app/server
COPY --from=client /app/client/build /app/server/build
RUN npm i && npm cache clean --force
COPY ./server /app/server
CMD ["npm", "run", "build"]
