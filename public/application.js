'use strict';

//defining main module and module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//define the init function for starting up the application
angular.element(document).ready(function() {
	//Init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});