import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';

export async function POST(request) {
  console.log('Estoy en GET');
  try {
    const users = JSON.parse(readFileSync('ficheros/comercio.txt'));

    // Obtener los parámetros de la consulta
    const requestData = await request.json();
    const nombreComercio = requestData.nombreComercio;
    
    // Filtrar los resultados
    const resultados = users.filter((user) => {
        return user.nombre === nombreComercio;
    });

    // Devolver los resultados
    return NextResponse.json(resultados);
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
