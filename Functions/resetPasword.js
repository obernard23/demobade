const nodemailer = require("nodemailer");
const PasswordReset = require('../EmailTemplates/PasswordResetTemplate');
const {PASSWORD,EMAIL,ERPSmtpName} = require('../.env');
const Employe = require('../modules/Employees')


const restPassword = async (req,res,next) => {
    const data = await Employe
      .findOne({ Email: req.params.EmailTOreset })
      .limit(1)

    let otp =""
    const generateOtp = ()=>{
    var digits = "1234567890"
    for (let i = 0; i < 4; i++){
    otp +=digits[Math.floor(Math.random()*10)]
    }
    }
    generateOtp()
    
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
        to : data.Email,
        subject: `Bade password reset`,
        html: PasswordReset(otp)
    }
    
    transporter.sendMail(message).then(() => {
        res.status(200).json( {data ,otp});
    }).catch(error => {
        res.status(404).json( {message: error.message});
    })
    
    
};

module.exports = restPassword
