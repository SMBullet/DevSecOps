FROM eclipse-temurin:21-jdk-alpine
    
EXPOSE 5050
 
ENV APP_HOME /usr/src/app

COPY target/*.jar $APP_HOME/app.jar

WORKDIR $APP_HOME

RUN echo "128.110.217.179 mysql-test" >> /etc/hosts

CMD ["java", "-jar", "app.jar"]
