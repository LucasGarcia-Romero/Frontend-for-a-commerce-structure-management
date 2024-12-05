import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function DELETE(request) {
  console.log('Estoy en DELETE');
  try {
    const commerces = JSON.parse(readFileSync('ficheros/comercio.txt'));

    const { nombreComercioEliminar } = await request.json();
    const comercioABorrar = commerces.find((commerce) => commerce.nombre === nombreComercioEliminar);

    if (!comercioABorrar) {

      return NextResponse.json({ message: 'El comercio no existe' }, { status: 404 });
      
    }
    commerces.splice(commerces.indexOf(comercioABorrar), 1);

    await writeFileSync('ficheros/comercio.txt', JSON.stringify(commerces, null, 2));

    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}
