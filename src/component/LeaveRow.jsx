import React from 'react'
import "./component.css";
function LeaveRow({data}) {
  return (
    <div className='d-flex justify-content-between align-items-start' style={{background:'#ebebeb',minHeight:'30px',borderBottom:'1px solid #dadada' ,marginBottom:'1px',}}>
      <div style={{width:'20%',padding:'5px ',display:'flex',justifyContent:'flex-start',flexDirection:'column',}}>
        <div style={{margin:'0',textTransform:'uppercase',fontWeight:'bold'}}>{data.name} <span>[{data.id}]</span></div>
        <div>Year : {data.year}</div>
      </div>
      <div  style={{width:'70%',padding:'0px',}}> 
        <table className='text-center  '>
          <thead>
            <tr>
              <th >Leave Type</th> 
              <th>Opening Balance</th>
              <th>Consume</th>
              <th>Closing Balance</th>
            </tr>
          </thead>
          <tbody>
            {data.leave.map((lv)=>
              <tr >
              <td>{lv.leavetype}</td>
              <td >{lv.opbal}</td>
              <td>{lv.consumed}</td>
              <td>{lv.opbal+lv.consumed}</td>
              </tr>
            )}
          </tbody>
        </table>


      </div>
      <div  style={{width:'10%',padding:'5px 15px',display:'flex',flexDirection:'column',justifyContent:'center', justifyItems:'center',}}>

        <button className='mbtn mbtn-view' id={`view-${data.id}`}>Detail</button>
        <button className='mbtn mbtn-view' id={`app-${data.id}`}>Applications</button>

      </div>
    </div>
  )
}

export default LeaveRow