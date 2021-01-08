/**
 * Theme.js
 * @author Ciro Arcadio <ciro.arcadio@dnafactory.it>
 *     Just an init script.
 *     Instantiate the main app component with the default theme config.
 */
require([
        'js/theme/main',
        'text!config/theme.json'
    ], function(Theme, themeConfiguration){
    'use strict';

    window.dnatheme = Theme(JSON.parse(themeConfiguration));
});