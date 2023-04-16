import React from 'react'
import { InputLabel,Select, MenuItem, Button,Grid, Typography } from '@material-ui/core'
import { FormProvider, useForm} from 'react-hook-form'
import FormInput from './CustomTextField';

const AddressForm = () => {
  const methods =useForm()

    return (
    <>
    <Typography variant='h6' gutterBottom>Shipping Address</Typography>
    <FormProvider {...methods}>
        <form onSubmit={()=>{}}>
            <Grid container spacing={3}>
                <FormInput/>
                {/* <FormInput name='lastname' label='Last Name'/>
                <FormInput name='address' label='Address'/>
                <FormInput name='email' label='Email'/>
                <FormInput name='city' label='City'/>
                <FormInput name='zipcode' label='Zip Code'/> */}
            </Grid>
        </form>
    </FormProvider>
    </>
  )
}

export default AddressForm