import { ResponsiveSwarmPlot } from '@nivo/swarmplot';

const data = [
    {
        "id": "0.0",
        "group": "Severity 1",
        "visibility": 5.5,
        "volume": 18
    }
];

function SwarmPlot(props) {
    return (
        <ResponsiveSwarmPlot
            data={data}
            groups={[ 'Severity 1', 'Severity 2', 'Severity 3', 'Severity 4' ]}
            identity="id"
            value="visibility"
            valueFormat=".1f"
            valueScale={{ type: 'linear', min: 0, max: 20, reverse: false }}
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
                legend: 'group if vertical, price if horizontal',
                legendPosition: 'middle',
                legendOffset: -46
            }}
            axisRight={{
                orient: 'right',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'price if vertical, group if horizontal',
                legendPosition: 'middle',
                legendOffset: 76
            }}
            axisBottom={{
                orient: 'bottom',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'group if vertical, price if horizontal',
                legendPosition: 'middle',
                legendOffset: 46
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 10,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'price if vertical, group if horizontal',
                legendPosition: 'middle',
                legendOffset: -76
            }}
        />
    )
}

export default SwarmPlot;