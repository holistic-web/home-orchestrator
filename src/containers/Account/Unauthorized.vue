<template>
	<v-container class="Unauthorized">

		<span class="Unauthorized__title">
			Please <a @click="onLoginClick">login</a> then contact <a href="mailto:michael.fitzhavey@gmail.com">mailto:michael.fitzhavey@gmail.com</a> for access.
		</span>

	</v-container>

</template>

<script>
export default {
	methods: {
		onLoginClick() {
			this.$router.push({ query: { login: null } });
		}
	}
};
</script>


<style lang="scss">

@import '../../styles/index.scss';

.Unauthorized {
	display: flex;
	justify-content: center;
	align-self: center;

	&__title {
		font-size: 2rem;
		width: auto;
		margin-left: auto;
		margin-right: auto;
	}

	a:hover {
		text-shadow: $primary 1px 1px;
	}

}

</style>
