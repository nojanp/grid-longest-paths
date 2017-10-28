var m, n, sx, sy, tx, ty;
var R5m, R5n, R5sx, R5sy, R5tx, R5ty;

var left = [];
var up = [];
var right = [];
var down = [];

var R5left = [];
var R5up = [];
var R5right = [];
var R5down = [];

var MaxResBTleft = [];
var MaxResBTup = [];
var MaxResBTright = [];
var MaxResBTdown = [];

var BTpathMaxLen = 0;
var BTpathLen = 0;
var BTcurNodex = 0;
var BTcurNodey = 0;

//R1
var isR1Empty = 0;
var R1UpRow = 0;
var R1DownRow = 0;
var R1LeftColumn = 0;
var R1RightColumn = 0;

//R2
var isR2Empty = 0;
var R2UpRow = 0;
var R2DownRow = 0;
var R2LeftColumn = 0;
var R2RightColumn = 0;

//R3
var isR3Empty = 0;
var R3UpRow = 0;
var R3DownRow = 0;
var R3LeftColumn = 0;
var R3RightColumn = 0;

//R4
var isR4Empty = 0;
var R4UpRow = 0;
var R4DownRow = 0;
var R4LeftColumn = 0;
var R4RightColumn = 0;

//R5
var isR5Empty = 0;
var R5UpRow = 0;
var R5DownRow = 0;
var R5LeftColumn = 0;
var R5RightColumn = 0;

var changeSTflag = 0;

function preprocess() {
	left = [];
	up = [];
	right = [];
	down = [];

	R5left = [];
	R5up = [];
	R5right = [];
	R5down = [];

	MaxResBTleft = [];
	MaxResBTup = [];
	MaxResBTright = [];
	MaxResBTdown = [];

	BTpathMaxLen = 0;
	BTpathLen = 0;
	BTcurNodex = 0;
	BTcurNodey = 0;

	//R1
	isR1Empty = 0;
	R1UpRow = 0;
	R1DownRow = 0;
	R1LeftColumn = 0;
	R1RightColumn = 0;

	//R2
	isR2Empty = 0;
	R2UpRow = 0;
	R2DownRow = 0;
	R2LeftColumn = 0;
	R2RightColumn = 0;

	//R3
	isR3Empty = 0;
	R3UpRow = 0;
	R3DownRow = 0;
	R3LeftColumn = 0;
	R3RightColumn = 0;

	//R4
	isR4Empty = 0;
	R4UpRow = 0;
	R4DownRow = 0;
	R4LeftColumn = 0;
	R4RightColumn = 0;

	//R5
	isR5Empty = 0;
	R5UpRow = 0;
	R5DownRow = 0;
	R5LeftColumn = 0;
	R5RightColumn = 0;

	changeSTflag = 0;
}

function draw() {
	var canvas = document.getElementById("myCanvas");
	var ctx = canvas.getContext("2d");
	canvas.width = m * 20 + 20;
	canvas.height = n * 20 + 20;
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	for(i=1; i <= m; i++) {
			for(j=1; j <= n; j++) {
				ctx.beginPath();
				ctx.arc(i*20, j*20, 1, 0, 2*Math.PI, false);
				ctx.fillStyle = 'black';
				ctx.fill();

				//left
				if(i != 1 && left[i][j] == 1) {
					ctx.strokeStyle = 'green';
					ctx.lineWidth = 4;
					ctx.beginPath();
					ctx.moveTo(i*20-1, j*20);
					ctx.lineTo((i-1)*20+1, j*20);
					ctx.stroke();
				}

				//up
				if(j != 1 && up[i][j] == 1) {
					ctx.strokeStyle = 'green';
					ctx.lineWidth = 4;
					ctx.beginPath();
					ctx.moveTo(i*20, j*20-1);
					ctx.lineTo(i*20, (j-1)*20+1);
					ctx.stroke();
				}

				//right
				if(i != m) {
					if(right[i][j] == 1) {
						ctx.strokeStyle = 'green';
						ctx.lineWidth = 4;
					}
					else {
						ctx.lineWidth = 1;
						ctx.strokeStyle = 'grey';
					}

					ctx.beginPath();
					ctx.moveTo(i*20+1, j*20);
					ctx.lineTo((i+1)*20-1, j*20);
					ctx.stroke();
				}

				//down
				if(j != n) {
					if(down[i][j] == 1) {
						ctx.strokeStyle = 'green';
						ctx.lineWidth = 4;

					}
					else {
						ctx.lineWidth = 1;
						ctx.strokeStyle = 'grey';
					}

					ctx.beginPath();
					ctx.moveTo(i*20, j*20+1);
					ctx.lineTo(i*20, (j+1)*20-1);
					ctx.stroke();
				}
				
			}
		}
		//// S
		ctx.beginPath();
		ctx.arc(sx*20, sy*20, 4, 0, 2*Math.PI, false);
		ctx.fillStyle = 'red';
		ctx.fill();

		if(changeSTflag == 0) {
			ctx.font = '15px Courier New';
			ctx.fillStyle = 'blue';
			ctx.fillText("S", sx*20-12, sy*20+2);
		}
		else if(changeSTflag == 1) {
			ctx.font = '15px Courier New';
			ctx.fillStyle = 'blue';
			ctx.fillText("T", sx*20-12, sy*20+2);
		}
		

		//// T
		ctx.beginPath();
		ctx.arc(tx*20, ty*20, 4, 0, 2*Math.PI, false);
		ctx.fillStyle = 'orange';
		ctx.fill();

		if(changeSTflag == 0) {
			ctx.font = '15px Courier New';
			ctx.fillStyle = 'blue';
			ctx.fillText("T", tx*20-12, ty*20+2);
		}
		else if(changeSTflag == 1) {
			ctx.font = '15px Courier New';
			ctx.fillStyle = 'blue';
			ctx.fillText("S", tx*20-12, ty*20+2);
		}
		

		// ctx.beginPath()
		// ctx.moveTo(20, 21);
		// ctx.lineTo(20, 39);
		// ctx.strokeStyle = 'blue';
		// ctx.lineWidth = 4;
		// ctx.stroke();

		ctx.drawImage(canvas, 0, 0);
}

function RisTwoRect() {
	//// R is a two rect with special case (F2*)
	if(n == 2 && m > 4 && (sx == tx || (sx == tx-1 && sy != ty)))  {
		if(sx+tx >= (m-sx)+(m-tx)) {
			for(i = 2; i <= sx-1; i++){
				left[i][sy] = right[i][sy] = 1;
			}
			for(i = 2; i <= tx-1; i++) {
				left[i][ty] = right[i][ty] = 1;
			}
			left[sx][sy] = 1;
			left[tx][ty] = 1;
			right[1][1] = down[1][1] = 1;
			right[1][2] = up[1][2] = 1;
		}
		else {
			for(i = sx+1; i <= m-1; i++) {
				left[i][sy] = right[i][sy] =  1; 
			}
			for(i = tx+1; i <= m-1; i++) {
				left[i][ty] = right[i][ty] = 1;
			}
			right[sx][sy] = 1;
			right[tx][ty] = 1;
			left[m][1] = down[m][1] = 1;
			left[m][2] = up[m][2] = 1;
		}
	}
	else if(m == 2 && n > 4 && (sy == ty || (sy == ty-1 && sx != tx) || (sy == ty+1 && sx != tx) ) ) {
		if(sy+ty >= (n-sy)+(n-ty)) {
			for(j = 2; j <= sy-1; j++) {
				up[sx][j] = down[sx][j] = 1;
			}
			for(j = 2; j <= ty-1; j++) {
				up[tx][j] = down[tx][j] = 1;
			}
			up[sx][sy] = 1;
			up[tx][ty] = 1;
			down[1][1] = right[1][1] = 1;
			down[2][1] = left[2][1] = 1;
		}
		else {
			for(j = sy+1; j <= n-1; j++) {
				up[sx][j] = down[sx][j] = 1;
			}
			for(j = ty+1; j <= n-1; j++) {
				up[tx][j] = down[tx][j] = 1;
			}
			down[sx][sy] = 1;
			down[tx][ty] = 1;
			up[1][n] = right[1][n] = 1;
			up[2][n] = left[2][n] = 1;
		}
	}
}

function peeling() {
	//vertical peeling
    //// R1 borders
    if(sx <= 2) {
    	isR1Empty = 1;
    }
    else {
    	R1UpRow = 1;
    	R1DownRow = n;
    	R1LeftColumn = 1;
    	if( (sx-1)%2 == 0 ) {
    		R1RightColumn = sx-1;
    	}
    	else {
    		R1RightColumn = sx-2;
    	}
    }

    //// R2 borders    
    if(tx >= m-1) {
    	isR2Empty = 1;
    }
    else {
    	R2UpRow = 1;
    	R2DownRow = n;
    	R2RightColumn = m;
    	if( (m-tx)%2 == 0) {
    		R2LeftColumn = tx+1;
    	}
    	else {
    		R2LeftColumn = tx+2;
    	}
    }

    //// R3 borders
    if(sy <= 2 || ty <= 2) {
    	isR3Empty = 1;
    }
    else {
    	R3UpRow = 1;
    	var minsty = Math.min(sy, ty);
    	if(isR1Empty == 0) {
    		R3LeftColumn = R1RightColumn+1;
    	}
    	else {
    		R3LeftColumn = 1;
    	}
    	if(isR2Empty == 0) {
    		R3RightColumn = R2LeftColumn-1;
    	}
    	else {
    		R3RightColumn = m;
    	}
    	if( (minsty-1)%2 == 0 ) {
    		R3DownRow = minsty-1;
    	}
    	else {
    		R3DownRow = minsty-2;
    	}
    }

    //// R4 borders
    if(sy >=  n-1 || ty >= n-1) {
    	isR4Empty = 1;
    }
    else {
    	R4DownRow = n;
    	var maxsty = Math.max(sy, ty);
    	if(isR1Empty == 0) {
    		R4LeftColumn = R1RightColumn+1;
    	}
    	else {
    		R4LeftColumn = 1;
    	}
    	if(isR2Empty == 0) {
    		R4RightColumn = R2LeftColumn-1;
    	}
    	else {
    		R4RightColumn = m;
    	}
    	if( (n-maxsty)%2 == 0 ) {
    		R4UpRow = maxsty+1;
    	}
    	else {
    		R4UpRow = maxsty+2;
    	}
    }

    //// R5 borders
    if(isR1Empty == 0) {
    	R5LeftColumn = R1RightColumn+1;
    }
    else {
    	R5LeftColumn = 1;
    }
    if(isR2Empty == 0){
    	R5RightColumn = R2LeftColumn-1;
    }
    else {
    	R5RightColumn = m;
    }
    if(isR3Empty == 0) {
    	R5UpRow = R3DownRow+1;
    }
    else {
    	R5UpRow = 1;
    }
    if(isR4Empty == 0) {
    	R5DownRow = R4UpRow-1;
    }
    else {
    	R5DownRow = n;
    }

    //horizontal peeling
    if( ( ((n%2 == 1) && (m%2 == 1)) || ((n%2 == 0) && (m%2 == 1)) ) && (sx == tx) ) {
    	//// R3 borders
    	isR3Empty = 0;
    	if(sy <= 2 || ty <= 2) {
    		isR3Empty = 1;
    	}
    	else {
    		var minsty = Math.min(sy, ty);
    		R3UpRow = 1;
    		R3LeftColumn = 1;
    		R3RightColumn = m;
    		if( (minsty-1)%2 == 0 ) {
    			R3DownRow = minsty-1;
    		}
    		else {
    			R3DownRow = minsty-2;
    		}
    	}

        //// R4 borders
        isR4Empty = 0;
        if(sy >=  n-1 || ty >= n-1) {
        	isR4Empty = 1;
        }
        else {
        	var maxsty = Math.max(sy, ty);
        	R4DownRow = n;
        	R4LeftColumn = 1;
        	R4RightColumn = m;
        	if( (n-maxsty)%2 == 0 ) {
        		R4UpRow = maxsty+1;
        	}
        	else {
        		R4UpRow = maxsty+2;
        	}
        }

        ////R1 borders
        isR1Empty = 0;
        if(sx <= 2) {
        	isR1Empty = 1;
        }
        else {
        	R1LeftColumn = 1;
        	if( (sx-1)%2 == 0 ) {
        		R1RightColumn = sx-1;
        	}
        	else {
        		R1RightColumn = sx-2;
        	}
        	if(isR3Empty == 0) {
        		R1UpRow = R3DownRow+1;
        	}
        	else {
        		R1UpRow = 1;
        	}
        	if(isR4Empty == 0) {
        		R1DownRow = R4UpRow-1;
        	}
        	else {
        		R1DownRow = m;
        	}
        }

        //// R2borders
        isR2Empty = 0;
        if(tx >= m-1) {
        	isR2Empty = 1;
        }
        else {
        	R2RightColumn = m;
        	if( (m-tx)%2 == 0 ) {
        		R2LeftColumn = tx+1;
        	}
        	else {
        		R2LeftColumn = tx+2;
        	}
        	if(isR3Empty == 0) {
        		R2UpRow = R3DownRow+1;
        	}
        	else {
        		R2UpRow = 1;
        	}
        	if(isR4Empty == 0) {
        		R2DownRow = R4UpRow-1;
        	}
        	else {
        		R2DownRow = m;
        	}
        }
    }

    ////////////////////////////////////////////// check proper
    if( (m%2==0) && (n%2==0) && ( R5RightColumn-R5LeftColumn == 1 || R5DownRow-R5UpRow == 1) && (tx-sx == 1) ) {
    	if( (sx!=tx) && ( (((sx+sy)%2 == 1) && (ty == sy+1) ) ||
    		( ((sx+sy)%2 == 0) && (ty == sy-1)) ) ) {
            ////// here we know that our peeling is not proper and we should adjust it
            if(isR3Empty == 1 && isR4Empty == 1) {
            	if(isR1Empty == 0) {
            		R1RightColumn--;
            		R5LeftColumn--;
            		if(R1RightColumn==R1LeftColumn) {
            			R5LeftColumn--;
            			R1LeftColumn = R1RightColumn = R1UpRow = R1DownRow = 0;
            			isR1Empty = 1;
            		}
            	}
            	else if(isR2Empty == 0) {
            		R2LeftColumn++;
            		R5RightColumn++;
            		if(R2LeftColumn==R2RightColumn) {
            			R5RightColumn++;
            			R2LeftColumn = R2RightColumn = R2UpRow = R2DownRow = 0;
            			isR2Empty = 1;
            		}
            	}
            }
            else {
            	if(R5RightColumn - R5LeftColumn == 1) {
            		if(isR3Empty == 0) {
            			R3DownRow++;
            			R5UpRow++;
            		}
            		else if(isR4Empty == 0) {
            			R4UpRow--;
            			R5DownRow--;
            		}
            	}
            	else if(R5DownRow - R5UpRow == 1) {
            		if(isR3Empty == 0) {
            			R3DownRow--;
            			R5UpRow--;
            			if(R3UpRow == R3DownRow) {
            				R5UpRow--;
            				R3LeftColumn = R3RightColumn = R3UpRow = R3DownRow = 0;
            				isR3Empty = 1;
            			}
            		}
            		else if(isR4Empty == 0) {
            			R4UpRow++;
            			R5DownRow++;
            			if(R4UpRow == R4DownRow) {
            				R5DownRow++;
            				R4LeftColumn = R4RightColumn = R4UpRow = R4DownRow = 0;
            				isR4Empty = 1;
            			}
            		}
            	}
            }
        }
    }
}

function hamiltonianPath() {
	/////////////////////// R1
    var isR1HamiltonianCycleUp = 0;
    var isR1HamiltonianCycleLeft = 0;
    if(isR1Empty == 0) {
        if((R1DownRow-R1UpRow+1)%2 == 0) {
            isR1HamiltonianCycleLeft = 1;
            //right column
            for(i=R1UpRow+1; i < R1DownRow; i++) {
                left[R1RightColumn][i] = right[R1RightColumn][i ] = 0;
                up[R1RightColumn][i] = down[R1RightColumn][i] = 1;
            }
            
            // up row
            for(i=R1LeftColumn+1; i < R1RightColumn; i++) {
                left[i][R1UpRow] = right[i][R1UpRow] = 1;
                up[i][R1UpRow] = down[i][R1UpRow] = 0;
            }
            
            //down row
            for(i=R1LeftColumn+1; i < R1RightColumn; i++) {
                left[i][R1DownRow] = right[i][R1DownRow] = 1;                          
                up[i][R1DownRow] = down[i][R1DownRow] = 0;
            }
            
            if(R1RightColumn-R1LeftColumn == 1) { //2-rectangle
                //left column
                for(i=R1UpRow+1; i < R1DownRow; i++) {
                    left[R1LeftColumn][i] = 0;
                    right[R1LeftColumn][i] = 0;
                    up[R1LeftColumn][i] = 1;
                    down[R1LeftColumn][i] = 1;
                }
            }
            else {
                //left column
                for(i=R1UpRow+1; i < R1DownRow; i++) {
                    left[R1LeftColumn][i] = 0;
                    right[R1LeftColumn][i] = 1;
                    if((i-R1UpRow+1)%2 == 0){
                        up[R1LeftColumn][i] = 1;
                        down[R1LeftColumn][i] = 0;
                    }
                    else {
                        up[R1LeftColumn][i] = 0;
                        down[R1LeftColumn][i] = 1;
                    }
                }

                // column befor right column
                for(i=R1UpRow+1; i < R1DownRow; i++) {
                    left[R1RightColumn-1][i] = 1;
                    right[R1RightColumn-1][i] = 0;
                    if((i-R1UpRow+1)%2 == 0) {
                        up[R1RightColumn-1][i] = 0;
                        down[R1RightColumn-1][i] = 1;
                    }
                    else {
                        up[R1RightColumn-1][i] = 1;
                        down[R1RightColumn-1][i] = 0;
                    }
                }
                // inner nodes
                for(i=R1LeftColumn+1; i < R1RightColumn-1; i++) {
                    for(j=R1UpRow+1; j < R1DownRow; j++) {
                        left[i][j] = right [i][j] = 1;
                        up[i][j] = down[i][j] = 0;
                    }
                }
            }
            
            ////// corner nodes
            //right up
            left[R1RightColumn][R1UpRow] = 1;
            right[R1RightColumn][R1UpRow] = 0;
            up[R1RightColumn][R1UpRow] = 0;
            down[R1RightColumn][R1UpRow] = 1;
            //right down
            left[R1RightColumn][R1DownRow] = 1;
            right[R1RightColumn][R1DownRow] = 0;
            up[R1RightColumn][R1DownRow] = 1;
            down[R1RightColumn][R1DownRow] = 0;
            //left up
            left[R1LeftColumn][R1UpRow] = 0;
            right[R1LeftColumn][R1UpRow] = 1;
            up[R1LeftColumn][R1UpRow] = 0;
            down[R1LeftColumn][R1UpRow] = 1;
            //left down
            left[R1LeftColumn][R1DownRow] = 0;
            right[R1LeftColumn][R1DownRow] = 1;
            up[R1LeftColumn][R1DownRow] = 1;
            down[R1LeftColumn][R1DownRow] = 0;
        }
        else if((R1RightColumn-R1LeftColumn+1)%2 == 0) {
            isR1HamiltonianCycleUp = 1;
            //left column
            for(i=R1UpRow+1; i < R1DownRow; i++) {
                left[R1LeftColumn][i] = 0;
                right[R1LeftColumn][i] = 0;
                up[R1LeftColumn][i] = 1;
                down[R1LeftColumn][i] = 1;
            }
            //down row
            for(i=R1LeftColumn+1; i < R1RightColumn; i++) {
                left[i][R1DownRow] = 1;
                right[i][R1DownRow] = 1;
                up[i][R1DownRow] = 0;
                down[i][R1DownRow] = 0;
            }
            //right column
            for(i=R1UpRow+1; i < R1DownRow; i++) {
                left[R1RightColumn][i] = 0;
                right[R1RightColumn][i] = 0;
                up[R1RightColumn][i] = 1;
                down[R1RightColumn][i] = 1;
            }
            if(R1DownRow-R1UpRow == 1) { //2-rectangle
                //up row
                for(i=R1LeftColumn+1; i < R1RightColumn; i++) {
                    left[i][R1UpRow] = 1;
                    right[i][R1UpRow] = 1;
                    up[i][R1UpRow] = 0;
                    up[i][R1UpRow] = 0;
                }
            }
            else {
                //up row
                for(i=R1LeftColumn+1; i < R1RightColumn; i++) {
                    up[i][R1UpRow] = 0;
                    down[i][R1UpRow] = 1;
                    if((i-R1LeftColumn+1)%2==0) {
                        left[i][R1UpRow] = 1;
                        right[i][R1UpRow] = 0;
                    }
                    else {
                        left[i][R1UpRow] = 0;
                        right[i][R1UpRow] = 1;
                    }
                }
                //row before down row
                for(i=R1LeftColumn+1; i < R1RightColumn; i++) {
                    up[i][R1DownRow-1] = 1;
                    down[i][R1DownRow-1] = 0;
                    if((i-R1LeftColumn+1)%2 == 0) {
                        right[i][R1DownRow-1] = 1;
                        left[i][R1DownRow-1] = 0;
                    }
                    else {
                        right[i][R1DownRow-1] = 0;
                        left[i][R1DownRow-1] = 1;
                    }
                }
                //inner nodes
                for(i=R1LeftColumn+1; i < R1RightColumn; i++) {
                    for(j=R1UpRow+1; j < R1DownRow-1; j++) {
                        left[i][j] = 0;
                        right[i][j] = 0;
                        up[i][j] = 1;
                        down[i][j] = 1;
                    }
                }
                    
            }
            ////// corner nodes
            //right up
            left[R1RightColumn][R1UpRow] = 1;
            right[R1RightColumn][R1UpRow] = 0;
            up[R1RightColumn][R1UpRow] = 0;
            down[R1RightColumn][R1UpRow] = 1;
            //right down
            left[R1RightColumn][R1DownRow] = 1;
            right[R1RightColumn][R1DownRow] = 0;
            up[R1RightColumn][R1DownRow] = 1;
            down[R1RightColumn][R1DownRow] = 0;
            //left up
            left[R1LeftColumn][R1UpRow] = 0;
            right[R1LeftColumn][R1UpRow] = 1;
            up[R1LeftColumn][R1UpRow] = 0;
            down[R1LeftColumn][R1UpRow] = 1;
            //left down
            left[R1LeftColumn][R1DownRow] = 0;
            right[R1LeftColumn][R1DownRow] = 1;
            up[R1LeftColumn][R1DownRow] = 1;
            down[R1LeftColumn][R1DownRow] = 0;
        }
    }   

    /////////////////////// R2
	var isR2HamiltonianCycleRight = 0;
	var isR2HamiltonianCycleUp = 0;
	if(isR2Empty == 0) {
	    if((R2DownRow-R2UpRow+1)%2 == 0) {
	        isR2HamiltonianCycleRight = 1;
	        //left column
	        for(i=R2UpRow+1; i < R2DownRow; i++) {
	            left[R2LeftColumn][i] = right[R2LeftColumn][i] = 0;
	            up[R2LeftColumn][i] = down[R2LeftColumn][i] = 1;
	        }
	        
	        // up row
	        for(i=R2LeftColumn+1; i < R2RightColumn; i++) {
	            left[i][R2UpRow] = right[i][R2UpRow] = 1;
	            up[i][R2UpRow] = down[i][R2UpRow] = 0;
	        }
	        
	        //down row
	        for(i=R2LeftColumn+1; i < R2RightColumn; i++) {
	            left[i][R2DownRow] = right[i][R2DownRow] = 1;                          
	            up[i][R2DownRow] = down[i][R2DownRow] = 0;
	        }
	        
	        if(R2RightColumn-R2LeftColumn == 1) { //2-rectangle
	            //right column
	            for(i=R2UpRow+1; i < R2DownRow; i++) {
	                left[R2RightColumn][i] = 0;
	                right[R2RightColumn][i] = 0;
	                up[R2RightColumn][i] = 1;
	                down[R2RightColumn][i] = 1;
	            }
	        }
	        else {
	            //right column
	            for(i=R2UpRow+1; i < R2DownRow; i++) {
	                left[R2RightColumn][i] = 0;
	                right[R2RightColumn][i] = 1;
	                if((i-R1UpRow+1)%2 == 0){
	                    up[R2RightColumn][i] = 1;
	                    down[R2RightColumn][i] = 0;
	                }
	                else {
	                    up[R2RightColumn][i] = 0;
	                    down[R2RightColumn][i] = 1;
	                }
	            }

	            // column after left column
	            for(i=R2UpRow+1; i < R2DownRow; i++) {
	                left[R2LeftColumn+1][i] = 0;
	                right[R2LeftColumn+1][i] = 1;
	                if((i-R1UpRow+1)%2 == 0) {
	                    up[R2LeftColumn+1][i] = 0;
	                    down[R2LeftColumn+1][i] = 1;
	                }
	                else {
	                    up[R2LeftColumn+1][i] = 1;
	                    down[R2LeftColumn+1][i] = 0;
	                }
	            }
	            // inner nodes
	            for(i=R2LeftColumn+2; i < R2RightColumn; i++) {
	                for(j=R2UpRow+1; j < R2DownRow; j++) {
	                    left[i][j] = right [i][j] = 1;
	                    up[i][j] = down[i][j] = 0;
	                }
	            }
	        }
	        
	        ////// corner nodes
	        //right up
	        left[R2RightColumn][R2UpRow] = 1;
	        right[R2RightColumn][R2UpRow] = 0;
	        up[R2RightColumn][R2UpRow] = 0;
	        down[R2RightColumn][R2UpRow] = 1;
	        //right down
	        left[R2RightColumn][R2DownRow] = 1;
	        right[R2RightColumn][R2DownRow] = 0;
	        up[R2RightColumn][R2DownRow] = 1;
	        down[R2RightColumn][R2DownRow] = 0;
	        //left up
	        left[R2LeftColumn][R2UpRow] = 0;
	        right[R2LeftColumn][R2UpRow] = 1;
	        up[R2LeftColumn][R2UpRow] = 0;
	        down[R2LeftColumn][R2UpRow] = 1;
	        //left down
	        left[R2LeftColumn][R2DownRow] = 0;
	        right[R2LeftColumn][R2DownRow] = 1;
	        up[R2LeftColumn][R2DownRow] = 1;
	        down[R2LeftColumn][R2DownRow] = 0;
	    }
	    else if((R2RightColumn-R2LeftColumn+1)%2 == 0) {
	        isR2HamiltonianCycleUp = 1;
	        //left column
	        for(i=R2UpRow+1; i < R2DownRow; i++) {
	            left[R2LeftColumn][i] = 0;
	            right[R2LeftColumn][i] = 0;
	            up[R2LeftColumn][i] = 1;
	            down[R2LeftColumn][i] = 1;
	        }
	        //down row
	        for(i=R2LeftColumn+1; i < R2RightColumn; i++) {
	            left[i][R2DownRow] = 1;
	            right[i][R2DownRow] = 1;
	            up[i][R2DownRow] = 0;
	            down[i][R2DownRow] = 0;
	        }
	        //right column
	        for(i=R2UpRow+1; i < R2DownRow; i++) {
	            left[R2RightColumn][i] = 0;
	            right[R2RightColumn][i] = 0;
	            up[R2RightColumn][i] = 1;
	            down[R2RightColumn][i] = 1;
	        }
	        if(R2DownRow-R2UpRow == 1) { //2-rectangle
	            //up row
	            for(i=R2LeftColumn+1; i < R2RightColumn; i++) {
	                left[i][R2UpRow] = 1;
	                right[i][R2UpRow] = 1;
	                up[i][R2UpRow] = 0;
	                up[i][R2UpRow] = 0;
	            }
	        }
	        else {
	            //up row
	            for(i=R2LeftColumn+1; i < R2RightColumn; i++) {
	                up[i][R2UpRow] = 0;
	                down[i][R2UpRow] = 1;
	                if((i-R2LeftColumn+1)%2==0) {
	                    left[i][R2UpRow] = 1;
	                    right[i][R2UpRow] = 0;
	                }
	                else {
	                    left[i][R2UpRow] = 0;
	                    right[i][R2UpRow] = 1;
	                }
	            }
	            //row before down row
	            for(i=R2LeftColumn+1; i < R2RightColumn; i++) {
	                up[i][R2DownRow-1] = 1;
	                down[i][R2DownRow-1] = 0;
	                if((i-R2LeftColumn+1)%2 == 0) {
	                    right[i][R2DownRow-1] = 1;
	                    left[i][R2DownRow-1] = 0;
	                }
	                else {
	                    right[i][R2DownRow-1] = 0;
	                    left[i][R2DownRow-1] = 1;
	                }
	            }
	            //inner nodes
	            for(i=R2LeftColumn+1; i < R2RightColumn; i++) {
	                for(j=R2UpRow+1; j < R2DownRow-1; j++) {
	                    left[i][j] = 0;
	                    right[i][j] = 0;
	                    up[i][j] = 1;
	                    down[i][j] = 1;
	                }
	            }
	                
	        }
	        ////// corner nodes
	        //right up
	        left[R2RightColumn][R2UpRow] = 1;
	        right[R2RightColumn][R2UpRow] = 0;
	        up[R2RightColumn][R2UpRow] = 0;
	        down[R2RightColumn][R2UpRow] = 1;
	        //right down
	        left[R2RightColumn][R2DownRow] = 1;
	        right[R2RightColumn][R2DownRow] = 0;
	        up[R2RightColumn][R2DownRow] = 1;
	        down[R2RightColumn][R2DownRow] = 0;
	        //left up
	        left[R2LeftColumn][R2UpRow] = 0;
	        right[R2LeftColumn][R2UpRow] = 1;
	        up[R2LeftColumn][R2UpRow] = 0;
	        down[R2LeftColumn][R2UpRow] = 1;
	        //left down
	        left[R2LeftColumn][R2DownRow] = 0;
	        right[R2LeftColumn][R2DownRow] = 1;
	        up[R2LeftColumn][R2DownRow] = 1;
	        down[R2LeftColumn][R2DownRow] = 0;
	    }
	}

    /////////////////////// R3
    var isR3HamiltonianCycleUp = 0;
    var isR3HamiltonianCycleRight = 0;
    if(isR3Empty == 0) {
        if((R3DownRow-R3UpRow+1)%2 == 0) {
            isR3HamiltonianCycleRight = 1;
            //left column
            for(i=R3UpRow+1; i < R3DownRow; i++) {
                left[R3LeftColumn][i] = right[R3LeftColumn][i] = 0;
                up[R3LeftColumn][i] = down[R3LeftColumn][i] = 1;
            }
            
            // up row
            for(i=R3LeftColumn+1; i < R3RightColumn; i++) {
                left[i][R3UpRow] = right[i][R3UpRow] = 1;
                up[i][R3UpRow] = down[i][R3UpRow] = 0;
            }
            
            //down row
            for(i=R3LeftColumn+1; i < R3RightColumn; i++) {
                left[i][R3DownRow] = right[i][R3DownRow] = 1;                          
                up[i][R3DownRow] = down[i][R3DownRow] = 0;
            }
            
            if(R3RightColumn-R3LeftColumn == 1) { //2-rectangle
                //right column
                for(i=R3UpRow+1; i < R3DownRow; i++) {
                    left[R3RightColumn][i] = 0;
                    right[R3RightColumn][i] = 0;
                    up[R3RightColumn][i] = 1;
                    down[R3RightColumn][i] = 1;
                }
            }
            else {
                //right column
                for(i=R3UpRow+1; i < R3DownRow; i++) {
                    left[R3RightColumn][i] = 1;
                    right[R3RightColumn][i] = 0;
                    if((i-R3UpRow+1)%2 == 0){
                        up[R3RightColumn][i] = 1;
                        down[R3RightColumn][i] = 0;
                    }
                    else {
                        up[R3RightColumn][i] = 0;
                        down[R3RightColumn][i] = 1;
                    }
                }

                // column after left column
                for(i=R3UpRow+1; i < R3DownRow; i++) {
                    left[R3LeftColumn+1][i] = 0;
                    right[R3LeftColumn+1][i] = 1;
                    if((i-R3UpRow+1)%2 == 0) {
                        up[R3LeftColumn+1][i] = 0;
                        down[R3LeftColumn+1][i] = 1;
                    }
                    else {
                        up[R3LeftColumn+1][i] = 1;
                        down[R3LeftColumn+1][i] = 0;
                    }
                }
                // inner nodese
                for(i=R3LeftColumn+2; i < R3RightColumn; i++) {
                    for(j=R3UpRow+1; j < R3DownRow; j++) {
                        left[i][j] = right [i][j] = 1;
                        up[i][j] = down[i][j] = 0;
                    }
                }
            }
            
            ////// corner nodes
            //right up
            left[R3RightColumn][R3UpRow] = 1;
            right[R3RightColumn][R3UpRow] = 0;
            up[R3RightColumn][R3UpRow] = 0;
            down[R3RightColumn][R3UpRow] = 1;
            //right down
            left[R3RightColumn][R3DownRow] = 1;
            right[R3RightColumn][R3DownRow] = 0;
            up[R3RightColumn][R3DownRow] = 1;
            down[R3RightColumn][R3DownRow] = 0;
            //left up
            left[R3LeftColumn][R3UpRow] = 0;
            right[R3LeftColumn][R3UpRow] = 1;
            up[R3LeftColumn][R3UpRow] = 0;
            down[R3LeftColumn][R3UpRow] = 1;
            //left down
            left[R3LeftColumn][R3DownRow] = 0;
            right[R3LeftColumn][R3DownRow] = 1;
            up[R3LeftColumn][R3DownRow] = 1;
            down[R3LeftColumn][R3DownRow] = 0;
            // System.out.prvarln(R3LeftColumn + " " + R3UpRow);
        }
        else if((R3RightColumn-R3LeftColumn+1)%2 == 0) {
            isR3HamiltonianCycleUp = 1;
            //left column
            for(i=R3UpRow+1; i < R3DownRow; i++) {
                left[R3LeftColumn][i] = 0;
                right[R3LeftColumn][i] = 0;
                up[R3LeftColumn][i] = 1;
                down[R3LeftColumn][i] = 1;
            }
            //down row
            for(i=R3LeftColumn+1; i < R3RightColumn; i++) {
                left[i][R3DownRow] = 1;
                right[i][R3DownRow] = 1;
                up[i][R3DownRow] = 0;
                down[i][R3DownRow] = 0;
            }
            //right column
            for(i=R3UpRow+1; i < R3DownRow; i++) {
                left[R3RightColumn][i] = 0;
                right[R3RightColumn][i] = 0;
                up[R3RightColumn][i] = 1;
                down[R3RightColumn][i] = 1;
            }
            if(R3DownRow-R3UpRow == 1) { //2-rectangle
                //up row
                for(i=R3LeftColumn+1; i < R3RightColumn; i++) {
                    left[i][R3UpRow] = 1;
                    right[i][R3UpRow] = 1;
                    up[i][R3UpRow] = 0;
                    up[i][R3UpRow] = 0;
                }
            }
            else {
                //up row
                for(i=R3LeftColumn+1; i < R3RightColumn; i++) {
                    up[i][R3UpRow] = 0;
                    down[i][R3UpRow] = 1;
                    if((i-R3LeftColumn+1)%2==0) {
                        left[i][R3UpRow] = 1;
                        right[i][R3UpRow] = 0;
                    }
                    else {
                        left[i][R3UpRow] = 0;
                        right[i][R3UpRow] = 1;
                    }
                }
                //row before down row
                for(i=R3LeftColumn+1; i < R3RightColumn; i++) {
                    up[i][R3DownRow-1] = 1;
                    down[i][R3DownRow-1] = 0;
                    if((i-R3LeftColumn+1)%2 == 0) {
                        right[i][R3DownRow-1] = 1;
                        left[i][R3DownRow-1] = 0;
                    }
                    else {
                        right[i][R3DownRow-1] = 0;
                        left[i][R3DownRow-1] = 1;
                    }
                }
                //inner nodes
                for(i=R3LeftColumn+1; i < R3RightColumn; i++) {
                    for(j=R3UpRow+1; j < R3DownRow-1; j++) {
                        left[i][j] = 0;
                        right[i][j] = 0;
                        up[i][j] = 1;
                        down[i][j] = 1;
                    }
                }
                    
            }
            ////// corner nodes
            //right up
            left[R3RightColumn][R3UpRow] = 1;
            right[R3RightColumn][R3UpRow] = 0;
            up[R3RightColumn][R3UpRow] = 0;
            down[R3RightColumn][R3UpRow] = 1;
            //right down
            left[R3RightColumn][R3DownRow] = 1;
            right[R3RightColumn][R3DownRow] = 0;
            up[R3RightColumn][R3DownRow] = 1;
            down[R3RightColumn][R3DownRow] = 0;
            //left up
            left[R3LeftColumn][R3UpRow] = 0;
            right[R3LeftColumn][R3UpRow] = 1;
            up[R3LeftColumn][R3UpRow] = 0;
            down[R3LeftColumn][R3UpRow] = 1;
            //left down
            left[R3LeftColumn][R3DownRow] = 0;
            right[R3LeftColumn][R3DownRow] = 1;
            up[R3LeftColumn][R3DownRow] = 1;
            down[R3LeftColumn][R3DownRow] = 0;
        }
    }


    /////////////////////// R4
    var isR4HamiltonianCycleDown = 0;
    var isR4HamiltonianCycleRight = 0;
    if(isR4Empty == 0) {
        if((R4DownRow-R4UpRow+1)%2 == 0) {
            isR4HamiltonianCycleRight = 1;
            //left column
            for(i=R4UpRow+1; i < R4DownRow; i++) {
                left[R4LeftColumn][i] = right[R4LeftColumn][i] = 0;
                up[R4LeftColumn][i] = down[R4LeftColumn][i] = 1;
            }
            
            // up row
            for(i=R4LeftColumn+1; i < R4RightColumn; i++) {
                left[i][R4UpRow] = right[i][R4UpRow] = 1;
                up[i][R4UpRow] = down[i][R4UpRow] = 0;
            }
            
            //down row
            for(i=R4LeftColumn+1; i < R4RightColumn; i++) {
                left[i][R4DownRow] = right[i][R4DownRow] = 1;                          
                up[i][R4DownRow] = down[i][R4DownRow] = 0;
            }
            
            if(R4RightColumn-R4LeftColumn == 1) { //2-rectangle
                //right column
                for(i=R4UpRow+1; i < R4DownRow; i++) {
                    left[R4RightColumn][i] = 0;
                    right[R4RightColumn][i] = 0;
                    up[R4RightColumn][i] = 1;
                    down[R4RightColumn][i] = 1;
                }
            }
            else {
                //right column
                for(i=R4UpRow+1; i < R4DownRow; i++) {
                    left[R4RightColumn][i] = 1;
                    right[R4RightColumn][i] = 0;
                    if((i-R4UpRow+1)%2 == 0){
                        up[R4RightColumn][i] = 1;
                        down[R4RightColumn][i] = 0;
                    }
                    else {
                        up[R4RightColumn][i] = 0;
                        down[R4RightColumn][i] = 1;
                    }
                }

                // column after left column
                for(i=R4UpRow+1; i < R4DownRow; i++) {
                    left[R4LeftColumn+1][i] = 0;
                    right[R4LeftColumn+1][i] = 1;
                    if((i-R4UpRow+1)%2 == 0) {
                        up[R4LeftColumn+1][i] = 0;
                        down[R4LeftColumn+1][i] = 1;
                    }
                    else {
                        up[R4LeftColumn+1][i] = 1;
                        down[R4LeftColumn+1][i] = 0;
                    }
                }
                // inner nodes
                for(i=R4LeftColumn+2; i < R4RightColumn; i++) {
                    for(j=R4UpRow+1; j < R4DownRow; j++) {
                        left[i][j] = right [i][j] = 1;
                        up[i][j] = down[i][j] = 0;
                    }
                }
            }
            
            ////// corner nodes
            //right up
            left[R4RightColumn][R4UpRow] = 1;
            right[R4RightColumn][R4UpRow] = 0;
            up[R4RightColumn][R4UpRow] = 0;
            down[R4RightColumn][R4UpRow] = 1;
            //right down
            left[R4RightColumn][R4DownRow] = 1;
            right[R4RightColumn][R4DownRow] = 0;
            up[R4RightColumn][R4DownRow] = 1;
            down[R4RightColumn][R4DownRow] = 0;
            //left up
            left[R4LeftColumn][R4UpRow] = 0;
            right[R4LeftColumn][R4UpRow] = 1;
            up[R4LeftColumn][R4UpRow] = 0;
            down[R4LeftColumn][R4UpRow] = 1;
            //left down
            left[R4LeftColumn][R4DownRow] = 0;
            right[R4LeftColumn][R4DownRow] = 1;
            up[R4LeftColumn][R4DownRow] = 1;
            down[R4LeftColumn][R4DownRow] = 0;
        }
        else if((R4RightColumn-R4LeftColumn+1)%2 == 0) {
            isR4HamiltonianCycleDown = 1;
            //left column
            for(i=R4UpRow+1; i < R4DownRow; i++) {
                left[R4LeftColumn][i] = 0;
                right[R4LeftColumn][i] = 0;
                up[R4LeftColumn][i] = 1;
                down[R4LeftColumn][i] = 1;
            }
            //up row
            for(i=R4LeftColumn+1; i < R4RightColumn; i++) {
                left[i][R4UpRow] = 1;
                right[i][R4UpRow] = 1;
                up[i][R4UpRow] = 0;
                down[i][R4UpRow] = 0;
            }
            //right column
            for(i=R4UpRow+1; i < R4DownRow; i++) {
                left[R4RightColumn][i] = 0;
                right[R4RightColumn][i] = 0;
                up[R4RightColumn][i] = 1;
                down[R4RightColumn][i] = 1;
            }
            if(R4DownRow-R4UpRow == 1) { //2-rectangle
                //down row
                for(i=R4LeftColumn+1; i < R4RightColumn; i++) {
                    left[i][R4DownRow] = 1;
                    right[i][R4DownRow] = 1;
                    up[i][R4DownRow] = 0;
                    up[i][R4DownRow] = 0;
                }
            }
            else {
                //down row
                for(i=R4LeftColumn+1; i < R4RightColumn; i++) {
                    up[i][R4DownRow] = 1;
                    down[i][R4DownRow] = 0;
                    if((i-R4LeftColumn+1)%2==0) {
                        left[i][R4DownRow] = 1;
                        right[i][R4DownRow] = 0;
                    }
                    else {
                        left[i][R4DownRow] = 0;
                        right[i][R4DownRow] = 1;
                    }
                }
                //row after up row
                for(i=R4LeftColumn+1; i < R4RightColumn; i++) {
                    up[i][R4DownRow-1] = 0;
                    down[i][R4DownRow-1] = 1;
                    if((i-R4LeftColumn+1)%2 == 0) {
                        right[i][R4DownRow-1] = 1;
                        left[i][R4DownRow-1] = 0;
                    }
                    else {
                        right[i][R4DownRow-1] = 0;
                        left[i][R4DownRow-1] = 1;
                    }
                }
                //inner nodes
                for(i=R4LeftColumn+1; i < R4RightColumn; i++) {
                    for(j=R4UpRow+2; j < R4DownRow; j++) {
                        left[i][j] = 0;
                        right[i][j] = 0;
                        up[i][j] = 1;
                        down[i][j] = 1;
                    }
                }
                    
            }
            ////// corner nodes
            //right up
            left[R4RightColumn][R4UpRow] = 1;
            right[R4RightColumn][R4UpRow] = 0;
            up[R4RightColumn][R4UpRow] = 0;
            down[R4RightColumn][R4UpRow] = 1;
            //right down
            left[R4RightColumn][R4DownRow] = 1;
            right[R4RightColumn][R4DownRow] = 0;
            up[R4RightColumn][R4DownRow] = 1;
            down[R4RightColumn][R4DownRow] = 0;
            //left up
            left[R4LeftColumn][R4UpRow] = 0;
            right[R4LeftColumn][R4UpRow] = 1;
            up[R4LeftColumn][R4UpRow] = 0;
            down[R4LeftColumn][R4UpRow] = 1;
            //left down
            left[R4LeftColumn][R4DownRow] = 0;
            right[R4LeftColumn][R4DownRow] = 1;
            up[R4LeftColumn][R4DownRow] = 1;
            down[R4LeftColumn][R4DownRow] = 0;
        }
    }
}

function horizontalFlip(flipLeft, flipUp, flipRight, flipDown, flipM, flipN) {
	//// copying flip arrays to flipMem arrays
	var flipLeftMem = [];
	var flipUpMem = [];
	var flipRightMem = [];
	var flipDownMem = [];
	for(i = 1; i <= flipM; i++) {
		flipLeftMem[i] = [];
		flipUpMem[i] = [];
		flipRightMem[i] = [];
		flipDownMem[i] = [];
		for(j = 1; j <= flipN; j++) {
			flipLeftMem[i][j] = flipLeft[i][j];
			flipUpMem[i][j] = flipUp[i][j];
			flipRightMem[i][j] = flipRight[i][j];
			flipDownMem[i][j] = flipDown[i][j];
		}
	}

	for(i = 1; i <= flipM; i++) {
		for(j = 1; j <= flipN; j++) {
			flipLeft[i][j] = flipLeftMem[i][flipN-j+1];
			flipUp[i][j] = flipDownMem[i][flipN-j+1];
			flipRight[i][j] = flipRightMem[i][flipN-j+1];
			flipDown[i][j] = flipUpMem[i][flipN-j+1];
		}
	}
}

function Rotate180degree(rotLeft, rotUp, rotRight, rotDown, rotM, rotN) {
	//// copying rot arrays to rotMem arrays
	var rotLeftMem = [];
	var rotUpMem = [];
	var rotRightMem = [];
	var rotDownMem = [];
	for(i = 1; i <= rotM; i++) {
		rotLeftMem[i] = [];
		rotUpMem[i] = [];
		rotRightMem[i] = [];
		rotDownMem[i] = [];
		for(j = 1; j <= rotN; j++) {
			rotLeftMem[i][j] = rotLeft[i][j];
			rotUpMem[i][j] = rotUp[i][j];
			rotRightMem[i][j] = rotRight[i][j];
			rotDownMem[i][j] = rotDown[i][j];
		}
	}

	for(i = 1; i <= rotM; i++) {
		for(j = 1; j <= rotN; j++) {
			rotLeft[i][j] = rotRightMem[rotM-i+1][rotN-j+1];
			rotUp[i][j] = rotDownMem[rotM-i+1][rotN-j+1];
			rotRight[i][j] = rotLeftMem[rotM-i+1][rotN-j+1];
			rotDown[i][j] = rotUpMem[rotM-i+1][rotN-j+1];
		}
	}
}

function rotate90degreeClockwise(rotLeft, rotUp, rotRight, rotDown, rotM, rotN) {
	//// copying rot arrays to rotMem arrays
	var rotLeftMem = [];
	var rotUpMem = [];
	var rotRightMem = [];
	var rotDownMem = [];
	for(i = 1; i <= rotM; i++) {
		rotLeftMem[i] = [];
		rotUpMem[i] = [];
		rotRightMem[i] = [];
		rotDownMem[i] = [];
		for(j = 1; j <= rotN; j++) {
			rotLeftMem[i][j] = rotLeft[i][j];
			rotUpMem[i][j] = rotUp[i][j];
			rotRightMem[i][j] = rotRight[i][j];
			rotDownMem[i][j] = rotDown[i][j];
		}
	}

	//// initializing new arrays
	for(i = 1; i <= rotN; i++) {
		rotLeft[i] = [];
		rotUp[i] = [];
		rotRight[i] = [];
		rotDown[i] = [];
		for(j = 1; j <= rotM; j++) {
			rotLeft[i][j] = rotUp[i][j] = rotRight[i][j] = rotDown[i][j] = 0;
		}
	}

	for(i = 1; i <= rotN; i++) {
		for(j = 1; j <= rotM; j++) {
			rotLeft[i][j] = rotDownMem[j][rotN-i+1];
			rotUp[i][j] = rotLeftMem[j][rotN-i+1];
			rotRight[i][j] = rotUpMem[j][rotN-i+1];
			rotDown[i][j] = rotRightMem[j][rotN-i+1];
		}
	}
}

function EERsTwoRectConnection(junction) {
	if(junction == "left") {
		for(i = 3; i <= R5m-1; i++) {
			for(j = R5n-1; j <= R5n; j++) {
				R5left[i][j] = 1;
				R5up[i][j] = 0;
				R5right[i][j] = 1;
				R5down[i][j] = 0;
			}
		}
		R5left[R5m][R5n-1] = R5down[R5m][R5n-1] = 1;
		R5left[R5m][R5n] = R5up[R5m][R5n] = 1;
		if(R5sx == 1 && R5sy == R5n) {
			R5right[1][R5n] = 1;
			R5left[2][R5n] = R5right[2][R5n] = 1;
			R5left[2][R5n-1] = R5right[2][R5n-1] = 1;
			R5right[1][R5n-1] = R5up[1][R5n-1] = 1;	
		}
		else if(R5sx == 2 && R5sy == R5n-1) {
			R5up[1][R5n] = R5right[1][R5n] = 1;
			R5left[2][R5n] = R5right[2][R5n] = 1;
			R5right[2][R5n-1] = 1;
			R5up[1][R5n-1] = 1;	
		}
		else if(R5sx == 2 && R5sy == R5n) {
			R5right[2][R5n] = 1;
			R5left[2][R5n-1] = R5right[2][R5n-1] = 1;
			R5right[1][R5n-1] = R5up[1][R5n-1] = 1;	
		}
	}
	else if(junction == "right"){
		if(R5sx == 1 && R5sy == R5n-1) {
			for(i = 3; i <= R5m-2; i++) {
				R5down[i][R5n-1] = R5up[i][R5n] = 1;
				if(i%2 == 0) {
					R5right[i][R5n-1] = R5left[i][R5n] = 1;
				}
				else {
					R5left[i][R5n-1] = R5right[i][R5n] = 1;
				}
			}
			
			R5down[1][R5n-1] = 1;
			R5up[1][R5n] = R5right[1][R5n] = 1;
			R5left[2][R5n] = R5up[2][R5n] = 1;
			R5right[2][R5n-1] = R5down[2][R5n-1] = 1;

			R5left[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
			R5up[R5m-1][R5n] = R5right[R5m-1][R5n] = 1;
			R5left[R5m][R5n] = R5up[R5m][R5n] = 1;
			R5up[R5m][R5n-1] = R5down[R5m][R5n-1] = 1;
		}
		else if (R5sx == 2 && R5sy == R5n-1) {
			for(i = 3; i <= R5m-2; i++) {
				R5down[i][R5n-1] = R5up[i][R5n] = 1;
				if(i%2 == 0) {
					R5right[i][R5n] = R5left[i][R5n-1] = 1;
				}
				else {
					R5left[i][R5n] = R5right[i][R5n-1] = 1;
				}
			}

			R5down[1][R5n-1] = R5right[1][R5n-1] = 1;
			R5up[1][R5n] = R5right[1][R5n] = 1;
			R5left[2][R5n] = R5right[2][R5n] = 1;
			R5left[2][R5n-1] = 1;

			R5right[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
			R5left[R5m-1][R5n] = R5up[R5m-1][R5n] = 1;
			R5left[R5m][R5n-1] = R5up[R5m][R5n-1] = 1;
		}
		else if(R5sx == 1 && R5sy == R5n) {
			for(i = 3; i <= R5m-2; i++) {
				R5down[i][R5n-1] = R5up[i][R5n] = 1;
				if(i%2 == 0) {
					R5right[i][R5n] = R5left[i][R5n-1] = 1;
				}
				else {
					R5left[i][R5n] = R5right[i][R5n-1] = 1;
				}
			}

			R5right[1][R5n-1] = R5down[1][R5n-1] = 1;
			R5up[1][R5n] = 1;
			R5up[2][R5n] = R5right[2][R5n] = 1;
			R5left[2][R5n-1] = R5down[2][R5n-1] = 1;

			R5right[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
			R5left[R5m-1][R5n] = R5up[R5m-1][R5n] = 1;
			R5left[R5m][R5n-1] = R5up[R5m][R5n-1] = 1;
		}
		else if(R5sx == 2 && R5sy == R5n) {
			for(i = 3; i <= R5m-2; i++) {
				R5down[i][R5n-1] = R5up[i][R5n] = 1;
				if(i%2 == 0) {
					R5right[i][R5n-1] = R5left[i][R5n] = 1;
				}
				else {
					R5left[i][R5n-1] = R5right[i][R5n] = 1;
				}
			}

			R5right[1][R5n-1] = R5down[1][R5n-1] = 1;
			R5up[1][R5n] = R5right[1][R5n] = 1;
			R5left[2][R5n] = 1;
			R5left[2][R5n-1] = R5right[2][R5n-1] = 1;

			R5left[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
			R5up[R5m-1][R5n] = R5right[R5m-1][R5n] = 1;
			R5left[R5m][R5n] = R5up[R5m][R5n] = 1;
			R5up[R5m][R5n-1] = R5down[R5m][R5n-1] = 1;
		}
	}
}

function EERtTwoRectConnection(junction) {
	var R5sxMem = R5sx;
	var R5syMem = R5sy;
	R5sx = 1 + (R5m-R5tx);
	R5sy = R5n - (R5ty-1);

	Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);
	if(junction == "left") {
		EERsTwoRectConnection("right");
	}
	else {
		EERsTwoRectConnection("left");
	}
	Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);

	R5sx = R5sxMem;
	R5sy = R5syMem;
}

function EERmConnection(junction) {
	for(i = 2; i <= R5m-1; i++) {
		for(j = 3; j <= R5n-2; j++) {
			R5left[i][j] = R5right[i][j] = 1;
		}
	}
	if(junction == "left") {
		for(j = 3; j <= R5n-2; j++) {
			R5right[1][j] = R5left[R5m][j] = 1;
			if(j%2 == 0) {
				R5down[1][j] = R5up[R5m][j] = 1; 
			}
			else {
				R5up[1][j] = R5down[R5m][j] = 1;
			}
		}
	}
	else if(junction == "right") {
		for(j = 3; j <= R5n-2; j++) {
			R5right[1][j] = R5left[R5m][j] = 1;
			if(j%2 == 0) {
				R5up[1][j] = R5down[R5m][j] = 1;
			}
			else {
				
				R5down[1][j] = R5up[R5m][j] = 1;
			}
		}
	}
}

function OORsTwoRectConnection() {
	if(R5sx == 1 && R5sy == R5n-1) {
		for(i = 3; i <= R5m-2; i++) {
			R5down[i][R5n-1] = R5up[i][R5n] = 1;
			if(i%2 == 0) {
				R5right[i][R5n-1] = R5left[i][R5n] = 1;
			}
			else {
				R5left[i][R5n-1] = R5right[i][R5n] = 1;
			}
		}
		
		R5down[1][R5n-1] = 1;
		R5up[1][R5n] = R5right[1][R5n] = 1;
		R5left[2][R5n] = R5up[2][R5n] = 1;
		R5right[2][R5n-1] = R5down[2][R5n-1] = 1;

		R5right[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
		R5left[R5m-1][R5n] = R5up[R5m-1][R5n] = 1;
		R5left[R5m][R5n-1] = R5up[R5m][R5n-1] = 1;
	}
	else if (R5sx == 2 && R5sy == R5n-1) {
		for(i = 3; i <= R5m-2; i++) {
			R5down[i][R5n-1] = R5up[i][R5n] = 1;
			if(i%2 == 0) {
				R5right[i][R5n] = R5left[i][R5n-1] = 1;
			}
			else {
				R5left[i][R5n] = R5right[i][R5n-1] = 1;
			}
		}

		R5down[1][R5n-1] = R5right[1][R5n-1] = 1;
		R5up[1][R5n] = R5right[1][R5n] = 1;
		R5left[2][R5n] = R5right[2][R5n] = 1;
		R5left[2][R5n-1] = 1;

		R5left[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
		R5up[R5m-1][R5n] = R5right[R5m-1][R5n] = 1;
		R5left[R5m][R5n] = R5up[R5m][R5n] = 1;
		R5up[R5m][R5n-1] = R5down[R5m][R5n-1] = 1;	
	}
	else if(R5sx == 1 && R5sy == R5n) {
		for(i = 3; i <= R5m-2; i++) {
			R5down[i][R5n-1] = R5up[i][R5n] = 1;
			if(i%2 == 0) {
				R5right[i][R5n] = R5left[i][R5n-1] = 1;
			}
			else {
				R5left[i][R5n] = R5right[i][R5n-1] = 1;
			}
		}

		R5right[1][R5n-1] = R5down[1][R5n-1] = 1;
		R5up[1][R5n] = 1;
		R5up[2][R5n] = R5right[2][R5n] = 1;
		R5left[2][R5n-1] = R5down[2][R5n-1] = 1;

		R5left[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
		R5up[R5m-1][R5n] = R5right[R5m-1][R5n] = 1;
		R5left[R5m][R5n] = R5up[R5m][R5n] = 1;
		R5up[R5m][R5n-1] = R5down[R5m][R5n-1] = 1;
	}
	else if(R5sx == 2 && R5sy == R5n) {
		for(i = 3; i <= R5m-2; i++) {
			R5down[i][R5n-1] = R5up[i][R5n] = 1;
			if(i%2 == 0) {
				R5right[i][R5n-1] = R5left[i][R5n] = 1;
			}
			else {
				R5left[i][R5n-1] = R5right[i][R5n] = 1;
			}
		}

		R5right[1][R5n-1] = R5down[1][R5n-1] = 1;
		R5up[1][R5n] = R5right[1][R5n] = 1;
		R5left[2][R5n] = 1;
		R5left[2][R5n-1] = R5right[2][R5n-1] = 1;

		R5right[R5m-1][R5n-1] = R5down[R5m-1][R5n-1] = 1;
		R5left[R5m-1][R5n] = R5up[R5m-1][R5n] = 1;
		R5left[R5m][R5n-1] = R5up[R5m][R5n-1] = 1;		
	}
}

function OORtTwoRectConnection() {
	var R5sxMem = R5sx;
	var R5syMem = R5sy;
	R5sx = 1 + (R5m-R5tx);
	R5sy = R5n - (R5ty-1);

	Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);
	OORsTwoRectConnection("right");
	Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);

	R5sx = R5sxMem;
	R5sy = R5syMem;
}

function OORmConnection() {
	for(i = 2; i <= R5m-1; i++) {
		for(j = 3; j <= R5n-2; j++) {
			R5left[i][j] = R5right[i][j] = 1;
		}
	}
	for(j = 3; j <= R5n-2; j++) {
		R5right[1][j] = R5left[R5m][j] = 1;
		if(j%2 == 0) {
			R5down[1][j] = R5up[R5m][j] = 1;
		}
		else {
			R5up[1][j] = R5down[R5m][j] = 1;
		}
	}
}

function OERmConnection(junction) {
	for(i = 2; i <= R5m-1; i++) {
		for(j = 3; j <= R5n-2; j++) {
			R5left[i][j] = R5right[i][j] = 1;
		}
	}
	if(junction == "SleftTrightLen") {
		for(j = 3; j <= R5n-2; j++) {
			R5right[1][j] = R5left[R5m][j] = 1;
			if(j%2 == 0) {
				R5up[1][j] = R5down[R5m][j] = 1;
			}
			else {
				R5down[1][j] = R5up[R5m][j] = 1;
			}
		}
	}
	else if(junction == "SrightTleftLen") {
		for(j = 3; j <= R5n-2; j++) {
			R5right[1][j] = R5left[R5m][j] = 1;
			if(j%2 == 0) {
				R5down[1][j] = R5up[R5m][j] = 1;

			}
			else {
				R5up[1][j] = R5down[R5m][j] = 1;
			}
		}
	}
}

function twoRectR5middle(twoLeft, twoUp, twoRight, twoDown, m1, m2, junction) {
	for(i = m1; i <= m2; i++) {
		twoUp[i][2] = twoDown[i][1] = 1;
	}
	if(junction == "leftUpIn") {
		for(i = m1; i <= m2; i++) {
			if( (i-m1+1)%2 == 0 ) {
				twoRight[i][1] = twoLeft[i][2] = 1;
			}
			else {
				twoLeft[i][1] = twoRight[i][2] = 1;
			}
		}
	}
	else if(junction == "leftDownIn") {
		for(i = m1; i <= m2; i++) {
			if( (i-m1+1)%2 == 0 ) {
				twoLeft[i][1] = twoRight[i][2] = 1;
			}
			else {
				twoRight[i][1] = twoLeft[i][2] = 1;
			}
		}
	}
}

function threeRectR5middle(junction) {
	for(i = 4; i <= R5m-3; i++) { 
		R5left[i][1] = R5right[i][1] = 1;
		R5left[i][2] = R5right[i][2] = 1;
		R5left[i][3] = R5right[i][3] = 1;
	}

	if(junction == "leftUpIn") {
		R5right[3][1] = R5left[3][1] = 1;
		R5right[3][2] = R5down[3][2] = 1;
		R5right[3][3] = R5up[3][3] = 1;

		R5left[R5m-2][1] = R5down[R5m-2][1] = 1;
		R5left[R5m-2][2] = R5up[R5m-2][2] = 1;
		R5left[R5m-2][3] = R5right[R5m-2][3] = 1;
	}
	else if(junction == "leftDownIn") {
		R5right[3][1] = R5down[3][1] = 1;
		R5right[3][2] = R5up[3][2] = 1;
		R5right[3][3] = R5left[3][3] = 1;

		R5left[R5m-2][1] = R5right[R5m-2][1] = 1;
		R5left[R5m-2][2] = R5down[R5m-2][2] = 1;
		R5left[R5m-2][3] = R5up[R5m-2][3] = 1;
	}
}

function threeRectRs(junction) {
	if(junction == "leftUpIn") {
		if(R5sx == 2 && R5sy == 3) {
			//1
			R5right[1][1] = 0;
			R5down[1][1] = 0;
			//2
			R5up[1][2] = 0;
			R5right[1][2] = 1;
			R5down[1][2] = 1;
			//3
			R5up[1][3] = 1;
			R5right[1][3] = 1;
			//4
			R5left[2][1] = 0;
			R5down[2][1] = 1;
			R5right[2][1] = 1;
			//5
			R5left[2][2] = 1;
			R5up[2][2] = 1;
			R5down[2][2] = 0;
			//6
			R5left[2][3] = 1;
			R5up[2][3] = 0;
		}
		else if(R5sx == 1 && R5sy == 3) {
			//1
			R5right[1][1] = 1;
			R5down[1][1] = 1;
			//2
			R5up[1][2] = 1;
			R5right[1][2] = 1;
			R5down[1][2] = 0;
			//3
			R5up[1][3] = 0;
			R5right[1][3] = 1;
			//4
			R5left[2][1] = 1;
			R5down[2][1] = 0;
			R5right[2][1] = 1;
			//5
			R5left[2][2] = 1;
			R5up[2][2] = 0;
			R5down[2][2] = 1;
			//6
			R5left[2][3] = 1;
			R5up[2][3] = 1;

		}
		else if(R5sx == 1 && R5sy == 2) {
			//1
			R5right[1][1] = 0;
			R5down[1][1] = 0;
			//2
			R5up[1][2] = 0;
			R5right[1][2] = 0;
			R5down[1][2] = 1;
			//3
			R5up[1][3] = 1;
			R5right[1][3] = 1;
			//4
			R5left[2][1] = 0;
			R5down[2][1] = 1;
			R5right[2][1] = 1;
			//5
			R5left[2][2] = 0;
			R5up[2][2] = 1;
			R5down[2][2] = 1;
			//6
			R5left[2][3] = 1;
			R5up[2][3] = 1;

		}
		else if(R5sx == 2 && R5sy == 2) {
			//1
			R5right[1][1] = 1;
			R5down[1][1] = 1;
			//2
			R5up[1][2] = 1;
			R5right[1][2] = 0;
			R5down[1][2] = 1;
			//3
			R5up[1][3] = 1;
			R5right[1][3] = 1;
			//4
			R5left[2][1] = 1;
			R5down[2][1] = 0;
			R5right[2][1] = 1;
			//5
			R5left[2][2] = 0;
			R5up[2][2] = 0;
			R5down[2][2] = 1;
			//6
			R5left[2][3] = 1;
			R5up[2][3] = 1;

		}
		else if(R5sx == 1 && R5sy == 1) {
			//1
			R5right[1][1] = 0;
			R5down[1][1] = 1;
			//2
			R5up[1][2] = 1;
			R5right[1][2] = 0;
			R5down[1][2] = 1;
			//3
			R5up[1][3] = 1;
			R5right[1][3] = 1;
			//4
			R5left[2][1] = 0;
			R5down[2][1] = 1;
			R5right[2][1] = 1;
			//5
			R5left[2][2] = 0;
			R5up[2][2] = 1;
			R5down[2][2] = 1;
			//6
			R5left[2][3] = 1;
			R5up[2][3] = 1;

		}
	}
	else if(junction == "leftDownIn") {
		if(R5sx == 1 && R5sy == 3) {
			//1
			R5right[1][1] = 1;
			R5down[1][1] = 1;
			//2
			R5up[1][2] = 1;
			R5right[1][2] = 0;
			R5down[1][2] = 1;
			//3
			R5up[1][3] = 1;
			R5right[1][3] = 0;
			//4
			R5left[2][1] = 1;
			R5down[2][1] = 1;
			//5
			R5left[2][2] = 0;
			R5up[2][2] = 1;
			R5down[2][2] = 1;
			//6
			R5left[2][3] = 0;
			R5up[2][3] = 1;
			R5right[2][3] = 1;

		}
		else if(R5sx == 1 && R5sy == 2) {
			//1
			R5right[1][1] = 1;
			R5down[1][1] = 1;
			//2
			R5up[1][2] = 1;
			R5right[1][2] = 0;
			R5down[1][2] = 0;
			//3
			R5up[1][3] = 0;
			R5right[1][3] = 0;
			//4
			R5left[2][1] = 1;
			R5down[2][1] = 1;
			//5
			R5left[2][2] = 0;
			R5up[2][2] = 1;
			R5down[2][2] = 1;
			//6
			R5left[2][3] = 0;
			R5up[2][3] = 1;
			R5right[2][3] = 1;

		}
		else if(R5sx == 2 && R5sy == 2) {
			//1
			R5right[1][1] = 1;
			R5down[1][1] = 1;
			//2
			R5up[1][2] = 1;
			R5right[1][2] = 0;
			R5down[1][2] = 1;
			//3
			R5up[1][3] = 1;
			R5right[1][3] = 1;
			//4
			R5left[2][1] = 1;
			R5down[2][1] = 1;
			//5
			R5left[2][2] = 0;
			R5up[2][2] = 1;
			R5down[2][2] = 0;
			//6
			R5left[2][3] = 1;
			R5up[2][3] = 0;
			R5right[2][3] = 1;

		}
		else if(R5sx == 1 && R5sy == 1) {
			//1
			R5right[1][1] = 1;
			R5down[1][1] = 0;
			//2
			R5up[1][2] = 0;
			R5right[1][2] = 1;
			R5down[1][2] = 1;
			//3
			R5up[1][3] = 1;
			R5right[1][3] = 1;
			//4
			R5left[2][1] = 1;
			R5down[2][1] = 1;
			//5
			R5left[2][2] = 1;
			R5up[2][2] = 1;
			R5down[2][2] = 0;
			//6
			R5left[2][3] = 1;
			R5up[2][3] = 0;
			R5right[2][3] = 1;

		}
		else if(R5sx == 2 && R5sy == 1) {
			//1
			R5right[1][1] = 1;
			R5down[1][1] = 1;
			//2
			R5up[1][2] = 1;
			R5right[1][2] = 1;
			R5down[1][2] = 0;
			//3
			R5up[1][3] = 0;
			R5right[1][3] = 0;
			//4
			R5left[2][1] = 1;
			R5down[2][1] = 0;
			//5
			R5left[2][2] = 1;
			R5up[2][2] = 0;
			R5down[2][2] = 1;
			//6
			R5left[2][3] = 0;
			R5up[2][3] = 1;
			R5right[2][3] = 1;
		}
	}
}

function threeRectRt(junction) {
	var R5sxMem = R5sx;
	var R5syMem = R5sy;
	R5sx = 1 + (R5m-R5tx);
	R5sy = R5n - (R5ty-1);

	Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);
	threeRectRs(junction);
	Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);

	R5sx = R5sxMem;
	R5sy = R5syMem;
}

function longestPathBTpreparation(BTleft, BTup, BTright, BTdown, BTm, BTn, BTsx, BTsy, BTtx, BTty) {
	for(i = 1; i <= BTm; i++) {
		for(j = 1; j <= BTn; j++) {
			BTleft[i][j] = BTup[i][j] = BTright[i][j] = BTdown[i][j] = 0;
		}
	}
	for(i = 1; i <= BTm; i++) {
		MaxResBTleft[i] = [];
		MaxResBTup[i] = [];
		MaxResBTright[i] = [];
		MaxResBTdown[i] = [];
		for(j = 1; j <= BTn; j++) {
			MaxResBTleft[i][j] = MaxResBTup[i][j] = MaxResBTright[i][j] = MaxResBTdown[i][j] = 0;
		}
	}
	BTpathMaxLen = 0;
	BTpathLen = 0;
	BTcurNodex = BTsx;
	BTcurNodey = BTsy;
}

function longestPathBT(BTleft, BTup, BTright, BTdown, BTm, BTn, BTsx, BTsy, BTtx, BTty) {
	if(BTcurNodex == BTtx && BTcurNodey == BTty) {
		if(BTpathLen > BTpathMaxLen) {
			BTpathMaxLen = BTpathLen;
			for(i = 1; i <= BTm; i++) {
				for(j = 1; j <= BTn; j++) {
					MaxResBTleft[i][j] = BTleft[i][j];
					MaxResBTup[i][j] = BTup[i][j];
					MaxResBTright[i][j] = BTright[i][j];
					MaxResBTdown[i][j] = BTdown[i][j];
				}
			}
		}
		return;
	}

	if(BTleft[BTcurNodex][BTcurNodey] == 0 && BTcurNodex > 1) {
		if( (BTleft[BTcurNodex-1][BTcurNodey] == 0) && 
			(BTup[BTcurNodex-1][BTcurNodey] == 0) && 
			(BTright[BTcurNodex-1][BTcurNodey] == 0) && 
			(BTdown[BTcurNodex-1][BTcurNodey] == 0) ) {

			BTleft[BTcurNodex][BTcurNodey] = 1;
			BTright[BTcurNodex-1][BTcurNodey] = 1;
			BTpathLen++;
			BTcurNodex--;
			longestPathBT(BTleft, BTup, BTright, BTdown, BTm, BTn, BTsx, BTsy, BTtx, BTty);
			BTcurNodex++;
			BTpathLen--;
			BTleft[BTcurNodex][BTcurNodey] = 0;
			BTright[BTcurNodex-1][BTcurNodey] = 0;
		}
	}
	if(BTup[BTcurNodex][BTcurNodey] == 0 && BTcurNodey > 1) {
		if( (BTleft[BTcurNodex][BTcurNodey-1] == 0) && 
			(BTup[BTcurNodex][BTcurNodey-1] == 0) && 
			(BTright[BTcurNodex][BTcurNodey-1] == 0) && 
			(BTdown[BTcurNodex][BTcurNodey-1] == 0) ) {

			BTup[BTcurNodex][BTcurNodey] = 1;
			BTdown[BTcurNodex][BTcurNodey-1] = 1;
			BTpathLen++;
			BTcurNodey--;
			longestPathBT(BTleft, BTup, BTright, BTdown, BTm, BTn, BTsx, BTsy, BTtx, BTty);
			BTcurNodey++;
			BTpathLen--;
			BTup[BTcurNodex][BTcurNodey] = 0;
			BTdown[BTcurNodex][BTcurNodey-1] = 0;
		}
	}
	if(BTright[BTcurNodex][BTcurNodey] == 0 && BTcurNodex < BTm) {
		if( (BTleft[BTcurNodex+1][BTcurNodey] == 0) && 
			(BTup[BTcurNodex+1][BTcurNodey] == 0) && 
			(BTright[BTcurNodex+1][BTcurNodey] == 0) && 
			(BTdown[BTcurNodex+1][BTcurNodey] == 0) ) {

			BTright[BTcurNodex][BTcurNodey] = 1;
			BTleft[BTcurNodex+1][BTcurNodey] = 1;
			BTpathLen++;
			BTcurNodex++;
			longestPathBT(BTleft, BTup, BTright, BTdown, BTm, BTn, BTsx, BTsy, BTtx, BTty);
			BTcurNodex--;
			BTpathLen--;
			BTright[BTcurNodex][BTcurNodey] = 0;
			BTleft[BTcurNodex+1][BTcurNodey] = 0;
		}
	}
	if(BTdown[BTcurNodex][BTcurNodey] == 0 && BTcurNodey < BTn) {
		if( (BTleft[BTcurNodex][BTcurNodey+1] == 0) && 
			(BTup[BTcurNodex][BTcurNodey+1] == 0) && 
			(BTright[BTcurNodex][BTcurNodey+1] == 0) && 
			(BTdown[BTcurNodex][BTcurNodey+1] == 0) ) {

			BTdown[BTcurNodex][BTcurNodey] = 1;
			BTup[BTcurNodex][BTcurNodey+1] = 1;
			BTpathLen++;
			BTcurNodey++;
			longestPathBT(BTleft, BTup, BTright, BTdown, BTm, BTn, BTsx, BTsy, BTtx, BTty);
			BTcurNodey--;
			BTpathLen--;
			BTdown[BTcurNodex][BTcurNodey] = 0;
			BTup[BTcurNodex][BTcurNodey+1] = 0;
		}
	}
}

function fillR5() {
	for(i=1; i <= R5m; i++) {
		for(j=1; j <= R5n; j++) {
			left[R5LeftColumn+i-1][R5UpRow+j-1] = R5left[i][j];
			up[R5LeftColumn+i-1][R5UpRow+j-1] = R5up[i][j];
			right[R5LeftColumn+i-1][R5UpRow+j-1] = R5right[i][j];
			down[R5LeftColumn+i-1][R5UpRow+j-1] = R5down[i][j];
		}
	}
}

function Rfive() {

	R5m = R5RightColumn-R5LeftColumn+1;
	R5n = R5DownRow-R5UpRow+1;

	
	R5sx = sx;
	R5tx = tx;
	if(isR1Empty == 0) {
		R5sx -= R1RightColumn;
		R5tx -= R1RightColumn;
	}

	R5sy = sy;
	R5ty = ty;
	if(isR3Empty == 0) {
		R5sy -= R3DownRow;
		R5ty -= R3DownRow;
	}	
	
	// initializing R5left, R5up, R5right, and R5down
	for(i = 1; i <= R5m; i++) {
		R5left[i] = [];
		R5up[i] = [];
		R5right[i] = [];
		R5down[i] = [];
		for(j = 1; j <= R5n; j++) {
			R5left[i][j] = R5up[i][j] = R5right[i][j] = R5down[i][j] = 0;
		}
	}

	if( (R5m >= 4) &&  (R5n >= 4) && (R5m > 4 || R5n > 4) ) {
		
		if( (R5m%2 == 0) && (R5n%2 == 0) ) { //// even * even
			
			var rotate90Flag = 0;
			var R5mMem = R5m;
			var R5nMem = R5n;
			var R5sxMem = R5sx;
			var R5syMem = R5sy;
			var R5txMem = R5tx;
			var R5tyMem = R5ty;
			if( (R5sx == 1 && R5sy == R5n-1) && (R5tx == R5m && R5ty == 2) ) { //// special vertical case
				rotate90Flag = 1;
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);
				
				R5sx = 1 + (R5n-R5sy)
				R5sy = R5sxMem;
				R5tx = 1 + (R5n-R5ty)
				R5ty = R5txMem;

				R5m = R5nMem;
				R5n = R5mMem;
			}

			var horizontalFlipFlag = 0;
			if(R5sy < R5ty) {
				horizontalFlipFlag = 1;
				R5sy = R5n-(R5sy-1);
				R5ty = 1+(R5n-R5ty);
			}
			var leftLen = 0;
			var rightLen = 0;
			//// left junction
			if(R5sx == 1 && R5sy == R5n-1) {
				leftLen = 0;
			}
			else {
				if( (R5sx+R5sy)%2 == 0 ) { //// if s is white
					leftLen += 2*R5m-1;
				}
				else {
					leftLen += 2*R5m;
				}
				if( (R5tx+R5ty)%2 == 1 ) { //// if t is black
					leftLen += 2*R5m-1;
				}
				else { //// if t is white
					leftLen += 2*R5m;
				}
			}
			

			//// right junction
			if(R5tx == R5m && R5ty == 2) {
				rightLen = 0;
			}
			else {
				if( (R5sx+R5sy)%2 == 1 ) { //// if s is black
					rightLen += 2*R5m-1;
				}
				else { //// if s is white
					rightLen += 2*R5m;
				}
				if( (R5tx+R5ty)%2 == 0 ) { //// if t is white
					rightLen += 2*R5m-1;
				}
				else { //// if t is black
					rightLen += 2*R5m;
				}
			}
			var junction;
			if(leftLen >= rightLen) {
				junction = "left";
			}
			else {
				junction = "right";
			}

			EERtTwoRectConnection(junction);
			EERsTwoRectConnection(junction);
			EERmConnection(junction);

			if(horizontalFlipFlag == 1) {
				horizontalFlip(R5left, R5up, R5right, R5down, R5m, R5n);
				R5sy = R5n-(R5sy-1);
				R5ty = 1+(R5n-R5ty);
			}

			if(rotate90Flag == 1) {
				Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);

				R5sx = R5sxMem;
				R5sy = R5syMem;
				R5tx = R5txMem;
				R5ty = R5tyMem;

				R5m = R5mMem;
				R5n = R5nMem;
			}

			fillR5();
		}
		else if( (R5m%2 == 1) && (R5n%2 == 1) ) { //// odd * odd
			var horizontalFlipFlag = 0;
			if(R5sy < R5ty) {
				horizontalFlipFlag = 1;
				R5sy = R5n-(R5sy-1);
				R5ty = 1+(R5n-R5ty);
			}

			OORtTwoRectConnection("left");
			OORsTwoRectConnection("right");
			OORmConnection()

			if(horizontalFlipFlag == 1) {
				horizontalFlip(R5left, R5up, R5right, R5down, R5m, R5n);
				R5sy = R5n-(R5sy-1);
				R5ty = 1+(R5n-R5ty);
			}
			fillR5();
		}
		else if( ((R5n%2 == 1) && (R5m%2 == 0)) || ((R5n%2 == 0) && (R5m%2 == 1)) ) { /// odd * even or even * odd
			var rotate90Flag = 0;
			var R5mMem = R5m;
			var R5nMem = R5n;
			var R5sxMem = R5sx;
			var R5syMem = R5sy;
			var R5txMem = R5tx;
			var R5tyMem = R5ty;
			if(R5n%2 == 0 && R5m%2 == 1) {
				rotate90Flag = 1;
				Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);
				
				R5sx = R5syMem;
				R5sy = 1 + (R5m - R5sxMem);
				R5tx = R5tyMem;
				R5ty = 1 + (R5m - R5txMem)

				R5m = R5nMem;
				R5n = R5mMem;
			}


			var horizontalFlipFlag = 0;
			if(R5sy < R5ty) {
				horizontalFlipFlag = 1;
				R5sy = R5n-(R5sy-1);
				R5ty = 1+(R5n-R5ty);
			}

			var SleftTrightLen = 0;
			var SrightTleftLen = 0;
			//// s left t right
			if( (R5sx == 1 && R5sy == R5n-1) || (R5tx == R5m && R5ty == 2) ) {
				SleftTrightLen = 0;
			}
			else {
				if( (R5sx+R5sy)%2 == 0 ) { //// if s is white
					SleftTrightLen += 2*R5m;
				}
				else {
					SleftTrightLen += 2*R5m;
				}
				if( (R5tx+R5ty)%2 == 1 ) { //// if t is black
					SleftTrightLen += 2*R5m;
				}
				else { //// if t is white
					SleftTrightLen += 2*R5m-1;
				}
			}
			

			//// s right t left
			if( (R5sx+R5sy)%2 == 1 ) { //// if s is black
				SrightTleftLen += 2*R5m;
			}
			else { //// if s is white
				SrightTleftLen += 2*R5m-1;
			}
			if( (R5tx+R5ty)%2 == 0 ) { //// if t is white
				SrightTleftLen += 2*R5m;
			}
			else { //// if t is black
				SrightTleftLen += 2*R5m-1;
			}

			if(SleftTrightLen >= SrightTleftLen) {
				EERtTwoRectConnection("right");
				EERsTwoRectConnection("left");
				OERmConnection("SleftTrightLen");
			}
			else {
				EERtTwoRectConnection("left");
				EERsTwoRectConnection("right");
				OERmConnection("SrightTleftLen");
			}

			if(horizontalFlipFlag == 1) {
				horizontalFlip(R5left, R5up, R5right, R5down, R5m, R5n);
				R5sy = R5n-(R5sy-1);
				R5ty = 1+(R5n-R5ty);
			}
			if(rotate90Flag == 1) {
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);

				R5sx = R5sxMem;
				R5sy = R5syMem;
				R5tx = R5txMem;
				R5ty = R5tyMem;

				R5m = R5mMem;
				R5n = R5nMem;
			}
			fillR5();
		}

	}
	else { //// R5m < 4 || R5n < 4 || (R5m ==4 && R5n == 4)
		if(R5n == 1) { //// 1 * even or odd	
			for(i = R5sx+1; i <= R5tx-1; i++) {
				R5left[i][R5n] = R5right[i][R5n] = 1;
			}
			R5right[R5sx][R5n] = R5left[R5tx][R5n] = 1;
			fillR5();
		}
		else if(R5m == 1) { //// even or odd * 1
			if(R5sy < R5ty) {
				for(j = R5sy+1; j <= R5ty-1; j++) {
					R5up[R5m][j] = R5down[R5m][j] = 1;
				}
				R5down[R5m][R5sy] = R5up[R5m][R5ty] = 1;
			}
			else {
				for(j = R5ty+1; j <= R5sy-1; j++) {
					R5up[R5m][j] = R5down[R5m][j] = 1;
				}
				R5down[R5m][R5ty] = R5up[R5m][R5sy] = 1;
			}
			fillR5();
		}
		else if( (R5m == 2 && R5n > 4) || (R5m > 4 && R5n == 2) ) { //// 2 * even or odd   or  even or odd * 2
			var rotate90Flag = 0;
			var R5mMem = R5m;
			var R5nMem = R5n;
			var R5sxMem = R5sx;
			var R5syMem = R5sy;
			var R5txMem = R5tx;
			var R5tyMem = R5ty;
			if(R5m == 2) {
				rotate90Flag = 1;
				Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);

				R5sx = R5syMem;
				R5sy = 1 + (R5m - R5sxMem);
				R5tx = R5tyMem;
				R5ty = 1 + (R5m - R5txMem)

				R5m = R5nMem;
				R5n = R5mMem;
			}
			//// 2 * even
			if(R5m%2 == 0) {
				if(R5sx == 1 && R5sy == 2) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 1;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 0;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 0;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;

					}
					else if(R5tx == R5m-1 && R5ty == 1) {

						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 1;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {

						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 1;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) {

						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
				}
				else if (R5sx == 1 && R5sy == 1) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");

						//1
						R5right[1][1] = 0;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 1;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 1;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 0;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 0;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 0;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 0;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 1;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 1;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 0;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 1;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 1;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
				}
				else if(R5sx == 2 && R5sy == 2) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 0;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 0;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 1) { //// special case
						twoRectR5middle(R5left, R5up, R5right, R5down, 4, R5m-2, "leftUpIn");
						R5left[3][1] = R5right[3][1] = 1;

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
				}
				else if (R5sx == 2 && R5sy == 1) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 0;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 0;
						

					}
					else if(R5tx == R5m-1 && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) { //// special case
						twoRectR5middle(R5left, R5up, R5right, R5down, 4, R5m-2, "leftDownIn");
						R5left[3][2] = R5right[3][2] = 1;

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
				}
			}
			else if(R5m%2 == 1) { //// 2* odd	
				if(R5sx == 1 && R5sy == 2) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 1;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 0;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 0;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;

					}
					else if(R5tx == R5m-1 && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 0;
						R5down[1][1] = 0;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 1;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 0;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 1;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 1;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 1;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
				}
				else if (R5sx == 1 && R5sy == 1) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 0;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 1;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 1;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 0;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 0;
						

					}
					else if(R5tx == R5m-1 && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 0;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 1;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 1;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");
						//1
						R5right[1][1] = 0;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 0;
						R5right[2][1] = 1;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 1;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 0;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 1;
						//3
						R5up[1][2] = 0;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 0;
						R5up[2][2] = 1;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
				}
				else if (R5sx == 2 && R5sy == 2) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 0;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 0;
						

					}
					else if(R5tx == R5m-1 && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 0;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftUpIn");

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) { ////special case
						twoRectR5middle(R5left, R5up, R5right, R5down, 4, R5m-2, "leftUpIn");
						R5left[3][1] = R5right[3][1] = 1;

						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 1;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 0;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
				}
				else if (R5sx == 2 && R5sy == 1) {
					if(R5tx == R5m && R5ty == 1) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 0;
						R5down[R5m-1][1] = 1;
						//6
						R5left[R5m][1] = 0;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 1;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 1) { //// special case
						twoRectR5middle(R5left, R5up, R5right, R5down, 4, R5m-2, "leftDownIn");
						R5left[3][2] = R5right[3][2] = 1;
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 0;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 1;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 0;
						//8
						R5left[R5m][2] = 0;
						R5up[R5m][2] = 1;
						

					}
					else if(R5tx == R5m-1 && R5ty == 2) {
						twoRectR5middle(R5left, R5up, R5right, R5down, 3, R5m-2, "leftDownIn");
						//1
						R5right[1][1] = 1;
						R5down[1][1] = 1;
						//2
						R5left[2][1] = 1;
						R5right[2][1] = 0;
						R5down[2][1] = 0;
						//3
						R5up[1][2] = 1;
						R5right[1][2] = 1;
						//4
						R5left[2][2] = 1;
						R5up[2][2] = 0;
						R5right[2][2] = 1;
						//5
						R5left[R5m-1][1] = 1;
						R5right[R5m-1][1] = 1;
						R5down[R5m-1][1] = 0;
						//6
						R5left[R5m][1] = 1;
						R5down[R5m][1] = 1;
						//7
						R5left[R5m-1][2] = 0;
						R5up[R5m-1][2] = 0;
						R5right[R5m-1][2] = 1;
						//8
						R5left[R5m][2] = 1;
						R5up[R5m][2] = 1;
					}
				}
			}

			if(rotate90Flag == 1) {
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);

				R5sx = R5sxMem;
				R5sy = R5syMem;
				R5tx = R5txMem;
				R5ty = R5tyMem;

				R5m = R5mMem;
				R5n = R5nMem;
			}
			fillR5();
		}
		else if( (R5m == 3 && R5n > 5) || (R5m > 5 && R5n == 3) ) { //// 3 * even or odd   or  even or odd * 3
			var rotate90Flag = 0;
			var R5mMem = R5m;
			var R5nMem = R5n;
			var R5sxMem = R5sx;
			var R5syMem = R5sy;
			var R5txMem = R5tx;
			var R5tyMem = R5ty;
			if(R5m == 3) {
				rotate90Flag = 1;
				Rotate180degree(R5left, R5up, R5right, R5down, R5m, R5n);
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);

				R5sx = R5syMem;
				R5sy = 1 + (R5m - R5sxMem);
				R5tx = R5tyMem;
				R5ty = 1 + (R5m - R5txMem)

				R5m = R5nMem;
				R5n = R5mMem;
			}
			
			var junction;
			if( (R5sx == 2 && R5sy == 3) || (R5tx == R5m-1 && R5ty == 1) ) {
				junction == "leftUpIn";
			}
			else {
				junction = "leftDownIn";
			}
			
			threeRectRt(junction);
			threeRectRs(junction);
			threeRectR5middle(junction);


			if(rotate90Flag == 1) {
				rotate90degreeClockwise(R5left, R5up, R5right, R5down, R5m, R5n);

				R5sx = R5sxMem;
				R5sy = R5syMem;
				R5tx = R5txMem;
				R5ty = R5tyMem;

				R5m = R5mMem;
				R5n = R5nMem;
			}
			fillR5();
		}
		else if( (R5m <= 4 && R5n <= 4) || (R5m == 3 && R5n == 5) || (R5m == 5 && R5n == 3) ) { //// backtracking
			longestPathBTpreparation(R5left, R5up, R5right, R5down, R5m, R5n, R5sx, R5sy, R5tx, R5ty);
			longestPathBT(R5left, R5up, R5right, R5down, R5m, R5n, R5sx, R5sy, R5tx, R5ty);
			for(i = 1; i <= R5m; i++) {
				for(j = 1; j <= R5n; j++) {
					R5left[i][j] = MaxResBTleft[i][j];
					R5up[i][j] = MaxResBTup[i][j];
					R5right[i][j] = MaxResBTright[i][j];
					R5down[i][j] = MaxResBTdown[i][j];
				}
			}
			fillR5();
		}
	}
}

function connectTogether() {
	var haveConnection = 1;
	if( (isR1Empty == 1) && (isR2Empty == 1) && (isR3Empty == 1) && (isR4Empty == 1) ) {
		haveConnection = 0;
	}
	if( ((isR1Empty == 0) && (isR2Empty == 1) && (isR3Empty == 1) && (isR4Empty == 1)) || 
	((isR1Empty == 0) && (isR2Empty == 0) && (isR3Empty == 1) && (isR4Empty == 1)) ) { //// only R1 or R1 and R2
		haveConnection = 0;
		var check = 0;
		for(j = R5UpRow; j <= R5DownRow-1; j++) {
			if(down[R5LeftColumn][j] == 1) {
				left[R5LeftColumn][j] = left[R5LeftColumn][j+1] = 1;
				down[R5LeftColumn][j] = up[R5LeftColumn][j+1] = 0;

				right[R1RightColumn][j] = right[R1RightColumn][j+1] = 1;
				down[R1RightColumn][j] = up[R1RightColumn][j+1] = 0;
				check = 1;
				break;
			}
		}
		if(check == 0) {
			if(sy == R5UpRow) {
				left[sx][sy] = 1;
				right[sx][sy] = 0;
				left[sx][sy+1] = right[sx][sy+1] = 1;
				left[sx+1][sy] = down[sx+1][sy] = 0;
				left[sx+1][sy+1] = 1;
				up[sx+1][sy+1] = 0;

				right[R1RightColumn][sy] = right[R1RightColumn][sy+1] = 1;
				down[R1RightColumn][sy] = up[R1RightColumn][sy+1] = 0;
			}
			else if(sy == R5DownRow) {
				left[sx][sy] = 1;
				right[sx][sy] = 0;
				left[sx][sy-1] = right[sx][sy-1] = 1;
				left[sx+1][sy] = up[sx+1][sy] = 0;
				left[sx+1][sy-1] = 1;
				down[sx+1][sy-1] = 0;

				right[R1RightColumn][sy] = right[R1RightColumn][sy-1] = 1;
				up[R1RightColumn][sy] = down[R1RightColumn][sy-1] = 0;
			}
		}
	}
	if( ((isR1Empty == 1) && (isR2Empty == 0) && (isR3Empty == 1) && (isR4Empty == 1)) || 
	((isR1Empty == 0) && (isR2Empty == 0) && (isR3Empty == 1) && (isR4Empty == 1)) ) { //// only R2 or R1 and R2
		haveConnection = 0;
		var check = 0;
		for(j = R5UpRow; j <= R5DownRow-1; j++) {
			if(down[R5RightColumn][j] == 1) {
				right[R5RightColumn][j] = right[R5RightColumn][j+1] = 1;
				down[R5RightColumn][j] = up[R5RightColumn][j+1] = 0;

				left[R2LeftColumn][j] = left[R2LeftColumn][j+1] = 1;
				down[R2LeftColumn][j] = up[R2LeftColumn][j+1] = 0;
				check = 1;
				break;
			}
		}
		if(check == 0) {
			if(ty == R5UpRow) {
				right[R5RightColumn][ty] = 1;
				left[R5RightColumn][ty] = 0;
				right[R5RightColumn][ty+1] = left[R5RightColumn][ty+1] = 1;
				right[R5RightColumn-1][ty] = down[R5RightColumn-1][ty] = 0;
				right[R5RightColumn-1][ty+1] = 1;
				up[R5RightColumn-1][ty+1] = 0;

				left[R2LeftColumn][ty] = left[R2LeftColumn][ty+1] = 1;
				down[R3LeftColumn][ty] = up[R2LeftColumn][ty+1] = 0;	
			}
			else if(ty == R5DownRow) {
				right[R5RightColumn][ty] = 1;
				left[R5RightColumn][ty] = 0;
				right[R5RightColumn][ty-1] = left[R5RightColumn][ty-1] = 1;
				right[R5RightColumn-1][ty] = up[R5RightColumn-1][ty] = 0;
				right[R5RightColumn-1][ty-1] = 1;
				down[R5RightColumn-1][ty-1] = 0;

				left[R2LeftColumn][ty] = left[R2LeftColumn][ty-1] = 1;
				up[R2LeftColumn][ty] = down[R2LeftColumn][ty-1] = 0;
			}
		}
	}
	if( ((isR1Empty == 1) && (isR2Empty == 1) && (isR3Empty == 0) && (isR4Empty == 1)) || 
	((isR1Empty == 1) && (isR2Empty == 1) && (isR3Empty == 0) && (isR4Empty == 0)) ) { //// only R3 or R3 and R4
		haveConnection = 0;
		var check = 0;
		for(i = R5LeftColumn; i <= R5RightColumn-1; i++) {
			if(right[i][R5UpRow] == 1) {
				up[i][R5UpRow] = up[i+1][R5UpRow] = 1;
				right[i][R5UpRow] = left[i+1][R5UpRow] = 0;

				down[i][R3DownRow] = down[i+1][R3DownRow] = 1;
				right[i][R3DownRow] = left[i+1][R3DownRow] = 0;
				check = 1;
				break;
			}
		}
		if(check == 0) {
			if(sx == R5LeftColumn && sy == R5UpRow) {
				up[sx][sy] = 1;
				down[sx][sy] = 0;
				up[sx+1][sy] = down[sx+1][sy] = 1;
				up[sx][sy+1] = right[sx][sy+1] = 0;
				left[sx+1][sy+1] = 0;
				up[sx+1][sy+1] = 1;

				down[sx][R3DownRow] = down[sx+1][R3DownRow] = 1;
				right[sx][R3DownRow] = left[sx+1][R3DownRow] = 0;
			}
			else if(tx == R5RightColumn && ty == R5UpRow) {
				up[tx][ty] = 1;
				down[tx][ty] = 0;
				left[tx][ty+1] = up[tx][ty+1] = 0;
				up[tx-1][ty] = down[tx-1][ty] = 1;
				right[tx-1][ty+1] = 1;
				up[tx-1][ty+1] = 0;

				down[tx][R3DownRow] = down[tx-1][R3DownRow] = 1;
				left[tx][R3DownRow] = right[tx-1][R3DownRow] = 0;
			}
		}
	}
	if( ((isR1Empty == 1) && (isR2Empty == 1) && (isR3Empty == 1) && (isR4Empty == 0)) || 
	((isR1Empty == 1) && (isR2Empty == 1) && (isR3Empty == 0) && (isR4Empty == 0)) ) { //// only R4 or R3 and R4
		haveConnection = 0;
		var check = 0;
		for(i = R5LeftColumn; i <= R5RightColumn-1; i++) {
			if(right[i][R5DownRow] == 1) {
				down[i][R5DownRow] = down[i+1][R5DownRow] = 1;
				right[i][R5DownRow] = left[i+1][R5DownRow] = 0;

				up[i][R4UpRow] = up[i+1][R4UpRow] = 1;
				right[i][R4UpRow] = left[i+1][R4UpRow] = 0;
				check = 1;
				break;
			}
		}
		if(check == 0) {
			if(sx == R5LeftColumn && sy == R5DownRow) {
				down[sx][sy] = 1;
				up[sx][sy] = 0;
				up[sx+1][sy] = down[sx+1][sy] = 1;
				right[sx][sy-1] = down[sx][sy-1] = 0;
				left[sx+1][sy-1] = 0;
				down[sx+1][sy-1] = 1;

				up[sx][R4UpRow] = up[sx+1][R4UpRow] = 1;
				right[sx][R4UpRow] = left[sx+1][R4UpRow] = 0;
			}
			else if(tx == R5RightColumn && ty == R5DownRow) {
				down[tx][ty] = 1;
				up[tx][ty] = 0;
				left[tx][ty-1] = down[tx][ty-1] = 0;
				down[tx-1][ty] = up[tx-1][ty] = 1;
				right[tx-1][ty-1] = 0;
				down[tx-1][ty-1] = 1;

				up[tx][R4UpRow] = up[tx-1][R4UpRow] = 1;
				left[tx][R4UpRow] = right[tx-1][R4UpRow] = 0;
			}
		}
	}

	if(haveConnection == 1) { //// we can connect hamiltonian cycles to make one big hamiltonian cycle
		var connectionsNumber = 0;
		if( (isR1Empty == 0) && (isR3Empty == 0) ) {
			connectionsNumber++;
			if(R1UpRow == 1) {
				right[R1RightColumn][1] = right[R1RightColumn][2] = 1;
				down[R1RightColumn][1] = up[R1RightColumn][2] = 0;

				left[R3LeftColumn][1] = left[R3LeftColumn][2] = 1;
				down[R3LeftColumn][1] = up[R3LeftColumn][2] = 0;
			}
			else if(R3LeftColumn == 1) {
				up[1][R1UpRow] = up[2][R1UpRow] = 1;
				right[1][R1UpRow] = left[2][R1UpRow] = 0;

				down[1][R3DownRow] = down[2][R3DownRow] = 1;
				right[1][R3DownRow] = left[2][R3DownRow] = 0;
			}
		}
		if( (isR3Empty == 0) && (isR2Empty == 0) ) {
			connectionsNumber++;
			if(R2UpRow == 1) {
				left[R2LeftColumn][1] = left[R2LeftColumn][2] = 1;
				down[R2LeftColumn][1] = up[R2LeftColumn][2] = 0;

				right[R3RightColumn][1] = right[R3RightColumn][2] = 1;
				down[R3RightColumn][1] = up[R3RightColumn][2] = 0;
			}
			else if(R3RightColumn == m) {
				up[m][R2UpRow] = up[m-1][R2UpRow] = 1;
				left[m][R2UpRow] = right[m-1][R2UpRow] = 0;

				down[m][R3DownRow] = down[m-1][R3DownRow] = 1;
				left[m][R3DownRow] = right[m-1][R3DownRow] = 0;	
			}
		}
		if( (isR2Empty == 0) && (isR4Empty == 0) ) {
			connectionsNumber++;
			if(R2DownRow == n) {
				left[R2LeftColumn][n] = left[R2LeftColumn][n-1] = 1;
				up[R2LeftColumn][n] = down[R2LeftColumn][n-1] = 0;

				right[R4RightColumn][n] = right[R4RightColumn][n-1] = 1;
				up[R4RightColumn][n] = down[R4RightColumn][n-1] = 0;
			}
			else if(R4RightColumn == m) {
				up[m][R4UpRow] = up[m-1][R4UpRow] = 1;
				left[m][R4UpRow] = right[m-1][R4UpRow] = 0;

				down[m][R2DownRow] = down[m-1][R2DownRow] = 1;
				left[m][R2DownRow] = right[m-1][R2DownRow] = 0;
			}
		}
		if( (isR4Empty == 0) && (isR1Empty == 0) && (connectionsNumber < 3) ) {
			connectionsNumber++;
			if(R1DownRow == n) {
				right[R1RightColumn][n] = right[R1RightColumn][n-1] = 1;
				up[R1RightColumn][n] = down[R1RightColumn][n-1] = 0;

				left[R4LeftColumn][n] = left[R4LeftColumn][n-1] = 1;
				up[R4LeftColumn][n] = down[R4LeftColumn][n-1] = 0;
			}
			else if(R4LeftColumn == 1) {
				up[1][R4UpRow] = up[2][R4UpRow] = 1;
				right[1][R4UpRow] = left[2][R4UpRow] = 0;

				down[1][R1DownRow] = down [2][R1DownRow] = 1;
				right[1][R1DownRow] = left[2][R1DownRow] = 0;
			}
		}
		//end of connections
		var check = 0;
		if(check == 0) {
			for(j = R5UpRow; j <= R5DownRow-1; j++) {
				if(down[R5LeftColumn][j] == 1) {
					left[R5LeftColumn][j] = left[R5LeftColumn][j+1] = 1;
					down[R5LeftColumn][j] = up[R5LeftColumn][j+1] = 0;

					right[R1RightColumn][j] = right[R1RightColumn][j+1] = 1;
					down[R1RightColumn][j] = up[R1RightColumn][j+1] = 0;
					check = 1;
					break;
				}
			}
		}
		if(check == 0) {
			for(j = R5UpRow; j <= R5DownRow-1; j++) {
				if(down[R5RightColumn][j] == 1) {
					right[R5RightColumn][j] = right[R5RightColumn][j+1] = 1;
					down[R5RightColumn][j] = up[R5RightColumn][j+1] = 0;

					left[R2LeftColumn][j] = left[R2LeftColumn][j+1] = 1;
					down[R2LeftColumn][j] = up[R2LeftColumn][j+1] = 0;
					check = 1;
					break;
				}
			}
		}
		if(check == 0) {
			for(i = R5LeftColumn; i <= R5RightColumn-1; i++) {
				if(right[i][R5UpRow] == 1) {
					up[i][R5UpRow] = up[i+1][R5UpRow] = 1;
					right[i][R5UpRow] = left[i+1][R5UpRow] = 0;

					down[i][R3DownRow] = down[i+1][R3DownRow] = 1;
					right[i][R3DownRow] = left[i+1][R3DownRow] = 0;
					check = 1;
					break;
				}
			}
		}
		if(check == 0) {
			for(i = R5LeftColumn; i <= R5RightColumn-1; i++) {
				if(right[i][R5DownRow] == 1) {
					down[i][R5DownRow] = down[i+1][R5DownRow] = 1;
					right[i][R5DownRow] = left[i+1][R5DownRow] = 0;

					up[i][R4UpRow] = up[i+1][R4UpRow] = 1;
					right[i][R4UpRow] = left[i+1][R4UpRow] = 0;
					check = 1;
					break;
				}
			}
		}
	}
}

function longestPath() {
	preprocess();
	m = parseInt(document.getElementById("mValue").value);
	n = parseInt(document.getElementById("nValue").value);
	sx = parseInt(document.getElementById("sxValue").value);
	sy = parseInt(document.getElementById("syValue").value);
	tx = parseInt(document.getElementById("txValue").value);
	ty = parseInt(document.getElementById("tyValue").value);

	// initializing left, up, right, and down
	for(i = 1; i <= m; i++) {
		left[i] = [];
		up[i] = [];
		right[i] = [];
		down[i] = [];
		for(j = 1; j <= n; j++) {
			left[i][j] = up[i][j] = right[i][j] = down[i][j] = 0;
		}
	}
	// right[23] = 1;
	changeSTflag = 0;
	if(tx < sx) {
		changeSTflag = 1;
		var tmp = sx;
		sx = tx;
		tx = tmp;
		tmp = sy;
		sy = ty;
		ty = tmp;
	}
	if( (n == 2 && m > 4 && (sx == tx || (sx == tx-1 && sy != ty) ) ) ||
	    (m == 2 && n > 4 && (sy == ty || (sy == ty-1 && sx != tx) || (sy == ty+1 && sx != tx) ) ) ) { //// R is a two rect with special case (F2*)
		RisTwoRect();
	}
	else {
		peeling();
		hamiltonianPath();
		Rfive();
		connectTogether();
	}
	draw();
}




