import mongoose from "mongoose";

const wordSchema = new mongoose.Schema({
  word: {
    type: String, 
    required: true 
  },
  meaning: { 
    type: String, 
    required: true 
  },
  exampleSentence: { 
    type: String 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  },
});

export default mongoose.model("Word", wordSchema);
