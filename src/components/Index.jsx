import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Loader from './Loader';

const mapStateToProps = state => ({
  categories: state.menu.categories,
  categoriesLoaded: state.menu.categoriesLoaded
});

class IndexDummyPage extends React.Component {
  componentDidMount() {
    this.redirect();
  }

  componentDidUpdate() {
    this.redirect();
  }

  redirect() {
    if (this.props.categoriesLoaded) {
      this.props.history.push(`/menu/${this.props.categories[0].name}`);
    }
  }

  render() {
    return <Loader />;
  }
}

IndexDummyPage.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ).isRequired,
  categoriesLoaded: PropTypes.bool.isRequired,
  history: PropTypes.shape().isRequired
};

export default compose(
  withRouter,
  connect(mapStateToProps, null),
)(IndexDummyPage);
