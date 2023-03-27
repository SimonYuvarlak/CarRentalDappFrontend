import React from 'react'
import { useForm } from 'react-hook-form';
import GradientButton from './GradientButton';
const UserInput = ({ label, name, placeholder}) => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
      console.log(data);
    };
  return (
    <form className='border-2 shadow-lg rounded-md p-4 mt-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='gap-4 text-lrg font-semibold grid grid-flow-row'>
        <label >{label}</label>

        <input className=' border-2 rounded-md p-2 mr-2' placeholder={placeholder} {...register(name)}/>
        <GradientButton title="Submit"/>
        </div>
    </form>
  )
}

export default UserInput