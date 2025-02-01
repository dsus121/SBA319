//api.js - defining the api location and fetching the data

const axios = require('axios');

async function fetchData() {
  try {
    const response = await axios.get('https://trails.colorado.gov/api/v1/trails', {
      headers: {
        'Authorization': 'YOUR_API_KEY'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// calling the funtion
fetchData().then(data => console.log(data));

// shouldn't there be an export line here?
