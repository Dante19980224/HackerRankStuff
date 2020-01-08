'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// matrix[x][y]
// x=0 => top row
// x++ => go down
// y=0 => left most
// y++ => go right
// 1    2   3   3
// 6    5   4   2
// 7    8   9   1
function rotateM(matrix, s, h, w){
    let holder2 = matrix[s][s];
    let holder1, i;
    for(i=1; i<h; i++){
        holder1 = holder2;
        holder2 = matrix[s+i][s];
        matrix[s+i][s] = holder1;
    }
    for(i=1; i<w; i++){
        holder1 = holder2;
        holder2 = matrix[s+h-1][s+i];
        matrix[s+h-1][s+i] = holder1;
    }
    for(i=1; i<h; i++){
        holder1 = holder2;
        holder2 = matrix[s+h-1-i][s+w-1];
        matrix[s+h-1-i][s+w-1] = holder1;
    }
    for(i=1; i<w; i++){
        holder1 = holder2;
        holder2 = matrix[s][s+w-1-i];
        matrix[s][s+w-1-i] = holder1;
    }
    return matrix;
}

// Complete the matrixRotation function below.
function matrixRotation(matrix, r) {
    let height = matrix.length;
    let width = matrix[0].length;
    let numLayers;
    numLayers = (height%2 == 0 ? height/2 : width/2);
    let i, actualR;
    for(i=0; i < numLayers; i++){
        actualR = r%((height-i*2+width-i*2)*2-4)
        while(actualR > 0){
            matrix = rotateM(matrix, i, height-i*2, width-i*2);
            actualR--;
        }
    }
    matrix.map(row=>{
        console.log(row.join(' '));
    })
}

function main() {
    const mnr = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(mnr[0], 10);

    const n = parseInt(mnr[1], 10);

    const r = parseInt(mnr[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}
