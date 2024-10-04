export type Media = {
  type: 'video' | 'image';
  videoUrl: string;
  imageUrl: string;
  previewUrl: string;
};

export type FeedItem = {
  id: string;
  username: string;
  caption: string;
  media: Media;
  profilePhotoUrl: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
};
