import { v4 as uuidv4 } from 'uuid';

let wizards = [
    { id: uuidv4(), name: 'Harry Potter', magicWand: 'Holly, 11", Phoenix Feather', house: 'Gryffindor' },
    { id: uuidv4(), name: 'Hermione Granger', magicWand: 'Vine, 10¾", Dragon Heartstring', house: 'Gryffindor' },
    { id: uuidv4(), name: 'Ron Weasley', magicWand: 'Willow, 14", Unicorn Hair', house: 'Gryffindor' },
    { id: uuidv4(), name: 'Draco Malfoy', magicWand: 'Hawthorn, 10", Unicorn Hair', house: 'Slytherin' },
    { id: uuidv4(), name: 'Luna Lovegood', magicWand: 'Unknown', house: 'Ravenclaw' },
    { id: uuidv4(), name: 'Neville Longbottom', magicWand: 'Cherry, 13", Unicorn Hair', house: 'Gryffindor' },
    { id: uuidv4(), name: 'Cedric Diggory', magicWand: 'Ash, 12¼", Unicorn Hair', house: 'Hufflepuff' },
    { id: uuidv4(), name: 'Sirius Black', magicWand: 'Unknown', house: 'Gryffindor' },
    { id: uuidv4(), name: 'Severus Snape', magicWand: 'Unknown', house: 'Slytherin' },
    { id: uuidv4(), name: 'Albus Dumbledore', magicWand: 'Elder, 15", Thestral Tail Hair', house: 'Gryffindor' }
];

export default wizards;