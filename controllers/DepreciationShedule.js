const { ObjectId } = require("mongodb");
var moment = require("moment");
const Employe = require("../modules/Employees");
const Vendor = require("../modules/Vendors");
const Assets = require("../modules/Assets");
const mongoose = require("mongoose");
const { WHouse } = require("../modules/warehouse");
const birthdayTemplates = require("../EmailTemplates/birthdatTemplate");
const { PASSWORD, EMAIL, ERPSmtpName } = require("../.env");
const nodemailer = require("nodemailer");
//get all asset
module.exports.asset_get = async (req, res, next) => {
  const assets = await Assets.find();
  res.status(200).render("./AssetViews/asset", { assets ,name: "BADE"});
};

module.exports.assetCreate_get = async (req, res, next) => {
  const Employees = await Employe.find();
  res.status(200).render("./AssetViews/assetForm", { Employees ,name: "BADE"});
};

module.exports.asset_post_create = async (req, res, next) => {
  try {
    await Assets.create(req.body).then((asset) => {
      if (asset) {
        res.status(200).json({ message: "Asset created successfully" });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//get single asset
module.exports.SingleAsset = async (req, res) => {
  if (ObjectId.isValid(req.params.AssetId)) {
    try {
      await Assets.findById(req.params.AssetId)
        .limit(1)
        .then(async (asset) => {
          const Employees = await Employe.find();
          if (asset) {
            // asset.AcivityLog = [];
            // asset.save();
            res
              .status(200)
              .render("./AssetViews/SingleAsset", { asset, Employees,name: "BADE" });
          } else {
            throw new Error("Could find this asset");
          }
        });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.redirect("/api/v1/404");
  }
};

module.exports.BirthdayMessage = async (req, res) => {
  // for birthdat notifications
  const birth = moment().format();

  // send  birthday mail automatically
  const data = await Employe.find();
  const birthdayPerson = data.filter((person) => {
    return person.DOB.toString().substring(5, 10) === birth.substring(5, 10);
  });

  let config = {
    service: "gmail",
    auth: {
      user: EMAIL,
      pass: PASSWORD,
    },
    tls: { rejectUnauthorized: false }, //always add this to stop error in console
  };

  let transporter = nodemailer.createTransport(config);

  //send mail to each email
  birthdayPerson.forEach((person) => {
    if (person) {
      let message = {
        from: EMAIL,
        to: person.Email, //employee email
        subject: `Bade Team wishes ${person.firstName} a Happy Birthday `,
        html: birthdayTemplates(person),
      };

      transporter
        .sendMail(message)
        .then(() => {
          res
            .status(200)
            .json({
              message: `birthday message sent to ${birthdayPerson.length} person`,
            });
        })
        .catch((error) => {
          res.status(500).json({ error: error.message });
        });
    }
  });
};

// vendor transaction report
module.exports.vendorTransactionReport = async (req, res, next) => {
  const vendors = await Vendor.find();
  res.status(200).render("vendorTransaction", { vendors ,name: "BADE"});
};

// ..for vat report
module.exports.VAT_REPORT = async (req, res, next) => {
  const wareHouse = await WHouse.find();
  res.status(200).render("VatReport", { wareHouse,name: "BADE" });
};

// for task management
module.exports.taskManager = async (req, res, next) => {};
