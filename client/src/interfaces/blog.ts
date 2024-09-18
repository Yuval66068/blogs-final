export interface IBlogInput {
  title: string
  subtitle: string
  body: string  
  image: {
    alt: string;
    url: string;
  };
}

export interface IBlog extends IBlogInput {
  likes: string[]
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}