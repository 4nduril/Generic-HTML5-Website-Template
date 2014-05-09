/* jshint node:true */

"use strict";

module.exports = function (grunt) {

	var name = '<%= pkg.name %>';

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				seperator: ';'
			},
			dev: {
				files: [
					{src: ['bower/html5shiv/dist/html5shiv.js', 'bower/respond/respond.min.js'], dest: 'dev/js/old-ie.js'},
					{src: ['js/*.js'], dest: 'dev/js/' + name + '.js'},
					{src: ['bower/rem-unit-polyfill/js/rem.js'], dest: 'dev/js/old-ie2-superweirdbehaviour.js'}
				]
			},
			modernizr: {
				files: [
					{src: ['bower/modernizr/modernizr.js', 'dev/js/' + name + '.js'], dest: 'dev/js/' + name + '.js'}
				]
			}
		},
		copy: {
			dev: {
				files: [
					{
						expand: true,
						src: ['bower/jquery/jquery.js'],
						dest: 'dev/js/',
						flatten: true
					},
					{
						expand: true,
						cwd: 'pages/',
						src: ['**/*.html', '**/*.php'],
						dest: 'dev/'
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						src: ['bower/jquery/jquery.min.js'],
						dest: 'dist/js/',
						flatten: true
					},
					{
						expand: true,
						cwd: 'pages/',
						src: ['**/*.html', '**/*.php'],
						dest: 'dist/'
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
			},
		},
		jshint: {
			files: ['dev/js/' + name + '.js'],
		},
		less: {
			dev: {
				options: {
				},
				files: {'dev/css/style.css': 'css/style.less'}
			},
			dist: {
				options: {
					yuicompress: true
				},
				files: {'dist/css/style.min.css': 'css/style.less'}
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
				'src': ['dev/js/src/*.js', 'dev/css/*.css']
			}
		},
		"regex-replace": {
			dist: {
				src: ['dist/**/*.html', 'dist/**/*.php'],
				actions: [
					{
						name: 'Minify script tag',
						search: /(?:\.min)*(\.js)(?!o)/g,
						replace: '.min$1'
					},
					{
						name: 'Minify CSS',
						search: /(?:\.min)*(\.css)/g,
						replace: '.min$1'
					}/*,
					{
						name: 'Dist-Base-Address',
						search: /(\$BASE = "http:\/\/)[^"]+/,
						replace: '$1expedition-colonia.de/'
					}*/
				]
			}
		},
		uglify: {
			dist: {
				files: [
					{
						src: ['js/build/modernizr-custom.js', 'js/*.js'],
						dest: 'dist/js/' + name + '.min.js'
					},
					{
						src: ['bower/html5shiv/dist/html5shiv.js', 'bower/respond/respond.min.js'],
						dest: 'dist/js/old-ie.min.js'
					},
					{
						src: ['bower/rem-unit-polyfill/js/rem.min.js'],
						dest: 'dist/js/old-ie2-superweirdbehaviour.min.js'
					}
				]
			}
		},
		watch: {
			compileCss: {
				files: ['css/*.less'],
				tasks: ['less:dev']
			},
			catJs: {
				files: ['js/*.js'],
				tasks: ['concat:dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-modernizr');
	grunt.loadNpmTasks('grunt-regex-replace');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less:dev', 'concat:dev', 'jshint', 'concat:modernizr', 'copy:dev']);
	grunt.registerTask('dist', ['less:dist', 'uglify:dist', 'copy:dist', 'regex-replace:dist']);
/*	grunt.registerTask('dist', ['less:dist', 'modernizr:dist', 'uglify:dist', 'copy:dist', 'regex-replace:dist']);*/
};
