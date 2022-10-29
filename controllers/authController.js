const Doctor = require("../models/Doctor");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.autenticarDoctor = async (req, res) => {
  //Revisar si hay errores

  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(400).json({ errores: errores.array() });
  }

  const { email, password } = req.body;

  try {
    //revisar que sea un usuario registrado
    let doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ msg: "El doctor no existe" });
    }

    //revisar la password
    const passCorrecto = await bcryptjs.compare(password, doctor.password);
    if (!passCorrecto) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    //Si todo es correcto, crear y firmar el token

    const payload = {
      doctor: { id: doctor.id },
    };

    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 43200, //12 horas
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

exports.doctorAutenticado = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor.id);
    res.json({ doctor });
  } catch (error) {
    res.status(500).json({ msg: "Hubo un error" });
  }
};
