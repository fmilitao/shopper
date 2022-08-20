import { importText, exportText } from '../importer';

describe('importer function', () => {
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

  test('processes sample input', () => {
    expect(importText(sampleInput)).toStrictEqual([
      { name: 'Gelado magnum', comment: '1', enabled: true },
      {
        name: 'Abrilhantador maquina loiça',
        comment: '1 Embalagem',
        enabled: true,
      },
      { name: 'Agua', comment: '2 Garrafões', enabled: true },
      { name: 'Arroz', comment: '6 Kg', enabled: true },
      { name: 'Atum', comment: '10 Lata', enabled: true },
      { name: 'Azeite', comment: '3 Garrafa', enabled: true },
      { name: 'Açucar amarelo', comment: '1', enabled: true },
      { name: 'Bananas', comment: '1 Kg', enabled: true },
      { name: 'Batata cozer', comment: '1 Embalagem', enabled: true },
      { name: 'Batata Lays', comment: '3', enabled: true },
    ]);
  });

  const sampleInputInconsistent = `
Maçã pink lady
Kiwis
1x framboesas
1X mirtilos
1x embalagem ananas
Banana 1 kg
[X] Ameixa
1x abacate
Cebolinho
Salsa
`;

  test('processes sample input with fallback', () => {
    expect(importText(sampleInputInconsistent)).toStrictEqual([
      { name: 'Maçã pink lady', comment: '', enabled: true },
      { name: 'Kiwis', comment: '', enabled: true },
      { name: 'framboesas', comment: '1', enabled: true },
      { name: 'mirtilos', comment: '1', enabled: true },
      { name: 'embalagem ananas', comment: '1', enabled: true },
      { name: 'Banana', comment: '1 kg', enabled: true },
      { name: 'Ameixa', comment: '', enabled: false },
      { name: 'abacate', comment: '1', enabled: true },
      { name: 'Cebolinho', comment: '', enabled: true },
      { name: 'Salsa', comment: '', enabled: true },
    ]);
  });

  const sampleInputKeep = `
[ ] Bananas
[X] Yogurts
[ ] 7x Tuna
`;

  test('processes sample input with keep format', () => {
    expect(importText(sampleInputKeep)).toStrictEqual([
      { name: 'Bananas', comment: '', enabled: true },
      { name: 'Yogurts', comment: '', enabled: false },
      { name: 'Tuna', comment: '7', enabled: true },
    ]);
  });

  test('export processed sample input', () => {
    expect(exportText(importText(sampleInputInconsistent))).toStrictEqual(
      `[ ] Maçã pink lady
[ ] Kiwis
[ ] framboesas 1
[ ] mirtilos 1
[ ] embalagem ananas 1
[ ] Banana 1 kg
[X] Ameixa
[ ] abacate 1
[ ] Cebolinho
[ ] Salsa`
    );
  });
});
