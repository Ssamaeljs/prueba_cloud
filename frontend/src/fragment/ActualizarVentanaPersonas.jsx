import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';


function ActualizarVentanaPersonas() {
  const navegation = useNavigate();
  useEffect(() => {
    navegation("/");
  }, []);
}
export default ActualizarVentanaPersonas;