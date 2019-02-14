<template>
	<section class="Light">
		<h4 v-text="light.name"/>

		<v-text-field
			label="Colour"
			v-model="colour"/>

		<v-text-field
			label="Brightness"
			v-model="brightness"/>

		<v-text-field
			label="Scene"
			v-model="scene"/>

		<v-btn @click="submit">Update</v-btn>

	</section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	props: {
		light: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			colour: null,
			brightness: null,
			scene: null
		};
	},
	methods: {
		...mapActions({
			postUpdate: 'control/update'
		}),
		async submit() {
			const commit = {};
			commit[`state/lights/${this.light.name}/colour`] = this.colour;
			commit[`state/lights/${this.light.name}/brightness`] = this.brightness;
			commit[`state/lights/${this.light.name}/scene`] = this.scene;
			await this.postUpdate(commit);
		}
	}
};
</script>

<style lang="scss">

.Light {
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	justify-content: center;
	align-items: center;
	width: 100%;
}

</style>
