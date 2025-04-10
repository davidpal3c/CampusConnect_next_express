# CampusConnect 🛠️ 

CampusConnect is a full-stack web application developed for SAIT's International Centre to replace the current iCent platform. It serves international and domestic students, alumni, and administrators, offering key features like campus event registration, group messaging, user notifications, and analytics.

## 🌐 Live Production (Testing)
**URL**: [https://sait.campusconnect.it.com](https://sait.campusconnect.it.com)

## 🚀 Current Tech Stack
- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: Node.js + Express + Prisma ORM
- **Database**: PostgreSQL (managed via Prisma)
- **Containerization**: Docker
- **Orchestration**: Kubernetes (AKS - Azure Kubernetes Service)
- **CI/CD**: GitHub Actions → Azure Container Registry → AKS
- **HTTPS & TLS**: Managed by cert-manager + Let's Encrypt using DNS-01 challenge via Azure DNS
- **Ingress Controller**: NGINX
- **Authentication**: Firebase (Google SSO)

<!-- ## 🔐 Secrets & Config
- Secrets like Firebase credentials, database URL, and third-party keys are managed via Kubernetes Secrets.
- Sensitive manifests (like `*-secret.yaml`) are **not** committed to the repo and must be applied manually.

## 📦 Deployments
- Docker images are built and pushed to **Azure Container Registry** (`campusconnectacr`).
- Kubernetes deployments automatically pull updated images during CI/CD and roll out with zero-downtime updates.
- Blue-green deployment strategy is planned for future versions. -->

## 🛠️ In Progress
- Blue-Green deployments and auto rollbacks
- Use Helm (k8s pkm) to improve DevOps experience
<!-- - User Notification Service -->
- Authentication**: Firebase (Google SSO/Microsoft SSO)
- Advanced monitoring & error alerting
- Automated Testing in CICD (Unit, Integration, Security, and Performance Testing)
- Advanced monitoring and logging (Apache Log4j)


📣 **Contributions welcome.** More documentation, user flows, and API details will be published as development continues.

## 📁 Folder Structure
```
backend/               # Node.js + Express server
frontend/              # Next.js frontend
k8s/                   # Kubernetes manifests (deployments, services, ingress)
  ├── backend/
  ├── frontend/
  ├── ingress.yaml
  ├── certificate.yaml
  └── cluster-issuer.yaml
.github/
  └── workflows/       # GitHub Actions CI/CD
```




