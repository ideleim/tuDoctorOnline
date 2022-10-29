const mongoose = require("mongoose");

const DoctoresSchema = mongoose.Schema(
    {
        nombre: { 
            type: String, 
            required: true, 
            trim: true 
        },
        email: { 
            type: String, 
            required: true, 
            trim: true, unique: true 
        },
        identificacion: {
            type: Number
        },
        especialidad:{
            type: String
        },
        telefono: {
            type: Number
        },
        password: { 
            type: String, 
            required: true, 
            trim: true 
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

module.exports = mongoose.model("Doctor", DoctoresSchema);