<h1 id="top" align="center">GraphQL Weather and SpaceX Data Viewer</h1>
📒 This project showcases a full-stack application that combines a React frontend with a GraphQL backend, featuring weather data, SpaceX launch data, and access logging functionalities.

<br>
<br>

🚀 Features

- **GraphQL Backend**: Custom GraphQL API integrating REST and GraphQL sources.
- **React Frontend**: Interactive interface with authentication and data display.
- **Authentication**: JWT-based authentication system with login/logout functionality.
- **Access Logs**: Every API call and login attempt is logged into a MongoDB database.
- **Monorepo Structure**: Organized backend and frontend code in a single repository.

<br>

📚 Technologies Used

- **React**: for building the user interface.
- **GraphQL**: for creating a flexible and efficient API.
- **Apollo Client**: for interacting with the GraphQL API.
- **TypeScript**: for type-safe code in both backend and frontend.
- **MongoDB & Mongoose**: for data storage and schema modeling.
- **Jest**: for unit and integration testing.
- **Express**: for creating the GraphQL server.
- **JWT**: for handling authentication.
- **React Router**: for frontend routing.

🌐 APIs

- **SpaceX API**: Native GraphQL API for launch data.
- **OpenWeatherMap AP**I: REST API wrapped as a GraphQL layer for weather data.

## 🛠️ Running the Project Locally

### Backend Setup:
- Clone the repository.
- Navigate to the backend directory (`cd backend`)
- Run `npm install` to install dependencies.
- Decrypt the .env file (as a development environment, I will leave the master password here, otherwise it should be stored in a secure cloud service ☁️)
```bash
- openssl enc -d -aes-256-cbc -in .env.enc -out .env
- When prompted, enter the master password: h54U^%&Jf2dSF#$@FWS
- You should now have the .env file generated in the /backend folder
```
### Frontend Setup
- Navigate to the frontend directory (`cd frontend`)
- Run `npm install` to install dependencies.

### Running the Servers
- Backend Server: Run `npm start` in the backend directory.
- Frontend Server: Run `npm start` in the frontend directory.


### 🧪 Running Tests

#### Backend Tests
- Navigate to the backend directory. (`cd backend`)
- Run `npm test` to execute the tests.
#### Frontend Tests
- Navigate to the frontend directory. (`cd frontend`)
- Run `npm test` to execute the tests.

### 🔑 Authentication Details for using the app

The credentials are hardcoded for demonstration purposes.
- Username: admin
- Password: password

### 📈 `Access Logs` Querying

#### To query the access logs from *Postman* (authenticated query):

- After you logged into the app in your browser, go to the local storage of your browser and copy the JWT token from (`token` field)
- In Postman, choose 'Bearer Token' under the 'Authorization' tab and paste the token.
- Under the 'Body' tab, select 'GraphQL' and paste the following query:
```graphql
query getAccessLogs {
    accessLogs {
        query
        user
        accessedAt
    }
}
```
- URL of the query is `http://localhost:4000/graphql`, choose `POST` request and run the query 
- This will query the MongoDB database and you will see the access logs' data in Postman (**login**, **weather API** and **spaceX API** operations)

📋 Note

- All operations require authentication (JWT token)
- The application is built as a monorepo containing both backend and frontend code.
<br/>