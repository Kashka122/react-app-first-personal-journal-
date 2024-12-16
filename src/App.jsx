import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPAnel';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useEffect, useState } from 'react';


function App() {
	const [currentData, setData] = useState([]);
	
	useEffect(()=> {
		const data = JSON.parse(localStorage.getItem('data'));
		if(data){
			setData(data.map(pieceOfData =>{
				return {
					...pieceOfData,
					date: new Date(pieceOfData.date) 
				};
			}));
		}
	}, []);	

	useEffect(()=>{
		if(currentData.length){
			console.log('Запись');			
			localStorage.setItem('data', JSON.stringify(currentData));
		}		
	},[currentData]);

	const addData = (newData) =>{
		setData(oldData => [...oldData, {
			text: newData.text,
			title: newData.title,
			date: new Date(newData.date),
			id: oldData.length> 0 ? Math.max(...oldData.map(data => data.id)) + 1: 1
		}]);
	};
	
	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton></JournalAddButton>
				<JournalList data={currentData}/>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addData}/>
			</Body>			
		</div>
	);
}

export default App;
