<template>
	<header v-if="!isAccountPage">
		<b-navbar class="AppHeader" toggleable="lg" type="dark" variant="info">

			<div class="AppHeader__leftSection">
				<b-navbar-brand
					class="AppHeader__title"
					href="#"
					v-text="'Home Orchestrator'"/>

				<b-nav class="AppHeader__menu">
					<b-nav-item class="AppHeader__menu__item">

						<router-link
							class="AppHeader__menu__link"
							:to="{ name: 'lights.page' }"
							v-text="'Lights'"/>

					</b-nav-item>
				</b-nav>
			</div>

			<div class="AppHeader__rightSection">
				<b-btn
					variant="outline-danger"
					size="sm"
					v-text="'Log Out'"
					@click="logOutUser"/>
			</div>

		</b-navbar>
	</header>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	methods: {
		...mapActions({
			logOutUser: 'account/logOut'
		})
	},
	computed: {
		isAccountPage() {
			const isAccountPage = this.$route.name.startsWith('account.');
			return isAccountPage;
		}
	}
};
</script>

<style lang="scss">
.AppHeader {

	&.navbar {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	&__title {
		min-height: unset;
	}

	&__leftSection {
		display: flex;
		flex-direction: column;

		@media (min-width: 768px) {
			flex-direction: row;
			align-items: center;
		}
	}

	&__rightSection {
		display: flex;
	}

	&__menu {
		margin-right: 2rem;

		.nav-link {
			padding: 0;
		}

		&__link {
			color: #fff;
			padding: 0.2rem 0.5rem;

			@media (min-width: 768px) {
				margin: 0 1rem;
			}

			&:hover {
				text-decoration: none;
				color: #fff;
			}

			&.router-link-active {
				border-bottom: 0.05rem solid white;
				margin-bottom: -0.05rem;
			}

		}
	}
}
</style>
