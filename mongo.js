const mongoose = require("mongoose");
// const password = encodeURIComponent(`${process.argv[2]}`);

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = encodeURIComponent(process.argv[2]);

const url = `mongodb+srv://fullstack:${password}@cluster0.vtyqg.mongodb.net/noteApp?retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    // Code for create
    const note = new Note({
      content: "Tenda Quechua",
      date: new Date(),
      important: false,
    });

    return note.save();
  })
  .then(() => {
    console.log("note saved!");
    return mongoose.connection.close();

    // code for find
    // Note.find({ important: true })
    //   .then((result) => {
    //     console.log(result);
    //     result.forEach((note) => {
    //       console.log(note);
    //       console.log("test");
    //       console.log(result);
    //     });
    //     mongoose.connection.close();
    //   })
    //   .catch((err) => console.log(err));
  });
