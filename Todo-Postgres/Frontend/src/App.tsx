import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./pages/LandingPage";
import { SignInPage } from "./pages/SignInPage";
import { SignUpPage } from "./pages/SignUpPage";
import { Dashboard } from "./pages/Dashboard";

function App() {
  return (
    <div className="bg-white h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LandingPage} />
          <Route path="/signin" Component={SignInPage} />
          <Route path="/signup" Component={SignUpPage} />
          <Route path="dashboard" Component={Dashboard} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
