function shuffleArray() {
  const array = [0, 0, 1, 1, 1, 1, 1, 1, 1, 1];
  let currentIndex = array.length;
  let temporary, random;
  while (currentIndex !== 0) {
    random = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    temporary = array[currentIndex];
    array[currentIndex] = array[random];
    array[random] = temporary;
  }
  return array;
}

function experiment1(N) {
  const n = parseInt(N, 10);
  const array = shuffleArray();
  const theoretical = n * 0.2;
  let index;
  let success = 0;
  for (let i = 0; i < n; i++) {
    index = Math.floor(Math.random() * 10);
    if (array[index] === 0) {
      success++;
    }
  }
  return {
    success: success,
    theoretical: theoretical,
    error: Math.abs(success / theoretical - 1)
  };
}

function experiment2(N) {
    const n = parseInt(N, 10);
    const L = 60;
    const theoretical = L/3;
    let sum = 0;
    let x, y;
    for(let i = 0; i < n; i++) {
      x = Math.floor(Math.random()*L + 1);
      y = Math.floor(Math.random()*L + 1);
      sum += Math.abs(x-y);
    }
    return {
      theoretical: theoretical,
      experimental: sum/n,
      error: Math.abs(sum/n / theoretical - 1)
    }
}

module.exports = { experiment1, experiment2 };
