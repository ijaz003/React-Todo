const todoModel = require('../model/todoModel');

const updateData = async (req, res) => {
  try {
    const { id, text } = req.body;
    if (!id || !text) {
      return res.status(400).json({ message: 'Invalid data' });
    }

    // Update the document in the database
    const result = await todoModel.updateOne(
      { _id: id },
      { $set: { text: text } }
    );

    // Check if the update was successful
    if (result.nModified === 0) {
      return res.status(404).json({ message: 'Todo not found or text is the same' });
    }

    res.status(200).json({ message: 'Todo updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = updateData;
