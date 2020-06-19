import { importText } from '../importer';

const sampleInput = `
Gelado magnum 1
Abrilhantador maquina loiça 1 Embalagem
Agua 2 Garrafões

111//wrong match

Arroz 6 Kg
Atum 10 Lata
Azeite 3 Garrafa
Açucar amarelo 1
Bananas 1 Kg
Batata cozer 1 Embalagem
Batata Lays 3
`;

describe('importer function', () => {
  test('processes sample input', () => {
    expect(importText(sampleInput)).toStrictEqual([
      { name: 'Gelado magnum', quantity: '1' },
      { name: 'Abrilhantador maquina loiça', quantity: '1 Embalagem' },
      { name: 'Agua', quantity: '2 Garrafões' },
      { name: 'Arroz', quantity: '6 Kg' },
      { name: 'Atum', quantity: '10 Lata' },
      { name: 'Azeite', quantity: '3 Garrafa' },
      { name: 'Açucar amarelo', quantity: '1' },
      { name: 'Bananas', quantity: '1 Kg' },
      { name: 'Batata cozer', quantity: '1 Embalagem' },
      { name: 'Batata Lays', quantity: '3' },
    ]);
  });
});
