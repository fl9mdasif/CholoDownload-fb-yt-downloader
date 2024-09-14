
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';

const app = express();
const port = 5000;

// Middleware
app.use(cors());
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
            return res.status(response.status).send('Error fetching video download link');
        }

        const result = await response.json();
        console.log('API response:', result);

        const videoDownloadUrl = result.links || result.videoUrl;

        if (videoDownloadUrl) {
            res.json({ downloadUrl: videoDownloadUrl });
        } else {
            res.status(400).send('Unable to retrieve Facebook video URL');
        }
    } catch (error) {
        console.error('Error downloading Facebook video:', error);
        res.status(500).send('Failed to download Facebook video');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', function (req, res) {
    res.send('Facebook, YouTube video downloader server');
});
