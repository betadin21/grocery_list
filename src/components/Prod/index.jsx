import React, { Component } from "react";
import "../Prod/style.css";

class Prod extends Component {
  state = {
    text: this.props.text,
    id: this.props.id,
    editValue: this.props.text,
  };
  checkSign = (sign) => {
    if (sign.innerText === "✍️") {
       const item =  sign.closest(".item");
      item.querySelector(".item-btn").classList.add("none");
      item.querySelector(".item-text").classList.add("none");
      const editC = item.querySelector(".edit-container");
      editC.classList.add("active");
    } else if (sign.innerText === "❌") {
        const item =  sign.closest(".item");
        item.remove()
        // робота з localStorage
        let obj = JSON.parse(localStorage.getItem("rrodList"));
        let arr = obj.itemArr;
        const ind = arr.indexOf(item.querySelector(".item-text").innerText);
        arr.splice(ind, 1)
        localStorage.setItem("rrodList", JSON.stringify(obj))

        

    } else if (sign.innerText === "✅") {
        const item =  sign.closest(".item");
        const textLine = item.querySelector(".item-text")
        textLine.classList.toggle("line")

    }
  };
//   записую value інпута для редагування в state
  setEdidValue = (value) => {
    this.setState((state) => {
      return {
        ...state,
        editValue: value,
        text: value,
      };
    });
  };

  saveEditValue = (button) => {
    // робота з localStorage
    let obj = JSON.parse(localStorage.getItem("rrodList"));
    let arr = obj.itemArr;
    const ind = arr.indexOf(this.props.text);
     arr[ind] = this.state.editValue
     localStorage.setItem("rrodList", JSON.stringify(obj))
    //  
    const item = button.closest(".item");
    const editC = item.querySelector(".edit-container");
    editC.classList.remove("active");
    item.querySelector(".item-btn").classList.remove("none");
    item.querySelector(".item-text").classList.remove("none");
  };
  render() {
    return (
      
      <div className="item" data-id={this.props.id}>
        <div className="item-text">{this.state.text}</div>
        <div className="item-btn">
          <div
            data-id={this.props.id}
            className="sign"
            onClick={(e) => {
              this.checkSign(e.target);
            }}
          >
            ✍️
          </div>
          <div
            data-id={this.props.id}
            className="sign"
            onClick={(e) => {
              this.checkSign(e.target);
            }}
          >
            ❌
          </div>
          <div
            data-id={this.props.id}
            className="sign"
            onClick={(e) => {
              this.checkSign(e.target);
            }}
          >
            ✅
          </div>
        </div>

        <div className="edit-container" data-id={this.props.id}>
          <input
            value={this.state.editValue}
            onChange={(e) => {
              this.setEdidValue(e.target.value);
            }}
            className="edit-input"
            type="text"
          />
          <button onClick={(e) => {this.saveEditValue(e.target)}} className="save-btn">
            save
          </button>
        </div>
      </div>
    );
  }
}
export default Prod;
