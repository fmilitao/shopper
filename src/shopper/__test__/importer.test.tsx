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
      { name: 'Gelado magnum', comment: '1' },
      { name: 'Abrilhantador maquina loiça', comment: '1 Embalagem' },
      { name: 'Agua', comment: '2 Garrafões' },
      { name: 'Arroz', comment: '6 Kg' },
      { name: 'Atum', comment: '10 Lata' },
      { name: 'Azeite', comment: '3 Garrafa' },
      { name: 'Açucar amarelo', comment: '1' },
      { name: 'Bananas', comment: '1 Kg' },
      { name: 'Batata cozer', comment: '1 Embalagem' },
      { name: 'Batata Lays', comment: '3' },
    ]);
  });
});
