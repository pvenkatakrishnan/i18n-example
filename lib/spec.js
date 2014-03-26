'use strict';
var express = require('express');


module.exports = function spec(app) {

    return {
        onconfig: function (config, next) {
            var i18n = config.get('i18n');

            // Setup dev-tools for i18n compiling
            if (i18n && config.get('middleware:devtools')) {
                config.set('middleware:devtools:i18n', i18n);
            }

            // Setup engine-munger for i18n and / or specialization
            var engine = {
                'views': config.get('express:views'),
                'view engine': config.get('express:view engine'),
                'specialization': config.get('specialization'),
                'i18n': i18n
            };

            //this is only in dev mode
            if(config.get('view engines:dust')) {
                config.get('view engines:dust:renderer:arguments').push(engine);
            }

            config.get('view engines:js:renderer:arguments').push(engine, app);

            next(null, config);
        }
    };

};