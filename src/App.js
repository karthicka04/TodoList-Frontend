import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import TodoList from "./components/TodoList";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import OAuth2RedirectHandler from "./components/OAuth2RedirectHandler";

function App() {
  return (
    <GoogleOAuthProvider clientId="334036309234-osevh6u6juq3oeptgu92bdmj1aka5k8g.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;