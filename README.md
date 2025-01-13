# DevSecOps Microservices Web Application

## Project Overview

This project is a **Microservices Web Application** developed using **Spring Boot** and **MySQL** for the backend, with a **React** frontend. The entire application was containerized using **Docker** and deployed in the cloud using **DevSecOps methodologies**.

Our **CI/CD pipeline** was built using **Jenkins** and integrates tools for security, quality, and deployment such as:
- **Docker** for containerization
- **Trivy** for security scanning
- **SonarQube** for code quality analysis
- **Maven** for build management
- **Kubernetes** for orchestration and deployment

We followed the **Agile methodology** and managed the project through **Jira**.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Pipeline Overview](#pipeline-overview)
- [Security and Quality](#security-and-quality)
- [Agile Approach](#agile-approach)
- [Screenshots](#screenshots)

---

## Tech Stack

### Backend:
- **Spring Boot**
- **MySQL**

### Frontend:
- **React**

### DevOps Tools:
- **Docker** - Containerization
- **Kubernetes** - Orchestration & Deployment
- **Jenkins** - CI/CD Pipeline
- **Trivy** - Security Vulnerability Scanning
- **SonarQube** - Code Quality and Security Analysis
- **Maven** - Build Management

---

## Architecture

The application follows a **microservices architecture** with the backend API built in Spring Boot and a frontend in React. Each component is containerized using Docker and deployed on a Kubernetes cluster.

![Architecture Diagram](./screenshots/architecture-diagram.png)

---

## Pipeline Overview

Our **Jenkins CI/CD pipeline** automates the entire build, test, and deployment process:

1. **Code Checkout** from version control (Git).
2. **Build** the application using **Maven**.
3. **Static Code Analysis** with **SonarQube**.
4. **Security Scanning** of Docker images using **Trivy**.
5. **Dynamic Code Analysis** of Docker images using **OWASP ZAP**.
6. **Containerization** with **Docker**.
7. **Artifacts Storage** with **Sonatype Nexus Repository**.
8. **Deployment** to a **Kubernetes** cluster.

**Full Jenkins Pipeline** ![Jenkins Pipeline](./Jenkinsfile)

**Jenkins CI/CD pipeline Preview :** : ![Jenkins Pipeline](./screenshots/pipeline.png)

---

## Security and Quality

### Trivy Scan

We integrated **Trivy** in our pipeline to ensure that our Docker images are free from vulnerabilities. Any critical vulnerabilities are reported, and the build fails if security thresholds are exceeded.

![Trivy Scan Results](./screenshots/trivy-scan-results.png)

### SonarQube Analysis

We used **SonarQube** for continuous inspection of code quality, checking for bugs, vulnerabilities, and code smells. The pipeline will fail if the quality gate does not pass.

![SonarQube Analysis](./screenshots/sonarqube-analysis.png)

---

## Agile Approach

We followed the **Agile methodology** throughout the project. Tasks were broken down into sprints and managed using **Jira** for tracking progress, backlog, and sprint planning.

![Jira Sprint Board](./screenshots/jira-board.png)

---

## Screenshots

### Application Interface
![Application UI](./screenshots/application-ui1.png)
![Application UI](./screenshots/application-ui2.png)
![Application UI](./screenshots/application-ui3.png)
![Application UI](./screenshots/application-ui4.png)
![Application UI](./screenshots/application-ui5.png)
![Application UI](./screenshots/application-ui6.png)



