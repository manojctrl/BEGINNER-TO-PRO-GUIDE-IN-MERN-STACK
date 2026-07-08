import React, { useReducer } from 'react'

const Form = () => {

    function reducer(state, action){
        return {
            ...state,
            [action.name] : action.value
        }


    }

    function handleChange(e){
        dispatch({
            name : e.target.name,
            value : e.target.value
        })
    }
    const [formData, dispatch] = useReducer(reducer, {
        name :"",
        email: ""
    })
  return (
   <form>
    <input type='text' name="username" placeholder='Enter your name'  value = {formData.name} onChange={handleChange}/>
     <input type='email' name="email" placeholder='Enter your email'  value = {formData.email} onChange={handleChange}/>

   </form>
   
  )
}

export default Form

