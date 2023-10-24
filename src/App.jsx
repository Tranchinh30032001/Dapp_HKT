import { lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Quest = lazy(() => import("./pages/Quest"));
const CreateQuest = lazy(() => import("./pages/CreateQuest"));
const DetailQuest = lazy(() => import("./pages/DetailQuest"));
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6WUIWxIapzeVrVKbmtN-oBEyQhmqtx7o",
  authDomain: "dapp-a403c.firebaseapp.com",
  projectId: "dapp-a403c",
  storageBucket: "dapp-a403c.appspot.com",
  messagingSenderId: "959980904328",
  appId: "1:959980904328:web:e0a5edb888f5ae3bbe643d",
  measurementId: "G-LQDFV4D3W7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function App() {
  return (
    <Suspense fallback={<div>Loadding...</div>}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/campaign" element={<Quest />} />
          <Route path="/campaign/create" element={<CreateQuest />} />
          <Route path="/campaign/detail/:id" element={<DetailQuest />} />
        </Routes>
      </Router>
    </Suspense>
  );
}

export default App;
