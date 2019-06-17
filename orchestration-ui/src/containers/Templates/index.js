import List from './List.vue';
import Edit from './Edit.vue';

const routes = [
	{
		name: 'templates.list',
		path: '/templates',
		component: List,
		menuName: 'Templates'
	},
	{
		name: 'templates.create',
		path: '/templates/create',
		component: Edit
	}
];

export default routes;
