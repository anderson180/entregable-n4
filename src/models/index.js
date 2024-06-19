const User = require("./User");
const Post = require("./Post")

//Relacione de Muchos a Muchos (m-m)
User.belongsToMany(Post, {through: 'favorites'});
Post.belongsToMany(User, {through: 'favorites'});

//Relaciones de uno a Muchos (n-m)
Post.belongsTo(User);
User.hasMany(Post);

