import { UserContext } from '../../context/user.context.jsx';
import styles from './SelectUser.module.css';
import { useContext } from 'react';

function SelectUser(){

	const { userId , setUserId} = useContext(UserContext);
	const changeUser = (e) =>{
		setUserId(Number(e.target.value));        
	};

    
	return (
		<select className={styles.select} name="user" id='user' value={userId} onChange={changeUser}>
			<option value="1">Antony</option>
			<option value="2">Vasiliy</option>
		</select>
	);
} 


export default SelectUser;