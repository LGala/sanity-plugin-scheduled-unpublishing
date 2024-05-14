'use strict';

var React = require('react');
var types = require('@sanity/types');

function usePublishedId(id) {
    return React.useMemo(() => (id ? id.replaceAll('drafts.', '') : undefined), [id]);
}

const EMPTY_VALIDATION_STATUS = {
    markers: [],
    isValidating: false,
};
function getValidationState(markers) {
    const validationMarkers = markers.filter((marker) => marker.type === 'validation');
    const hasError = validationMarkers.filter(types.isValidationErrorMarker).length > 0;
    const hasWarning = validationMarkers.filter(types.isValidationWarningMarker).length > 0;
    let validationTone = 'default';
    if (hasWarning) {
        validationTone = 'default'; //not using 'caution' for now
    }
    if (hasError) {
        validationTone = 'critical';
    }
    return {
        markers,
        validationTone,
        hasError,
        hasWarning,
    };
}
function useValidationState(markers) {
    return React.useMemo(() => getValidationState(markers), [markers]);
}

exports.EMPTY_VALIDATION_STATUS = EMPTY_VALIDATION_STATUS;
exports.usePublishedId = usePublishedId;
exports.useValidationState = useValidationState;
