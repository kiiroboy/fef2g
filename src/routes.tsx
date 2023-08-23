import { Icon } from '@chakra-ui/react';
import { MdBarChart, MdPerson, MdHome, MdLock, MdOutlineShoppingCart } from 'react-icons/md';

// Home Imports
import MainDashboard from './views/home/default';
import NFTMarketplace from './views/home/marketplace';
import Profile from './views/home/profile';
import DataTables from './views/home/dataTables';

// Auth Imports
import SignInCentered from 'views/auth/signIn';

const routes = [
	{
		name: 'Main Dashboard',
		layout: '/home',
		path: '/main',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	/*{
		name: 'NFT Marketplace',
		layout: '/home',
		path: '/nft-marketplace',
		icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
		component: NFTMarketplace,
		secondary: true
	},*/
	{
		name: 'Data Tables',
		layout: '/home',
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: '/data-tables',
		component: DataTables
	},
	{
		name: 'Profile',
		layout: '/home',
		path: '/profile',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: Profile
	},
	{
		name: 'Sign In',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	}
];

export default routes;
