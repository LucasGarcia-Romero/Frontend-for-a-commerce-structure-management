import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function POST(request) {
  console.log('Estoy en GET');
  try {
    const users = JSON.parse(readFileSync('ficheros/comercio.txt'));

    // Obtener los parámetros de la consulta
    const requestData = await request.json();
    const filterNombre = requestData.nombre;
    const filterCiudad = requestData.ciudad;

    // Filtrar los resultados
    const resultados = users.filter((user) => {
      if(filterNombre!="" && filterCiudad!=""){
        return user.nombre === filterNombre && user.ciudad === filterCiudad;
      }
      else if(filterNombre!=""){
        return user.nombre === filterNombre;
      }
      else if(filterCiudad!=""){
        return user.ciudad === filterCiudad;
      }
    });

    // Devolver los resultados
    return NextResponse.json(resultados);
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
