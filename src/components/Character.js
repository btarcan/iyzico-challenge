import React from 'react';
import { Link } from 'react-router-dom';

const Character = React.forwardRef(({ char }, ref) => {
	const { id, name, image } = char;

	return (
		<div ref={ref} className='column'>
			<Link to={`character-detail/${id}`}>
				<div className='ui link card'>
					<div className='image'>
						<img src={image} alt={name} />
					</div>
					<div
						className='header'
						style={{ textAlign: 'center', padding: '16px 0' }}>
						{name}
					</div>
				</div>
			</Link>
		</div>
	);
});

export default Character;
