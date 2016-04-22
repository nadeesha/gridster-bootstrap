module.exports = function(grunt) {

	//Where we tell Grunt we plan to use this plug-in.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		//configure uglify
		uglify: {
		    build: {
		        src: 'gridster-bootstrap.js',
		        dest: 'gridster-bootstrap.min.js'
		    }
		}
	});//grunt_config

    //Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['uglify']);
};