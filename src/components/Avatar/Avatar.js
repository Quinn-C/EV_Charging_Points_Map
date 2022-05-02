import { useAuth0 } from "@auth0/auth0-react";

function Avatar(){
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    return(
 
    isAuthenticated && (
      <div className="Avatar">
        <img className="topAvatar" src={user.picture} alt={user.name}/>
      </div>
    )
    
    )
}

export default Avatar;