"use client"     //Obligatorio en todos los archivos del cliente

import React, { useRef } from 'react';

const UsuarioRegistrado = ({ onActualizacionExitosa, onDarseDeBaja }) => {
  //variables actualizar
  const ciudadRef = useRef();
  const interesesRef = useRef();
  const recibirOfertasRef = useRef();

  //variables addReseña
  const comercioReseniaRef = useRef();
  const textoReseniaRef = useRef();

  const handleActualizarDatos = async (e) => {
    alert('Actualizando los datos...');
    e.preventDefault();

    try {
      const queryParams = new URLSearchParams(window.location.search);
      const nombreUsuarioActualizar = queryParams.get("usuario");

      const ciudad = ciudadRef.current.value;
      const intereses = interesesRef.current.value.split(',').map((interes) => interes.trim());
      const recibirOfertas = recibirOfertasRef.current.checked;

      const responseUpdate = await fetch('/api/usuarios_registrados/actualizar_usuario', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({nombreUsuarioActualizar, ciudad, intereses, recibirOfertas }),
      });
      if (responseUpdate.ok) {
        console.log('Datos enviados correctamente al servidor.');
        setMensajeEnviado(true);
        //no funciona tiene q sacarte
        window.location.href = "usuarios_registrados"
      }
      else {
        console.log('Error al enviar los datos al servidor');
        setMensajeEnviado(false);        
      } 

  } catch (error) {
    console.error('Error en la solicitud:', error);
  }
  };

  const handleDarseDeBaja = async() => {
    // Aquí puedes implementar la lógica para dar de baja al usuario (borrarlo del almacenamiento local del servidor)
    alert('Dándote de baja...');
    try {
      const queryParams = new URLSearchParams(window.location.search);
      const nombreUsuarioEliminar = queryParams.get("usuario");
      const responseDel = await fetch('/api/usuarios_registrados/eliminar_usuario', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombreUsuarioEliminar }),
      });

      if (responseDel.ok) {
        console.log('Datos enviados correctamente al servidor.');
        setMensajeEnviado(true);
        //no funciona tiene q sacarte
        window.location.href = "usuarios_registrados"
      }
      else {
        console.log('Error al enviar los datos al servidor');
        setMensajeEnviado(false);        
      }  
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }        
  };

  const handleEscribirResena = async() => {
    alert('Escribiendo reseña...');
    try {
      const comercioResenia = comercioReseniaRef.current.value;
      const textoResenia = textoReseniaRef.current.value;

      const responseResenia = await fetch('/api/usuarios_registrados/aniadir_resenia', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({comercioResenia, textoResenia }),
      });
      if (responseResenia.ok) {
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

  return (
    <div className="flex">
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md mr-4 ml-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Actualizar Datos</h1>
        <form onSubmit={handleActualizarDatos} className="space-y-4">
          <label className="block">
            Ciudad:
            <input ref={ciudadRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text" name="ciudad" />
          </label>
          <label className="block">
            Intereses (separados por coma):
            <input ref={interesesRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text" name="intereses" />
          </label>
          <label className="block">
            Recibir Ofertas:
            <input ref={recibirOfertasRef} type="checkbox" name="recibirOfertas" />
          </label>
          <button
            className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 w-full"
            type="submit"
          >
            Actualizar Datos
          </button>
        </form>
      </div>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Acciones Adicionales</h1>
        <label className="block">
             Comercio:
            <input ref={comercioReseniaRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text"/>
          </label>
          <label className="block">
             Reseña:
            <input ref={textoReseniaRef} className="border border-gray-300 px-3 py-2 w-full rounded-md" type="text"/>
          </label>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 w-full mb-4 mt-4"
          onClick={handleEscribirResena}
        >
          Escribir Reseña
        </button>
      </div>
      <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md ml-4">
        <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Acciones Adicionales</h1>
          <button
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 w-full mt-4"
          onClick={handleDarseDeBaja}
        >
          Darse de Baja
        </button>
      </div>
    </div>
  );
};

export default UsuarioRegistrado;
