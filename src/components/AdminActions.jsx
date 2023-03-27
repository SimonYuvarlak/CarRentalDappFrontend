import React from 'react'
import GradientButton from './reusables/GradientButton'
import UserInput from './reusables/UserInput'

const AdminActions = () => {
  return (
    <section className='grid place-items-center grid-flow-row overflow-hidden'>
        <h2 className='font-bold text-2xl'>Admin Actions</h2>
        <UserInput label="Activate Car" placeholder="Enter Car Id to Activate" name="activeCarId"/>
    <UserInput label="Deactivate Car" placeholder="Enter Car Id to Deactivate" name="deactivateCarId"/>
    <UserInput label="Set Car Manager Address" placeholder="Enter Car Manager Address" name="carManagerAddress"/>
    <UserInput label="Set Car Address Owner" placeholder="Enter Car Address Owner" name="carAddressOwner"/>
    <UserInput label="Set New Owner" placeholder="Enter New Owner" name="setNewOwner"/>
    <UserInput label="Set User Manager Address" placeholder="Enter User Manager Address" name="setNewOwner"/>

    </section>
  )
}

export default AdminActions
