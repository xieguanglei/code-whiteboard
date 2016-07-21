import React, {PropTypes, Component} from 'react';

class Blank extends Component {
  render() {
    return (
      <div>Blank</div>
    )
  }
}

Blank.propTypes = {
  someProp: PropTypes.array
};

export default Blank;
