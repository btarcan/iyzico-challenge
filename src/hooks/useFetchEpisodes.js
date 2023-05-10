import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';

export default function useFetchEpisodes(endpoints) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [episodes, setEpisodes] = useState([]);

	useEffect(() => {
		let cancel;

		setLoading(true);
		setError(false);

		axios
			.all(
				endpoints.map((endpoint) =>
					axios({
						method: 'GET',
						url: endpoint,
						cancelToken: new axios.CancelToken((c) => (cancel = c)),
					}),
				),
			)
			.then((res) => {
				const episodeNames = _.takeRight(
					res.map((r) => r.data).map((d) => d.name),
					5,
				);

				setEpisodes(episodeNames);
				setLoading(false);
			})

			.catch((e) => {
				if (axios.isCancel(e)) return;
				setError(true);
			});

		return () => cancel();
	}, [endpoints]);

	return { loading, error, episodes };
}
