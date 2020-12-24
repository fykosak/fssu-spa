<template>
    <div class="competition">
        <h1>Competition</h1>
        <button @click="fetchProblems">TEST</button>
    </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component';
import APIFetcher from '../components/APIFetcher';

export default class Competition extends Vue
{
    created()
    {
        console.log("CREATED");
    }

    fetchProblems()
    {
        console.log('FETCHING PROBLEMS');

        var apiFetcher = new APIFetcher();
        apiFetcher.fetch('problems/')
        .then(response => response.json())
        .then(data => console.log(data))
        .finally(() => console.log('FINALLY'));
    }
}
</script>