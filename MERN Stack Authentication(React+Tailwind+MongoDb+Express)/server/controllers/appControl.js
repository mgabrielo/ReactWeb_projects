import UserModel from "../model/User.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import ENV from '../config.js';
import otpGenerator from 'otp-generator';

export async function verifyUser(req, res, next){
    try {
        const {username} = req.method == "GET" ? req.query : req.body;

        // check if user exist

        let exist  = await UserModel.findOne({username});
        if(!exist) return res.status(404).send({error : "cant find user"})
        next();
    } catch (error) {
        return res.status(404).send({error : "Authentication error"})
    }
}

/*post*/ 
export async function register(req,res){
    try {
        const {username, password, profile, email} = req.body;
        //check if user exist
        const existUsername = new Promise((resolve, reject) => {
            UserModel.findOne({username}, function(err, user){
                if(err) reject(new Error(err))
                if(user) reject({error: "please use unique username"});

                resolve();
            })
        });

        // check existing email

        const existEmail = new Promise((resolve, reject) => {
            UserModel.findOne({email}, function(err, email){
                if(err) reject(new Error(err))
                if(email) reject({error: "please use unique Email"});

                resolve();
            })
        });

        Promise.all([existUsername, existEmail]).then(()=>{
                if(password){
                    bcrypt.hash(password, 10).then(hashedPassword =>{
                        const user = new UserModel({

                            username,
                            password: hashedPassword,
                            profile: profile || '',
                            email

                        })

                        user.save().then(result => res.status(201).send({ msg:"user registration successful"}))
                        .catch(error =>  res.status(500).send({error})) 
                    }).catch(error =>{
                            return res.status(500).send({
                                error: "Enable to Hashed password"
                            })

                    })
                }
        }).catch(error => {
            return res.status(500).send({error})
        })
    } catch (error) {
        return res.status(500).send(error)
    }
}

/*post*/ 
export async function login(req,res){
   const {username, password} = req.body;

   try { 
        UserModel.findOne({username}).then(user =>{
            bcrypt.compare(password, user.password ).then(passwordCheck =>{
                if (!passwordCheck)  return res.status(400).send({error: "No password Found"});

                //create JWT Token
                const token =  jwt.sign({
                                userid: user._id,
                                username: user.username
                            }, ENV.JWT_SECRET, {expiresIn : "24h"});
                return res.status(200).send({
                    mag: "Login Successful",
                    username: user.username,
                    token
                })
            })
            .catch(error => {
                return res.status(400).send({error: "password does not match"});  
            })
        })
        .catch(error =>{
            return res.status(404).send({error: "username not found"});
        })
   } catch (error) {
    return res.status(500).send({error})
   }
}

/*get*/ 
export async function getUser(req,res){
    const {username} = req.params;
    try {
        if(!username) return res.status(501).send({error : "invalid user name"});
        
        UserModel.findOne({username}, function(err,user){
            if(err) res.status(500).send({err});
            if(!user) res.status(501).send({error : "could not find user"});
            const {password, ...rest} = Object.assign({}, user.toJSON());

            return res.status(201).send(rest);
        })
    } catch (error) {
        return res.status(404).send({error : "can't find user data"})
    }
}

/*put*/ 
export async function updateUser(req,res){
  try {
  //  const id = req.query.id;

  const {userid} = req.user;

    if(userid){
         const body  = req.body;
         //update user
         UserModel.updateOne({_id : userid}, body, function(err, data){
            if(err) throw err;
            return res.status(201).send({msg: "record updated"});
         } )
    }else{
        return res.status(401).send({error : "User not Found"})
    }
  } catch (error) {
    return res.status(401).send({error})
  }
}

/*get*/ 
export async function generateOTP(req,res){
 req.app.locals.OTP = await otpGenerator.generate(6, {lowerCaseAlphabets: false, upperCaseAlphabets:false,
     specialChars:false});

     res.status(201).send({code : req.app.locals.OTP})

}
/*get*/ 
export async function verifyOTP(req,res){
  const {code}=  req.query;
    if(parseInt(req.app.locals.OTP) ===  parseInt(code)){
        req.app.locals.OTP =null; //reset otp value
        req.app.locals.resetSession = true;
        return res.status(201).send({msg: "verified successfully"})
    }
    return res.status(400).send({error: "Invalid OTP"})

}
/*get*/ 
export async function createResetSession(req,res){
    if(req.app.locals.resetSession){
        req.app.locals.resetSession =false; // allow one time access
        return res.status(201).send({msg: "access granted"})
    }
    return res.status(440).send({error : "session expired"})
}
/*put*/ 
export async function resetPassword(req,res){
    try {

        if(!req.app.locals.resetSession)  return res.status(440).send({error: "Session Expired"})
        const {username, password} = req.body;

        try {
            UserModel.findOne({username}).then(user=>{
                bcrypt.hash(password, 10).then(hashedPassword => {
                    UserModel.updateOne({username : user.username},
                        {password : hashedPassword}, function(err, data){
                            if (err) throw err;
                            req.app.locals.resetSession = false;
                            return res.status(201).send({msg: "record Updated"})  
                        })
                })
                .catch(e => {
                    res.status(500).send({error: "Unable to Hash password"})
                })
            })
            .catch(error => {
                res.status(404).send({error: "Username Not Found"})
            })
        } catch (error) {
            return res.status(500).send({error})
            
        }
    } catch (error) {
        return res.status(400).send({error})
        
    }
}
