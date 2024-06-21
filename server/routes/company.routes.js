const express = require("express");
const router = express.Router();
const Company = require("../models/Company.model");
const { isAuthenticated } = require("../middlewares/route-guard.middleware");

// Criar uma nova empresa
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newCompany = await Company.create(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    res.status(400).json({ message: "Error creating company", error });
  }
});

// Listar todas as empresas
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(400).json({ message: "Error fetching companies", error });
  }
});

// Obter uma empresa por ID
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    res.status(400).json({ message: "Error fetching company", error });
  }
});

// Atualizar uma empresa por ID
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCompany);
  } catch (error) {
    res.status(400).json({ message: "Error updating company", error });
  }
});

// Deletar uma empresa por ID
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    await Company.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting company", error });
  }
});

module.exports = router;
