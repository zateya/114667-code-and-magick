'use strict';

var getMaxElement = function (elements) {
  var max = -1;
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i];
    if (element > max) {
      max = element;
    }
  }
  return max;
};

var getRandomValue = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

window.renderStatistics = function (ctx, names, times) {

  var drawRect = function (x, y, width, height, color, strokeColor) {
    ctx.fillStyle = color || 'white';
    ctx.fillRect(x, y, width, height);
    if (strokeColor) {
      ctx.strokeStyle = strokeColor;
      ctx.strokeRect(x, y, width, height);
    }
  };

  var drawText = function (text, x, y, font, color) {
    ctx.font = font || '16px PT Mono';
    ctx.fillStyle = color || 'black';
    ctx.fillText(text, x, y);
  };

  drawRect(110, 20, 420, 270, 'rgba(0, 0, 0, 0.7)');
  drawRect(100, 10, 420, 270, 'white', 'black');

  drawText('Ура вы победили!', 120, 40);
  drawText('Список результатов:', 120, 60);

  var max = getMaxElement(times);

  var histogram = {
    height: 150,
    getStep: function () {
      return histogram.height / max;
    },
    barWidth: 40,
    userBarColor: 'rgba(255, 0, 0, 1)',
    getDefaultBarColor: function () {
      return 'rgba(0, 0, 255, ' + getRandomValue(0.3, 1) + ')';
    },
    indent: 50,
    initialX: 155,
    initialY: 85,
    lineHeight: 20,
  };

  for (var i = 0; i < times.length; i++) {
    var barX = histogram.initialX + (histogram.barWidth + histogram.indent) * i;
    var barY = histogram.initialY + histogram.height - barHeight;
    var barHeight = times[i] * histogram.getStep();
    var barColor = (names[i] === 'Вы') ? histogram.userBarColor : histogram.getDefaultBarColor();
    drawRect(barX, barY + histogram.lineHeight / 2, histogram.barWidth, barHeight, barColor);
    drawText(Math.round(times[i]), barX, barY);
    drawText(names[i], barX, histogram.initialY + histogram.height + histogram.lineHeight * 1.5);
  }
};
