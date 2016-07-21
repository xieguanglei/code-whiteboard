import React, {PropTypes, Component} from 'react';

class Party extends Component {

  getStyles() {

    let {clientSize} = this.props;

    const headHeight = 30;
    const nameListHeight = 50;

    return {

      container: {
        overflow: 'hidden'
      },


      top: {
        height: headHeight,
        lineHeight: headHeight + 'px',
        paddingLeft: 5
      },
      main: {
        height: clientSize.height - headHeight
      },
      codeEditor: {
        marginRight: 405,
        height: '100%'
      },
      rightCol: {
        float: 'right',
        width: 400,
        height: '100%'
      },
      nameList:{
        height: nameListHeight
      },
      chat:{
        height: clientSize.height - headHeight - nameListHeight
      }
    }

  }

  render() {

    let styles = this.getStyles();

    let {children} = this.props;

    return (
      <div>
        <div style={styles.top}>
          你正在参加一场 party
        </div>
        <div style={styles.main}>
          <div style={styles.rightCol}>
            <div style={styles.nameList}>{children[1]}</div>
            <div style={styles.chat}>{children[2]}</div>
          </div>
          <div style={styles.codeEditor}>
            {children[0]}
          </div>
        </div>
      </div>
    )
  }
}

Party.propTypes = {
  children: PropTypes.node,
  clientSize: PropTypes.object
};

export default Party;
