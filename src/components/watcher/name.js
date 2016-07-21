import React, {PropTypes, Component} from 'react';

import {Form, FormGroup, FormControl, ControlLabel, Button, Col} from 'react-bootstrap';

class Name extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
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

    let {name} = this.state;

    let styles = this.getStyles();

    return (
      <div style={styles.container}>
        <h3 style={styles.title}>输入名字</h3>
        <Form horizontal>

          <FormGroup>
            <Col componentClass={ControlLabel} md={3}>
              你的名字
            </Col>
            <Col md={9}>
              <FormControl type="text" placeholder="你的名字"
                           value={name}
                           onChange={e=>this.doChange('name', e.target.value)}/>
            </Col>
          </FormGroup>
        </Form>

        <Button bsStyle="primary" style={styles.submitButton} onClick={()=>this.doSubmit()}>提交</Button>
      </div>
    )
  }
}

Name.propTypes = {
  onSubmit: PropTypes.func
};

export default Name;
