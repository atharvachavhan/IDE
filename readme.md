# Algo Codie - Online Coding Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![MERN Stack](https://img.shields.io/badge/MERN-Stack-green.svg)](https://www.mongodb.com/mern-stack)
[![Dockerized](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

Algo Codie is a MERN (MongoDB, Express.js, React.js, Node.js) stack web application that serves as an online coding platform. It allows users to submit code for programming problems, securely runs and compiles the code remotely, and judges its correctness. The platform incorporates a leaderboard and submission history for users to track their progress and performance.

## Features

-   **Code Submission:** Users can submit code for various programming problems.
-   **Remote Execution:** Submitted code is executed remotely in a secure environment.
-   **Code Evaluation:** The platform automatically judges the correctness of the submitted code.
-   **Leaderboard:** Displays a ranked list of users based on their performance.
-   **Submission History:** Users can view their past submissions and results.
-   **Docker & Sandboxing:** Utilizes Docker and sandboxing techniques to ensure a secure execution environment.
-   **Redis Queue:** Implements Redis for efficient handling of multiple code execution requests using polling and queues.
-   **Horizontal Scaling:** Designed to support horizontal scaling for handling a large number of concurrent users.

## Project Structure

-   **`client/`**: Contains the React frontend code responsible for the user interface and interaction.
-   **`server/`**: Contains the Node.js/Express backend code that handles API requests, code execution, and database interactions.
-   **`controllers/`**: Manages the application logic for handling different routes and requests.
-   **`routes/`**: Defines the API endpoints and maps them to the corresponding controller functions.

## Local Setup

Follow these instructions to set up and run Algo Codie locally.

### Prerequisites

bash
    cd client
    3.  Start the client:

    bash
    cd server
    bash
    npm start    # or yarn start
    ### Docker Setup (Optional)

1.  Ensure Docker and Docker Compose are installed.

2.  Navigate to the project root directory (where `docker-compose.yml` is located).

3.  Run Docker Compose:

        This command builds and starts the application using Docker.  Access the application at the appropriate ports (e.g., `localhost:3000` for the client).

## Running the Application

After completing the client and server setup, the application should be running locally. You can access the platform through your web browser at [http://localhost:3000](http://localhost:3000).

## Contributing

We welcome contributions to Algo Codie! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Push your changes to your fork.
5.  Submit a pull request to the main repository.

> Please ensure your code follows the project's coding standards and includes appropriate tests.

## License
