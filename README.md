x

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

#emp feature implmemetaion :appointment manager
this project implements the appointment scheduling and queue management for the emr system , satisfying all requirements of the sde intern assignment

The Codebase is split into:

1. backend/appointment_service.py : simulatin the appasync/lambda resolver logic
2. frontend/src/EMR_frontend_assignment.jsc: the main react component with full filtering and state updae logic
3. frontend/src/appointment_service.js: a javascript wrapper used for functional frontend simulatio and successful webpack.

# Task 5: Technical Explanation (AppSync/GraphQL Simulation)

This implementation is designed to simulate the Core Technology Stack of **React (Frontend)** calling **Python (Backend Lambda)** via **AppSync (GraphQL)**, backed by **Aurora (PostgreSQL)**.

### 1. GraphQL Contract Structure

The Python functions defined in `appointment_service.py` serve as the backend resolvers for the following GraphQL operations:

A. Query for Data Fetching (getAppointments)
This query retrieves a list of appointments, allowing for optional date and status filtering.

(graphql)
query GetAppointments($date: String, $status: AppointmentStatus) {
getAppointments(date: $date, status: $status) { # Fields returned from the Aurora/PostgreSQL data layer:
id
name
date
time
duration
doctorName
status
mode
}
}

B. Mutation for state change(updateAppoinmentStatus) this mutation handle updating the status of appointment("eg, to cancelled)
mutation UpdateAppointmentStatus($id: ID!, $newStatus: AppointmentStatus!) {
updateAppointmentStatus(id: $id, newStatus: $newStatus) {
id
status
}
}
