import React from 'react';
import PropTypes from 'prop-types';

export class RenderPropComponent extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          border: this.props.border,
        }}
        onMouseMove={this.handleMouseMove}
      >
        {this.props.children(this.state)}
      </div>
    );
  }
}

RenderPropComponent.defaultProps = {
  type: 'RenderProp Component',
  border: '1px solid red',
};

RenderPropComponent.propTypes = {
  /**
   * This is a Render Prop Component!
   */
  type: PropTypes.string.isRequired,

  /**
   * Border value
   */
  border: PropTypes.string.isRequired,
};

export const DisplayMouseCoordinates = ({ name, x, y }) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '1px solid black',
        width: '500px',
        height: '500px',
      }}
    >
      <div>{name}</div>
      <span>{`x: ${x}, y: ${y}`}</span>
    </div>
  );
};

DisplayMouseCoordinates.defaultProps = {
  name: 'DisplayMouseCoordinates Component',
};

DisplayMouseCoordinates.propTypes = {
  /**
   * Name of the component
   */
  name: PropTypes.string.isRequired,
  /**
   * Name of the component
   */
  x: PropTypes.number,
  /**
   * Name of the component
   */
  y: PropTypes.number,
};
