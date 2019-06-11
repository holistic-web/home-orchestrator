import accountRoutes from '../containers/Account';
import controlRoutes from '../containers/Lights';

const routes = [
	...accountRoutes,
	...controlRoutes,
	{
		path: '*',
		redirect: { name: 'lights.page' }
	}
];

export default routes;
