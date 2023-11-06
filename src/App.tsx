import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import IUserProfile from "./interfaces/IUser";
import liff from "@line/liff";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

export default function App() {
  const [message, setMessage] = useState("");
  const [idToken, setIdToken] = useState<string|null>();
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState<IUserProfile | null>(null);

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID,
      })
      .then(async () => {
        const idToken = liff.getIDToken();
        setIdToken(idToken)
        const profile = await liff.getProfile();
        setUserProfile(profile);
      })
      .catch((e: Error) => {
        setError(`${e}`);
      });
  });

  return (
    <div>
      <Routes>
        <Route>
          <Route index element={<Profile userProfile={userProfile} idToken={idToken} />} />
        </Route>
      </Routes>
    </div>
  );
}
