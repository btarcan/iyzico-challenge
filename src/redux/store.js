import { configureStore } from '@reduxjs/toolkit';
import charSlice from './charSlice';

export default configureStore({
	reducer: {
		chars: charSlice,
	},
});
