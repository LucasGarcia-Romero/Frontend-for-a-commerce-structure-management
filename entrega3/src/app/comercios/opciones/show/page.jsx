"use client"

import React, { useEffect, useState } from 'react';

const Show = () => {
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Get the comercio from the URL
    const queryParams = new URLSearchParams(window.location.search);
    const nombreComercio = queryParams.get("usuario");

    if (nombreComercio) {
      // Call the showComerce function
      showComerce(nombreComercio);
    }
  }, []);
  //tomo el comercio
  const showComerce = async (event) => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const nombreComercio = queryParams.get("usuario");

      const response = await fetch('/api/comercios/show', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreComercio }),
      })
        .then(response => response.json())
        .then(data => {
          setSearchResult(data);
        })
        .catch(error => console.error("Error en el fetch"));
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
    }
  };
  return (
    <div className='flex'>
    <div className="mx-auto max-w-md p-8 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Comercio</h1>
      {searchResult.length > 0 && (
      <div className="w-full max-w-2xl">
      <ul>  
        {searchResult.map(comercio => (
          <li key={comercio.id} className="mb-4 p-4 border border-gray-300 rounded-md">
            <p>ID: {comercio.id}</p>
            <p>Nombre: {comercio.nombre}</p>
            <p>CIF: {comercio.cif}</p>
            <p>Dirección: {comercio.direccion}</p>
            <p>Email: {comercio.email}</p>
            <p>Teléfono: {comercio.telefono}</p>
            <p>Ciudad: {comercio.ciudad}</p>
            <p>Actividad: {comercio.actividad}</p>
            <p>Resumen: {comercio.resumen}</p>
            {comercio.textos.map((texto, i) => (
            <p key={i}>{texto}</p>
            ))}
            {comercio.fotos.map((foto, i) => (
            <img key={i} src={"/imagenes/imagen"+(i+1)+".jpg"} alt="Imagen del comercio" width="100%"/>
            ))}
            <p>Scoring: {comercio.scoring}</p>
            <p>Número de puntuaciones: {comercio.numero_puntaciones}</p>
            {comercio.resenias.map((resenia, i) => (
            <p key={i}>{resenia}</p>
            ))}
          </li>
        ))}
      </ul>
      </div>
    )}
    </div>
    </div>
  );
};

export default Show;
