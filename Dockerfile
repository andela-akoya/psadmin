FROM node:8.7

MAINTAINER koyagabriel@gmail.com

COPY . /www/var/app

WORKDIR /www/var/app

CMD ["bash", "/www/var/app/run.sh"]