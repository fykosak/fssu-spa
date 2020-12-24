<template>
	<div class="editProblem">
		<h1>Edit problem: {{ problemId }}</h1>
	</div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
	props: {
		problemId: Number
	}
})

export default class EditProblem extends Vue
{
	problemId!: number;
}
</script>

<style scoped>
.editProblem {
	height: 100%;
}
</style>