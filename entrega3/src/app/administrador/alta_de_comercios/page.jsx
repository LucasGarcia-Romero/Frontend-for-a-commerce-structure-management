//por alguna razon no almacena el nombre y la ciudad bien
"use client"
import React, { useRef, useState } from 'react';

function AltaDeComercio() {
  const NombreComercioRef = useRef();
  const NombreCiudadRef = useRef();
  const CIFRef = useRef();
  const DireccionRef = useRef();
  const EmailRef = useRef();
  const TelefonoRef = useRef();
  const PasswordRef = useRef();

  const nombreComercioEliminarRef = useRef();

  const NombreComercioBusquedaRef = useRef();
  const NombreCiudadBusquedaRef = useRef();

  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showNoResultMesage, setShowNoResultMesage] = useState(false);

  const deleteComerce = async (event) => {
    event.preventDefault();
    const nombreComercioEliminar = nombreComercioEliminarRef.current.value;
    try {
      const responseDel = await fetch('/api/administrador/eliminar_comercio', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreComercioEliminar }),
      });
      if (responseDel.ok) {
        console.log('Datos enviados correctamente al servidor.');
        setMensajeEnviado(true);
      } else {
        console.error('Error al enviar datos al servidor.');
      }
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    const nombre = NombreComercioRef.current.value;
    const ciudad = NombreCiudadRef.current.value;
    const cif = CIFRef.current.value;
    const direccion = DireccionRef.current.value;
    const email = EmailRef.current.value;
    const telefono = TelefonoRef.current.value;
    const password = PasswordRef.current.value;

    try {
      const response = await fetch('/api/administrador/alta_de_comercios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, ciudad, cif, direccion, email, telefono, password }),
      });

      if (response.ok) {
        console.log('Datos enviados correctamente al servidor.');
        setMensajeEnviado(true);
      } else {
        console.error('Error al enviar datos al servidor.');
      }
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
    }
  };

  const busquedaComercio = async (event) => {
    event.preventDefault();
    const nombre = NombreComercioBusquedaRef.current.value;
    const ciudad = NombreCiudadBusquedaRef.current.value;
    try {
      const response = await fetch('/api/administrador/busqueda_de_comercios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, ciudad }),
      })
        .then(response => response.json())
        .then(data => {
          setSearchResult(data);
          setShowNoResultMesage(data.length == 0);
        })
        .catch(error => console.error("Error en el fetch"));
    } catch (error) {
      console.error('Error en la conexión con el servidor:', error);
    }
  };

  return (
    <div className='flex'>
    <div className="mx-auto max-w-md p-8 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Alta de Comercio</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        {[
          { label: 'Nombre', ref: NombreComercioRef },
          { label: 'Ciudad', ref: NombreCiudadRef },
          { label: 'CIF', ref: CIFRef },
          { label: 'Dirección', ref: DireccionRef },
          { label: 'Email', ref: EmailRef },
          { label: 'Teléfono', ref: TelefonoRef },
          { label: 'Contraseña', ref: PasswordRef },
        ].map((field, index) => (
          <label key={index} className="block">
            {field.label}:
            <input
              ref={field.ref}
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
              type="text"
              name={field.label.toLowerCase().replace(' ', '-')}
            />
          </label>
        ))}
        <button
          className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full btn"
          type="submit"
        >
          Enviar datos
        </button>
      </form>

      {mensajeEnviado && (
        <p className="text-green-600 text-center mt-2">Mensaje enviado correctamente</p>
      )}
    </div>
    <div className="mx-auto max-w-md p-8 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Busqueda de comercios</h1>
      <form onSubmit={busquedaComercio} className="space-y-4">
        {[
          { label: 'Nombre del Comercio', ref: NombreComercioBusquedaRef },
          { label: 'Ciudad', ref: NombreCiudadBusquedaRef },
        ].map((field, index) => (
          <label key={index} className="block">
            {field.label}:
            <input
              ref={field.ref}
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
              type="text"
              name={field.label.toLowerCase().replace(' ', '-')}
            />
          </label>
        ))}
        <button
          className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full btn"
          type="submit"
        >
          Ir a búsqueda de comercios
        </button>
      </form>
      {searchResult.length > 0 && (
      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-bold mb-2">Resultados de la búsqueda:</h2>
        <ul>
          {searchResult.map(comercio => (
            <li key={comercio.id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <p>ID: {comercio.id}</p>
              <p>Nombre: {comercio.nombre}</p>
              <p>CIF: {comercio.cif}</p>
              <p>Dirección: {comercio.direccion}</p>
              <p>Email: {comercio.email}</p>
              <p>Teléfono: {comercio.telefono}</p>
            </li>
          ))}
        </ul>
      </div>
    )}

    {showNoResultMesage && (
    <p className="text-red-500">No se encontraron resultados.</p>
    )}
    </div>
    <div className="mx-auto max-w-md p-8 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Eliminar comercio</h1>
      <form onSubmit={deleteComerce} className="space-y-4">
        {[
          { label: 'Nombre del Comercio', ref: nombreComercioEliminarRef },
        ].map((field, index) => (
          <label key={index} className="block">
            {field.label}:
            <input
              ref={field.ref}
              className="border border-gray-300 px-3 py-2 w-full rounded-md"
              type="text"
              name={field.label.toLowerCase().replace(' ', '-')}
            />
          </label>
        ))}
        <button
          className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full btn"
          type="submit"
        >
          delete
        </button>
      </form>
    </div>
    </div>
  );
}

export default AltaDeComercio;