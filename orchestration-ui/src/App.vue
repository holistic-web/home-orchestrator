<template>
	<v-app id="app" class="App">

		<sidebar/>

		<router-view class="App__content"/>

	</v-app>
</template>

<script>
import Sidebar from './components/Sidebar.vue';

export default {
	components: {
		Sidebar
	}
};

</script>

<style lang="scss">
@import './styles/index.scss';

.App {
	font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 100%;
	color: $text;
	background-color: $background;
	display: flex;
	overflow: hidden;

	>.application--wrap{ flex-direction: row; }

	&__content {
		width: 100%;
		max-height: 100vh;
		overflow: auto;
		flex-direction: column;
	}

}
</style>
