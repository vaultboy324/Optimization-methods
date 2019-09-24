import React from "react";

function Table(oParams){
    return (
        <table className="table table-bordered table-responsive-md text-center">
            <thead>
            <tr>
                {
                    oParams.columns.map((item, index)=> (
                        <th scope="col">{item}</th>
                    ))
                }
            </tr>
            </thead>
            {
                oParams.rows.map((row, rowNum) => (
                    <tbody>
                    <tr>
                        {
                            row.map((item, index)=>(
                                <td><input id={oParams.type +'|' + rowNum.toString() + '|' + index.toString()} className="form-control" type="number" value={item} onChange={event => oParams.func(event)}/></td>
                            ))
                        }
                    </tr>
                    </tbody>
                ))
            }
        </table>
    )
}

export default Table;