# Use an official OpenJDK runtime as a base image
FROM openjdk:17-jre-slim

# Set the working directory
WORKDIR /app

# Copy the JAR file into the container
COPY target/backend-0.0.1-SNAPSHOT.jar app.jar

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run your application
CMD ["java", "-jar", "app.jar"]