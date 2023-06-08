import React from "react";



const Btn = ({click, value}) => {
  return (
    <>
      <button onClick={(e)=>{click(e.target.value)}}>{value}</button>
    </>
  );
};

export default Btn;
