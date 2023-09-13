import { Dispatch, PropsWithChildren, SetStateAction, createContext, useContext, useEffect, useState } from "react"
import {CognitoUser} from '@aws-amplify/auth'
import { Hub } from "aws-amplify";
import {Auth} from 'aws-amplify'

interface UserContextType{
    user: CognitoUser | null;
    setUser: Dispatch<SetStateAction<CognitoUser>> | any;
}

const UserContext = createContext<UserContextType>({} as UserContextType);

interface Props{
    children: React.ReactElement
}


export default function AuthContext (props: Props) {
    const {children}= props
    const [user, setUser]=useState<CognitoUser | null>(null)
    
    useEffect(()=>{
        checkUser()
    },[])

    useEffect(()=>{
        Hub.listen('auth', ()=>{
            checkUser()
        })
    },[])

    async function checkUser(){
        try{
            const aws_user = await Auth.currentAuthenticatedUser()
            if(aws_user){
                setUser(aws_user)
            }
        }catch(err){
            console.log(err)
            setUser(null)
        }
    }
  return (
    <UserContext.Provider value={{user, setUser}}>
        {children}
    </UserContext.Provider> 
  )
}

export  const useUser=() : UserContextType=>useContext(UserContext)

