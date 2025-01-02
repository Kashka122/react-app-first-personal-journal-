import CardButton from '../CardButton/CardButton';
import './JournalAddButton.css';

function JournalAddButton({clearForm}){

	return (
		<CardButton className='journal-add' onClick={clearForm}>
			<img className='plus' src="/public/plus_symbol.svg" alt="Plus" /> Новое воспоминание
		</CardButton>
	);
}

export default JournalAddButton;