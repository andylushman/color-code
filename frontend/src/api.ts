import { Color } from './components/Colors';

const colorsEndpoint = 'http://localhost:8000/color';

export const getColors = async () => {
  const response = await fetch(`${colorsEndpoint}`);
  const { data: colors } = await response.json();
  return colors;
};

export const createColor = async (newColor: Color) => {
  await fetch(
    `${colorsEndpoint}`,

    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newColor)
    }
  );
};

export const updateColor = async (color: Color) => {
  await fetch(`${colorsEndpoint}/${color.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: color.name, hex: color.hex })
  });
};

export const deleteColor = async (id: string) => {
  await fetch(`${colorsEndpoint}/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: { id } as any
  });
};
