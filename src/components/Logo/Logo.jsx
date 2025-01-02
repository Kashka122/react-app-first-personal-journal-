import styles from './Logo.module.css';
import { memo } from 'react';

function Logo({ src }){
	console.log('LOGO');
    
	return (
		<img className={styles.logo} src={src} alt='Логотип'/>
	);
}

export default memo(Logo);