import React from 'react'
import { TextField, Grid } from '@material-ui/core'
import { useFormContext, Controller } from 'react-hook-form'

const FormInput = () => {
    const {control} = useFormContext();
  return (
    <Grid item xs={12} sm={6}>
        {/* <Controller
            render={({ field }) => {
                   return <TextField {...field} />; 
              }}
        /> */}
    </Grid>

  )
}

export default FormInput