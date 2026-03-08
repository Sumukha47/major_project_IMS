# PostgreSQL Setup Guide

You have two main ways to set up the database for the Institute Management System. **Method 1 (Docker)** is recommended as it keeps your Mac clean.

## Method 1: Using Docker (Recommended)
This method installs the database in a container. You don't need to manually install Postgres on your Mac.

1.  **Install Docker Desktop**:
    *   Download and install from [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/).
    *   Open Docker Desktop and ensure it is running.

2.  **Start the Database**:
    *   Open your terminal in the project root folder (`Institute_Management_system`).
    *   Run:
        ```bash
        docker-compose up -d
        ```
    *   This will download and start PostgreSQL and pgAdmin.

3.  **Access the Database**:
    *   **Port**: `5432`
    *   **Database Config**:
        *   Host: `localhost`
        *   Database: `ims_db`
        *   User: `admin`
        *   Password: `password123`
    *   **UI Tool (pgAdmin)**: Open [http://localhost:5050](http://localhost:5050)
        *   Login: `admin@ims.com` / `password123`

---

## Method 2: Native Mac Installation (Postgres.app)
If you prefer identifying installing it directly on your Mac.

1.  **Download Postgres.app**:
    *   Go to [postgresapp.com](https://postgresapp.com/).
    *   Download and move to Applications.

2.  **Initialize**:
    *   Open Postgres.app.
    *   Click "Initialize" to create a new server.
    *   Ensure it says "Running" on port 5432.

3.  **Create User & Database**:
    *   Double click the "postgres" database icon to open the terminal.
    *   Run the following SQL commands:
        ```sql
        CREATE USER admin WITH PASSWORD 'password123';
        CREATE DATABASE ims_db;
        GRANT ALL PRIVILEGES ON DATABASE ims_db TO admin;
        ```

## Next Steps
Once the database is running:
1.  We need to set up the **Node.js Backend** in the `backend/` folder to connect to this database.
2.  We will use an ORM like **Sequelize** or **Prisma** to manage tables.
