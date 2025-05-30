# CampusConnect 🛠️ 

CampusConnect is a full-stack web application developed for SAIT's International Centre to replace the current iCent platform. It serves international and domestic students, alumni, and administrators, offering key features like campus event registration, group messaging, user notifications, and analytics.

## 🌐 Live Production (Testing)
**URL**: [https://sait.campusconnect.it.com](https://sait.campusconnect.it.com)


## 📦 Versioning & Updates
- **v1.1.0** - *[April 2025]*  
  🔐 **Security Update**: Integrated [Snyk](https://snyk.io) into GitHub Actions pipeline for vulnerability scanning of both frontend and backend apps.  
  🛠 Enhanced deployment gating logic to separate dev and production updates.


## Explore Documentation and Charts
[Application Overview](docs/application-overview.md) <br>
[Application Overview Diagram](docs/charts/app-overview-chart.md)<br>
[Application Architecture - Kubernetes Cluster](documentation/charts/k8s_cluster.md) <br>
[Upcoming Deployment Blue-Green Strategy](docs/charts/k8s_cluster2.md) <br>
[CI/CD Pipeline](docs/charts/cicd-flowchart.md)<br>
[Test Tracking Spreadsheet](tests/testing_tracking_spreadsheet.xlsx)<br>
[Performance Tests Results](tests/performance_tests/TC-018/index.html)<br>


**⚠️ Deprecated:** [Old Figma Prototype]
[here](https://www.figma.com/design/ujUIa1L0ThiMmE0h6anTAA/Capstone?node-id=0-1)


## 🚀 Current Tech Stack
- **Frontend**: Next.js + React + Tailwind CSS
- **Backend**: Node.js + Express + Prisma ORM
- **Database**: PostgreSQL (managed via Prisma)
- **Containerization**: Docker
- **Orchestration**: Kubernetes (AKS - Azure Kubernetes Service)
- **CI/CD**: GitHub Actions → Azure Container Registry → AKS
- **HTTPS & TLS**: Managed by cert-manager + Let's Encrypt using DNS-01 challenge via Azure DNS
- **Ingress Controller**: NGINX
- **Authentication**: Firebase (Google & Microsoft SSO)


## 🔐 Secrets & Configuration Management
- ConfigMaps & Secrets externalizing configuration from containers. 
- Sensitive manifests (like `*-secret.yaml`) are **not** committed to the repo and must be applied manually.

## 🔒 Security & Vulnerability Scanning
Snyk has been integrated into the CI/CD pipeline to provide automated vulnerability scanning of application dependencies.

- **On every pull request to `dev`**: Scans both backend and frontend, non-blocking (informational).
- **On every push to `main`**: Enforces blocking security scans (fails on high-severity vulnerabilities).
- 🔁 Continuous monitoring through the [Snyk Dashboard](https://snyk.io).

All scans are performed pre-deployment and help ensure compliance with secure software development practices.

## 🛠️ In Progress
- User Notifications
- Groups and Real-Time messaging using WebSockets 

- Blue-Green deployments and auto rollbacks
- Use Helm (k8s pkm) to improve DevOps best practices
- Automated Validation and Testing in CICD pipeline (Unit, Integration, Security, and Performance Testing)
- Advanced monitoring, logging and alerting
- Code Documentation 
<br>

## Codebase Walkthrough
**Youtube**: [https://www.youtube.com/watch?v=RZQtdscfpSs](https://www.youtube.com/watch?v=RZQtdscfpSs)

📣 **Contributions welcome.** More documentation, user flows, and API details will be published as development continues.

<!-- 📬 **Organization Email.** support@campusconnect.it.com -->


