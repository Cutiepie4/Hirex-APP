import moment from 'moment'

export const formatRemainingTime = (str: string | number) => {
    if (str) {
        const timeBetween = moment.duration(moment().diff(moment(str)));
        if (timeBetween.years() > 0) {
            return `${timeBetween.years()} năm trước` 
        } else if (timeBetween.months() > 0) {
            return `${timeBetween.months()} tháng trước` 
        } else if (timeBetween.days() > 0) {
            return `${timeBetween.days()} ngày trước` 
        } else if (timeBetween.hours() > 0) {
            return `${timeBetween.hours()} giờ trước` 
        } else if (timeBetween.minutes() > 0) {
            return `${timeBetween.minutes()} phút trước` 
        } else if (timeBetween.seconds() > 0) {
            return `vừa xong` 
        }
    }
    // if (str) {
    //     moment.locale('vi')
    //     return moment(str).fromNow()
    // }
    return '-'
}