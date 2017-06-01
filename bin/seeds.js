const mongoose     = require('mongoose');
const User    = require('../models/User');
const Messages    = require('../models/Messages');

mongoose.connect('mongodb://localhost/petkeepers');

const users = [
  {
    facebookID: "10211878185902164",
    name: "Joana Sequerra Amram",
    email: "joanamram@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['1344704128980484', '10211878185902163', "10211878185902144", "10211878185902134", "10211878185902114", "10211878185902104", "10211878185902064", "10211878185901164", "10211878185900164"],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185902163",
    name: "Raul González",
    email: "raul@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164', "10211878185902162", "10211878185902161", "10211878185902160", "10211878185902154", "10211878184902164", "10211877185902164", "10210878185902164", "12211878185902164"],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "10211878185902162",
    name: "Marc Pomar",
    email: "marc@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "10211878185902161",
    name: "Olivia Santos",
    email: "olivia@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185902160",
    name: "Papu",
    email: "papu@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185902154",
    name: "Rafael García",
    email: "rafael@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185902144",
    name: "Andreas Dartnuzer",
    email: "andrei@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185902134",
    name: "Francisco Marol",
    email: "fran@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185902124",
    name: "Lucía Santos",
    email: "eri@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "10211878185902114",
    name: "Pablo Rodriguez Camacho",
    email: "pablo@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "10211878185902104",
    name: "Alvaro Domicci",
    email: "alvaro@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "10211878185902064",
    name: "Claudia Mayor",
    email: "claudia@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185901164",
    name: "Gonzalo Blanco",
    email: "gonzalo@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878185900164",
    name: "Fernando Solis",
    email: "fernando@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902164'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:true
  },
  {
    facebookID: "10211878184902164",
    name: "Carlos Molero",
    email: "carlos@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "10211877185902164",
    name: "Mauro",
    email: "mauro@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "10210878185902164",
    name: "Josh",
    email: "josh@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  },
  {
    facebookID: "12211878185902164",
    name: "Luis Barim",
    email: "luis@gmail.com",
    picture: 'https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/15326323_10210278184863138_3197406559207135164_n.jpg?oh=43c521e6307b991d5c46de680acee020&oe=59B567E4',
    friends: ['10211878185902163'],
    location: {type: 'Point', coordinates: [ 40.416775, -3.70379 ]},
    keeper:false
  }

];


User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((product) => {
    console.log(product.name);
  });
  mongoose.connection.close();
});
