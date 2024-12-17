import './App.css';
import LeftPanel from './layouts/LeftPanel/LeftPAnel';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import Body from './layouts/Body/Body';
import JournalList from './components/JournalList/JournalList';
import JournalForm from './components/JournalForm/JournalForm';
import { useLocalStorage } from './hooks/use-localstorage.hook';

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

	const addData = (newData) =>{
		setData( [...mapData(currentData), {
			text: newData.text,
			title: newData.title,
			date: new Date(newData.date),
			id: currentData.length> 0 ? Math.max(...currentData.map(data => data.id)) + 1: 1
		}]);
	};
	
	return (
		<div className='app'>
			<LeftPanel>
				<Header />
				<JournalAddButton></JournalAddButton>
				<JournalList data={mapData(currentData)}/>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addData}/>
			</Body>			
		</div>
	);
}

export default App;
