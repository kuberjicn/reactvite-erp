

import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom';
import '../Common.css'

import axios from "../../AxiosConfig";
import { Bounce, toast } from 'react-toastify';
import { CgClose  } from "react-icons/cg";
import JobListCombo from '../../component/JobListCombo';
import SupplierCombo from '../../component/SupplierCombo';
import BusyForm from "../../component/BusyForm";
import NotInSalaryRegisterEmployee from '../../component/notInSalaryRegisterEmployee'

function SalaryModalForm({isShow, onHide, sal_id,onUpdate}) {
  
  const [oldPostData,setOldPostData]=useState({})
  const [slry_rate,setSlry_rate]=useState(0)
  const [effect_date,setEffect_date]=useState('2023-01-01')
  const [da,setDa]=useState(0)
  const [hra,setHra]=useState(0)
  const [ta,setTa]=useState(0)
  const [post,setPost]=useState("Site Supervisor")
  const [supid,setSupid]=useState()
  const [isBusyShow, setIsBusyShow] = useState(false);
  const [isReadOnly,setisReadOnly]=useState(false)
  const [sup_id,setSup_id]=useState(0)


 const initializeData=(data)=>{
    setSlry_rate(data.slry_rate)
    setEffect_date(data.effect_date)
    setDa(data.da)
    setHra(data.hra)
    setTa(data.ta)
    setSupid(data.supid)
    setPost(data.post)
    if (data.supid) {
      // If supid is available in the data, set it directly
      setSupid(data.supid);
      // Also, set the sup_id value for the dropdown
      setSup_id(data.supid.sup_id);
  } else {
      // If supid is not available, set default values
      setSupid(0);
      setSup_id(0);
  }
  //console.log(sup_id);
 }

 function areObjectsEqual(obj1, obj2) {
  // Get the keys of both objects
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if the number of keys is the same
  if (keys1.length !== keys2.length) {
      return false;
  }

  // Check if all keys and their values are the same
  for (let key of keys1) {
      // Check if the key exists in obj2 and if the values are the same
      if (!(key in obj2) || obj1[key] !== obj2[key]) {
          return false;
      }
  }

  // Objects are equal
  return true;
}


  useEffect(()=>{
    if (sal_id!=0){
      setIsBusyShow(true)
      axios.get("/salary-register/" + sal_id).then((response) => {
           setIsBusyShow(false)
           setOldPostData(response.data)
           initializeData(response.data)
           //console.log(response.data)
           
           setisReadOnly(true)
           setIsBusyShow(false)
          }).catch((e=>{
            setIsBusyShow(false)
          }))
        }
    else{
      setisReadOnly(false)
      initializeData({
        slry_rate: 0,
        effect_date: '2023-01-01',
        da: 0,
        hra: 0,
        ta: 0,
        post: '',
        supid: []// Initialize supid as null or 0, depending on your data structure
    });
    }     
    
  },[sal_id,])

  useEffect(()=>{
    setSlry_rate(0)
    setEffect_date('2023-01-01')
    setDa(0)
    setHra(0)
    setTa(0)
    setSupid({})
    setSup_id(0)
    setPost('')
  },[onHide])

 const handleJobChanged=(e)=>{
  if (e && e.target) {
    setPost(e.target.value)
    console.log(e.target.value)
  }
 }

 const handleEmployeeChange = (e,selectedItem) => {
  console.log('run')
  if (e && e.target) {
    setSup_id(e.target.value)
    console.log(selectedItem)
   
    setSupid(selectedItem)
  }
};
 function checkdata({slry_rate,post,supid_id,effect_date,ta,da,hra}) {
   let isPassed=true;
   
   if (slry_rate<=0 || slry_rate==null){
    isPassed=false;
   }
   if (post=='' || post==null) {
    isPassed=false
   }
   if (supid_id==0 || supid_id==null ||supid_id==undefined) {
    isPassed=false
   }
   if (effect_date=='' || effect_date==null ||effect_date==undefined) {
    isPassed=false
   }
   if ( ta==null || hra==null||da==null){
    isPassed=false
    
   }
   return isPassed
 }

 const Update = async (e) => {
   e.preventDefault();
   onUpdate();
   let postData = {
     sal_id: sal_id,
     slry_rate: slry_rate,
     effect_date: effect_date,
     supid: supid,
     supid_id: sup_id,
     da: da,
     ta: ta,
     hra: hra,
     post: post,
     deleted: false,
   };
   if (!sal_id) {
     console.log("add data", postData);

     if (checkdata(postData)) {
       await axios
         .post("/salary-register/", postData)
         .then((response) => {
           postData = [];

           toast.success("data Added sucessfully", {
             closeOnClick: true,
             transition: Bounce,
           });
         })
         .catch((err) => {
           toast.error("Error adding data: " + err.message, {
             closeOnClick: true,
             transition: Bounce,
           });
         });
     } else {
       toast.warning("Error adding data: fill all marked fields", {
         closeOnClick: true,
         transition: Bounce,
       });
     }
   } else {
     console.log("update data", postData);
     
     const kk={...oldPostData,supid_id:sup_id}
     console.log("olddata data", kk);
     if (checkdata(postData)) {
       if (areObjectsEqual({...oldPostData,supid_id:sup_id}, postData) == false) {
         await axios
           .put("/salary-register/" + sal_id + "/", postData)
           .then((response) => {
             postData = [];
             toast.success(response.data.msg, {
               closeOnClick: true,
               transition: Bounce,
             });
           })
           .catch((err) => {
             toast.error("Error editing data: " + err.message, {
               closeOnClick: true,
               transition: Bounce,
             });
           });
       } else {
         toast.warning("no need to change ,you do not make any changes", {
           closeOnClick: true,
           transition: Bounce,
         });
       }
     } else {
       toast.warning("Error editing data: fill all marked fields", {
         closeOnClick: true,
         transition: Bounce,
       });
     }
   }
 };
  if (!isShow) return null;

  return ReactDOM.createPortal(
    <div className="modal">
       <BusyForm isShow={isBusyShow} />
      <div className="modal-content" >
        <div className='form-header'>
          <h3 style={{ marginBottom: '0', textTransform: 'capitalize',fontSize:'1.3rem',lineHeight:'1.5' }}>{sal_id==0?"Add Salary ":"Change Pay And Promotion "} </h3>
          <button className='control-btn btn-edit' onClick={onHide}  ><CgClose size={29} /></button>
        </div>
        <form style={{ padding: '5px 20px 10px 20px' }} >
         
        <div style={{ padding: '0 0 15px 0' }}>
            {sal_id==0? <NotInSalaryRegisterEmployee initialvalue={0} handleEmployeeChange={handleEmployeeChange} /> :<SupplierCombo initialvalue={sup_id} type={'employee'}  isread={isReadOnly} handleEmployeeChange={handleEmployeeChange} />}
            
            <JobListCombo val={post} handleJobChanged={handleJobChanged}/>
            <label className='form-label' htmlFor='salary'>Salary <span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='text' id='salary' value={slry_rate} placeholder='email' autoComplete='off' onChange={(e) => setSlry_rate(e.target.value)} />
            <label className='form-label' htmlFor='ddate'>Effect On<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='date' id='ddate' value={effect_date} placeholder='phone' autoComplete='off' onChange={(e) => setEffect_date(e.target.value)} />
            <label className='form-label' htmlFor='ta'>TA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='ta' placeholder='Contact Person' autoComplete='off' value={ta} onChange={(e) => setTa(e.target.value)} />
            <label className='form-label' htmlFor='da'>DA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='da' value={da} placeholder='pan' autoComplete='off' onChange={(e) => setDa(e.target.value)} />
            <label className='form-label' htmlFor='hra'>HRA<span style={{color:'red'}}>*</span></label>
            <input className='form-input' type='number' id='hra' value={hra} placeholder='gst' autoComplete='off' onChange={(e) => setHra(e.target.value)} />
          </div>

         
        </form>
        <div className='form-footer'>
          <button className='mbtn mbtn-edit' type="submit" onClick={(e) => Update(e)} >{sal_id==0? 'Save':'Update'}</button>
          <button style={{ marginLeft: '10px' }} className='mbtn mbtn-close' onClick={onHide}>Close</button>
          </div>
      </div>

    </div>,
    document.getElementById('modal-root')
  );
}

export default SalaryModalForm
