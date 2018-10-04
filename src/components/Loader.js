import React from 'react';

const Loader = () => {
	return (
		<div className='container'>
			<img className='loading-icon' alt='loading-icon' src='/images/loading-icon.gif'/>
			<span className='loading-message'>Fetching your Magic Carpet</span>
		</div>
	)
}

export default Loader
