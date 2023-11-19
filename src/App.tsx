import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import IUserProfile from "./interfaces/IUser";
import liff from "@line/liff";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import axios from "axios";

export default function App() {
  const [lineToken, setLineToken] = useState("");
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(async () => {
        const lineToken: string | null = liff.getIDToken();
        if (lineToken) {
          setLineToken(lineToken);
        }
        const profile = await liff.getProfile();
        setUserProfile(profile);
      })
      .catch((e: Error) => {
        setError(`${e}`);
      });

      fetchProfile(lineToken)
  },[]);

  const fetchProfile = async (lineToken:string) => {
      if (lineToken) {
        await axios.post(`${import.meta.env.VITE_WAFFLE_API}/user/profile`, {
          lineToken: lineToken,
        });
      }

  };
  return (
    <div>
      <Routes>
        <Route>
          <Route index element={<Profile userProfile={userProfile} lineToken={lineToken}/>} />
        </Route>
      </Routes>
    </div>
  );
}
