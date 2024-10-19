FROM eclipse-temurin:21-jdk-alpine

EXPOSE 5050

ENV APP_HOME /usr/src/app

COPY target/*.jar $APP_HOME/app.jar

WORKDIR $APP_HOME

# Copy the script into the image
COPY modify_hosts.sh /usr/local/bin/modify_hosts.sh
RUN chmod +x /usr/local/bin/modify_hosts.sh

# Run the script to modify /etc/hosts and then start the application
CMD ["/usr/local/bin/modify_hosts.sh", "java", "-jar", "app.jar"]
