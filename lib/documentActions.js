'use strict';

var defaultResolve = require('part:@sanity/base/document-actions');
var ScheduleAction = require('./ScheduleAction-57c37992.js');
require('@sanity/base/components');
require('@sanity/base/hooks');
require('@sanity/icons');
require('@sanity/ui');
require('react');
require('./ScheduleItem-3ea58fd7.js');
require('swr');
require('./usePollSchedules-a51955a4.js');
require('part:@sanity/base/client');
require('tslib');
require('pluralize');
require('debug');
require('date-fns-tz');
require('part:@sanity/base/preview');
require('part:@sanity/base/util/draft-utils');
require('rxjs');
require('rxjs/operators');
require('part:@sanity/base/schema');
require('styled-components');
require('@sanity/color');
require('date-fns');
require('@reach/auto-id');
require('react-focus-lock');
require('lodash');
require('./validationUtils-fdbe6576.js');
require('@sanity/types');
require('@sanity/react-hooks');
require('@sanity/base/router');
require('@sanity/util/paths');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var defaultResolve__default = /*#__PURE__*/_interopDefaultLegacy(defaultResolve);

function resolveDocumentActions(props) {
    const defaultActions = defaultResolve__default["default"](props);
    // Add schedule action after default publish action
    return [
        ...defaultActions.slice(0, 1),
        ScheduleAction.ScheduleAction,
        ...defaultActions.slice(1),
    ];
}

module.exports = resolveDocumentActions;
