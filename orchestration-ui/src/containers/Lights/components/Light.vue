<template>
	<b-card
		class="Light"
		body-class="Light__inner">

		<section>
			<h4 v-text="inputVal.meta.name"/>
			<pre v-text="inputVal.meta.type"/>
		</section>

		<section class="Light__items">

			<v-text-field
				class="Light__item"
				label="Colour"
				v-model="inputVal.colour"
				@input="onStandardInput"/>

			<div class="Light__item">
				<label>Brightness</label>
				<v-slider
					v-model="inputVal.brightness"
					@input="onStandardInput"/>
			</div>

			<b-form-select
				class="Light__item"
				v-if="inputVal.meta.type==='nanoleaf'"
				label="Scene"
				v-model="inputVal.scene"
				:options="sceneOptions"
				@input="onSceneInput"/>

		</section>

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
			]
		};
	},
	methods: {
		onColourInput(colour) {
			this.inputVal.colour = colour;
			this.onStandardInput();
		},
		onStandardInput() {
			if (!this.inputVal.brightness && !this.inputVal.colour) return;
			this.inputVal.scene = null;
		},
		onSceneInput() {
			if (!this.inputVal.scene) return;
			this.inputVal.brightness = null;
			this.inputVal.colour = null;
		}
	},
	computed: {
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

.Light {

	&__inner {
		display: flex;
		flex-direction: row;
	}

	&__items {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}

	&__item {
		padding: 1rem;
	}

}

.v-input {
	flex: none;
}

</style>
