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
          backgroundColor: '#2e353d',
          color: '#ffffff',
          border: '1px solid #454b57',
          borderRadius: '8px',
          fontSize: '12px',
          padding: '6px 10px',
          maxWidth: '200px',
          zIndex: 9999
        }}
        opacity={0.95}
        arrowColor="#2e353d"
      />
    </>
  );
};

export default Tooltip;
