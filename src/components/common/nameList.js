import React, {PropTypes, Component} from 'react';

import _ from 'lodash';

class NameList extends Component {

  getStyles(){

    const name = {
      float: 'left',
      color: '#27ae60',
      backgroundColor: '#ecf0f1',
      margin: 10,
      borderRadius: 5,
      padding: 5
    };

    return {
      ownerName: {
        ...name
      },

      userName: {
        ...name
      }
    }
  }


  render() {

    let styles = this.getStyles();

    let {users, ownerName} = this.props;

    return (
      <div>
        <div style={styles.ownerName}>{ownerName}</div>
        {_.map(users, (u, k)=>
          <div style={styles.userName} key={k}>{u}</div>
        )}
      </div>
    )
  }
}

NameList.propTypes = {
  users: PropTypes.object,
  ownerName: PropTypes.string
};

export default NameList;
