import { Link } from "react-router-dom";
import IUserProfile from "../interfaces/IUser";
import "../styles/Profile.scss";
import prfileArrowIcon from "../assets/icons/profile-arrow-icon.png";
import profileBackground from "../assets/backgrounds/profile-background.png";
import QRCode from "qrcode.react";

function Profile({
  userProfile,
  idToken,
}: {
  userProfile: IUserProfile | null;
  idToken: string | null | undefined;
}) {
  const userProfileJSON = JSON.stringify({
    ...userProfile,
    ...{ idToken: idToken },
  });
  return (
    <div className="profile">
      <div className="navbar">
        <Link to="/" className="back-link">
          <img src={prfileArrowIcon} alt="Back to /" className="back-arrow" />
        </Link>
        <p className="nav-text">บัตรของฉัน</p>
      </div>

      {userProfile ? (
        <div>
          <img
            src={profileBackground}
            alt="profile-background"
            className="profile-background"
          />
          <img
            src={userProfile.pictureUrl}
            alt="profile-picture"
            className="profile-picture"
          />
          <div className="user-profile-data">
            <div className="user-info">
              <div>
                <p className="info-header">ชื่อสมาชิก</p>
                <h3>{userProfile.displayName}</h3>
                <p className="info-header">ยอดใช้จ่าย</p>
                <h3>5,000</h3>
              </div>
              <div>
                <p className="info-header">เลขสมาชิก/เบอร์โทรติดต่อ</p>
                <h3>081 234 5678</h3>
                <p className="info-header">คะแนนสะสมทั้งมหด</p>
                <h2>5,000</h2>
              </div>
            </div>
          </div>
          <div className="qr-profile">
            <div>
              <p className="info-header">สแกนสะสมแต้มได้ที่นี่</p>
              <p className="info-time">23/12/2024 23:23</p>
              <div className="qr-code">
                <QRCode value={userProfileJSON} size={240} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>Loading user profile...</p>
          <div></div>
        </div>
      )}
    </div>
  );
}

export default Profile;
