const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/route-guard.middleware");
const Opportunity = require("../models/Opportunity.model");

// Criar uma nova vaga
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newOpportunity = await Opportunity.create(req.body);
    res.status(201).json(newOpportunity);
  } catch (error) {
    res.status(400).json({ message: "Error creating opportunity", error });
  }
});

// Listar todas as vagas
router.get("/", async (_, res) => {
  try {
    const opportunity = await Opportunity.find();
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(400).json({ message: "Error fetching opportunities", error });
  }
});

// Obter uma vaga por ID
router.get("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    res.status(200).json(opportunity);
  } catch (error) {
    res.status(400).json({ message: "Error fetching opportunity", error });
  }
});

// Atualizar uma vaga por ID
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const updateOpportunity = await Opportunity.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updateOpportunity);
  } catch (error) {
    res.status(400).json({ message: "Error updating opportunity", error });
  }
});

// Deletar uma vaga por ID
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    await Opportunity.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Opportunity deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting opportunity", error });
  }
});

module.exports = router;
