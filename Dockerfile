FROM node:9.11

WORKDIR /register
ADD . /register
RUN yarn

EXPOSE 7000

CMD ["sh", "-c", "IS_DOCKER=true yarn run start"]
