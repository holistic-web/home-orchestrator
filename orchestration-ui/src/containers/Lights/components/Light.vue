<template>
	<b-card
		class="Light"
		body-class="Light__inner">

		<section class="Light__label">
			<h4 v-text="inputVal.meta.name"/>
			<pre v-text="inputVal.meta.type"/>
		</section>

		<section class="Light__items">

			<template v-if="controls === 'manual'">

				<div class="Light__item">
					<label v-text="'Colour'"/>
					<b-form-input
						v-model="inputVal.colour"
						@input="onStandardInput"/>
				</div>

				<div class="Light__item">
					<label>Brightness</label>
					<b-form-input
						type="range"
						min="0"
						max="100"
						v-model="inputVal.brightness"
						@input="onStandardInput"/>
					<span v-if="inputVal.brightness" v-text="`${inputVal.brightness}%`"/>
				</div>

			</template>

			<template v-if="controls === 'scene'">

				<div class="Light__item">
					<label v-text="'Scene'"/>
					<b-form-select
						v-model="inputVal.scene"
						:options="sceneOptions"
						@input="onSceneInput"/>
				</div>

			</template>

		</section>

		<div>
			<label v-text="'Controls'"/>
			<b-form-radio-group
				class="Light__controlToggle"
				v-model="controls"
				:options="controlsOptions"
				button-variant="outline-info"
				buttons/>
		</div>

	</b-card>

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
			inputVal: this.value,
			sceneOptions: [
				'default', 'morning', 'flow', 'sesh', 'woah', 'night'
			],
			controls: 'manual',
			controlsOptions: ['manual', 'scene']
		};
	},
	methods: {
		clearDefaultInputs() {
			this.inputVal.brightness = null;
			this.inputVal.colour = null;
		},
		clearSceneInputs() {
			this.inputVal.scene = null;
		},
		onColourInput(colour) {
			this.inputVal.colour = colour;
			this.onStandardInput();
		},
		onStandardInput() {
			if (!this.inputVal.brightness && !this.inputVal.colour) return;
			this.clearDefaultInputs();
		},
		onSceneInput() {
			if (!this.inputVal.scene) return;
			this.clearDefaultInputs();
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

.Light {
	min-height: 10rem;

	&__inner {
		display: flex;
		flex-direction: row;
	}

	&__label {
		width: 8rem;
	}

	&__items {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		margin: 0 1rem;
	}

	&__item {
		padding: 1rem;
		display: flex;
		flex-direction: column;
	}

	&__controlToggle {
		> label:not(.active) {
			cursor: pointer;
		}
	}

}

</style>
