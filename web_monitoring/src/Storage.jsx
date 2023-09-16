import React, { useEffect, useState } from 'react';
import { storage } from './config_firebase';
import { ref, list, getDownloadURL } from 'firebase/storage';
import './Storage.css';

function Storage() {
  const [rootFolders, setRootFolders] = useState([]);
  const [folderContents, setFolderContents] = useState({});

  useEffect(() => {
    const storageRef = ref(storage);

    list(storageRef)
      .then((res) => {
        const folderPaths = res.prefixes.map((prefix) => prefix.fullPath);
        setRootFolders(folderPaths);
        const folderContentsPromises = folderPaths.map(async (folderPath) => {
          const folder = ref(storage, folderPath);
          const itemsRes = await list(folder);
          const items = itemsRes.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: item.name, url };
          });
          return Promise.all(items).then((itemsWithUrls) => ({
            folderPath,
            items: itemsWithUrls,
          }));
        });
        return Promise.all(folderContentsPromises);
      })
      .then((results) => {
        const folderContentsObject = {};
        results.forEach((result) => {
          folderContentsObject[result.folderPath] = result.items;
        });
        setFolderContents(folderContentsObject);
      })
      .catch((error) => {
        console.error('Error listing folder contents:', error);
      });
  }, []);

  return (
    <div>
      <div className='table-header'>
        <div className='table-container'>
          <div className='logo-storage'>
            <a href="#">Storage</a>
          </div>
        </div>
      </div>
      {rootFolders.map((rootFolder, rootIndex) => (
        <div key={rootIndex}>
          <h2>Root Folder: {rootFolder}</h2>
          <ul>
            {folderContents[rootFolder] &&
              folderContents[rootFolder].map((item, index) => (
                <li key={index} style={{display:"flex" , justifyItems:"center" , alignItems:"center" , height:"300px" , paddingLeft:"360px"}}>
                  <h3>{item.name}</h3>
                  {item.url && (
                    <div>
                      <img src={item.url} alt={item.name} style={{maxWidth:'500px' , maxHeight:'500px'}}/>
                    </div>
                  )}
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Storage;
