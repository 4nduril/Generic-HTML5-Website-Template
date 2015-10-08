module.exports = function (grunt) {
	'use strict';

	var name = '<%= pkg.name %>';
	var ownJs = [
		'jquery',
		'PROJECT',
		'old-ie',
		'old-ie2-superweirdbehaviour'
	];
	var minJsRegExString = '(' +
		ownJs.join('|') +
		')' + 
		'(?:\\.min)*(\\.js)(?!o)';
	var devDest = '/srv/http/tobias-barth.net';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				seperator: ';'
			},
			dev: {
				files: [
					{
						src: [
							'bower/html5shiv/dist/html5shiv.js'
						],
						dest: 'dev/js/old-ie.js'
					},
					{
						src: ['js/*.js'],
						dest: 'dev/js/' + name + '.js'
					},
					{
						src: ['bower/rem-unit-polyfill/js/rem.js'],
						dest: 'dev/js/old-ie2-superweirdbehaviour.js'
					}
				]
			},
			modernizr: {
				files: [
					{
						src: [
							'bower/modernizr/modernizr.js',
							'dev/js/' + name + '.js'
						],
						dest: 'dev/js/' + name + '.js'
					}
				]
			}
		},
		copy: {
			focusfix: {
				options: {
					process: function(content) {
						var eslintNotice = '/* eslint strict:false */';
						/* eslint-disable */
						return eslintNotice + "\n" + content;
						/* eslint-enable */
					}
				},
				files: [
					{
						expand: true,
						src: ['bower/yaml-focusfix.js/index.js'],
						dest: 'js/',
						flatten: true,
						rename: function(dest) {
							return dest + 'focusfix';
						}
					}
				]
			},
			pages: {
				files: [
					{
						expand: true,
						cwd: 'pages/',
						src: [
							'**/*.html',
							'**/*.php',
							'.htaccess',
							'**/*.xml',
							'**/*.txt',
							'**/*.config'
						],
						dest: 'dev/'
					}
				]
			},
			preDev: {
				files: [
				/*	{
						expand: true,
						src: ['bower/jquery/jquery.js'],
						dest: 'dev/js/',
						flatten: true
					},*/
					{
						expand: true,
						cwd: 'bower/font-awesome/fonts/',
						src: [
							'*.eot',
							'*.woff',
							'*.ttf',
							'*.svg',
							'*.otf'
						],
						dest: 'dev/fonts'
					},
					{
						expand: true,
						cwd: 'images/',
						src: [
							'**/*.{jpg,JPG,jpeg}',
							'**/*.{gif,GIF}',
							'**/*.{png,PNG}',
							'**/*.{SVG,svg}'
						],
						dest: 'dev/images/',
						flatten: true
					}
				]
			},
			dist: {
				files: [
					/*{
						expand: true,
						src: ['bower/jquery/jquery.min.js'],
						dest: 'dist/js/',
						flatten: true
					},*/
					{
						expand: true,
						cwd: 'pages/',
						src: [
							'**/*.html',
							'**/*.php',
							'.htaccess',
							'**/*.xml',
							'**/*.txt'
						],
						dest: 'dist/'
					},
					{
						expand: true,
						cwd: 'bower/font-awesome/fonts/',
						src: [
							'*.eot',
							'*.woff',
							'*.ttf',
							'*.svg',
							'*.otf'
						],
						dest: 'dist/fonts'
					}
				]
			},
			joomla: {
				files: [
					{
						expand: true,
						src: ['dist/js/*.min.js'],
						dest: 'template/js/',
						flatten: true
					},
					{
						expand: true,
						src: ['dist/css/*.min.css', 'dist/css/fonts/*'],
						dest: 'template/css/',
						flatten: true
					}
				]
			}
		},
		imagemin: {
			dist: {
				options: {
					progressive: true,
					optimizationLevel: 7
				},
				files: [
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{jpg,JPG,jpeg}'],
						dest: 'dist/images/',
						ext: '.jpg'
					},
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{gif,GIF}'],
						dest: 'dist/images/',
						ext: '.gif'
					},
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{png,PNG}'],
						dest: 'dist/images/',
						ext: '.png'
					},
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{svg,SVG}'],
						dest: 'dist/images/',
						ext: '.svg'
					}
				]
			},
			dev: {
				options: {
					progressive: true,
					optimizationLevel: 7
				},
				files: [
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{jpg,JPG,jpeg}'],
						dest: 'dev/images/',
						ext: '.jpg'
					},
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{gif,GIF}'],
						dest: 'dev/images/',
						ext: '.gif'
					},
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{png,PNG}'],
						dest: 'dev/images/',
						ext: '.png'
					},
					{
						expand: true,
						cwd: 'images/compress/',
						src: ['**/*.{svg,SVG}'],
						dest: 'dev/images/',
						ext: '.svg'
					}
				]
			}
		},
		eslint: {
			gruntfile: ['Gruntfile.js'],
			prodCode: ['js/*.js']
		},
		less: {
			options: {
				paths: ['bower/font-awesome/less']
			},
			dev: {
				files: [
					{
						src: 'css/style.less',
						dest: 'dev/css/style.css'
					},
					{
						src: 'css/old-ie.less',
						dest: 'dev/css/old-ie.css'
					}
				]
			},
			dist: {
				options: {
					cleancss: true
				},
				files: [
					{
						src: 'css/style.less',
						dest: 'dist/css/style.min.css'
					}
				]
			},
			'ie-dist': {
				files: [
					{
						src: 'css/old-ie.less',
						dest: 'dist/css/old-ie.min.css'
					}
				]
			}
		},
		modernizr: {
			dist: {
				'devFile': 'bower/modernizr/modernizr.js',
				'outputFile': 'js/build/modernizr-custom.js',
				'extra': {
					'shiv': false,
					'printshiv': false,
					'load': false,
					'mq': true,
					'cssclasses': true
				},
				'files': {
					'src': ['js/*.js', 'css/*.less']
				}
			}
		},
		'regex-replace': {
			dev: {
				src: [
					'dev/**/*.html',
					'dev/**/*.php'
				],
				actions: [
					{
						name: 'Inject project\'s main JS filename',
						search: /PROJECT(\.js)/,
						replace: name + '$1'
					}
				]
			},
			dist: {
				src: [
					'dist/**/*.html',
					'dist/**/*.php'
				],
				actions: [
					{
						name: 'Minify script tag',
						search: minJsRegExString,
						replace: '$1.min$2'
					},
					{
						name: 'Inject project\'s main JS filename',
						search: /PROJECT(\.min\.js)/,
						replace: name + '$1'
					},
					{
						name: 'Minify CSS',
						search: /(?:\.min)*(\.css)/g,
						replace: '.min$1'
					}
				]
			}
		},
		uglify: {
			dist: {
				files: [
					{
						src: [
							'js/build/modernizr-custom.js',
							'js/*.js'
						],
						dest: 'dist/js/' + name + '.min.js'
					},
					{
						src: [
							'bower/html5shiv/dist/html5shiv.js'
						],
						dest: 'dist/js/old-ie.min.js'
					},
					{
						src: ['bower/rem-unit-polyfill/js/rem.min.js'],
						dest: 'dist/js/old-ie2-superweirdbehaviour.min.js'
					}
				]
			}
		},
		rsync: {
			options: {
				recursive: true,
				args: ['--verbose','--links','--times']
			},
			dev: {
				options: {
					src: 'dev/',
					dest: devDest,
					delete: true
				}
			}
		},
		watch: {
			checkGruntfile: {
				files: ['Gruntfile.js'],
				tasks: ['eslint:gruntfile']
			},
			compileCss: {
				files: ['css/*.less'],
				tasks: ['less:dev']
			},
			catJs: {
				files: ['js/*.js'],
				tasks: ['eslint:prodCode', 'concat:dev']
			},
			copyPages: {
				files: ['pages/**/*'],
				tasks: ['copy:pages']
			},
			regexRepl: {
				files: ['pages/**/*'],
				tasks: ['regex-replace:dev']
			},
			copyDev: {
				files: ['dev/**/*'],
				tasks: ['rsync:dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-eslint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-rsync');

	grunt.registerTask('copy:dev', [
		'copy:pages',
		'copy:preDev'
	]);
	grunt.registerTask('default', [
		'less:dev',
		'copy:dev',
		'concat:dev',
		'eslint',
		/*'concat:modernizr',*/
		'regex-replace:dev'
	]);
	grunt.registerTask('dist', [
		'less:dist',
		'less:ie-dist',
		'uglify:dist',
		'copy:dist',
		'regex-replace:dist',
		'imagemin:dist'
	]);
};
