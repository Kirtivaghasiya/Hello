const mini = require('../modals/mini');
const ObjectId = require('mongoose').Types.ObjectId;
const about = require('../modals/about')
const order = require('../modals/order')
const contact = require('../modals/contact')
const review = require('../modals/review')
const form = require('../modals/form')
const signup = require('../modals/signup')
const ordersend = require('../modals/ordersend')
// const loginhistoryData = require('../modals/loginhistoryData')
// const userdata = require('../modals/userdata')


// SIGNUP PAGE
module.exports.signup = async function (req, res) {
    console.log('req.query===>', req.query)
    try {
        var check = await signup.findOne({ Uname: req.query.Uname });
        var check2 = await signup.findOne({ email: req.query.email });
        // console.log('check====>', check);
        if (check) {
            res.send({ status: "fail", msg: "User Name Is All Ready Ragistar...!" });
        }
        else if (check2) {
            res.send({ status: "fail", msg: "Email Is All Ready Ragistar...!" });
        }
        else {
            var objModal = new signup(req.body);
            objModal.cdt = new Date();
            await objModal.save()
            res.send({ status: 'success' });
        }
    } catch (error) {
        console.log(error, 'error add data');
    }
};

// module.exports.signup = async function (req, res) {
//     try {
//         var check = await signup.findOne({ email: req.body.email });
//         if (check) {
//             res.send({ status: "fail", msg: "email use" });
//         }
//         else {
//             var objModal = new signup(req.body);
//             objModal.cdt = new Date();
//             await objModal.save()
//             var check = await mini.find({});
//             res.send({ status: "success", data: check });
//         }
//     } catch (error) {
//         console.log(error, 'error add data');
//     }
// };

module.exports.signin = async function (req, res) {
    try {
        const { email, password, Uname } = req.query;

        if (!email || !password || !Uname) {
            res.send({ status: "fail", msg: "Email & Password Mast Be Requires...!" });
        }
        var check = await signup.findOne({ Uname: Uname });
        if (check) {
            if (check.email !== email) {
                res.send({ status: "fail", msg: " Email Not Found...!" });
            }
            else if (check.password !== password) {
                res.send({ status: "fail", msg: " Password Is Not match...!" });
            }
            else
                res.send({ status: "success", msg: "Login suceess", id: check._id, Uname: Uname, email: email });
        }
        else {
            res.send({ status: "fail", msg: "User Name Is Not Match...!" });
        }

    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.getsignupdata = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await signup.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.userdata = async function (req, res) {
    try {
        var objModal = new userdata(req.body);
        objModal.cdt = new Date();
        await objModal.save()
        var check = await userdata.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.getuserdata = async function (req, res) {
    try {
        var check = await userdata.find({}).sort({ cdt: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.loginhistory = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await signup.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.loginhistoryData = async function (req, res) {
    try {
        var objModal = new loginhistoryData(req.body);
        await objModal.save()
        var check = await loginhistoryData.find({});
        console.log("check====>", check);
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};













// ADMIN PENAL MA POST NI API NI JARUR NTHI AEK RECORD DAYNAMIC PADI DEVA NO MODEL MA AND AFTER GET API USEING LOGIN CHECK AND TRUE SO... ENTER THE WEBSITE..!!

// module.exports.userdata = async function (req, res) {
//     try {
//         var check = await mini.findOne({ email: req.body.email });
//         if (check) {
//             res.send({ status: "fail", msg: "email use" });
//         }
//         else {
//             var objModal = new mini(req.body);
//             objModal.cdt = new Date();
//             await objModal.save()
//             var check = await mini.find({});
//             res.send({ status: "success", data: check });
//         }
//     } catch (error) {
//         console.log(error, 'error add data');
//     }
// };


// module.exports.getdata = async function (req, res) {
//     try {
//         var check = await mini.find({});
//         res.send({ status: "success", data: check });
//     } catch (error) {
//         console.log(error, 'error add data');
//     }
// };

module.exports.getdata = async function (req, res) {
    try {

        const { email, pass } = req.query;
        if (!email || !pass) {
            res.send({ status: "fail", msg: "email & password mast be requires !" });
        }
        var check = await mini.findOne({ email: email });
        if (check) {
            if (check.pass !== pass) {
                res.send({ status: "fail", msg: " password is not right !" });
            }
            else {
                res.send({ status: "success", msg: "Login suceess", id: check._id, email: email });
            }
        } else {
            res.send({ status: "fail", msg: "email not found" });
        }
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.usergetdata = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await mini.find({});
        console.log("check==>", check);
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.userupdatedata = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        await mini.updateOne({ "_id": new ObjectId(req.body._id) }, { $set: { "un": req.body.un } });
        var check = await mini.find({}).sort({ cdt: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};
// module.exports.updatepass = async function (req, res) {
//     try {
//         var objModal = new updatepass(req.body);
//         // objModal.uid = new ObjectId(objModal.uid);
//         objModal.otd = new Date();
//         await objModal.save()

//         let { id, cpd, npd } = values.body;
//         let checkPass = await mini.findOne({ _id: new ObjectId(id) });
//         if (checkPass) {
//             let checkPd = await passwordService.comparePwd(cpd, checkPass.pass);
//             if (!checkPd) {
//                 return ({ status: 200, data: { status: "notmatch" } });
//             }
//             else {
//                 const hashPassword = await passwordService.createHashPwd(npd);
//                 await mini.updateOne({ _id: new ObjectId(id) }, { $set: { pass: hashPassword } });
//                 return ({ status: 200, data: { status: "success" } });
//             }
//         } else {
//             return ({ status: 200, data: { status: "notmatch" } });
//         }

//         // var check = await mini.find({});
//         // res.send({ status: "success", data: check });
//     } catch (error) {
//         console.log(error, 'error add data');
//     }
// };













// About page

module.exports.aboutdata = async function (req, res) {
    try {
        console.log(req.body);
        let _img = req.body.img;
        const newpath = "files/";
        let filename = '';
        if (req.files && req.files.file) {
            const file = req.files.file;
            filename = file.name;

            file.mv(`${newpath}${filename}`, (err) => {
                if (err) {
                    console.log(err);
                    console.log("File upload failed");
                    // res.status(500).send({ message: "File upload failed", code: 200 });
                }
                // console.log("File Uploaded");
                // res.status(200).send({ message: "File Uploaded", code: 200 });
            });
            _img = `${newpath}${filename}`;
        }
        var objModal = new about(req.body);
        if (req.files && req.files.file) {
            objModal.img = `${newpath}${filename}`
        }
        objModal.cdt = new Date();
        await objModal.save()

        var check = await about.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};
module.exports.updatedata = async function (req, res) {
    try {
        console.log('req.body._id===>', req.body);
        var objfil = { "Fname": req.body.Fname, "Pnumber": req.body.Pnumber }
        let _img = req.body.img;
        if (req.files && req.files.file) {
            const newpath = "files/";
            const file = req.files.file;
            const filename = file.name;

            file.mv(`${newpath}${filename}`, (err) => {
                if (err) {
                    console.log(err);
                    console.log("File upload failed");
                }
                console.log("File Uploaded");
            });
            _img = `${newpath}${filename}`;
            objfil.img = _img
        }
        await about.updateOne({ "_id": new ObjectId(req.body._id) }, { $set: objfil });
        var check = await about.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.aboutgetdata = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await about.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};



module.exports.delete = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        await about.deleteOne({ "_id": new ObjectId(req.query._id) });
        var check = await about.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};












// DISHSES ORDER
//UPLORD IMAGE

module.exports.orderdata = async function (req, res) {
    try {
        console.log(req.body);
        let _img = req.body.img;
        const newpath = "files/";
        let filename = '';
        if (req.files && req.files.file) {
            const file = req.files.file;
            filename = file.name;

            file.mv(`${newpath}${filename}`, (err) => {
                if (err) {
                    console.log(err);
                    console.log("File upload failed");
                    // res.status(500).send({ message: "File upload failed", code: 200 });
                }
                // console.log("File Uploaded");
                // res.status(200).send({ message: "File Uploaded", code: 200 });
            });
            _img = `${newpath}${filename}`;
        }
        var objModal = new order(req.body);
        if (req.files && req.files.file) {
            objModal.img = `${newpath}${filename}`
        }
        objModal.cdt = new Date();
        await objModal.save()

        var check = await order.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.orderupdatedata = async function (req, res) {
    try {
        console.log('req.body._id===>', req.body);
        var objfil = { "ft": req.body.ft, "me": req.body.me, "ds": req.body.ds, "slug": req.body.slug, "upd": new Date() }
        let _img = req.body.img;
        if (req.files && req.files.file) {
            const newpath = "files/";
            const file = req.files.file;
            const filename = file.name;

            file.mv(`${newpath}${filename}`, (err) => {
                if (err) {
                    console.log(err);
                    console.log("File upload failed");
                }
                console.log("File Uploaded");
            });
            _img = `${newpath}${filename}`;
            objfil.img = _img
        }
        await order.updateOne({ "_id": new ObjectId(req.body._id) }, { $set: objfil });
        var check = await order.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.ordergetdata = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await order.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.orderdelete = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        await order.deleteOne({ "_id": new ObjectId(req.query._id) });
        var check = await order.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};














// ORDER SEND page

module.exports.ordersend = async function (req, res) {
    try {
        var objModal = new ordersend(req.body);
        objModal.uid = new ObjectId(objModal.uid);
        objModal.otd = new Date();
        await objModal.save()
        var check = await form.find({ oid: new ObjectId(req.body.oid) });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.orderstatus = async function (req, res) {
    try {
        // console.log('req.body.uid===>', req.body.uid);
        // USER NAME HOI E J DATA SEEN THAII TE MATE AA IF.......................................//
        let obj = {}
        if (req.query.uid) {
            obj = ({ uid: new ObjectId(req.query.uid) })
        }
        var check = await ordersend.find(obj).sort({ otd: -1 });
        console.log("otd", obj);
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

// module.exports.orderstatusapprove = async function (req, res) {
//     try {
//         // var objModal = new about(req.body);
//         // await objModal.save()

//         // console.log('req.body.uid===>', req.body.uid);
//         // USER NAME HOI E J DATA SEEN THAII TE MATE AA IF.......................................//
//         // let obj = {}
//         // if (req.query.uid) {
//         //     obj = { uid: new ObjectId(req.query.uid) }
//         // }
//         var check = await ordersend.find({ "_id": new ObjectId(req.query._id) }).sort({ otd: -1 });
//         // console.log("otd", obj);
//         res.send({ status: "success", data: check });
//     } catch (error) {
//         console.log(error, 'error add data');
//     }
// };


module.exports.deleteorder = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        await ordersend.deleteOne({ "_id": new ObjectId(req.query._id) });
        // console.log('id', _id);
        var check = await ordersend.find({}).sort({ otd: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

// ALSO YES......////

// module.exports.deleteorder = async function (req, res) {
//     try {
//         // var objModal = new order(req.body);
//         // await objModal.save()
//         let obj = {}
//         if (req.query._id) {
//             obj = { _id: new ObjectId(req.query._id) }
//         }
//         await ordersend.deleteOne(obj);
//         var check = await ordersend.find({});
//         res.send({ status: "success", data: check });
//     } catch (error) {
//         console.log(error, 'error add data');
//     }
// };












// api approve
module.exports.apirequest = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        console.log('_id==>', req.query._id);

        await ordersend.updateOne({ "_id": new ObjectId(req.query._id) }, { $set: { "status": "SUCCESS", "note": "ENJOY YOUR ORDER" } });
        // await ordersend.updateOne({ "_id": new ObjectId(req.query._id) }, { $set: {} });
        var check = await ordersend.find({}).sort({ otd: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.requestcancel = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        console.log('_id==>', req.query._id);
        // await ordersend.updateOne({ "_id": new ObjectId(req.query._id) }, { $set: {} });
        await ordersend.updateOne({ "_id": new ObjectId(req.query._id) }, { $set: { "status": "CANCEL...!!!", "note": "ERROR!!  YOUR ORDER IS CANCEL.....SO , NOW ENTER A VALID DETAILS.!" } });
        var check = await ordersend.find({}).sort({ otd: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.apideleteorder = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        await ordersend.deleteOne({ "_id": new ObjectId(req.query._id) });
        var check = await ordersend.find({}).sort({ otd: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};














// CONTACT PAGE


module.exports.contact = async function (req, res) {
    try {
        var objModal = new contact(req.body);
        await objModal.save()
        var check = await contact.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.contactgetdata = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await contact.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};
















// REVIEW PAGE


module.exports.review = async function (req, res) {
    try {
        var objModal = new review(req.body);
        await objModal.save()
        var check = await review.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.reviewgetdata = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await review.find({});
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};
















// FORM PAGE 

module.exports.form = async function (req, res) {
    try {
        var objModal = new form(req.body);
        objModal.oid = new ObjectId(objModal.oid)
        objModal.cdt = new Date()
        await objModal.save()
        var check = await form.find({}).sort({ cdt: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.formgetdata = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await form.find({}).sort({ cdt: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};


module.exports.formupdatedata = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        await form.updateOne({ "_id": new ObjectId(req.body._id) }, { $set: { "it": req.body.it, "pr": req.body.pr, "upd": new Date() } });
        var check = await form.find({}).sort({ cdt: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};

module.exports.formdelete = async function (req, res) {
    try {
        // var objModal = new order(req.body);
        // await objModal.save()
        await form.deleteOne({ "_id": new ObjectId(req.query._id) });
        var check = await form.find({}).sort({ cdt: -1 });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};






module.exports.orderdish = async function (req, res) {
    try {
        // var objModal = new about(req.body);
        // await objModal.save()
        var check = await form.find({ "oid": new ObjectId(req.query.id) });
        res.send({ status: "success", data: check });
    } catch (error) {
        console.log(error, 'error add data');
    }
};
