import './JournalList.css';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';

function JournalList({ data }){
	if (data.length === 0) {
		return <p>Записей пока нет добавьте первую!</p>;
	}
	const sortData = (a,b) => { return a.date < b.date?  1 :  -1; };
	return  <>
		{data.sort(sortData).map(el => ( 
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