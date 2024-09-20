
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 5000;

// Middleware
app.use(cors(
    {
        origin: ['http://localhost:3000'], // Replace with your frontend URL
        methods: ['GET', 'POST'], // Allowed methods
    }
));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Route to download Facebook videos using RapidAPI
app.post('/download/facebook', async (req, res) => {
    const { url } = req.body;
    console.log(`Received request to download Facebook video: ${url}`);

    if (!url) {
        return res.status(400).send('URL is required');
    }

    const rapidApiUrl = `https://facebook-reel-and-video-downloader.p.rapidapi.com/app/main.php?url=${encodeURIComponent(url)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c59fa6da1fmsh36998f6472f1db1p1f5dddjsn12731076672f', // Replace with your actual RapidAPI key
            'x-rapidapi-host': 'facebook-reel-and-video-downloader.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(rapidApiUrl, options);
        
        if (!response.ok) {
            console.error(`API response error: ${response.status} ${response.statusText}`);
            return res.status(response.status).send('Error fetching facebook video download link');
        }

        const result = await response.json();
        console.log('API response:', result);

        const videoDownloadUrl = result.links || result.videoUrl;

        if (result.success) {
            res.json({ data: result });
        } else {
            res.status(400).send('Unable to retrieve Facebook video URL');
        }
    } catch (error) {
        console.error('Error downloading Facebook video:', error);
        res.status(500).send('Failed to download Facebook video');
    }
});

app.post('/download/youtube', async (req, res) => {
    const { url } = req.body;

    console.log(`Received request to download YouTube video for url term: ${url}`);

    if (!url) {
        return res.status(400).send('URL is required');
    }

    // Extract video ID if it's a full YouTube URL
    let videoID = '';
    if (url.includes('youtu.be/')) {
        videoID = url.split('youtu.be/')[1];
    } else if (url.includes('youtube.com/watch?v=')) {
        videoID = new URL(url).searchParams.get('v');
    } else {
        // Assuming it's a raw video ID, like 'eBz5JwWMg3Q'
        videoID = url;
    }

    // Remove any additional parameters (like ?si=...) from the video ID
    videoID = videoID.split('?')[0];

    const rapidApiUrl = `https://youtube-audio-and-video-url.p.rapidapi.com/api/ytd/info?search=${encodeURIComponent(videoID)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'c59fa6da1fmsh36998f6472f1db1p1f5dddjsn12731076672f', // Replace with your actual RapidAPI key
            'x-rapidapi-host': 'youtube-audio-and-video-url.p.rapidapi.com'
        }
    };

    console.log('Requesting URL:', rapidApiUrl);
    console.log('With headers:', options.headers);

    try {
        const response = await fetch(rapidApiUrl, options);

        if (!response.ok) {
            console.error(`API response error: ${response.status} ${response.statusText}`);
            return res.status(response.status).send(`Error fetching YouTube video download link: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('API response:', result);

        if (result) {
            res.json({ data: result });
        } else {
            res.status(400).send('Unable to retrieve YouTube video URL');
        }
    } catch (error) {
        console.error('Error downloading YouTube video:', error);
        res.status(500).send('Failed to download YouTube video');
    }
});



// Not Found Middleware
app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: 'Resource not found',
    });
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.send('Facebook, YouTube video downloader server');
});
