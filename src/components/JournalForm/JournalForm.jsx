import { useEffect, useReducer, useRef} from 'react';
import Button from '../Button/Button';
import styles from './JournalForm.module.css';
import cn from 'classnames';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context.jsx';


function JournalForm({ onSubmit }){
	
	const [formState, dispatchForm] = useReducer(formReducer,INITIAL_STATE );
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
		}
	}, [isFormReadyToSubmit, values, onSubmit]);
		
	const addJournalItem = (e)=>{
		e.preventDefault();
		dispatchForm({type:'SUBMIT'});
	};

	useEffect(()=>{
		dispatchForm({type:'SET_VALUE',payload:{userId}});
	}, [userId]);

	const onChange = (e) =>{
		dispatchForm({type:'SET_VALUE', payload:{[e.target.name]: e.target.value}});
	};

	return (		
		<form className={`${styles['journal-form']}`} onSubmit={addJournalItem}>
			{userId}
			<div>
				<Input type="text" isValid={isValid.title} value={values.title} ref={titleRef} onChange={onChange} name="title" appearance='title' />
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="../public/calendar.svg" alt="Иконка Календаря" height={20} width={20}/>
					<span>Дата</span>
				</label>
				
			    <Input type="date" ref={dateRef} name='date' isValid={isValid.date} onChange={onChange} value={values.date} id='date'/>
			</div>
			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="../public/folder.svg" alt="Иконка Меток" height={20} width={20}/>
					<span>Метки</span>
				</label>
			    <Input type="text" id='tag' name='tag'  onChange={onChange}  value={values.tag} />
			</div>
			  
			<textarea name='text' cols="30" ref={textRef} rows="10" value={values.text} onChange={onChange} className={cn(styles.input, {[styles.invalid]:!isValid.text})}></textarea>
			<Button text='Сохранить'/>
		</form>		
			
	);
}

export default JournalForm;