import mongoose from "mongoose";

/**
 *  Token interface
 */
export interface IToken extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId;
  token: string;
  createdAt: Date;
}

/**
 *  Token schema
 */
const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  token: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

export const Token = mongoose.model<IToken>("Token", tokenSchema);
