import React from "react";

const ProductCell = (props) =>
  <div className={"d-flex flex-column m-2"} style={{"maxWidth": '12em'}}>
    <div className={"d-flex"}>
      <img src={props.image} height="150" width="150"/>
    </div>
    <div className={"d-flex flex-row justify-content-between"}>
      <span>
        {props.name}
      </span>
      <span className={"px-1"}>
        {props.price}
      </span>
    </div>
    <div className={"d-flex"} style={{"fontSize": ".8em"}}>
      {props.description}
    </div>
  </div>
;

export default ProductCell;