const counties = require('./sum')
const assert = require('assert')

test('returns correct number of accident ids(2768)', () =>
{

    expect(counties()).toHaveLength(2768);

})


// test('name field is string?', () => {
    
//     let ret = counties();
//     //grab name field from array of objects

//     //check if value of name field is string
    


//   });


   