<template>
	<section class="Light" v-if="inputVal">

		<h4 v-text="label"/>

		<v-text-field
			label="Colour"
			v-model="inputVal.colour"/>

		<v-text-field
			label="Brightness"
			v-model="inputVal.brightness"/>

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
	inputVal(v) {
		this.$emit('input', v);
	},
	value(v) {
		this.inputVal = v;
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
