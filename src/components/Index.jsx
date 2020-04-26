import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

const mapStateToProps = state => ({
  categories: state.menu.categories,
  categoriesLoaded: state.menu.categoriesLoaded
});

class IndexDummyPage extends React.Component {
  _redirect() {
    if (this.props.categoriesLoaded) {
      this.props.history.push("/menu/" + this.props.categories[0].name);
    }
  }

  componentDidMount() {
    this._redirect();
  }

  componentDidUpdate() {
    this._redirect();
  }

  render() {
    return <div>Temp dummy page</div>;
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, null),
)(IndexDummyPage);