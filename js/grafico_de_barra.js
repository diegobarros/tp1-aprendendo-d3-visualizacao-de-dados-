/*
 * Criação do Gráfico de Barras
 *
 * Grupo: Bruno Schneider, Diego Barros, Guilherme Santos e Priscilla Vasconcelos
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
    d.name = "Frequency"
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


 /* 1 - Grid Lines: Método para desenhar as linhas do Grid */
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

// Desenha a linha da média
// A ideia é desenhar por trás (antes) das barras
var media = d3.mean(data, function(d) { return d.frequency; })

svg.append("line")
    .attr("class", "linha-da-media")
    .attr("x1", 0)
    .attr("y1", y(media))
    .attr("x2", width)
    .attr("y2", y(media));

svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.letter); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); })
      .attr("data-legend", function(d) { return d.name });
});



/*
 * 2 - Legenda
 */
legend = svg.append("g")
  .attr("class","legend")
  .attr("transform","translate(850,10)")
  .style("font-size","14px")
  .call(d3.legend);

setTimeout(function() {
    legend
      .attr("data-style-padding", 12)
      .call(d3.legend)
  }, 500)


/*
 * 3 - Linha de Referência
 */


/*
 * 4 - Detalhe Sob Demanda
 */

$(".bar rect").tipsy({
    gravity: 'w',
    html: true,
    title: function(d) {
        return d.frequency;
    }
});

/*
 * 5 - Opções de Ordenação
 */


