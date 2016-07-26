import React, {PropTypes, Component} from 'react';
import _ from 'lodash';

import Login from './common/login';
import CreateParty from './owner/create-party';
import Party from './common/party';
import CodeEditor from './common/codeEditor';
import NameList from './common/nameList';
import Chat from './common/chat';
import ClipButton from './common/clip-button';
import login from './utils/login';

let STAGE_LOGIN = 1;
let STAGE_CREATEPARTY = 2;
let STAGE_PARTY = 3;

class OwnerApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: STAGE_LOGIN
    }
  }

  componentDidMount() {

    this.wdRef = login((err)=>{
      if(err) {
        alert('Fail to login');
      } else {
        this.setState({
          stage: STAGE_CREATEPARTY
        });
        //setTimeout(()=>{
        //  this.doCreateParty({partyName: 'party', ownerName: 'name'});
        //}, 500)
      }
    });
  }


  doCreateParty(party) {

    party = _.pick(party, ['partyName', 'ownerName']);
    party.codeText = '';
    party.users = {};
    party.messages = [];

    this.partyRef = this.wdRef.push(party, ()=> {
      this.setState({
        stage: STAGE_PARTY
      })
    });

    this.partyRef.on('value', s=> {
      this.setState(s.val())
    });

    this.partyRef.onDisconnect().remove();

  }

  doChangeCode(codeText) {
    this.setState({
      codeText
    }, ()=> {
      this.partyRef.child('codeText').set(codeText);
    });
  }

  doSubmitMessage(message) {
    let {ownerName: name, messages=[]} = this.state;
    this.partyRef.child('messages').set([...messages, {name, message}]);
  }

  render() {

    let {clientSize} = this.props;
    let {stage, codeText, users, ownerName, messages} = this.state;

    switch (stage) {
      case STAGE_LOGIN:
        return <Login/>;
      case STAGE_CREATEPARTY:
        return <CreateParty onSubmit={party=>this.doCreateParty(party)}/>;
      case STAGE_PARTY:
        return (
          <Party clientSize={clientSize}>
            <CodeEditor codeText={codeText} onChange={t=>this.doChangeCode(t)}/>
            <NameList ownerName={ownerName} users={users}/>
            <Chat clientSize={clientSize} messages={messages} onMessage={message=>this.doSubmitMessage(message)}/>
            <div>点击 <ClipButton value={`${location.href}?party=${this.partyRef.key()}`}/> 发给你的朋友们，请他们也来参加派对！</div>
          </Party>
        );
      default:
        return <div>None</div>;
    }
  }
}

OwnerApp.propTypes = {
  clientSize: PropTypes.object
};

export default OwnerApp;
