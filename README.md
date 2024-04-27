# FitTrack

FitTrack is a project aimed at helping users track their fitness progress.

## Installation

To get started with FitTrack, follow these steps:

#### 1. Clone the repository:

git clone https://github.com/your-username/FitTrack.git

#### 2. Navigate to the root directory of the project:

cd FitTrack

#### 3. Start the Docker containers using Docker Compose:

docker-compose up --build

This command will create and start the database container, fill it with initial data, and start the API server.

#### 4. Start the UI part:

cd UI/fittrack-ui

ng serve

This command will start the Angular development server for the UI.

## Usage

Once the containers are up and the UI server is running, you can access FitTrack by navigating to `http://localhost:4200` in your web browser.

### Credentials

You can use the following credentials to log in as an existing user:

- Email: user@user.com
- Password: user12345




