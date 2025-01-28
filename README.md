# Fruits App Repository

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

1. **Client Application**:
   - Written in JavaScript.
   - Dockerized using a `Dockerfile` for containerized deployment.

2. **Helm Chart**:
   - Located in the `fruits-app/` directory.
   - Contains Kubernetes resource templates for deploying the application.

3. **CI/CD Workflow**:
   - Automates testing, building, and deployment of the app.
   - Pushes Docker images to an **Amazon ECR** registry.
   - Updates the image tag in a `values.yaml` file in another repository.

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




