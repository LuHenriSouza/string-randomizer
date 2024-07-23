const fs = require('fs');

function hasElapsedInSecond(startTime, endTime, time) {
  const elapsed = endTime - startTime;
  return elapsed >= time * 1000;
}

function divisaoComResto(dividendo, divisor) {
  const resultadoInteiro = Math.floor(dividendo / divisor); // Resultado inteiro da divisão
  const resto = dividendo % divisor; // Resto da divisão

  return [resultadoInteiro, resto];
}

function generateCombinations(min, length) {
  if (min > length) {
    console.error('Erro: Mínima maior que máxima !');
    return ['']
  }
  const inicio = performance.now();
  let inicioVariavel = inicio;

  const characters = 'abcdefghijklmnopqrstuvJ0123456789';
  const lengthAlpha = characters.length;
  let total = 0;
  for (let i = min; i <= length; i++) {
    total += lengthAlpha ** i;
  }

  let tick = 0;
  let injectionInSecond = 0;
  let calculed = false;
  const results = [];
  let seconds = 0;
  let realLevel = min;


  function generate(prefix, level) {
    if (level === 0) {
      results.push(prefix);
      tick++;

      // calcular contador
      if (hasElapsedInSecond(inicio, performance.now(), 1) && !calculed) {
        injectionInSecond = tick / 1;
        calculed = true;
        seconds = total / injectionInSecond;
      }
      // contador
      if (hasElapsedInSecond(inicioVariavel, performance.now(), 1) && inicioVariavel) {
        console.clear()
        const secFalt = seconds - (performance.now() / 1000);
        const [minFalt, sec] = divisaoComResto(secFalt, 60);
        const [Hour, min] = divisaoComResto(minFalt, 60);
        console.log(`Restam ${Hour} : ${min} : ${sec.toFixed(1)}`);
        console.log(`Injeções por segundo: ${injectionInSecond}`)
        console.log(`Results: ${results.length}`)
        console.log(`Nível: ${realLevel}`)
        inicioVariavel = performance.now()
      }

      return;
    }

    for (let i = 0; i < lengthAlpha; i++) {
      generate(prefix + characters[i], level - 1);
    }
  }
  // Gerar combinações para todos os comprimentos de 1 até 'length'
  for (let i = min; i <= length; i++) {
    generate('', i);
    realLevel++
    const stringArray = JSON.stringify(results);
    const string = stringArray.replace(/\[|\]/g, '');
    fs.appendFileSync('append2.js', string);
  }

  return results;
}

// Gerar combinações até 4 caracteres (porque maxLength é 4)
const minLength = 6;
const maxLength = 6;

const combinations = generateCombinations(minLength, maxLength);

// Não está claro o porquê do código para a gravação do arquivo aqui.

fs.writeFileSync('array.js', JSON.stringify(combinations));
process.exit(0);