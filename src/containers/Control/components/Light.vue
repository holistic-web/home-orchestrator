<template>
	<section class="Light" v-if="inputVal">

		<h2 class="mb-5" v-text="label"/>

		<v-text-field
			label="Colour"
			v-model="inputVal.colour"
			@input="onStandardInput"/>

		<v-text-field
			label="Brightness"
			v-model="inputVal.brightness"
			@input="onStandardInput"
			type="number"/>

		<v-text-field
			label="Scene"
			v-model="inputVal.scene"
			@input="onSceneInput"/>

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
	methods: {
		onSceneInput() {
			if (!this.inputVal.scene) return;
			this.inputVal.brightness = null;
			this.inputVal.colour = null;
		},
		onStandardInput() {
			if (!this.inputVal.brightness && !this.inputVal.colour) return;
			this.inputVal.scene = null;
		}
	},
	watch: {
		inputVal(v) {
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
