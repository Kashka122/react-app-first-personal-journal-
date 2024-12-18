import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

function JournalList({ data }){
	const {userId} = useContext(UserContext);

	if (data.length === 0) {
		return <p>Записей пока нет добавьте первую!</p>;
	}
	const sortData = (a,b) => { return a.date < b.date?  1 :  -1; };
	return  <>
		{data
			.filter(el => el.userId === userId)
			.sort(sortData)
			.map(el => ( 
				<CardButton key={el.id}>
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