'use strict';

var defaultResolve = require('part:@sanity/base/document-badges');
var ScheduledBadge = require('./ScheduledBadge-8b974f15.js');
require('date-fns');
require('./usePollSchedules-a51955a4.js');
require('react');
require('swr');
require('part:@sanity/base/client');
require('tslib');
require('@sanity/ui');
require('pluralize');
require('@sanity/icons');
require('debug');
require('date-fns-tz');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var defaultResolve__default = /*#__PURE__*/_interopDefaultLegacy(defaultResolve);

function resolveDocumentBadges(props) {
    return [...defaultResolve__default["default"](props), ScheduledBadge.ScheduledBadge];
}

module.exports = resolveDocumentBadges;
