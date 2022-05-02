import React from 'react'
import dotenv from 'dotenv';
import { useState, useEffect } from "react";
import { GoogleMap, useJsApiLoader, Polyline, Marker, InfoWindow  } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '600px'
};

// center(lat, lng) - London
const center = {
  lat: 51.50809207487758, 
  lng: -0.16580527969423006
};

const velocity = 5

function Map() {
  let path1 = [
    { lat: 51.52566999076278, lng: -0.1782066559538719, distance: 0 },
    { lat: 51.5135062697378, lng: -0.16055927347597526, distance: 0 },
    { lat: 51.51338478954425, lng: -0.15864005157744596, distance: 0 },
  ]

  let path2 = [
    { lat: 51.502126290527045, lng: -0.17454285101472372, distance: 0 },
    { lat: 51.50360888121661, lng: -0.1748315498692015, distance: 0 },
    { lat: 51.506888380163566, lng: -0.17093411533375147, distance: 0 },
    { lat: 51.50738253077509, lng: -0.17035671762479587, distance: 0 },
    { lat: 51.510437161045076, lng: -0.17093411533375147, distance: 0 },
    { lat: 51.51133554273735, lng: -0.17281065788785702, distance: 0 },
  ]

  let path3 = [
    { lat: 51.511110948975144, lng: -0.15686004617795965, distance: 0 },
    { lat: 51.51394074946236, lng: -0.14199205517235397, distance: 0 },
  ]

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: (process.env.GOOGLE_MAP_API_KEY as string)
  })

  let initialDate = new Date()

  const [map, setMap] = React.useState<google.maps.Map | null>(null)
  const [progress, setProgress] = React.useState<{ lat: number; lng: number; distance: number; }[]>([])
  const [progress2, setProgress2] = React.useState<{ lat: number; lng: number; distance: number; }[]>([])
  const [progress3, setProgress3] = React.useState<{ lat: number; lng: number; distance: number; }[]>([])

  const [bMarkerClicked1, setBMarkerClicker1] = React.useState<boolean>(false)
  const [bMarkerClicked2, setBMarkerClicker2] = React.useState<boolean>(false)
  const [bMarkerClicked3, setBMarkerClicker3] = React.useState<boolean>(false)

  const [markerClicked2, setMarkerClicker2] = React.useState<boolean>(false)
  const [markerClicked3, setMarkerClicker3] = React.useState<boolean>(false)

  useEffect(() => {
    window.setInterval(() => moveObject(path1, 1), 1000)
    window.setInterval(() => moveObject(path2, 2), 1000)
    window.setInterval(() => moveObject(path3, 3), 1000)
  }, [] );

  // when google map loaded, start to update the distance
  const onLoad = React.useCallback(function callback(map : google.maps.Map) {
    setMap(map)
    path1 = UpdateDistance(path1)
    path2 = UpdateDistance(path2)
    path3 = UpdateDistance(path3)

    function UpdateDistance(path : {lat: number;lng: number;distance: number;}[]): { lat: number; lng: number; distance: number; }[] {
      return path.map((coordinates, i, array) => {
        if (i === 0) {
          return { ...coordinates, distance: 0 }; // it begins here! 
        }

        const { lat: lat1, lng: lng1 } = coordinates;
        const latLong1 = new window.google.maps.LatLng(lat1, lng1);

        const { lat: lat2, lng: lng2 } = array[0];
        const latLong2 = new window.google.maps.LatLng(lat2, lng2);

        // in meters:
        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          latLong1,
          latLong2
        );

        return { ...coordinates, distance };
      });
    }
  }, [])

  const onUnmount = React.useCallback(function callback(map : google.maps.Map) {
    setMap(null)
  }, [])

  const getDistance = () => {
    // seconds between when the component loaded and now
    const differentInTime = (new Date().getTime() - initialDate.getTime()) / 1000 // pass to seconds
    return differentInTime * velocity // d = v*t -- thanks Newton!
  }

  const moveObject = (path : {lat: number;lng: number;distance: number;}[], type: number) => {
    const distance = getDistance()
    if (! distance) {
      return
    }

    let progress = path.filter(coordinate => coordinate.distance < distance)

    const nextLine = path.find(coordinate => coordinate.distance > distance)
    if (! nextLine) {
      switch (type)
      {
        case 1:    
          setProgress(progress)
          break;
        case 2:    
          setProgress2(progress)
          break;
        case 3:    
          setProgress3(progress)
          break;
        default:
          break;
      }
      return // it's the end!
    }
    const lastLine = progress[progress.length - 1]

    const lastLineLatLng = new window.google.maps.LatLng(
      lastLine.lat,
      lastLine.lng
    )

    const nextLineLatLng = new window.google.maps.LatLng(
      nextLine.lat,
      nextLine.lng
    )

    // distance of this line 
    const totalDistance = nextLine.distance - lastLine.distance
    const percentage = (distance - lastLine.distance) / totalDistance

    const position = window.google.maps.geometry.spherical.interpolate(
      lastLineLatLng,
      nextLineLatLng,
      percentage
    )

    progress = progress.concat([{ lat: position.lat(), lng: position.lng(), distance: 0 }])
    switch (type)
    {
      case 1:    
        setProgress(progress)
        break;
      case 2:    
        setProgress2(progress)
        break;
      case 3:    
        setProgress3(progress)
        break;
      default:
        break;
    }
  }

  return isLoaded ? (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
          { progress && (
            <>
              <Polyline path={progress} options={{ strokeColor: "#FF0000 "}} />
              <Marker 
                position={progress[progress.length - 1]}
                onClick={() => {setBMarkerClicker1(!bMarkerClicked1)}}
                icon={{url: "/b.png",
                  scaledSize: new window.google.maps.Size(60, 60),
                  anchor: new google.maps.Point(30, 60),
                }}
              >
              </Marker>
            </>
          )}

          { progress2 && (
            <>
              <Polyline path={progress2} options={{ strokeColor: "#FF0000 "}} />
              <Marker 
                position={progress2[progress2.length - 1]}
                onClick={() => {setBMarkerClicker2(!bMarkerClicked2)}}
                icon={{url: "/b.png",
                  scaledSize: new window.google.maps.Size(60, 60),
                  anchor: new google.maps.Point(30, 60),
                }}
              >
              </Marker>
            </>
          )}

          { progress3 && (
            <>
              <Polyline path={progress3} options={{ strokeColor: "#FF0000 "}} />
              <Marker 
                position={progress3[progress3.length - 1]}
                onClick={() => {setBMarkerClicker3(!bMarkerClicked3)}}
                icon={{url: "/b.png",
                  scaledSize: new window.google.maps.Size(60, 60),
                  anchor: new google.maps.Point(30, 60),
                }}
              >
              </Marker>
            </>
          )}

          <Polyline path={bMarkerClicked1 ? path1 : []} options={{ strokeColor: "#0000FF "}} />
          <Polyline path={bMarkerClicked2 ? path2 : []} options={{ strokeColor: "#0000FF "}} />
          <Polyline path={bMarkerClicked3 ? path3 : []} options={{ strokeColor: "#0000FF "}} />

          <Marker 
            position={{ lat: 51.51048208064134, lng: -0.1859464563928953 }}
            onClick={() => setMarkerClicker2(true)}
            icon={{url: "/c.png",
              scaledSize: new window.google.maps.Size(30, 30),
              anchor: new google.maps.Point(15, 15),
            }}
          >
            {markerClicked2 && (
              <InfoWindow onCloseClick={() => setMarkerClicker2(false)}>
                <div className="InfoWindow">
                  <p>150kW DC</p>
                  <p>8/16 Available</p>
                </div>
              </InfoWindow>
            )}
          </Marker>

          <Marker 
            position={{ lat: 51.506484071131595, lng: -0.15238521393355403 }}
            onClick={() => setMarkerClicker3(true)}
            icon={{url: "/c.png",
              scaledSize: new window.google.maps.Size(30, 30),
              anchor: new google.maps.Point(15, 15),
            }}
          >
            {markerClicked3 && (
              <InfoWindow onCloseClick={() => setMarkerClicker3(false)}>
                <div className="InfoWindow">
                  <p>22kW AC</p>
                  <p>2/3 Available</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)