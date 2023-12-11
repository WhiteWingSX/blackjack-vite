export const valorCarta = (carta, playersPointsCount) => {

    const valor = carta.substring(0, carta.length - 1);
    const sumaActual = playersPointsCount.reduce((total, puntos) => total + puntos, 0);
    const cantidadAses = playersPointsCount.filter(puntos => puntos === 11).length;

    if (valor === 'A') {
        if (sumaActual + 11 > 21) {
            return 1;
        } else {
            if (cantidadAses > 1 && sumaActual + 11 * (cantidadAses - 1) > 21) {
                return cantidadAses - 1 + 11;
            }
            return 11;
        }
    } else {
        return isNaN(valor) ? 10 : valor * 1;
    }
}