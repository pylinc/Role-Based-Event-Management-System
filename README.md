# Role-Based Event Management Platform

A backend API for managing events with role-based access control. Supports three user roles: Admin, Organizer, and User (Student). Built with Node.js, Express, and MongoDB.

## Features

- User authentication and authorization with JWT
- Role-based access control (Admin, Organizer, User)
- Event creation, viewing, updating, and deletion
- User registration for events
- Secure password hashing with bcrypt
- Cookie-based authentication

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (JWT), bcrypt for password hashing
- **Other**: cookie-parser, dotenv for environment variables

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd role-based-event-management-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/event-management
   JWT_SECRET=your-secret-key
   ```

4. Start MongoDB (if running locally).

5. Run the application:
   - For development: `npm run dev`
   - For production: `npm run run`

## Usage

The API will be running on `http://localhost:5000` (or your configured PORT).

### API Endpoints

#### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get authenticated user info (requires auth)

#### Events
- `POST /api/event/create` - Create a new event (Admin/Organizer only)
- `GET /api/event/all` - View all events
- `GET /api/event/:id` - View a single event
- `PUT /api/event/update/:id` - Update an event (requires auth)
- `DELETE /api/event/deleteevent/:id` - Delete an event (requires auth)

#### User Actions
- `POST /api/user/register/:id` - Register for an event (User/Student only)
- `GET /api/user/viewallevents` - View all events (User/Student only)
- `GET /api/user/viewsingleevent/:id` - View a single event (User/Student only)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the ISC License.
