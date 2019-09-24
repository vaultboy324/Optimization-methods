import React from 'react';

import Table from "../Based_components/Table/Table";

import './Page.css';

const config = require("../../../config/config");

class Page extends React.Component{
    state = {
        matrixColumns: ['x1', 'x2', 'x3', 'x4', 'x5'],
        matrixRows:
            [[1, -13, 1, -4, 2],
            [1, -3, -5, -12, 2],
            [1, -5, 3, 4, 0],
            [1, -8, -2, -8, 2]],
        resultColumn: ["result"],
        resultVector: [[10],[2],[4],[6]],
        matrixType: 1,
        resultType: 2
    };

    onAddColumn = (event) => {
        let columns = this.state.matrixColumns;
        let lastColumn = columns[columns.length - 1];

        let newColumnNumber = parseInt(lastColumn.substring(1)) + 1;
        let newColumn = 'x' + newColumnNumber;

        columns.push(newColumn);

        let rows = this.state.matrixRows;

        rows.forEach((row) => {
            row.push(0)
        });

        this.setState({
            matrixColumns: columns,
            matrixRows: rows
        });
    };

    onDeleteColumn = (event) => {
        let columns = this.state.matrixColumns;
        columns.pop();

        let rows = this.state.matrixRows;

        rows.forEach((row)=>{
            row.pop();
        });

        this.setState({
            matrixColumns: columns,
            matrixRows: rows
        })
    };

    onAddRow = (event) => {
        let rows = this.state.matrixRows;

        let emptyRow = [];

        let length = this.state.matrixColumns.length;

        for (let i = 0; i < length; ++i ){
            emptyRow.push(0);
        }
        rows.push(emptyRow);

        let result = this.state.resultVector;

        result.push([0]);

        this.setState({
            matrixRows: rows,
            resultVector: result
        });
    };

    onDeleteRow = (event) => {
        let rows = this.state.matrixRows;
        rows.pop();

        let result = this.state.resultVector;
        result.pop();

        this.setState({
            matrixRows: rows,
            resultVector: result
        })
    };

    updateMatrix = (event) => {
        let aParameters = this.__parseId(event.target.id)

        let type = parseInt(aParameters[0]);
        let row = parseInt(aParameters[1]);
        let column = parseInt(aParameters[2]);

        if(type === this.state.matrixType){
            let matrix = this.state.matrixRows;
            matrix[row][column] = event.target.value;

            this.setState({
                matrixRows: matrix
            })
        } else {
            let resultVector = this.state.resultVector;
            resultVector[row][column] = event.target.value;

            this.setState({
                resultVector
            })
        }
    };

    sendMatrix = async (event) => {
        let body = {
            matrix: this.state.matrixRows,
            result: this.state.resultVector
        };

        const jsonString = JSON.stringify(body);

        const response = await fetch(`${config.server}/calculate`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Content-Length': jsonString.length
            },

            body: jsonString
        });

        let result = await response.json();
    };

    __parseId = (sId) => {
        return sId.split('|', 3);
    };

    render() {
        return (
            <div className="App">
                <div>
                    <button className="btn btn-outline-success myBtn" onClick={this.onAddColumn.bind(this)}>Добавить столбец</button>
                    <button className="btn btn-outline-danger myBtn" onClick={this.onDeleteColumn.bind(this)}>Удалить столбец</button>
                </div>
                <div>
                    <button className="btn btn-outline-success myBtn" onClick={this.onAddRow.bind(this)}>Добавить строку</button>
                    <button className="btn btn-outline-danger myBtn" onClick={this.onDeleteRow.bind(this)}>Удалить строку</button>
                </div>
                <div>
                </div>
                <div className="row">
                    <div className="Table">
                        <Table columns={this.state.matrixColumns} rows={this.state.matrixRows}  type={this.state.matrixType} func={this.updateMatrix}/>
                    </div>
                    <div className="Result">
                        <Table columns={this.state.resultColumn} rows={this.state.resultVector} type={this.state.resultType} func={this.updateMatrix}/>
                    </div>
                </div>
                <div>
                    <button className="btn btn btn-outline-primary myBtn" onClick={this.sendMatrix.bind(this)}>Выполнить</button>
                </div>
            </div>
        )
    }
}

export default Page;