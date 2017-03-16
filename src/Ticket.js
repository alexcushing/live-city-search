import React from 'react';

const Ticket = (props) => {
  return(
    <li className="ticket hover">
      {props.name}
    </li>
  )
}

export default Ticket;
