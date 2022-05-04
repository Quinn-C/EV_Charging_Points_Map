import Header from "../../components/Header/header.js";
import Map from "../../Map";
import "./MapPage.css";
import UserInfoWidget from "../../components/UserInfoWidget/UserInfoWidget.js";

const MapPage = () => {

  return (
    <div className="grid-container">
      <Header/>
      <Map/>
      <UserInfoWidget/>
    </div>
  );
};
export default MapPage;