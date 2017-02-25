var mongoose = require('mongoose'),
    debug    = require('debug')('app:models');
    bcrypt   = require('bcrypt-nodejs');

//===========================
//User Schema
var userSchema = new mongoose.Schema({
  name:   { type: String, required: true },
  email:  { type: String, required: true },
  password: { type: String, required: true, select: false },
  watchlist: []
});

//exclude password
userSchema.set('toJSON', {
  transform: function(doc, ret) {
    delete ret.password;
    return ret;
  }
});

//hash pw before user is saved in db
userSchema.pre('save', function(next) {
  var user = this;

  //if statement for hashing pw if user is new or pw changed
  if (!user.isModified('password')) return next();

  //generate the hash
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);

    //change the pw to the hashed version
    user.password = hash;
    next();
  });
});

//method to compare a given pw with the database hash
userSchema.methods.comparePassword = function(password) {
  var user = this;

  return bcrypt.compareSync(password, user.password);
};

var User = mongoose.model('User', userSchema);

module.exports = User;
