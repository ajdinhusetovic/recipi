import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Recipes from "./pages/Recipes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-white">
        <Router>
          <Routes>
            <Route path="/" element={<Recipes />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </div>
    </QueryClientProvider>
  );
}

export default App;
