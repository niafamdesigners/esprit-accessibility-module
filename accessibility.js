document.getElementById("blindness").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("offcanvasSettings").classList.toggle("open");
});

function createSlider(id, values, start, callback) {
  var slider = document.getElementById(id);
  noUiSlider.create(slider, {
    start: [start],
    connect: [true, false],
    range: {
      'min': values[0],
      'max': values[values.length - 1]
    },
    step: null,
    pips: {
      mode: 'values',
      values: values,
      density: 5
    }
  });
  slider.noUiSlider.on('update', function (values, handle) {
    callback(values[handle]);
  });
}

createSlider("fontSizeSlider", [12, 16, 20, 24, 30], 16, function (value) {
  document.body.style.fontSize = value + "px";
});

createSlider("wordSpacingSlider", [0, 2, 4, 6, 10], 1, function (value) {
  document.body.style.wordSpacing = value + "px";
});

createSlider("lineHeightSlider", [1, 1.5, 2, 2.5, 3], 1.5, function (value) {
  document.body.style.lineHeight = value;
});

document.querySelectorAll("#fontOptions .option-item").forEach(item => {
  item.addEventListener("click", function () {
    document.body.style.fontFamily = this.dataset.font;
    document.querySelectorAll("#fontOptions .option-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll("#colorBlindOptions .option-item").forEach(item => {
  item.addEventListener("click", function () {
    document.body.className = "colorblind-filter " + this.dataset.filter;
    document.querySelectorAll("#colorBlindOptions .option-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  });
});


function loadFont(fontName, fontUrl, isVariable = false) {
  if (document.querySelector(`#font-style-${fontName}`)) {
    document.body.style.fontFamily = fontName;
    return;
  }

  let style = document.createElement("style");
  style.id = `font-style-${fontName}`;
  style.innerHTML = `
@font-face {
  font-family: '${fontName}';
  src: url('${fontUrl}') format('woff2');
  ${isVariable ? "font-weight: 100 900;" : "font-weight: normal;"}
  font-style: normal;
}
`;
  document.head.appendChild(style);

  document.body.style.fontFamily = fontName;
}

document.querySelectorAll("#fontOptions .option-item").forEach(item => {
  item.addEventListener("click", function () {
    let selectedFont = this.dataset.font;
    let fontPaths = {
      "vazir": "/uploads/pr/assets/fonts/Vazir-v33.003/Vazirmatn[wght].woff2",
      "estedad": "/uploads/pr/assets/fonts/Estedad-v7.3/webfonts/variable/Estedad-FD[KSHD,wght].woff2",
      "shabnam": "/uploads/pr/assets/fonts/Shabnam-v5.0.1/Farsi-Digits/Shabnam-Medium-FD.woff2",
      "sahel": "/uploads/pr/assets/fonts/Sahel-v3.4.0/Farsi-Digits/Sahel-FD.woff2"
    };

    let isVariable = ["vazir", "estedad"].includes(selectedFont);
    loadFont(selectedFont, fontPaths[selectedFont], isVariable);

    document.querySelectorAll("#fontOptions .option-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");

    if (isVariable) {
      document.body.style.fontVariationSettings = `"wght" 450, "KASH" 0`;
    } else {
      document.body.style.removeProperty("font-variation-settings");
    }
  });
});

document.querySelectorAll("#textColorOptions .option-item").forEach(item => {
  item.addEventListener("click", function () {
    document.body.style.color = this.dataset.color;
    document.querySelectorAll("#textColorOptions .option-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll("#titleColorOptions .option-item").forEach(item => {
  item.addEventListener("click", function () {
    document.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(title => {
      title.style.color = this.dataset.color;
    });
    document.querySelectorAll("#titleColorOptions .option-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll("#contrastOptions .option-item").forEach(item => {
  item.addEventListener("click", function () {
    document.body.className = "contrast-mode " + this.dataset.contrast;
    document.querySelectorAll("#contrastOptions .option-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll("#saturationOptions .option-item").forEach(item => {
  item.addEventListener("click", function () {
    document.body.className = "saturation-mode " + this.dataset.saturation;
    document.querySelectorAll("#saturationOptions .option-item").forEach(el => el.classList.remove("active"));
    this.classList.add("active");
  });
});

document.querySelectorAll('.reset-icon').forEach(icon => {
  icon.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    // ریست کردن مقدار اسلایدرها
    if (targetElement.classList.contains('slider-container') && targetElement.noUiSlider) {
      targetElement.noUiSlider.set(1);
    }

    // ریست کردن انتخاب فونت
    if (targetId === 'fontOptions') {
      document.documentElement.style.setProperty('--font-family', 'Dana Variable');
    }

    // ریست کردن رنگ عنوان و متن
    if (targetId === 'titleColorOptions' || targetId === 'textColorOptions') {
      document.documentElement.style.removeProperty('--title-color');
      document.documentElement.style.removeProperty('--text-color');
    }

    // ریست کردن حالت کنتراست
    if (targetId === 'contrastOptions') {
      document.body.className = ''; // حذف همه کلاس‌ها
      document.body.classList.add('normal'); // مقدار پیش‌فرض اضافه شود
    }

    // ریست کردن اشباع رنگ
    if (targetId === 'saturationOptions') {
      document.documentElement.style.removeProperty('--saturation');
    }

    // ریست کردن فیلتر کوررنگی
    if (targetId === 'colorBlindOptions') {
      document.documentElement.style.removeProperty('filter');
    }
  });
});
