import { ResponsiveSwarmPlot } from '@nivo/swarmplot';

function SwarmPlot(props) {
    return (
        <ResponsiveSwarmPlot
            data={props.data}
            value="visibility"
            groups={[ '1', '2', '3', '4' ]}
            groupBy="severity"
            identity="id"
            value="visibility"
            valueFormat=".1f"
            valueScale={{ type: 'linear', min: 0, max: 10, reverse: false }}
            size={{ key: 'volume', values: [ 4, 20 ], sizes: [ 6, 20 ] }}
            forceStrength={4}
            simulationIterations={100}
            borderColor={{
                from: 'color',
                modifiers: [
                    [
                        'darker',
                        0.6
                    ],
                    [
                        'opacity',
                        0.5
                    ]
                ]
            }}
            margin={{ top: 80, right: 100, bottom: 80, left: 100 }}
            axisTop={{
                orient: 'top',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Accident Severity',
                legendPosition: 'middle',
                legendOffset: -46
            }}
            axisRight={{
                orient: 'right',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Visibility (mi)',
                legendPosition: 'middle',
                legendOffset: 76
            }}
            axisBottom={{
                orient: 'bottom',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Accident Severity',
                legendPosition: 'middle',
                legendOffset: 46
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Visibility (mi)',
                legendPosition: 'middle',
                legendOffset: -76
            }}
        />
    )
}

export default SwarmPlot;
