import { Form } from 'formik'
import React,{useState} from 'react'
import Cashfree from '../components/CashFree'
import Layout from "../components/layout"

function Test() {
    const [state, setstate] = useState("")
    const handleSubmit=(e)=>{
        e.preventDefault();
        const form=e.target;
        const form1=new FormData();
        form1.append("username", "Groucho");
        console.log(form,form1.get("username"),new FormData(form),document.querySelector("#nameF").value)
    }
    const handleChange=(e)=>{
        setstate(e.target.value)
        // console.log("CHANFE",e,e.target.value)
    }
    return (
        <Layout>
           HELLO
           <form onSubmit={handleSubmit}>
               <input onChange={handleChange} id="nameF" name="NAME" type="text" value={state}/>
               <button type="submit">Submit me</button>
           </form>
        </Layout>
    )
}

export default Test
