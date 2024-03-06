import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import RecipePage from "./pages/RecipePage";
import Login from "./pages/Login";
import { CookiesProvider } from "react-cookie";
import UserProfile from "./pages/UserProfile";
import CreateRecipe from "./pages/CreateRecipe";
import Search from "./pages/Search";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <div className="bg-white">
          <Router>
            <Routes>
              <Route path="/" element={<Recipes />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/recipes/:slug" element={<RecipePage />} />
              <Route path="/users/:username" element={<UserProfile />} />
              <Route
                path="/recipes/create-recipe"
                element={<CreateRecipe mode="create" />}
              />
              <Route
                path="/recipes/edit/:slug"
                element={<CreateRecipe mode="edit" />}
              />
              <Route path="/recipes/search" element={<Search />} />
            </Routes>
          </Router>
          <Toaster />
        </div>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
