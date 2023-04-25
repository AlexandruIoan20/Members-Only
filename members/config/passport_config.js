const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');
const async = require("async"); 

const User = require("../models/User");
const Member = require("../models/Member"); 
const Admin = require("../models/Admin"); 
const Owner = require("../models/Owner"); 

// TODO: async.parallel - deserialize User

function initialize(passport, getProfileByEmail) {
  const authenticateUser = async (email, password, done) => {
    async.parallel( 
      { 
        async user () { 
          const u = await getProfileByEmail(User, email); 
          return u; 
        }, 
        async member () { 
          const m = await getProfileByEmail(Member, email); 
          return m; 
        }, 
  
        async admin () { 
          const a = await getProfileByEmail(Admin, email); 
          return a; 
        }, 
  
        async Owner () { 
          const o = await getProfileByEmail(Owner, email); 
          return o; 
        }
      }, async (err, results) => { 
          if (results.user == null && results.member == null && results.admin == null && results.owner == null) {
            return done(null, false, { message: 'No user with that email' })
          }
      
          try {
            if (await bcrypt.compare(password, results.user.password)) {
              return done(null, results.user)
            } else if (await bcrypt.compare(password, results.member.password)) { 
              return done(null, results.member); 
            } else if (await bcrypt.compare(password, results.admin.password)) { 
              return done(null, results.admin)
            } else if(await bcrypt.compare(password, results.owner.password)) { 

            } else {
              return done(null, false, { message: 'Password incorrect' })
            }
          } catch (e) {
            return done(e)
          }
      }
    )
  }

    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser(async (id, done) => {
        try {
            let user =  await User.findById(id).exec(); 
            if(user !== null)
              done(null, user);
            
            const member = await Member.findById(id).exec(); 
            if(member !== null) {
              user = member;  
              done(null, user); 
            }; 

            const admin = await Admin.findById(id).exec(); 
            if(admin !== null) {
              user = admin;  
              done(null, user); 
            }; 

            const owner = await Owner.findById(id).exec(); 
            if(owner !== null) { 
              user = owner; 
              done(null, user);
            }

        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize