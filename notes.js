const fs = require("fs");
const chalk = require('chalk');
const { bold } = require("chalk");

const error = chalk.whiteBright.bgRed;
const success = chalk.bgGreen.white.bold;

const addNotes = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find(note => note.title === title);

    if (!duplicateNote) {
        notes.push({ title: title, body: body });
        saveNotes(notes);
        console.log(success(" New note added! "));
    } else {
        console.log(error(` Existing note found with same title `));
    }
};

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync("notes.json").toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

const saveNotes = notes => {
    fs.writeFileSync("notes.json", JSON.stringify(notes))
}

const removeNotes = title => {
    const notes = loadNotes();
    const notesToKeep = notes.filter(note => note.title !== title);

    if (notesToKeep.length == notes.length - 1) {
        saveNotes(notesToKeep);
        console.log(success(' Note removed! '));
    } else {
        console.log(error(' No note found! '));
    }
}

function listNotes() {

    const notes = loadNotes();

    if(notes.length === 0){
        console.log(error(' Empty '));
    } else {
    console.log(" ");
    console.log(chalk.bold.bgBlueBright.white(' Your Notes '));
    console.log(" ");

    notes.forEach(element => {
        console.table(element);
    });
    console.log(" ");
}
}

const readNotes = title => {
    const notes = loadNotes();

    const noteToBeShown = notes.find(note => note.title == title);

    // console.log(noteToBeShown);

    if (noteToBeShown) {
        console.log(" ");
        console.log(chalk.inverse(` ${noteToBeShown.title} `));
        console.log(noteToBeShown.body);
        console.log(" ");
    } else {
        console.log(error(' No Note Found :-) '));
    }


}

const clearNotes = () => {
    const notes = loadNotes();
    notes.splice(0, notes.length);
    saveNotes(notes);

    console.log(success(' All Note Cleared! '));
}

module.exports = { addNotes: addNotes, removeNotes: removeNotes, listNotes: listNotes, readNotes: readNotes, clearNotes: clearNotes };
