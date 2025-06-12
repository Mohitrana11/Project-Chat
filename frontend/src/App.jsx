import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import LoadingPage from "./components/other/LoadingPage";
import { Toaster } from "react-hot-toast";
import ChatApp from "./components/Designs/ChatArea/ChatApp";
import UserComponents from "./components/Designs/UserComponents";
import GroupApp from "./components/Designs/GroupApp";
import SideBar from "./components/Designs/SideBar";
const Home = lazy(() => import("./pages/Home"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));
const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingPage />}>
        <SideBar />
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/" element={<ChatApp />} />
          <Route path="/user" element={<UserComponents />} />
          <Route path="/group" element={<GroupApp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
