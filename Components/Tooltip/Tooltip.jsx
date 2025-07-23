"use client";

import { Tooltip as ReactTooltip } from 'react-tooltip';
import 'react-tooltip/dist/react-tooltip.css';

const Tooltip = ({ id, message, children, place = "top", className = "" }) => {
  return (
    <>
      <div data-tooltip-id={id} data-tooltip-content={message} className={className}>
        {children}
      </div>
      <ReactTooltip
        id={id}
        place={place}
        style={{
          backgroundColor: '#22272d',
          color: '#ffffff',
          borderRadius: '8px',
          fontSize: '12px',
          padding: '6px 10px',
          maxWidth: '200px',
          zIndex: 9999
        }}
        border="#FFBF00"
        opacity={0.95}
        arrowColor="#2e353d"
      />
    </>
  );
};

export default Tooltip;
