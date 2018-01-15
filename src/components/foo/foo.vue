<template>
	<div class="foo">
		{{bojack}}
		{{bojack}}
		{{bojack}}
	</div>
</template>

<script>
export default {
	computed: {
		bojack(){
			return this.$store.state.bojack
		}
	}
}
</script>

<style lang="stylus">
@import './foo.styl'
	
</style>
