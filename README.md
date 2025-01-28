# Fruits App Repository

This repository contains the codebase, configuration, and CI/CD setup for the **Fruits App** project. The application is built with JavaScript, packaged using Docker, and deployed on Kubernetes with Helm charts. The CI/CD process automates testing, building, and deploying the application.

---

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


