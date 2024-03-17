const nodemailer = require("nodemailer");
const WelcomeTemplate = require('../EmailTemplates/WelcomToBADETemplate');
const {PASSWORD,EMAIL,ERPSmtpName} = require('../.env');


const WelcomeMessageHandler = async (req,res) => {
    const data =req.body
    
    let config = {
        service : 'gmail',
        auth : {
            user: EMAIL,
            pass: PASSWORD
        },
        tls : { rejectUnauthorized: false }//always add this to stop error in console   
    }

    let transporter = nodemailer.createTransport(config);
    
    let message = {
        from : EMAIL,
        to : data.email,
        subject: 'BADE Welcome',
        html: WelcomeTemplate(data)
    }
    
    transporter.sendMail(message).then(() => {
        res.status(200).json( {message:'Account registered successfully. please check your email'});
    }).catch(error => {
        res.status(404).json( {message: error.message});
    })
    
    
};

module.exports = WelcomeMessageHandler
