import SelectUser from '../SelectUser/SelectUser';
import Logo from '../Logo/Logo';

function Header(){
	console.log('HEADER');
	return (
		<>
			<Logo src={'../public/logo.svg'} />
			<SelectUser />
		</>
	);
}

export default Header;