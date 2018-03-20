FROM node:9.6.1

WORKDIR /deployment-dashboard
ADD . /deployment-dashboard
RUN yarn

EXPOSE 3000
EXPOSE 35729

CMD ["yarn", "run", "start"]
