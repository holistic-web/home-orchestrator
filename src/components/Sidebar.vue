<template>
	<div class="Sidebar">

		<section class="Sidebar__inner">

			<router-link class="Sidebar__title" to="/">
				Home Orchestrator
			</router-link>

			<template v-if="account">
				<section
					class="Sidebar__navigation">
					<router-link
						class="Menu__link text-semibold"
						:to="item.path"
						v-for="item in menuItems"
						:key="item.path"
						v-text="item.title"/>
				</section>

				<section class="Sidebar__auth">

					<span class="Sidebar__auth__text" v-text="username"/>
					<v-btn
						v-text="'Sign out'"
						color="primary"
						outline
						small
						@click="onSignOutClick"/>

				</section>
			</template>

		</section>

	</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import routes from '../router/routes';

export default {
	computed: {
		...mapGetters({
			account: 'account/account'
		}),
		menuItems() {
			const menuItems = [];
			routes.forEach((r) => {
				if (r.name && r.name.includes('.list')) {
					const title = `${r.name.substring(0, r.name.length - 5)}s`;
					menuItems.push({
						...r,
						title
					});
				}
			});
			return menuItems;
		},
		username() {
			// #Todo: calculate username here from google account details
			const name = '';
			return name;
		}
	},
	methods: {
		...mapActions({
			signOut: 'account/logOut'
		}),
		async onSignOutClick() {
			await this.signOut();
		},
		onLoginButtonClick() {
			// #Todo: login in with firebase through account vuex store on click
		}
	}
};
</script>


<style lang="scss">
@import "../styles/index.scss";

.Sidebar {
	height: 100%;
	background: $secondary;
	font-size: 1.25rem;
	min-width: 20rem;

	&__inner {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
	}

	&__title {
		font-weight: bold;
		color: $text;
		width: 100%;
		text-align: left;
		padding: 1.5rem;
		border-bottom: 1px solid $text;
		text-transform: uppercase;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;

		&:hover {
			color: $text;
			text-shadow: none;
		}
	}


	&__navigation {
		display: flex;
		flex-direction: column;
		justify-content: start;
		margin: 3rem 0;
		height: 100%;

		a {
			font-weight: 600;
			text-transform: capitalize;
			color: $highlight;
			padding: 1rem 2rem;

			&.router-link-active {
				color: $primary;
			}

			&:hover {
				color: $primary;
			}
		}
	}

	&__auth {
		max-width: 100%;
		padding: 1.5rem 1rem;
		border-top: 1px solid $text;
		color: $highlight;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&__text {
			max-width: 100%;
			text-overflow: ellipsis;
			overflow: hidden;
			text-align: center;
			font-size: 1rem;
		}

	}

}
</style>
