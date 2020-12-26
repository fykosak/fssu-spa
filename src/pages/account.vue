<template>
    <div class="account">
        <h1>Account</h1>
        <button class="btn btn-primary" id="logoutButton" @click="logoutButtonOnClick">Logout</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import authorizer from '../authorization/Authorizer';

export default class Account extends Vue
{
    logoutButtonOnClick()
    {
        authorizer.logout();
    }
}
</script>