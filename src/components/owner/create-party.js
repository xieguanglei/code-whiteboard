import React, {PropTypes, Component} from 'react';

import {Form, FormGroup, FormControl, ControlLabel, Button, Col} from 'react-bootstrap';

class CreateParty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      partyName: '',
      ownerName: ''
    }
  }

  doChange(key, val) {
    let source = {};
    source[key] = val;
    this.setState(source);
  }

  doSubmit() {
    let {onSubmit} = this.props;
    onSubmit(this.state);
  }

  getStyles() {
    return {
      container: {
        position: 'absolute',
        width: 400,
        height: 300,
        top: '50%',
        left: '50%',
        marginLeft: -200,
        marginTop: -150
      },
      title: {
        marginBottom: 40
      },
      submitButton: {
        float: 'right',
        marginRight: 20
      }
    }
  }

  render() {

    let styles = this.getStyles();

    let {partyName, ownerName} = this.state;

    return (
      <div style={styles.container}>
        <h3 style={styles.title}>创建派对</h3>
        <Form horizontal>

          <FormGroup>
            <Col componentClass={ControlLabel} md={3}>
              派对的名字
            </Col>
            <Col md={9}>
              <FormControl type="text" placeholder="派对的名字"
                           value={partyName}
                           onChange={e=>this.doChange('partyName', e.target.value)}/>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col componentClass={ControlLabel} md={3}>
              你的名字
            </Col>
            <Col md={9}>
              <FormControl type="text" placeholder="你的名字"
                           value={ownerName}
                           onChange={e=>this.doChange('ownerName', e.target.value)}/>
            </Col>
          </FormGroup>
        </Form>

        <Button bsStyle="primary" style={styles.submitButton} onClick={()=>this.doSubmit()}>提交</Button>
      </div>
    )
  }
}

CreateParty.propTypes = {
  onSubmit: PropTypes.func
};

export default CreateParty;
