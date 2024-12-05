"use client"     //Obligatorio en todos los archivos del cliente

// RegistroUsuarioAnonimo.jsx
import React, { useRef, useState } from 'react';

const RegistroUsuarioAnonimo = () => {
  const nombreRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const edadRef = useRef();
  const ciudadRef = useRef();
  const interesesRef = useRef();
  const permiteRecibirOfertasRef = useRef();

  //variables de las consultas
  const CiudadConsRef = useRef();
  const ActConsRef = useRef();
  const IdConsRef = useRef();

  //variables mostrar datos
  const [searchResult, setSearchResult] = useState([]);
  const [showNoResultMesage, setShowNoResultMesage] = useState(false);

  const handleConsulta = async(event)=> {
    event.preventDefault();

    //tomo los valores de las variables
    const ciudad=CiudadConsRef.current.value;
    const act=ActConsRef.current.value;
    const id=IdConsRef.current.value;


    try {
      const response = await fetch('/api/usuarios_no_registrados/busqueda_de_comercios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, act, ciudad }),
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
  }


  const handleRegistroUsuario = async (event) => {
    event.preventDefault();
    const nombre = nombreRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const edad = parseInt(edadRef.current.value, 10);
    const ciudad = ciudadRef.current.value;
    const intereses = interesesRef.current.value.split(',').map((interes) => interes.trim());
    const permiteRecibirOfertas = permiteRecibirOfertasRef.current.checked;

    try {

      const response = await fetch('/api/usuarios_no_registrados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre, email, password, edad, ciudad, intereses, permiteRecibirOfertas }),
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

  return (
    <div className="flex">
    <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md mr-4 ml-4">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Registro de Usuario Anónimo</h1>
      <form onSubmit={handleRegistroUsuario} className="space-y-4">
        <label className="block">
          Nombre:
          <input ref={nombreRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text" name="nombre" />
        </label>
        <label className="block">
          E-mail:
          <input ref={emailRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text" name="email" />
        </label>
        <label className="block">
          Password:
          <input ref={passwordRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="password" name="password" />
        </label>
        <label className="block">
          Edad:
          <input ref={edadRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="number" name="edad" />
        </label>
        <label className="block">
          Ciudad:
          <input ref={ciudadRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text" name="ciudad" />
        </label>
        <label className="block">
          Intereses (separados por coma):
          <input ref={interesesRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text" name="intereses" />
        </label>
        <label className="block">
          Permite Recibir Ofertas:
          <input ref={permiteRecibirOfertasRef} type="checkbox" name="permiteRecibirOfertas" />
        </label>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 w-full"
          type="submit"
        >
          Registrarse
        </button>
      </form>

    </div>
    <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Realizar Consultas</h1>
        <form onSubmit={handleConsulta} className="space-y-4">
        <label className="block">
          Cuidad:
          <input ref={CiudadConsRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text"/>
        </label>
        <label className="block">
          Actividad:
          <input ref={ActConsRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text"/>
        </label>
        <label className="block">
          Id:
          <input ref={IdConsRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text" />
        </label>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 w-full"
          type="submit"
        >
          Realizar consulta
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
    </div>
  );
};

export default RegistroUsuarioAnonimo;
