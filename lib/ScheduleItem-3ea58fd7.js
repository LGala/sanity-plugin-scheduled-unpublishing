'use strict';

var icons = require('@sanity/icons');
var ui = require('@sanity/ui');
var React = require('react');
var useSWR = require('swr');
var usePollSchedules = require('./usePollSchedules-a51955a4.js');
var preview = require('part:@sanity/base/preview');
var draftUtils = require('part:@sanity/base/util/draft-utils');
var rxjs = require('rxjs');
var operators = require('rxjs/operators');
var schema = require('part:@sanity/base/schema');
var styled = require('styled-components');
var color = require('@sanity/color');
var tslib = require('tslib');
var dateFns = require('date-fns');
var dateFnsTz = require('date-fns-tz');
var autoId = require('@reach/auto-id');
var components = require('@sanity/base/components');
var FocusLock = require('react-focus-lock');
var lodash = require('lodash');
var hooks = require('@sanity/base/hooks');
var validationUtils = require('./validationUtils-fdbe6576.js');
var reactHooks = require('@sanity/react-hooks');
var router = require('@sanity/base/router');
var PathUtils = require('@sanity/util/paths');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n["default"] = e;
    return Object.freeze(n);
}

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var useSWR__default = /*#__PURE__*/_interopDefaultLegacy(useSWR);
var schema__default = /*#__PURE__*/_interopDefaultLegacy(schema);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);
var FocusLock__default = /*#__PURE__*/_interopDefaultLegacy(FocusLock);
var PathUtils__namespace = /*#__PURE__*/_interopNamespace(PathUtils);

const DialogFooter = (props) => {
    const { buttonText = 'Action', disabled, icon, onAction, onComplete, tone = 'positive' } = props;
    return (React__default["default"].createElement(ui.Flex, null,
        React__default["default"].createElement(ui.Card, { flex: 1 },
            React__default["default"].createElement(ui.Button, { mode: "bleed", onClick: onComplete, style: { width: '100%' }, text: "Cancel" })),
        onAction && (React__default["default"].createElement(ui.Card, { flex: 1, marginLeft: 3 },
            React__default["default"].createElement(ui.Button, { disabled: disabled, icon: icon, onClick: onAction, style: { width: '100%' }, text: buttonText, tone: tone })))));
};

const DialogTimeZone = (props) => {
    const { onClose } = props;
    const { setTimeZone, timeZone } = usePollSchedules.useTimeZone();
    const [selectedTz, setSelectedTz] = React.useState(timeZone);
    // Callbacks
    const handleTimeZoneChange = (value) => {
        const tz = usePollSchedules.allTimeZones.find((v) => v.value === value);
        setSelectedTz(tz);
    };
    const handleTimeZoneSelectLocal = () => {
        setSelectedTz(usePollSchedules.localTimeZone);
    };
    const handleTimeZoneUpdate = () => {
        if (selectedTz) {
            setTimeZone(selectedTz);
        }
        onClose === null || onClose === void 0 ? void 0 : onClose();
    };
    const isDirty = (selectedTz === null || selectedTz === void 0 ? void 0 : selectedTz.name) !== timeZone.name;
    const isLocalTzSelected = React.useMemo(() => {
        return (selectedTz === null || selectedTz === void 0 ? void 0 : selectedTz.name) === usePollSchedules.localTimeZone.name;
    }, [selectedTz]);
    return (React__default["default"].createElement(ui.Dialog, { footer: React__default["default"].createElement(ui.Box, { paddingX: 4, paddingY: 3 },
            React__default["default"].createElement(DialogFooter, { buttonText: "Update time zone", disabled: !isDirty || !selectedTz, onAction: handleTimeZoneUpdate, onComplete: onClose, tone: "primary" })), header: "Select time zone", id: "time-zone", onClose: onClose, width: 1 },
        React__default["default"].createElement(ui.Stack, { padding: 4, space: 5 },
            React__default["default"].createElement(ui.Text, { size: 1 }, "The selected time zone will change how dates are represented in schedules."),
            React__default["default"].createElement(ui.Stack, { space: 3 },
                React__default["default"].createElement(ui.Flex, { align: "center", justify: "space-between" },
                    React__default["default"].createElement(ui.Inline, { space: 2 },
                        React__default["default"].createElement(ui.Text, { size: 1, weight: "semibold" }, "Time zone"),
                        isLocalTzSelected && (React__default["default"].createElement(ui.Text, { muted: true, size: 1 }, "local time"))),
                    !isLocalTzSelected && (React__default["default"].createElement(ui.Text, { size: 1, weight: "medium" },
                        React__default["default"].createElement("a", { onClick: handleTimeZoneSelectLocal, style: { cursor: 'pointer' } }, "Select local time zone")))),
                React__default["default"].createElement(ui.Autocomplete, { fontSize: 2, icon: icons.SearchIcon, id: "timezone", onChange: handleTimeZoneChange, openButton: true, options: usePollSchedules.allTimeZones, padding: 4, placeholder: "Search for a city or time zone", popover: {
                        boundaryElement: document.querySelector('body'),
                        constrainSize: true,
                        placement: 'bottom-start',
                    }, renderOption: (option) => {
                        return (React__default["default"].createElement(ui.Card, { as: "button", padding: 3 },
                            React__default["default"].createElement(ui.Text, { size: 1, textOverflow: "ellipsis" },
                                React__default["default"].createElement("span", null,
                                    "GMT",
                                    option.offset),
                                React__default["default"].createElement("span", { style: {
                                        color: color.black.hex,
                                        fontWeight: 500,
                                        marginLeft: '1em',
                                    } }, option.alternativeName),
                                React__default["default"].createElement("span", { style: {
                                        color: color.hues.gray[700].hex,
                                        marginLeft: '1em',
                                    } }, option.mainCities))));
                    }, renderValue: (_, option) => {
                        if (!option)
                            return '';
                        return `${option.alternativeName} (${option.namePretty})`;
                    }, tabIndex: -1, value: selectedTz === null || selectedTz === void 0 ? void 0 : selectedTz.value })))));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useDialogVisible() {
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const hide = React.useCallback(() => {
        setDialogVisible(false);
    }, []);
    const show = React.useCallback(() => {
        setDialogVisible(true);
    }, []);
    return {
        visible: dialogVisible,
        show,
        hide,
    };
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useDialogTimeZone() {
    const { visible, show, hide } = useDialogVisible();
    const dialogProps = {
        onClose: hide,
        visible,
    };
    return {
        DialogTimeZone: visible ? DialogTimeZone : null,
        dialogProps,
        dialogTimeZoneShow: show,
        hide,
    };
}

const ButtonTimeZone = (props) => {
    const { useElementQueries } = props;
    const { timeZone } = usePollSchedules.useTimeZone();
    const { DialogTimeZone, dialogProps, dialogTimeZoneShow } = useDialogTimeZone();
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        DialogTimeZone && React__default["default"].createElement(DialogTimeZone, Object.assign({}, dialogProps)),
        React__default["default"].createElement(ui.Tooltip, { content: React__default["default"].createElement(ui.Box, { padding: 2 },
                React__default["default"].createElement(ui.Text, { muted: true, size: 1 },
                    "Displaying schedules in ",
                    timeZone.alternativeName,
                    " (GMT",
                    timeZone.offset,
                    ")")), portal: true }, useElementQueries ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(ui.Box, { className: "button-small" },
                React__default["default"].createElement(ui.Button, { fontSize: 1, icon: icons.EarthAmericasIcon, mode: "bleed", onClick: dialogTimeZoneShow, text: `${timeZone.abbreviation}` })),
            React__default["default"].createElement(ui.Box, { className: "button-large" },
                React__default["default"].createElement(ui.Button, { fontSize: 1, icon: icons.EarthAmericasIcon, mode: "bleed", onClick: dialogTimeZoneShow, text: `${timeZone.alternativeName} (${timeZone.namePretty})` })))) : (React__default["default"].createElement(ui.Button, { fontSize: 1, icon: icons.EarthAmericasIcon, mode: "bleed", onClick: dialogTimeZoneShow, text: `${timeZone.alternativeName} (${timeZone.namePretty})` })))));
};

const ButtonTimeZoneElementQuery = styled__default["default"](ui.ElementQuery) `
  .button-small {
    display: block;
  }
  .button-large {
    display: none;
  }

  &[data-eq-min~='2'] {
    .button-small {
      display: none;
    }
    .button-large {
      display: block;
    }
  }
`;

const DialogHeader = (props) => {
    const { title } = props;
    return (React__default["default"].createElement(ButtonTimeZoneElementQuery, null,
        React__default["default"].createElement(ui.Flex, { align: "center" },
            title,
            React__default["default"].createElement("input", { style: { opacity: 0 }, tabIndex: -1, type: "button" }),
            React__default["default"].createElement(ui.Box, { style: { position: 'absolute', right: '-1.5em' } },
                React__default["default"].createElement(ButtonTimeZone, { useElementQueries: true })))));
};

function CalendarDay(props) {
    const { date, focused, isCurrentMonth, isToday, customValidation, onSelect, selected } = props;
    const { zoneDateToUtc } = usePollSchedules.useTimeZone();
    // Round date to the end of day when passing to custom validate function.
    // Remember that all calendar days have dates in local / 'wall time', but validation requires a conversion to UTC.
    const isValid = React.useMemo(() => {
        if (!customValidation) {
            return true;
        }
        const dayEnd = dateFns.endOfDay(date);
        return customValidation(zoneDateToUtc(dayEnd));
    }, [customValidation, date, zoneDateToUtc]);
    const handleClick = React.useCallback(() => {
        if (isValid) {
            onSelect(date);
        }
    }, [date, isValid, onSelect]);
    return (React__default["default"].createElement("div", { "aria-selected": selected, "data-ui": "CalendarDay" },
        React__default["default"].createElement(ui.Card, { "aria-label": date.toDateString(), "aria-pressed": selected, as: "button", __unstable_focusRing: true, "data-weekday": true, "data-focused": focused ? 'true' : '', disabled: !isValid, role: "button", tabIndex: -1, onClick: handleClick, padding: 3, radius: 2, selected: selected, tone: isToday || selected ? 'primary' : 'default' },
            React__default["default"].createElement(ui.Text, { muted: !selected && !isCurrentMonth, style: { textAlign: 'center' }, weight: isCurrentMonth ? 'medium' : 'regular' }, date.getDate()))));
}

const MONTH_NAMES = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const WEEK_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const HOURS_24 = lodash.range(0, 24);
const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
// all weekdays except first
const TAIL_WEEKDAYS = [1, 2, 3, 4, 5, 6];

const getWeekStartsOfMonth = (date) => {
    const firstDay = dateFns.startOfMonth(date);
    return dateFns.eachWeekOfInterval({
        start: firstDay,
        end: dateFns.lastDayOfMonth(firstDay),
    });
};
const getWeekDaysFromWeekStarts = (weekStarts) => {
    return weekStarts.map((weekStart) => [
        weekStart,
        ...TAIL_WEEKDAYS.map((d) => dateFns.addDays(weekStart, d)),
    ]);
};
const getWeeksOfMonth = (date) => getWeekDaysFromWeekStarts(getWeekStartsOfMonth(date)).map((days) => ({
    number: dateFns.getWeek(days[0]),
    days,
}));

function CalendarMonth(props) {
    const { getCurrentZoneDate } = usePollSchedules.useTimeZone();
    const { customValidation } = props;
    return (React__default["default"].createElement(ui.Box, { "aria-hidden": props.hidden || false, "data-ui": "CalendarMonth" },
        React__default["default"].createElement(ui.Grid, { gap: 1, style: { gridTemplateColumns: 'repeat(7, minmax(44px, 46px))' } },
            WEEK_DAY_NAMES.map((weekday) => (React__default["default"].createElement(ui.Box, { key: weekday, paddingY: 2 },
                React__default["default"].createElement(ui.Text, { size: 1, weight: "medium", style: { textAlign: 'center' } }, weekday)))),
            getWeeksOfMonth(props.date).map((week, weekIdx) => week.days.map((date, dayIdx) => {
                const focused = props.focused && dateFns.isSameDay(date, props.focused);
                const selected = props.selected && dateFns.isSameDay(date, props.selected);
                const isToday = dateFns.isSameDay(date, getCurrentZoneDate());
                const isCurrentMonth = props.focused && dateFns.isSameMonth(date, props.focused);
                return (React__default["default"].createElement(CalendarDay, { date: date, focused: focused, isCurrentMonth: isCurrentMonth, isToday: isToday, customValidation: customValidation, 
                    // eslint-disable-next-line react/no-array-index-key
                    key: `${weekIdx}-${dayIdx}`, onSelect: props.onSelect, selected: selected }));
            })))));
}

const features = {
    dayPresets: false,
    timePresets: false,
};

/**
 * A TextInput that only emit onChange when it has to
 * By default it will only emit onChange when: 1) user hits enter or 2) user leaves the
 * field (e.g. onBlur) and the input value at this time is different from the given `value` prop
 */
const LazyTextInput = React__default["default"].forwardRef(function LazyTextInput(_a, forwardedRef) {
    var { onChange, onBlur, onKeyPress, value } = _a, rest = tslib.__rest(_a, ["onChange", "onBlur", "onKeyPress", "value"]);
    const [inputValue, setInputValue] = React__default["default"].useState();
    const handleChange = React__default["default"].useCallback((event) => {
        setInputValue(event.currentTarget.value);
    }, []);
    const checkEvent = React__default["default"].useCallback((event) => {
        const currentValue = event.currentTarget.value;
        if (currentValue !== `${value}`) {
            if (onChange) {
                onChange(event);
            }
        }
        setInputValue(undefined);
    }, [onChange, value]);
    const handleBlur = React__default["default"].useCallback((e) => {
        checkEvent(e);
        if (onBlur) {
            onBlur(e);
        }
    }, [checkEvent, onBlur]);
    const handleKeyPress = React__default["default"].useCallback((e) => {
        if (e.key === 'Enter') {
            checkEvent(e);
        }
        if (onKeyPress) {
            onKeyPress(e);
        }
    }, [checkEvent, onKeyPress]);
    return (React__default["default"].createElement(ui.TextInput, Object.assign({}, rest, { "data-testid": "date-input", ref: forwardedRef, value: inputValue === undefined ? value : inputValue, onChange: handleChange, onBlur: handleBlur, onKeyPress: handleKeyPress })));
});

const YearInput = (_a) => {
    var { onChange } = _a, props = tslib.__rest(_a, ["onChange"]);
    const handleChange = React__default["default"].useCallback((event) => {
        const numericValue = parseInt(event.currentTarget.value, 10);
        if (!isNaN(numericValue)) {
            onChange(numericValue);
        }
    }, [onChange]);
    return React__default["default"].createElement(LazyTextInput, Object.assign({}, props, { onChange: handleChange, inputMode: "numeric" }));
};

// This is used to maintain focus on a child element of the calendar-grid between re-renders
// When using arrow keys to move focus from a day in one month to another we are setting focus at the button for the day
// after it has changed but *only* if we *already* had focus inside the calendar grid (e.g not if focus was on the "next
// year" button, or any of the other controls)
// When moving from the last day of a month that displays 6 weeks in the grid to a month that displays 5 weeks, current
// focus gets lost on render, so this provides us with a stable element to help us preserve focus on a child element of
// the calendar grid between re-renders
const PRESERVE_FOCUS_ELEMENT = (React__default["default"].createElement("span", { "data-preserve-focus": true, style: { overflow: 'hidden', position: 'absolute', outline: 'none' }, tabIndex: -1 }));
const Calendar = React.forwardRef(function Calendar(props, forwardedRef) {
    const { getCurrentZoneDate, zoneDateToUtc } = usePollSchedules.useTimeZone();
    const { selectTime, onFocusedDateChange, selectedDate = getCurrentZoneDate(), focusedDate = selectedDate, timeStep = 1, onSelect, customValidation } = props, restProps = tslib.__rest(props, ["selectTime", "onFocusedDateChange", "selectedDate", "focusedDate", "timeStep", "onSelect", "customValidation"]);
    const setFocusedDate = React.useCallback((date) => onFocusedDateChange(zoneDateToUtc(date)), [onFocusedDateChange, zoneDateToUtc]);
    const setFocusedDateMonth = React.useCallback((month) => setFocusedDate(dateFns.setDate(dateFns.setMonth(focusedDate, month), 1)), [focusedDate, setFocusedDate]);
    const handleFocusedMonthChange = React.useCallback((e) => setFocusedDateMonth(Number(e.currentTarget.value)), [setFocusedDateMonth]);
    const moveFocusedDate = React.useCallback((by) => setFocusedDate(dateFns.addMonths(focusedDate, by)), [focusedDate, setFocusedDate]);
    const setFocusedDateYear = React.useCallback((year) => setFocusedDate(dateFns.setYear(focusedDate, year)), [focusedDate, setFocusedDate]);
    const handleDateChange = React.useCallback((date) => {
        onSelect(zoneDateToUtc(dateFns.setMinutes(dateFns.setHours(date, selectedDate.getHours()), selectedDate.getMinutes())));
    }, [onSelect, selectedDate, zoneDateToUtc]);
    const handleMinutesChange = React.useCallback((event) => {
        const m = Number(event.currentTarget.value);
        onSelect(zoneDateToUtc(dateFns.setMinutes(selectedDate, m)));
    }, [onSelect, selectedDate, zoneDateToUtc]);
    const handleHoursChange = React.useCallback((event) => {
        const m = Number(event.currentTarget.value);
        onSelect(zoneDateToUtc(dateFns.setHours(selectedDate, m)));
    }, [onSelect, selectedDate, zoneDateToUtc]);
    React.useCallback((hours, mins) => {
        onSelect(zoneDateToUtc(dateFns.setHours(dateFns.setMinutes(selectedDate, mins), hours)));
    }, [onSelect, selectedDate, zoneDateToUtc]);
    const ref = ui.useForwardedRef(forwardedRef);
    const focusCurrentWeekDay = React.useCallback(() => {
        var _a, _b;
        (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.querySelector(`[data-focused="true"]`)) === null || _b === void 0 ? void 0 : _b.focus();
    }, [ref]);
    const handleKeyDown = React.useCallback((event) => {
        var _a, _b;
        if (!ARROW_KEYS.includes(event.key)) {
            return;
        }
        event.preventDefault();
        if (event.target.hasAttribute('data-calendar-grid')) {
            focusCurrentWeekDay();
            return;
        }
        if (event.key === 'ArrowUp') {
            onFocusedDateChange(zoneDateToUtc(dateFns.addDays(focusedDate, -7)));
        }
        if (event.key === 'ArrowDown') {
            onFocusedDateChange(zoneDateToUtc(dateFns.addDays(focusedDate, 7)));
        }
        if (event.key === 'ArrowLeft') {
            onFocusedDateChange(zoneDateToUtc(dateFns.addDays(focusedDate, -1)));
        }
        if (event.key === 'ArrowRight') {
            onFocusedDateChange(zoneDateToUtc(dateFns.addDays(focusedDate, 1)));
        }
        // set focus temporarily on this element to make sure focus is still inside the calendar-grid after re-render
        (_b = (_a = ref.current) === null || _a === void 0 ? void 0 : _a.querySelector('[data-preserve-focus]')) === null || _b === void 0 ? void 0 : _b.focus();
    }, [focusCurrentWeekDay, focusedDate, onFocusedDateChange, ref, zoneDateToUtc]);
    React.useEffect(() => {
        focusCurrentWeekDay();
    }, [focusCurrentWeekDay]);
    React.useEffect(() => {
        var _a;
        const currentFocusInCalendarGrid = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.matches('[data-calendar-grid], [data-calendar-grid] [data-preserve-focus]');
        if (
        // Only move focus if it's currently in the calendar grid
        currentFocusInCalendarGrid) {
            focusCurrentWeekDay();
        }
    }, [ref, focusCurrentWeekDay, focusedDate]);
    const handleNowClick = React.useCallback(() => onSelect(new Date()), [onSelect]);
    return (React__default["default"].createElement(ui.Box, Object.assign({ "data-ui": "Calendar" }, restProps, { ref: ref }),
        React__default["default"].createElement(ui.Box, { padding: 2 },
            React__default["default"].createElement(ui.Flex, null,
                React__default["default"].createElement(ui.Box, { flex: 1 },
                    React__default["default"].createElement(CalendarMonthSelect, { moveFocusedDate: moveFocusedDate, onChange: handleFocusedMonthChange, value: focusedDate === null || focusedDate === void 0 ? void 0 : focusedDate.getMonth() })),
                React__default["default"].createElement(ui.Box, { marginLeft: 2 },
                    React__default["default"].createElement(CalendarYearSelect, { moveFocusedDate: moveFocusedDate, onChange: setFocusedDateYear, value: focusedDate.getFullYear() }))),
            React__default["default"].createElement(ui.Box, { "data-calendar-grid": true, onKeyDown: handleKeyDown, marginTop: 2, overflow: "hidden", tabIndex: 0 },
                React__default["default"].createElement(CalendarMonth, { date: focusedDate, focused: focusedDate, customValidation: customValidation, onSelect: handleDateChange, selected: selectedDate }),
                PRESERVE_FOCUS_ELEMENT)),
        selectTime && (React__default["default"].createElement(ui.Box, { padding: 2, style: { borderTop: '1px solid var(--card-border-color)' } },
            React__default["default"].createElement(ui.Flex, { align: "center" },
                React__default["default"].createElement(ui.Flex, { align: "center", flex: 1 },
                    React__default["default"].createElement(ui.Box, null,
                        React__default["default"].createElement(ui.Select, { "aria-label": "Select hour", value: selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getHours(), onChange: handleHoursChange }, HOURS_24.map((h) => (React__default["default"].createElement("option", { key: h, value: h }, `${h}`.padStart(2, '0')))))),
                    React__default["default"].createElement(ui.Box, { paddingX: 1 },
                        React__default["default"].createElement(ui.Text, null, ":")),
                    React__default["default"].createElement(ui.Box, null,
                        React__default["default"].createElement(ui.Select, { "aria-label": "Select minutes", value: selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.getMinutes(), onChange: handleMinutesChange }, lodash.range(0, 60, timeStep).map((m) => (React__default["default"].createElement("option", { key: m, value: m }, `${m}`.padStart(2, '0'))))))),
                React__default["default"].createElement(ui.Box, { marginLeft: 2 },
                    React__default["default"].createElement(ui.Button, { text: "Set to current time", mode: "bleed", onClick: handleNowClick }))),
            features.timePresets ))));
});
function CalendarMonthSelect(props) {
    const { moveFocusedDate, onChange, value } = props;
    const handlePrevMonthClick = React.useCallback(() => moveFocusedDate(-1), [moveFocusedDate]);
    const handleNextMonthClick = React.useCallback(() => moveFocusedDate(1), [moveFocusedDate]);
    return (React__default["default"].createElement(ui.Flex, { flex: 1 },
        React__default["default"].createElement(ui.Button, { "aria-label": "Go to previous month", onClick: handlePrevMonthClick, mode: "bleed", icon: icons.ChevronLeftIcon, paddingX: 2, radius: 0 }),
        React__default["default"].createElement(ui.Box, { flex: 1 },
            React__default["default"].createElement(ui.Select, { radius: 0, value: value, onChange: onChange }, MONTH_NAMES.map((m, i) => (
            // eslint-disable-next-line react/no-array-index-key
            React__default["default"].createElement("option", { key: i, value: i }, m))))),
        React__default["default"].createElement(ui.Button, { "aria-label": "Go to next month", mode: "bleed", icon: icons.ChevronRightIcon, onClick: handleNextMonthClick, paddingX: 2, radius: 0 })));
}
function CalendarYearSelect(props) {
    const { moveFocusedDate, onChange, value } = props;
    const handlePrevYearClick = React.useCallback(() => moveFocusedDate(-12), [moveFocusedDate]);
    const handleNextYearClick = React.useCallback(() => moveFocusedDate(12), [moveFocusedDate]);
    return (React__default["default"].createElement(ui.Flex, null,
        React__default["default"].createElement(ui.Button, { "aria-label": "Previous year", onClick: handlePrevYearClick, mode: "bleed", icon: icons.ChevronLeftIcon, paddingX: 2, radius: 0 }),
        React__default["default"].createElement(YearInput, { value: value, onChange: onChange, radius: 0, style: { width: 65 } }),
        React__default["default"].createElement(ui.Button, { "aria-label": "Next year", onClick: handleNextYearClick, mode: "bleed", icon: icons.ChevronRightIcon, paddingX: 2, radius: 0 })));
}

const DatePicker = React__default["default"].forwardRef(function DatePicker(props, ref) {
    const { utcToCurrentZoneDate } = usePollSchedules.useTimeZone();
    const { value = new Date(), onChange, customValidation } = props, rest = tslib.__rest(props, ["value", "onChange", "customValidation"]);
    const [focusedDate, setFocusedDay] = React__default["default"].useState();
    const handleSelect = React__default["default"].useCallback((nextDate) => {
        onChange(nextDate);
        setFocusedDay(undefined);
    }, [onChange]);
    return (React__default["default"].createElement(Calendar, Object.assign({}, rest, { ref: ref, selectedDate: utcToCurrentZoneDate(value), onSelect: handleSelect, focusedDate: utcToCurrentZoneDate(focusedDate || value), onFocusedDateChange: setFocusedDay, customValidation: customValidation })));
});

const DateTimeInput$1 = React__default["default"].forwardRef(function DateTimeInput(props, forwardedRef) {
    const { value, inputValue, customValidation, onInputChange, onChange, selectTime, timeStep } = props, rest = tslib.__rest(props, ["value", "inputValue", "customValidation", "onInputChange", "onChange", "selectTime", "timeStep"]);
    const [popoverRef, setPopoverRef] = React__default["default"].useState(null);
    const inputRef = ui.useForwardedRef(forwardedRef);
    const buttonRef = React__default["default"].useRef(null);
    const [isPickerOpen, setPickerOpen] = React__default["default"].useState(false);
    ui.useClickOutside(() => setPickerOpen(false), [popoverRef]);
    const handleDeactivation = React.useCallback(() => {
        var _a, _b;
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        (_b = inputRef.current) === null || _b === void 0 ? void 0 : _b.select();
    }, [inputRef]);
    const handleKeyUp = React.useCallback((e) => {
        if (e.key === 'Escape') {
            setPickerOpen(false);
        }
    }, []);
    const handleClick = React.useCallback(() => setPickerOpen(true), []);
    const suffix = (React__default["default"].createElement(ui.Box, { padding: 1 },
        React__default["default"].createElement(ui.Button, { ref: buttonRef, icon: icons.CalendarIcon, mode: "bleed", padding: 2, onClick: handleClick, style: { display: 'block' }, "data-testid": "select-date-button" })));
    return (React__default["default"].createElement(LazyTextInput, Object.assign({ ref: inputRef }, rest, { value: inputValue, onChange: onInputChange, suffix: isPickerOpen ? (
        // Note: we're conditionally inserting the popover here due to an
        // issue with popovers rendering incorrectly on subsequent renders
        // see https://github.com/sanity-io/design/issues/519
        React__default["default"].createElement(ui.LayerProvider, { zOffset: 1000 },
            React__default["default"].createElement(ui.Popover, { constrainSize: true, "data-testid": "date-input-dialog", portal: true, content: React__default["default"].createElement(ui.Box, { overflow: "auto" },
                    React__default["default"].createElement(FocusLock__default["default"], { onDeactivation: handleDeactivation },
                        React__default["default"].createElement(DatePicker, { selectTime: selectTime, timeStep: timeStep, onKeyUp: handleKeyUp, value: value, onChange: onChange, customValidation: customValidation }))), open: true, placement: "bottom-end", ref: setPopoverRef, radius: 2 }, suffix))) : (suffix) })));
});

const CommonDateTimeInput = React__default["default"].forwardRef(function CommonDateTimeInput(props, forwardedRef) {
    const { value, markers, title, description, placeholder, parseInputValue, formatInputValue, deserialize, serialize, selectTime, timeStep, readOnly, level, onChange, customValidation } = props, rest = tslib.__rest(props, ["value", "markers", "title", "description", "placeholder", "parseInputValue", "formatInputValue", "deserialize", "serialize", "selectTime", "timeStep", "readOnly", "level", "onChange", "customValidation"]);
    const [localValue, setLocalValue] = React__default["default"].useState(null);
    React.useEffect(() => {
        setLocalValue(null);
    }, [value]);
    const errors = React.useMemo(() => markers.filter((marker) => marker.type === 'validation' && marker.level === 'error'), [markers]);
    const { zoneDateToUtc } = usePollSchedules.useTimeZone();
    // Text input changes ('wall time')
    const handleDatePickerInputChange = React__default["default"].useCallback((event) => {
        const nextInputValue = event.currentTarget.value;
        const result = nextInputValue === '' ? null : parseInputValue(nextInputValue);
        if (result === null) {
            onChange(null);
            // If the field value is undefined and we are clearing the invalid value
            // the above useEffect won't trigger, so we do some extra clean up here
            if (typeof value === 'undefined' && localValue) {
                setLocalValue(null);
            }
        }
        else if (result.isValid) {
            // Convert zone time to UTC
            onChange(serialize(zoneDateToUtc(result.date)));
        }
        else {
            setLocalValue(nextInputValue);
        }
    }, [localValue, onChange, parseInputValue, serialize, value, zoneDateToUtc]);
    // Calendar changes (UTC)
    const handleDatePickerChange = React__default["default"].useCallback((nextDate) => {
        onChange(nextDate ? serialize(nextDate) : null);
    }, [serialize, onChange]);
    const inputRef = ui.useForwardedRef(forwardedRef);
    const id = autoId.useId();
    const parseResult = localValue ? parseInputValue(localValue) : value ? deserialize(value) : null;
    const inputValue = localValue
        ? localValue
        : (parseResult === null || parseResult === void 0 ? void 0 : parseResult.isValid)
            ? formatInputValue(parseResult.date)
            : value;
    return (React__default["default"].createElement(components.FormField, { __unstable_markers: (parseResult === null || parseResult === void 0 ? void 0 : parseResult.error)
            ? [
                ...markers,
                {
                    type: 'validation',
                    level: 'error',
                    item: { message: parseResult.error, paths: [] },
                },
            ]
            : markers, title: title, level: level, description: description, inputId: id }, readOnly ? (React__default["default"].createElement(ui.TextInput, { value: inputValue, readOnly: true })) : (React__default["default"].createElement(DateTimeInput$1, Object.assign({}, rest, { id: id, selectTime: selectTime, timeStep: timeStep, placeholder: placeholder || `e.g. ${formatInputValue(new Date())}`, ref: inputRef, value: parseResult === null || parseResult === void 0 ? void 0 : parseResult.date, inputValue: inputValue || '', readOnly: Boolean(readOnly), onInputChange: handleDatePickerInputChange, onChange: handleDatePickerChange, customValidity: (parseResult === null || parseResult === void 0 ? void 0 : parseResult.error) || (errors.length > 0 ? errors[0].item.message : ''), customValidation: customValidation })))));
});

function isValidDate(date) {
    return date instanceof Date && !isNaN(date.valueOf());
}

const DEFAULT_DATE_FORMAT = 'yyyy-MM-dd';
const DEFAULT_TIME_FORMAT = 'HH:mm';
function parseOptions(options = {}) {
    return {
        customValidation: options.customValidation ||
            function () {
                return true;
            },
        calendarTodayLabel: options.calendarTodayLabel || 'Today',
        dateFormat: options.dateFormat || DEFAULT_DATE_FORMAT,
        timeFormat: options.timeFormat || DEFAULT_TIME_FORMAT,
        timeStep: ('timeStep' in options && Number(options.timeStep)) || 1,
    };
}
function serialize(date) {
    return date.toISOString();
}
function deserialize(isoString) {
    const deserialized = new Date(isoString);
    if (isValidDate(deserialized)) {
        return { isValid: true, date: deserialized };
    }
    return { isValid: false, error: `Invalid date value: "${isoString}"` };
}
// enforceTimeStep takes a dateString and datetime schema options and enforces the time
// to be within the configured timeStep
function enforceTimeStep(dateString, timeStep) {
    if (!timeStep || timeStep === 1) {
        return dateString;
    }
    const date = dateFns.parseISO(dateString);
    const minutes = dateFns.getMinutes(date);
    const leftOver = minutes % timeStep;
    if (leftOver !== 0) {
        return serialize(dateFns.setMinutes(date, minutes - leftOver));
    }
    return serialize(date);
}
const DateTimeInput = React__default["default"].forwardRef(function DateTimeInput(props, forwardedRef) {
    const { type, onChange } = props, rest = tslib.__rest(props, ["type", "onChange"]);
    const { title, description, placeholder } = type;
    const { getCurrentZoneDate, timeZone } = usePollSchedules.useTimeZone();
    const { customValidation, dateFormat, timeFormat, timeStep } = parseOptions(type.options);
    // Returns date in UTC string
    const handleChange = React.useCallback((nextDate) => {
        let date = nextDate;
        if (date !== null && timeStep > 1) {
            date = enforceTimeStep(date, timeStep);
        }
        onChange(date);
    }, [onChange, timeStep]);
    const formatInputValue = React__default["default"].useCallback((date) => dateFnsTz.formatInTimeZone(date, timeZone.name, `${dateFormat} ${timeFormat}`), [dateFormat, timeFormat, timeZone.name]);
    const parseInputValue = React__default["default"].useCallback((inputValue) => {
        const parsed = dateFns.parse(inputValue, `${dateFormat} ${timeFormat}`, getCurrentZoneDate());
        // Check is value is a valid date
        if (!dateFns.isValid(parsed)) {
            return {
                isValid: false,
                error: `Invalid date. Must be on the format "${dateFormat} ${timeFormat}"`,
            };
        }
        return {
            isValid: true,
            date: parsed,
        };
    }, [dateFormat, getCurrentZoneDate, timeFormat]);
    return (React__default["default"].createElement(CommonDateTimeInput, Object.assign({}, rest, { onChange: handleChange, ref: forwardedRef, selectTime: true, timeStep: timeStep, title: title, description: description, placeholder: placeholder, serialize: serialize, deserialize: deserialize, formatInputValue: formatInputValue, customValidation: customValidation, parseInputValue: parseInputValue })));
});

const ScheduleForm = (props) => {
    const { customValidation, markers, onChange, value, title = 'Date and time' } = props;
    // Date input is stored locally to handle behaviour of the studio's `<LazyTextInput />` component.
    // If we don't keep this local state (and only rely on the canonical value of `ScheduleFormData`),
    // you'll see an unsightly flash when text inputs are blurred / lose focus, as `<LazyTextInput />`
    // clears its internal value before it's had a chance to re-render as a result of its own props changing.
    const [inputValue, setInputValue] = React.useState();
    const handleChange = (date) => {
        if (date && onChange) {
            onChange({ date });
            setInputValue(date);
        }
    };
    return (React__default["default"].createElement(ui.Stack, { space: 4 },
        React__default["default"].createElement(ui.Card, null,
            React__default["default"].createElement(DateTimeInput, { level: 0, markers: markers || [], onChange: handleChange, type: {
                    name: 'date',
                    options: {
                        customValidation,
                        // date-fns format
                        dateFormat: `dd/MM/yyyy`,
                        timeFormat: 'HH:mm',
                    },
                    title,
                }, value: inputValue === undefined ? value === null || value === void 0 ? void 0 : value.date : inputValue }))));
};

function EditScheduleForm(props) {
    const { customValidation, markers, onChange, value, title } = props;
    return (React__default["default"].createElement(ui.Stack, { space: 4 },
        props.children,
        React__default["default"].createElement(ScheduleForm, { customValidation: customValidation, markers: markers, onChange: onChange, value: value, title: title })));
}

const ErrorCallout = (props) => {
    const { description, title } = props;
    return (React__default["default"].createElement(ui.Card, { overflow: "hidden", padding: 4, radius: 2, shadow: 1, tone: "critical" },
        React__default["default"].createElement(ui.Flex, { align: "center", gap: 4 },
            React__default["default"].createElement(ui.Text, { size: 2 },
                React__default["default"].createElement(icons.ErrorOutlineIcon, null)),
            React__default["default"].createElement(ui.Inline, { space: 2 },
                React__default["default"].createElement(ui.Text, { size: 1, weight: "semibold" }, title),
                description && React__default["default"].createElement(ui.Text, { size: 1 }, description)))));
};

const DocumentActionPropsContext = React.createContext(undefined);
function DocumentActionPropsProvider({ children, value, }) {
    return (React__default["default"].createElement(DocumentActionPropsContext.Provider, { value: value }, children));
}
function useDocumentActionProps() {
    const context = React.useContext(DocumentActionPropsContext);
    if (context === undefined) {
        throw new Error('useDocumentActionProps must be used within a DocumentActionPropsProvider');
    }
    return context;
}

function getUri() {
    const client = usePollSchedules.getSanityClient();
    const { projectId } = client.config();
    return `/projects/${projectId}/features/scheduledPublishing`;
}
const fetcher = () => {
    return usePollSchedules.getSanityClient().request({
        method: 'GET',
        uri: getUri(),
    });
};
const SWR_OPTIONS = {
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    shouldRetryOnError: false,
};
/**
 * Use SWR to check if the current project supports scheduled publishing.
 * SWR will cache this value and prevent unnecessary re-fetching.
 */
function useHasScheduledPublishing() {
    const { data } = useSWR__default["default"](getUri(), fetcher, SWR_OPTIONS);
    return data;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useScheduleForm(schedule) {
    const { getCurrentZoneDate, utcToCurrentZoneDate } = usePollSchedules.useTimeZone();
    const [isDirty, setIsDirty] = React.useState(false);
    const [markers, setMarkers] = React.useState([]);
    const [formData, setFormData] = React.useState(schedule && (schedule === null || schedule === void 0 ? void 0 : schedule.executeAt)
        ? {
            date: schedule.executeAt,
        }
        : null);
    const errors = React.useMemo(() => markers.filter((marker) => marker.type === 'validation' && marker.level === 'error'), [markers]);
    // Only allow dates in the future (`selectedDate` is UTC)
    const customValidation = React.useCallback((selectedDate) => utcToCurrentZoneDate(selectedDate) > getCurrentZoneDate(), [getCurrentZoneDate, utcToCurrentZoneDate]);
    const handleFormChange = React.useCallback((form) => {
        const equalDates = (schedule === null || schedule === void 0 ? void 0 : schedule.executeAt) &&
            new Date(schedule.executeAt).getTime() === new Date(form === null || form === void 0 ? void 0 : form.date).getTime();
        const isValid = customValidation(new Date(form === null || form === void 0 ? void 0 : form.date));
        setMarkers(isValid
            ? []
            : [
                {
                    item: { message: 'Date must be in the future.', paths: [] },
                    level: 'error',
                    path: [],
                    type: 'validation',
                },
            ]);
        setFormData(form);
        setIsDirty(!equalDates);
    }, [customValidation, schedule === null || schedule === void 0 ? void 0 : schedule.executeAt]);
    return {
        customValidation,
        errors,
        formData,
        isDirty,
        markers,
        onFormChange: handleFormChange,
    };
}

// Based off: https://github.com/sanity-io/sanity/blob/next/packages/@sanity/desk-tool/src/components/paneItem/helpers.tsx
const isLiveEditEnabled = (schemaType) => schemaType.liveEdit === true;
function getPreviewStateObservable(schemaType, documentId, title) {
    const draft$ = isLiveEditEnabled(schemaType)
        ? rxjs.of({ snapshot: null })
        : preview.observeForPreview({ _id: draftUtils.getDraftId(documentId) }, schemaType);
    const published$ = preview.observeForPreview({ _id: draftUtils.getPublishedId(documentId) }, schemaType);
    return rxjs.combineLatest([draft$, published$]).pipe(
    // @ts-expect-error poor typings
    operators.map(([draft, published]) => {
        return {
            draft: draft.snapshot ? Object.assign({ title }, draft.snapshot) : null,
            isLoading: false,
            published: published.snapshot ? Object.assign({ title }, published.snapshot) : null,
        };
    }), operators.startWith({ draft: null, isLoading: true, published: null }));
}
/**
 * Whilst schedules can contain multiple documents, this plugin specifically limits schedules to one document only
 */
function getScheduledDocument(schedule) {
    var _a;
    return (_a = schedule.documents) === null || _a === void 0 ? void 0 : _a[0];
}
/**
 * Whilst schedules can contain multiple documents, this plugin specifically limits schedules to one document only
 */
function getScheduledDocumentId(schedule) {
    var _a;
    return (_a = getScheduledDocument(schedule)) === null || _a === void 0 ? void 0 : _a.documentId.replaceAll('drafts.', '');
}

function useScheduleSchemaType(schedule) {
    const firstDocument = getScheduledDocument(schedule);
    return useSchemaType(firstDocument.documentType);
}
function useSchemaType(schemaName) {
    return React.useMemo(() => schema__default["default"].get(schemaName), [schemaName]);
}

const POPOVER_PROPS$1 = {
    portal: true,
    constrainSize: true,
    preventOverflow: true,
    tone: 'default',
    width: 0,
};
const ValidationInfo = router.withRouterHOC(ValidationInfoWithRouter);
function ValidationInfoWithRouter(props) {
    const { type, markers, menuHeader, router, documentId } = props;
    const { hasError, hasWarning } = validationUtils.useValidationState(markers);
    // use visibility so we can occupy the space equally for all states
    const visibility = hasError || hasWarning ? 'visible' : 'hidden';
    const id = autoId.useId() || '';
    const publishId = validationUtils.usePublishedId(documentId);
    const onFocus = React.useCallback((path) => {
        if (!publishId) {
            return;
        }
        router.navigateIntent('edit', {
            id: publishId,
            path: encodeURIComponent(PathUtils__namespace.toString(path)),
        });
    }, [router, publishId]);
    return (React__default["default"].createElement(ui.MenuButton, { id: id || '', button: React__default["default"].createElement(ui.Button, { title: "Show validation issues", mode: "bleed", "data-testid": "schedule-validation-list-button", icon: hasError ? icons.ErrorOutlineIcon : icons.WarningOutlineIcon, style: { visibility }, tone: hasError ? 'critical' : 'default' }), menu: React__default["default"].createElement(ui.Menu, { padding: 1 },
            React__default["default"].createElement(ui.Container, { width: 0 },
                React__default["default"].createElement(ui.Stack, { space: 1 }, menuHeader !== null && menuHeader !== void 0 ? menuHeader : null,
                    React__default["default"].createElement(components.ValidationList, { documentType: type, markers: markers, onFocus: onFocus })))), popover: POPOVER_PROPS$1, placement: "bottom-end" }));
}

function usePreviewState(documentId, schemaType) {
    const [paneItemPreview, setPaneItemPreview] = React.useState({});
    React.useEffect(() => {
        if (!schemaType) {
            return undefined;
        }
        const subscription = getPreviewStateObservable(schemaType, documentId, '').subscribe((state) => {
            setPaneItemPreview(state);
        });
        return () => {
            subscription === null || subscription === void 0 ? void 0 : subscription.unsubscribe();
        };
    }, [documentId, schemaType]);
    return paneItemPreview;
}

const DateWithTooltipElementQuery = styled__default["default"](ui.ElementQuery) `
  .date-small {
    display: inline;
  }
  .date-medium {
    display: none;
  }
  .date-large {
    display: none;
  }

  &[data-eq-min~='1'] {
    .date-small {
      display: none;
    }
    .date-medium {
      display: inline;
    }
    .date-large {
      display: none;
    }
  }

  &[data-eq-min~='2'] {
    .date-small {
      display: none;
    }
    .date-medium {
      display: none;
    }
    .date-large {
      display: inline;
    }
  }
`;

const DialogScheduleEdit = (props) => {
    const { onClose, schedule } = props;
    const { updateSchedule } = usePollSchedules.useScheduleOperation();
    const { customValidation, errors, formData, isDirty, markers, onFormChange } = useScheduleForm(schedule);
    // Callbacks
    const handleScheduleUpdate = React.useCallback(() => {
        if (!(formData === null || formData === void 0 ? void 0 : formData.date)) {
            return;
        }
        // Update schedule then close self
        updateSchedule({
            date: formData.date,
            scheduleId: schedule.id,
        }).then(onClose);
    }, [formData === null || formData === void 0 ? void 0 : formData.date, onClose, schedule.id, updateSchedule]);
    return (React__default["default"].createElement(ui.Dialog, { footer: React__default["default"].createElement(ui.Box, { paddingX: 4, paddingY: 3 },
            React__default["default"].createElement(DialogFooter, { buttonText: "Update", disabled: !isDirty || errors.length > 0, onAction: handleScheduleUpdate, onComplete: onClose, tone: "primary" })), header: React__default["default"].createElement(DialogHeader, { title: "Edit schedule" }), id: "time-zone", onClose: onClose, width: 1 },
        React__default["default"].createElement(ui.Box, { padding: 4 },
            React__default["default"].createElement(EditScheduleForm, { customValidation: customValidation, markers: markers, onChange: onFormChange, value: formData }))));
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function useDialogScheduleEdit(schedule) {
    const { visible, show, hide } = useDialogVisible();
    const dialogProps = {
        onClose: hide,
        schedule,
        visible,
    };
    return {
        DialogScheduleEdit: visible ? DialogScheduleEdit : null,
        dialogProps,
        dialogScheduleEditShow: show,
        hide,
    };
}

const MenuItemWithPermissionsTooltip = (props) => {
    const { currentUser, hasPermission, icon, onClick, permissionsOperationLabel, title, tone } = props;
    return (React__default["default"].createElement(ui.Tooltip, { content: React__default["default"].createElement(ui.Box, { paddingX: 2, paddingY: 1 },
            React__default["default"].createElement(components.InsufficientPermissionsMessage, { currentUser: currentUser, operationLabel: permissionsOperationLabel })), disabled: hasPermission, placement: "left", portal: true },
        React__default["default"].createElement("div", null,
            React__default["default"].createElement(ui.MenuItem, { disabled: !hasPermission, icon: icon, onClick: onClick, text: title, tone: tone }))));
};

const ContextMenuItems = (props) => {
    const { actions, onDelete, onEdit, schedule, schemaType } = props;
    const firstDocument = getScheduledDocument(schedule);
    const { value: currentUser } = hooks.useCurrentUser();
    const [permissions, isPermissionsLoading] = hooks.unstable_useDocumentPairPermissions({
        id: firstDocument.documentId,
        type: schemaType === null || schemaType === void 0 ? void 0 : schemaType.name,
        permission: 'publish',
    });
    const { deleteSchedule, publishSchedule } = usePollSchedules.useScheduleOperation();
    const insufficientPermissions = !isPermissionsLoading && !(permissions === null || permissions === void 0 ? void 0 : permissions.granted);
    // Callbacks
    const handleEdit = () => {
        onEdit === null || onEdit === void 0 ? void 0 : onEdit();
    };
    const handleDelete = () => {
        deleteSchedule({ schedule }).then(() => onDelete === null || onDelete === void 0 ? void 0 : onDelete());
    };
    const handleExecute = () => {
        publishSchedule({ schedule });
    };
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        (actions === null || actions === void 0 ? void 0 : actions.edit) && (React__default["default"].createElement(MenuItemWithPermissionsTooltip, { currentUser: currentUser, hasPermission: !insufficientPermissions, icon: icons.CalendarIcon, onClick: handleEdit, permissionsOperationLabel: "edit schedules", title: "Edit schedule" })),
        (actions === null || actions === void 0 ? void 0 : actions.execute) && (React__default["default"].createElement(MenuItemWithPermissionsTooltip, { currentUser: currentUser, hasPermission: !insufficientPermissions, icon: icons.PublishIcon, onClick: handleExecute, permissionsOperationLabel: "execute schedules", title: "Publish now" })),
        (actions === null || actions === void 0 ? void 0 : actions.delete) && (React__default["default"].createElement(MenuItemWithPermissionsTooltip, { currentUser: currentUser, hasPermission: !insufficientPermissions, icon: icons.TrashIcon, onClick: handleDelete, permissionsOperationLabel: "delete schedules", title: "Delete schedule", tone: "critical" })),
        (actions === null || actions === void 0 ? void 0 : actions.clear) && (React__default["default"].createElement(MenuItemWithPermissionsTooltip, { currentUser: currentUser, hasPermission: !insufficientPermissions, icon: icons.CheckmarkCircleIcon, onClick: handleDelete, permissionsOperationLabel: "delete schedules", title: "Clear completed schedule" }))));
};

const ScheduleContextMenu = (props) => {
    const { actions, onDelete, onEdit, schedule, schemaType } = props;
    return (React__default["default"].createElement(ui.MenuButton, { button: React__default["default"].createElement(ui.Button, { icon: icons.EllipsisVerticalIcon, mode: "bleed", paddingX: 2, paddingY: 3, tone: "default" }), id: "contextMenu", menu: React__default["default"].createElement(ui.Menu, null,
            React__default["default"].createElement(ContextMenuItems, { actions: actions, onDelete: onDelete, onEdit: onEdit, schedule: schedule, schemaType: schemaType })), placement: "left", popover: { portal: true, tone: 'default' } }));
};

// Duration to wait before validating (after this component has mounted)
const VALIDATION_DELAY_MS = 1500;
/**
 * useValidationStatus requires a published id, and we dont always have that
 *
 * This a boilerplate wrapper component around it,
 * so we conditionally call back with updated status whenver it is possible.
 * */
function ValidateScheduleDoc({ schedule, updateValidation }) {
    const schemaType = useScheduleSchemaType(schedule);
    const id = getScheduledDocumentId(schedule);
    if (!id || !(schemaType === null || schemaType === void 0 ? void 0 : schemaType.name)) {
        return null;
    }
    return (React__default["default"].createElement(DelayedValidationRunner, { id: id, schemaName: schemaType.name, updateValidation: updateValidation }));
}
function DelayedValidationRunner({ id, schemaName, updateValidation }) {
    const [ready, setReady] = React.useState(false);
    React.useEffect(() => {
        const timeout = setTimeout(() => {
            setReady(true);
        }, VALIDATION_DELAY_MS);
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    if (!ready) {
        return null;
    }
    return React__default["default"].createElement(ValidationRunner, { id: id, schemaName: schemaName, updateValidation: updateValidation });
}
function ValidationRunner({ id, schemaName, updateValidation }) {
    const validationStatus = reactHooks.useValidationStatus(id, schemaName);
    React.useEffect(() => {
        if (!validationStatus.isValidating) {
            updateValidation(validationStatus);
        }
    }, [updateValidation, validationStatus]);
    return null;
}

/**
 * If `useElementQueries` is enabled, dates will be conditionally toggled at different element
 * breakpoints, provided this `<DateWithTooltip>` is wrapped in a `<DateElementQuery>` component.
 */
const DateWithTooltip = (props) => {
    const { date, useElementQueries } = props;
    const { formatDateTz } = usePollSchedules.useTimeZone();
    // Get distance between both dates
    const distance = dateFns.formatDistance(date, new Date(), {
        addSuffix: true,
    });
    const dateTimeLarge = formatDateTz({ date, format: usePollSchedules.DATE_FORMAT.LARGE });
    const dateTimeMedium = formatDateTz({ date, format: usePollSchedules.DATE_FORMAT.MEDIUM });
    const dateTimeSmall = formatDateTz({ date, format: usePollSchedules.DATE_FORMAT.SMALL });
    return (React__default["default"].createElement(ui.Text, { size: 1, textOverflow: "ellipsis" },
        React__default["default"].createElement(ui.Tooltip, { content: React__default["default"].createElement(ui.Box, { padding: 2 },
                React__default["default"].createElement(ui.Text, { muted: true, size: 1 }, distance)), portal: true },
            React__default["default"].createElement("span", null, useElementQueries ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement("span", { className: "date-small" }, dateTimeSmall),
                React__default["default"].createElement("span", { className: "date-medium" }, dateTimeMedium),
                React__default["default"].createElement("span", { className: "date-large" }, dateTimeLarge))) : (dateTimeLarge)))));
};

// https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/desk-tool/src/components/TimeAgo.tsx
function TimeAgo({ time }) {
    const timeAgo = hooks.useTimeAgo(time);
    return React__default["default"].createElement("span", { title: timeAgo },
        timeAgo,
        " ago");
}

// Based on https://github.com/sanity-io/sanity/blob/next/packages/@sanity/desk-tool/src/components/DraftStatus.tsx
const DraftStatus = ({ document }) => (React__default["default"].createElement(ui.Tooltip, { content: React__default["default"].createElement(ui.Box, { padding: 2 },
        React__default["default"].createElement(ui.Text, { size: 1 }, document ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            "Edited ",
            (document === null || document === void 0 ? void 0 : document._updatedAt) && React__default["default"].createElement(TimeAgo, { time: document === null || document === void 0 ? void 0 : document._updatedAt }))) : (React__default["default"].createElement(React__default["default"].Fragment, null, "No unpublished edits")))), portal: true },
    React__default["default"].createElement(components.TextWithTone, { tone: "caution", dimmed: !document, muted: !document, size: 1 },
        React__default["default"].createElement(icons.EditIcon, null))));

// Based on https://github.com/sanity-io/sanity/blob/next/packages/%40sanity/desk-tool/src/components/PublishedStatus.tsx
const PublishedStatus = ({ document }) => (React__default["default"].createElement(ui.Tooltip, { content: React__default["default"].createElement(ui.Box, { padding: 2 },
        React__default["default"].createElement(ui.Text, { size: 1 }, document ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            "Published ",
            document._updatedAt && React__default["default"].createElement(TimeAgo, { time: document._updatedAt }))) : (React__default["default"].createElement(React__default["default"].Fragment, null, "Not published")))), portal: true },
    React__default["default"].createElement(components.TextWithTone, { tone: "positive", dimmed: !document, muted: !document, size: 1 },
        React__default["default"].createElement(icons.PublishIcon, null))));

const POPOVER_PROPS = {
    portal: true,
    constrainSize: true,
    preventOverflow: true,
    tone: 'default',
    width: 0,
};
const StateReasonFailedInfo = (props) => {
    const { stateReason } = props;
    return (React__default["default"].createElement(ui.MenuButton, { id: "stateReason", button: React__default["default"].createElement(ui.Button, { title: "Schedule failed", mode: "bleed", "data-testid": "schedule-validation-list-button", icon: icons.ErrorOutlineIcon, tone: "critical" }), menu: React__default["default"].createElement(ui.Menu, { padding: 1 },
            React__default["default"].createElement(ui.Container, { padding: 2, width: 0 },
                React__default["default"].createElement(ui.Text, { size: 1 }, usePollSchedules.SCHEDULE_FAILED_TEXT),
                React__default["default"].createElement(ui.Flex, { gap: 3, marginTop: 4, padding: 1 },
                    React__default["default"].createElement(ui.Text, { size: 1, style: { color: color.red[700].hex } },
                        React__default["default"].createElement(icons.ErrorOutlineIcon, null)),
                    React__default["default"].createElement(ui.Text, { size: 1, style: { color: color.red[700].hex }, weight: "medium" }, stateReason)))), placement: "bottom-end", popover: POPOVER_PROPS }));
};

const User = (props) => {
    const { id } = props;
    return React__default["default"].createElement(components.UserAvatar, { userId: id, withTooltip: true });
};

const PreviewWrapper = (props) => {
    const { children, contextMenu, linkComponent, onClick, previewState, publishedDocumentId, schedule, schemaType, useElementQueries, } = props;
    const [validationStatus, setValidationStatus] = React.useState(validationUtils.EMPTY_VALIDATION_STATUS);
    const { markers } = validationStatus;
    const { hasError, validationTone } = validationUtils.useValidationState(markers);
    const { formatDateTz } = usePollSchedules.useTimeZone();
    const executeDate = usePollSchedules.getLastExecuteDate(schedule);
    const scheduleDate = executeDate ? new Date(executeDate) : null;
    return (React__default["default"].createElement(ui.Card, { padding: 1, radius: 2, shadow: 1, tone: validationTone },
        React__default["default"].createElement(ui.Flex, { align: "center", gap: 1, justify: "space-between" },
            React__default["default"].createElement(ui.Card, { __unstable_focusRing: true, as: linkComponent ? linkComponent : undefined, "data-as": onClick || linkComponent ? 'a' : undefined, flex: 1, onClick: onClick, padding: 1, radius: 2, tabIndex: 0, tone: validationTone },
                React__default["default"].createElement(ui.Flex, { align: "center", gap: 3, justify: "flex-start", paddingLeft: children ? 0 : [1, 2] },
                    children && React__default["default"].createElement(ui.Box, { style: { flexBasis: 'auto', flexGrow: 1 } }, children),
                    React__default["default"].createElement(ui.Flex, { style: { flexShrink: 0 } },
                        React__default["default"].createElement(ui.Badge, { fontSize: 0, mode: "outline", tone: usePollSchedules.SCHEDULE_ACTION_DICTIONARY[schedule.action].badgeTone }, schedule.action)),
                    React__default["default"].createElement(ui.Box, { display: ['block', 'none'], style: { flexShrink: 0, width: '90px' } },
                        React__default["default"].createElement(ui.Stack, { space: 2 }, scheduleDate ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                            React__default["default"].createElement(ui.Text, { size: 1 }, formatDateTz({ date: scheduleDate, format: 'dd/MM/yyyy' })),
                            React__default["default"].createElement(ui.Text, { size: 1 }, formatDateTz({ date: scheduleDate, format: 'p' })))) : (React__default["default"].createElement(ui.Text, { muted: true, size: 1 },
                            React__default["default"].createElement("em", null, "No date specified"))))),
                    React__default["default"].createElement(ui.Box, { display: ['none', 'block'], style: { flexShrink: 0, maxWidth: '250px', width: children ? '35%' : 'auto' } }, scheduleDate ? (React__default["default"].createElement(DateWithTooltip, { date: scheduleDate, useElementQueries: useElementQueries })) : (React__default["default"].createElement(ui.Text, { muted: true, size: 1 },
                        React__default["default"].createElement("em", null, "No date specified")))),
                    !children && (React__default["default"].createElement(ui.Box, { style: { visibility: 'hidden' } },
                        React__default["default"].createElement(preview.SanityDefaultPreview, null))),
                    React__default["default"].createElement(ui.Flex, { align: "center", style: { flexShrink: 0, marginLeft: 'auto' } },
                        React__default["default"].createElement(ui.Box, { display: ['none', 'none', 'block'], marginX: 3, style: { flexShrink: 0 } },
                            React__default["default"].createElement(User, { id: schedule === null || schedule === void 0 ? void 0 : schedule.author })),
                        React__default["default"].createElement(ui.Box, { display: ['none', 'block'], marginX: [2, 2, 3], style: { flexShrink: 0 } },
                            React__default["default"].createElement(ui.Inline, { space: 4 },
                                React__default["default"].createElement(PublishedStatus, { document: previewState === null || previewState === void 0 ? void 0 : previewState.published }),
                                React__default["default"].createElement(DraftStatus, { document: previewState === null || previewState === void 0 ? void 0 : previewState.draft })))))),
            React__default["default"].createElement(ui.Flex, { justify: "center", style: { width: '38px' } },
                schedule.state === 'scheduled' && (React__default["default"].createElement(ui.Box, null,
                    React__default["default"].createElement(ValidateScheduleDoc, { schedule: schedule, updateValidation: setValidationStatus }),
                    React__default["default"].createElement(ValidationInfo, { markers: markers, type: schemaType, documentId: publishedDocumentId, menuHeader: React__default["default"].createElement(ui.Box, { padding: 2 },
                            React__default["default"].createElement(ui.Text, { size: 1 }, hasError ? usePollSchedules.DOCUMENT_HAS_ERRORS_TEXT : usePollSchedules.DOCUMENT_HAS_WARNINGS_TEXT)) }))),
                schedule.state === 'cancelled' && (React__default["default"].createElement(StateReasonFailedInfo, { stateReason: schedule.stateReason }))),
            contextMenu && React__default["default"].createElement(ui.Box, { style: { flexShrink: 0 } }, contextMenu))));
};

const DocumentPreview = (props) => {
    const { schedule, schemaType } = props;
    const { DialogScheduleEdit, dialogProps, dialogScheduleEditShow } = useDialogScheduleEdit(schedule);
    const { onComplete } = useDocumentActionProps();
    const publishedId = React.useMemo(() => getScheduledDocumentId(schedule), [schedule]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        DialogScheduleEdit && React__default["default"].createElement(DialogScheduleEdit, Object.assign({}, dialogProps)),
        React__default["default"].createElement(PreviewWrapper, { contextMenu: React__default["default"].createElement(ScheduleContextMenu, { actions: {
                    delete: true,
                    edit: true,
                }, onDelete: onComplete, onEdit: dialogScheduleEditShow, schedule: schedule, schemaType: schemaType }), onClick: dialogScheduleEditShow, publishedDocumentId: publishedId, schedule: schedule, schemaType: schemaType })));
};

/**
 * 'Fallback' context menu used with schedules that don't have any valid associated documentType.
 * Currently, all users can delete schedules that don't have any associated documents, so we don't need to check for permissions here.
 */
const FallbackContextMenu = (props) => {
    const { onDelete, schedule } = props;
    const { deleteSchedule } = usePollSchedules.useScheduleOperation();
    const handleDelete = () => {
        deleteSchedule({ schedule }).then(() => onDelete === null || onDelete === void 0 ? void 0 : onDelete());
    };
    return (React__default["default"].createElement(ui.MenuButton, { button: React__default["default"].createElement(ui.Button, { icon: icons.EllipsisVerticalIcon, mode: "bleed", paddingX: 2, paddingY: 3, tone: "default" }), id: "contextMenu", menu: React__default["default"].createElement(ui.Menu, null,
            React__default["default"].createElement(ui.MenuItem, { icon: icons.TrashIcon, onClick: handleDelete, text: "Delete schedule", tone: "critical" })), placement: "left", popover: { portal: true, tone: 'default' } }));
};

const NoSchemaItem = ({ schedule }) => {
    return (React__default["default"].createElement(PreviewWrapper, { contextMenu: React__default["default"].createElement(FallbackContextMenu, { schedule: schedule }), schedule: schedule, useElementQueries: true },
        React__default["default"].createElement(preview.SanityDefaultPreview, { icon: icons.UnknownIcon, layout: "default", value: {
                subtitle: React__default["default"].createElement("em", null, "It may have been deleted"),
                title: React__default["default"].createElement("em", { style: { color: color.red[600].hex } }, "Document not found"),
            } })));
};

const ToolPreview = (props) => {
    const { previewState, schedule, schemaType } = props;
    const visibleDocument = previewState.draft || previewState.published;
    const isCompleted = schedule.state === 'succeeded';
    const isScheduled = schedule.state === 'scheduled';
    const { DialogScheduleEdit, dialogProps, dialogScheduleEditShow } = useDialogScheduleEdit(schedule);
    const publishedId = validationUtils.usePublishedId(visibleDocument === null || visibleDocument === void 0 ? void 0 : visibleDocument._id);
    const LinkComponent = React.useMemo(() => {
        return React.forwardRef((linkProps, ref) => (React__default["default"].createElement(components.IntentLink, Object.assign({}, linkProps, { intent: "edit", params: {
                type: schemaType.name,
                id: visibleDocument && draftUtils.getPublishedId(visibleDocument === null || visibleDocument === void 0 ? void 0 : visibleDocument._id),
            }, ref: ref }))));
    }, [schemaType.name, visibleDocument]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        DialogScheduleEdit && React__default["default"].createElement(DialogScheduleEdit, Object.assign({}, dialogProps)),
        React__default["default"].createElement(PreviewWrapper, { contextMenu: React__default["default"].createElement(ScheduleContextMenu, { actions: {
                    clear: isCompleted,
                    delete: !isCompleted,
                    edit: isScheduled,
                    execute: isScheduled,
                }, onEdit: dialogScheduleEditShow, schedule: schedule, schemaType: schemaType }), linkComponent: LinkComponent, previewState: previewState, publishedDocumentId: publishedId, schedule: schedule, schemaType: schemaType, useElementQueries: true },
            React__default["default"].createElement(preview.SanityDefaultPreview, { icon: schemaType === null || schemaType === void 0 ? void 0 : schemaType.icon, isPlaceholder: previewState.isLoading, layout: "default", value: visibleDocument }))));
};

const ScheduleItem = (props) => {
    const { schedule, type } = props;
    const firstDocument = getScheduledDocument(schedule);
    const schemaType = useScheduleSchemaType(schedule);
    const previewState = usePreviewState(firstDocument === null || firstDocument === void 0 ? void 0 : firstDocument.documentId, schemaType);
    const visibleDocument = previewState.draft || previewState.published;
    const invalidDocument = !visibleDocument && !previewState.isLoading;
    const preview = React.useMemo(() => {
        if (!schemaType || invalidDocument) {
            return React__default["default"].createElement(NoSchemaItem, { schedule: schedule });
        }
        if (type === 'document') {
            return React__default["default"].createElement(DocumentPreview, { schedule: schedule, schemaType: schemaType });
        }
        if (type === 'tool') {
            return React__default["default"].createElement(ToolPreview, { previewState: previewState, schedule: schedule, schemaType: schemaType });
        }
        return null;
    }, [invalidDocument, previewState, schedule, schemaType, type]);
    return React__default["default"].createElement(DateWithTooltipElementQuery, null, preview);
};

exports.ButtonTimeZone = ButtonTimeZone;
exports.ButtonTimeZoneElementQuery = ButtonTimeZoneElementQuery;
exports.DialogFooter = DialogFooter;
exports.DialogHeader = DialogHeader;
exports.DocumentActionPropsProvider = DocumentActionPropsProvider;
exports.EditScheduleForm = EditScheduleForm;
exports.ErrorCallout = ErrorCallout;
exports.ScheduleItem = ScheduleItem;
exports.ValidationInfo = ValidationInfo;
exports.useHasScheduledPublishing = useHasScheduledPublishing;
exports.useScheduleForm = useScheduleForm;
exports.useSchemaType = useSchemaType;
