# Fruits App Application

This repository contains the codebase, configuration, and CI/CD setup for the **Fruits App** project. The application is built with JavaScript, packaged using Docker, and deployed on Kubernetes with Helm charts. The CI/CD process automates testing, building, and deploying the application.

---

---![web-image](https://github.com/user-attachments/assets/d41dab66-c822-4945-9de8-4be10fb106c8)

## Project Structure

```plaintext
.
├── client
│   ├── Dockerfile
│   ├── index.js
│   ├── package.json
│   ├── public
│   │   └── style.css
│   ├── tests
│   │   └── trivial.test.js
│   └── views
│       └── index.ejs
└── fruits-app
    ├── Chart.yaml
    ├── templates
    │   ├── _helpers.tpl
    │   ├── clusterstore.yaml
    │   ├── deployment.yaml
    │   ├── externalsecrets.yaml
    │   ├── ingress.yaml
    │   └── service.yaml
    └── values.yaml
```
---
## Features

1. **CSS Styling**:
   - The application is styled using **CSS** for a modern and responsive user interface.
   - Custom stylesheets are used to ensure consistency and maintainability.

2. **MongoDB Integration**:
   - The application connects to a **MongoDB** container for data storage.
   - The connection string is managed securely using environment variables injected by **External Secrets** from **AWS Secrets Manager**.

3. **Unit Tests**:
   - The repository includes unit tests to validate application functionality and prevent regressions.
   - Tests are written using **Jest**.

4. **Dockerized Environment**:
   - The application is containerized using Docker, making it easy to deploy and run in any environment.
   - The Dockerfile defines the build process and dependencies for the application.

5. **CI/CD Pipeline**:
   - A GitHub Actions workflow automates the build, test, and deployment process.
   - Each pull request triggers unit tests, builds the application, and pushes the Docker image to **Amazon ECR**.

---

## About the Project

This repository is part of a larger project that consists of three repositories:

1. **Fruits App (This Repository)**:
   - Contains the application code, Helm chart for Kubernetes deployment, and a CI/CD workflow for automating the build and deployment processes.

2. **Terraform Infrastructure as Code (IaC)**:
   - Contains Terraform scripts for provisioning the cloud infrastructure required to run the Fruits App (e.g., EKS cluster, networking, etc.).

3. **GitOps Repository**:
   - Manages Kubernetes deployments using a GitOps approach.
   - Tracks the state of the deployed Helm chart and updates the `values.yaml` file with new image tags and configurations.

These repositories work together to provide a fully automated and scalable solution for deploying and managing the Fruits App.




