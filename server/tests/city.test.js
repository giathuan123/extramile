const {tenAccCities} =  require("./functions")

test('returns correct number of cities in descending order(10)', () =>
{

    expect(tenAccCities()).toHaveLength(10);

})







   