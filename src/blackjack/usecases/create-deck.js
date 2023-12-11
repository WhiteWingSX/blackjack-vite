import _ from 'underscore';


export const crearDeck = (tiposCarta, tiposEspeciales) => {

    let deck = [];

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposCarta) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tiposCarta) {
        for (let esp of tiposEspeciales) {
            deck.push(esp + tipo);
        }
    }
    return _.shuffle(deck);

}
