import SelectUser from '../SelectUser/SelectUser';
import styles from './Header.module.css';

function Header(){
	return (
		<>
			<img className={styles.logo} src='../public/logo.svg' alt='Логотип'/>
			<SelectUser />
		</>
	);
}

export default Header;