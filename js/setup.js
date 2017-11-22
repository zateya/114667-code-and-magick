'use strict';

var WIZARDS_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARDS_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARDS_COATS_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];
var WIZARDS_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARDS_COUNT = 4;

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var removeClass = function (selector, className) {
  var element = document.querySelector(selector);
  return element.classList.remove(className);
};

removeClass('.setup', 'hidden');

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getRandomIndex = function (arr) {
  var index = getRandomInteger(0, arr.length - 1);
  return index;
};

var getWizard = function () {
  var wizardFirstName = WIZARDS_FIRST_NAMES[getRandomIndex(WIZARDS_FIRST_NAMES)];
  var wizardLastName = WIZARDS_LAST_NAMES[getRandomIndex(WIZARDS_LAST_NAMES)];
  var wizardName = wizardFirstName + ' ' + wizardLastName;
  var wizardCoatColor = WIZARDS_COATS_COLORS[getRandomIndex(WIZARDS_COATS_COLORS)];
  var wizardEyesColor = WIZARDS_EYES_COLORS[getRandomIndex(WIZARDS_EYES_COLORS)];
  return {
    name: wizardName,
    coatColor: wizardCoatColor,
    eyesColor: wizardEyesColor
  };
};

var getWizardsArray = function (wizardsCount) {
  var wizardsArray = [];
  for (var i = 0; i < wizardsCount; i++) {
    wizardsArray.push(getWizard());
  }
  return wizardsArray;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizards = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
};

var wizards = getWizardsArray(WIZARDS_COUNT);
renderWizards(wizards);

removeClass('.setup-similar', 'hidden');
