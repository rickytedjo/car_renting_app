<br />
<div>
  <h3>Car Booking App</h3>

  <p>
    <strong>Aplikasi untuk melakukan pemesanan kendaraan</strong>
    <br /><br />
    <a href="https://github.com/rickytedjo/car_ui"><strong>Car UI here</strong></a>
  </p>
</div>

## Stacks
<div>
<a href="https://nestjs.com/">

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs&logoColor=white&style=for-the-badge)

</a>

<a href="https://www.postgresql.org/">

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white&style=for-the-badge)

</a>

<a href="https://supabase.com">

![Supabase](https://img.shields.io/badge/Supabase-000000?logo=supabase&logoColor=3ECF8E&style=for-the-badge)

</a>
</div>

## Prerequisites

Ensure you have the following installed:

1. **Node.js** (v18 or higher) - [Download Node.js](https://nodejs.org/)
2. **npm** (bundled with Node.js) or **Yarn** (latest version)
3. **PostgreSQL Database** (v13 or higher) - [Download PostgreSQL](https://www.postgresql.org/) or [Host It On Supabase](https://supabase.com/)
4. **Git** - [Download Git](https://git-scm.com/)


## 🚦 Instalasi

### 1. Clone the Repository

```bash
git clone https://github.com/rickytedjo/car_booking_app
cd car_booking_app
```
--- 
### 2. Install Dependencies

Run the following command to install required packages:

```bash
npm install
```

or if using Yarn:

```bash
yarn install
```
---
### 3. Environment Setup

Create a `.env` file in the root directory. Use the `.env.example` file as a template:

```bash
cp .env.example .env
```

Fill in the necessary environment variables in the `.env` file. For example:

```env
## APP
APP_NAME="APP_NAME" # Name of the application, used for identification
ENV="development" # Options: development, production, test
PORT=8000 # Port for the application to run on
API_PREFIX="api" # Left unchanged, used for routing
DEBUG="true" # Enable debug mode for development
timezone="UTC" # Set the timezone for the application

## DATABASE
DATABASE_URL= # Database connection string, format: postgresql://user:password@host:port/dbname
DATABASE_HOST= # Host of the database server
DATABASE_PORT= # Port of the database server, default is usually 5432 for PostgreSQL
DATABASE_NAME= # Name of the database to connect to
DATABASE_USER= # Username for the database connection
DATABASE_PASSWORD= # Password for the database user

# CORS
SECURITY_CORS_ORIGIN="http://localhost:3000,http://localhost:8000,http://localhost:5173" 
SECURITY_CORS_METHODS="GET,POST,PATCH,DELETE" # Allowed methods for CORS requests
SECURITY_CORS_ALLOWED_HEADERS="Content-Type,Authorization" # Allowed headers for CORS requests

FRONTEND_URL="http://localhost:3000" # URL of the frontend application, used for CORS and redirects, set default for UI

# AUTH
JWT_ACCESS_SECRET= # Secret key for signing JWT tokens, should be kept secret
JWT_ACCESS_EXPIRY= # Expiry time for access tokens, e.g., "1h" for 1 hour
```

---

### 4. Database Setup

#### a. Create the Database (Opsional)
Ensure PostgreSQL is running and create a new database for the application:

```sql
CREATE DATABASE your_database_name;
```

P.S: Prisma could create a new database automatically for you if it doesn't exist.

#### b. Run Database Migrations

Run the Prisma migrations to set up the database schema:

```bash
npx prisma migrate dev
```

---

### 5. Start the Application

Run the application in development mode:

```bash
npm run start:dev
```
---

### 6. Run the Frotend

To complement the API, the ui could be cloned from <a href="https://github.com/rickytedjo/car_ui">here</a>. You could setup the frontend based on the documentation i made for the linked repository.

Pada folder ui:
```bash
npm run dev
```

---

## API Documentation

The application comes with integrated Swagger documentation. After starting the server, visit:

```
http://localhost:<PORT>/api/docs
```

Here, `<PORT>` is the port specified in the `.env` file (default: 3000).

---

## Dummy User Data

Below is a table of the dummy users:

| Username   | Email                | Password   |
|------------|----------------------|------------|
| Corp 1     | corp1@email.com      | admin123   |
| Corp 2     | corp2@gmail.com      | admin123   |
| Car Admin  | admin@gmail.com      | admin123   |

---

## Database Design

<img src='pdm.png'>

---

## Kontak
Email: <rickyputra.tedjo@gmail.com>

Link Proyek: <https://github.com/rickytedjo/car_booking_app>