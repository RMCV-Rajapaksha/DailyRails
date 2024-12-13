const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { expect } = require("chai");
const sinon = require("sinon");

describe("Database Models", () => {
  let sequelizeStub, readdirSyncStub, requireStub;

  beforeEach(() => {
    sequelizeStub = sinon.createStubInstance(Sequelize);
    readdirSyncStub = sinon.stub(fs, "readdirSync");
    requireStub = sinon.stub();
  });

  afterEach(() => {
    sinon.restore();
  });

  it("should load models dynamically from the current directory", () => {
    readdirSyncStub.returns(["model1.js", "model2.js"]);
    requireStub
      .withArgs(path.join(__dirname, "model1.js"))
      .returns((sequelize, DataTypes) => ({
        name: "Model1",
        associate: sinon.stub(),
      }));
    requireStub
      .withArgs(path.join(__dirname, "model2.js"))
      .returns((sequelize, DataTypes) => ({
        name: "Model2",
        associate: sinon.stub(),
      }));

    const db = {};
    readdirSyncStub(__dirname)
      .filter((file) => {
        return (
          file.indexOf(".") !== 0 &&
          file !== path.basename(__filename) &&
          file.slice(-3) === ".js" &&
          !file.endsWith(".test.js")
        );
      })
      .forEach((file) => {
        const model = requireStub(path.join(__dirname, file))(
          sequelizeStub,
          Sequelize.DataTypes
        );
        db[model.name] = model;
      });

    expect(db).to.have.property("Model1");
    expect(db).to.have.property("Model2");
  });

  it("should explicitly import models from different directories", () => {
    const itemModelStub = sinon
      .stub()
      .returns({ name: "ItemModel", associate: sinon.stub() });
    const announcementModelStub = sinon
      .stub()
      .returns({ name: "AnnouncementModel", associate: sinon.stub() });
    const reportModelStub = sinon
      .stub()
      .returns({ name: "ReportModel", associate: sinon.stub() });
    const adminModelStub = sinon
      .stub()
      .returns({ name: "AdminModel", associate: sinon.stub() });
    const userModelStub = sinon
      .stub()
      .returns({ name: "UserModel", associate: sinon.stub() });
    const trainModelStub = sinon
      .stub()
      .returns({ name: "TrainModel", associate: sinon.stub() });
    const paymentModelStub = sinon
      .stub()
      .returns({ name: "PaymentModel", associate: sinon.stub() });
    const stoppingPointModelStub = sinon
      .stub()
      .returns({ name: "StoppingPointModel", associate: sinon.stub() });

    requireStub
      .withArgs(path.join(__dirname, "../Features/Items/models/ItemsModels"))
      .returns(itemModelStub);
    requireStub
      .withArgs(
        path.join(
          __dirname,
          "../Features/Announcement/models/AnnouncementModel"
        )
      )
      .returns(announcementModelStub);
    requireStub
      .withArgs(path.join(__dirname, "../Features/Reports/models/ReportModels"))
      .returns(reportModelStub);
    requireStub
      .withArgs(path.join(__dirname, "../Features/Auth/models/AdminModel"))
      .returns(adminModelStub);
    requireStub
      .withArgs(path.join(__dirname, "../Features/Auth/models/UserModel"))
      .returns(userModelStub);
    requireStub
      .withArgs(path.join(__dirname, "../Features/Schedule/models/TrainModel"))
      .returns(trainModelStub);
    requireStub
      .withArgs(path.join(__dirname, "../Features/Booking/models/PaymentModel"))
      .returns(paymentModelStub);
    requireStub
      .withArgs(
        path.join(__dirname, "../Features/Schedule/models/StoppingPointModel")
      )
      .returns(stoppingPointModelStub);

    const db = {};
    const models = [
      itemModelStub,
      announcementModelStub,
      reportModelStub,
      adminModelStub,
      userModelStub,
      trainModelStub,
      paymentModelStub,
      stoppingPointModelStub,
    ];

    models.forEach((modelStub) => {
      const model = modelStub(sequelizeStub, Sequelize.DataTypes);
      db[model.name] = model;
    });

    expect(db).to.have.property("ItemModel");
    expect(db).to.have.property("AnnouncementModel");
    expect(db).to.have.property("ReportModel");
    expect(db).to.have.property("AdminModel");
    expect(db).to.have.property("UserModel");
    expect(db).to.have.property("TrainModel");
    expect(db).to.have.property("PaymentModel");
    expect(db).to.have.property("StoppingPointModel");
  });
});
