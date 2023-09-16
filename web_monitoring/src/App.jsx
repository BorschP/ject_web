import './App.css';
import React, { useState, useEffect } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { Icon } from 'leaflet';
import { collection, getDocs } from 'firebase/firestore';
import { BrowserRouter, NavLink, Routes, Route } from 'react-router-dom';
import Edge_computing from "./components_firebase/edge_computing";
import { db } from './config_firebase';
import { FiX, FiMenu,FiMap } from "react-icons/fi";
import Storage from './Storage';
import Warehouse from './Warehouse';

const centerPosition = [13.7563, 100.5018];
const minZoom = 6.254;
const maxZoom = 17;

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2709/2709353.png",
  iconSize: [38, 38]
});

const maxBounds = [
  [5.6128, 97.3447],
  [20.4659, 105.6364]
];

function App() {
  const [cameraData, setCamera] = useState([]);
  const [click, setClick] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'edge_com'));
      const fetchedData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCamera(fetchedData);
    }
    fetchData();
  }, []);

  const activeClassName = "nav-active";

  const closeMenu = () => setClick(false);

  return (
    <BrowserRouter>
      {/* <Edge_computing /> */}
      <div>
        <div className='header'>
          <div className='container'>
            <div className='header-con'>
            <div className='logo-container'>
              <a href="#">Area camera <FiMap/></a>
            </div>
            <ul className={click ? "menu active" : "menu"}>
              <li className='menu-link' onClick={closeMenu}>
                <NavLink end to="/" className={({ isActive }) => isActive ? activeClassName : undefined}>Home</NavLink>
              </li>
              <li className='menu-link' onClick={closeMenu}>
                  <NavLink to="/storage" className={({ isActive }) => isActive ? activeClassName : undefined}>Storage</NavLink>
              </li>
              <li className='menu-link' onClick={closeMenu}>
                  <NavLink to="/warehouse" className={({ isActive }) => isActive ? activeClassName : undefined}>Warehouse</NavLink>
              </li>
            </ul>
            <div className="menu-web" onClick={() => setClick(!click)}>
              {click ? (<FiX />) : (<FiMenu/>)}
            </div>
            </div>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<MapContainerComponent cameraData={cameraData} />} />
          <Route path="/storage" element={<Storage />} />
          <Route path="/warehouse" element={<Warehouse />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function MapContainerComponent({ cameraData }) {
  return (
    <MapContainer center={centerPosition} zoom={13} style={{ width: '100%' }} minZoom={minZoom} maxZoom={maxZoom} maxBounds={maxBounds}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="OpenStreetMap" />
      {cameraData.map((cameraData, index) => (
        <Marker key={index} position={[cameraData.cameraLati, cameraData.cameraLongi]} icon={customIcon}>
          <Popup>
            {cameraData.cameraLati} , {cameraData.cameraLongi}
          </Popup>
        </Marker>
      ))}
      {/* {cameraData.map((cameraData , index) => (
          <Circle key={index} center={[cameraData.cameraLati , cameraData.cameraLongi]} radius={50000} color="green" fillColor="red" fillOpacity={0.2} >
            <Popup>
              Emergency
            </Popup>
          </Circle>
        ))
        }  */}
    </MapContainer>
  );
}

export default App;
