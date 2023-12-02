# Stage 1: Maven build
FROM maven:3-openjdk-17 as build
WORKDIR /app
COPY . /app
RUN mvn clean package

# Stage 2: Run the JAR
FROM openjdk:17
COPY --from=build /app/target/student-timer-backend-0.0.1-SNAPSHOT.jar /app.jar
CMD ["java", "-jar", "/app.jar"]