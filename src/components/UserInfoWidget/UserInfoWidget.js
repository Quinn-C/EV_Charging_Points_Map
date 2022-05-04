import React, { useState} from 'react'
import './UserInfoWidget.css';
import { useAuth0 } from "@auth0/auth0-react";

function UserInfoWidget(){
    const[infoWidget, setInfoWidget] = useState(false);

    function showWidget(){
        setInfoWidget(!infoWidget)
    }

    const { user, isLoading } = useAuth0();
    const { logout } = useAuth0();

    if (isLoading) {
      return <div>Loading ...</div>;
    }
    
    return(
        <div className="UserInfoWidget">
            <button className='Profile' onClick={showWidget}>
            UserInfo
            </button>
            <div className={infoWidget ? 'widget active':"widget"}>
                <img className="profilePic" src={user.picture} alt={user.name} />
                <h1 className="profileName">{user.name}</h1>
                <h2>Software Engineer</h2>
                <a href={window.location.origin}className='signout-button' onClick={() => logout({ returnTo: window.location.origin })}>
      Sign Out
    </a>

            </div>

        </div>
    )
}

export default UserInfoWidget;