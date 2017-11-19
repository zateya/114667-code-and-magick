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

  var histogramHeight = 150;
  var step = histogramHeight / getMaxElement(times);
  var barWidth = 40;
  var indent = 50;
  var barOpacityMin = 0.3;
  var barOpacityMax = 1;
  var userBarColor = 'rgba(255, 0, 0, 1)';
  var initialX = 150;
  var initialY = 80;
  var lineHeight = 20;

  var defaultBarColor = '2, 14, 134'; // Red, Green, Blue

  var getDefaultBarColor = function () {
    var barOpacity = Math.random() * (barOpacityMax - barOpacityMin) + barOpacityMin;
    return 'rgba(' + defaultBarColor + ', ' + barOpacity + ')';
  };

  for (var t = 0; t < times.length; t++) {
    ctx.fillStyle = (names[t] === 'Вы') ? userBarColor : getDefaultBarColor();
    ctx.fillRect(initialX + indent * t + barWidth * t, initialY + histogramHeight - times[t] * step + lineHeight, barWidth, times[t] * step - lineHeight / 2);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[t]), initialX + indent * t + barWidth * t, initialY + histogramHeight - times[t] * step + lineHeight / 2);
    ctx.fillText(names[t], initialX + indent * t + barWidth * t, initialY + histogramHeight + lineHeight * 1.5);
  }
};
