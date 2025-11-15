export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  category: string;
  siteLocation: string;
  createdAt: string;
  videoUrl: string;  // ← this is required for the video player
}
