import mongoose from 'mongoose';

const accessLogSchema = new mongoose.Schema({
  query: String,
  accessedAt: { type: Date, default: Date.now },
  user: String,
});

export const AccessLog = mongoose.model('AccessLog', accessLogSchema);
