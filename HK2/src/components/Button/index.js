import React from 'react';

import './styles.css';

function Button({children, action, color, disabled}) {
  return <button disabled={disabled} className={`btn ${color && `btn-${color}`}`} onClick={() => action()}>{children}</button>
}

export default Button;