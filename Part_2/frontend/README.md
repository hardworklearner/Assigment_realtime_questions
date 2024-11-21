# Quiz Platform Frontend

This is the frontend of the Quiz Platform, a web application for hosting and participating in quizzes. The application provides a real-time experience using WebSocket for leaderboards, quiz navigation, and user interaction.

## Table of Contents

- [Quiz Platform Frontend](#quiz-platform-frontend)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies](#technologies)
  - [Setup](#setup)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Available Scripts](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run build`](#npm-run-build)
  - [Folder Structure](#folder-structure)
  - [Environment Variables](#environment-variables)
  - [Contributing](#contributing)
  - [License](#license)

---

## Features

- **User Authentication:** Login and Signup pages with validation.
- **Real-Time Leaderboard:** Displays scores updated in real-time using WebSocket.
- **Quiz Selection:** Select a quiz from a list of available quizzes.
- **Dynamic Question Navigation:** Progress through questions with immediate feedback.
- **Responsive Design:** Optimized for desktop and mobile devices.

---

## Technologies

- **React** - JavaScript library for building user interfaces.
- **Socket.IO** - Real-time communication for live leaderboard updates.
- **Axios** - HTTP client for API calls.
- **Bootstrap** - UI design for responsive and styled components.
- **CSS Modules** - Modular styling for scoped and maintainable CSS.

---

## Setup

### Prerequisites

- Node.js >= 14.x installed on your system.
- The backend of this application should be running to handle API requests.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/frontend.git
   cd frontend
   ```

````
2. Install dependencies
```bash
npm install
````

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:

```bash
REACT_APP_API_URL=http://localhost:3000/api
REACT_APP_WEBSOCKET_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm start
```

The app will be available at [http://localhost:3001](http://localhost:3001/).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.
Open [http://localhost:3001](http://localhost:3001/) to view it in the browser.

### `npm test`

Launches the test runner.

### `npm run build`

Builds the app for production to the `build` folder. It bundles React in production mode and optimizes the build for best performance.

## Folder Structure

```txt
frontend/
├── public/                 # Public assets
│   ├── index.html          # Main HTML file
│   └── favicon.ico         # Favicon
├── src/                    # Application source code
│   ├── components/         # Reusable React components
│   │   ├── HomePage.js     # Main homepage component
│   │   ├── QuizPage.js     # Quiz page with questions
│   │   ├── Leaderboard.js  # Leaderboard component
│   │   └── Auth/           # Authentication components
│   ├── services/           # API integration logic
│   │   ├── api.js          # Axios setup for backend interaction
│   └── App.js              # Main React application
├── .env                    # Environment configuration
├── package.json            # Dependencies and project metadata
└── README.md               # This file
```

## Environment Variables

- `REACT_APP_API_URL` - Base URL for the backend API.
- `REACT_APP_WEBSOCKET_URL` - WebSocket URL for real-time updates.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch with your feature/bugfix.
3.  Commit and push your changes.
4.  Submit a pull request for review.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

``You can copy and save this content in a file named `README.md` in your frontend project folder. Let me know if you'd like me to generate additional documentation or files!``
