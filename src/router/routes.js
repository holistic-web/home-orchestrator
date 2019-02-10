import accountRoutes from '../containers/Account';
import roomRoutes from '../containers/Room';
import themeRoutes from '../containers/Theme';


const routes = [
	...accountRoutes,
	...roomRoutes,
	...themeRoutes,
	{
		path: '*',
		redirect: { name: 'room.list' }
	}
];

export default routes;
