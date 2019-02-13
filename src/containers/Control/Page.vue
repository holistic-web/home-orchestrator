<template>
	<section class="Control">
		<div
			class="Control__light"
			v-for="light in lights"
			:key="light.name">
			{{light.name}}
		</div>
	</section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
// #Todo: import light component to control each light in the room

export default {
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

	&__light {
		padding: 1rem;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}
}

</style>
