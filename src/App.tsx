import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link, json } from "react-router-dom";
import IUserProfile from "./interfaces/IUser";
import liff from "@line/liff";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import axios from "axios";

export default function App() {
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(async () => {
        const lineToken: string | null = liff.getIDToken();
        const profile = await liff.getProfile();
        setUserProfile(profile);
      })
      .catch((e: Error) => {
        alert(e);
        setError(`${e}`);
      });
  });

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
