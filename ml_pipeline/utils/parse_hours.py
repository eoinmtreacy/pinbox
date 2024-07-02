"""OpenStreetMaps Opening hours parser. 
Adapter to MoralCode's opening_hours parser to allow it to parse OpenStreetMap's time format.
"""
from parse_hours import OpeningHours
import re


class OSMOpeningHours:
    # Map of OSM format days and their conversion to OpeningHours days
    day_map = {
        "Mo": "Mon",
        "Tu": "Tue",
        "We": "Wed",
        "Fr": "Fri"
    }
    # Regexp for day range
    day_re = r"(Mon|Tue|Wed|Th|Fri|Sa|Su)(-(Mon|Tue|Wed|Th|Fri|Sa|Su))?"
    # Regexp for valid times and time ranges. i.e. both "10:00" and "10:00-11:00" are both valid
    time_re = r"([01]\d|2[0-9]):([0-5]\d)(-([01]\d|2[0-9]):([0-5]\d))?|off|closed"
    # Regexp for valid time range. i.e. "10:00" is not valid but "10:00-11:00" is.
    time_range_re = r"([01]\d|2[0-9]):([0-5]\d)(-([01]\d|2[0-9]):([0-5]\d))|off|closed"
    # Regexp for times with closing hours into the next day. closing hours of 4am are stored as 28:00 in OSM.
    overtime_re = r"([01]\d|2[0-9]):([0-5]\d)(-(2[4-9]):([0-5]\d))"
    # Rexexp for a valid time range for OpeningHours
    day_time_re = r"(Mon|Tue|Wed|Th|Fri|Sa|Su)?( *- *(Mon|Tue|Wed|Th|Fri|Sa|Su))? *([01]?\d|2[0-3]):([0-5]\d)( *- *([01]?\d|2[0-3]):([0-5]\d))"

    @classmethod
    def parse(cls, opening_hours: str) -> list[dict[str]]:
        """Parses OpenStreetMaps opening hours to a time format

        Args:
            opening_hours (str): opening hours in OpenStreetMaps format.

        Returns:
            list[dict[str]]: list object representation of opening hours for easy time parsing.
        """

        hours = cls.convert_to_statements(opening_hours)

        cls.clean_statements(hours)

        return cls.parse_statements(hours)

    @classmethod
    def convert_to_statements(cls, opening_hours: str) -> list[str]:
        """Convert string to multiple statements

        Args:
            opening_hours (str): Opening hours string

        Returns:
            list[str]: list of cleaned statements.
        """
        # Split semicolons
        hours = cls.split_semicolon_statements(opening_hours)

        # Convert the days to OpenStreetMaps format
        cls.convert_days(hours)

        hours = cls.expand_semicolon_statements(hours)

        return hours

    @classmethod
    def clean_statements(cls, statements):
        cls.remove_holidays(statements)
        cls.convert_late_closing(statements)
        cls.swap_plus_symbols_with_ranges(statements)

    @classmethod
    def parse_statements(cls, statements):
        opening_hours = []
        days_off = []
        for statement in statements:
            for time_range in statement:
                if time_range.endswith("off"):
                    days_off += [time_range[:-4]]
                    continue

                if time_range.endswith("closed"):
                    days_off += [time_range[:-7]]
                    continue

                parse_string = re.search(cls.day_time_re, time_range)

                if not parse_string:
                    print(time_range, "no date")
                    continue
                try:
                    opening_hours += OpeningHours.parse(
                        parse_string.group(), assume_type="24H").json()
                except:
                    print("Cannot parse date:", parse_string)

    @classmethod
    def split_semicolon_statements(cls, opening_hours: str) -> list[str]:
        """Splits time statments into list of statements. 
        e.g. "Mon 10:00-11:00; Tue 10:00-12:00" => ["Mon 10:00-11:00", "Tue 10:00-12:00"]
        """

        return [hour.strip() for hour in opening_hours.split(';')]

    @classmethod
    def split_comma_statement(cls, hours: list[str]) -> None:
        """Splits comma statement into separate statements for easier parsing. 
        e.g. "Mon-Th,Fri 13:00-15:00" => "Mon-Th 13:00-15:00", "Fri 13:00-15:00" 
             "Mon-Th 10:00-11:00, 12:00-13:00" => "Mon-Th 10:00-11:00", "Mon-Th 12:00-13:00" 
        """

        comma_statements = [hr.strip() for hr in hours.split(',')]
        # If a time after a comma is missing the days, then we must give it the days from the comma before
        # e.g. Mon-Th 11:00-12:00, 13:00-15:00 =>  Mon-Th 11:00-12:00, Mon-Th 13:00-15:00
        prev_days = None
        for i, hr in enumerate(comma_statements):
            if cls.contains_days(hr):
                prev_days = re.search(cls.day_re, hr).group()
            elif prev_days:
                comma_statements[i] = prev_days + " " + comma_statements[i]

        # # If a day before a comma is missing the hours, then we must give it the days from the comma after
        # # e.g. Mon-Th,Fri 13:00-15:00 =>  Mon-Th 13:00-15:00, Fri 13:00-15:00
        prev_hours = None
        for i, hr in enumerate(comma_statements[::-1]):
            if cls.contains_times(hr):
                prev_hours = re.search(cls.time_re, hr).group()
            elif prev_hours:
                comma_statements[-i-1] = comma_statements[-i -
                                                          1] + " " + prev_hours

        return comma_statements

    @classmethod
    def expand_semicolon_statements(cls, hours):
        expanded_hours = []
        for sub_statement in hours:
            # Split the commas
            expanded_hours += cls.split_comma_statement(sub_statement)

        return expanded_hours

    @classmethod
    def convert_days(cls, opening_hours_list: list[str]) -> None:
        """Converts short form OSM-type days to short form OpeningHours-type days.
        Replaces in-situ. 
        """
        for i, hours in enumerate(opening_hours_list):
            for key, val in cls.day_map.items():
                opening_hours_list[i] = hours.replace(key, val)

    @classmethod
    def convert_late_closing(cls, opening_hours_list: list[str]) -> None:
        """Convert late closing times into OpeningHours readable format.
        e.g. 10:00-28:00 => 10:00-04:00

        Args:
            opening_hours_list (list[str]): Opening hours.
        """
        for j, hr in enumerate(opening_hours_list):
            for k, hr_1 in enumerate(hr):
                # Find overtime hours
                search = re.search(cls.overtime_re, hr_1)
                if re.search(cls.overtime_re, hr_1):
                    before = hr_1[:search.start()+6]
                    # Subtract 24 from the time that's >24
                    hour_reduced = int(
                        hr_1[search.start() + 6:search.start() + 8]) - 24
                    after = hr_1[search.start()+8:]
                    # Replace string with new formatted string
                    opening_hours_list[j][k] = f"{before}0{hour_reduced}{after}"

    @classmethod
    def remove_holidays(cls, opening_hours_list: list[str]) -> None:
        """Removes holidays from list of hours. Currently no support for public holidays. 

        Args:
            opening_hours (list[str]): List of hours.
        """

        # All have "PH"/"SH" in them
        for i, hr in enumerate(opening_hours_list):
            opening_hours_list[i] = [
                hr for hr in hr if not re.search("PH|SH", hr)]

    @classmethod
    def swap_plus_symbols_with_ranges(cls, hours: list[str]):
        """Replace + symbols with -00:00 in the case where it's not already a time range 
        i.e. 11:00+ => 11:00-00:00
        But 11:00-23:00+ => 11:00-23:00
        """

        for i, hr in enumerate(hours):
            for j, hr in enumerate(hr):
                if "+" not in hr:
                    continue

                replace_str = "-00:00"
                if re.search(cls.time_range_re, hr):
                    replace_str = ""

                hours[i][j] = hours[i][j].replace("+", replace_str)

    @classmethod
    def get_all_days(cls, days: str):
        """Converts days in a short-format day range into a list of days in long format.

        Args:
            days (str): Day range either as single day or range of days. e.g. "Mon", "Mon-Wed"

        Returns:
            List[str]: List of days in that day range in long format. e.g. ["monday"], ["monday", "tuesday", "wednesday"]
        """
        short_days = ["Mon", "Tue", "Wed", "Th", "Fri", "Sa", "Su"]
        long_days = ["monday", "tuesday", "wednesday",
                     "thursday", "friday", "saturday", "sunday"]

        # If "-" not in string then it's a single day
        if "-" not in days:
            return [long_days[short_days.index(days)]]

        day_range = days.split("-")

        i = short_days.index(day_range[0])
        output = [long_days[i]]

        while short_days[i] != day_range[1]:
            i = (i + 1) % 7
            output += [long_days[i]]
        return output

    @classmethod
    def remove_days_off(cls, day_str, opening_hours):
        """Removes days off from an opening string. Removes the off days in place.

        Args:
            day_str (str): string of days to remove in short format, e.g. "Mon", "Mon-We"
            opening_hours (list[dict[str]]): opening hours in OpeningHours format.
        """
        off_days = re.search(cls.day_re, day_str)
        if not off_days:
            return

        off_days = off_days.group()
        days = cls.get_all_days(off_days)

        opening_hours = [
            hour for hour in opening_hours if hour['day'] not in days]

    @classmethod
    def contains_days(cls, hours: str) -> bool:
        """Returns true if time range expression contains days."""
        if re.search(cls.day_re, hours):
            return True
        return False

    @classmethod
    def contains_times(cls, hours: str) -> bool:
        if re.search(cls.time_re, hours):
            return True
        return False
