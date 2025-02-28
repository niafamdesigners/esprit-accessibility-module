# Esprit Accessibility Settings Panel

## Overview
This is a comprehensive accessibility settings panel for websites, aimed at improving the user experience for individuals with various visual or reading impairments. The panel provides multiple customization options to adjust text appearance, color schemes, and visual filters.

## Features

### Text Customization
- **Font Size Adjustment**: Allows users to scale text from 12px to 30px for easier reading
- **Word Spacing Control**: Adjusts the spacing between words from 0px to 10px
- **Line Height Adjustment**: Changes the spacing between lines from 1 to 3 times normal spacing

### Font Options
The panel provides several font choices optimized for readability:
- Vazir (Variable font)
- Estedad (Variable font)
- Shabnam
- Sahel

### Color Customization
- **Title Color Selection**: Change the color of all heading elements (h1-h6)
- **Text Color Selection**: Modify the color of regular text 
- **Contrast Modes**:
  - Dark Contrast
  - Light Contrast
  - High Contrast

### Visual Adaptations
- **Saturation Control**:
  - High Color Saturation
  - Monochrome (Black and White)
  - Low Color Saturation

- **Color Blindness Filters**:
  - Deuteranopia (Green Color Blindness)
  - Protanopia (Red Color Blindness)
  - Tritanopia (Blue Color Blindness)
  - Achromatopsia (Total Color Blindness)

## Implementation

### Dependencies
- [noUiSlider](https://refreshless.com/nouislider/) - For range slider components

### Key Components

#### Slider Creation
The panel uses the `createSlider` function to generate consistent slider experiences:

```javascript
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
```

#### Font Loading System
The panel implements dynamic font loading to ensure optimal performance:

```javascript
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
```

#### Color Filters for Color Blindness
SVG filters are used to simulate different types of color vision deficiencies:

```html
<svg width="0" height="0">
    <defs>
        <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0
                                                  0.7, 0.3, 0, 0, 0
                                                  0, 0.3, 0.7, 0, 0
                                                  0, 0, 0, 1, 0" />
        </filter>
        <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0
                                                  0.558, 0.442, 0, 0, 0
                                                  0, 0.242, 0.758, 0, 0
                                                  0, 0, 0, 1, 0" />
        </filter>
        <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0
                                                  0, 0.433, 0.567, 0, 0
                                                  0, 0.475, 0.525, 0, 0
                                                  0, 0, 0, 1, 0" />
        </filter>
    </defs>
</svg>
```

### Reset Functionality
Each customization section includes a reset button that returns settings to their default values:

```javascript
document.querySelectorAll('.reset-icon').forEach(icon => {
  icon.addEventListener('click', function () {
    const targetId = this.getAttribute('data-target');
    const targetElement = document.getElementById(targetId);

    if (!targetElement) return;

    // Reset specific settings based on target...
  });
});
```

## Usage
To open the accessibility panel, users can click the element with ID "blindness":

```javascript
document.getElementById("blindness").addEventListener("click", function (event) {
  event.preventDefault();
  document.getElementById("offcanvasSettings").classList.toggle("open");
});
```

## Benefits
- **Inclusive Design**: Makes content accessible to users with various visual impairments
- **Improved Readability**: Offers customization options for optimal reading experience
- **Accessibility Compliance**: Helps websites meet WCAG guidelines for accessibility
- **User Autonomy**: Allows users to personalize their browsing experience
- **RTL Support**: Fully supports right-to-left languages with appropriate font options

## Installation
1. Include the HTML panel structure in your website
2. Add the JavaScript functionality
3. Include the noUiSlider library
4. Ensure the Reset SVG icons are available
5. Customize font paths as needed for your deployment

## Contribution
Feel free to contribute to this project by submitting issues or pull requests for additional accessibility features.
