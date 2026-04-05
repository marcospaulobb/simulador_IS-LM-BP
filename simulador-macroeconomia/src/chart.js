import Chart from 'chart.js/auto';

// Custom plugin to draw the equilibrium point and labels
const equilibriumPlugin = {
  id: 'equilibriumPoint',
  afterDraw(chart) {
    if (!chart.tooltip?._active?.length && chart.config.options.plugins.equilibrium) {
      const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
      const eq = chart.config.options.plugins.equilibrium;
      
      if (!eq || eq.Y === undefined || eq.r === undefined) return;
      
      const xPos = x.getPixelForValue(eq.Y);
      const yPos = y.getPixelForValue(eq.r);

      // Only draw if within bounds approximately
      if (xPos >= left && xPos <= right && yPos >= top && yPos <= bottom) {
        ctx.save();
        
        // Draw dashed lines to axes (estilo mais suave)
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(xPos, yPos);
        ctx.lineTo(xPos, bottom);
        ctx.moveTo(xPos, yPos);
        ctx.lineTo(left, yPos);
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#9ca3af'; // gray-400
        ctx.stroke();

        // Draw equilibrium point (círculo maior e mais visível)
        ctx.beginPath();
        ctx.arc(xPos, yPos, 8, 0, 2 * Math.PI);
        ctx.fillStyle = '#dc2626'; // Red (destaque)
        ctx.fill();
        ctx.lineWidth = 2.5;
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        
        // Draw inner circle
        ctx.beginPath();
        ctx.arc(xPos, yPos, 3, 0, 2 * Math.PI);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        // Draw label with background (estilo mais acadêmico)
        ctx.font = 'bold 13px Inter, sans-serif';
        const labelY = `Y = ${Math.round(eq.Y)}`;
        const labelI = `i = ${eq.r.toFixed(2)}%`;
        const labelWidth = Math.max(ctx.measureText(labelY).width, ctx.measureText(labelI).width);
        
        // Posição do label (ajustar para não sair do gráfico)
        let labelX = xPos + 12;
        let labelY_pos = yPos - 10;
        
        if (labelX + labelWidth + 20 > right) {
          labelX = xPos - labelWidth - 25;
        }
        if (labelY_pos - 40 < top) {
          labelY_pos = yPos + 25;
        }
        
        // Background do label
        ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        ctx.strokeStyle = '#d1d5db';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(labelX, labelY_pos - 32, labelWidth + 16, 42, 4);
        ctx.fill();
        ctx.stroke();
        
        // Text do label
        ctx.fillStyle = '#1f2937';
        ctx.fillText(labelY, labelX + 8, labelY_pos - 16);
        ctx.fillText(labelI, labelX + 8, labelY_pos - 2);
        
        // Draw arrows and annotations if policy info is available
        if (eq.policy) {
          drawPolicyAnnotations(ctx, chart, eq, xPos, yPos);
        }
        
        ctx.restore();
      }
    }
  }
};

/**
 * Draw policy annotations (arrows and text)
 */
function drawPolicyAnnotations(ctx, chart, eq, xPos, yPos) {
  const { chartArea: { top, bottom, left, right }, scales: { x, y } } = chart;
  
  ctx.save();
  ctx.font = 'bold 11px Inter, sans-serif';
  
  const policy = eq.policy;
  
  // Política Fiscal
  if (policy.type === 'G' || policy.type === 'T') {
    const isExpansion = (policy.type === 'G' && policy.direction === 'up') || 
                        (policy.type === 'T' && policy.direction === 'down');
    
    if (isExpansion) {
      // Expansão fiscal: IS → direita
      drawCurveShift(ctx, xPos - 50, yPos, 'right', '#f97316', 'IS');
      drawResultText(ctx, xPos + 15, yPos + 40, '↑ Y, ↑ i', '#dc2626');
    } else {
      // Contração fiscal: IS ← esquerda
      drawCurveShift(ctx, xPos + 50, yPos, 'left', '#f97316', 'IS');
      drawResultText(ctx, xPos + 15, yPos + 40, '↓ Y, ↓ i', '#dc2626');
    }
  }
  
  // Política Monetária
  else if (policy.type === 'M') {
    if (policy.direction === 'up') {
      // Expansão monetária: LM → direita
      drawCurveShift(ctx, xPos - 50, yPos + 35, 'right', '#22c55e', 'LM');
      drawResultText(ctx, xPos + 15, yPos + 40, '↑ Y, ↓ i', '#22c55e');
    } else {
      // Contração monetária: LM ← esquerda
      drawCurveShift(ctx, xPos + 50, yPos + 35, 'left', '#22c55e', 'LM');
      drawResultText(ctx, xPos + 15, yPos + 40, '↓ Y, ↑ i', '#22c55e');
    }
  }
  
  // Política Cambial (desvalorização/valorização)
  else if (policy.type === 'e') {
    if (policy.direction === 'up') {
      // Desvalorização: IS → direita (↑ NX)
      drawCurveShift(ctx, xPos - 50, yPos, 'right', '#f97316', 'IS');
      drawResultText(ctx, xPos + 15, yPos + 40, '↑ NX → ↑ Y', '#8b5cf6');
    } else {
      // Valorização: IS ← esquerda (↓ NX)
      drawCurveShift(ctx, xPos + 50, yPos, 'left', '#f97316', 'IS');
      drawResultText(ctx, xPos + 15, yPos + 40, '↓ NX → ↓ Y', '#8b5cf6');
    }
  }
  
  // Choque externo (renda externa ou juros externos)
  else if (policy.type === 'Ystar') {
    if (policy.direction === 'up') {
      // ↑ Y*: IS → direita (↑ exportações)
      drawCurveShift(ctx, xPos - 50, yPos, 'right', '#f97316', 'IS');
      drawResultText(ctx, xPos + 15, yPos + 40, '↑ X → ↑ Y', '#f97316');
    } else {
      // ↓ Y*: IS ← esquerda (↓ exportações)
      drawCurveShift(ctx, xPos + 50, yPos, 'left', '#f97316', 'IS');
      drawResultText(ctx, xPos + 15, yPos + 40, '↓ X → ↓ Y', '#f97316');
    }
  }
  
  else if (policy.type === 'rstar') {
    if (policy.direction === 'up') {
      // ↑ i*: BP ↑ (desloca para cima)
      drawCurveShift(ctx, xPos, yPos - 40, 'up', '#8b5cf6', 'BP');
      drawResultText(ctx, xPos + 15, yPos + 40, '↑ i* → saída K', '#8b5cf6');
    } else {
      // ↓ i*: BP ↓ (desloca para baixo)
      drawCurveShift(ctx, xPos, yPos + 40, 'down', '#8b5cf6', 'BP');
      drawResultText(ctx, xPos + 15, yPos + 40, '↓ i* → entrada K', '#8b5cf6');
    }
  }
  
  // Parâmetros estruturais (c, k, m, x1, etc.)
  else if (['c', 'k', 'm', 'x1', 'x2', 'm2'].includes(policy.type)) {
    // Mostrar apenas texto genérico
    drawResultText(ctx, xPos + 15, yPos + 40, 'Parâmetro alterado', '#6b7280');
  }
  
  ctx.restore();
}

/**
 * Draw curve shift arrow
 */
function drawCurveShift(ctx, x, y, direction, color, label) {
  ctx.save();
  
  const arrowLength = 35;
  let x1, y1, x2, y2;
  
  if (direction === 'right') {
    x1 = x;
    y1 = y;
    x2 = x + arrowLength;
    y2 = y;
  } else if (direction === 'left') {
    x1 = x;
    y1 = y;
    x2 = x - arrowLength;
    y2 = y;
  } else if (direction === 'up') {
    x1 = x;
    y1 = y;
    x2 = x;
    y2 = y - arrowLength;
  } else if (direction === 'down') {
    x1 = x;
    y1 = y;
    x2 = x;
    y2 = y + arrowLength;
  }
  
  // Draw arrow line
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.stroke();
  
  // Draw arrow head
  const angle = Math.atan2(y2 - y1, x2 - x1);
  ctx.beginPath();
  ctx.moveTo(x2, y2);
  ctx.lineTo(x2 - 10 * Math.cos(angle - Math.PI / 6), y2 - 10 * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(x2 - 10 * Math.cos(angle + Math.PI / 6), y2 - 10 * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
  
  // Draw label
  if (label) {
    ctx.fillStyle = color;
    ctx.font = 'bold 12px Inter, sans-serif';
    
    if (direction === 'right') {
      ctx.fillText(label, x1 - 20, y1 - 8);
    } else if (direction === 'left') {
      ctx.fillText(label, x1 + 10, y1 - 8);
    } else if (direction === 'up') {
      ctx.fillText(label, x1 + 10, y1 + 5);
    } else if (direction === 'down') {
      ctx.fillText(label, x1 + 10, y1 - 10);
    }
  }
  
  ctx.restore();
}

/**
 * Draw result text annotation
 */
function drawResultText(ctx, x, y, text, color) {
  ctx.save();
  ctx.fillStyle = color;
  ctx.font = 'bold 11px Inter, sans-serif';
  
  // Background for better readability
  const textWidth = ctx.measureText(text).width;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillRect(x - 2, y - 12, textWidth + 4, 16);
  
  // Text
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
  
  ctx.restore();
}



Chart.register(equilibriumPlugin);

export function initChart(canvasId) {
  const ctx = document.getElementById(canvasId).getContext('2d');
  
  return new Chart(ctx, {
    type: 'line',
    data: {
      datasets: [
        // Curvas atuais (principais)
        {
          label: 'IS',
          data: [],
          borderColor: '#f97316', // Orange (como na imagem)
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          order: 1
        },
        {
          label: 'LM',
          data: [],
          borderColor: '#22c55e', // Green (como na imagem)
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          order: 1
        },
        {
          label: 'BP',
          data: [],
          borderColor: '#8b5cf6', // Purple (como na imagem)
          backgroundColor: 'transparent',
          borderWidth: 3,
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          hidden: true, // Hidden by default (Closed Economy)
          order: 1
        },
        // Curvas de referência (iniciais) - tracejadas e transparentes
        {
          label: 'IS inicial',
          data: [],
          borderColor: 'rgba(249, 115, 22, 0.35)', // Orange transparent
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [8, 4],
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          hidden: false,
          order: 2
        },
        {
          label: 'LM inicial',
          data: [],
          borderColor: 'rgba(34, 197, 94, 0.35)', // Green transparent
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [8, 4],
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          hidden: false,
          order: 2
        },
        {
          label: 'BP inicial',
          data: [],
          borderColor: 'rgba(139, 92, 246, 0.35)', // Purple transparent
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [8, 4],
          tension: 0,
          pointRadius: 0,
          pointHoverRadius: 0,
          hidden: true,
          order: 2
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 800,
        easing: 'easeOutQuart'
      },
      interaction: {
        mode: 'nearest',
        intersect: false,
      },
      plugins: {
        legend: {
          position: 'top',
          labels: {
            usePointStyle: false,
            boxWidth: 40,
            boxHeight: 3,
            font: { 
              family: 'Inter, sans-serif', 
              size: 14, 
              weight: '600' 
            },
            padding: 15,
            color: '#1f2937',
            filter: function(item, chart) {
              // Ocultar curvas iniciais da legenda
              return !item.text.includes('inicial');
            }
          }
        },
        tooltip: {
          enabled: false // Disable default tooltip to favor plugin
        },
        equilibrium: { Y: 0, r: 0 }, // Custom payload for plugin
        zoom: {
          zoom: {
            wheel: {
              enabled: false
            },
            pinch: {
              enabled: false
            }
          },
          pan: {
            enabled: false
          }
        }
      },
      scales: {
        x: {
          type: 'linear',
          title: {
            display: true,
            text: 'Renda (Y)',
            font: { 
              family: 'Inter, sans-serif', 
              size: 16, 
              weight: '700' 
            },
            color: '#1f2937'
          },
          min: 1000,
          max: 4500,
          ticks: {
            font: {
              family: 'Inter, sans-serif',
              size: 12,
              weight: '500'
            },
            color: '#4b5563'
          },
          grid: {
            color: '#e5e7eb',
            lineWidth: 1,
            drawTicks: true
          },
          border: {
            color: '#9ca3af',
            width: 2
          }
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Taxa de Juros (i)',
            font: { 
              family: 'Inter, sans-serif', 
              size: 16, 
              weight: '700' 
            },
            color: '#1f2937'
          },
          min: 0,
          max: 15,
          ticks: {
            font: {
              family: 'Inter, sans-serif',
              size: 12,
              weight: '500'
            },
            color: '#4b5563',
            callback: function(value) {
              return value.toFixed(1) + '%';
            }
          },
          grid: {
            color: '#e5e7eb',
            lineWidth: 1,
            drawTicks: true
          },
          border: {
            color: '#9ca3af',
            width: 2
          }
        }
      },
      layout: {
        padding: {
          top: 10,
          right: 10,
          bottom: 10,
          left: 10
        }
      }
    }
  });
}

export function updateChart(chart, dataIS, dataLM, dataBP, eqData, isOpen, initialData = null) {
  console.log('updateChart called - dataBP length:', dataBP.length, 'isOpen:', isOpen, 'first BP point:', dataBP[0]);
  
  // Atualizar curvas atuais
  chart.data.datasets[0].data = dataIS;
  chart.data.datasets[1].data = dataLM;
  chart.data.datasets[2].data = dataBP;
  chart.data.datasets[2].hidden = !isOpen;
  
  // Atualizar curvas de referência (iniciais)
  if (initialData) {
    chart.data.datasets[3].data = initialData.dataIS || [];
    chart.data.datasets[4].data = initialData.dataLM || [];
    chart.data.datasets[5].data = initialData.dataBP || [];
    chart.data.datasets[5].hidden = !isOpen;
    
    // Mostrar curvas iniciais apenas se houver mudança
    const hasChanged = !arraysEqual(dataIS, initialData.dataIS) || 
                       !arraysEqual(dataLM, initialData.dataLM) ||
                       !arraysEqual(dataBP, initialData.dataBP);
    
    console.log('Initial data comparison - hasChanged:', hasChanged, 'BP arrays equal:', arraysEqual(dataBP, initialData.dataBP));
    
    chart.data.datasets[3].hidden = !hasChanged;
    chart.data.datasets[4].hidden = !hasChanged;
    chart.data.datasets[5].hidden = !hasChanged || !isOpen;
  } else {
    // Ocultar curvas iniciais se não houver dados
    chart.data.datasets[3].hidden = true;
    chart.data.datasets[4].hidden = true;
    chart.data.datasets[5].hidden = true;
  }
  
  console.log('Chart datasets visibility - BP hidden:', chart.data.datasets[2].hidden, 'BP initial hidden:', chart.data.datasets[5].hidden);
  
  // Dynamic axis adjustment
  adjustAxes(chart, dataIS, dataLM, dataBP, eqData);
  
  // Custom option for custom plugin
  chart.config.options.plugins.equilibrium = eqData;
  
  chart.update();
}

/**
 * Compare two arrays of data points
 */
function arraysEqual(arr1, arr2) {
  if (!arr1 || !arr2) return false;
  if (arr1.length === 0 && arr2.length === 0) return true;
  if (arr1.length !== arr2.length) return false;
  
  // Comparar alguns pontos (máximo 5 ou o tamanho do array)
  const samplesToCheck = Math.min(5, arr1.length);
  
  for (let i = 0; i < samplesToCheck; i++) {
    if (!arr1[i] || !arr2[i]) return false;
    if (!arr1[i].x || !arr1[i].y || !arr2[i].x || !arr2[i].y) return false;
    if (Math.abs(arr1[i].x - arr2[i].x) > 0.1 || Math.abs(arr1[i].y - arr2[i].y) > 0.01) {
      return false;
    }
  }
  return true;
}

/**
 * Dynamically adjust chart axes based on data
 * Centraliza o equilíbrio no gráfico
 */
function adjustAxes(chart, dataIS, dataLM, dataBP, eqData) {
  const eq = eqData;
  
  if (!eq || !eq.Y || !eq.r) {
    chart.options.scales.x.min = 0;
    chart.options.scales.x.max = 12000;
    chart.options.scales.y.min = 0;
    chart.options.scales.y.max = 50;
    return;
  }
  
  const eqY = eq.Y;
  const eqR = eq.r;
  
  // 1. Centralizar Eixo X (Renda Y)
  // Usamos um range mínimo de 6000 para evitar zoom excessivo
  const minRangeY = 8000;
  let minY, maxY;
  
  if (eqY < minRangeY / 2) {
    // Equilíbrio muito baixo: fixar min em 0 e dobrar eq para centralizar
    minY = 0;
    maxY = Math.max(minRangeY, eqY * 2);
  } else {
    // Equilíbrio alto: centralizar com range fixo
    const halfRange = Math.max(minRangeY / 2, eqY * 0.4); // 40% de margem ou min
    minY = eqY - halfRange;
    maxY = eqY + halfRange;
  }
  
  // Ajuste especial se houver BP vertical (garantir que BP apareça)
  if (dataBP && dataBP.length > 0) {
    const bpX = dataBP[0].x;
    const bpIsVertical = dataBP.every(point => Math.abs(point.x - bpX) < 1);
    if (bpIsVertical) {
      if (bpX < minY) minY = Math.max(0, bpX - 500);
      if (bpX > maxY) maxY = bpX + 500;
      
      // Re-centralizar se BP for incluída e desbalancear muito
      const newCenter = (minY + maxY) / 2;
      // Se o equilíbrio estiver muito longe do novo centro, expandimos o outro lado
      if (Math.abs(eqY - newCenter) > (maxY - minY) * 0.1) {
         const dist = Math.abs(eqY - minY);
         maxY = eqY + dist;
      }
    }
  }

  // 2. Centralizar Eixo Y (Juros i)
  const minRangeR = 20; 
  let minR, maxR;
  
  if (eqR < minRangeR / 2) {
    minR = 0;
    maxR = Math.max(minRangeR, eqR * 2);
  } else {
    const halfRange = Math.max(minRangeR / 2, eqR * 0.5);
    minR = Math.max(0, eqR - halfRange);
    maxR = eqR + halfRange;
    
    // Se minR for 0 por causa do Math.max, ajustar maxR para centralizar
    if (minR === 0) {
      maxR = eqR * 2;
    }
  }

  // Aplicar com arredondamento estético
  chart.options.scales.x.min = Math.floor(minY / 100) * 100;
  chart.options.scales.x.max = Math.ceil(maxY / 100) * 100;
  chart.options.scales.y.min = Math.floor(minR);
  chart.options.scales.y.max = Math.ceil(maxR);
  
  console.log(`Centering Axis: eq(${eqY.toFixed(0)}, ${eqR.toFixed(1)}%) -> X[${chart.options.scales.x.min}, ${chart.options.scales.x.max}] Y[${chart.options.scales.y.min}, ${chart.options.scales.y.max}]`);
}

