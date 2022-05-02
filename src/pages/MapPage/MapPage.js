import Header from "../../components/Header/header.js";
import Map from "../../Map";

const MapPage = () => {

  return (
    <div className="map-page">
      <Header/>
      <Map className='map'/>
    </div>
  );
};
export default MapPage;