FROM openjdk:17-ea-jdk

WORKDIR /sb

COPY . .

RUN ./mvnw clean install -Pdeploy -Dmaven.test.skip=true

RUN mv target/*.jar app.jar

EXPOSE 8080

CMD ["java","-jar","app.jar"]