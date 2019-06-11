<template>
	<header v-if="!isAccountPage">
		<b-navbar class="AppHeader" toggleable="lg" type="dark" variant="info">

			<b-navbar-brand
				class="AppHeader__title"
				href="#"
				v-text="'Home Orchestrator'"/>

				<div class="AppHeader__rightSection">

					<b-nav class="AppHeader__menu">
						<b-nav-item class="AppHeader__menu__item">
							<router-link class="AppHeader__menu__link" :to="{ name: 'lights.page' }">Portfolio</router-link>
						</b-nav-item>
					</b-nav>

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
	&__rightSection {
		display: flex;
		flex-direction: row;
	}
	&__menu {
		margin-right: 2rem;
		&__link {
			color: #fff;
			padding: 0.2rem 0.5rem;
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
