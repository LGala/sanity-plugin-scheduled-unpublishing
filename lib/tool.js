'use strict';

var icons = require('@sanity/icons');
var router$1 = require('part:@sanity/base/router');
var router = require('@sanity/base/router');
var color = require('@sanity/color');
var ui = require('@sanity/ui');
var dateFns = require('date-fns');
var React = require('react');
var styled = require('styled-components');
var ScheduleItem = require('./ScheduleItem-8ae3bc8d.js');
var usePollSchedules = require('./usePollSchedules-a51955a4.js');
var tslib = require('tslib');
var reactVirtual = require('react-virtual');
var preview = require('part:@sanity/base/preview');
require('swr');
require('part:@sanity/base/util/draft-utils');
require('rxjs');
require('rxjs/operators');
require('part:@sanity/base/schema');
require('date-fns-tz');
require('@reach/auto-id');
require('@sanity/base/components');
require('react-focus-lock');
require('lodash');
require('@sanity/base/hooks');
require('./validationUtils-fdbe6576.js');
require('@sanity/types');
require('@sanity/react-hooks');
require('@sanity/util/paths');
require('part:@sanity/base/client');
require('pluralize');
require('debug');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

const SchedulesContext = React.createContext(undefined);
const EMPTY_SCHEDULE = [];
function SchedulesProvider({ children, value, }) {
    const [sortBy, setSortBy] = React.useState(value.sortBy || 'executeAt');
    const { utcToCurrentZoneDate } = usePollSchedules.useTimeZone();
    const filterByDate = React.useCallback((wallDate) => {
        return function (schedule) {
            const executeDate = usePollSchedules.getLastExecuteDate(schedule);
            if (!executeDate) {
                return false;
            }
            const scheduleDate = new Date(executeDate); // UTC
            const zonedScheduleDate = utcToCurrentZoneDate(scheduleDate);
            return dateFns.isSameDay(zonedScheduleDate, wallDate);
        };
    }, [utcToCurrentZoneDate]);
    const filterByState = React.useCallback((scheduleState) => {
        return function (schedule) {
            return schedule.state === scheduleState;
        };
    }, []);
    /**
     * Return all schedules if no date is currently selected, otherwise return all schedules for the
     * selected calendar date.
     *
     * By default, all schedules are displayed in reverse chronlogical order
     * except when filtering by upcoming schedules, or a date has been selected in the calendar.
     *
     * If a schedule as an `executedAt` date, sort by that instead.
     * This is because schedules may have differing values for `executeAt` and `executedAt` if
     * they've been force-published ahead of time, and we only care about the final execution date.
     *
     * Schedules with a null value for `executeAt` (possible if created externally via the Scheduling API)
     * should always be placed after all other results.
     */
    const activeSchedules = React.useMemo(() => {
        return (value.schedules
            .filter((scheduleState) => {
            if (value.selectedDate) {
                return filterByDate(value.selectedDate)(scheduleState);
            }
            return filterByState(value.scheduleState)(scheduleState);
        })
            .sort((a, b) => {
            if (sortBy === 'createdAt') {
                return a[sortBy] < b[sortBy] ? 1 : -1;
            }
            if (sortBy === 'executeAt') {
                const reverseOrder = !(value.scheduleState === 'scheduled' || value.selectedDate);
                return usePollSchedules.sortByExecuteDate({ reverseOrder })(a, b);
            }
            return 1;
        }) || []);
    }, [
        filterByDate,
        filterByState,
        sortBy,
        value.schedules,
        value.scheduleState,
        value.selectedDate,
    ]);
    /**
     * Return all matching schedules with specified date (in clock time).
     *
     * Scheduled are sorted chronologically by executed + execute date.
     *
     * Schedules with a null value for `executeAt` (possible if created externally via the Scheduling API)
     * should always be placed after all other results.
     */
    const schedulesByDate = React.useCallback((wallDate) => {
        return value.schedules
            .filter(filterByDate(wallDate)) //
            .sort(usePollSchedules.sortByExecuteDate());
    }, [filterByDate, value.schedules]);
    return (React__default["default"].createElement(SchedulesContext.Provider, { value: {
            activeSchedules,
            schedules: value.schedules || EMPTY_SCHEDULE,
            schedulesByDate,
            scheduleState: value.scheduleState,
            selectedDate: value.selectedDate,
            setSortBy,
            sortBy,
        } }, children));
}
function useSchedules() {
    const context = React.useContext(SchedulesContext);
    if (context === undefined) {
        throw new Error('useSchedules must be used within a SchedulesProvider');
    }
    return context;
}

const FeatureBanner = () => {
    // Check if the current project supports Scheduled Publishing
    const hasFeature = ScheduleItem.useHasScheduledPublishing();
    if (hasFeature === false) {
        return (React__default["default"].createElement(ui.Card, { padding: 4, tone: "caution" },
            React__default["default"].createElement(ui.Flex, { align: "center", gap: 3 },
                React__default["default"].createElement(ui.Text, { size: 2 },
                    React__default["default"].createElement(icons.InfoOutlineIcon, null)),
                React__default["default"].createElement(ui.Text, { size: 1 }, usePollSchedules.FEATURE_NOT_SUPPORTED_TEXT))));
    }
    return null;
};

function useFilteredSchedules(schedules, filter) {
    return React.useMemo(() => schedules.filter((schedule) => schedule.state === filter), [schedules, filter]);
}

const ScheduleFilter = (props) => {
    const { selected, schedules, state } = props, rest = tslib.__rest(props, ["selected", "schedules", "state"]);
    const count = useFilteredSchedules(schedules, state).length;
    const hasItems = count > 0;
    const critical = state === 'cancelled';
    const criticalCount = state === 'cancelled' && hasItems;
    return (React__default["default"].createElement(ui.Tab
    // @ts-expect-error actually, this as property works but is missing in the typings
    , Object.assign({ 
        // @ts-expect-error actually, this as property works but is missing in the typings
        as: router.StateLink, id: state, paddingX: 1, paddingY: 2, selected: selected, state: { state }, tone: critical ? 'critical' : 'default' }, rest),
        React__default["default"].createElement(ui.Flex, { align: "center", paddingX: 1 },
            React__default["default"].createElement(ui.Text, { size: 2, weight: "medium" }, usePollSchedules.SCHEDULE_STATE_DICTIONARY[state].title),
            React__default["default"].createElement(ui.Box, { marginLeft: count > 0 ? 2 : 0, style: {
                    background: criticalCount ? color.red[500].hex : 'transparent',
                    color: criticalCount ? color.white.hex : 'inherit',
                    border: 'none',
                    boxShadow: 'none',
                    borderRadius: '2px',
                    visibility: hasItems ? 'visible' : 'hidden',
                    padding: hasItems ? '0.25em 0.4em' : '0.25em 0',
                    width: hasItems ? 'auto' : 0,
                } },
                React__default["default"].createElement(ui.Text, { size: 1, style: { color: criticalCount ? color.white.hex : 'inherit' } }, count)))));
};

const ScheduleFilters = (props) => {
    const { onClearDate, selectedDate } = props;
    const { navigate } = router.useRouter();
    const { schedules, scheduleState } = useSchedules();
    const handleMenuClick = (state) => {
        navigate(state);
    };
    const currentSchedules = useFilteredSchedules(schedules, scheduleState);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(ui.Box, { display: ['block', 'block', 'none'] },
            selectedDate && (React__default["default"].createElement(ui.Button, { fontSize: 2, iconRight: icons.CloseIcon, onClick: onClearDate, text: dateFns.format(selectedDate, 'd MMMM yyyy'), tone: "primary" })),
            scheduleState && (React__default["default"].createElement(ui.MenuButton, { button: React__default["default"].createElement(ui.Button, { fontSize: 2, iconRight: icons.SelectIcon, mode: "ghost", text: `${usePollSchedules.SCHEDULE_STATE_DICTIONARY[scheduleState].title} (${(currentSchedules === null || currentSchedules === void 0 ? void 0 : currentSchedules.length) || 0})`, tone: "default" }), id: "state", menu: React__default["default"].createElement(ui.Menu, { style: { minWidth: '175px' } },
                    React__default["default"].createElement(ui.Box, { paddingX: 3, paddingY: 2 },
                        React__default["default"].createElement(ui.Label, { muted: true, size: 1 }, "Scheduled state")),
                    usePollSchedules.SCHEDULE_FILTERS.map((filter) => (React__default["default"].createElement(ui.MenuItem, { iconRight: filter === scheduleState ? icons.CheckmarkIcon : undefined, key: filter, onClick: handleMenuClick.bind(undefined, { state: filter }), text: usePollSchedules.SCHEDULE_STATE_DICTIONARY[filter].title })))), placement: "bottom" }))),
        React__default["default"].createElement(ui.Box, { display: ['none', 'none', 'block'] },
            selectedDate && (React__default["default"].createElement(ui.Button, { iconRight: icons.CloseIcon, onClick: onClearDate, text: dateFns.format(selectedDate, 'd MMMM yyyy'), tone: "primary" })),
            scheduleState && (React__default["default"].createElement(ui.TabList, { space: 2 }, usePollSchedules.SCHEDULE_FILTERS.map((filter) => (React__default["default"].createElement(ScheduleFilter, { key: filter, schedules: schedules, selected: scheduleState === filter, state: filter }))))))));
};

const BigIconComingSoon = (props) => {
    return (React__default["default"].createElement("svg", Object.assign({ width: "100", height: "100", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
        React__default["default"].createElement("path", { d: "M54 26C54 28.7614 49.0751 31 43 31C36.9249 31 32 28.7614 32 26C32 23.2386 36.9249 7 43 7C49.0751 7 54 23.2386 54 26Z", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M65 71.5V57M65 71.5L60.5789 69.0132M65 71.5L60.5789 73.9868M65 57L57 52.5L54 54.1875M65 57V42.5M65 57L57 47M65 57L58.1586 60.8483M65 57L60.5789 67.5M65 42.5L57 38L54 39.6875M65 42.5L57 47M65 42.5V27.5M57 47L65 27.5M57 47L54 39.6875M57 47L54 45.3125M57 47L54 50.75M57 23L65 27.5M57 23L54 24.6875V39.6875M57 23V60M65 27.5L57 32L54 30.3125", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M54 76C54 78.7614 49.0751 81 43 81C36.9249 81 32 78.7614 32 76M54 76H60.5V63L54 57M54 76V57M32 76H25V63L32 57M32 76V57M32 26V57M54 26V57M54 45C54 47.7614 49.0751 50 43 50V35C49.0751 35 54 32.7614 54 30", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M43 45.5701H44.8976L45.8465 43.1981L46.9679 42.7335L49.3162 43.7399L50.658 42.3981L49.6516 40.0499L50.1161 38.9284L52.4882 37.9795V36.0819L50.1161 35.1331L49.6516 34.0116M47.1334 34.9653C47.5197 35.5597 47.7441 36.269 47.7441 37.0307C47.7441 39.1268 46.0449 40.826 43.9488 40.826C43.6212 40.826 43.3033 40.7845 43 40.7064", stroke: "#7B8CA8", strokeWidth: "1.2", strokeLinejoin: "round" }),
        React__default["default"].createElement("path", { d: "M63.5464 78.6739L64.9606 78.0321L67.4355 78.5135L68.6174 78.2913L69.6174 77.1566H71.6174L72.6174 78.2913L73.7994 78.5135L76.2743 78.0321L77.6885 78.6739M63.5464 78.6739L64.607 79.7972L64.1174 80.3336L63.5464 80.4373M63.5464 78.6739V80.4373M77.6885 78.6739L76.6278 79.7972L77.1174 80.3336L77.6885 80.4373M77.6885 78.6739V80.4373M63.5464 80.4373L61.6174 80.7875V81.6952L64.1174 82.1491L64.607 82.6855L63.5464 83.8088L64.9606 84.4506L67.4355 83.9693L68.6174 84.1915L69.6174 85.3261H71.6174L72.6174 84.1915L73.7994 83.9693L76.2743 84.4506L77.6885 83.8088L76.6278 82.6855L77.1174 82.1491L79.6174 81.6952V80.7875L77.6885 80.4373", stroke: "#7B8CA8", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }),
        React__default["default"].createElement("path", { d: "M79.6174 81.4647V84.7162L77.6885 85.0664M76.2743 87.4716L77.6885 86.8298V85.0664M76.2743 87.4716L73.7994 86.9902L72.6174 87.2124L71.6174 88.3471M76.2743 87.4716V84.7162M61.6174 81.4647V84.7162L63.5464 85.0664M71.6174 88.3471H69.6174M71.6174 88.3471V85.3261M69.6174 88.3471L68.6174 87.2124L67.4355 86.9902L64.9606 87.4716M69.6174 88.3471V85.3261M64.9606 87.4716L64.2535 87.1507L63.5464 86.8298V85.0664M64.9606 87.4716V84.6825M63.5464 84.039V85.0664M77.6885 84.039V85.0664", stroke: "#7B8CA8", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }),
        React__default["default"].createElement("path", { d: "M73.6174 81.2412C73.6174 81.9932 72.2743 82.6028 70.6174 82.6028C68.9606 82.6028 67.6174 81.9932 67.6174 81.2412C67.6174 80.4892 68.9606 79.8796 70.6174 79.8796C72.2743 79.8796 73.6174 80.4892 73.6174 81.2412Z", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M90 85.3616C90 86.1136 88.6569 86.7232 87 86.7232C85.3431 86.7232 84 86.1136 84 85.3616M90 85.3616C90 84.6096 88.6569 84 87 84C85.3431 84 84 84.6096 84 85.3616M90 85.3616V87.3616C90 88.1136 88.6569 88.7232 87 88.7232C85.3431 88.7232 84 88.1136 84 87.3616V85.3616", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M82 89.8648C82 90.3425 81.3284 90.7297 80.5 90.7297C79.6716 90.7297 79 90.3425 79 89.8648M82 89.8648C82 89.3872 81.3284 89 80.5 89C79.6716 89 79 89.3872 79 89.8648M82 89.8648V91.1352C82 91.6128 81.3284 92 80.5 92C79.6716 92 79 91.6128 79 91.1352V89.8648", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M52.7555 46.7289L52.5381 45.0136L51.2951 44.6903L50.2695 46.0824L49.4558 46.1956L48.0892 45.1364L46.9817 45.7867L47.2408 47.4962L46.7455 48.1517L45.0302 48.3691L44.7069 49.612M51.1084 47.9593C49.8968 47.6442 48.6622 48.2485 48.1434 49.3385", stroke: "#7B8CA8", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }),
        React__default["default"].createElement("path", { d: "M39 80.5L38 83.5C38 84.8807 40.2386 86 43 86C45.7614 86 48 84.8807 48 83.5L47 80.5", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M32 77L31 80C31 81.3807 33.2386 82.5 36 82.5C36.9107 82.5 37.7646 82.3783 38.5 82.1655", stroke: "#7B8CA8", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" }),
        React__default["default"].createElement("path", { d: "M54 77L55 80C55 81.3807 52.7614 82.5 50 82.5C49.0893 82.5 48.2354 82.3783 47.5 82.1655", stroke: "#7B8CA8", strokeWidth: "1.2", strokeLinecap: "round", strokeLinejoin: "round" })));
};

const BigIconScreen = (props) => {
    return (React__default["default"].createElement("svg", Object.assign({ width: "100", height: "100", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
        React__default["default"].createElement("path", { d: "M35 84.5L41.7308 67H50V69.5M65 84.5L58.2692 67M32 65H42.5H50H57.5H81V23H19V65H24", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M84 16V23H16V16M84 16H16M84 16L82 14H18L16 16", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M24 65H18L17 67H83L82 65H32", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("circle", { cx: "50", cy: "72", r: "2", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M24 63C24 61.8954 24.8954 61 26 61H30C31.1046 61 32 61.8954 32 63V67H24V63Z", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M24 65C24 63.8954 24.8954 63 26 63H30C31.1046 63 32 63.8954 32 65V67H24V65Z", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M28 44.9975C31.0617 44.62 33.5601 42.4793 35.2478 39.995C36.199 38.5947 36.9116 37.0761 36.9653 35.3597C36.9973 34.3355 36.8332 33.1459 35.8944 32.5454C35.3035 32.1675 34.4935 32.0285 33.8044 32.0022C32.7788 31.9631 32.1643 32.4357 31.8489 33.4197C30.3123 38.2145 33.0184 42.7025 36.3911 45.8977C38.1152 47.531 40.0746 48.9275 42.1179 50.1294C43.9867 51.2287 46.003 52.2595 48.1189 52.7885C48.9466 52.9954 50.4951 53.3913 51.3211 52.954C52.3579 52.4051 51.8285 49.7323 51.7091 48.9809C51.3862 46.9486 50.7293 45.0311 49.8726 43.1662C49.3791 42.0918 48.7948 40.8004 47.9999 39.8967C47.4959 39.3237 47.1331 39.4889 47.1101 40.2278C47.0699 41.5204 47.5768 42.7535 48.3103 43.7973C50.633 47.1024 54.4924 49.4656 58.2792 50.6985C59.9643 51.2471 61.8953 51.7306 63.6853 51.6193C65.3845 51.5137 65.6225 50.1321 65.7287 48.655C65.9958 44.9405 64.9629 40.7695 62.6403 37.7963C61.615 36.4839 60.3547 35.6334 58.6879 35.4476C57.7554 35.3437 56.665 35.3303 55.7391 35.5097C54.8073 35.6903 54.0162 36.297 54.3371 37.3462C54.6464 38.3572 55.8044 39.0666 56.6444 39.5759C57.983 40.3876 59.4813 40.9898 61.0262 41.2624C63.2658 41.6576 65.1745 41.1715 67.141 40.1346C67.9966 39.6835 68.8825 39.1795 69.4379 38.3861", stroke: "#7B8CA8", strokeWidth: "1.2" })));
};

const BigIconSuccess = (props) => {
    return (React__default["default"].createElement("svg", Object.assign({ width: "100", height: "100", viewBox: "0 0 100 100", fill: "none", xmlns: "http://www.w3.org/2000/svg" }, props),
        React__default["default"].createElement("path", { d: "M35.5034 34.5961C35.6531 34.1763 35.8628 33.792 36.1352 33.4478C37.6813 31.4827 40.9503 31.2145 44.9898 32.3554M35.5034 34.5961L24.12 78.5806C23.4656 81.1092 26.1309 83.2083 28.4357 81.9796L68.4485 60.6484M35.5034 34.5961C34.2315 38.1622 37.2902 44.2842 43.0792 50.0342M68.4485 60.6484C68.8174 60.4078 69.1391 60.118 69.4084 59.7777C70.9736 57.7883 70.4521 54.4677 68.3472 50.7308M68.4485 60.6484C65.1795 62.7806 58.1999 61.0522 51.0413 56.4338M49.3164 55.2667C48.6043 54.7622 47.8933 54.2299 47.1867 53.6707C46.3331 52.9953 45.5161 52.3044 44.7387 51.6037M49.3164 55.2667C49.8913 55.674 50.4669 56.0632 51.0413 56.4338M49.3164 55.2667C52.3445 53.1871 58.7283 49.8329 66.4965 47.8874M51.0413 56.4338C55.9305 53.432 62.4593 51.6876 68.3472 50.7308M43.0792 50.0342C43.6098 50.5612 44.1634 51.0852 44.7387 51.6037M43.0792 50.0342C44.4006 45.7138 45.8116 38.387 44.9898 32.3554M44.7387 51.6037C47.6743 44.2968 48.7135 38.3712 48.6643 33.6916M63.9622 36.487C63.2905 34.23 62.35 29.5386 63.9622 28.8293C65.9774 27.9426 68.5569 33.5045 70.8139 32.2148C73.0709 30.9251 69.4435 27.7814 70.8139 25.2019C72.1842 22.6224 79.6002 28.4262 81.2123 23.4285C82.502 19.4304 79.7614 16.6574 78.2298 15.7708M66.4965 47.8874C70.7697 46.8171 75.462 46.1731 80.2449 46.4019L80.2449 49.7068C77.5329 49.6936 73.1535 49.9498 68.3472 50.7308M66.4965 47.8874C64.45 45.1054 61.6564 42.2264 58.3003 39.5859C55.0633 37.039 51.7429 35.0416 48.6643 33.6916M48.6643 33.6916C48.5822 25.8794 45.4671 21.5396 43.0792 20.043L39.941 23.4285C42.9851 25.0774 44.4569 28.4441 44.9898 32.3554", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M32.2094 47.3001C31.0515 50.5465 34.6857 56.6214 40.9597 61.5862C47.2404 66.5562 53.9958 68.696 56.8839 66.8122", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M28.8867 60.1903C28.1245 62.3275 30.5169 66.3267 34.6472 69.595C38.7818 72.8669 43.229 74.2755 45.1303 73.0354", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M26.2718 70.2225C25.8147 71.5039 27.2491 73.9016 29.7254 75.8611C32.2044 77.8228 34.8707 78.6673 36.0106 77.9238", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("path", { d: "M28.0529 44.1724C29.5354 43.1981 32.3735 40.6904 31.8652 38.4538C31.2298 35.6581 22.8425 38.9622 22.7155 36.5477C22.5884 34.1331 27.0361 30.575 26.909 28.6688C26.7819 26.7626 18.6489 30.8291 18.6489 26.8896C18.6489 23.738 21.36 22.1029 22.7155 21.6793", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "21.8833", y: "50.1122", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 21.8833 50.1122)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "16.0527", y: "36.722", width: "3.03077", height: "3.03077", transform: "rotate(4.36851 16.0527 36.722)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "27.9448", y: "22.8353", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 27.9448 22.8353)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "53.7065", y: "33.443", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 53.7065 33.443)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "67.3447", y: "13.743", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 67.3447 13.743)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "74.9219", y: "54.6584", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 74.9219 54.6584)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "70.3755", y: "66.7814", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 70.3755 66.7814)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "77.9526", y: "78.9045", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 77.9526 78.9045)", stroke: "#7B8CA8", strokeWidth: "1.2" }),
        React__default["default"].createElement("rect", { x: "82.4985", y: "62.2353", width: "3.03077", height: "3.03077", transform: "rotate(-24.7154 82.4985 62.2353)", stroke: "#7B8CA8", strokeWidth: "1.2" })));
};

const EmptySchedules = (props) => {
    const { scheduleState, selectedDate } = props;
    let BigIcon;
    let description;
    let heading;
    switch (scheduleState) {
        case 'succeeded': {
            description =
                'When a scheduled document is successfully published it moves to this list view.';
            heading = 'No completed scheduled publications ... yet';
            BigIcon = BigIconComingSoon;
            break;
        }
        case 'cancelled': {
            description =
                'Schedules can fail for several reasons, for example when their documents are deleted. When they do, they show up here.';
            heading = 'No failed scheduled publications';
            BigIcon = BigIconSuccess;
            break;
        }
        case 'scheduled': {
            description =
                'When editing a document, create a new scheduled publication from the menu next to the Publish button.';
            heading = 'No upcoming scheduled publications';
            BigIcon = BigIconScreen;
            break;
        }
    }
    if (selectedDate) {
        description = 'No schedules for this date.';
        heading = dateFns.format(selectedDate, 'd MMMM yyyy');
        BigIcon = BigIconScreen;
    }
    return (React__default["default"].createElement(ui.Card, { paddingX: 6, paddingBottom: 8, paddingTop: 7, radius: 2, shadow: 1 },
        React__default["default"].createElement(ui.Stack, { space: 4 },
            React__default["default"].createElement(ui.Flex, { justify: "center" }, BigIcon && React__default["default"].createElement(BigIcon, null)),
            React__default["default"].createElement(ui.Stack, { space: 4 },
                heading && (React__default["default"].createElement(ui.Heading, { align: "center", size: 1 }, heading)),
                description && (React__default["default"].createElement(ui.Text, { align: "center", size: 1 }, description))))));
};

/** First month header is not as high, to reduce whitespace */
const MONTH_HEADER_PX = 30;
/** Accounts for row height and spacing between rows */
const ITEM_HEIGHT_PX = 59;
/** Putting this too low will result in 429 too many requests when scrolling in big lists */
const SCHEDULE_RENDER_DELAY_MS = 200;
function VirtualListItem(props) {
    const { item: { content, virtualRow }, } = props;
    const style = React.useMemo(() => ({
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        transform: `translateY(${virtualRow.start}px)`,
    }), [virtualRow]);
    if (typeof content === 'string') {
        return (React__default["default"].createElement("div", { ref: virtualRow.measureRef, style: Object.assign(Object.assign({}, style), { height: virtualRow.index === 0 ? MONTH_HEADER_PX : MONTH_HEADER_PX * 2 }) },
            React__default["default"].createElement(MonthHeading, { content: content })));
    }
    return (React__default["default"].createElement("div", { ref: virtualRow.measureRef, style: Object.assign(Object.assign({}, style), { height: ITEM_HEIGHT_PX }) },
        React__default["default"].createElement(DelayedScheduleItem, { schedule: content })));
}
/**
 * ScheduleItem is a bit on the heavy side for rendering speed. This component defers rendering ScheduleItem
 * until "some time after" mounting, so scrolling in the virtualized Schedule-list gives better UX.
 */
function DelayedScheduleItem({ schedule }) {
    const [delayedScheduleItem, setDelayedScheduleItem] = React.useState(React__default["default"].createElement(PlaceholderScheduleItem, null));
    React.useEffect(() => {
        let canUpdate = true;
        const timeout = setTimeout(() => {
            if (!canUpdate) {
                return;
            }
            setDelayedScheduleItem(React__default["default"].createElement(ScheduleItem.ScheduleItem, { schedule: schedule, type: "tool" }));
        }, SCHEDULE_RENDER_DELAY_MS);
        return () => {
            canUpdate = false;
            clearTimeout(timeout);
        };
    }, [schedule]);
    return delayedScheduleItem;
}
function MonthHeading({ content }) {
    return (React__default["default"].createElement(ui.Flex, { align: "flex-end", paddingBottom: 4, style: {
            bottom: 0,
            position: 'absolute',
        } },
        React__default["default"].createElement(ui.Label, { muted: true, size: 1 }, content)));
}
function PlaceholderScheduleItem() {
    return (React__default["default"].createElement(ui.Card, { padding: 1, radius: 2, shadow: 1 },
        React__default["default"].createElement(ui.Card, { padding: 1 },
            React__default["default"].createElement(preview.SanityDefaultPreview, { isPlaceholder: true }))));
}

function getLocalizedDate(date) {
    return new Date(date).toLocaleString('default', {
        month: 'long',
        year: 'numeric',
    });
}
const VirtualList = () => {
    const { activeSchedules, scheduleState, sortBy } = useSchedules();
    const { virtualList, totalSize, containerRef } = useVirtualizedSchedules(activeSchedules, sortBy);
    const { deleteSchedules } = usePollSchedules.useScheduleOperation();
    const handleClearSchedules = () => {
        deleteSchedules({ schedules: activeSchedules || [] });
    };
    // Reset virtual list scroll position on state changes
    React.useEffect(() => {
        var _a;
        (_a = containerRef === null || containerRef === void 0 ? void 0 : containerRef.current) === null || _a === void 0 ? void 0 : _a.scrollTo(0, 0);
    }, [containerRef, scheduleState, sortBy]);
    return (React__default["default"].createElement(ui.Box, { paddingBottom: 6, paddingX: 4, paddingTop: 4, ref: containerRef, style: {
            position: 'relative',
            overflowX: 'hidden',
            overflowY: 'auto',
            height: '100%',
            boxSizing: 'border-box',
        } },
        React__default["default"].createElement(ui.Box, { style: {
                height: `${totalSize}px`,
                width: '100%',
                position: 'relative',
            } }, virtualList.map((item) => {
            return React__default["default"].createElement(VirtualListItem, { key: item.key, item: item });
        })),
        scheduleState === 'succeeded' && (React__default["default"].createElement(ui.Flex, { justify: "center", marginTop: 6 },
            React__default["default"].createElement(ui.Button, { icon: icons.CheckmarkCircleIcon, mode: "ghost", onClick: handleClearSchedules, text: "Clear all completed schedules" })))));
};
function useVirtualizedSchedules(activeSchedules, sortBy) {
    const containerRef = React__default["default"].useRef(null);
    const listSourceItems = React.useMemo(() => {
        const items = [];
        activeSchedules.forEach((schedule, index) => {
            if (sortBy == 'executeAt') {
                // Get localised date string for current and previous schedules (e.g. 'February 2025')
                const previousSchedule = activeSchedules[index - 1];
                const previousExecuteDate = usePollSchedules.getLastExecuteDate(previousSchedule);
                const datePrevious = index > 0 && previousExecuteDate ? getLocalizedDate(previousExecuteDate) : null;
                const currentExecuteDate = usePollSchedules.getLastExecuteDate(schedule);
                const dateCurrent = currentExecuteDate ? getLocalizedDate(currentExecuteDate) : null;
                if (dateCurrent !== datePrevious) {
                    items.push(dateCurrent ? dateCurrent : 'No date specified');
                }
            }
            items.push(schedule);
        });
        return items;
    }, [activeSchedules, sortBy]);
    const { virtualItems, totalSize } = reactVirtual.useVirtual({
        size: listSourceItems.length,
        parentRef: containerRef,
        overscan: 5,
    });
    const virtualList = React.useMemo(() => virtualItems.map((virtualRow) => {
        const item = listSourceItems[virtualRow.index];
        return {
            content: item,
            key: typeof item === 'string' ? item : item.id,
            virtualRow,
        };
    }), [virtualItems, listSourceItems]);
    return {
        virtualList,
        totalSize,
        containerRef,
    };
}

const Schedules = () => {
    const { activeSchedules, selectedDate, scheduleState } = useSchedules();
    return (React__default["default"].createElement(ui.Box, { style: { height: '100%' } }, activeSchedules.length === 0 ? (React__default["default"].createElement(ui.Box, { padding: 4 },
        React__default["default"].createElement(EmptySchedules, { scheduleState: scheduleState, selectedDate: selectedDate }))) : (React__default["default"].createElement(VirtualList, null))));
};

const SchedulesContextMenu = () => {
    const { setSortBy, sortBy } = useSchedules();
    // Callbacks
    const handleSortByCreateAt = () => setSortBy('createdAt');
    const handleSortByExecuteAt = () => setSortBy('executeAt');
    return (React__default["default"].createElement(ui.MenuButton, { button: React__default["default"].createElement(ui.Button, { icon: icons.EllipsisVerticalIcon, mode: "bleed", paddingX: 2, paddingY: 3, tone: "default" }), id: "sort", menu: React__default["default"].createElement(ui.Menu, { style: { minWidth: '250px' } },
            React__default["default"].createElement(ui.Box, { paddingX: 3, paddingY: 2 },
                React__default["default"].createElement(ui.Label, { muted: true, size: 1 }, "Sort")),
            React__default["default"].createElement(ui.MenuItem, { icon: icons.SortIcon, iconRight: sortBy === 'createdAt' ? icons.CheckmarkIcon : undefined, onClick: handleSortByCreateAt, text: "Sort by time added" }),
            React__default["default"].createElement(ui.MenuItem, { icon: icons.SortIcon, iconRight: sortBy === 'executeAt' ? icons.CheckmarkIcon : undefined, onClick: handleSortByExecuteAt, text: "Sort by time scheduled" })) }));
};

const Pip = (props) => {
    const { mode = 'default', selected } = props;
    return (React__default["default"].createElement(ui.Box, { style: Object.assign(Object.assign(Object.assign({}, (mode === 'default'
            ? {
                background: color.gray[selected ? 100 : 300].hex,
            }
            : {})), (mode === 'failed'
            ? {
                background: color.red[500].hex,
            }
            : {})), { borderRadius: '2px', height: '2px', width: '100%' }) }));
};

function CalendarDay(props) {
    const { date, focused, isCurrentMonth, isToday, onSelect, selected } = props;
    const { schedulesByDate } = useSchedules();
    const schedules = schedulesByDate(date);
    const handleClick = React.useCallback(() => {
        if (selected) {
            onSelect(undefined);
        }
        else {
            onSelect(date);
        }
    }, [date, onSelect, selected]);
    let tone;
    if (isToday || selected) {
        tone = 'primary';
    }
    else if (dateFns.isWeekend(date)) {
        // tone = 'transparent'
        tone = 'default';
    }
    else {
        tone = 'default';
    }
    const hasSchedules = schedules.length > 0;
    // Parition schedules by state
    const { completed, failed, upcoming } = React.useMemo(() => {
        return {
            completed: schedules.filter((s) => s.state === 'succeeded'),
            failed: schedules.filter((s) => s.state === 'cancelled'),
            upcoming: schedules.filter((s) => s.state === 'scheduled'),
        };
    }, [schedules]);
    return (React__default["default"].createElement("div", { "aria-selected": selected, "data-ui": "CalendarDay" },
        React__default["default"].createElement(ui.Tooltip, { content: React__default["default"].createElement(TooltipContent, { date: date, schedules: schedules }), disabled: !hasSchedules, portal: true },
            React__default["default"].createElement(ui.Card, { "aria-label": date.toDateString(), "aria-pressed": selected, as: "button", __unstable_focusRing: true, "data-weekday": true, "data-focused": focused ? 'true' : '', role: "button", tabIndex: -1, onClick: handleClick, paddingX: 3, paddingY: 4, radius: 2, selected: selected, style: { position: 'relative' }, tone: tone },
                React__default["default"].createElement(ui.Text, { size: 1, style: {
                        opacity: !selected && !isCurrentMonth ? 0.35 : 1,
                        textAlign: 'center',
                    } }, selected ? React__default["default"].createElement(icons.CloseIcon, null) : date.getDate()),
                React__default["default"].createElement(ui.Box, { style: {
                        bottom: 2,
                        left: 2,
                        position: 'absolute',
                        right: 2,
                    } },
                    React__default["default"].createElement(ui.Flex, { align: "center", gap: 1, justify: "center" },
                        completed.length > 0 && React__default["default"].createElement(Pip, { selected: selected }),
                        upcoming.length > 0 && React__default["default"].createElement(Pip, { selected: selected }),
                        failed.length > 0 && React__default["default"].createElement(Pip, { mode: "failed", selected: selected })))))));
}
function TooltipContent(props) {
    const { date, schedules = [] } = props;
    const { formatDateTz } = usePollSchedules.useTimeZone();
    const schedulesByState = schedules.reduce((acc, val) => {
        acc[val.state].push(val);
        return acc;
    }, {
        cancelled: [],
        succeeded: [],
        scheduled: [],
    });
    return (React__default["default"].createElement(ui.Box, { padding: 3 },
        React__default["default"].createElement(ui.Box, { marginBottom: 4 },
            React__default["default"].createElement(ui.Text, { size: 1, weight: "medium" }, dateFns.format(date, 'd MMMM yyyy'))),
        React__default["default"].createElement(ui.Stack, { space: 3 }, Object.keys(schedulesByState).map((key) => {
            const stateSchedules = schedulesByState[key];
            if (stateSchedules.length === 0) {
                return null;
            }
            return (React__default["default"].createElement(ui.Stack, { key: key, space: 2 },
                React__default["default"].createElement(ui.Label, { muted: true, size: 0 }, usePollSchedules.SCHEDULE_STATE_DICTIONARY[key].title),
                React__default["default"].createElement(ui.Stack, { space: 1 }, stateSchedules
                    .filter((schedule) => schedule.executeAt)
                    .map((schedule) => {
                    const executeDate = usePollSchedules.getLastExecuteDate(schedule);
                    if (!executeDate) {
                        return null;
                    }
                    return (React__default["default"].createElement(ui.Inline, { key: schedule.id, space: 2 },
                        React__default["default"].createElement(ui.Box, { style: { width: '60px' } },
                            React__default["default"].createElement(ui.Text, { size: 1, weight: "regular" }, formatDateTz({ date: new Date(executeDate), format: 'p' }))),
                        React__default["default"].createElement(ui.Flex, { align: "center", style: { flexShrink: 0, opacity: schedule.action === 'unpublish' ? 1 : 0 } },
                            React__default["default"].createElement(ui.Badge, { fontSize: 0, mode: "outline", tone: usePollSchedules.SCHEDULE_ACTION_DICTIONARY[schedule.action].badgeTone }, schedule.action))));
                }))));
        }))));
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
    return (React__default["default"].createElement(ui.Box, { "aria-hidden": props.hidden || false, "data-ui": "CalendarMonth" },
        React__default["default"].createElement(ui.Grid, { style: {
                gridGap: '1px',
                gridTemplateColumns: 'repeat(7, 1fr)',
            } },
            WEEK_DAY_NAMES.map((weekday) => {
                // Convert day name string into date.
                // `eee` assumes days are in the format 'Mon', 'Tues' etc.
                // const date = parse(weekday, 'eee', new Date())
                return (React__default["default"].createElement(ui.Card, { key: weekday, paddingY: 3 },
                    React__default["default"].createElement(ui.Label, { size: 1, style: { textAlign: 'center' } }, weekday.substring(0, 1))));
            }),
            getWeeksOfMonth(props.date).map((week, weekIdx) => week.days.map((date, dayIdx) => {
                const focused = props.focused && dateFns.isSameDay(date, props.focused);
                const selected = props.selected && dateFns.isSameDay(date, props.selected);
                const isToday = dateFns.isSameDay(date, getCurrentZoneDate());
                const isCurrentMonth = props.focused && dateFns.isSameMonth(date, props.focused);
                return (React__default["default"].createElement(CalendarDay, { date: date, focused: focused, isCurrentMonth: isCurrentMonth, isToday: isToday, 
                    // eslint-disable-next-line react/no-array-index-key
                    key: `${weekIdx}-${dayIdx}`, onSelect: props.onSelect, selected: selected }));
            })))));
}

// This is used to maintain focus on a child element of the calendar-grid between re-renders
// When using arrow keys to move focus from a day in one month to another we are setting focus at the button for the day
// after it has changed but *only* if we *already* had focus inside the calendar grid (e.g not if focus was on the "next
// year" button, or any of the other controls)
// When moving from the last day of a month that displays 6 weeks in the grid to a month that displays 5 weeks, current
// focus gets lost on render, so this provides us with a stable element to help us preserve focus on a child element of
// the calendar grid between re-renders
const PRESERVE_FOCUS_ELEMENT = (React__default["default"].createElement("span", { "data-preserve-focus": true, style: { overflow: 'hidden', position: 'absolute', outline: 'none' }, tabIndex: -1 }));
const Calendar = React.forwardRef(function Calendar(props, forwardedRef) {
    const { focusedDate, onFocusedDateChange, onSelect, selectedDate } = props, restProps = tslib.__rest(props, ["focusedDate", "onFocusedDateChange", "onSelect", "selectedDate"]);
    const { zoneDateToUtc } = usePollSchedules.useTimeZone();
    const setFocusedDate = React.useCallback((date) => onFocusedDateChange(zoneDateToUtc(date)), [onFocusedDateChange, zoneDateToUtc]);
    const moveFocusedDate = React.useCallback((by) => setFocusedDate(dateFns.addMonths(focusedDate, by)), [focusedDate, setFocusedDate]);
    const handleDateChange = React.useCallback((date) => {
        if (date) {
            const targetDate = zoneDateToUtc(dateFns.setMinutes(dateFns.setHours(date, date.getHours()), date.getMinutes()));
            onSelect(targetDate);
            onFocusedDateChange(targetDate);
        }
        else {
            onSelect(undefined);
        }
    }, [onFocusedDateChange, onSelect, zoneDateToUtc]);
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
    // Select AND focus current date when 'today' is pressed
    const handleNowClick = React.useCallback(() => {
        const now = new Date();
        onSelect(now);
        onFocusedDateChange(now);
    }, [onFocusedDateChange, onSelect]);
    const handlePrevMonthClick = React.useCallback(() => moveFocusedDate(-1), [moveFocusedDate]);
    const handleNextMonthClick = React.useCallback(() => moveFocusedDate(1), [moveFocusedDate]);
    return (React__default["default"].createElement(ui.Box, Object.assign({ "data-ui": "Calendar" }, restProps, { ref: ref }),
        React__default["default"].createElement(ui.Flex, { align: "center", paddingLeft: 4, style: {
                borderBottom: '1px solid var(--card-border-color)',
                minHeight: `${usePollSchedules.TOOL_HEADER_HEIGHT}px`,
                position: 'sticky',
                top: 0,
            } },
            React__default["default"].createElement(ui.Flex, { align: "center", flex: 1, justify: "space-between" },
                React__default["default"].createElement(ui.Text, { weight: "medium" },
                    MONTH_NAMES[focusedDate === null || focusedDate === void 0 ? void 0 : focusedDate.getMonth()],
                    " ", focusedDate === null || focusedDate === void 0 ? void 0 :
                    focusedDate.getFullYear()),
                React__default["default"].createElement(ui.Flex, null,
                    React__default["default"].createElement(ui.Button, { icon: icons.ChevronLeftIcon, mode: "bleed", onClick: handlePrevMonthClick, radius: 0, style: { height: '55px', width: '50px' } }),
                    React__default["default"].createElement(ui.Button, { icon: icons.ChevronRightIcon, mode: "bleed", onClick: handleNextMonthClick, radius: 0, style: { height: '55px', width: '50px' } })))),
        React__default["default"].createElement(ui.Box, null,
            React__default["default"].createElement(ui.Box, { "data-calendar-grid": true, onKeyDown: handleKeyDown, overflow: "hidden", paddingBottom: 1, paddingX: 1, tabIndex: 0 },
                React__default["default"].createElement(CalendarMonth, { date: focusedDate, focused: focusedDate, onSelect: handleDateChange, selected: selectedDate }),
                PRESERVE_FOCUS_ELEMENT)),
        React__default["default"].createElement(ui.Box, { flex: 1, style: { borderBottom: '1px solid var(--card-border-color)' } },
            React__default["default"].createElement(ui.Button, { fontSize: 1, mode: "bleed", onClick: handleNowClick, padding: 4, radius: 0, style: { width: '100%' }, text: "Today" }))));
});

const ToolCalendar = (props) => {
    const { onSelect, selectedDate } = props;
    const { getCurrentZoneDate, utcToCurrentZoneDate } = usePollSchedules.useTimeZone();
    // Focus selected date (if routed) or user's current date (in stored time zone)
    const [focusedDate, setFocusedDate] = React.useState(selectedDate || getCurrentZoneDate());
    const handleFocusDateChange = React.useCallback((date) => {
        setFocusedDate(utcToCurrentZoneDate(date));
    }, [utcToCurrentZoneDate]);
    return (React__default["default"].createElement(Calendar, { focusedDate: focusedDate, onFocusedDateChange: handleFocusDateChange, onSelect: onSelect, selectedDate: selectedDate }));
};

const Column = styled__default["default"](ui.Box) `
  flex-direction: column;
  &:not(:last-child) {
    border-right: 1px solid var(--card-border-color);
  }
`;
const NO_SCHEDULE = [];
const DATE_SLUG_FORMAT = 'yyyy-MM-dd'; // date-fns format
function Tool(props) {
    const { router } = props;
    const { error, isInitialLoading, schedules = NO_SCHEDULE } = usePollSchedules.usePollSchedules();
    const lastScheduleState = React.useRef();
    const scheduleState = router.state.state;
    const selectedDate = router.state.date
        ? dateFns.parse(router.state.date, DATE_SLUG_FORMAT, new Date())
        : undefined;
    // Store last active schedule state
    React.useEffect(() => {
        if (router.state.state) {
            lastScheduleState.current = router.state.state;
        }
    }, [router.state.state]);
    // Default to first filter type ('upcoming') if no existing schedule state or
    // selected date can be inferred from current route.
    useFallbackNavigation(router, scheduleState, selectedDate);
    const { formatDateTz } = usePollSchedules.useTimeZone();
    const schedulesContext = React.useMemo(() => ({
        schedules,
        scheduleState,
        selectedDate,
    }), [schedules, scheduleState, selectedDate]);
    const handleClearDate = () => {
        router.navigate({ state: (lastScheduleState === null || lastScheduleState === void 0 ? void 0 : lastScheduleState.current) || usePollSchedules.SCHEDULE_FILTERS[0] });
    };
    const handleSelectDate = (date) => {
        if (date) {
            router.navigate({ date: formatDateTz({ date, format: DATE_SLUG_FORMAT }) });
        }
        else {
            router.navigate({ state: (lastScheduleState === null || lastScheduleState === void 0 ? void 0 : lastScheduleState.current) || usePollSchedules.SCHEDULE_FILTERS[0] });
        }
    };
    return (React__default["default"].createElement(SchedulesProvider, { value: schedulesContext },
        React__default["default"].createElement(ui.Card, { overflow: "hidden", style: {
                bottom: 0,
                left: 0,
                position: 'absolute',
                right: 0,
                top: 0,
            } },
            React__default["default"].createElement(FeatureBanner, null),
            React__default["default"].createElement(ui.Flex, { flex: 1, height: "fill" },
                React__default["default"].createElement(Column, { display: ['none', null, null, 'flex'], style: {
                        position: 'sticky',
                        top: 0,
                        width: '350px',
                    } },
                    React__default["default"].createElement(ToolCalendar, { onSelect: handleSelectDate, selectedDate: selectedDate })),
                React__default["default"].createElement(Column, { display: "flex", flex: 1, overflow: "hidden" },
                    React__default["default"].createElement(ScheduleItem.ButtonTimeZoneElementQuery, { style: {
                            background: color.white.hex,
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                        } },
                        React__default["default"].createElement(ui.Flex, { align: "center", paddingLeft: 4, paddingRight: 3, style: {
                                borderBottom: '1px solid var(--card-border-color)',
                                minHeight: `${usePollSchedules.TOOL_HEADER_HEIGHT}px`,
                            } },
                            React__default["default"].createElement(ui.Flex, { align: "center", flex: 1, justify: "space-between" },
                                React__default["default"].createElement(ScheduleFilters, { onClearDate: handleClearDate, selectedDate: selectedDate }),
                                React__default["default"].createElement(ui.Flex, { align: "center", gap: 1 },
                                    React__default["default"].createElement(ScheduleItem.ButtonTimeZone, { useElementQueries: true }),
                                    React__default["default"].createElement(SchedulesContextMenu, null))))),
                    React__default["default"].createElement(ui.Flex, { direction: "column", flex: 1 },
                        error && (React__default["default"].createElement(ui.Box, { paddingTop: 4, paddingX: 4 },
                            React__default["default"].createElement(ScheduleItem.ErrorCallout, { description: "More information in the developer console.", title: "Something went wrong, unable to retrieve schedules." }))),
                        React__default["default"].createElement(ui.Box, { flex: 1 }, isInitialLoading ? (React__default["default"].createElement(ui.Box, { padding: 4 },
                            React__default["default"].createElement(ui.Text, { muted: true }, "Loading..."))) : (
                        // Loaded schedules
                        React__default["default"].createElement(Schedules, null)))))))));
}
function useFallbackNavigation(router, filter, selectedDate) {
    React.useEffect(() => {
        if (!filter && !selectedDate) {
            router.navigate({ state: usePollSchedules.SCHEDULE_FILTERS[0] }, { replace: true });
        }
    }, [filter, router, selectedDate]);
}
var Tool$1 = router.withRouterHOC(Tool);

var tool = {
    component: Tool$1,
    icon: icons.CalendarIcon,
    name: 'schedules',
    router: router$1.route('/', [router$1.route('/state/:state'), router$1.route('/date/:date')]),
    title: 'Schedules',
};

module.exports = tool;
