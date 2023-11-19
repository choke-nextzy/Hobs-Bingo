import IUserProfile from "../interfaces/IUser";
import "../styles/Profile.scss";
import profileBackground from "../assets/backgrounds/profile-background.png";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";
import axios from "axios";

function Profile({ userProfile }: { userProfile: IUserProfile | null }) {
  const userId = userProfile?.userId ? userProfile.userId : "";

  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post("https://cab0-2001-fb1-73-f45-196b-b370-754b-98a8.ngrok-free.app/user/profile", {
          lineToken: "12322222",
        });

        setData(response.data); // Adjust this based on the response structure
      } catch (error: any) {
        setError(`Error making POST request: ${error.message}`);
      }
    };

    fetchData();
  }, []);

  return (
    // <div className="profile">
    //   {userProfile ? (
    //     <div>
    //       <img
    //         src={profileBackground}
    //         alt="profile-background"
    //         className="profile-background"
    //       />
    //       <img
    //         src={userProfile.pictureUrl}
    //         alt="profile-picture"
    //         className="profile-picture"
    //       />
    //       <div className="user-profile-data">
    //         <div className="user-info">
    //           <div>
    //             <p className="info-header">ชื่อสมาชิก</p>
    //             <h3>{userProfile.displayName}</h3>
    //             <p className="info-header">ยอดใช้จ่าย</p>
    //             <h3>5,000</h3>
    //           </div>
    //           <div>
    //             <p className="info-header">เลขสมาชิก/เบอร์โทรติดต่อ</p>
    //             <h3>081 234 5678</h3>
    //             <p className="info-header">คะแนนสะสมทั้งมหด</p>
    //             <h2>5,000</h2>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="qr-profile">
    //         <div>
    //           <p className="info-header">สแกนสะสมแต้มได้ที่นี่</p>
    //           <p className="info-time">23/12/2024 23:23</p>
    //           <div className="qr-code">
    //             <QRCode
    //               value={userId}
    //               size={240}
    //               level={"L"}
    //               // imageSettings={{
    //               //   src:binproLogo,
    //               //   height: 65,
    //               //   width: 65,
    //               //   excavate: true,
    //               // }}
    //             />
    //             {/* <QRCode
    //                   value={userProfileJSON}
    //                   logoImage={profileBackground}
    //                   size={300}
    //                   logoWidth={100}
    //                 /> */}
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   ) : (
    //     <div>
    //       <p>Loading user profile...</p>
    //       <div></div>
    //     </div>
    //   )}
    // </div>
    <div>
      <h1>Response from API</h1>
      {error && <p>{error}</p>}
      {data && (
        <pre>
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      )}
    </div>
  );
}

export default Profile;
