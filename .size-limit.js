module.exports = [
	{
		name: 'i18n-string',
		path: 'dist/i18n.string.min.js',
		limit: '948 b',
	},
	{
		name: 'typed-i18n-string',
		path: 'dist/i18n.typed.string.min.js',
		limit: '953 b',
	},
	{
		name: 'i18n-object',
		path: 'dist/i18n.object.min.js',
		limit: '1089 b',
	},
	{
		name: 'typed-i18n-object',
		path: 'dist/i18n.typed.object.min.js',
		limit: '1095 b',
	},
	{
		name: 'i18n-instance',
		path: 'dist/i18n.instance.min.js',
		limit: '1119 b',
	},
	{
		name: 'all together',
		path: 'dist/i18n.all.min.js',
		limit: '1194 b',
	},
	{
		name: 'adapter-angular',
		path: 'angular/index.min.mjs',
		limit: '1230 b',
		ignore: ['angular'],
	},
	{
		name: 'adapter-react',
		path: 'react/index.min.mjs',
		limit: '1602 b',
		ignore: ['react'],
	},
	{
		name: 'adapter-solid',
		path: 'solid/index.min.mjs',
		limit: '1403 b',
		ignore: ['solid-js'],
	},
	{
		name: 'adapter-svelte',
		path: 'svelte/index.min.mjs',
		limit: '1342 b',
		ignore: ['svelte'],
	},
	{
		name: 'adapter-vue',
		path: 'vue/index.min.mjs',
		limit: '1256 b',
		ignore: ['vue'],
	},
]
