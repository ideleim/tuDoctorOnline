const Paciente = require("../models/Paciente");
const { validationResult } = require("express-validator");

exports.crearPaciente = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  try {
    //crear un nuevo proyecto
    const paciente = new Paciente(req.body);

    paciente.creador = req.doctor.id;

    paciente.save();
    res.json(paciente);
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.obtenerPacientes = async (req, res) => {
  try {
    const pacientes = await Paciente.find({ creador: req.doctor.id }).sort({
      creado: -1,
    });
    res.json({ pacientes });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.actualizarPaciente = async (req, res) => {
  //revisar si hay errores
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.status(401).json({ errores: errores.array() });
  }

  const { nombre, email, sexo, identificacion, telefono } = req.body;

  const nuevoPaciente = {};

  if (nombre) {
    nuevoPaciente.nombre = nombre;
  }

  if (email) {
    nuevoPaciente.email = email;
  }

  if (sexo) {
    nuevoPaciente.sexo = sexo;
  }

  if (identificacion) {
    nuevoPaciente.identificacion = identificacion;
  }

  if (telefono) {
    nuevoPaciente.telefono = telefono;
  }

  try {
    let paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
      return res.status(400).json({ msg: "Paciente no encontrado" });
    }

    if (paciente.creador.toString() !== req.doctor.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    paciente = await Paciente.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevoPaciente },
      { new: true }
    );

    res.json({ paciente });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};

exports.eliminarPaciente = async (req, res) => {
  try {
    let paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
      return res.status(400).json({ msg: "Paciente no encontrado" });
    }

    if (paciente.creador.toString() !== req.doctor.id) {
      return res.status(400).json({ msg: "No autorizado" });
    }

    await Paciente.remove({ _id: req.params.id });
    res.json({ msg: "Paciente borrado" });
  } catch (error) {
    console.log("Hubo un error");
    console.log(error);
    res.status(400).send("Hubo un error");
  }
};
