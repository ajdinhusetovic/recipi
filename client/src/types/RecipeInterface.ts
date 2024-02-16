interface Recipe {
  id: number;
  name: string;
  image: string;
  tags: string[];
  user: {
    username: string;
  };
}

export default Recipe;
