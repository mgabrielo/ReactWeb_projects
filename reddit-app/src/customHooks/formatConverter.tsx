import {format} from 'date-fns'
export const timeConvert=(value:any)=>{
      
    return format(new Date(value), "MM/dd/yyyy 'at' h:mm a")
}