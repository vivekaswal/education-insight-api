const express = require("express");
const companyRecord =require( "../models/companyList");
const router = new express.Router();

router.post("/companyAdd", async (req, res) => {
  const company = new companyRecord(req.body);

  try {
    await company.save();

    res.status(201).send(company);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/companyDelete/:id", async (req, res) => {
  const company_id = req.params.id;
  try {
    const company = await companyRecord.findByIdAndDelete(company_id);
    console.log(company);
    if (!company) {
      return res.status(404).send("user not found");
    }
    res.send("Deleted");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/companyEdit/:id", async (req, res) => {
  const updates = Object.keys(req.body);

  const allowUpdates = ["name"];

  const isValidOperation = updates.every((update) => {
    return allowUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invlaid update",
    });
  }

  try {
    const companyRec = await companyRecord.findById(req.params.id);

    updates.forEach((update) => {
      companyRec[update] = req.body[update];
    });

    await companyRec.save();

    res.send(comapnyRec);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
