const express = require('express');
const axios = require('axios');
const filterMovies= require('./utils')
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Route to fetch movies based on input text
app.post('/search', async (req, res) => {
  console.log(req.body.movie)
  const text = req.body.movie;

  if (!text) {
    return res.status(400).json({ error: 'Movie name is missing' });
  }

  try {
    const OMDB_API_URL = `https://www.omdbapi.com/?s=${text}&apikey=8a72f225`;
    const response = await axios.get(OMDB_API_URL);

    if (response.data.Response === 'False') {
      return res.status(404).json({ error: response.data.Error });
    }
    let filtered_result = filterMovies(response.data.Search)
    res.json(filtered_result);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching data from OMDb' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
