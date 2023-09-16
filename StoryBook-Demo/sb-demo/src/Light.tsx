
type Props = {
    // variant description
    variant?: 'green' | 'yellow'  | 'red'
}
/*
Light Component Description 
*/
const Light = ({variant ='green'}: Props) => {
  return (
    <div style={{ alignItems:'center', justifyContent:'center',backgroundColor: variant, color:'white', width:'100px',height:'100px', borderRadius:'50%' }}>
    </div>
  )
}

export default Light