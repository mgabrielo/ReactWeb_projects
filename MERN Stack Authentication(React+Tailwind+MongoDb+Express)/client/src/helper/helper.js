import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
// make api request


//auhthenticate fun

export async function  authenticate(username){
    try {
        return await axios.post('/api/authenticate', {username})
    } catch (error) {
        return {error : "Username doesnt exist"}

    }
}

// get user details

export async function getUser({username}){
    try {
      const {data} =   await axios.get(`/api/user/${username}`);
      return {data};
    } catch (error) {
        return {error : "password doesnt match"}
    }
}

//register fun
export async function registerUser({credentials}){
    try {
      const {data : {msg }, status} =  await axios.post(`/api/register`, credentials);

      let {username, email} =credentials;

      //send email

      if(status === 201 ){
        await axios.post('/api/registerMail', {username, userEmail : email, text:msg})
      }
      return Promise.resolve(msg)
    } catch (error) {
        return Promise.reject({error})
    }
}

//login fun
export async function verifyPassword({username, password}){
        try {
          const {data} =  await axios.post('/api/login', {username, password} )
                return Promise.resolve({data});

        } catch (error) {
            return Promise.reject({error : "Password does not match"})
        }
}

//update fun
export async function updateUser({response}){
    try {
        const token  = await localStorage.getItem('token');
        const data = await axios.put('/api/updateuser', response, 
         {headers: {"Authorization" : `Bearer ${token}`}});
         
         return Promise.resolve({data})
    } catch (error) {
        return Promise.reject({error : "couldnt update profile details"}) 
    }
}
//genrate otp
export async function generateOTP({username}){
    try {
     const {data : {code}, status}  = await axios.get('/api/generateOTP', {params : {username}})
       
        if(status === 201 ){
        let {data : {email}}   =  await getUser({username});
       let text = `Your Password recovery OTP is ${code}, you can now recover your password`
       await axios.post('/api/registerMail', {username, userEmail: email, text, subject:"Password recovery OTP"})

     }

     return Promise.resolve(code); 
    } catch (error) {
        return Promise.reject({error});

    }
}

//verify otp
export async function verifyOTP({username, code}){
    try {
      const {data, status} = await axios.get('/api/verifyOTP', {params : {username,code } }) 

      return{data,status}
    } catch (error) {
        return Promise.reject(error)
    }
}

//reset password
export async function resetPassword({username, password}){
    try {
        const {data, status} = await axios.put('/api/resretPassword', {username, password});
         return Promise.resolve({data, status});
    } catch (error) {
       return Promise.reject({error})
    }
}