import React , {useState} from 'react'
import { collection , addDoc} from 'firebase/firestore';
import {db} from '../config_firebase'

function Edge_computing() {
    const [lati , setLatitude] = useState([]);
    const [longi , setLongitude] = useState([]);

    const addEdge = async(e) =>{
      e.preventDefault();

      //add data to database
      try{
        const docRef = await addDoc(collection(db , "edge_com") , {
          cameraLati: lati,
          cameraLongi: longi
        })
        console.log("Document written with ID: ", docRef.id)
      }
      catch(e){
        console.log("error adding document: ",e);
      }
    }

  return (
    <div>
      <h1>edge_computing</h1>
      <div>
        <input
          type="number"
          placeholder='latitude'
          onChange={(e) => setLatitude(parseFloat(e.target.value))}
        />
        <input
          type="number"
          placeholder='longitude'
          onChange={(e) => setLongitude(parseFloat(e.target.value))}
        />
        <button type="submit" onClick={addEdge}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default Edge_computing