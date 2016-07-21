import React, {PropTypes, Component} from 'react';

const NAME_LIST = 1;
const CHAT_AREA = 2;


class Party extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentTab: CHAT_AREA
    }
  }

  doChangeTab(currentTab) {
    this.setState({currentTab})
  }

  getStyles() {

    const {clientSize} = this.props;
    const {currentTab} = this.state;

    const headHeight = 30;
    const padding = 5;
    const mainHeight = clientSize.height - headHeight;
    const packupHeight = 40;

    return {
      top: {
        height: headHeight,
        lineHeight: headHeight + 'px',
        paddingLeft: 5
      },
      main: {
        height: mainHeight,
        overflow: 'hidden'
      },
      codeEditor: {
        marginRight: 405,
        height: '100%',
        padding: padding
      },
      rightCol: {
        float: 'right',
        width: 400,
        height: '100%',
        padding: 5
      },
      nameList: {
        height: currentTab === NAME_LIST ? mainHeight - packupHeight - padding * 4 : packupHeight,
        overflow: 'hidden'
      },
      chat: {
        height: currentTab === CHAT_AREA ? mainHeight - packupHeight - padding * 4 : packupHeight,
        overflow: 'hidden'
      },

      tabButton: {
        height: packupHeight - padding * 2,
        lineHeight: packupHeight - padding * 2 + 'px',
        backgroundColor: '#3d566e',
        color: '#ecf0f1',
        textAlign: 'center',
        borderRadius: packupHeight * 0.3,
        cursor: 'pointer'
      }
    }
  }

  render() {

    let styles = this.getStyles();

    let {children} = this.props;
    const {currentTab} = this.state;

    return (
      <div>
        <div style={styles.top}>
          {children[3]}
        </div>
        <div style={styles.main}>
          <div style={styles.rightCol}>
            <div style={styles.nameList}>
              {
                currentTab === NAME_LIST ? children[1] :
                  <div onClick={()=>this.doChangeTab(NAME_LIST)} style={styles.tabButton}>展开名单</div>
              }
            </div>
            <div style={styles.chat}>
              {
                currentTab === CHAT_AREA ? children[2] :
                  <div onClick={()=>this.doChangeTab(CHAT_AREA)} style={styles.tabButton}>聊天</div>
              }
            </div>
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
  token: PropTypes.string,
  clientSize: PropTypes.object
};

export default Party;
