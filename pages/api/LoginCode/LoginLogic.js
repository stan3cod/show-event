import ConnectDB from "@/utils/connectDB";
import Admin from "../../../model/adminSchema";
import User from "../../../model/userSchema";
import bcrypt from "bcrypt";

async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password, role } = req.body;
      console.log({ email, password, role });
      await ConnectDB();
      if (role == "admin") {
        const user = await Admin.findOne({ email });

        if (user) {
          const foundPassword = user.password;
          const AdminPassword = await bcrypt.compare(password, foundPassword);
          if (AdminPassword) {
            return res.status(200).json(user);
          } else {
            return res
              .status(401)
              .json({ message: "Email or Password is InCorrect" });
          }
        } else {
          return res
            .status(401)
            .json({ message: "Unauthorized Or Password might not be correct" });
        }
      } 

      else if (role == "user") {
        const user = await User.findOne({ email });
        if (user) {
          const foundPassword = user.password;
          const UserPassword = await bcrypt.compare(password, foundPassword);
          if (UserPassword) {
            return res.status(200).json(user);
          } else {
            return res
              .status(401)
              .json({ message: "Email or Password is InCorrect" });
          }
          
        }
        else {
          return res
            .status(401)
            .json({ message: "Unauthorized Or Password might not be correct" });
      }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
export default handler;
