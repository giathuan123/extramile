const {AccCounties} =  require("./functions")

test('returns correct number of accident ids(2768)', () =>
{

    expect(AccCounties()).toHaveLength(2768);

})







   