import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPAnel';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context.jsx';
import { useState } from 'react';

function mapData(data){
	if(!data) {
		return [];
	}
	return data.map(i=>({
		...i, 
		date:new Date(i.date)
	}));
}

function App() {
	const [currentData, setData] = useLocalStorage('data');	
	const [selectedData, setSelectedData] = useState(null);
	const addData = (newData) =>{
		if(!newData.id){
			setData( [...mapData(currentData), {
				...newData,
				date: new Date(newData.date),
				id: currentData.length> 0 ? Math.max(...currentData.map(data => data.id)) + 1: 1
			}]);
		} else {
			setData([...mapData(currentData).map(i =>{
				if(i.id === newData.id){
					return{
						...newData
					};
				}
				return i;
			})]);
		}
		
	};

	const deleteData = (id) =>{
		setData([...mapData(currentData).filter(i=>i.id !== id)]);
	};
	 
	return (
		<UserContextProvider>
			<div className='app'>
				<LeftPanel>
					<Header />
					<JournalAddButton clearForm={()=>{setSelectedData(null);}} />
					<JournalList data={mapData(currentData)} setData={setSelectedData} />
				</LeftPanel>
				<Body>
					<JournalForm onSubmit={addData} data={selectedData} onDelete={deleteData}/> 
				</Body>			
			</div>
		</UserContextProvider>
	);
}

export default App;
