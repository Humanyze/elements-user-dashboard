FROM node:9.11

WORKDIR /executive-badge
ADD . /executive-badge
RUN yarn

EXPOSE 6000

CMD ["sh", "-c", "IS_DOCKER=true yarn run start"]
