const specialN = document.querySelector('#specialN')
const colorsArray = ['DarkBlue', 'LightPink', 'LightYellow'];
let currentColor = 0;

function changeColor(colors) {
    specialN.style.color = colors[currentColor];
    (currentColor < colors.length - 1) ? currentColor++ : currentColor = 0;
}

// specialN.addEventListener('mouseover', () => {
//     setInterval('changeColor(colorsArray)', 300);
// })