const one = document.querySelector('#color1'),
      two = document.querySelector('#color2'),
      three = document.querySelector('#color3'),
      fourth = document.querySelector('#color4'),
      five = document.querySelector('#color5'),
      six = document.querySelector('#color6');

const backGround = document.getElementById('background');

one.addEventListener('click', () => {
    backGround.style.backgroundImage = 'radial-gradient(ellipse at center, #477649, #2f4f30)';
})

two.addEventListener('click', () => {
    backGround.style.backgroundImage = 'radial-gradient(ellipse at center, #477664, #365a4e)';
})

three.addEventListener('click', () => {
    backGround.style.backgroundImage = 'radial-gradient(ellipse at center, #273e76, #213462)';
})

fourth.addEventListener('click', () => {
    backGround.style.backgroundImage = 'radial-gradient(ellipse at center, #782525, #611e1e)';
})

five.addEventListener('click', () => {
    backGround.style.backgroundImage = 'radial-gradient(ellipse at center, #2a2828, #201e1e)';
})

six.addEventListener('click', () => {
    backGround.style.backgroundImage = 'radial-gradient(ellipse at center, #5a3403, #452602)';
})

