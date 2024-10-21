FROM openjdk:17-jdk-slim

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y dos2unix
RUN dos2unix mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 8080

CMD ["java", "-jar", "target/lab1.jar"]