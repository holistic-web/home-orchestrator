import accountRoutes from '../containers/Account';
import controlRoutes from '../containers/Control';

const routes = [
	...accountRoutes,
	...controlRoutes,
	{
		path: '*',
		redirect: { name: 'control.Page' }
	}
];

export default routes;
