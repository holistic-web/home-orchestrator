import accountRoutes from '../containers/Account';
import lightsRoutes from '../containers/Lights';
import themesRoutes from '../containers/Themes';


const routes = [
	...accountRoutes,
	...lightsRoutes,
	...themesRoutes,
	{
		path: '*',
		redirect: { name: 'lights.page' }
	}
];

export default routes;
