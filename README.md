# CampusConnect 🛠️ 

CampusConnect is a full-stack web application developed for SAIT's International Centre to replace the current iCent platform. It serves international and domestic students, alumni, and administrators, offering key features like campus event registration, group messaging, user notifications, and analytics.

## 🌐 Live Production (Testing)
**URL**: [https://sait.campusconnect.it.com](https://sait.campusconnect.it.com)


## Explore Documentation and Charts
[Application Overview](documentation/application-overview.md) <br>
[Application Overview Diagram](documentation/charts/app-overview-chart.md)<br>
[Application Architecture - Kubernetes Cluster](documentation/charts/k8s_cluster.md) <br>
[Upcoming Deployment Blue-Green Strategy](documentation/charts/k8s_cluster2.md) <br>
[CI/CD Pipeline](documentation/charts/cicd-flowchart.md)

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
- Advanced monitoring & error alerting
- Automated Testing in CICD (Unit, Integration, Security, and Performance Testing)
- Advanced monitoring and logging
- Code Documentation 
<!-- - User Notification Service -->
<br>

📣 **Contributions welcome.** More documentation, user flows, and API details will be published as development continues.

<!-- 📬 **Organization Email.** support@campusconnect.it.com  -->


