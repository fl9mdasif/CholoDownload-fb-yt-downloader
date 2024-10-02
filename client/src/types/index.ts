export interface TBlog {
  id: string;
  title: string;
  description: string;
  publish_date: string;
  author_name: string;
  blog_image: string;
  total_likes: string;
}


// Define the response interface for the Facebook video download
export interface FacebookDownloadResponse {
  title: string;
  thumbnail: string;
  links: {
    "Download High Quality"?: string;
    "Download Low Quality"?: string;
  };
}

export interface YoutubeDownloadResponse {
  title: string;
  thumbnail: string ;
  formats: Array<{
    quality: string;
    itag: number;
    mimeType: string;
    url: string;
  }>;
}