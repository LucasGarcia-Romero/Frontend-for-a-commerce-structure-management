"use client"     //Obligatorio en todos los archivos del cliente

import React, { useRef, useState } from 'react';
// Define un componente funcional llamado Login
function Login(){
    // Define referencias para los campos de entrada de usuario y contraseña
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const [isLoggedIn, setLoggedIn] = useState(false);
  
    // Maneja la solicitud de inicio de sesión al servidor
    const handleLogin = async (e) => {
      e.preventDefault();
  
      try {
        // Obtiene los valores actuales de los campos de entrada
        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
  
        // Realiza una solicitud POST al endpoint "/api/admin" con las credenciales en formato JSON
        const result = await fetch("/api/comercios", {
          method: "POST",
          body: JSON.stringify({ username, password }),
          headers: {
            "Content-type": "application/json"
          }
        });
  
        // Parsea la respuesta del servidor en formato JSON
        const data = await result.json();
  
        console.log(data);
        if (data.message === "OK") {
          // Si la respuesta del servidor es "OK", significa que las credenciales son válidas
          setLoggedIn(false);
          console.log("Inicio de sesión exitoso");
          // Redirige al usuario a la ruta '/altaDeComercios'
          window.location.href = '/comercios/opciones?usuario=' + username;
          //paso el usuario para las gestiones
        } else {
          // Si la respuesta del servidor no es "OK", significa que las credenciales son incorrectas
          setLoggedIn(true);
          console.log("Credenciales incorrectas. Inicio de sesión fallido");
        }
  
      } catch (error) {
        // Maneja cualquier error que ocurra durante la solicitud
        console.error("Error en la solicitud:", error);
      }
    };
  
    // Maneja el evento de cierre de sesión y actualiza el estado de inicio de sesión
    const handleLogout = () => {
      setLoggedIn(false);
    };
  
    // Renderiza el componente con condicionales basados en el estado de inicio de sesión
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white rounded-md shadow-md">
          {isLoggedIn ? (
            // Muestra contenido cuando el usuario está autenticado
            <div>
              <h1 className="text-2xl font-bold mb-4">Credenciales fallidas</h1>
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                onClick={handleLogout}
              >
                Volver a intentar
              </button>
            </div>
          ) : (
            // Muestra contenido cuando el usuario no está autenticado
            <div>
              <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Iniciar sesión</h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <label className="block">
                  Nombre:
                  <input
                    ref={usernameRef}
                    className="border border-gray-300 px-3 py-2 w-full rounded-md"
                    type="text"
                    name="username"
                  />
                </label>
                <label className="block">
                  Contraseña:
                  <input
                    ref={passwordRef}
                    className="border border-gray-300 px-3 py-2 w-full rounded-md"
                    type="password"
                    name="password"
                  />
                </label>
                <button
                  className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-900 w-full"
                  type="submit"
                >
                  Iniciar sesión
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  // Exporta el componente Login para su uso en otras partes de la aplicación
  export default Login;