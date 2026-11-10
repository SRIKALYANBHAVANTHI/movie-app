# Movie Discovery, Favorites & Reviews

A small full-stack movie application with a browser-based interface and a Node.js/Express backend. It loads movie information from The Movie Database (TMDB), lets users save movies, and stores user reviews in MongoDB.

## Features

- Browse popular movies from TMDB.
- Search for movies using the movie search interface.
- Save a movie to the application's collection.
- Retrieve saved movies from the backend.
- Submit a review with a username, comment, and rating.
- Store movie records and embedded reviews in MongoDB.

## Tech stack

| Layer | Technologies |
|---|---|
| Frontend | HTML, CSS, JavaScript |
| Backend | Node.js, Express 5 |
| Database | MongoDB, Mongoose |
| External data | TMDB API |
| Middleware | CORS, dotenv |

## Project structure

```text
movie-app/
├── Backend/
│   ├── models/
│   │   └── Movie.js
│   ├── server.js
│   └── package.json
└── Frontend/
    ├── index.html
    ├── script.js
    └── style.css
```

## Backend setup

1. Install Node.js and MongoDB, then clone the repository.
2. Open a terminal in the backend directory.
   ```bash
   cd Backend
   npm install
   ```
3. Create a local `.env` file (do not commit it) and set your MongoDB connection string:
   ```env
   MONGO_URI=mongodb://127.0.0.1:27017/movie_app
   PORT=3000
   ```
4. Start the API:
   ```bash
   node server.js
   ```

The backend exposes these routes:

| Method | Route | Purpose |
|---|---|---|
| GET | `/movies` | Retrieve saved movies |
| POST | `/movies` | Save a movie |
| POST | `/movies/:id/reviews` | Add a review to a saved movie |

## Frontend setup

Serve the `Frontend/` directory with a local static web server and configure the TMDB API key in the frontend's movie discovery/search requests. The current implementation calls the backend at `http://localhost:3000`; update this base URL when deploying.

## Security and project notes

- Keep MongoDB connection strings and other credentials in local environment variables; never commit `.env` files.
- If a credential was committed in the past, rotate it. Removing a file from the latest commit does not erase it from Git history.
- Use a restricted, appropriately configured TMDB API key and review the frontend configuration before publishing.
- The current project uses local development URLs. Production deployment requires configuring the frontend and backend origins, CORS, and environment variables.
- The repository includes a GitHub Actions check that installs backend dependencies and validates backend JavaScript syntax. Automated application tests and production deployment configuration are not yet included.

---
Maintained by [Srikalyan Bhavanthi](https://github.com/SRIKALYANBHAVANTHI).