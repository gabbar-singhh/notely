const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs');
const notes = require('./notes.js');
const { argv } = require('process');

// Customize yargs version
yargs.version('1.2.1')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe: "Note Title",
            //weather argument after add should be provided or not
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.addNotes(argv.title , argv.body)
    }
})

//Creating Remove commad
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNotes(argv.title);
    }
})

//Creating List command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler(){
        notes.listNotes();
    }
})

// Creating a read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Title for Viewing the Note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
       notes.readNotes(argv.title);
    }
})

//Creating Clear Command
yargs.command({
    command: 'clear',
    describe: 'Clears All Notes',
    handler(){
        notes.clearNotes();
    }

})

yargs.parse();