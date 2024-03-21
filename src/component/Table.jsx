import React from 'react'

function Table(props) {


  return (
    <table>
        <tr className='table'>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
        </tr>
        {props.data.length>0?props.data.map((item,index)=>{
            return(
                <tr>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.country}</td>
                </tr>
            )
        }):<span className='nodata'>No data found</span>}
    </table>
  )
}

export default Table