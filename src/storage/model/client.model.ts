import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: ["entity", "individual"],
      default: "individual",
    },
  },
  { versionKey: false },
);

export const ClientModel = mongoose.model("Client", clientSchema);
