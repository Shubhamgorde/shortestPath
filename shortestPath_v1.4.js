const readline = require('readline');
const fs = require('fs');

var count=0;
var lineArray=[];
var graph=[];
var dist=[];    
const radius=4000;

//Function used to find if object is contained by array
Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (JSON.parse(this[i]) === obj) {
            return true;
        }
    }
    return false;
}

//Pushing edge in graph array
function addEdge(u,v,w){
    graph.push([u, v, w])
}

//Function used for calculating shortest path
function shortestTrip(latitude, longitude, canTravel, origin, destination){
    dist=[];
    for(let i=0;i<lineArray[0].length;i++){
        dist[i]=Infinity;
    }
    dist[origin]=0;
    //Using Bellman Ford algorithm to calculate shortest distance
    for(let i=0;i<dist.length-1;i++){
        for(let j=0;j<graph.length;j++){
            if(dist[graph[j][0]]!=Infinity && dist[graph[j][0]]+graph[j][2]<dist[graph[j][1]]){
                dist[graph[j][1]]=dist[graph[j][0]]+graph[j][2];
            }
        }
    }
}

//Function used to calculate tuple {source,destination,weight} for graph matrix 
var formGraph=function(lineArray){
    for(let i=0;i<lineArray[0].length;i++){
        for(let j=0;j<lineArray[0].length;j++){
            let temp=JSON.parse(lineArray[2][i].trim()).split(" ")
            if(temp.contains(j)){
                let weight=0;
                //Calculate distance between two points when (lat,long) is given
                weight=radius*Math.acos(Math.sin(lineArray[0][i])*Math.sin(lineArray[0][j]) + Math.cos(lineArray[0][i]) * Math.cos(lineArray[0][j]) * Math.cos(lineArray[1][i]-lineArray[1][j]));
                addEdge(i,j,weight);
            }
            else{
                addEdge(i,j,Infinity);
            }
        }
    }
}

//Create interface to read a input file
const rl = readline.createInterface({
    input: fs.createReadStream('input.txt'),
    crlfDelay: Infinity
});

//Parse input from file 
var promise=new Promise((resolve,reject)=>rl.on('line', (line) => {
    if(line){
        lineArray[count++]=line.trim().replace(/[{}]/g, "").split(",");
        if(count==5){
            resolve(lineArray);
        }   
    }
}));

promise.then((resolve)=>{
    return formGraph(lineArray);
});

promise.then(()=>{
    return shortestTrip(lineArray[0],lineArray[1],lineArray[2],lineArray[3],lineArray[4])
});

//Print final output
promise.then(()=>{
    //If distance is Infinity means there is no path between source and destination, so marking it as -1
    for(i=0;i<dist.length;i++){
        if(dist[i]==Infinity){
            dist[i]=-1;
        }
    }
    console.log(`Shortest Distance Array from source ${lineArray[3]}: [`+dist+']');
    console.log(`Shortest path from origin/source ${lineArray[3]} to destination ${lineArray[4]} is : `+dist[lineArray[4]])
})

// //check validations/constraints
// promise.then(()=>{
//     console.log("lengths:: ",lineArray[0].length , lineArray[1].length ,lineArray[2].length, (lineArray[0].length>=1 && lineArray[0].length<=20) && (lineArray[0].length==lineArray[1].length && lineArray[0].length==lineArray[2].length));
//     if((lineArray[0].length>=1 && lineArray[0].length<=20) && (lineArray[0].length==lineArray[1].length && lineArray[0].length==lineArray[2].length)){
        
//         for(let j=0;j<lineArray[2].length;j++){
//             let temp=JSON.parse(lineArray[2][j].trim()).split(" ") 
//             if(temp && temp.length<=lineArray[0].length-1){
//                 for(let i=0;i<temp.length;i++){
//                     console.log(JSON.parse(temp[i])>lineArray[0].length ,JSON.parse(temp[i]),lineArray[0].length )
//                     if(JSON.parse(temp[i])>lineArray[0].length || JSON.parse(temp[i])<0){
//                         console.log("Error Input: Wrong paths provided.")
//                         //return Promise.reject("Error Input: Wrong paths provided.")
//                     }
//                 }
//             }
//             else{
//                 console.log("More Paths provided than vertices")
//                 //return Promise.reject("More Paths provided than vertices.")
//             }
//         }
//         //resolve();
//     }   
//     else{
//         console.log("Error input: Please validate input for lat/long array lengths");
//         //return Promise.reject("Error input: Please validate input for lat/long array lengths.")
//     }
// })

promise.catch((err)=>{
    console.log("Error")
});