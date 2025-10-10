module.exports = {
  plugins: [
    require('postcss-preset-env')({
      stage: 1,
      features: {
        'custom-properties': true,
        'nesting-rules': true,
        'custom-media-queries': true,
        'media-queries-aspect-ratio': true,
        'custom-selectors': true,
        'logical-properties-and-values': true,
        'overflow-property': true,
        'font-format-keywords': true,
        'color-functional-notation': true,
        'cascade-layers': true,
        'is-pseudo-class': true,
        'focus-visible-pseudo-class': true,
        'focus-within-pseudo-class': true,
        'any-link-pseudo-class': true,
        'logical-resize': true,
        'logical-viewport-units': true,
        'custom-media-queries': true,
        'media-queries-aspect-ratio': true,
        'custom-selectors': true,
        'logical-properties-and-values': true,
        'overflow-property': true,
        'font-format-keywords': true,
        'color-functional-notation': true,
        'cascade-layers': true,
        'is-pseudo-class': true,
        'focus-visible-pseudo-class': true,
        'focus-within-pseudo-class': true,
        'any-link-pseudo-class': true,
        'logical-resize': true,
        'logical-viewport-units': true
      }
    }),
    require('autoprefixer')({
      overrideBrowserslist: [
        '> 1%',
        'last 2 versions',
        'not dead'
      ]
    })
  ]
};