<template>
	<section class="Light" v-if="inputVal">

		<h2 class="mb-5" v-text="label"/>

		<v-text-field
			label="Colour"
			v-model="inputVal.colour"/>

		<v-text-field
			label="Brightness"
			v-model="inputVal.brightness"
			type="number"/>

		<v-text-field
			label="Scene"
			v-model="inputVal.scene"/>

	</section>
</template>

<script>
export default {
	props: {
		value: {
			required: true
		},
		label: {
			type: String
		}
	},
	data() {
		return {
			inputVal: this.value
		};
	},
	watch: {
		inputVal(v) {
			console.log('v: ', v);
			/* eslint-disable no-param-reassign */
			if (v.scene) {
				v.brightness = null;
				v.colour = null;
			}
			if (v.brightness || v.colour) v.scene = null;
			/* eslint-enable */
			this.$emit('input', v);
		},
		value(v) {
			this.inputVal = v;
		}
	}
};
</script>

<style lang="scss">
@import '../../../styles/index.scss';

.Light {
	margin: 1rem;
	margin-top: 2rem;
	padding: 1rem;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	justify-content: center;
	align-items: center;
	width: 100%;
	border-radius: 0.5rem;
	background-color: $highlight;
}

</style>
