import * as d3 from 'd3';
// import data from './barChart_data.json'

// that json! prefix is for webpack
const data = require("json!./barChart_data.json");

let maxGdp = () => {
	return data.data.reduce( (pre, cur) => {
		return pre > cur ? pre : cur;
	})
}

let minGdp = () => {
	return data.data.reduce( (pre, cur) => {
		return pre < cur ? pre : cur;
	})[1]
}



// console.log(data.data);

window.onload = () => {


	console.log('max', maxGdp());
	console.log('min', minGdp());

	d3.select(".chart")
		  .selectAll("div")
		    .data(data.data)
		  .enter().append("div")
		    .style("height", d => {
		    	// console.log(d[1]);
		    	// return '20px';
		    	return d[1] / 18000 * 100 + '%'
		    	// return d * 10 + "px";
		    });
}
