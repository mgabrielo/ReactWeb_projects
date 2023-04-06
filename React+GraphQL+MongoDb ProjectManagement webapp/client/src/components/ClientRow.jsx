
import {FaTrash} from 'react-icons/fa'
import { useMutation } from '@apollo/client';
import {Delete_Client} from '../mutations/ClientMutations'
import { Get_Clients } from '../queries/ClientQueries';

export default function ClientRow({client}) {
    const [deleteClient]= useMutation(Delete_Client, {
        variables: {id: client.id}, 
        //refetchQueries: [{ query: Get_Clients}]
        update(cache, {data: {deleteClient}}){
            const {clients} = cache.readQuery({query : Get_Clients});

            cache.writeQuery({
                query: Get_Clients,
                data: { clients : clients.filter(client => client.id !== deleteClient.id)}
            });
        }
    });

  return (
  <tr>
    <td>{client.name}</td>
    <td>{client.email}</td>
    <td>{client.phone}</td>
    <td> <button className="btn btn-danger bt-sm" onClick={deleteClient}>
        <FaTrash/></button> </td>
  </tr>
  )
}
