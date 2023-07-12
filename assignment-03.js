var table = document.getElementById("myTable"); // store table info
var AverageIndex = 7; // index of the average column
var numOfAssignments = 5; // used for calculating average

function calculateAverage(rowNumber) { // find average of each row (take in the row index), update unsubmitted assignments and other parts of the table
    var sum = 0; // store total grade
    var unsubmitted = 0; // store number of unsubmitted assignments
    var value = 0; // store current input
    // some parts of this method was tweaked and inspired by here: https://codepen.io/JasonW13/pen/mdJjxpg
    for (var i = 2; i < AverageIndex; i++) { // go through each assignment
        var input = table.rows[rowNumber].cells[i].innerHTML; // store user input
        if (input >= 0 && input <= 100) { // if input is valid
            value = parseFloat((table.rows[rowNumber].cells[i]).innerHTML); // convert input to float for less errors
            sum += value; // add to sum
            table.rows[rowNumber].cells[i].style.textAlign="right"; // right align both assignment and average
            table.rows[rowNumber].cells[AverageIndex].style.textAlign="right";
            if (rowNumber % 2 == 0) {
                table.rows[rowNumber].cells[i].style.backgroundColor="gainsboro"; // default original cell colour
            } else {
                table.rows[rowNumber].cells[i].style.backgroundColor="silver";
            }
        } else if (table.rows[rowNumber].cells[i].innerHTML == '') { // for when there's nothing in the cell
            sum += 0; // keep sum info
            value = 0; // default value back to 0
            if (rowNumber % 2 == 0) {
                table.rows[rowNumber].cells[i].style.backgroundColor="gainsboro"; // default original cell colour
            } else {
                table.rows[rowNumber].cells[i].style.backgroundColor="silver";
            }
        } else if (table.rows[rowNumber].cells[i].innerHTML != '-') { // if invalid input
            table.rows[rowNumber].cells[i].innerHTML = '-'; // input '-'
            table.rows[rowNumber].cells[i].style.backgroundColor = "yellow"; // change cell colour to yellow
            table.rows[rowNumber].cells[i].style.textAlign = "center"; // centre align '-'
        }
    }
    var average = Math.round(sum/numOfAssignments);
    if (isNaN(average)) { // if final average is not a valid number
        table.rows[rowNumber].cells[AverageIndex].innerHTML = '0'; // default it back to 0
        table.rows[rowNumber].cells[AverageIndex].style.textAlign = "right"; // and right align it
    } else if (table.rows[0].cells[AverageIndex].innerHTML == "Average (%)") { // if percentage is displayed
        table.rows[rowNumber].cells[AverageIndex].innerHTML = average; // display percentage average
    } else if (table.rows[0].cells[AverageIndex].innerHTML == "Average (Letter)") { // if letter is displayed, display letter
        if (average >= 93) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "A";
        } else if (average >= 90) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "A-";
        } else if (average >= 87) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "B+";
        } else if (average >= 83) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "B";
        } else if (average >= 80) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "B-";
        } else if (average >= 77) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "C+";
        } else if (average >= 73) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "C";
        } else if (average >= 70) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "C-";
        } else if (average >= 67) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "D+";
        } else if (average >= 63) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "D";
        } else if (average >= 60) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "D-";
        } else if (average < 60) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "F";
        } else {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "F";
        }
    } else if (table.rows[0].cells[AverageIndex].innerHTML == "Average (4.0)") {
        if (average >= 93) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "4.0";
        } else if (average >= 90) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "3.7";
        } else if (average >= 87) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "3.3";
        } else if (average >= 83) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "3.0";
        } else if (average >= 80) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "2.7";
        } else if (average >= 77) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "2.3";
        } else if (average >= 73) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "2.0";
        } else if (average >= 70) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "1.7";
        } else if (average >= 67) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "1.3";
        } else if (average >= 63) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "1.0";
        } else if (average >= 60) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "0.7";
        } else if (average < 60) {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "0.0";
        } else {
            table.rows[rowNumber].cells[AverageIndex].innerHTML = "0.0";
        }
    }

    if (average < 60) { // if average is less than 60
        table.rows[rowNumber].cells[AverageIndex].style.color = "white"; // change font colour to white
        table.rows[rowNumber].cells[AverageIndex].style.backgroundColor = "red"; // and cell colour to red
    } else if (average >= 60) { // if not
        if (rowNumber % 2 == 0) {
            table.rows[rowNumber].cells[AverageIndex].style.backgroundColor="gainsboro";
        } else {
            table.rows[rowNumber].cells[AverageIndex].style.backgroundColor="silver";
        }
        table.rows[rowNumber].cells[AverageIndex].style.color = "black"; // change font colour to black
    }

    for (var i = 0; i < table.rows.length; i++) { // go through each row
        for (var j = 0; j < table.rows[0].cells.length-1; j++) { // go through each column
            if (table.rows[i].cells[j].innerHTML == '-') { // if a cell is '-'
                unsubmitted++; // increment unsubmitted assignments
            }
        }
    }
    document.getElementById("unsub").innerHTML = 'Un-Submitted Assignments: ' + unsubmitted; // display unsubmitted assignments
}

function toggle() { // toggles between 3 modes in final columnn
    if (table.rows[0].cells[AverageIndex].innerHTML == "Average (%)") { // if final column is % change to letter
        table.rows[0].cells[AverageIndex].innerHTML = "Average (Letter)";
        for (var i = 1; i < table.rows.length; i++) {
            calculateAverage(i); // recalculate all averages
        }
    } else if (table.rows[0].cells[AverageIndex].innerHTML == "Average (Letter)") {
        table.rows[0].cells[AverageIndex].innerHTML = "Average (4.0)";
        for (var i = 1; i < table.rows.length; i++) {
            calculateAverage(i); // recalculate all averages
        }
    } else {
        table.rows[0].cells[AverageIndex].innerHTML = "Average (%)";
        for (var i = 1; i < table.rows.length; i++) {
            calculateAverage(i); // recalculate all averages
        }
    }
}

function addNewRow() { // function for adding new row
    var newRow = table.insertRow(-1); // add new row at the bottom

    var cell0 = newRow.insertCell(0); // update cells in the row
    cell0.innerHTML = "Insert name";
    cell0.setAttribute("contentEditable","true"); // make content editable
    var cell1 = newRow.insertCell(1);
    cell1.innerHTML = "Insert ID";
    cell1.setAttribute("contentEditable","true");
    for (var i = 2; i < AverageIndex; i++) {
        var cell = newRow.insertCell(i);
        cell.innerHTML = "-";
        cell.style.textAlign = "center";
        cell.setAttribute("contentEditable","true");
        $(document).on('input',cell, function() { // jquery code used to apply oninput command to new row
            calculateAverage(table.rows.length-1);
        })
    }
    var cellAverageIndex = newRow.insertCell(AverageIndex);
    cellAverageIndex.innerHTML = "0";
    cellAverageIndex.style.textAlign = "right";

    for (var i = 1; i < table.rows.length; i++) { // go through each row
        calculateAverage(i); // recalculate average
    }
}

function addNewColumn() { // function for adding new column
    numOfAssignments++;
    var tempIndex = AverageIndex;
    for (var i = 0; i < table.rows.length; i++) { // go through each row
        var row = table.rows[i]; // current row
        var newCell = row.insertCell(tempIndex); // insert a cell before average column
        if (i == 0) { // if in first row(header)
            newCell.innerHTML = "Assignment " + numOfAssignments;
            newCell.style.textAlign = "center";
            newCell.style.color = "black";
            newCell.style.backgroundColor = "grey";
            newCell.style.fontWeight = "bold";
        } else {
            let colIndex = i; // new cell column index used for following jquery code
            newCell.innerHTML = "-"; // fill in '-'
            newCell.style.textAlign = "center";
            newCell.setAttribute("contentEditable","true");
            $(document).on('input',newCell, function() { // jquery code used to apply oninput command to new cell
                calculateAverage(colIndex);
            })
            if (newCell.cellIndex < tempIndex) {
                if (i % 2 == 0) {
                    newCell.style.backgroundColor = "gainsboro";
                } else {
                    newCell.style.backgroundColor = "silver";
                }
            }
        }
    }
    AverageIndex++;
    for (var i = 1; i < table.rows.length; i++) { // go through each row
        calculateAverage(i); // recalculate average
    }
}

function saveTable() { // method used for saving the table
    const tableData = []; // store table data into an array
    for (let i = 0; i < table.rows.length; i++) { // go through each row
        const rowData = []; // store row data into an array
        for (let j = 0; j < table.rows[i].cells.length; j++) { // go through each column
            rowData.push(table.rows[i].cells[j].innerText); // push cell info into row data araay
        }
        tableData.push(rowData); // push the row data into the table data array
    }
    localStorage.setItem("savedTableData",JSON.stringify(tableData)); // convert table data to a JSON String and save it in local storage
    alert("Table Saved!"); // lets user know that table was saved successfully
}

function retrieveTable() { // method used for retrieving the table
    const retrievedData = JSON.parse(localStorage.getItem("savedTableData")); // retrieve data from local storage
    if (Array.isArray(retrievedData)) { // if saved data is in array form
        const rowCount = retrievedData.length; // retrieve number of rows
        const columnCount = retrievedData[0].length; // retrieve number of columns


        for (let i = 0; i < table.rows.length; i++) { // go through each row
            const row = table.rows[i]; // current row
            for (let j = 0; j < row.cells.length; j++) {
                const column = row.cells[j]; // current column
                if (i < rowCount && j < columnCount) { // if the row and column index is valid, fill with retrieved data
                    column.textContent = retrievedData[i][j];
                } else if (j < columnCount-1) { // supposed to remove an extra columns except the average column
                    row.deleteCell(j); // however this block code that is meant to remove columnns is not working as intended
                    j--;
                } else if (i >= rowCount) { // remove any extra rows
                    table.deleteRow(i);
                    i--;
                }
            }
        }
        alert("Table Retrived!"); // lets user know that table was retrieved successfully
    }
}