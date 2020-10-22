import React, { useState, useEffect } from "react";
import "../List/List.css";
import axios from "axios";

export default function List() {

    const [allInfo, setAllInfo] = useState("");
    const [restaurantId, setRestaurantId] = useState(""); 
    
    //get all restaurant info  
    useEffect(() => {
      async function getAllInfo() {
        let req = axios.get("https://cc14polyglottal-app.herokuapp.com/api/v1/restaurants/");
        let res = await req;
        let data = res.data;
        console.log(data);
        let temp = [];
        for (let key in data) {
          console.log(data[key]);
          temp.push(data[key]);
        }
        console.log(temp);
        setAllInfo(
          temp.map((el) => {
            return (
              <ul key={el[1]}>
                <li>ID: {el[1]}, Name: {el[0]}, Feature: {el[3]}</li>
              </ul>
            );
          })
        );
      }
      getAllInfo()
    } ,[])

    //get single restaurant info => jump to other page for detail 
    async function getSingleInfo() {
      console.log(restaurantId)
      const res = await axios.get(`https://cc14polyglottal-app.herokuapp.com/api/v1/restaurants/${restaurantId}`);
      const data = res.data;
      console.log(data);
      let temp = [];
      for (let key in data) {
        temp.push(data[key]);
      }
      console.log(temp);
    }
    

    return (
        <div className="container">
            <div className="box">
                {allInfo}
            </div>
            <div className="box">
              <label>
                <span>more info</span>
                <input type="text" name="id" className="textField" placeholder="restaurant ID here" onChange={e=>{console.log(e.target.value); setRestaurantId(e.target.value)}}></input>
              </label>
              <input type="submit" value="submit" onClick={getSingleInfo}/>
            </div>
        </div>

    )
}