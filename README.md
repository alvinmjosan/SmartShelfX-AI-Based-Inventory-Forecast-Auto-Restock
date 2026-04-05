# SmartShelfX: AI-Based Inventory Forecast & Auto-Restock

![SmartShelfX](https://img.shields.io/badge/Project-SmartShelfX-blue.svg)
![React](https://img.shields.io/badge/Frontend-React_19-61dafb.svg?logo=react)
![Spring Boot](https://img.shields.io/badge/Backend-Spring_Boot_3.3-6db33f.svg?logo=spring)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1.svg?logo=mysql)

## 📌 Overview
**SmartShelfX** is an intelligent, full-stack inventory management solution designed to predict future stock requirements and automate the restocking process. By combining a robust Spring Boot backend with a dynamic React frontend, the system allows businesses to visualize inventory health, anticipate shortages through AI/predictive forecasting, and seamlessly manage auto-replenishment.

## 🏗️ Project Structure

The repository is divided into the following main components:

- **`/inventory-front`**: The React-based frontend application. Provides an interactive dashboard with data visualization (charts) and inventory management interfaces.
- **`/inventorymanagement`**: The Java-based backend application (`inventoryApplication`). It exposes RESTful APIs, handles business logic, and communicates with the database.
- **`SmartShelfX-Inventory-Forecast-and-Auto-Restock.pptx`**: A presentation deck detailing the project's architecture, AI models, and business use cases.

## 💻 Tech Stack

### Frontend (`inventory-front`)
- **Framework**: React.js (v19)
- **Routing**: React Router DOM
- **UI/Styling**: Bootstrap & React-Bootstrap
- **Data Visualization**: Chart.js & React-Chartjs-2
- **HTTP Client**: Axios

### Backend (`inventorymanagement/inventoryApplication`)
- **Framework**: Java 17 & Spring Boot 3.3.0
- **Database Access**: Spring Data JPA
- **Security**: Spring Security
- **Database**: MySQL Connector
- **Build Tool**: Maven

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites
- **Node.js**: (v16 or higher)
- **Java Development Kit (JDK)**: version 17
- **MySQL**: Running locally or remotely
- **Maven**: (Optional, as `mvnw` wrapper is included)

### 1. Setting up the Backend
1. Open a terminal and navigate to the backend application folder:
   ```bash
   cd inventorymanagement/inventoryApplication
   ```
2. Configure the database connection. Open `src/main/resources/application.properties` (or `.yml`) and ensure your MySQL credentials are correct:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/your_database_name
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *The backend server should now be running (default port is usually `8080`).*

### 2. Setting up the Frontend
1. Open a new terminal window/tab and navigate to the frontend folder:
   ```bash
   cd inventory-front
   ```
2. Install the necessary NPM packages:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   *Note: As per `package.json`, this app is configured to start on port `3838`. You can access it at [http://localhost:3838](http://localhost:3838).*

## ✨ Key Features
- **Real-Time Dashboard**: Visualize stock levels and trends using interactive charts.
- **Predictive Analytics**: Leverage AI-based forecasting to predict future inventory needs based on historical data.
- **Auto-Restocking Alerts**: Automated notifications and triggers when stock falls below calculated thresholds.
- **Secure Access**: Protected API endpoints and user authentication via Spring Security.

## 📄 License
This project is proprietary and intended for internal/academic use as part of the Infosys project scope.
