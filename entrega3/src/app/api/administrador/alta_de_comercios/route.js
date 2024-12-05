import { NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';

export async function POST(request) {
  console.log('Estoy en POST');
  try {
    const commerces = JSON.parse(readFileSync('ficheros/comercio.txt'));

    const { nombre, ciudad, cif, direccion, email, telefono, password } = await request.json();

    if (commerces.find((commerce) => commerce.nombre === nombre)) {
      return NextResponse.json({ message: 'El comercio ya existe' }, { status: 400 });
    }

    const newCommerce = { id: commerces.length + 1, nombre, ciudad, cif, direccion, email, telefono, password };
    commerces.push(newCommerce);

    await writeFileSync('ficheros/comercio.txt', JSON.stringify(commerces, null, 2));

    return NextResponse.json({ message: 'OK' });
  } catch (error) {
    console.error('Error en el servidor:', error);
    return NextResponse.json({ message: 'Error en el servidor' }, { status: 500 });
  }
}