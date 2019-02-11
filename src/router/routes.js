import accountRoutes from '../containers/Account';
import controlRoutes from '../containers/Control';


const routes = [
	...accountRoutes,
	...controlRoutes,
	{
		path: '*',
		redirect: { name: 'account.unauthorized' }
	}
];

export default routes;
