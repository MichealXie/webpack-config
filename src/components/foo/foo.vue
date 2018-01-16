<template>
	<div class="foo">
		<button @click="showName()">who am I?</button>
	</div>
</template>

<script lang='ts'>
import Vue from 'vue'


export default Vue.extend( {
	computed: {
		bojack():string {
			return this.$store.state.bojack 
		}
	},
	methods: {
		showName(): void{
			alert(this.bojack)
		}
	}
})
</script>

<style lang="stylus">
@import './foo.styl'
	
</style>
