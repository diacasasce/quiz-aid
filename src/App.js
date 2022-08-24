import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Questions, Quiz, Review} from './pages'
import './App.css';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Questions/>}/>
			<Route path='/quiz' element={<Quiz />} />
			<Route path='/review/:QId' element={<Review />} />
		</Routes>
	);
}

export default App;