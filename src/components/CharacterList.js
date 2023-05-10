import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Character from './Character';
import Loading from './Loading';
import Error from './Error';

import { fetchChars } from '../redux/charSlice';

export default function CharacterList() {
	const [pageNumber, setPageNumber] = useState(1);
	const scrollObserver = useRef();

	const dispatch = useDispatch();
	const {
		data: characters,
		loading,
		error,
		hasMore,
	} = useSelector((state) => state.chars);

	useEffect(() => {
		dispatch(fetchChars(pageNumber));
	}, [pageNumber]);

	const lastCharacterElementRef = useCallback(
		(node) => {
			if (loading) return;
			if (scrollObserver.current) scrollObserver.current.disconnect();

			scrollObserver.current = new IntersectionObserver((entries) => {
				if (entries[0].isIntersecting && hasMore) {
					setPageNumber((prevPageNumber) => prevPageNumber + 1);
				}
			});

			if (node) scrollObserver.current.observe(node);
		},
		[loading, hasMore],
	);

	return (
		<>
			{error ? (
				<Error />
			) : (
				<div className='ui four column stackable grid'>
					{characters?.map((char, idx) => {
						if (characters.length === idx + 1) {
							return (
								<Character
									ref={lastCharacterElementRef}
									key={char.id}
									char={char}
								/>
							);
						} else {
							return <Character key={char.id} char={char} />;
						}
					})}

					{loading && <Loading />}
				</div>
			)}
		</>
	);
}
