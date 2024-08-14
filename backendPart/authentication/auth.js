const jwt = require('jsonwebtoken');

//// both working 
// const isLogin = (req, res, next) => {
//    try {
//       const token = req.body.token || req.query.token || req.headers.authorization
//       console.log(token)
//       if (!token) {
//          return res.status(401).send({status:false,message:"Authentication failed!: Invalid token or token required.Login Again"});
//       }
//       jwt.verify(token, process.env.SECRET_KEY, (err, resolve) => {
//          if (err) {
//             return res.status(401).send({status:false,message:"Authentication failed!: Invalid token or token required. Login Again."});
//          }
//          console.log("isLogin", resolve)
//          req.userId = resolve.id;
//          if(resolve.role === "Principal"){
//             req.role="Principal";
//             return next();
//          }else if(resolve.role === "Teacher"){
//             req.role="Teacher";
//             return next();
//          }else if(resolve.role === "Student"){
//             req.role="Student";
//             return next();
//          }
//          return res.status(401).send("Authentication failed! Role not defined");
//       });
//    } catch (error) {
//       console.log("isLogin :", error.message);
//       return res.send("Authentication failed!");
//    }
// }


const isLogin = (req, res, next) => {
   try {
      const token = req.body.token || req.query.token || req.headers.authorization;
      console.log("Token:", token);

      if (!token) {
         return res.status(401).send({status: false, message: "Authentication failed! Invalid token or token required. Login Again"});
      }

      jwt.verify(token, process.env.SECRET_KEY, (err, resolve) => {
         if (err) {
            return res.status(401).send({status: false, message: "Authentication failed! Invalid token or token required. Login Again."});
         }

         console.log("isLogin", resolve);
         req.userId = resolve.id;
         req.role = resolve.role; // Assign the role from the token

         if (["Principal", "Teacher", "Student"].includes(req.role)) {
            return next(); // If the role is valid, proceed to the next middleware
         }

         // If the role is not recognized, respond with an error
         return res.status(401).send({status: false, message: "Authentication failed! Role not defined"});
      });
   } catch (error) {
      console.log("isLogin Error:", error.message);
      return res.status(500).send({status: false, message: "Authentication failed due to an internal error"});
   }
}



//If user already loggedIn
const isLogout = (req, res, next) => {
   try {
      const token = req.body.token || req.query.token || req.headers.authorization
      console.log(token)
      if (!token) {
         next();
      }
      jwt.verify(token, process.env.SECRET_KEY, (err, resolve) => {
         if (err) {
            next();
         }
         console.log("isLogin", resolve)
         req.userId = resolve.id;
         return res.send("You are already loggedIn");
      });
   } catch (error) {
      next();
   }
}

module.exports = {
   isLogin,
   isLogout
}
