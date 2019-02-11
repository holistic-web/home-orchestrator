<template>
	<v-container class="Unauthorized">

		<span class="Unauthorized__title">
			Please <a @click="logIn">login</a> then contact <a href="mailto:michael.fitzhavey@gmail.com">michael.fitzhavey@gmail.com</a> for access
		</span>

	</v-container>

</template>

<script>
import { mapActions } from 'vuex';

export default {
	methods: {
		...mapActions({
			logIn: 'account/logIn'
		})
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
