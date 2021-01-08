<template>
	<!--<img alt="Vue logo" src="./assets/logo.png">
	<HelloWorld msg="Hello World!"/>-->
	<div id="authorized" v-if="showAuthorized">
		<div id="leftBar">
			<router-link to="/">Home</router-link><br>
			<router-link to="/account">Account</router-link><br>
			<router-link to="/admin">Admin</router-link><br>
			<router-link to="/competition">Competition</router-link><br>
			<router-link to="/problem">Problem</router-link><br>	
		</div>
		<div id="topBar">
			<h4>Top bar</h4>
		</div>
		<div id="botBar">
			<h4>Bot bar</h4>
		</div>
		<div id="content">
			<router-view />
		</div>
	</div>
	<div id="login" v-if="showLogin">
		<h1>Login first!</h1>
		<div class="form-group col-md-6">
			<label for="email">Email:</label>
			<input class="form-control" type="text" id="email" v-model="loginEmail" maxlength="100" required>
		</div>
		<div class="form-group col-md-6">
			<label for="password">Password:</label>
			<input class="form-control" type="password" id="password" v-model="loginPassword" maxlength="64" required>
		</div>
		<button class="btn btn-primary" id="loginButton" @click="loginButtonOnClick">Login</button>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import HelloWorld from "./components/HelloWorld.vue";
import APIFetcher from './components/APIFetcher';

import authorizer from './authorization/Authorizer';

@Options({
	components: {
		HelloWorld,
	},
})

export default class App extends Vue
{
	loginEmail = '';
	loginPassword = '';
	showAuthorized = false;
	showLogin = false;

	created()
    {
		authorizer.addAccessChangedCallback(this.accessChanged.bind(this));
		authorizer.start();
	}

	async loginButtonOnClick()
	{
		let result = await authorizer.login(this.loginEmail, this.loginPassword);
		this.loginEmail = '';
		this.loginPassword = '';

		if (result.ok)
			authorizer.start();
		else
			window.alert(result.error);
	}

	accessChanged(access: boolean)
	{
		this.showAuthorized = access;
		this.showLogin = !access;
	}

	async getLogin()
	{
		var apiFetcher = new APIFetcher();

		var data = await apiFetcher.fetch('user/', { method: 'POST' })
		.then(response => response.json())
		.catch(error => {
			console.log('FETCH ERROR:', error);
			return;
		});

		if (data.ok)
			localStorage.setItem('login', data.login);
		else
			console.log(data.error);
	}
}
</script>

<style>
div {
	border: 1px solid black; /* TODO debug */
}
body {
	margin: 0;
}
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	/*margin-top: 60px;*/
}

#authorized {
	width: 100vw;
	height: 100vh;
	display: grid;
	grid-template-columns: 200px 1fr;
	grid-template-rows: 50px 1fr 50px;
}

#content {
	grid-column: 2;
	grid-row: 2;
}

#leftBar {
	grid-column: 1;
	grid-row: 2;
}

#topBar {
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row: 1;
}

#botBar {
	grid-column-start: 1;
	grid-column-end: 3;
	grid-row: 3;
}
</style>
