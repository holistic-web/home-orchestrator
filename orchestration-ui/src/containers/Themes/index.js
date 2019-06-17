import List from './List.vue';
import Edit from './Edit.vue';

const routes = [
	{
		name: 'theme.list',
		path: '/theme',
		component: List,
		menuName: 'Themes'
	},
	{
		name: 'themes.create',
		path: '/themes/create',
		component: Edit
	}
];

export default routes;
