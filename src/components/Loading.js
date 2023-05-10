import React from 'react';

export default function Loading() {
	return (
		<div className='ui icon message'>
			<i className='notched circle loading icon'></i>
			<div className='content'>
				<div className='header'>Just a second</div>
				<p>We're fetching that content for you</p>
			</div>
		</div>
	);
}
