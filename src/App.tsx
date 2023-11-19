import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import IUserProfile from "./interfaces/IUser";
import liff from "@line/liff";
import Profile from "./pages/Profile";
import axios from "axios";

export default function App() {
  const [lineToken, setLineToken] = useState("");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await liff.init({
          liffId: import.meta.env.VITE_LIFF_ID,
        });

        const token = await liff.getIDToken();

        if (token) {
          setLineToken(token);
          // Example of making a POST request
          const response = await axios.post(`${import.meta.env.VITE_WAFFLE_API}/user/profile`, {
            lineToken: token,
          });

          // Handle the response if needed
          console.log(response.data);
        }

        const profile = await liff.getProfile();
        setUserProfile(profile);
      } catch (e) {
        setError(`${e}`);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Routes>
        <Route>
          <Route index element={<Profile userProfile={userProfile} />} />
        </Route>
      </Routes>
    </div>
  );
}
