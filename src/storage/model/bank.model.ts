import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  entityComission: { type: Number, required: true },
  individualComission: { type: Number, required: true },
});

export const BankModel = mongoose.model("Bank", bankSchema);
