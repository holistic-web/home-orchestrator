<template>
	<div class="Sidebar">

		<section class="Sidebar__inner">

			<router-link class="Sidebar__title" to="/">
				Wan
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

			<signup-modal :visible="isSignupModalVisible" @close="onSignupModalClose"/>
			<login-modal :visible="isLoginModalVisible" @close="onLoginModalClose"/>

		</section>

	</div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import routes from '../router/routes';
import LoginModal from '@/components/LoginModal.vue';
import SignupModal from '@/components/SignupModal.vue';

export default {
	components: {
		LoginModal,
		SignupModal
	},
	data() {
		return {
			isSignupModalVisible: false,
			isLoginModalVisible: false
		};
	},
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
			return [
				{
					path: '/welcome',
					title: 'Welcome'
				},
				...menuItems
			];
		},
		username() {
			const name = `${this.account.firstName} ${this.account.lastName}`;
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
		onSignUpButtonClick() {
			this.$router.push({ query: { signUp: null } });
		},
		onSignupModalClose() {
			this.$router.push({ query: { signUp: undefined } });
			this.isSignupModalVisible = false;
		},
		onLoginButtonClick() {
			this.$router.push({ query: { login: null } });
		},
		onLoginModalClose() {
			this.$router.push({ query: { login: undefined } });
			this.isLoginModalVisible = false;
		},
		handleURLQuery() {
			const { query } = this.$route;
			if (query.signUp === null) this.isSignupModalVisible = true;
			if (query.login === null) this.isLoginModalVisible = true;
		}
	},
	watch: {
		$route: {
			immediate: true,
			handler: 'handleURLQuery'
		}
	}
};
</script>


<style lang="scss">
@import "../styles/index.scss";

.Sidebar {
	height: 100%;
	background: $blue-dark;
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
		color: $grey;
		width: 100%;
		text-align: left;
		padding: 1.5rem;
		border-bottom: 1px solid $grey;
		text-transform: uppercase;
		font-size: 1.2rem;
		letter-spacing: 0.1rem;

		&:hover {
			color: $grey;
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
			color: $white;
			padding: 1rem 2rem;

			&.router-link-active {
				color: $blue-light;
			}

			&:hover {
				color: $blue-light;
			}
		}
	}

	&__auth {
		max-width: 100%;
		padding: 1.5rem 1rem;
		border-top: 1px solid $grey;
		color: $white;
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
