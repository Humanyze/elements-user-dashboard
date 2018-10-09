FROM node:9.6.1

WORKDIR /digital
ADD . /digital
RUN yarn

EXPOSE 5000

CMD ["sh", "-c", "IS_DOCKER=true yarn run start"]
