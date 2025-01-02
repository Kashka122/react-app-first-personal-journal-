import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext, useMemo } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ data, setData  }){
	const {userId} = useContext(UserContext);	
	const sortData = (a,b) => { return a.date < b.date?  1 :  -1; };
	const filteredData = useMemo(()=> data
		.filter(el => el.userId === userId)
		.sort(sortData), [data, userId]); 
		 
	if (data.length === 0) {
		return <p>Записей пока нет добавьте первую!</p>;
	}
	return  <>
		{filteredData
			.map(el => ( 
				<CardButton key={el.id} onClick={() => setData(el)} >
					<JournalItem  
						title={el.title} 
						text={el.text} 
						date={el.date}

					/>
				</CardButton> 
			))}
	</>;
		
}

export default JournalList;