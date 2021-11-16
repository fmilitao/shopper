import { importText } from '../importer';

const sampleInput = `
Gelado magnum 1
Abrilhantador maquina loiça 1 Embalagem
Agua 2 Garrafões

Arroz 6 Kg
Atum 10 Lata
Azeite 3 Garrafa
Açucar amarelo 1
Bananas 1 Kg
Batata cozer 1 Embalagem
Batata Lays 3
`;

const sampleInputInconsistent = `
Maçã pink lady
Kiwis
1x framboesas
1x mirtilos
1x embalagem ananas
Banana
Ameixa
1x abacate
Cebolinho
Salsa
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

  test('processes sample input with fallback', () => {
    expect(importText(sampleInputInconsistent)).toStrictEqual([
      { name: 'Maçã pink lady', comment: '' },
      { name: 'Kiwis', comment: '' },
      { name: '1x framboesas', comment: '' },
      { name: '1x mirtilos', comment: '' },
      { name: '1x embalagem ananas', comment: '' },
      { name: 'Banana', comment: '' },
      { name: 'Ameixa', comment: '' },
      { name: '1x abacate', comment: '' },
      { name: 'Cebolinho', comment: '' },
      { name: 'Salsa', comment: '' },
    ]);
  });
});
