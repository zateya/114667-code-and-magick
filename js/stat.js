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
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'rgba(256, 256, 256, 1.0)';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 120, 40);
  ctx.fillText('Список результатов:', 120, 60);

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
    var barHeight = times[i] * histogram.getStep();
    var barX = histogram.initialX + histogram.indent * i + histogram.barWidth * i;
    var barY = histogram.initialY + histogram.height - barHeight;
    ctx.fillStyle = (names[i] === 'Вы') ? histogram.userBarColor : histogram.getDefaultBarColor();
    ctx.fillRect(barX, barY + histogram.lineHeight / 2, histogram.barWidth, barHeight);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), barX, barY);
    ctx.fillText(names[i], barX, histogram.initialY + histogram.height + histogram.lineHeight * 1.5);
  }
};
