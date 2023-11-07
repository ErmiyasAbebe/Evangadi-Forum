import { useContext, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./Pages/SignUp/SignUp";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";
import AskQuestion from "./Pages/AskQuestion/AskQuestion";
import AnswerQuestion from "./Pages/Answer/AnswerQuestion";

function App() {
  const [userData, setUserData] = useContext(UserContext);

  const checkLoggedIn = async () => {
    // Check if token already exists in local storage
    let token = localStorage.getItem("auth-token");
    if (token === null) {
      localStorage.setItem("auth-token", ""); // Set an empty auth token in local storage
      token = "";
    } else {
      try {
        const userRes = await axios.get("http://localhost:4000/api/users", {
          headers: { "x-auth-token": token },
        });
        setUserData({
          token,
          user: {
            id: userRes.data.data.user_id,
            display_name: userRes.data.data.user_name,
          },
        });
      } catch (error) {
        // Handle errors here, e.g., invalid token or network issues
        console.error("Error checking user login:", error);
        // You might want to log the user out or display an error message to the user.
      }
    }
  };

  const logout = () => {
    try {
      setUserData({
        token: undefined,
        user: undefined,
      });
      localStorage.setItem("auth-token", "");
    } catch (error) {
      // Handle the error here
      console.error("Error while logging out:", error);
    }
  };

  useEffect(() => {
    // checkLoggedIn();
  }, []);
  return (
    <Router>
      <Header logout={logout} />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home logout={logout} />} />
        <Route path="/askQuestion" element={<AskQuestion />} />
        <Route path="/answer/:questionId" element={<AnswerQuestion />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
