export interface Recipe {
  id: number;
  name: string;
  image: string;
  tags: string[];
  slug: string[];
  user: {
    username: string;
  };
}
