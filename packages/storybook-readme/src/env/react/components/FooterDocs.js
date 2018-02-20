import React from 'react';

export default props => (
  <div
    style={{
      borderTop: '1px dashed #e5e5e5',
      paddingTop: '16px',
    }}
  >
    {props.children}
  </div>
);
