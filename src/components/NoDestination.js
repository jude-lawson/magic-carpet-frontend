import React from 'react'
import Main from './Main';

const NoDestination = () => {
  let message = (
    <div className='no-destination-messages-container'>
      <span>Oops! It looks like there were no results with those settings.</span>
      <span>We would recommend widening the search settings using the Gear icon above and trying again.</span>
    </div>
  );
  return (
    <Main optionalMessage={message} />
  );
}

export default NoDestination;
