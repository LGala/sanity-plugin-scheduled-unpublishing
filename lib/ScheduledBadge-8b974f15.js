'use strict';

var dateFns = require('date-fns');
var usePollSchedules = require('./usePollSchedules-a51955a4.js');

const debug = usePollSchedules.debugWithName('ScheduledBadge');
const ScheduledBadge = (props) => {
    // Poll for document schedules
    const { schedules } = usePollSchedules.usePollSchedules({ documentId: props.id, state: 'scheduled' });
    debug('schedules', schedules);
    const upcomingSchedule = schedules === null || schedules === void 0 ? void 0 : schedules[0];
    if (!upcomingSchedule || !upcomingSchedule.executeAt) {
        return null;
    }
    const formattedDateTime = dateFns.format(new Date(upcomingSchedule.executeAt), usePollSchedules.DATE_FORMAT.LARGE);
    return {
        color: usePollSchedules.SCHEDULE_ACTION_DICTIONARY[upcomingSchedule.action].badgeColor,
        label: `Scheduled`,
        title: `${usePollSchedules.SCHEDULE_ACTION_DICTIONARY[upcomingSchedule.action].actionName} on ${formattedDateTime} (local time)`,
    };
};

exports.ScheduledBadge = ScheduledBadge;
