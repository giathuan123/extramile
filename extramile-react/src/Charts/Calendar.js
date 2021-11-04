import { ResponsiveCalendar } from '@nivo/calendar';

function Calendar(props) {
    return (
        <ResponsiveCalendar
            data={props.data}
            from="2016-01-02"
            to="2020-12-31"
            emptyColor="#eeeeee"
            colors={['#ffe5b5', '#ffc352', '#e38513', '#c46619', '#a24a1a', '#803117', '#5c1b11']}
            margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
            yearSpacing={60}
            monthBorderColor="#ffffff"
            dayBorderWidth={2}
            dayBorderColor="#ffffff"
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'row',
                    translateY: 36,
                    itemCount: 4,
                    itemWidth: 42,
                    itemHeight: 36,
                    itemsSpacing: 14,
                    itemDirection: 'right-to-left'
                }
            ]}
        />
    )
}

export default Calendar;