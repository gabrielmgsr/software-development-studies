const celsius = document.getElementById('celsius');
const fahrenheit = document.getElementById('fahrenheit');
const kelvin = document.getElementById('kelvin');

let ultimoCampo = '';

celsius.addEventListener('input', function(){
    ultimoCampo= 'celsius';
})
fahrenheit.addEventListener('input', function(){
    ultimoCampo = 'fahrenheit'
})
kelvin.addEventListener('input', function(){
    ultimoCampo= 'kelvin'
})

function converter(){
    
    if(ultimoCampo == 'celsius'){
        let c = Number(celsius.value);

        fahrenheit.value = (c * 1.8 + 32).toFixed(2);
        kelvin.value = (c + 273.15).toFixed(2);

    } else if(ultimoCampo === 'fahrenheit') {
        let f = Number(fahrenheit.value);

        celsius.value = ((f - 32)/1.8).toFixed(2);
        kelvin.value = ((f - 32)/1.8 + 273.15).toFixed(2)

    } else if(ultimoCampo === 'kelvin'){
        let k = Number(kelvin.value);

        celsius.value = (k - 273.15).toFixed(2);
        fahrenheit.value= ((k - 273.15) * 1.8 + 32)
    }
}


// Usuário digita →
// input detecta →
// ultimoCampo recebe o nome do campo →
// usuário clica converter →
// if verifica o ultimoCampo →
// faz o cálculo correto


