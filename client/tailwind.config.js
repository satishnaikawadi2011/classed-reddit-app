module.exports = {
	purge    : [
		'./src/**/*.tsx'
	],
	darkMode : false, // or 'media' or 'class'
	theme    : {
		fontFamily : {
			body : [
				'Ubuntu'
			]
		},
		extend     : {
			spacing : {
				70 : '17.5rem'
			}
		}
	},
	variants : {
		extend : {}
	},
	plugins  : []
};
