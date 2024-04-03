import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  entityComission: Number,
  individualComission: Number,
});

export const Bank = mongoose.model("Bank", bankSchema);
