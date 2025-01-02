import { useEffect, useReducer, useRef} from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context.jsx';


function JournalForm({ onSubmit, data, onDelete }){
	
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE );
	const {isValid, values, isFormReadyToSubmit} = formState;
	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();
	const {userId} = useContext(UserContext);

	const focusError = (isValid) =>{
		switch(true){
		case !isValid.title:
			titleRef.current.focus();
			break;
		case !isValid.date:
			dateRef.current.focus();
			break;
		case !isValid.text:
			textRef.current.focus();
			break;	
		}
	};

	useEffect(()=>{
		if(!data){
			dispatchForm({type:'CLEAR'});
			dispatchForm({type:'SET_VALUE', payload:{userId}});
		}
		dispatchForm({type:'SET_VALUE', payload:{...data}});
	}, [data, userId]);

	useEffect(()=>{
		let timerId;		
		if(!isValid.date || !isValid.text || !isValid.title){
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({type:'RESET_VALIDITY'});
			}, 500);
		}   
		return ()=>{
			clearTimeout(timerId);
		};
	},[isValid]);

	useEffect(()=>{
		if(isFormReadyToSubmit){
			onSubmit(values);				
			dispatchForm({type: 'CLEAR'});
			dispatchForm({type:'SET_VALUE', payload:{userId}});
		}
	}, [isFormReadyToSubmit, values, onSubmit, userId]);
		
	const addJournalItem = (e)=>{
		e.preventDefault();
		dispatchForm({type:'SUBMIT'});
	};

	useEffect(()=>{
		dispatchForm({type:'SET_VALUE',payload:{userId}});
	}, [userId]);

	const onChange = (e) =>{
		let updatedValue = e.target.value;
		if(e.target.name === 'date'){
			updatedValue = new Date(updatedValue);
		}
		dispatchForm({type:'SET_VALUE', payload:{[e.target.name]: updatedValue}});
	};

	const deleteJournalItem = (id) =>{
		onDelete(id);
		dispatchForm({type:'CLEAR'});
		dispatchForm({type:'SET_VALUE', payload:{userId}});
	};
	return (		
		<form className={`${styles['journal-form']}`} onSubmit={addJournalItem}>
			<div className={styles['form-row']}>
				<Input type="text" isValid={isValid.title} value={values.title} ref={titleRef} onChange={onChange} name="title" appearance='title' />
				{data?.id && <button className={styles['delete']} type='button' onClick={()=>deleteJournalItem(data.id)}>
					<img src="../public/archive.svg" alt="Delete" />
				</button>}
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="../public/calendar.svg" alt="Иконка Календаря" height={20} width={20}/>
					<span>Дата</span>
				</label>
				
			    <Input type="date" ref={dateRef} name='date' isValid={isValid.date} onChange={onChange} value={values.date ? values.date.toISOString().slice(0, 10) : ''} id='date'/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="../public/folder.svg" alt="Иконка Меток" height={20} width={20}/>
					<span>Метки</span>
				</label>
			    <Input type="text" id='tag' name='tag'  onChange={onChange}  value={values.tag} />
			</div>
			  
			<textarea name='text' cols="30" ref={textRef} rows="10" value={values.text} onChange={onChange} className={cn(styles.input, {[styles.invalid]:!isValid.text})}></textarea>
			<Button >Сохранить</Button>
		</form>		
			
	);
}

export default JournalForm;