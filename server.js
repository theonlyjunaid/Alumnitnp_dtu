const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const JoinCurrent = require("./model/JoinCurrent");
const JoinAlumni = require("./model/JoinAlumni");
const New = require("./model/New");
const Event = require("./model/Event");
const path = require("path");

const Admin = require("./model/Admin");
const AdminBro = require("admin-bro");
const mongooseAdminBro = require("@admin-bro/mongoose");
const AdminBroExpressjs = require("@admin-bro/express");

require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

mongoose.connect(process.env.MONGODB_URL);

app.use(express.static(__dirname + "/public"));

const canModifyUsers = ({ currentAdmin }) =>
  currentAdmin && currentAdmin.role === "admin";

AdminBro.registerAdapter(mongooseAdminBro);
// const AdminBroOptions = {
//   resources: [Admin, User, New, Event],
// };
const canEditEmp = ({ currentAdmin, record }) => {
  return currentAdmin && currentAdmin.role === "admin";
};
const AdminBroOptions = {
  resources: [
    {
      resource: New,
      options: {
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canEditEmp },
          delete: { isAccessible: canEditEmp },
          new: { isAccessible: canEditEmp },
        },
      },
    },
    {
      resource: Event,
      options: {
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canEditEmp },
          delete: { isAccessible: canEditEmp },
          new: { isAccessible: canEditEmp },
        },
      },
    },
    {
      resource: JoinAlumni,
      options: {
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canEditEmp },
          delete: { isAccessible: canEditEmp },
          new: { isAccessible: canEditEmp },
        },
      },
    },
    {
      resource: JoinCurrent,
      options: {
        properties: {
          ownerId: {
            isVisible: { edit: false, show: true, list: true, filter: true },
          },
        },
        actions: {
          edit: { isAccessible: canEditEmp },
          delete: { isAccessible: canEditEmp },
          new: { isAccessible: canEditEmp },
        },
      },
    },
    {
      resource: Admin,
      options: {
        properties: {
          encryptedPassword: { isVisible: false },
          password: {
            type: "string",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.record.password) {
                request.payload.record = {
                  ...request.payload.record,
                  encryptedPassword: await bcrypt.hash(
                    request.payload.record.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
          edit: { isAccessible: canModifyUsers },
          delete: { isAccessible: canModifyUsers },
          new: { isAccessible: canModifyUsers },
        },
      },
    },
  ],
};

const adminBro = new AdminBro(AdminBroOptions);
// const router = expressAdminBro.buildRouter(adminBro);
const router = AdminBroExpressjs.buildAuthenticatedRouter(adminBro, {
  authenticate: async (email, password) => {
    const user = await Admin.findOne({ email });
    if (user) {
      if (password === user.encryptedPassword) {
        return user;
      }
    }
    return false;
  },
  cookiePassword: "session Key",
});

app.use(adminBro.options.rootPath, router);

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const news = await New.find({}).sort({ date: -1 });
  const eventsData = await Event.find({}).sort({ date: -1 });
  const events = eventsData.map((item) => {
    return { ...item, date: item.date.split(" ") };
  });
  res.render("pages/index", { news, events });
});

app.post("/joincurrent", async (req, res) => {
  try {
    const user = new JoinCurrent(req.body);
    await user.save();
    res.send("OK");
  } catch (error) {
    res.render("ERROR");
  }
});

app.post("/joinalumni", async (req, res) => {
  try {
    const user = new JoinAlumni(req.body);
    await user.save();
    res.send("OK");
  } catch (error) {
    res.send("ERROR");
  }
});

const port = process.env.PORT || 80;

app.listen(port, (req, res) => {
  console.log("Server is up at 3000");
});
