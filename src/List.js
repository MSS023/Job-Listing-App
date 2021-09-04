import "./List.css";
import data from "./data.json";
import React,{useState} from "react";

function List(props) {
	const [filter,setFilter]=useState([]);
  	function Filter(e) {
    	var val=e.target.name;
    	for(var i=0;i<filter.length;i++)
      		if(filter[i]===val)
        		return;
    	setFilter((filter,props) => {var arr=[...filter,val];
    	    return arr});
  	}
	
	function handleClear(){
		setFilter([]);
	}
	
	function handleRemove(e) {
		const val=e.target.name;
		var i=0;
		while(filter[i]!==val)
			i++;
		console.log(i)
		setFilter((filter,props) => {
			var arr=[...filter];
			console.log(arr.splice(i,1));
			return arr;
		})
	}
	
	return <div className="List">
		<div className="filter">
        	<div className="list">
          		{filter.map((f) => <div className="element">
              		<button className="filter-element" name={f}>{f}</button>
              		<button className="remove" name={f} onClick={handleRemove}><button className="button-image" name={f}/></button>
              	</div>)}
        	</div>
        	<pre className="clear" onClick={handleClear}>clear</pre>
      	</div>
		{data.map((d) => 
		{
			var arr=[];
			d.languages.forEach((l) => {arr.push(l)})
			if(arr.length<3 && d.tools.length>0)
				arr.push(d.tools[0]);
			return <div className={"list-item "+d.featured}>
				<div className="logo">
					<img className="logo-image" src={d.logo} alt="logo" />
				</div>
				<div className="details">
					<div className="company">
						{d.company}
						<button className={"new-"+d.new}>NEW!</button>
						<button className={"featured-"+d.featured}>FEATURED</button>
					</div>
					<div className="position">
						{d.position}
					</div>
					<div className="timepos">
						<pre>{d.postedAt+"  •  "+d.contract+"  •  "+d.location}</pre>
					</div>
				</div>
				<hr />
				<div className="skills">
					<button className="skill" name={d.role} onClick={Filter}>{d.role}</button>
					<button className="skill" name={d.level} onClick={Filter}>{d.level}</button>
					{arr.map((s) => <button className="skill" name={s} onClick={Filter}>{s}</button>)}
				</div>
			</div>}
		)}
	</div>
}

export default List;