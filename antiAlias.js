function fxaa( threshold) {
  img.loadPixels();
  let w = img.width;
  let h = img.height;
  let originalPixels = img.pixels.slice();

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let idx = 4 * (x + y * w);

      let intensity = (originalPixels[idx] + originalPixels[idx + 1] + originalPixels[idx + 2]) / 3;
      let intensityRight = (originalPixels[idx + 4] + originalPixels[idx + 5] + originalPixels[idx + 6]) / 3;
      let intensityDown = (originalPixels[idx + w * 4] + originalPixels[idx + w * 4 + 1] + originalPixels[idx + w * 4 + 2]) / 3;

      let gradient = abs(intensity - intensityRight) + abs(intensity - intensityDown);

      if (gradient > threshold) {
        let r = 0, g = 0, b = 0, count = 0;

        for (let ky = -1; ky <= 1; ky++) {
          for (let kx = -1; kx <= 1; kx++) {
            let nx = x + kx;
            let ny = y + ky;
            let nidx = 4 * (nx + ny * w);
            r += originalPixels[nidx];
            g += originalPixels[nidx + 1];
            b += originalPixels[nidx + 2];
            count++;
          }
        }

        img.pixels[idx] = r / count;
        img.pixels[idx + 1] = g / count;
        img.pixels[idx + 2] = b / count;
      }
    }
  }
  img.updatePixels();
}

function antiAlias() {
  img.loadPixels();
  
  let w = img.width;
  let h = img.height;
  let originalPixels = img.pixels.slice();

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let r = 0, g = 0, b = 0, count = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          let nx = x + kx;
          let ny = y + ky;
          let idx = 4 * (nx + ny * w);
          r += originalPixels[idx];
          g += originalPixels[idx + 1];
          b += originalPixels[idx + 2];
          count++;
        }
      }
      let i = 4 * (x + y * w);
      img.pixels[i] = r / count;
      img.pixels[i + 1] = g / count;
      img.pixels[i + 2] = b / count;
    }
  }
  
  img.updatePixels();
}

function antiAliasEdges(edgeData, threshold) {
  img.loadPixels();
  let w = img.width;
  let h = img.height;
  let originalPixels = img.pixels.slice();
	const kernal = 1;
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let edgeValue = edgeData[x + y * w];
      if (edgeValue > threshold) {
        let r = 0, g = 0, b = 0, count = 0;
        for (let ky = -kernal; ky <= kernal; ky++) {
          for (let kx = -kernal; kx <= kernal; kx++) {
            let nx = x + kx;
            let ny = y + ky;
            let idx = 4 * (nx + ny * w);
            r += originalPixels[idx];
            g += originalPixels[idx + 1];
            b += originalPixels[idx + 2];
            count++;
          }
        }

        let i = 4 * (x + y * w);
        img.pixels[i] = r / count;
        img.pixels[i + 1] = g / count;
        img.pixels[i + 2] = b / count;
      }
    }
  }

  img.updatePixels();
}


function detectEdges() {
  img.loadPixels();
  let w = img.width;
  let h = img.height;
  let edgeData = new Array(w * h).fill(0);
  
  let kernelX = [
    [-1, 0, 1],
    [-2, 0, 2],
    [-1, 0, 1],
  ];
  
  let kernelY = [
    [-1, -2, -1],
    [0, 0, 0],
    [1, 2, 1],
  ];
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let gX = 0, gY = 0;
      
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          let nx = x + kx;
          let ny = y + ky;
          let idx = 4 * (nx + ny * w);
          let intensity = (img.pixels[idx] + img.pixels[idx + 1] + img.pixels[idx + 2]) / 3;
          
          gX += intensity * kernelX[ky + 1][kx + 1];
          gY += intensity * kernelY[ky + 1][kx + 1];
        }
      }
      let magnitude = sqrt(gX * gX + gY * gY);
      edgeData[x + y * w] = magnitude;
    }
  }

  return edgeData;
}