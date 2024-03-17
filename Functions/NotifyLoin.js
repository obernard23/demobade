const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const {WHouse} = require('../modules/warehouse');
const Employee = require('../modules/Employees');
var moment = require('moment'); 
let date = new Date()
var responseDate = moment().format('MMMM Do YYYY, h:mm:ss a');


const NotifyLogin = async (data) => {
    const person = await Employee.findById(data._id)
    let date = new Date()
             let config = {
                 service : 'gmail',
                 auth : {
                     user: EMAIL,
                     pass: PASSWORD
                 },
                 tls : { rejectUnauthorized: false }//always add this to stop error in console   
             }
         
             let transporter = nodemailer.createTransport(config);
         
             let MailGenerator = new Mailgen({
                 theme: "salted",
                 product : {
                     name: 'BADE',
                     link : 'https://mailgen.js/',
                     logo: 'bade.jpg',
                     copyright: `© ${date.getFullYear()} BADE.`,
                 }
             })
         
             let response = {
                 body: {
                 name : `${data.firstName}`,
                 intro: `New Login Alert on ${responseDate} `,
                 action: [
                     {
                         instructions: 'If You did not initiat this login, Please Reset Your Password',
                         button: {
                             color: 'purple',
                             text: `Reset Password`,
                             link: `${url}/api/v1/Reset`
                         }
                     }
                 ]
             },
                 outro: "kind Regards"
             }
             let mail = MailGenerator.generate(response)
             
             let message = {
                 from : EMAIL,
                 to : data.Email,
                 subject: `${ERPSmtpName} Login Alert`,
                 html: mail
             }
             
             transporter.sendMail(message).then(async() => {
                person.lastSeen = 'Online';
                person.save()
                
             }).catch(error => {
                //  res.status(500).json({error:error.message});
             })
};

module.exports = NotifyLogin
