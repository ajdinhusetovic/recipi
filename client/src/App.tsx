import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import RecipePage from "./pages/RecipePage";
import Login from "./pages/Login";
import { CookiesProvider } from "react-cookie";

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
              <Route path="/:slug" element={<RecipePage />} />
            </Routes>
          </Router>
          <Toaster />
        </div>
      </CookiesProvider>
    </QueryClientProvider>
  );
}

export default App;
