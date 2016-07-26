import React, {PropTypes, Component} from 'react';

import {Form, FormGroup, FormControl, ControlLabel, Button, Col} from 'react-bootstrap';

import _ from 'lodash';

class Chat extends Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    }
  }

  doChangeMessage(message) {
    this.setState({message})
  }

  doHandleKeyPress(e) {
    if(e.charCode == 13) {
      e.preventDefault();
      this.doSendMessage();
    }
  }

  doSendMessage() {
    let {onMessage} = this.props;
    let {message} = this.state;
    if(message){
      onMessage(message);
      this.setState({
        message: ''
      })
    }
  }

  getStyles() {

    const {clientSize} = this.props;

    return {

      wrapper: {
        position: 'absolute',
        bottom: 10
      },

      messages: {
        height: clientSize.height - 150,
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#ecf0f1',
        position: 'relative'
      },

      message: {
        display: 'block',
        clear: 'both',
        marginBottom: 5
      },

      submitButton: {
        marginTop: -9
      }
    }
  }

  render() {

    const styles = this.getStyles();

    let {messages} = this.props;

    let {message} = this.state;

    return (
      <div>
        <div style={styles.messages}>
          <div style={styles.wrapper}>
            {
              _.map(messages, (m, i)=>
                <div key={i} style={styles.message}>
                  {`${m.name} 说：${m.message}`}
                </div>
              )
            }
          </div>
        </div>

        <Form horizontal>

          <FormGroup>
            <Col md={9}>
              <FormControl type="text" placeholder="发言"
                           value={message}
                           onChange={e=>this.doChangeMessage(e.target.value)}
                           onKeyPress={e=>this.doHandleKeyPress(e)}
              />
            </Col>
            <Col componentClass={ControlLabel} md={3}>
              <Button disabled={!message} bsStyle="primary" style={styles.submitButton} onClick={()=>this.doSendMessage()}>发送</Button>
            </Col>
          </FormGroup>
        </Form>

      </div>
    )
  }
}

Chat.propTypes = {
  messages: PropTypes.array,
  onMessage: PropTypes.func,
  clientSize: PropTypes.object
};

export default Chat;
