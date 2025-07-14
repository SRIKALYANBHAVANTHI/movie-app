const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=YOUR_TMDB_API_KEY&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=YOUR_TMDB_API_KEY&query=';

const BACKEND_URL = 'http://localhost:3000';

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Load popular movies on page load
getMovies(APILINK);

// Fetch and display movies from TMDB
function getMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(data => {
            main.innerHTML = "";
            data.results.forEach(movie => {
                const { title, poster_path } = movie;

                const column = document.createElement('div');
                column.classList.add('column');

                const card = document.createElement('div');
                card.classList.add('card');

                const image = document.createElement('img');
                image.classList.add('thumbnail');
                image.src = poster_path ? IMG_PATH + poster_path : 'https://via.placeholder.com/250x300?text=No+Image';

                const movieTitle = document.createElement('h3');
                movieTitle.innerText = title;

                // Save button
                const saveBtn = document.createElement('button');
                saveBtn.innerText = "Save Movie";
                saveBtn.onclick = () => saveMovie({ title, poster: image.src, rating: 0, reviews: [] });

                card.appendChild(image);
                card.appendChild(movieTitle);
                card.appendChild(saveBtn);

                column.appendChild(card);
                main.appendChild(column);
            });
        })
        .catch(err => {
            main.innerHTML = `<p style="color:red;">Failed to load movies.</p>`;
            console.error(err);
        });
}

// Save movie to backend
function saveMovie(movie) {
    fetch(`${BACKEND_URL}/movies`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie),
    })
    .then(res => res.json())
    .then(data => alert(`Movie "${data.title}" saved!`))
    .catch(err => alert('Error saving movie'));
}

// Load saved movies from backend with reviews
function loadSavedMovies() {
    fetch(`${BACKEND_URL}/movies`)
        .then(res => res.json())
        .then(movies => {
            main.innerHTML = '';
            movies.forEach(movie => {
                const column = document.createElement('div');
                column.classList.add('column');

                const card = document.createElement('div');
                card.classList.add('card');

                const image = document.createElement('img');
                image.classList.add('thumbnail');
                image.src = movie.poster;

                const movieTitle = document.createElement('h3');
                movieTitle.innerText = movie.title;

                card.appendChild(image);
                card.appendChild(movieTitle);

                // Reviews section
                const reviewsDiv = document.createElement('div');
                reviewsDiv.classList.add('reviews');
                if(movie.reviews.length === 0) {
                  reviewsDiv.innerHTML = "<p>No reviews yet.</p>";
                }
                movie.reviews.forEach(review => {
                    const reviewEl = document.createElement('p');
                    reviewEl.innerHTML = `<strong>${review.username}</strong>: ${review.comment} (Rating: ${review.rating})`;
                    reviewsDiv.appendChild(reviewEl);
                });

                card.appendChild(reviewsDiv);

                // Review form
                const reviewForm = document.createElement('form');
                reviewForm.innerHTML = `
                    <input type="text" name="username" placeholder="Your name" required />
                    <input type="text" name="comment" placeholder="Your review" required />
                    <input type="number" name="rating" placeholder="Rating 1-10" min="1" max="10" required />
                    <button type="submit">Add Review</button>
                `;

                reviewForm.addEventListener('submit', e => {
                    e.preventDefault();
                    const formData = new FormData(reviewForm);
                    const reviewData = {
                        username: formData.get('username'),
                        comment: formData.get('comment'),
                        rating: Number(formData.get('rating'))
                    };

                    fetch(`${BACKEND_URL}/movies/${movie._id}/reviews`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(reviewData),
                    })
                    .then(res => res.json())
                    .then(updatedReviews => {
                        reviewsDiv.innerHTML = '';
                        updatedReviews.forEach(review => {
                            const reviewEl = document.createElement('p');
                            reviewEl.innerHTML = `<strong>${review.username}</strong>: ${review.comment} (Rating: ${review.rating})`;
                            reviewsDiv.appendChild(reviewEl);
                        });
                        reviewForm.reset();
                    })
                    .catch(err => alert('Error adding review'));
                });

                card.appendChild(reviewForm);

                column.appendChild(card);
                main.appendChild(column);
            });
        })
        .catch(err => {
            main.innerHTML = `<p style="color:red;">Failed to load saved movies.</p>`;
        });
}

// Search handler
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});
