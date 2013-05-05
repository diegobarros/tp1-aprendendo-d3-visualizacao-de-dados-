
/*
 * Criação do Gráfico de Barras
 */

var margin = {top: 20, right: 20, bottom: 30, left: 60},
    width = 1024 - margin.left - margin.right,
    height = 530 - margin.top - margin.bottom;

var formatPercent = d3.format(".0%");

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(formatPercent);

var svg = d3.select("#container-grafico").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


/*
 * 1 - Grid Lines 
 */


/* Função para criar a linha do Grid no eixo X */
function cria_eixo_x() {        
   return d3.svg.axis()
   		 .scale(x)
         .orient("bottom")
         .ticks(5)
}


/* Função para criar a linha do Grid no eixo Y */
function cria_eixo_y() {        
    return d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(5)
}


d3.tsv("dados/data.tsv", function(error, data) {

  data.forEach(function(d) {
    d.frequency = +d.frequency;
  });

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
      
      
 /* 1 - Grid Lines: Método para desenhar  */
 svg.append("g")         
      .attr("class", "grid")
      .attr("transform", "translate(0," + height + ")")
      .call(cria_eixo_x()
      .tickSize(-height, 0, 0)
      .tickFormat(""));

  svg.append("g")         
      .attr("class", "grid")
      .call(cria_eixo_y()
      .tickSize(-width, 0, 0)
      .tickFormat(""));
      
      
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });

});






/*
 * 2 - Legenda 
 */



/*
 * 3 - Linha de Referência 
 */



/*
 * 4 - Detalhe Sob Demanda 
 */

$(".bar").tipsy ({
	gravity: 'w',
	html: true,
	title: function() {
    	return 'Hi there! My color is'; 
    }
});

/*
 * 5 - Opções de Ordenação 
 */


