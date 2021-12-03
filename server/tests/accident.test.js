const {getDailyAccidents} =  require("./functions")


test('returns correct number of daily accidents(1734)', () => {
    
   
    expect(getDailyAccidents()).toHaveLength(1734);

  });


   