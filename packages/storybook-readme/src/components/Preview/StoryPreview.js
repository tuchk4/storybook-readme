import React from 'react';

export default props => (
  <div
    style={
      {
        // display: 'flex',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: '32px 0',
      }
    }
  >
    <div>{props.children}</div>
  </div>
);
