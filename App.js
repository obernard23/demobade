const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const authRoutes = require("./Routes/authenticate");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middleware/authmidddleware");
const Dotenv = require("./.env");
const { WHouse } = require("./modules/warehouse");
const Employe = require("./modules/Employees");
const nodemailer = require("nodemailer");
const Assets = require("./modules/Assets");
const { PASSWORD, EMAIL, ERPSmtpName } = require("./.env");
const Expense = require("./modules/Expense");
const NotifyCFO = require("./Functions/NotifyCFO");

var moment = require("moment");
const cron = require("node-cron");
var cors = require("cors");

//initialize app
const app = express();

// configuration for cors blocking

var corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

mongoose.set("strictQuery", true);
mongoose
  .connect(Dotenv.dbUrl, { useNewUrlParser: true })
  .then((result) => {
    app.listen(Dotenv.PORT, () => {
      console.log(`connected to ${Dotenv.PORT}`);
    }),
      console.log("connected to db");
  })
  .catch((err) => console.log(err));

//register view engine
app.set("view engine", "ejs");

//for middle ware
app.use(express.static("public"));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
//declare public folder
app.set("public");

//router for routes
app.use("/api/v1", authRoutes);

app.use(cors());

app.get("/", async (req, res, next) => {
  //entrty routes for server
  //check and CREATE ADMIN
  const employee = await Employe.find();
  // console.log(employee)

  if (employee.length < 1) {
    await Employe.create({
      firstName: "Developer",
      lastName: "Bot",
      Email: "operations.bade@gmail.com",
      DOB: "01-01-0001",
      telephone: "+19039377443",
      firstTimeOnboard: true,
      status: "active",
      password: "1234@Bade",
      role: "Admin",
    }).then((response) => {
      if (response) {
        res.redirect("/api/v1/Dashboard/userid");
      }
    });
  }
  res.redirect("/api/v1/Dashboard/userid");
});

let number = 1;
// let Birthdaytask = cron.schedule('* * * * * *', () => {
//   console.log('running a task every minute',birth.substring(0,10));

// },{
//   scheduled: true,

// })
// if(number === 4)  Birthdaytask.stop()

async function depreciationTask() {
  // console.log('Cron job executed at:', new Date().toLocaleString());
  await Assets.find().then((asset) => {
    asset.forEach(async (asset) => {
      cron.schedule(
        "0 0 * * *",
        async () => {
          // Schedule the cron job to run every minute
          let depreciationDay = moment(asset.depreciationStartDate).format("l");
          let today = moment(new Date()).format("l");
          if (
            depreciationDay.substring(0, 6) === today.substring(0, 6) &&
            asset.CurrentValue !== 0
          ) {
            await Assets.updateOne(
              { _id: asset._id },
              {
                $set: {
                  CurrentValue: parseInt(
                    asset.CurrentValue - asset.ResidualValue
                  ),
                },
              }
            ).then(async (acknowledge) => {
              if (acknowledge) {
                const employee = await Employe.findById(asset.AssignedTo);
                const updated = await Assets.findById(asset._id);
                asset.AcivityLog.push({
                  Date: moment().format("l"),
                  DepreciatedValue: asset.ResidualValue,
                  Assetvalue: updated.CurrentValue,
                });
                asset.save();

                await Expense.create({
                  refNo: Math.floor(Math.random() * Math.random() + 13909),
                  payee: "Asset Register",
                  Amount: `${asset.ResidualValue}`,
                  status: `Approved`,
                  paymentDate: moment().format("l"),
                  Date: moment().format("l"),
                  WHID: employee.workLocation,
                  category: "Asset-Depreciation",
                  remarks: `${
                    asset.AssetCode
                  } Depreciation for ${moment().format("l")}`,
                }).then((expense) => {
                  if (expense) {
                    NotifyCFO(expense);
                  }
                });
              } else {
                asset.AcivityLog.push({
                  Date: moment().format("l"),
                  DepreciatedValue: 0,
                  Assetvalue: updated.CurrentValue,
                });
                asset.save();
              }
            });
          } else if (
            depreciationDay.substring(0, 6) === today.substring(0, 6) &&
            asset.CurrentValue === 0
          ) {
            asset.status = "Depreciated";
            asset.save();
          }
        },
        {
          scheduled: true,
        }
      );
    });
  });
}

depreciationTask();

// let depreciationTask = cron.schedule('0 0 1 * *', function(){
//   console.log('Your scheduled job at beginning of month, uses this for dpreciation schedule');
// },{
//   scheduled: false
// });

// depreciationTask.start()

// setInterval(()=>{
//   //this should log 12hrs
//   sendBirtdaysEmail()
// console.log('hellooo')
// },3000)
