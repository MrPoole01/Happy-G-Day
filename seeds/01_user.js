
const encrypt = require('../security/encrypt/encrypt.js')

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex.raw('DELETE FROM "user"; ALTER SEQUENCE user_id_seq RESTART WITH 5;')
    .then(function () {
      // Inserts seed entries
      var users = [{
        id: 1,
        name: 'JJ',
        birthday: '08/25/1990',
        password: encrypt('cruzeiro')
      },{
        id: 2,
        name: 'Matthew Drumheller',
        birthday: '08/27/1984',
        password: encrypt('snorlax')
      },{
        id: 3,
        name: 'Jasmine Cervantes',
        birthday: '07/13/1989',
        password: encrypt('whiskey')
      },{
        id: 4,
        name: 'Recardo Poole',
        birthday: '12/09/1975',
        password: encrypt('celtics')
      }];

      return knex('user').insert(users);
    });
};
