import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	data: [],
	loading: false,
	error: false,
	hasMore: true,
};

let _pageNumber;

export const fetchChars = createAsyncThunk('fetchChars', async (pageNumber) => {
	const response = await axios({
		method: 'GET',
		url: 'https://rickandmortyapi.com/api/character',
		params: { page: pageNumber },
	});

	_pageNumber = pageNumber;
	return response.data;
});

const charsSlice = createSlice({
	name: 'chars',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchChars.pending, (state, action) => {
			state.loading = true;
			state.error = false;
		});

		builder.addCase(fetchChars.fulfilled, (state, action) => {
			state.data =
				_pageNumber === 1
					? action.payload.results
					: [...state.data, ...action.payload.results];
			state.loading = false;
			state.hasMore = !!action.payload.info.next;
		});

		builder.addCase(fetchChars.rejected, (state, action) => {
			state.loading = false;
			state.error = true;
		});
	},
});

export default charsSlice.reducer;
