FROM node:10.11

WORKDIR /deployment-dashboard
ADD . /deployment-dashboard
RUN yarn

EXPOSE 3000
EXPOSE 35729

CMD ["sh", "-c", "IS_DOCKER=true yarn run start"]
