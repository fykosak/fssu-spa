<template>
    <div class="account">
        <h1>Account</h1>
        <button class="btn btn-primary" id="logoutButton" @click="logoutUser">Logout</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';

export default class Account extends Vue
{
    logoutUser()
    {
        localStorage.clear();
    }
}
</script>