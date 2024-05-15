'use strict';

var React = require('react');
var FormBuilderInput = require('@sanity/form-builder/lib/FormBuilderInput');
var icons = require('@sanity/icons');
var ui = require('@sanity/ui');
var dateFns = require('date-fns');
var usePollSchedules = require('./usePollSchedules-a51955a4.js');
var validationUtils = require('./validationUtils-fdbe6576.js');
require('swr');
require('part:@sanity/base/client');
require('tslib');
require('pluralize');
require('debug');
require('date-fns-tz');
require('@sanity/types');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

class NestedFormBuilder extends FormBuilderInput.FormBuilderInput {
    // eslint-disable-next-line class-methods-use-this
    componentDidMount() {
        // do nothing - prevent focus-bug when nesting FormBuilderInput
    }
    // eslint-disable-next-line camelcase,class-methods-use-this
    UNSAFE_componentWillReceiveProps() {
        // do nothing - prevent focus-bug when nesting FormBuilderInput
    }
    // eslint-disable-next-line class-methods-use-this
    componentDidUpdate() {
        // do nothing - prevent focus-bug when nesting FormBuilderInput
    }
    // eslint-disable-next-line no-undef
    render() {
        const { type } = this.props;
        const InputComponent = this.resolveInputComponent(type);
        return React__default["default"].createElement(InputComponent, Object.assign({}, this.props, { ref: this.setInput }));
    }
}

function ScheduleBanner(props) {
    const { id, markers } = props;
    const publishedId = validationUtils.usePublishedId(id);
    const { hasError } = validationUtils.useValidationState(markers);
    const { schedules } = usePollSchedules.usePollSchedules({ documentId: publishedId, state: 'scheduled' });
    const hasSchedules = schedules.length > 0;
    if (!hasSchedules) {
        return null;
    }
    return (React__default["default"].createElement(ui.Box, { marginBottom: 4 },
        React__default["default"].createElement(ui.Card, { padding: 3, radius: 1, shadow: 1, tone: hasError ? 'critical' : 'primary' },
            React__default["default"].createElement(ui.Stack, { space: 2 },
                React__default["default"].createElement(ui.Flex, { align: "center", gap: 3, marginBottom: 1, padding: 1 },
                    React__default["default"].createElement(ui.Text, { muted: true, size: 1 },
                        React__default["default"].createElement(icons.CalendarIcon, null)),
                    React__default["default"].createElement(ui.Text, { muted: true, size: 1 },
                        React__default["default"].createElement("span", { style: { fontWeight: 600 } }, "Upcoming schedule"),
                        " (local time)")),
                React__default["default"].createElement(ui.Stack, { space: 2 }, schedules.map((schedule) => {
                    if (!schedule.executeAt) {
                        return null;
                    }
                    const formattedDateTime = dateFns.format(new Date(schedule.executeAt), usePollSchedules.DATE_FORMAT.LARGE);
                    return (React__default["default"].createElement(ui.Inline, { key: schedule.id, space: 2 },
                        React__default["default"].createElement(ui.Flex, { style: { opacity: 1 } },
                            React__default["default"].createElement(ui.Badge, { fontSize: 0, mode: "outline" }, schedule.action)),
                        React__default["default"].createElement(ui.Text, { muted: true, size: 1 }, formattedDateTime)));
                })),
                hasError && (React__default["default"].createElement(ui.Box, { marginTop: 3 },
                    React__default["default"].createElement(ui.Text, { muted: true, size: 1, weight: "regular" }, usePollSchedules.DOCUMENT_HAS_ERRORS_TEXT)))))));
}

const scheduledMarkerFieldName = 'hasScheduleWrapper';
const ScheduledDocumentInput = React.forwardRef(function ScheduledDocumentInput(props, ref) {
    if (props.type.jsonType !== 'object') {
        throw new Error(`jsonType of schema must be object, but was ${props.type.jsonType}`);
    }
    const type = useTypeWithMarkerField(props.type);
    const { value, markers } = props;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        (value === null || value === void 0 ? void 0 : value._id) ? React__default["default"].createElement(ScheduleBanner, { id: value._id, markers: markers }) : null,
        React__default["default"].createElement(NestedFormBuilder, Object.assign({}, props, { ref: ref, type: type }))));
});
function useTypeWithMarkerField(type) {
    return React.useMemo(() => typeWithMarkerField(type), [type]);
}
function typeWithMarkerField(type) {
    const t = Object.assign(Object.assign({}, type), { [scheduledMarkerFieldName]: true });
    const typeOfType = 'type' in type && type.type ? typeWithMarkerField(type.type) : undefined;
    return Object.assign(Object.assign({}, t), { type: typeOfType });
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function resolveInput(type) {
    const rootType = getRootType(type);
    if (rootType.name === 'document' && !type[scheduledMarkerFieldName]) {
        return ScheduledDocumentInput;
    }
    return undefined;
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function getRootType(type) {
    if (!type.type) {
        return type;
    }
    return getRootType(type.type);
}

module.exports = resolveInput;
