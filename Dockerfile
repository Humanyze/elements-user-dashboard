FROM node:10.18

WORKDIR /deployment-dashboard

# Turn these 2 lines back on if you want to edit things inside the container
#RUN ["apt-get", "update"]
#RUN ["apt-get", "install", "-y", "vim"]

EXPOSE 3000
EXPOSE 9003
EXPOSE 35729

CMD ["/deployment-dashboard/cscripts/go"]
