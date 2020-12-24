<template>
	<div class="problem">
		<div id="editProblem">
			<EditProblem problemId="10"/>
		</div>
		<div id="pdf">
			<h1>PDF</h1>
		</div>
	</div>
</template>

<script lang="ts">
import { Vue, Options } from "vue-class-component";
import EditProblem from "../components/EditProblem.vue";

@Options({
	components: {
		EditProblem,
	},
})
export default class Problem extends Vue
{

}
</script>

<style scoped>
.problem {
	height: 100%;
	display: grid;
	grid-template-columns: 1fr 200px;
}

#editProblem {
	grid-column: 1;
}

#pdf {
	grid-column: 2;
}
</style>