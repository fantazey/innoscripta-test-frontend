import React from "react";

const ProductCell = (props) =>
  <div className={"d-flex flex-column m-2"} style={{"width": '10em'}}>
    <div className={"d-flex"}>
      <img src={props.image} height="150" width="150" alt={props.name}/>
    </div>
    <div className={"d-flex flex-column justify-content-between"}
         style={{"height": "6em"}}>
      <div className={"d-flex flex-row justify-content-between"}>
      <span title={props.description}>
        {props.name}
      </span>
      </div>
      <div className={"d-flex btn btn-info align-self-stretch justify-content-start"} onClick={props.add}>
        Add to cart
        <span className={"px-2 align-right"}>
          {props.price}
        </span>
      </div>
    </div>
  </div>
;

export default ProductCell;