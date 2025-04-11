# CampusConnect - Student App Development

## Project Overview
- **Project Sponsor**: Shannon Erwin
  - Title: International Student Engagement Coordinator at SAIT
  - Contact: Shannon.Erwin@edu.sait.ca
- **Current System**: iCent
  - Limitations:
    - Poor UX/UI design
    - Limited functionalities
    - No direct notifications
    - No alumni integration
- **Proposed Solution**
  - Technologies: NextJS, React, React Native, PostgreSQL
  - Key Features:
    - Administrative dashboards
    - Direct notifications
    - UI/UX improvements
    - User integration (social media, messaging)
    - Landing page with events, links, and notifications

## Use Case Diagram and Descriptions
- **Administrator Use Cases**
  - Register Admin Account
  - Log into Admin Account
  - Manage Users
  - Manage Events
  - Manage Groups
  - Manage Notifications
  - Verify New Admin
  - View Analytics
  - Manage Articles
- **Student and Alumni Use Cases**
  - Register Student/Alumni Account
  - Login Student/Alumni Account
  - View Campus Information
  - View and Register for Events
  - View Notifications
  - Interaction with Groups

## Data Sets
- **Article Data**
  - Fields: Title, Date Published, Category, Content, Image, Author
  - Format: JSON
- **Student Information**
  - Fields: SAIT ID, Name, Age, Email, Program, Department
  - Format: Excel (.xlsx)
- **Alumni Information**
  - Fields: Name, Age, Email, Credential(s), Year of Graduation, Current Position, Company
  - Format: Excel (.xlsx)
- **Events**
  - Fields: Event Name, Date, Location, Target Categories, Host
  - Format: JSON
- **Administrative Account Information**
  - Fields: Email, Password, SAIT ID, Name, Position, Permissions
  - Format: JSON
- **Data Analytics**
  - Fields: Event Associated, Date, Time, Engagement Quantities by Program, Engagement Totals
  - Format: JSON

## Data Storage and Persistence
- **Database**: PostgreSQL
  - Features:
    - ACID Compliance
    - Rich Data Types and Extensibility
    - Scalability and Performance
    - Strong Support for Relationships
- **ORM**: Prisma
  - Features:
    - Schema Definition and Migration Management
    - Type Safety
    - Efficient Data Access
    - Supports Advanced Queries

## Entity Diagram (ERD)
- **Entities**:
  - Student
  - Admin
  - Alumni
  - Program
  - Department
  - User Notification
  - Article
  - Category
  - Notification
  - User Events
  - Event
  - User Group
  - Group

## Revised Class Diagram (Structural Model)
- **Components**:
  - Frontend Server (Next.js + React)
  - Backend API Server (JavaScript/Node.js, Prisma)
  - Database Server (PostgreSQL)

## Deployment Diagram and Description
- **User Access Layer**
  - Frontend Server
  - Load Balancer
- **Backend API Server**
  - Handles business logic, user management, data processing
- **Database Server**
  - PostgreSQL database
  - Prisma for data handling

## Sequence Diagrams
- Register Student and Alumni Account
- Register for Events
- Cancel RSVP for Registered Event
- Manage Notification

## Activity Diagrams
- **Register Event (Student User)**
  - Steps: Login, View Events, Fill RSVP Form, Submit RSVP, System Validation, Confirmation
- **Manage Article (Admin User)**
  - Steps: Login, Access Admin Dashboard, Select Articles, View/Add/Edit/Delete Articles

## System Prototype
- **Attached Zip File**: Contains program codebase

## Work Breakdown Structure and Gantt Chart
- **Phase 1 – Planning and Setup (Week 1-2)**
  - Tasks: Requirement Analysis, System Architecture, Environment Setup, Prototyping
- **Phase 2 – Backend Development (Week 3-5)**
  - Tasks: Authentication & Authorization, Database Schema and ORM, Core API Development, Error Handling
- **Phase 3 – Frontend Development (Week 6-8)**
  - Tasks: Frontend Design Implementation, Admin Dashboard, Student/Alumni Interfaces, Notifications and Analytics
- **Phase 4 – Testing, Deployment, and Finalization (Week 9-10)**
  - Tasks: Testing, Deployment, Documentation, Final Presentation

## Revised Team Constitution
- **Team Name**: House Of Developers
- **Team Members**:
  - David Palacios (Team Leader)
  - Aidan Pratt (Assistant Leader)
  - Juan Nova Alfonso (Project Liaison)
  - Jaceun Lee (Resource Manager)
  - Jawad Latif (Coordinator)
- **Team Goals**: Deliver Capstone project on time, strengthen frontend and backend capabilities
- **Coding Standards**: camelCase, PascalCase, OOP principles, DRY principle
- **Communication**: MS Teams, In-person meetings
- **Conflict Resolution**: Open discussion, task redistribution, instructor intervention if needed

## Design Prototype (Figma)
- **Student Login**
- **Student Register**
- **Dashboard**
- **Campus Information**
- **All Notifications**
- **All Events**
- **All Groups**
- **General Information**
- **Change Password**
- **Administrative Dashboard Prototypes**
  - Articles
  - Analytics