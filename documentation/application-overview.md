# CampusConnect - Student App Development

## Project Overview
- **Project Sponsor**: International Student Engagement Coordinator at SAIT
  - Contact: SAIT International Center
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
    - Landing page with events, articles, links, and notifications

## Use Case Descriptions
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

- **User Data**
  - Fields: user_id, email, password, first_name, last_name, middle_name, image_url, role, created_at, updated_at
  - Format: JSON

- **Student Information**
  - Fields: user_id, program_id, department_id, status, intake, intake_year
  - Format: JSON / Excel (.xlsx) / CSV

- **Alumni Information**
  - Fields: user_id, current_position, company
  - Format: JSON / Excel (.xlsx) / CSV

- **Alumni Study Records**
  - Fields: alumni_id, program_id, department_id, graduation_year
  - Format: JSON

- **Program Data**
  - Fields: program_id, name, department_id
  - Format: JSON / Excel (.xlsx) 

- **Department Information**
  - Fields: department_id, name, contact_email, contact_phone
  - Format: JSON / Excel (.xlsx)

- **Article Data**
  - Fields: article_id, title, datePublished, content, imageUrl, audience, created_at, updated_at, status, author_id, type_id, tags
  - Format: JSON

- **Article Types**
  - Fields: type_id, name, created_at, updated_at, isDefault
  - Format: JSON

- **Article Categories**
  - Fields: id, article_id, category_id
  - Format: JSON

- **Event Data**  
  - Fields: event_id, name, date, location, audience, host, contact, capacity, current_attendees, form_id
  - Format: JSON

- **Form Definitions**
  - Fields: id, title, fields (structure), isDraft, createdAt
  - Format: JSON

- **Form Submissions**
  - Fields: id, formId, data (user responses), createdAt
  - Format: JSON

- **Event Categories**
  - Fields: id, event_id, category_id
  - Format: JSON

- **Category Tags**
  - Fields: category_id, name
  - Format: JSON

- **Group Data**
  - Fields: group_id, name, owner_id, audience, allowed_users
  - Format: JSON

- **Group Messages**
  - Fields: message_id, content, timestamp, sender_id, group_id
  - Format: JSON

- **User Events**
  - Fields: id, user_id, event_id, rsvp, user_email, owned
  - Format: JSON

- **User Groups**
  - Fields: id, user_id, group_id
  - Format: JSON

- **Notifications**
  - Fields: notification_id, description, audience, created_at, type
  - Format: JSON

- **User Notifications**
  - Fields: id, user_id, notification_id, accessed
  - Format: JSON

- **Data Analytics**
  - Fields: id, user_id, notification_id, accessed
  - Format: JSON / CSV



## Data Analytics - Data Sets

- **Article Engagement Dataset**
  - Purpose: Measure content reach, author contribution, and publishing trends.
  - Fields: article_id, title, datePublished, status (Draft, Published), author_id, author, type_id, tags, audience (JSON)
  - Format: JSON / CSV
  - Use Case Examples: Most common tags used, Article volume per author, Time to publish (draft → published)

- **Event Participation Dataset**
  - Purpose: Analyze event attendance, capacity utilization, and interest by demographic.
  - Fields: event_id, name, date, location, capacity, current_attendees, audience (JSON), rsvp (from UserEvent), user_id (from UserEvent)
  - Format: JSON / CSV
  - Use Case Examples: Event attendance rate, RSVPs by user type, Regional participation heatmaps

- **Form Submission Analytics**
  - Purpose: Extract insights from form data tied to events (like surveys or feedback).
  - Fields: submission_id, form_id, form_title, submission_data (flattened JSON), submitted_at
  - Format: JSON / CSV
  - Use Case Examples: Satisfaction scores, Feedback sentiment analysis, Survey participation rate

- **Notifications Delivery Dataset**
  - Purpose: Monitor notification effectiveness and access behavior.
  - Fields: notification_id, type (Article, Event, Group), audience (JSON), created_at, user_id (via UserNotification), accessed.
  - Format: JSON / CSV
  - Use Case Examples: Notification Open Rate, Access rate by notification type, Notification delivery heatmap, Unread rate per student program/department, and Targeting effectiveness (measure which audience segments are more responsive). 


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