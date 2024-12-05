"use client"

import React, { useRef, useState } from 'react';

const Baja = () => {
  //variables actualizar
  const ciudadRef = useRef();
  const cifRef = useRef();
  const direccionRef = useRef();
  const emailRef = useRef();
  const telefonoRef = useRef();
  const actividadRef = useRef();
  const resumenoRef = useRef();

  //variables buscar intereses
  const InteresBusquedaRef = useRef();
  const [intereses, setIntereses] = useState([]);

  //varaibles consulta
  const [mensajeEnviado, setMensajeEnviado] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [showNoResultMesage, setShowNoResultMesage] = useState(false);

  const showComercio = async (event) => {
    event.preventDefault();

    //tengo que llamar al get con el id del comercio
    const queryParams = new URLSearchParams(window.location.search);
    const username = queryParams.get("usuario");

    window.location.href = '/comercios/opciones/show?usuario=' + username;
  };
  
  const deleteComerce = async (event) => {
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const nombreComercioEliminar = queryParams.get("usuario");

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
        //no funciona tiene q sacarte
        window.location.href = "/comercios"
      }
      else {
        console.log('Error al enviar los datos al servidor');
        setMensajeEnviado(false);        
      }  
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  const handleConsultarIntereses = async(event) => {
    alert('Consultando intereses...');
    event.preventDefault();

    try {
      const interesesCons = InteresBusquedaRef.current.value;
      alert("int: " + interesesCons);
      const responseConsulta = await fetch('/api/comercios/consultar_intereses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ interesesCons }),
      })
        .then(responseConsulta => responseConsulta.json())
        .then(data => {
          setSearchResult(data);
          setShowNoResultMesage(data.length == 0);
        })
        .catch(error => console.error("Error en el fetch"));

      if (responseConsulta.ok) {
        console.log('Datos enviados correctamente al servidor.');
        setMensajeEnviado(true);
      }
      else {
        console.log('Error al enviar los datos al servidor');
        setMensajeEnviado(false);        
      } 

    } catch (error) {
    console.error('Error en la solicitud:', error);
  }    
  };
  
  const handleActualizarDatos = async (e) => {
    alert('Actualizando los datos...');
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams(window.location.search);
      const nombreUsuarioActualizar = queryParams.get("usuario");

      const ciudad = ciudadRef.current.value;
      const cif = cifRef.current.value;
      const direccion = direccionRef.current.value;
      const email = emailRef.current.value;
      const telefono = telefonoRef.current.value;
      const actividad = actividadRef.current.value;
      const resumen = resumenoRef.current.value;

      const responseUpdate = await fetch('/api/comercios/modificacion_comercio', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombreUsuarioActualizar, ciudad, cif, direccion, email, telefono, actividad, resumen }),
      });
      if (responseUpdate.ok) {
        console.log('Datos enviados correctamente al servidor.');
        setMensajeEnviado(true);
        //no funciona tiene q sacarte
        window.location.href = "/comercios"
      }
      else {
        console.log('Error al enviar los datos al servidor');
        setMensajeEnviado(false);        
      } 

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
  };
  return (
    <div className='flex'>
    <div className="mx-auto max-w-md p-8 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Actualizar comercio</h1>
      <form onSubmit={handleActualizarDatos} className="space-y-4">
        {[
          { label: 'Ciudad', ref: ciudadRef },
          { label: 'Cif', ref: cifRef },
          { label: 'Direccion', ref: direccionRef },
          { label: 'Email', ref: emailRef },
          { label: 'Telefono', ref: telefonoRef },
          { label: 'Actividad', ref: actividadRef },
          { label: 'Resumen', ref: resumenoRef },
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
          Actualizar comercio
        </button>
      </form>

      {mensajeEnviado && (
        <p className="text-green-600 text-center mt-2">Mensaje enviado correctamente</p>
      )}
    </div>
    <div className="mx-auto max-w-md p-8 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Busqueda por intereses</h1>
      <form onSubmit={handleConsultarIntereses} className="space-y-4">
        {[
          { label: 'Intereses', ref: InteresBusquedaRef },
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
          Buscar usuarios
        </button>
      </form>
      {searchResult.length > 0 && (
      <div className="w-full max-w-2xl">
        <h2 className="text-lg font-bold mb-2">Resultados de la búsqueda:</h2>
        <ul>
          {searchResult.map(usuario => (
            <li key={usuario.id} className="mb-4 p-4 border border-gray-300 rounded-md">
              <p>email: {usuario.email}</p>
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
        <button
          className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full btn"
          type="submit"
        >
          delete
        </button>
      </form>
    </div>
    <div className="mx-auto max-w-md p-8 bg-white border rounded shadow">
      <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Comercio</h1>
      <form onSubmit={showComercio} className="space-y-4">
        <button
          className="bg-green-800 text-white py-2 px-4 rounded-md hover:bg-green-700 w-full btn"
          type="submit"
        >
          ver comercio
        </button>
      </form>
    </div>
    </div>
  );
};

export default Baja;
