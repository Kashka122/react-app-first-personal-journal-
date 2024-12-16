import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton(){

	return (
		<CardButton className='journal-add'>
			<img className='plus' src="/public/plus_symbol.svg" alt="Plus" /> Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;