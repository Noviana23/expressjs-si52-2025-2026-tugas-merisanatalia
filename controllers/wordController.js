import Word from "../models/word.js";

export const createWord = async (req, res) => {
  try {

    const word = await Word.create(
        { ...req.body, user: req.user.id }
    );

    res.status(201).json(word);

  } catch (error) {
    res.status(400).json(
        { message: error.message })
        ;
  }
};

export const getWords = async (req, res) => {

  const words = await Word.find(
    { user: req.user.id }
);
  res.json(words);

};

export const getWordById = async (req, res) => {

  const word = await Word.findOne(
    { _id: req.params.id, user: req.user.id }
);

  if (!word) 
    return res.status(404).json(
{ message: "Word not found" }
);

  res.json(word);
};

export const updateWord = async (req, res) => {

  const word = await Word.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    req.body,
    { new: true }
  );

  if (!word) 
    return res.status(404).json(
{ message: "Word not found" }
);

  res.json(word);
};

export const deleteWord = async (req, res) => {
  const word = await Word.findOneAndDelete(
    { _id: req.params.id, user: req.user.id }
);

  if (!word) 
    return res.status(404).json({ message: "Word not found" }
);

  res.json(
    { message: "Word deleted successfully" }
);
};
