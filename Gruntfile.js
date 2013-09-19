"use strict";

module.exports = function (grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				seperator: ';'
			},
			dev: {
				files: {
					'js/old-ie.js': ['bower/html5shiv/dist/html5shiv.js', 'bower/respond/respond.min.js']
				}
			},
			dist: {
				files: {
					'js/old-ie.js': ['bower_components/html5shiv/dist/html5shiv.js', 'js/respond.min.js']
				}
			}
		},
		less: {
			dev: {
				options: {
				},
				files: {'css/style.css': 'css/style.less'}
			},
			dist: {
				options: {
					yuicompress: true
				},
				files: {'css/style.min.css': 'css/style.less'}
			}
		},
		uglify: {
			dist: {
				files: {
				}
			}
		},
		watch: {
			compileCss: {
				files: ['css/*.less'],
				tasks: ['less:dev']
			},
			catJs: {
				files: ['**/*.js'],
				tasks: ['concat:dev']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less:dev', 'concat:dev']);
	grunt.registerTask('dist', ['less:dist', 'concat:dist', 'uglify:dist']);
	grunt.registerTask('copyall', ['copy:testserverPhp', 'copy:testserverCss', 'copy:testserverJs', 'copy:testserverApi']);
};
