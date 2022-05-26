const express = require("express");
const  companyMemberRecord= require( "../models/companyMembers");
const router = new express.Router();

router.post("/companyMemberAdd", async (req, res) => {
  const member = new companyMemberRecord(req.body);

  try {
    await member.save();

    res.status(201).send(member);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.delete("/companyMemberDelete/:id", async (req, res) => {
  const member_id = req.params.id;
  try {
    const member = await companyMemberRecord.findByIdAndDelete(member_id);
  
    if (!member) {
      return res.status(404).send("user not found");
    }
    res.send("Deleted");
  } catch (e) {
    res.status(500).send(e);
  }
});

router.put("/companyMemberEdit/:id", async (req, res) => {
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
    const companyMemberRec = await companyMemberRecord.findById(req.params.id);

    updates.forEach((update) => {
      companyMemberRec[update] = req.body[update];
    });

    await companyMemberRec.save();

    res.send(comapnyMemberRec);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
