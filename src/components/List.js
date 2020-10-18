import React, { useState, useEffect } from "react";
import "../style/List.css";
import axios from "axios";
import { Button, Card, Form } from "react-bootstrap";

//list restaruant names
function List() {
  //get all restaurant info
  //more readable □
  const [allInfo, setAllInfo] = useState("");
  async function getAllInfo() {
    let http = "http://localhost:5000/api/v1/restaurants/";
    let req = axios.get(http);
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
          // <ul>
          //   <li>id:{el[1]}</li>
          //   <li>name:{el[0]}</li>
          //   <li>feature:{el[3]}</li>
          // </ul>
          <Card style={{ sidth: "18rem" }}>
            <Card.Body>
              <Card.Title>{el[0]}</Card.Title>
              <Card.Subtitle>{el[2]}</Card.Subtitle>
              <Card.Text>ID: {el[1]}</Card.Text>
            </Card.Body>
          </Card>
        );
      })
    );
  }

  //get id from placeholder
  const [readySingleInfo, setReadySingleInfo] = useState("");
  function toReadySingleInfo(e) {
    setReadySingleInfo(e.target.value);
  }
  console.log(readySingleInfo);
  //back single restaurant info when click button
  const [singleInfo, setSingleInfo] = useState("");
  async function toGetSingleInfo() {
    const http = "http://localhost:5000/api/v1/restaurants/" + readySingleInfo;
    const req = axios.get(http);
    const res = await req;
    const data = res.data;
    console.log(data);
    let temp = [];
    for (let key in data) {
      temp.push(data[key]);
    }
    console.log(temp);
    setSingleInfo(
      // <ul>
      //   <li>name: {temp[3]}</li>
      //   <li>feature: {temp[2]}</li>
      //   <li>place: {temp[4]}</li>
      //   <li>business hour: {temp[0]}</li>
      //   <li>business hour(evening): {temp[1]}</li>
      //   <li>regular holiday: {temp[5]}</li>
      //   <li>TELL: {temp[6]}</li>
      //   <li>URL: {temp[7]}</li>
      // </ul>
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{temp[3]}</Card.Title>
          <Card.Subtitle>{temp[2]}</Card.Subtitle>
          <ul>
            <li>place: {temp[4]}</li>
            <li>business hour: {temp[0]}</li>
            <li>business hour(evening): {temp[1]}</li>
            <li>regular holiday: {temp[5]}</li>
            <li>TELL: {temp[6]}</li>
            <li>URL: {temp[7]}</li>
          </ul>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="container">
      <h2>Get restaurant info</h2>
      <div className="box">
        <Form>
          <Form.Group controlId="formGetAllInfo">
            <Form.Label>Get all names</Form.Label>
          </Form.Group>
        </Form>
        <Button variant="info" type="submit" onClick={getAllInfo}>
          all
        </Button>
      </div>
      <p></p>
      <div className="box">
        <Form>
          <Form.Group controlId="formGetSingleInfo">
            <Form.Label>Get single restaurant</Form.Label>
            <Form.Control
              type="text"
              placeholder="restaurant id?"
              onChange={toReadySingleInfo}
            ></Form.Control>
          </Form.Group>
          {/* <Button variant="info" type="submit" onClick={toDelete}>
          delete
        </Button> */}
          {/* ボタンがFormの中にあるとつかえない？ */}
        </Form>

        <Button variant="info" type="submit" onClick={toGetSingleInfo}>
          single
        </Button>
      </div>
      <div className="card_base">
        <div>{allInfo}</div>
        <div>{singleInfo}</div>
      </div>
    </div>
  );
}

export default List;