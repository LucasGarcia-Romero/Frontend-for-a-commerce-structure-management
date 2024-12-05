import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function POST(request) {
  console.log('Estoy en GET');
  try {
    const users = JSON.parse(readFileSync('ficheros/usuario.txt'));

    // Obtener los parámetros de la consulta
    const requestData = await request.json();
    const filterIntereses = requestData.interesesCons;

    // Filtrar los resultados
    const resultados = users.filter((user) => {
      //si existe el id filtro por el
      if(user.intereses.includes(filterIntereses)){
        return user.email;
      }
    });

    // Devolver los resultados
    return NextResponse.json(resultados);
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
