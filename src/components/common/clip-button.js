import React, {PropTypes, Component} from 'react';
import {Button} from 'react-bootstrap';

import Clipboard from 'clipboard';

class ClipButton extends Component {

  constructor(props){
    super(props);
    this.state = {
      justCopied: false
    }
  }

  componentDidMount(){
    let c = new Clipboard('#clip-url-button');

    c.on('success', e => {
      this.setState({justCopied: true});

      setTimeout(()=>{
        this.setState({justCopied: false});
      }, 2000);

      e.clearSelection();
    });
  }

  render() {
    let {value} = this.props;
    let {justCopied} = this.state;

    return (
      <Button id="clip-url-button" data-clipboard-text={value} bsSize="xsmall" bsStyle="primary" >
        {justCopied ? '已复制到剪切板' : '复制派对的链接'}
      </Button>
    )
  }
}

ClipButton.propTypes = {
  value: PropTypes.string
};

export default ClipButton;
