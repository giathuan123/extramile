const {SeverityChart} =  require("./functions")


test('returns correct number of severity records(4)', () =>
{

    expect(SeverityChart()).toHaveLength(4);

})





   