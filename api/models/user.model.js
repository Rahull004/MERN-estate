import mongoose from "mongoose";

const userSchemma = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://th.bing.com/th/id/R.666b224c6e80a0019124b5805bb0c18f?rik=C4naOsUzVEOiVA&riu=http%3a%2f%2fwww.blockfort.com%2ffiles%2f3914%2f3513%2f6648%2fShyGuy.jpg&ehk=%2b3bp2bo8%2fEtmOw4W5iuhP6NXoBZRqIiJGaii4ULMl%2fc%3d&risl=&pid=ImgRaw&r=0"
    }
}, { timestamps: true })

const User = mongoose.model('User',userSchemma);

export default User;