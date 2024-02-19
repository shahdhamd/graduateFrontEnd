import { TextField } from "@mui/material";
import './UserProfile.css'
const UserProfile = ({ userData }) => {


  console.log("userdata", userData);

  return (
    <div style={{ margin: 'auto' }} >
      <div className="profile">
        <div className="left_img" >
          <label htmlFor="upload-input">
            <div
              className="image"
            >
              <img src="images/leafLogo.jpg" alt="profile Image" />
            </div>
          </label>

        </div>

        <div
          className="right_form"
        >
          <form

          >
            <h2
              style={{
                textAlign: "right",
                fontSize: "35px",
                marginBottom: "20px",
              }}
            >
              بياناتي
            </h2>

            <div className="mb-3">
              <TextField
                type="email"
                label="البريد الإلكتروني"
                variant="outlined"
                style={{ width: "100%" }}
                value={userData && userData.email}
                InputProps={{
                  style: { direction: "rtl", padding: "10px" },
                }}
              />
            </div>

            <div className="mb-3">
              <TextField
                type="text"
                label="اسم المستخدم"
                variant="outlined"
                style={{ width: "100%" }}
                value={userData && userData.userName}
                InputProps={{
                  style: { direction: "rtl", padding: "10px" },
                }}
              />
            </div>

          </form>
        </div>
      </div>

    </div>
  );
};

export default UserProfile;
