import DateFnsUtils from "@date-io/date-fns";
import format from "date-fns/format";

export default class RuLocalizedUtils extends DateFnsUtils {
    getCalendarHeaderText(date) {
        return format(date, "LLLL", {locale: this.locale});
    }

    getDatePickerHeaderText(date) {
        return format(date, "dd MMMM", {locale: this.locale});
    }
}