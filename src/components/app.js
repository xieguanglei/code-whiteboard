import React, {PropTypes, Component} from 'react';
import _ from 'lodash';
import url from 'url';

import OwnerApp from './ownerApp';
import WatcherApp from './watcherApp';

function getClientSize() {
  return {
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  }
}

const WATCHER = 1;
const OWNER = 2;
const token = url.parse(location.href, true).query.party;
const role = token ? WATCHER : OWNER;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clientSize: getClientSize()
    }
  }

  componentDidMount() {
    this.sizeChangeListener = ()=> {
      this.setState({
        clientSize: getClientSize()
      })
    };
    window.addEventListener('resize', this.sizeChangeListener);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.sizeChangeListener);
  }

  getStyles() {

    let {clientSize: {width, height}} = this.state;

    return {
      container: {
        width: _.min([width, 1000]),
        height: height,
        marginLeft: 'auto',
        marginRight: 'auto',
        position: 'relative'
      }
    }
  }

  render() {

    let styles = this.getStyles();

    let {clientSize} = this.state;

    return (
      <div style={styles.container}>
        {
          role === OWNER ?
            <OwnerApp clientSize={clientSize}/> :
            <WatcherApp clientSize={clientSize} token={token}/>
        }
      </div>
    )
  }
}

App.propTypes = {
  someProp: PropTypes.array
};

export default App;
