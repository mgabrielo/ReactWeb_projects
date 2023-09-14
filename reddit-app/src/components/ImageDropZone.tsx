import React, {FC, useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {createStyles, makeStyles, Theme} from'@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';

interface ImageDropProps{
    file: File | undefined
    setFile:React.Dispatch<React.SetStateAction<File>>  | any
}


const Previews:FC<ImageDropProps>=({file, setFile})=> {
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
        setFile(acceptedFiles[0]);
      }
  });
  
 
//   console.log(file)

  return (
    <>
    { !file ? (
    <section className="container" style={{borderStyle:'dashed', borderWidth:2, borderColor:'#000', minHeight:'128'}}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p style={{padding:10}}>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>

    ):(
        <Grid container alignItems='center' spacing={1} justifyContent='center' direction='column'>
            <Grid item>
                <Typography>Your Image:</Typography>
            </Grid>
            <Grid item style={{}}>
                <img src={URL.createObjectURL(file)} style={{width:'auto', maxHeight:400}}/>
            </Grid>
        </Grid>
    )

    }
    </>
  );
}


export default Previews;