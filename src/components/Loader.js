import React from 'react';

const Loader = () => {
	return (
		<div className='container'>
			<img className='loading-icon' alt='loading-icon' src='/images/loading-icon.gif'/>
			<p>fetching your ride</p>
		</div>
	)
}

export default Loader