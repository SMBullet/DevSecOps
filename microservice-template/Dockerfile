# Use an official Java 21 runtime as a parent image
FROM openjdk:21-jdk-slim

# Set the working directory in the container
WORKDIR /app

# Copy the jar file from the target directory to the working directory
# Use a wildcard to accommodate different JAR file names
COPY target/*.jar app.jar

# Expose the port that the app runs on
EXPOSE 8080

# Set the environment variable for Spring profile
# Default profile is 'default', can be overridden at runtime
ENV SPRING_PROFILES_ACTIVE=default

# Run the jar file
ENTRYPOINT ["java", "-jar", "app.jar"]
