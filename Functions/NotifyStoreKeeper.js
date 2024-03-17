const nodemailer = require("nodemailer");
const Mailgen = require('mailgen');
const {PASSWORD,EMAIL,ERPSmtpName,url} = require('../.env');
const { ObjectId } = require("mongodb");
const bills = require('../modules/Bills')
const {WHouse} = require('../modules/warehouse')


// sends notification to raise delivery note / waybill to WH manager
const NotifyStoreKeeper = async (bill) => {
    let date = new Date()
    const wareHouseEmail = await WHouse.findById(new ObjectId(bill.whId)).then((warehouse) =>{
        return warehouse.StoreKeeper.Email;
    })
    
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
        name : 'Store keeper',
        intro: "New Delivery to sort",
        action: [
            {
                instructions: 'To get view with this request, please click here:',
                button: {
                    color: '#22BC66',
                    text: `Raise WayBill ${bill.billReferenceNo}`,
                    link: `${url}/api/v1/wh-lagos/bill/${bill._id}`
                }
            }
        ]
    },
        outro: "kind Regards"
    }
    
    let mail = MailGenerator.generate(response)
    
    let message = {
        from : EMAIL,
        to : wareHouseEmail,
        subject: `${ERPSmtpName} Operations`, 
        html: mail
    }
    
    transporter.sendMail(message).then(() => {
   console.log("Payment acknowledged. Ware House Stock keeper will receive notification")
    }).catch(error => {
        console.log(error.message)
    })
    
    
};

module.exports = NotifyStoreKeeper
