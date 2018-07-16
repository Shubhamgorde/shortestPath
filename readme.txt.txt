How to execute program
To update input, please modify input.txt file.
@ input.txt
Example
{0, 0, 70}  //lattitude array 
{90, 0, 45} //longitude array respective to lattitude array
{"2", "0 2", "0 1"} // Paths array of nodes: first value means path exists between location 0 and location 2, 2nd value("0 2") means path exists between location 1 and location 0 aand 2 
0 //Source from which shortest path/distance needs to be calculated
1 //destination to which we are calculating shortest path/distance	
option 1:
1. You need to have nodejs installed.
2. Move to project directory using cd command. ~/shortestPath
2. Run using command

	node shortestPath_v1.4.js

option 2:
1. Open in browser : https://www.tutorialspoint.com/nodejs_terminal_online.php
2. Upload your project(input.txt and shortestPath_v1.3.js)
3. Run the program using command:
	
	node shortestPath_v1.4.js
