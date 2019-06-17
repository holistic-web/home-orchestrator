import accountRoutes from '../containers/Account';
import lightsRoutes from '../containers/Lights';
import templatesRoutes from '../containers/Templates';


const routes = [
	...accountRoutes,
	...lightsRoutes,
	...templatesRoutes,
	{
		path: '*',
		redirect: { name: 'lights.page' }
	}
];

export default routes;
