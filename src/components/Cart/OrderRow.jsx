import React from "react";
import {compose} from 'redux';
import {connect} from "react-redux";
import {withTranslation} from 'react-i18next';
import {toCurrency} from "../../utils";

class OrderRow extends React.Component {
  get row() {
    return this.props.row;
  }

  render() {
    return <div className={"row flex-row justify-content-start my-2 col"}>
      <div className={"col"}>
        <div className={"py-2"}>
          {this.row.name}
        </div>
      </div>
      <div className={"col-3 d-flex flex-row align-items-stretch"}>
        <div className={"btn btn-info disabled"}
             style={{"fontWeight": "bolder"}}>{this.row.count}</div>
      </div>
      <div className={"col-3 py-2 text-right"}>
        <span className={"pr-2"}>
          {this.props.t('cart-row-total')}
        </span>
        {toCurrency(this.row.totalPrice)}
      </div>
    </div>
  }
}

export default compose(
  withTranslation(),
  connect(null, null)
)(OrderRow);