(() => {
    'use strict'


    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A','J', 'Q', 'K'];

    let playersPoints = [];

    //Referencias al HTML
    const btnDraw = document.querySelector('#btnDraw'),
          btnStay = document.querySelector('#btnStay'),
          btnNew = document.querySelector('#btnNew'),
          btnStart = document.querySelector('#btnStart'),
          btnHow = document.querySelector('#btnHow'),
          btnClose = document.querySelector('#btnClose'),
          btnOver = document.querySelector('#btnOver'),
          btnBack = document.querySelector('#btnBack'),
          btnBack2 = document.querySelector('#btnBack2');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          smalls = document.querySelectorAll('small'),
          textHTML = document.querySelectorAll('.msg');

    const gameContainer = document.getElementById('gameContainer'),
          howToContainer = document.getElementById('howToContainer'),
          finContainer = document.getElementById('finContainer'),
          displayContainer = document.getElementById('displayContainer'),
          btnMenuContainer = document.getElementById('btnMenuContainer'),
          changeNameButton = document.getElementById('changeName'),
          newNameInput = document.getElementById('newName'),
          playerName = document.getElementById('playerName');

    let soundButton = document.getElementById('soundButton'),
        soundCard = document.getElementById('soundCard'),
        winner = document.getElementById('winner'),
        looser = document.getElementById('looser'),
        tie = document.getElementById('tie');

        btnStart.addEventListener('click', () => {
        soundButton.play();
        finContainer.style.display = 'none';
        displayContainer.style.display = 'flex';
        gameContainer.style.display = 'block';
        btnMenuContainer.style.display = 'none';
        btnStay.disabled = true;
        inicializarJuego();
    })

    btnHow.addEventListener('click', () => {
        soundButton.play();
        howToContainer.style.display = 'block'
        btnMenuContainer.style.display = 'none';
    })

    btnClose.addEventListener('click', () => {
        soundButton.play();
        howToContainer.style.display = 'none';
        btnMenuContainer.style.display = 'grid';
    })

    changeNameButton.addEventListener('click', () => {
        soundButton.play();
        const  newPlayerName = newNameInput.value;
        playerName.textContent = newPlayerName;
    });

        const inicializarJuego = (numJugadores = 2) => {

            smalls.forEach(elem => elem.innerText = 0);
            divCartasJugadores.forEach(elem => elem.innerText = '');
            btnDraw.disabled = false;
            btnStay.disabled = true;
            playersPoints = []
            deck = []
            deck = crearDeck();

            for (let i = 0; i < numJugadores; i++) {
                playersPoints.push(0);
                console.log(playersPoints)
            }

        }
        const crearDeck = () => {
            deck = [];
            for (let i = 2; i <= 10; i++) {
                for (let tipo of tipos) {
                    deck.push(i + tipo);
                }
            }

            for (let tipo of tipos) {
                for (let esp of especiales) {
                    deck.push(esp + tipo);
                }
            }
            return _.shuffle(deck);

        }

        //Tomar carta

        const pedirCarta = () => {

            if (deck.length === 0) {
                throw 'No hay cartas en el deck';
            }
            return deck.pop();
        }

        const valorCarta = (carta) => {

            const valor = carta.substring(0, carta.length - 1);
            const sumaActual = playersPoints.reduce((total, puntos) => total + puntos, 0);
            const cantidadAses = playersPoints.filter(puntos => puntos === 11).length;

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

        const acomularPuntos = (carta, turno) => {

            const valor = valorCarta(carta);
            let sumaActual = playersPoints[turno] + valor;

            if (sumaActual > 21 && playersPoints[turno] === 11) {
                playersPoints[turno] = 1;
                sumaActual -= 10;
            }

            playersPoints[turno] = sumaActual;
            smalls[turno].innerText = sumaActual;
            return sumaActual;
        }

        const crearCarta = (carta, turno) => {
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
            imgCarta.classList.add('cartas');

            // Verificar si divCartasJugadores[turno] está definido antes de intentar append
            if (divCartasJugadores[turno]) {
                divCartasJugadores[turno].append(imgCarta);
            } else {
                console.error(`El contenedor para el turno ${turno} no está definido.`);
            }
        }

        const turnoDealer = (puntosMinimo) => {

            let dealerPoint = 0;
            do {
                const carta = pedirCarta();
                dealerPoint = acomularPuntos(carta, 0);
                crearCarta(carta, 0);

            } while ((dealerPoint < puntosMinimo) && (puntosMinimo <= 21))

            setTimeout(() => {
                result(dealerPoint, puntosMinimo)
            }, 10);

        }

        //Eventos

        btnDraw.addEventListener('click', () => {

            soundCard.play();
            btnStay.disabled = false;
            const carta = pedirCarta();
            const playerPoint = acomularPuntos(carta, playersPoints.length - 1);

            crearCarta(carta, playersPoints.length - 1);


            if (playerPoint > 21) {
                console.warn('Bad Luck, You lost');
                btnDraw.disabled = true;
                btnStay.disabled = true;
                turnoDealer(playerPoint);
            } else if (playerPoint === 21) {
                console.warn('21, Awesome you win');
                btnDraw.disabled = true;
                btnStay.disabled = true;
                turnoDealer(playerPoint);
            }
        })

        btnStay.addEventListener('click', () => {

            soundButton.play();
            btnStay.disabled = true;
            btnDraw.disabled = true;
            turnoDealer(playersPoints[1]);
        })

        btnNew.addEventListener('click', () => {

            soundButton.play();
            inicializarJuego()
            btnDraw.disabled = false;
            btnStay.disabled = true;
        })

        btnBack.addEventListener('click', () => {

            soundButton.play();
            gameContainer.style.display = 'none';
            btnMenuContainer.style.display = 'grid';

        })

        btnBack2.addEventListener('click', () => {

            soundButton.play();
            gameContainer.style.display = 'none';
            btnMenuContainer.style.display = 'grid';

        })

        btnOver.addEventListener('click', () => {

            soundButton.play();
            finContainer.style.display = 'none';
            displayContainer.style.display = 'flex'
            inicializarJuego()
        })

    const looseState = () => {

        looser.play();
        finContainer.style.display = 'block'
        displayContainer.style.display = 'none'
        textHTML[0].innerText = '¡ Bad Luck, You Lost !';
    }

    const winState = () => {

        winner.play();
        finContainer.style.display = 'block'
        displayContainer.style.display = 'none'
        textHTML[0].innerText = '¡ Awesome, You Win !';
    }

    const tieState = () => {

        tie.play();
        finContainer.style.display = 'block'
        displayContainer.style.display = 'none'
        textHTML[0].innerText = '¡ Game in Tie !';
    }

        const result = () => {

            const [dealerPoint, puntosMinimo] = playersPoints

            if ((dealerPoint > puntosMinimo && dealerPoint <= 21) || (puntosMinimo > 21)) {
                looseState();
            } else if ((dealerPoint < puntosMinimo) || (dealerPoint > 21)) {
                winState();
            } else if (dealerPoint === puntosMinimo) {
                tieState();
            }
        }

})();