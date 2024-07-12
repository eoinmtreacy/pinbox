import React from 'react';

const withHardLightBlend = (WrappedComponent) => {
  return (props) => (
    <div className="hard-light-blend">
      <WrappedComponent {...props} />
    </div>
  );
};

export default withHardLightBlend;