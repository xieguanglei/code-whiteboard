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
  }

  doSubmitName(e){
    this.userRef = this.partyRef.child('users').push(e.name, ()=>{

      this.setState({
        stage: STAGE_PARTY,
        name: e.name
      });

      this.userRef.onDisconnect().remove();
    });

  }

  doChangeCode(codeText) {
    this.setState({
      codeText
    }, ()=> {
      this.partyRef.child('codeText').set(codeText);
    })
  }

  doSubmitMessage(message) {
    let {name, messages=[]} = this.state;
    this.partyRef.child('messages').set([...messages, {name, message}]);
  }

  render() {

    let {clientSize} = this.props;
    let {stage, codeText, users, ownerName, messages} = this.state;

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
            <div>你正在参加一场 party</div>
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
