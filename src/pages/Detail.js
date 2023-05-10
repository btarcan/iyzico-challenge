import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';

import useFetchEpisodes from '../hooks/useFetchEpisodes';

const Detail = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: characters } = useSelector((state) => state.chars);

	if (characters.length === 0) navigate(-1);

	const { name, image, location, episode } = characters.filter(
		(c) => c.id == id,
	)[0];

	const { episodes } = useFetchEpisodes(episode);

	return (
		<>
			<button
				className='ui labeled icon button'
				onClick={() => navigate('/')}
				style={{ marginTop: '20px' }}>
				<i className='left chevron icon'></i>
				Back
			</button>
			<div className='ui text container'>
				<div className='ui segments'>
					<div className='ui segment'>
						<div className='ui centered card' style={{ minWidth: '400px' }}>
							<div className='image'>
								<img src={image} alt={name} />
							</div>
							<div className='content'>
								<div className='header'>{name}</div>
								<div className='meta'>{location.name}</div>
								<div className='description'>Last 5 Episodes</div>
								{episodes?.map((ep, idx) => {
									return (
										<div key={idx} className='meta'>
											{ep}
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Detail;
