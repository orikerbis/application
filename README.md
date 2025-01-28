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
# Features

	•	Client Application: A JavaScript-based app housed in the client/ directory, containerized using Docker.
	•	Helm Chart: A Kubernetes Helm chart (fruits-app) for managing deployment resources.
	•	CI/CD Workflow:
	•	Testing: Ensures code quality and application reliability.
	•	Image Building: Builds a Docker image for the client app.
	•	Image Push: Pushes the Docker image to an Amazon ECR registry.
	•	Helm Chart Update: Updates the values.yaml file in another repository with the new image tag using the GitHub SHA.
