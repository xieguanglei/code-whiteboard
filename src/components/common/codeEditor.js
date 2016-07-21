import React, {PropTypes, Component} from 'react';

import AceEditor from 'react-ace';

import 'brace';
import 'brace/mode/javascript';
import 'brace/theme/github';


const styles = {
  container: {
    border: '1px solid #aaa',
    height: '100%'
  }
};


class CodeEditor extends Component {

  render() {

    let {codeText, onChange} = this.props;

    return (
      <div style={styles.container}>
        <AceEditor
          mode="javascript"
          theme="github"
          onChange={onChange}
          name="example"
          width="100%"
          height="100%"
          value={codeText}
        />
      </div>
    )
  }
}

CodeEditor.propTypes = {
  codeText: PropTypes.string,
  onChange: PropTypes.func
};

export default CodeEditor;
