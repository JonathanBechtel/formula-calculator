google.load('visualization', '1.0', {'packages':['corechart']});

var data;

function drawChart() {
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Ingredient');
	data.addColumn('number', 'Mass');
	data.addRows([
	]);
	
	/*for (var i = 0; i < state.runRows.length; i++) {
		data.addRows.push([state.runRows[i].ingredient, state.runRows[i].totalAmount])
	}*/
	
	var options = {
		'title': 'Formula Breakdown By Weight',
		'width': 400,
		'height': 300
	};
	
	var chart = new google.visualization.PieChart(document.getElementById('chartDiv'));
	chart.draw(data, options);
};
