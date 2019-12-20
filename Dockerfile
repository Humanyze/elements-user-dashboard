FROM node:9.11

WORKDIR /deployment-dashboard
ADD . /deployment-dashboard

#ADD container-go.sh /
#RUN ["chmod", "755", "/container-go.sh"]

# Turn these 2 lines back on if you want to edit things inside the container
#RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "-y", "vim"]

EXPOSE 3000
EXPOSE 35729

CMD ["/deployment-dashboard/container-go.sh"]

