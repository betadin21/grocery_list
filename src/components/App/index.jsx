import React from "react";
import { Component } from "react";

import Btn from "../Btn";
import Prod from "../Prod"

import "./style.css";

import { clickAdd } from "../../methods";

class App extends Component {
  state = {
    itemArr: !localStorage.getItem("rrodList") ? [] : JSON.parse(localStorage.getItem("rrodList")).itemArr,
    inputValue : "",
  };
  clickSave = () => {
    // записую value в масив
    let inputValue = document.querySelector(".input").value;
    if(inputValue !== ""){
      this.state.itemArr.push(inputValue);
    }

    // обнуляю value на сторінці
    this.setState((state)=>{
      return{
        ...state,
        inputValue : ""
      }
    })
    this.setStorage()
  }
  
  setValue = (e) => {
    this.setState((state)=>{
      return{
        ...state,
        inputValue : e
      }
    })
  }
   setStorage = () => {
    if(!localStorage.getItem("rrodList")){
      console.log("1");
      let data =this.state;
      localStorage.setItem("rrodList", JSON.stringify(data))
    }
    if(localStorage.getItem("rrodList")){
      let newObj = JSON.parse(localStorage.getItem("rrodList"));
      newObj = this.state;
      
      localStorage.setItem("rrodList", JSON.stringify(newObj))
    }

  }

 
  render() {
    return (
      <>
        <h1>Grocery List</h1>
        <div className="wrapper">
          <Btn value={"Add ✚"} click={clickAdd} />
          <div className="input-container">
            <input
              value={this.state.inputValue}
              onChange={(e)=>{this.setValue(e.target.value)}}
              className="input"
              type="text"
              placeholder="text the product, please"
            />
            <Btn value={"Save 📀"} click={this.clickSave} />
          </div>
          <div className="list">
            {!localStorage.getItem("rrodList") ? console.log("no") : JSON.parse(localStorage.getItem("rrodList")).itemArr.map((el,i)=> (<Prod arr ={JSON.parse(localStorage.getItem("rrodList")).itemArr} text={el} key={i} id={i}/>))}
          </div>
        </div>
      </>
    );
  }
}
export default App;
