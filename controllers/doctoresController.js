const Doctor= require("../models/Doctor");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.crearDoctor = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    //Revisar que el usuario registrado sea único
    let doctor = await Doctor.findOne({ email });

    if (doctor) {
      return res.status(400).json({ msg: "El doctor ya existe" });
    }

    //crear el nuevo usuario
    doctor = new Doctor(req.body);

    doctor.password = await bcryptjs.hash(password, 10);

    //Guardar usuario en la bd
    await doctor.save();

    //Firmar el JWT
    const payload = {
      doctor: { id: doctor.id },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 3600, //1 hora
      },
      (error, token) => {
        if (error) throw error;

        //Mensaje de confirmación
        res.json({ token });
      }
    );
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
