FROM openjdk:8-jdk-alpine
MAINTAINER Michael Skvortsov <demoniac.death@gmail.com>

VOLUME /tmp
ARG JAR_FILE
COPY target/${JAR_FILE} /app.jar
ENTRYPOINT ["java", "-Djava.security.egf=file:/dev/./urandom","-jar","/app.jar"]