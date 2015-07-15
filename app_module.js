angular.module("app", [])
.controller('ctrlJmSlidebar', ['$scope', function($scope) {
	$scope.acciones = [
	{
		name:'Acción 1',
		meta: 100,
		rangos: {
			primerRango: 60,
			segundoRango: 81,
			tercerRango: 90
		}
	},
	{
		name:'Acción 2',
		meta: 5,
		rangos: {
		}
	},
	{
		name:'Acción 2',
		meta: 9,
		rangos: {
			primerRango: 3,
			segundoRango: 7
		}
	},
	{
		name:'Acción 2',
		meta: 9,
		rangos: {
			primerRango: 2,
			segundoRango: 3
		}
	},
	{
		name:'Acción 2',
		meta: 70
	}]
}])
.run(function($templateRequest) {
  //$templateRequest("/templates/editor.html");
});
