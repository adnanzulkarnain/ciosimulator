const VERSION = 4;
const SIZE = VERSION * 4 + 17;
const DATA_CODEWORDS = 80;
const ECC_CODEWORDS = 20;

function makeGaloisTables() {
  const exp = new Array(512);
  const log = new Array(256).fill(0);
  let x = 1;

  for (let i = 0; i < 255; i++) {
    exp[i] = x;
    log[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }

  for (let i = 255; i < 512; i++) {
    exp[i] = exp[i - 255];
  }

  return { exp, log };
}

const GF = makeGaloisTables();

function gfMul(a, b) {
  if (a === 0 || b === 0) return 0;
  return GF.exp[GF.log[a] + GF.log[b]];
}

function makeGenerator(degree) {
  let poly = [1];

  for (let i = 0; i < degree; i++) {
    const next = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      next[j] ^= poly[j];
      next[j + 1] ^= gfMul(poly[j], GF.exp[i]);
    }
    poly = next;
  }

  return poly;
}

function makeErrorCorrection(data) {
  const generator = makeGenerator(ECC_CODEWORDS);
  const remainder = new Array(ECC_CODEWORDS).fill(0);

  for (const codeword of data) {
    const factor = codeword ^ remainder.shift();
    remainder.push(0);

    for (let i = 0; i < ECC_CODEWORDS; i++) {
      remainder[i] ^= gfMul(generator[i + 1], factor);
    }
  }

  return remainder;
}

function pushBits(bits, value, length) {
  for (let i = length - 1; i >= 0; i--) {
    bits.push((value >>> i) & 1);
  }
}

function makeDataCodewords(text) {
  const bytes = Array.from(new TextEncoder().encode(text));

  if (bytes.length > 78) {
    throw new Error('QR URL terlalu panjang. Gunakan URL info prodi maksimal 78 byte.');
  }

  const bits = [];
  pushBits(bits, 0b0100, 4);
  pushBits(bits, bytes.length, 8);
  bytes.forEach((byte) => pushBits(bits, byte, 8));

  const capacityBits = DATA_CODEWORDS * 8;
  pushBits(bits, 0, Math.min(4, capacityBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  const data = [];
  for (let i = 0; i < bits.length; i += 8) {
    let codeword = 0;
    for (let j = 0; j < 8; j++) {
      codeword = (codeword << 1) | bits[i + j];
    }
    data.push(codeword);
  }

  for (let pad = 0; data.length < DATA_CODEWORDS; pad++) {
    data.push(pad % 2 === 0 ? 0xec : 0x11);
  }

  return data;
}

function makeMatrix() {
  return {
    modules: Array.from({ length: SIZE }, () => new Array(SIZE).fill(false)),
    reserved: Array.from({ length: SIZE }, () => new Array(SIZE).fill(false))
  };
}

function setModule(matrix, row, col, value, reserve = true) {
  if (row < 0 || row >= SIZE || col < 0 || col >= SIZE) return;
  matrix.modules[row][col] = Boolean(value);
  if (reserve) matrix.reserved[row][col] = true;
}

function addFinder(matrix, row, col) {
  for (let y = -1; y <= 7; y++) {
    for (let x = -1; x <= 7; x++) {
      const rr = row + y;
      const cc = col + x;
      const isPattern =
        x >= 0 &&
        x <= 6 &&
        y >= 0 &&
        y <= 6 &&
        (x === 0 || x === 6 || y === 0 || y === 6 || (x >= 2 && x <= 4 && y >= 2 && y <= 4));

      setModule(matrix, rr, cc, isPattern);
    }
  }
}

function addAlignment(matrix, centerRow, centerCol) {
  for (let y = -2; y <= 2; y++) {
    for (let x = -2; x <= 2; x++) {
      const distance = Math.max(Math.abs(x), Math.abs(y));
      setModule(matrix, centerRow + y, centerCol + x, distance === 2 || distance === 0);
    }
  }
}

function addPatterns(matrix) {
  addFinder(matrix, 0, 0);
  addFinder(matrix, 0, SIZE - 7);
  addFinder(matrix, SIZE - 7, 0);
  addAlignment(matrix, 26, 26);

  for (let i = 8; i < SIZE - 8; i++) {
    setModule(matrix, 6, i, i % 2 === 0);
    setModule(matrix, i, 6, i % 2 === 0);
  }

  for (let i = 0; i < 9; i++) {
    setModule(matrix, 8, i, false);
    setModule(matrix, i, 8, false);
  }
  for (let i = SIZE - 8; i < SIZE; i++) {
    setModule(matrix, 8, i, false);
    setModule(matrix, i, 8, false);
  }

  setModule(matrix, 4 * VERSION + 9, 8, true);
}

function addData(matrix, codewords) {
  const bits = [];
  codewords.forEach((codeword) => pushBits(bits, codeword, 8));

  let bitIndex = 0;
  let upwards = true;

  for (let right = SIZE - 1; right >= 1; right -= 2) {
    if (right === 6) right--;

    for (let vert = 0; vert < SIZE; vert++) {
      const row = upwards ? SIZE - 1 - vert : vert;

      for (let x = 0; x < 2; x++) {
        const col = right - x;
        if (matrix.reserved[row][col]) continue;

        const bit = bitIndex < bits.length ? bits[bitIndex] : 0;
        const mask = (row + col) % 2 === 0;
        setModule(matrix, row, col, Boolean(bit) !== mask, false);
        bitIndex++;
      }
    }

    upwards = !upwards;
  }
}

function getFormatBits() {
  const errorCorrectionLevelL = 0b01;
  const maskPattern = 0b000;
  const data = (errorCorrectionLevelL << 3) | maskPattern;
  let bits = data << 10;

  for (let i = 14; i >= 10; i--) {
    if ((bits >>> i) & 1) {
      bits ^= 0x537 << (i - 10);
    }
  }

  return ((data << 10) | bits) ^ 0x5412;
}

function addFormatInfo(matrix) {
  const bits = getFormatBits();
  const firstCopy = [
    [8, 0], [8, 1], [8, 2], [8, 3], [8, 4], [8, 5], [8, 7], [8, 8],
    [7, 8], [5, 8], [4, 8], [3, 8], [2, 8], [1, 8], [0, 8]
  ];
  const secondCopy = [
    [SIZE - 1, 8], [SIZE - 2, 8], [SIZE - 3, 8], [SIZE - 4, 8], [SIZE - 5, 8],
    [SIZE - 6, 8], [SIZE - 7, 8], [8, SIZE - 8], [8, SIZE - 7], [8, SIZE - 6],
    [8, SIZE - 5], [8, SIZE - 4], [8, SIZE - 3], [8, SIZE - 2], [8, SIZE - 1]
  ];

  for (let i = 0; i < 15; i++) {
    const value = ((bits >>> (14 - i)) & 1) === 1;
    setModule(matrix, firstCopy[i][0], firstCopy[i][1], value);
    setModule(matrix, secondCopy[i][0], secondCopy[i][1], value);
  }
}

export function createQrSvg(text, scale = 5, border = 4) {
  const data = makeDataCodewords(text);
  const ecc = makeErrorCorrection(data);
  const matrix = makeMatrix();

  addPatterns(matrix);
  addData(matrix, [...data, ...ecc]);
  addFormatInfo(matrix);

  const sizeWithBorder = SIZE + border * 2;
  const darkModules = [];

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (matrix.modules[row][col]) {
        darkModules.push(`M${col + border},${row + border}h1v1h-1z`);
      }
    }
  }

  return `
    <svg viewBox="0 0 ${sizeWithBorder} ${sizeWithBorder}" width="${sizeWithBorder * scale}" height="${sizeWithBorder * scale}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="QR code" shape-rendering="crispEdges">
      <rect width="100%" height="100%" fill="#fff"/>
      <path d="${darkModules.join('')}" fill="#0a0f1e"/>
    </svg>
  `;
}
