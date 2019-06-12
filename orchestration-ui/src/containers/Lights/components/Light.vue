<template>
	<b-card
		class="Light"
		body-class="Light__inner">

		<section class="Light__label">
			<h4 v-text="inputVal.name"/>
			<pre v-text="inputVal.type"/>
		</section>

		<div>
			<b-form-radio-group
				id="btn-radios-3"
				v-model="inputVal.state.on"
				:options="onStateOptions"
				buttons
				button-variant="outline-info"
				stacked/>
		</div>

		<section class="Light__items">

			<template v-if="controls === 'manual'">

				<div class="Light__item">
					<label v-text="'Colour'"/>
					<b-form-input
						v-model="inputVal.state.colour"
						@input="clearSceneInputs"/>
				</div>

				<div class="Light__item">
					<label>Brightness</label>
					<b-form-input
						type="range"
						min="0"
						max="100"
						v-model="inputVal.state.brightness"
						@input="clearSceneInputs"/>
					<span v-if="inputVal.state.brightness" v-text="`${inputVal.state.brightness}%`"/>
				</div>

			</template>

			<template v-if="controls === 'scene'">

				<div class="Light__item">
					<label v-text="'Scene'"/>
					<b-form-select
						v-model="inputVal.state.scene"
						:options="sceneOptions"
						@input="clearDefaultInputs"/>
				</div>

			</template>

		</section>

		<div>
			<label v-text="'Controls'"/>
			<b-form-radio-group
				class="Light__controlToggle"
				v-model="controls"
				size="sm"
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
				'flow', 'sesh', 'woah', 'morning'
			],
			controls: 'manual',
			controlsOptions: ['manual', 'scene'],
			onStateOptions: [{ text: 'On', value: true }, { text: 'Off', value: false }]
		};
	},
	methods: {
		clearDefaultInputs() {
			this.inputVal.state.brightness = null;
			this.inputVal.state.colour = null;
		},
		clearSceneInputs() {
			this.inputVal.state.scene = null;
		},
		setDefaultControls() {
			if (this.inputVal.state.scene) {
				this.controls = 'scene';
			} else {
				this.controls = 'manual';
			}
		}
	},
	watch: {
		inputVal(v) {
			this.$emit('input', v);
		},
		value(v) {
			this.inputVal = v;
		}
	},
	created() {
		this.setDefaultControls();
	}
};
</script>

<style lang="scss">

.Light {
	min-height: 10rem;

	&__inner {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	&__label {
		min-width: 8rem;
		margin-right: 2rem;
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

}

</style>
