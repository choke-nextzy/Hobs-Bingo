import IUserProfile from "../interfaces/IUser";
import "../styles/Profile.scss";
import profileBackground from "../assets/backgrounds/profile-background.png";
import QRCode from "qrcode.react";
import { useEffect, useState } from "react";

function Profile({
  userProfile,
  lineToken,
}: {
  userProfile: IUserProfile | null;
  lineToken: string;
}) {
  const userId = userProfile?.userId ? userProfile.userId : "";

  return (
    <div className="profile">
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
                <h3>{userProfile.userId}</h3>
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
              <p>{lineToken}</p>
              <div className="qr-code">
                <QRCode
                  value={userId}
                  size={240}
                  level={"L"}
                  // imageSettings={{
                  //   src:binproLogo,
                  //   height: 65,
                  //   width: 65,
                  //   excavate: true,
                  // }}
                />
                {/* <QRCode
                      value={userProfileJSON}
                      logoImage={profileBackground}
                      size={300}
                      logoWidth={100}
                    /> */}
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
