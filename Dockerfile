FROM node:9.6.1

ADD yarn.lock /yarn.lock
ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN yarn

WORKDIR /deplyoment-dashboard
ADD . /deployment-dashboard

VOLUME ["/deployment-dashboard"]

EXPOSE 3000
EXPOSE 35729

CMD ["yarn", "start"]
