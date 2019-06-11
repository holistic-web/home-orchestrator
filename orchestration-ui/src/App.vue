<template>
	<v-app id="app" class="App">

		<app-header/>

		<router-view class="App__content"/>

	</v-app>
</template>

<script>
import AppHeader from './components/AppHeader.vue';

export default {
	components: {
		AppHeader
	}
};

</script>

<style lang="scss">
@import 'bootstrap/scss/bootstrap.scss';

.App {
	font-family: 'Nunito', 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	width: 100%;
	display: flex;
}
</style>
