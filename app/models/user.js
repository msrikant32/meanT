var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new Schema({
	
	userName: { type: String, lowercase: true, required:true, unique: true},
	password: { type: String, required:true},
	email: { type: String, lowercase: true, required:true, unique: true}

});

// middleware 
UserSchema.pre('save', function (next) {
  var user = this;

  bcrypt.hash(user.password, null, null, function(err, hash) {
	if (err) {
		return next(err);
	} else {
		user.password = hash;
		next();
	}
  });
});

UserSchema.methods.comparePossword = function(password){
	return bcrypt.compareSync(password, this.password);
	//return true;
};

module.exports = mongoose.model('User', UserSchema);