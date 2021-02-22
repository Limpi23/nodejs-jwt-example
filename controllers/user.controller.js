import User, { create, login } from "../models/user.model.js";
import { TOKEN_SECRET } from "../config/config";
import { genSalt, hash, compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { NotFoundError } from "../helpers/utility";

// Register a new User
export async function register(req, res) {
  //Hash password
  const salt = await genSalt(10);
  const hasPassword = await hash(req.body.password, salt);

  // Create an user object
  const user = new User({
    mobile: req.body.mobile,
    email: req.body.email,
    name: req.body.name,
    password: hasPassword,
    status: req.body.status || 1,
  });
  // Save User in the database
  try {
    const id = await create(user);
    user.id = id;
    delete user.password;
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}

// Login
export async function login(req, res) {
  try {
    // Check user exist
    const user = await login(req.body.mobile_or_email);
    if (user) {
      const validPass = await compare(req.body.password, user.password);
      if (!validPass)
        return res.status(400).send("Mobile/Email or Password is wrong");

      // Create and assign token
      const token = sign(
        { id: user.id, user_type_id: user.user_type_id },
        TOKEN_SECRET
      );
      res.header("auth-token", token).send({ token: token });
      // res.send("Logged IN");
    }
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(401).send(`Mobile/Email or Password is wrong`);
    } else {
      let error_data = {
        entity: "User",
        model_obj: { param: req.params, body: req.body },
        error_obj: err,
        error_msg: err.message,
      };
      res.status(500).send("Error retrieving User");
    }
  }
}

// Access auth users only
export function authuseronly(req, res) {
  res.send(
    "Hey,You are authenticated user. So you are authorized to access here."
  );
}

// Admin users only
export function adminonly(req, res) {
  res.send("Success. Hellow Admin, this route is only for you");
}
