import React, { useState } from "react";
import { LoginSocialFacebook } from "reactjs-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";
const FacebookButton = () => {
  const [profile, setProfile] = useState(null);
  const [login, setLogin] = useState(false);

  return (
    <div>
      {!profile ? (
        <LoginSocialFacebook
          appId="501212999187816"
          onResolve={(response) => {
            console.log(response);
            setProfile(response.data);
          }}
          onReject={(error) => {
            console.log(error);
          }}
        ></LoginSocialFacebook>
      ) : (
        ""
      )}
      {profile ? (
        <div>
          <h1>{profile.name}</h1>
          <img src={profile.picture.data.url} alt="ProfilePic" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
export { FacebookButton, FacebookLoginButton };
