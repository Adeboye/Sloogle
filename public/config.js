'use strict';

//COnfig module
var ApplicationConfiguration = (function() {
    //Init module configuration options
    var applicationModuleName = 'Sloogle';
    var applicationModuleVendorDependencies = [
        'ngAnimate',
        'ngAria',
        'ngMessages',
        'ngMaterial',
        'ui.router',
        'cl.paging'
    ];

    var registerModule = function(moduleName, dependencies) {
        // Create angular module
		angular.module(moduleName, dependencies || []);

        // Add the module to the AngularJS configuration file
		angular.module(applicationModuleName).requires.push(moduleName);
    };

    return {
		applicationModuleName: applicationModuleName,
		applicationModuleVendorDependencies: applicationModuleVendorDependencies,
		registerModule: registerModule
	};
})();