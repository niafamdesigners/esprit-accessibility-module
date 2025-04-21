/**
 * مدیریت تنظیمات دسترسی‌پذیری
 * این فایل شامل ساختار JSON و توابع مورد نیاز برای مدیریت تنظیمات دسترسی‌پذیری است
 */

// تابع بهبود نمایش گزینه‌های رنگ فعال
function enhanceActiveColorOptions() {
  // ابتدا همه استایل‌های قبلی را پاک می‌کنیم
  document.querySelectorAll('#titleColorOptions .option-item, #textColorOptions .option-item').forEach(item => {
    item.style.removeProperty('box-shadow');
    item.style.removeProperty('transform');
    item.style.removeProperty('z-index');
    item.style.removeProperty('position');
  });
  
  // اعمال استایل ویژه به گزینه‌های رنگ فعال
  document.querySelectorAll('#titleColorOptions .option-item.active, #textColorOptions .option-item.active').forEach(item => {
    // اگر رنگی انتخاب شده باشد، استایل مخصوص را اعمال می‌کنیم
    if (item.dataset.color) {
      item.style.boxShadow = '0 0 0 3px #fff, 0 0 0 6px ' + item.dataset.color;
      item.style.transform = 'scale(1.15)';
      item.style.zIndex = '5';
      item.style.position = 'relative';
    }
  });
  
  // برای حالتی که هیچ رنگی انتخاب نشده باشد، می‌توان کد خاصی اضافه کرد
  if (!document.querySelector('#titleColorOptions .option-item.active')) {
    // گزینه بازگشت به حالت پیش‌فرض را نمایش می‌دهیم
    const resetButton = document.querySelector('#titleColorOptions .reset-icon');
    if (resetButton) {
      resetButton.style.opacity = '1';
      resetButton.style.transform = 'scale(1.1)';
    }
  }
  
  if (!document.querySelector('#textColorOptions .option-item.active')) {
    // گزینه بازگشت به حالت پیش‌فرض را نمایش می‌دهیم
    const resetButton = document.querySelector('#textColorOptions .reset-icon');
    if (resetButton) {
      resetButton.style.opacity = '1';
      resetButton.style.transform = 'scale(1.1)';
    }
  }
}

// تابع اعمال رنگ عنوان
function applyTitleColor(color) {
  // انتخاب همه عناصر عنوان استاندارد
  const headingElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, .title, .heading, .a11y-heading');
  
  // حذف کلاس قبلی از همه المان‌ها
  document.querySelectorAll('.a11y-title-colored').forEach(el => {
    el.classList.remove('a11y-title-colored');
    el.style.removeProperty('color');
  });
  
  if (color) {
    // تنظیم متغیر CSS برای استفاده در استایل‌ها
    document.documentElement.style.setProperty('--a11y-heading-color', color);
    
    // ایجاد یا به‌روزرسانی استایل عمومی
    let styleElement = document.getElementById('a11y-title-color-style');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'a11y-title-color-style';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = `.a11y-title-colored { color: ${color} !important; }`;
    
    // اعمال کلاس به همه عناصر عنوان
    headingElements.forEach(el => {
      el.classList.add('a11y-title-colored');
    });
  } else {
    // حذف متغیر CSS
    document.documentElement.style.removeProperty('--a11y-heading-color');
    
    // حذف استایل عمومی
    const styleElement = document.getElementById('a11y-title-color-style');
    if (styleElement) {
      styleElement.textContent = '';
    }
  }
}

// تابع اعمال رنگ متن
function applyTextColor(color) {
  // انتخاب همه عناصر متن استاندارد
  const textElements = document.querySelectorAll('p, .text, .content, .description, .a11y-text');
  
  // حذف کلاس قبلی از همه المان‌ها
  document.querySelectorAll('.a11y-text-colored').forEach(el => {
    el.classList.remove('a11y-text-colored');
    el.style.removeProperty('color');
  });
  
  if (color) {
    // تنظیم متغیر CSS برای استفاده در استایل‌ها
    document.documentElement.style.setProperty('--a11y-text-color', color);
    
    // ایجاد یا به‌روزرسانی استایل عمومی
    let styleElement = document.getElementById('a11y-text-color-style');
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'a11y-text-color-style';
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = `.a11y-text-colored { color: ${color} !important; }`;
    
    // اعمال کلاس به همه عناصر متن که عنوان نیستند
    textElements.forEach(el => {
      // اگر این المان در داخل عناصر عنوان نباشد و قبلاً رنگ عنوان نگرفته باشد
      if (!el.classList.contains('a11y-title-colored') && 
          !el.closest('.a11y-title-colored, h1, h2, h3, h4, h5, h6, .title, .heading, .a11y-heading')) {
        el.classList.add('a11y-text-colored');
      }
    });
    
    // اعمال کلاس به المان‌های div و span که متن مستقیم دارند
    document.querySelectorAll('div:not(.option-item):not(.options-grid):not(.offcanvas-settings__item), span:not(.info-icon):not(.info-text)').forEach(el => {
      // اگر المان فرزند متنی مستقیم دارد و عنوان نیست و قبلاً رنگ نگرفته و در داخل المان‌های خاص پنل تنظیمات نیست
      if (hasDirectTextChild(el) && 
          !el.classList.contains('a11y-title-colored') && 
          !el.closest('.a11y-title-colored, h1, h2, h3, h4, h5, h6, .title, .heading, .a11y-heading, .offcanvas, .offcanvas-title, .offcanvas-body, .options-grid, .offcanvas-settings__item') &&
          !el.classList.contains('option-item')) {
        el.classList.add('a11y-text-colored');
      }
    });
    
    // تگ‌های خاص دیگر که معمولاً متن دارند و باید رنگ دریافت کنند
    document.querySelectorAll('td, th, li:not(.option-item), label:not(.offcanvas-settings__item label), button:not(.close)').forEach(el => {
      if (hasDirectTextChild(el) && 
          !el.classList.contains('a11y-title-colored') && 
          !el.closest('.a11y-title-colored, h1, h2, h3, h4, h5, h6, .title, .heading, .a11y-heading, .offcanvas, .offcanvas-body, .options-grid, .offcanvas-settings__item')) {
        el.classList.add('a11y-text-colored');
      }
    });
  } else {
    // حذف متغیر CSS
    document.documentElement.style.removeProperty('--a11y-text-color');
    
    // حذف استایل عمومی
    const styleElement = document.getElementById('a11y-text-color-style');
    if (styleElement) {
      styleElement.textContent = '';
    }
  }
}

// تابع کمکی برای بررسی اینکه آیا یک المان فرزند متنی مستقیم دارد
function hasDirectTextChild(element) {
  let hasText = false;
  for (let i = 0; i < element.childNodes.length; i++) {
    const node = element.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
      hasText = true;
      break;
    }
  }
  return hasText;
}

// تعریف ساختار JSON برای ذخیره مقادیر پیش‌فرض و مقادیر فعلی هر آیتم
const accessibilitySettings = {
  fontSizeSlider: {
    defaultValue: 16, // مقدار پیش‌فرض (پیکسل)
    currentValue: 16
  },
  wordSpacingSlider: {
    defaultValue: 1, // مقدار پیش‌فرض (پیکسل)
    currentValue: 1
  },
  lineHeightSlider: {
    defaultValue: 1.5, // مقدار پیش‌فرض
    currentValue: 1.5
  },
  fontOptions: {
    defaultValue: null, // فونت پیش‌فرض (null به معنای استفاده از فونت وبسایت)
    currentValue: null
  },
  titleColorOptions: {
    defaultValue: null, // رنگ پیش‌فرض عنوان (null به معنای استفاده از رنگ پیش‌فرض وبسایت)
    currentValue: null
  },
  textColorOptions: {
    defaultValue: null, // رنگ پیش‌فرض متن (null به معنای استفاده از رنگ پیش‌فرض وبسایت)
    currentValue: null
  },
  contrastOptions: {
    defaultValue: null, // بدون کنتراست خاص
    currentValue: null
  },
  saturationOptions: {
    defaultValue: null, // بدون تغییر اشباع رنگی
    currentValue: null
  },
  colorBlindOptions: {
    defaultValue: "none", // بدون فیلتر کوررنگی
    currentValue: "none"
  },
  highlightLinksOptions: {
    defaultValue: "off", // عدم نمایان‌سازی لینک‌ها
    currentValue: "off"
  },
  hideImagesOptions: {
    defaultValue: "show", // نمایش تصاویر
    currentValue: "show"
  },
  cursorOptions: {
    defaultValue: "default", // نشانگر پیش‌فرض
    currentValue: "default"
  }
};

// برای ذخیره مقادیر اولیه اسلایدرها در هنگام ایجاد
function storeInitialValues() {
  // ذخیره مقدار اولیه فونت سایز
  if (document.getElementById('fontSizeSlider') && document.getElementById('fontSizeSlider').noUiSlider) {
    const value = document.getElementById('fontSizeSlider').noUiSlider.get();
    accessibilitySettings.fontSizeSlider.defaultValue = parseFloat(value);
    accessibilitySettings.fontSizeSlider.currentValue = parseFloat(value);
  }

  // ذخیره مقدار اولیه فاصله بین کلمات
  if (document.getElementById('wordSpacingSlider') && document.getElementById('wordSpacingSlider').noUiSlider) {
    const value = document.getElementById('wordSpacingSlider').noUiSlider.get();
    accessibilitySettings.wordSpacingSlider.defaultValue = parseFloat(value);
    accessibilitySettings.wordSpacingSlider.currentValue = parseFloat(value);
  }

  // ذخیره مقدار اولیه فاصله بین خطوط
  if (document.getElementById('lineHeightSlider') && document.getElementById('lineHeightSlider').noUiSlider) {
    const value = document.getElementById('lineHeightSlider').noUiSlider.get();
    accessibilitySettings.lineHeightSlider.defaultValue = parseFloat(value);
    accessibilitySettings.lineHeightSlider.currentValue = parseFloat(value);
  }

  // ذخیره مقادیر اولیه سایر گزینه‌ها
  const fontActive = document.querySelector('#fontOptions .option-item.active');
  if (fontActive) {
    accessibilitySettings.fontOptions.defaultValue = fontActive.dataset.font;
    accessibilitySettings.fontOptions.currentValue = fontActive.dataset.font;
  } else {
    // اگر هیچ فونتی فعال نیست، null استفاده می‌شود که به معنای فونت پیش‌فرض وبسایت است
    accessibilitySettings.fontOptions.defaultValue = null;
    accessibilitySettings.fontOptions.currentValue = null;
  }

  const titleColorActive = document.querySelector('#titleColorOptions .option-item.active');
  if (titleColorActive) {
    accessibilitySettings.titleColorOptions.defaultValue = titleColorActive.dataset.color;
    accessibilitySettings.titleColorOptions.currentValue = titleColorActive.dataset.color;
  }

  const textColorActive = document.querySelector('#textColorOptions .option-item.active');
  if (textColorActive) {
    accessibilitySettings.textColorOptions.defaultValue = textColorActive.dataset.color;
    accessibilitySettings.textColorOptions.currentValue = textColorActive.dataset.color;
  }

  const contrastActive = document.querySelector('#contrastOptions .option-item.active');
  if (contrastActive) {
    accessibilitySettings.contrastOptions.defaultValue = contrastActive.dataset.contrast;
    accessibilitySettings.contrastOptions.currentValue = contrastActive.dataset.contrast;
  }

  const saturationActive = document.querySelector('#saturationOptions .option-item.active');
  if (saturationActive) {
    accessibilitySettings.saturationOptions.defaultValue = saturationActive.dataset.saturation;
    accessibilitySettings.saturationOptions.currentValue = saturationActive.dataset.saturation;
  }

  const colorBlindActive = document.querySelector('#colorBlindOptions .option-item.active');
  if (colorBlindActive) {
    accessibilitySettings.colorBlindOptions.defaultValue = colorBlindActive.dataset.filter;
    accessibilitySettings.colorBlindOptions.currentValue = colorBlindActive.dataset.filter;
  }

  const highlightLinksActive = document.querySelector('#highlightLinksOptions .option-item.active');
  if (highlightLinksActive) {
    accessibilitySettings.highlightLinksOptions.defaultValue = highlightLinksActive.dataset.highlight;
    accessibilitySettings.highlightLinksOptions.currentValue = highlightLinksActive.dataset.highlight;
  }

  const hideImagesActive = document.querySelector('#hideImagesOptions .option-item.active');
  if (hideImagesActive) {
    accessibilitySettings.hideImagesOptions.defaultValue = hideImagesActive.dataset.images;
    accessibilitySettings.hideImagesOptions.currentValue = hideImagesActive.dataset.images;
  }

  const cursorActive = document.querySelector('#cursorOptions .option-item.active');
  if (cursorActive) {
    accessibilitySettings.cursorOptions.defaultValue = cursorActive.dataset.cursor;
    accessibilitySettings.cursorOptions.currentValue = cursorActive.dataset.cursor;
  }
  
  // ذخیره تنظیمات اولیه
  saveSettings();
  console.log('Initial settings stored', accessibilitySettings);
}

// بروزرسانی مقادیر فعلی در هنگام تغییر توسط کاربر
function updateCurrentValue(targetId, value) {
  if (accessibilitySettings[targetId]) {
    accessibilitySettings[targetId].currentValue = value;
    // ذخیره تنظیمات در localStorage
    saveSettings();
  }
}

// ذخیره تنظیمات کاربر در localStorage
function saveSettings() {
  localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
}

// بارگیری تنظیمات کاربر از localStorage
function loadSettings() {
  const savedSettings = localStorage.getItem('accessibilitySettings');
  if (savedSettings) {
    const parsedSettings = JSON.parse(savedSettings);
    
    // آپدیت مقادیر فعلی با مقادیر ذخیره شده
    for (const key in parsedSettings) {
      if (accessibilitySettings[key]) {
        accessibilitySettings[key].currentValue = parsedSettings[key].currentValue;
      }
    }
    
    // اعمال همه تنظیمات روی UI
    applyAllSettings();
  }
}

// اعمال همه تنظیمات روی UI
function applyAllSettings() {
  // اعمال اندازه فونت
  if (document.getElementById('fontSizeSlider') && document.getElementById('fontSizeSlider').noUiSlider) {
    document.getElementById('fontSizeSlider').noUiSlider.set(accessibilitySettings.fontSizeSlider.currentValue);
    document.body.style.fontSize = accessibilitySettings.fontSizeSlider.currentValue + "px";
  }
  
  // اعمال فاصله بین کلمات
  if (document.getElementById('wordSpacingSlider') && document.getElementById('wordSpacingSlider').noUiSlider) {
    document.getElementById('wordSpacingSlider').noUiSlider.set(accessibilitySettings.wordSpacingSlider.currentValue);
    document.body.style.wordSpacing = accessibilitySettings.wordSpacingSlider.currentValue + "px";
  }
  
  // اعمال فاصله بین خطوط
  if (document.getElementById('lineHeightSlider') && document.getElementById('lineHeightSlider').noUiSlider) {
    document.getElementById('lineHeightSlider').noUiSlider.set(accessibilitySettings.lineHeightSlider.currentValue);
    document.body.style.lineHeight = accessibilitySettings.lineHeightSlider.currentValue;
  }
  
  // اعمال فونت
  const fontValue = accessibilitySettings.fontOptions.currentValue;
  if (fontValue) {
    // پیدا کردن المان مربوط به فونت انتخاب شده
    const fontElement = document.querySelector(`#fontOptions .option-item[data-font="${fontValue}"]`);
    if (fontElement) {
      // شبیه‌سازی کلیک روی المان
      fontElement.click();
    }
  } else {
    // اگر فونتی انتخاب نشده، فونت به حالت پیش‌فرض وبسایت برگردد
    document.body.style.fontFamily = '';
    document.body.style.removeProperty('font-variation-settings');
  }
  
  // اعمال رنگ عنوان
  const titleColorValue = accessibilitySettings.titleColorOptions.currentValue;
  if (titleColorValue) {
    // حذف کلاس active از سایر گزینه‌ها
    document.querySelectorAll('#titleColorOptions .option-item').forEach(el => {
      if (el !== document.querySelector(`#titleColorOptions .option-item[data-color="${titleColorValue}"]`)) {
        el.classList.remove('active');
        el.style.removeProperty('box-shadow');
        el.style.removeProperty('transform');
        el.style.removeProperty('z-index');
        el.style.removeProperty('position');
      }
    });
    
    updateCurrentValue('titleColorOptions', titleColorValue);
    // فراخوانی تابع جدید برای اعمال رنگ عنوان
    applyTitleColor(titleColorValue);
  }
  
  // اعمال رنگ متن
  const textColorValue = accessibilitySettings.textColorOptions.currentValue;
  if (textColorValue) {
    // حذف کلاس active از سایر گزینه‌ها
    document.querySelectorAll('#textColorOptions .option-item').forEach(el => {
      if (el !== document.querySelector(`#textColorOptions .option-item[data-color="${textColorValue}"]`)) {
        el.classList.remove('active');
        el.style.removeProperty('box-shadow');
        el.style.removeProperty('transform');
        el.style.removeProperty('z-index');
        el.style.removeProperty('position');
      }
    });
    
    updateCurrentValue('textColorOptions', textColorValue);
    // فراخوانی تابع جدید برای اعمال رنگ متن
    applyTextColor(textColorValue);
  }
  
  // اعمال حالت کنتراست
  const contrastValue = accessibilitySettings.contrastOptions.currentValue;
  if (contrastValue) {
    const contrastElement = document.querySelector(`#contrastOptions .option-item[data-contrast="${contrastValue}"]`);
    if (contrastElement) {
      contrastElement.click();
    }
  }
  
  // اعمال اشباع رنگ
  const saturationValue = accessibilitySettings.saturationOptions.currentValue;
  if (saturationValue) {
    const saturationElement = document.querySelector(`#saturationOptions .option-item[data-saturation="${saturationValue}"]`);
    if (saturationElement) {
      saturationElement.click();
    }
  }
  
  // اعمال فیلتر کوررنگی
  const colorBlindValue = accessibilitySettings.colorBlindOptions.currentValue;
  if (colorBlindValue) {
    const colorBlindElement = document.querySelector(`#colorBlindOptions .option-item[data-filter="${colorBlindValue}"]`);
    if (colorBlindElement) {
      colorBlindElement.click();
    }
  }
  
  // اعمال نمایان‌سازی لینک‌ها
  const highlightLinksValue = accessibilitySettings.highlightLinksOptions.currentValue;
  if (highlightLinksValue) {
    const highlightLinksElement = document.querySelector(`#highlightLinksOptions .option-item[data-highlight="${highlightLinksValue}"]`);
    if (highlightLinksElement) {
      highlightLinksElement.click();
    }
  }
  
  // اعمال نمایش تصاویر
  const hideImagesValue = accessibilitySettings.hideImagesOptions.currentValue;
  if (hideImagesValue) {
    const hideImagesElement = document.querySelector(`#hideImagesOptions .option-item[data-images="${hideImagesValue}"]`);
    if (hideImagesElement) {
      hideImagesElement.click();
    }
  }
  
  // اعمال نشانگر موس
  const cursorValue = accessibilitySettings.cursorOptions.currentValue;
  if (cursorValue) {
    const cursorElement = document.querySelector(`#cursorOptions .option-item[data-cursor="${cursorValue}"]`);
    if (cursorElement) {
      cursorElement.classList.add('active');
    }
  }
  
  // بهبود نمایش گزینه‌های رنگ فعال
  enhanceActiveColorOptions();
}

// تابع بازنشانی تنظیمات به مقدار پیش‌فرض
function resetSetting(targetId) {
  if (!accessibilitySettings[targetId]) {
    console.error(`Setting ${targetId} not found in settings object`);
    return;
  }
  
  console.log('Resetting', targetId, 'from', accessibilitySettings[targetId].currentValue, 'to', accessibilitySettings[targetId].defaultValue);
  
  // بازنشانی مقدار فعلی به مقدار پیش‌فرض
  accessibilitySettings[targetId].currentValue = accessibilitySettings[targetId].defaultValue;
  
  // اعمال مقدار جدید بر روی المان‌های UI
  switch(targetId) {
    case 'fontSizeSlider':
      if (document.getElementById('fontSizeSlider') && document.getElementById('fontSizeSlider').noUiSlider) {
        document.getElementById('fontSizeSlider').noUiSlider.set(accessibilitySettings[targetId].defaultValue);
      }
      break;
    
    case 'wordSpacingSlider':
      if (document.getElementById('wordSpacingSlider') && document.getElementById('wordSpacingSlider').noUiSlider) {
        document.getElementById('wordSpacingSlider').noUiSlider.set(accessibilitySettings[targetId].defaultValue);
      }
      break;
    
    case 'lineHeightSlider':
      if (document.getElementById('lineHeightSlider') && document.getElementById('lineHeightSlider').noUiSlider) {
        document.getElementById('lineHeightSlider').noUiSlider.set(accessibilitySettings[targetId].defaultValue);
      }
      break;
    
    case 'fontOptions':
      if (accessibilitySettings[targetId].defaultValue) {
        const fontElement = document.querySelector(`#fontOptions .option-item[data-font="${accessibilitySettings[targetId].defaultValue}"]`);
        if (fontElement) {
          fontElement.click();
        }
      } else {
        // بازگرداندن به فونت پیش‌فرض وبسایت
        document.body.style.fontFamily = '';
        document.body.style.removeProperty('font-variation-settings');
        
        // حذف کلاس active از همه گزینه‌های فونت
        document.querySelectorAll('#fontOptions .option-item').forEach(el => {
          el.classList.remove('active');
        });
        
        // به‌روزرسانی مقدار در تنظیمات
        accessibilitySettings[targetId].currentValue = null;
        saveSettings();
        
        console.log('Font reset to website default');
        
        // برگشت زودهنگام چون همه عملیات لازم را انجام دادیم
        return;
      }
      break;
    
    case 'titleColorOptions':
      // استفاده از تابع جدید برای بازنشانی رنگ عنوان
      applyTitleColor(accessibilitySettings[targetId].defaultValue);
      
      // حذف کلاس active از همه گزینه‌ها
      document.querySelectorAll('#titleColorOptions .option-item').forEach(el => {
        el.classList.remove('active');
      });
      
      // اگر رنگ پیش‌فرض تعیین شده باشد، گزینه مربوطه را فعال می‌کنیم
      if (accessibilitySettings[targetId].defaultValue) {
        const titleColorElement = document.querySelector(`#titleColorOptions .option-item[data-color="${accessibilitySettings[targetId].defaultValue}"]`);
        if (titleColorElement) {
          titleColorElement.classList.add('active');
        }
      } else {
        // چون مقدار پیش‌فرض null است، رنگ عنوان را به حالت پیش‌فرض وبسایت برمی‌گردانیم
        
        // حذف کلاس و استایل از همه المان‌ها
        document.querySelectorAll('.a11y-title-colored').forEach(el => {
          el.classList.remove('a11y-title-colored');
          el.style.removeProperty('color');
        });
        
        // حذف استایل عمومی
        const styleElement = document.getElementById('a11y-title-color-style');
        if (styleElement) {
          styleElement.textContent = '';
        }
        
        // حذف متغیر CSS
        document.documentElement.style.removeProperty('--a11y-heading-color');
        
        // به‌روزرسانی مقدار در تنظیمات
        accessibilitySettings[targetId].currentValue = null;
        saveSettings();
        
        console.log('Title color reset to website default');
      }
      
      // بروزرسانی استایل‌ها
      enhanceActiveColorOptions();
      break;
    
    case 'textColorOptions':
      // استفاده از تابع جدید برای بازنشانی رنگ متن
      applyTextColor(accessibilitySettings[targetId].defaultValue);
      
      // حذف کلاس active از همه گزینه‌ها
      document.querySelectorAll('#textColorOptions .option-item').forEach(el => {
        el.classList.remove('active');
      });
      
      // اگر رنگ پیش‌فرض تعیین شده باشد، گزینه مربوطه را فعال می‌کنیم
      if (accessibilitySettings[targetId].defaultValue) {
        const textColorElement = document.querySelector(`#textColorOptions .option-item[data-color="${accessibilitySettings[targetId].defaultValue}"]`);
        if (textColorElement) {
          textColorElement.classList.add('active');
        }
      } else {
        // چون مقدار پیش‌فرض null است، رنگ متن را به حالت پیش‌فرض وبسایت برمی‌گردانیم
        
        // حذف کلاس و استایل از همه المان‌ها
        document.querySelectorAll('.a11y-text-colored').forEach(el => {
          el.classList.remove('a11y-text-colored');
          el.style.removeProperty('color');
        });
        
        // حذف استایل عمومی
        const styleElement = document.getElementById('a11y-text-color-style');
        if (styleElement) {
          styleElement.textContent = '';
        }
        
        // حذف متغیر CSS
        document.documentElement.style.removeProperty('--a11y-text-color');
        
        // به‌روزرسانی مقدار در تنظیمات
        accessibilitySettings[targetId].currentValue = null;
        saveSettings();
        
        console.log('Text color reset to website default');
      }
      
      // بروزرسانی استایل‌ها
      enhanceActiveColorOptions();
      break;
    
    case 'contrastOptions':
      // حذف رنگ پس‌زمینه و رنگ متن
      document.documentElement.style.removeProperty('--contrast-bg');
      document.documentElement.style.removeProperty('--contrast-text');
      
      // حذف کلاس از body
      document.body.classList.remove('contrast-mode');
      document.body.classList.remove('dark');
      document.body.classList.remove('light');
      document.body.classList.remove('high');
      
      // حذف کلاس active از همه گزینه‌ها
      document.querySelectorAll('#contrastOptions .option-item').forEach(el => {
        el.classList.remove('active');
      });
      
      // به‌روزرسانی مقدار در تنظیمات
      accessibilitySettings[targetId].currentValue = accessibilitySettings[targetId].defaultValue;
      saveSettings();
      break;
    
    case 'saturationOptions':
      if (accessibilitySettings[targetId].defaultValue) {
        const saturationElement = document.querySelector(`#saturationOptions .option-item[data-saturation="${accessibilitySettings[targetId].defaultValue}"]`);
        if (saturationElement) {
          saturationElement.click();
        }
      } else {
        // حالت پیش‌فرض بدون تغییر اشباع رنگی
        document.body.classList.remove('saturation-mode', 'saturation-high', 'saturation-monochrome', 'saturation-low');
        
        // حذف کلاس active از همه گزینه‌های اشباع رنگ
        document.querySelectorAll('#saturationOptions .option-item').forEach(el => {
          el.classList.remove('active');
        });
        
        // به‌روزرسانی مقدار در تنظیمات
        accessibilitySettings[targetId].currentValue = null;
        saveSettings();
        
        console.log('Saturation reset to website default');
      }
      break;
    
    case 'colorBlindOptions':
      if (accessibilitySettings[targetId].defaultValue === 'none' || !accessibilitySettings[targetId].defaultValue) {
        // حالت پیش‌فرض بدون فیلتر کوررنگی
        document.documentElement.style.filter = '';
        // انتخاب گزینه بدون فیلتر
        const noneFilterElement = document.querySelector('#colorBlindOptions .option-item[data-filter="none"]');
        if (noneFilterElement) {
          noneFilterElement.click();
        }
      } else {
        const colorBlindElement = document.querySelector(`#colorBlindOptions .option-item[data-filter="${accessibilitySettings[targetId].defaultValue}"]`);
        if (colorBlindElement) {
          colorBlindElement.click();
        }
      }
      break;
    
    case 'highlightLinksOptions':
      const highlightLinksElement = document.querySelector(`#highlightLinksOptions .option-item[data-highlight="${accessibilitySettings[targetId].defaultValue}"]`);
      if (highlightLinksElement) {
        highlightLinksElement.click();
      }
      break;
    
    case 'hideImagesOptions':
      const hideImagesElement = document.querySelector(`#hideImagesOptions .option-item[data-images="${accessibilitySettings[targetId].defaultValue}"]`);
      if (hideImagesElement) {
        hideImagesElement.click();
      }
      break;
    
    case 'cursorOptions':
      const cursorElement = document.querySelector(`#cursorOptions .option-item[data-cursor="${accessibilitySettings[targetId].defaultValue}"]`);
      if (cursorElement) {
        cursorElement.click();
      }
      break;
  }
  
  // ذخیره تنظیمات جدید
  saveSettings();
}

// راه‌اندازی اولیه
document.addEventListener('DOMContentLoaded', function() {
  // نباید گوش‌دهنده‌های رویداد را مستقیماً اضافه کنیم چون در اسکریپت اصلی قبلاً اضافه شده‌اند
  // فقط به تابع‌های موجود گوش دهیم
  
  // برای ذخیره مقادیر از روی اسلایدرها پس از بارگذاری صفحه
  setTimeout(function() {
    storeInitialValues();
    
    // گوش دادن به تغییرات اسلایدرها
    listenToSliderChanges();
    
    // گوش دادن به کلیک‌های دکمه‌های ریست
    updateResetButtonListeners();
    
    // بارگیری تنظیمات ذخیره شده
    loadSettings();
  }, 1000); // کمی تأخیر برای اطمینان از اینکه اسلایدرها و سایر گزینه‌ها کاملاً راه‌اندازی شده‌اند
});

// گوش دادن به تغییرات اسلایدرها
function listenToSliderChanges() {
  // اسلایدر اندازه فونت
  if (document.getElementById('fontSizeSlider') && document.getElementById('fontSizeSlider').noUiSlider) {
    document.getElementById('fontSizeSlider').noUiSlider.on('update', function(values, handle) {
      const value = parseFloat(values[handle]);
      updateCurrentValue('fontSizeSlider', value);
    });
  }
  
  // اسلایدر فاصله بین کلمات
  if (document.getElementById('wordSpacingSlider') && document.getElementById('wordSpacingSlider').noUiSlider) {
    document.getElementById('wordSpacingSlider').noUiSlider.on('update', function(values, handle) {
      const value = parseFloat(values[handle]);
      updateCurrentValue('wordSpacingSlider', value);
    });
  }
  
  // اسلایدر فاصله بین خطوط
  if (document.getElementById('lineHeightSlider') && document.getElementById('lineHeightSlider').noUiSlider) {
    document.getElementById('lineHeightSlider').noUiSlider.on('update', function(values, handle) {
      const value = parseFloat(values[handle]);
      updateCurrentValue('lineHeightSlider', value);
    });
  }
  
  // گوش دادن به تغییرات گزینه‌های کلیکی
  listenToClickableOptions();
}

// گوش دادن به تغییرات گزینه‌های کلیکی
function listenToClickableOptions() {
  // به جای افزودن مستقیم رویدادها، از MutationObserver استفاده می‌کنیم
  // تا تغییرات المان‌ها را دنبال کنیم
  
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        
        // اگر یک گزینه‌ی کلیکی فعال شده باشد
        if (target.classList.contains('active')) {
          const parent = target.closest('.offcanvas-settings__item');
          if (!parent) return;
          
          // یافتن آیکون ریست برای تعیین نوع تنظیم
          const resetIcon = parent.querySelector('.reset-icon');
          if (!resetIcon) return;
          
          const targetId = resetIcon.getAttribute('data-target');
          
          // ذخیره مقدار جدید بر اساس نوع تنظیم
          if (targetId === 'fontOptions' && target.dataset.font) {
            updateCurrentValue(targetId, target.dataset.font);
          } else if (targetId === 'titleColorOptions' && target.dataset.color) {
            // حذف کلاس active از سایر گزینه‌های رنگ عنوان
            document.querySelectorAll('#titleColorOptions .option-item').forEach(el => {
              if (el !== target) {
                el.classList.remove('active');
              }
            });
            
            updateCurrentValue(targetId, target.dataset.color);
            // فراخوانی تابع جدید برای اعمال رنگ عنوان
            applyTitleColor(target.dataset.color);
          } else if (targetId === 'textColorOptions' && target.dataset.color) {
            // حذف کلاس active از سایر گزینه‌های رنگ متن
            document.querySelectorAll('#textColorOptions .option-item').forEach(el => {
              if (el !== target) {
                el.classList.remove('active');
              }
            });
            
            updateCurrentValue(targetId, target.dataset.color);
            // فراخوانی تابع جدید برای اعمال رنگ متن
            applyTextColor(target.dataset.color);
          } else if (targetId === 'contrastOptions' && target.dataset.contrast) {
            updateCurrentValue(targetId, target.dataset.contrast);
          } else if (targetId === 'saturationOptions' && target.dataset.saturation) {
            updateCurrentValue(targetId, target.dataset.saturation);
          } else if (targetId === 'colorBlindOptions' && target.dataset.filter) {
            updateCurrentValue(targetId, target.dataset.filter);
          } else if (targetId === 'highlightLinksOptions' && target.dataset.highlight) {
            updateCurrentValue(targetId, target.dataset.highlight);
          } else if (targetId === 'hideImagesOptions' && target.dataset.images) {
            updateCurrentValue(targetId, target.dataset.images);
          } else if (targetId === 'cursorOptions' && target.dataset.cursor) {
            updateCurrentValue(targetId, target.dataset.cursor);
          }
          
          // اگر تغییری در گزینه‌های رنگ انجام شده، ظاهر گزینه انتخاب شده را بهبود می‌دهیم
          if (targetId === 'titleColorOptions' || targetId === 'textColorOptions') {
            // این تاخیر کوتاه به منظور اطمینان از اعمال کلاس active به گزینه است
            setTimeout(enhanceActiveColorOptions, 50);
          }
        } else if (mutation.oldValue && mutation.oldValue.includes('active')) {
          // اگر گزینه‌ای از حالت فعال خارج شده است
          const parent = target.closest('.offcanvas-settings__item');
          if (!parent) return;
          
          // یافتن آیکون ریست برای تعیین نوع تنظیم
          const resetIcon = parent.querySelector('.reset-icon');
          if (!resetIcon) return;
          
          const targetId = resetIcon.getAttribute('data-target');
          
          // بررسی اگر همه گزینه‌های این نوع تنظیم غیرفعال هستند
          if (targetId === 'fontOptions') {
            const anyActive = parent.querySelector('.option-item.active');
            if (!anyActive) {
              // هیچ گزینه‌ای فعال نیست، بنابراین به فونت پیش‌فرض وبسایت برمی‌گردیم
              updateCurrentValue(targetId, null);
              // بازگرداندن استایل
              document.body.style.fontFamily = '';
              document.body.style.removeProperty('font-variation-settings');
              console.log('Font reset to website default (all options inactive)');
            }
          }
        }
      }
    });
  });
  
  // پیکربندی MutationObserver برای دنبال کردن تغییرات کلاس در همه گزینه‌های کلیکی
  document.querySelectorAll('.option-item').forEach(function(item) {
    observer.observe(item, { attributes: true, attributeOldValue: true });
  });
}

// به‌روزرسانی گوش‌دهنده‌های رویداد برای دکمه‌های ریست
function updateResetButtonListeners() {
  // از رویدادهای mousedown/mouseup استفاده می‌کنیم تا با رویدادهای click موجود تداخل نداشته باشد
  console.log('Setting up reset button listeners');
  document.querySelectorAll('.reset-icon').forEach(button => {
    // ابتدا همه رویدادهای قبلی را حذف کنیم
    const clonedButton = button.cloneNode(true);
    button.parentNode.replaceChild(clonedButton, button);
    
    // افزودن رویداد جدید
    clonedButton.addEventListener('mousedown', function(e) {
      console.log('Reset button clicked', this.getAttribute('data-target'));
      // جلوگیری از انتشار رویداد تا با رویداد click تداخل نداشته باشد
      e.stopPropagation();
      e.preventDefault();
      
      const targetId = this.getAttribute('data-target');
      resetSetting(targetId);
      return false;
    });
  });
} 