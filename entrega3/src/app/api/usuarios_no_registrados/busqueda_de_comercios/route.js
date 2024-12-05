import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function POST(request) {
  console.log('Estoy en POST');
  try {
    const users = JSON.parse(readFileSync('ficheros/usuario.txt'));

    // Obtener los parámetros de la consulta
    const requestData = await request.json();
    const filterId = requestData.id;
    const filterAct = requestData.act;
    const filterCiudad = requestData.ciudad;
    

    // Filtrar los resultados
    const resultados = users.filter((user) => {
        //si existe el id filtro por el
      if(filterId!=""){
        return user.id === filterId;
      }
      else if(filterCiudad!="" && filterAct!=""){
        return user.ciudad === filterCiudad && user.actividad === filterAct;
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
