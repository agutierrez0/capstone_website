import React, { useEffect } from 'react';
import * as d3 from "d3";

export default function PlotData({inputData}) {
    useEffect(() => {
        var lineFunc = d3.line()
        .x(function(d) { return d.x })
        .y(function(d) { return d.y })


        d3.select("#map-container-1")
        .append("svg")
        .append('path')
        .attr('d', lineFunc(inputData))
        .attr('stroke', 'black')
        .attr('fill', 'none')
        .attr("width", 800)
        .attr("height", 200)    
    }, [inputData])
    
    return null
}