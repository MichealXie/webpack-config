<template>
	<div id="app">
		{{msg}}
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	components: {
		
	},
	data () {
		return {
			msg: 'micheal 的第一个自己配的 webpack + vue'
		}
	}
}
</script>

<style lang="stylus">
@import './static/css/reset.styl'

	#app
		color lightgreen

</style>
