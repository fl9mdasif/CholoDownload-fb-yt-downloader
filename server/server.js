
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fetch from 'node-fetch';
import ytdl from 'ytdl-core'

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
    // console.log(`Received request to download Facebook video: ${url}`);

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
  
    console.log(`Received request to download YouTube video for url: ${url}`);
  
    if (!url) {
      return res.status(400).send('URL is required');
    }
  
    try {
      // Get video information using ytdl-core
      const info = await ytdl.getInfo(url);
  
      // Extract the video formats and filter for video and audio streams
      const formats = ytdl.filterFormats(info.formats, 'videoandaudio');
      console.log(formats)
      
      const videoFormats = formats
        .filter(format => format.container === 'mp4') // Filter mp4 formats (optional)
        .map(format => ({
          quality: format.qualityLabel || 'unknown', // Video quality label (e.g., 360p, 720p)
          itag: format.itag,                         // Unique identifier for the format
          mimeType: format.mimeType,                 // Type of video/audio (e.g., video/mp4)
          url: format.url                            // The direct download URL
        }));
         // Set headers for response
         res.setHeader('Content-Disposition', `attachment; filename="${info.title}.mp4"`);
         res.setHeader('Content-Type', 'video/mp4');
  
      // Send the response to the client with video details and formats
      res.json({
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0].url,
        formats: videoFormats
      });
    } catch (error) {
      console.error('Error fetching YouTube video:', error);
      res.status(500).send('Failed to download YouTube video');
    }
  });


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
