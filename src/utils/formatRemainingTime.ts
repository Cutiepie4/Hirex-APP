import moment from 'moment'
import React from 'react';

export const formatRemainingTime = (str) => {
    // const [currentTime, setCurrentTime] = React.useState(moment());
    // const timeBetween = moment.duration(currentTime.diff(moment(str)));
    // if (timeBetween.years() > 0) {
    //     return `${timeBetween.years()} years ago` 
    // } else if (timeBetween.months() > 0) {
    //     return `${timeBetween.months()} months ago` 
    // } else if (timeBetween.days() > 0) {
    //     return `${timeBetween.days()} days ago` 
    // } else if (timeBetween.hours() > 0) {
    //     return `${timeBetween.hours()} hours ago` 
    // } else if (timeBetween.minutes() > 0) {
    //     return `${timeBetween.minutes()} minutes ago` 
    // } else if (timeBetween.seconds() > 0) {
    //     return `few seconds ago` 
    // }
    if (str) {
        return moment(str).fromNow()
    }
    return '-'
}