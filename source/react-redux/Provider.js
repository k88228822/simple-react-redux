import React from 'react'
import ReactReduxContext from './connect/context'
import PropTypes from 'prop-types';
import Subscription from "./utils/Subscription";

export default class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      store: props.store,
      subscription: new Subscription(props.store),
    };
    this.previousState = props.store.getState()
  }

  componentDidMount() {
    this._isMounted = true
    this.state.subscription.trySubscribe();
    if (this.previousState !== this.props.store.getState()) {
      this.state.subscription.notifyNestedSubs();
    }
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    this.state.subscription.tryUnsubscribe();
    this._isMounted = false;
  }

  componentDidUpdate(prevProps) {
    if (this.props.store !== prevProps.store) {
      this.state.subscription.tryUnsubscribe();
      let subscription = new Subscription(this.props.store);
      this.setState({ store: this.props.store, subscription });
    }
  }

  render() {
    const { Context = ReactReduxContext, children } = this.props
    return <Context.Provider value={this.state}>{children}</Context.Provider>
  }
}

Provider.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }),
  context: PropTypes.object,
  children: PropTypes.any
};
