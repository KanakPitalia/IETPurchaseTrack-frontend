import React from 'react'
import moment from 'moment'


const ConvertToFormatForm = ({proposal}) => {
  const updated = new Date(proposal.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
//   print(){
//     window.print();
// }
 
  console.log(proposal.items)
    // const[u, setU] = useState(users.username)
    // const options = users.map(user => {
    //     return (
    //         <option
    //             key={user.id}
    //             value={user.id}

    //         > {user.username} ({user.roles})</option>
    //     )
    // })
    
   // console.log(u)
  return (
    <>
    {/* <ReactToPrint
     content = {()=>this.componentRef}
     documentTitle='new document'
     pageStyle ='print'
    /> */}
    {/* <div ref={el=>(this.componentRef=el)}> */}
    <div className='format'>
    <h1 className='format-clg'>Institute of Engineering & Technology,DAVV,Indore</h1>

    <br/>
    <h2 className='format-date'>Date:  {moment(updated).utc().format('DD-MM-YYYY')}</h2>
    <br/>
     <br/>
     <h3>Subject: {proposal.title}</h3>
     <br/>
     <br/>
     <h3>{proposal.text}</h3>
     <br/>
     <h3 >Items: </h3><h3>{proposal.items}</h3>
     <br/>
     <br/>
     <h3>Estimated Budget:  ₹{proposal.cost}</h3>
     <br/>
     <br/>
     <h3>ProposedTo: </h3><h3>{proposal.proposedTo}</h3>
     <br/>
     <br/>
     <h3>ProposedBy: </h3><h3>{proposal.proposedBy}</h3>
      {/* <h3>{u}</h3> */}
      <br/>
     <br/>
      <button className='format-btn' onClick={()=>{window.print()}}>Print</button>
       {/* <ReactToPrint 
       trigger={()=>{
        return <button>Print</button>
       }}
     content = {()=>this.componentRef}
     documentTitle='new document'
     pageStyle ='print'
    /> */}
      
      
      </div>
    </>
  )
}

export default ConvertToFormatForm
