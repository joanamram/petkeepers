
const mongoose     = require('mongoose');
const Pets         = require('../../../models/Pets');
const UserEntry    = require('../../../models/User');
const Match        = require('../../../models/Match');

mongoose.connect('mongodb://localhost/petkeepers');

const entries = [
  {
    facebookID: "10211878185902164",
    name: "Joana Sequerra Amram",
    email: "joanamram@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902163",
    name: "Raul",
    email: "raul@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980483'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902162",
    name: "Marc Pomar",
    email: "marc@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980474'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902161",
    name: "Olivia",
    email: "olivia@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980464'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902160",
    name: "Papu",
    email: "papu@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980454'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902154",
    name: "Rafael",
    email: "rafael@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980444'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902144",
    name: "Andrei",
    email: "andrei@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980434'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902134",
    name: "Fran",
    email: "fran@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980424'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902124",
    name: "Eri",
    email: "eri@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980414'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902114",
    name: "Pablo",
    email: "pablo@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980404'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902104",
    name: "Alvaro",
    email: "alvaro@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1244704128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902064",
    name: "Claudia",
    email: "claudia@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1144704128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185901164",
    name: "Gonzalo",
    email: "gonzalo@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1044704128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185900164",
    name: "Fernando",
    email: "fernando@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344604128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878184902164",
    name: "Carlos",
    email: "carlos@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344504128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211877185902164",
    name: "Mauro",
    email: "mauro@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344404128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10210878185902164",
    name: "Josh",
    email: "josh@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344304128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "12211878185902164",
    name: "Luis",
    email: "luis@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344204128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10211878185902164",
    name: "Joana Sequerra Amram",
    email: "joanamram@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344104128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },
  {
    facebookID: "10111878185902164",
    name: "Joana Sequerra Amram",
    email: "joanamram@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344004128980484'],
    location: {"type: 'Point', coordinates: [ 40.416775, -3.70379 ]"},
    keeper:"false"
  },

];

UserEntry.create(entries, (err, entries) => {
  if (err){ throw(err) }
  console.log("Success", entries);
  mongoose.connection.close();
})
