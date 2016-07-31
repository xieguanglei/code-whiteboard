import React, {PropTypes, Component} from 'react';

import CodeEditor from './common/codeEditor';
import Login from './common/login';
import Party from './common/party';
import Name from './watcher/name';
import NameList from './common/nameList';
import Chat from './common/chat';

import login from './utils/login';

const STAGE_LOGIN = 1;
const STAGE_NAME = 2;
const STAGE_PARTY = 3;

class WatcherApp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stage: STAGE_LOGIN
    }
  }

  componentDidMount() {

    this.wdRef = login((err)=> {
      if(err) {
        alert('Fail to login');
      } else {

        this.setState({
          stage: STAGE_NAME
        });

        this.partyRef = this.wdRef.child(this.props.token);
        this.partyRef.on('value', s=> {

          this.setState(s.val());
        });

      }
    });


    this.wdRef.on('child_removed', s=> {
      let party = s.val();
      let {partyName: p1, ownerName: o1} = party;
      let {partyName: p2, ownerName: o2} = this.state;
      if(p1 === p2 && o1 == o2) {
        this.setState({closed: true})
      }
    })
  }

  doSubmitName(e){

    if(!this.state.closed) {
      this.userRef = this.partyRef.child('users').push(e.name, ()=> {

        this.setState({
          stage: STAGE_PARTY,
          name: e.name
        });

        this.userRef.onDisconnect().remove();
      });
    }
  }

  doChangeCode(codeText) {

    if(!this.state.closed) {
      this.setState({
        codeText
      }, ()=> {
        this.partyRef.child('codeText').set(codeText);
      })
    }

  }

  doSubmitMessage(message) {

    if(!this.state.closed) {
      let {name, messages=[]} = this.state;
      this.partyRef.child('messages').set([...messages, {name, message}]);
    }

  }

  render() {

    let {clientSize} = this.props;

    let {stage, codeText, users, ownerName, messages, closed} = this.state;

    switch (stage){
      case STAGE_LOGIN:
        return <Login/>;
      case STAGE_NAME:
        return <Name onSubmit={(e)=>this.doSubmitName(e)}/>;
      case STAGE_PARTY:
        return(
          <Party clientSize={clientSize}>
            <CodeEditor codeText={codeText} onChange={t=>this.doChangeCode(t)}/>
            <NameList ownerName={ownerName} users={users}/>
            <Chat clientSize={clientSize} messages={messages} onMessage={message=>this.doSubmitMessage(message)}/>
            {
              closed ? <div style={{color: 'red'}}>举办者{ownerName}已离开，派对结束了。</div> :
                <div>你正在参加{ownerName}的派对。</div>
            }
          </Party>
        );
      default:
        return <div>None</div>
    }
  }
}

WatcherApp.propTypes = {
  someProp: PropTypes.array,
  token: PropTypes.string,
  clientSize: PropTypes.object
};

export default WatcherApp;
