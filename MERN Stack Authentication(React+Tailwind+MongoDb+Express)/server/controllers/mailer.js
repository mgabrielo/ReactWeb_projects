import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

let nodeConfig ={
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: ENV.EMAIL, // generated ethereal user
      pass: ENV.PASSWORD, // generated ethereal password
    }
}

let transporter = nodemailer.createTransport(nodeConfig);

let MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name : "Mailgen",
        link:'https://mailgen.js/'
    }
})

export const registerMail =async(req , res)=>{
    const {username, userEmail, text, subject} =req.body;

    //email body
    var email ={
        body: {
            name :username,
            intro: text || "Welcome to Greys World",
            outro: "Need Assistance ,conatct us -- we are happy to help"
        }
    }

    var emailbody = MailGenerator.generate(email);

    let message ={
        from: ENV.EMAIL,
        to:  userEmail,
        subject: subject || "SignUp Successful",
        html : emailbody
    }

    //send mail
    transporter.sendMail(message).then(()=>{
        return res.status(200).send({msg:"You Should recieve from us very soon"})
    })
    .catch(error => res.status(500).send({error}));
}