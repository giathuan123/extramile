const {getSwarmPlotStats} =  require("./functions")

test('returns correct number of accidents(131) with severity(1-4)', () =>
{

    expect(getSwarmPlotStats()).toHaveLength(131);

})







   