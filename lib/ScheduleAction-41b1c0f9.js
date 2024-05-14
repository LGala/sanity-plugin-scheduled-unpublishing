'use strict';

var components = require('@sanity/base/components');
var hooks = require('@sanity/base/hooks');
var icons = require('@sanity/icons');
var ui = require('@sanity/ui');
var React = require('react');
var ScheduleItem = require('./ScheduleItem-8ae3bc8d.js');
var usePollSchedules = require('./usePollSchedules-a51955a4.js');
var validationUtils = require('./validationUtils-fdbe6576.js');
var reactHooks = require('@sanity/react-hooks');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function NewScheduleInfo({ id, schemaType }) {
    return (React__default["default"].createElement(ui.Stack, { space: 4 },
        React__default["default"].createElement(ui.Text, { size: 1 }, "Schedule this document to be published or unpublished at any time in the future. If one of the two fields is missing the associated action will not be performed (for example if only filling the \"Publish at\" field, the document won't be unpublished)"),
        React__default["default"].createElement(ValidationWarning, { id: id, type: schemaType })));
}
function ValidationWarning({ id, type }) {
    const publishedId = validationUtils.usePublishedId(id);
    const schema = ScheduleItem.useSchemaType(type);
    const validationStatus = reactHooks.useValidationStatus(publishedId, type);
    const { hasError } = validationUtils.useValidationState(validationStatus.markers);
    if (!hasError) {
        return null;
    }
    return (React__default["default"].createElement(ui.Card, { padding: 2, radius: 1, shadow: 1, tone: "critical" },
        React__default["default"].createElement(ui.Flex, { gap: 1, align: "center" },
            React__default["default"].createElement(ScheduleItem.ValidationInfo, { markers: validationStatus.markers, type: schema, documentId: publishedId }),
            React__default["default"].createElement(ui.Text, { size: 1 }, usePollSchedules.DOCUMENT_HAS_ERRORS_TEXT))));
}

const Schedules = (props) => {
    const { schedules } = props;
    return (React__default["default"].createElement(ui.Stack, { space: 4 }, schedules.length === 0 ? (React__default["default"].createElement(ui.Box, null,
        React__default["default"].createElement(ui.Text, { size: 1 }, "No schedules"))) : (React__default["default"].createElement(ui.Stack, { space: 2 }, schedules.map((schedule) => (React__default["default"].createElement(ScheduleItem.ScheduleItem, { key: schedule.id, schedule: schedule, type: "document" })))))));
};

const debug = usePollSchedules.debugWithName('ScheduleAction');
/**
 * NOTE: Document actions are re-run whenever `onComplete` is called.
 *
 * The `onComplete` callback prop is used to typically denote that an action is 'finished',
 * and default behavior means that `useEffect` and other hooks are immediately re-run upon 'completion'.
 *
 * This particular custom action has a hook that polls an endpoint (`usePollSchedules`) and any
 * triggered `onComplete` action (typically done when a dialog is closed) will automatically query
 * this endpoint by virtue of the hook re-running and in turn, revalidate our data.
 *
 * In this case, this is exactly what we want (we want to revalidate once a schedule has been created,
 * updated or deleted) - just be mindful that any hooks here can and will run multiple times, even with
 * empty dependency arrays.
 */
const ScheduleAction = (props) => {
    const { draft, id, liveEdit, onComplete, published, type } = props;
    // Studio hooks
    const { value: currentUser } = hooks.useCurrentUser();
    const [permissions, isPermissionsLoading] = hooks.unstable_useDocumentPairPermissions({
        id,
        type,
        permission: 'publish',
    });
    const { createSchedule } = usePollSchedules.useScheduleOperation();
    // Check if the current project supports Scheduled Publishing
    const hasFeature = ScheduleItem.useHasScheduledPublishing();
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const { customValidation: publishEventCustomValidation, errors: publishEventErrors, formData: publishEventFormData, markers: publishEventMarkers, onFormChange: publishEventOnFormChange, } = ScheduleItem.useScheduleForm();
    const { customValidation: unpublishEventCustomValidation, errors: unpublishEventErrors, formData: unpublishEventFormData, markers: unpublishEventMarkers, onFormChange: unpublishEventOnFormChange, } = ScheduleItem.useScheduleForm();
    // Poll for document schedules
    const { error: fetchError, isInitialLoading, schedules, } = usePollSchedules.usePollSchedules({
        documentId: id,
        state: 'scheduled',
    });
    debug('schedules', schedules);
    const hasExistingSchedules = schedules && schedules.length > 0;
    // Check to see if the document 'exists' (has either been published OR has draft content).
    // When creating a new document, despite having an ID assigned it won't exist in your dataset
    // until the document has been edited / dirtied in any way.
    const documentExists = draft !== null || published !== null;
    const insufficientPermissions = !isPermissionsLoading && !(permissions === null || permissions === void 0 ? void 0 : permissions.granted);
    // Callbacks
    const handleDialogOpen = React.useCallback(() => {
        setDialogOpen(true);
    }, []);
    const handleScheduleCreate = React.useCallback(() => {
        if (publishEventFormData === null || publishEventFormData === void 0 ? void 0 : publishEventFormData.date) {
            createSchedule({ date: publishEventFormData === null || publishEventFormData === void 0 ? void 0 : publishEventFormData.date, documentId: id }).then(onComplete);
        }
        if (unpublishEventFormData === null || unpublishEventFormData === void 0 ? void 0 : unpublishEventFormData.date) {
            createSchedule({
                date: unpublishEventFormData === null || unpublishEventFormData === void 0 ? void 0 : unpublishEventFormData.date,
                documentId: id,
                action: 'unpublish',
            }).then(onComplete);
        }
    }, [createSchedule, publishEventFormData === null || publishEventFormData === void 0 ? void 0 : publishEventFormData.date, unpublishEventFormData === null || unpublishEventFormData === void 0 ? void 0 : unpublishEventFormData.date, id, onComplete]);
    const title = hasExistingSchedules ? 'Edit Schedule' : 'Schedule';
    if (insufficientPermissions) {
        return {
            disabled: true,
            icon: icons.CalendarIcon,
            label: title,
            title: (React__default["default"].createElement(components.InsufficientPermissionsMessage, { currentUser: currentUser, operationLabel: "edit schedules" })),
        };
    }
    let tooltip = `This document doesn't exist yet`;
    if (documentExists) {
        tooltip = null;
    }
    if (isInitialLoading) {
        tooltip = 'Loading schedules';
    }
    if (liveEdit) {
        tooltip =
            'Live Edit is enabled for this content type and publishing happens automatically as you make changes';
    }
    let dialog;
    if (hasFeature === false) {
        dialog = {
            content: React__default["default"].createElement(ui.Text, { size: 1 }, usePollSchedules.FEATURE_NOT_SUPPORTED_TEXT),
            header: 'Feature not available',
            onClose: onComplete,
            type: 'modal',
        };
    }
    else {
        dialog = {
            content: fetchError ? (React__default["default"].createElement(ScheduleItem.ErrorCallout, { description: "More information in the developer console.", title: "Something went wrong, unable to retrieve schedules." })) : (React__default["default"].createElement(ScheduleItem.DocumentActionPropsProvider, { value: props }, hasExistingSchedules ? (React__default["default"].createElement(Schedules, { schedules: schedules })) : (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(NewScheduleInfo, { id: id, schemaType: type }),
                React__default["default"].createElement("br", null),
                React__default["default"].createElement(ScheduleItem.EditScheduleForm, { customValidation: publishEventCustomValidation, markers: publishEventMarkers, onChange: publishEventOnFormChange, value: publishEventFormData, title: "Publish at" }),
                React__default["default"].createElement("br", null),
                React__default["default"].createElement(ScheduleItem.EditScheduleForm, { customValidation: unpublishEventCustomValidation, markers: unpublishEventMarkers, onChange: unpublishEventOnFormChange, value: unpublishEventFormData, title: "Unpublish at" }))))),
            footer: !hasExistingSchedules && (React__default["default"].createElement(ScheduleItem.DialogFooter, { buttonText: "Schedule", disabled: (!(publishEventFormData === null || publishEventFormData === void 0 ? void 0 : publishEventFormData.date) || publishEventErrors.length > 0) &&
                    (!(unpublishEventFormData === null || unpublishEventFormData === void 0 ? void 0 : unpublishEventFormData.date) || unpublishEventErrors.length > 0), icon: icons.ClockIcon, onAction: handleScheduleCreate, onComplete: onComplete, tone: "primary" })),
            header: React__default["default"].createElement(ScheduleItem.DialogHeader, { title: title }),
            onClose: onComplete,
            type: 'modal',
        };
    }
    return {
        dialog: dialogOpen && dialog,
        disabled: isInitialLoading || !documentExists || liveEdit,
        label: title,
        icon: icons.CalendarIcon,
        onHandle: handleDialogOpen,
        title: tooltip && React__default["default"].createElement(ui.Box, { style: { maxWidth: '315px' } }, tooltip),
    };
};

exports.ScheduleAction = ScheduleAction;
