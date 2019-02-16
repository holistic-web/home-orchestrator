<template>
	<section
		v-if="inputVal"
		class="Light"
		:style="style">

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

		<section class="Light__palette" :style="paletteStyle"/>

	</section>
</template>

<script>
import { getHexColour } from '../../../lib/common';

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
			inputVal: this.value,
			style: ''
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
	computed: {
		paletteColour() {
			const colour = getHexColour(this.inputVal.colour);
			return colour;
		},
		paletteOpacity() {
			const opacity = this.inputVal.brightness / 100;
			return opacity;
		},
		paletteStyle() {
			const style = {
				background: this.paletteColour,
				opacity: this.paletteOpacity
			};
			return style;
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

	&__palette {
		margin-bottom: 5rem;
		height: 5rem;
		width: 100%;
		border-radius: 0.5rem;
	}
}

</style>
