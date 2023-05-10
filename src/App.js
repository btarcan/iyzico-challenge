import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Detail from './pages/Detail';

export default function App() {
	return (
		<div className='ui container' style={{ margin: '16px 0' }}>
			<BrowserRouter>
				<Routes>
					<Route exact path='/' element={<Home />} />
					<Route path='character-detail/:id' element={<Detail />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}
