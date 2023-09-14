import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import {createStyles, makeStyles, Theme} from'@material-ui/core/styles'

const useStyles=makeStyles((theme:Theme)=>
    createStyles({
        thumbsContainer:{
            marginTop: 16,
        },
        thumb:{
            display: 'inline-flex',
            borderRadius: 2,
            border: '1px solid #eaeaea',
            marginBottom: 8,
            marginRight: 8,
            width: 100,
            height: 100,
            padding: 4,
            boxSizing: 'border-box'
        },
        thumbInner : {
            display: 'flex',
            minWidth: 0,
            overflow: 'hidden'
        },
        img : {
            display: 'block',
            width: 'auto',
            height: '100%'
        }
    })
)

export default function Previews(props:any) {
    const classes = useStyles()
  const [files, setFiles] = useState<any>([]);
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
        setFiles(acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file) 
        })));
      }
  });
  
  const thumbs = files.map((file:any) => (
    <div className={classes.thumb} key={file.name}>
      <div className={classes.thumbInner}>
        <img
          src={file.preview}
          className={classes.img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file:any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section className="container" style={{borderStyle:'dashed', borderWidth:2, borderColor:'#000', minHeight:'128'}}>
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p style={{padding:10}}>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside >
        {thumbs}
      </aside>
    </section>
  );
}

<Previews />