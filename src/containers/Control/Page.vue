<template>
	<section class="Control">
		<light
			class="Control__light"
			v-for="light in lights"
			:key="light.name"
			:light="light"/>
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Light from './components/Light.vue';

export default {
	components: {
		Light
	},
	computed: {
		...mapGetters({
			data: 'control/data'
		}),
		lights() {
			if (!this.data || !this.data.state) return [];
			let { lights } = this.data.state;
			lights = Object.keys(lights).map(ln => ({
				name: ln,
				...lights[ln]
			}));
			lights.shift(); // remove _lastState light, get rid of this line ASAP
			return lights;
		}
	},
	methods: {
		...mapActions({
			fetch: 'control/fetch'
		})
	},
	created() {
		this.fetch();
	}
};
</script>

<style lang="scss">
@import '../../styles/index.scss';

.Control {
	display: flex;
	flex-direction: row !important;
}

</style>
