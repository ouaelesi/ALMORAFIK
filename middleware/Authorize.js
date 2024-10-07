import User from "../models/user";
import Role from "../models/role";

const authorize = (requiredPermissions = []) => {
  return async (req, res, next) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    const userId = token.id;


    const user = await User.findById(userId).populate({
      path: "role",
      populate: {
        path: "permissions",
      },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const userPermissions = user.role.permissions.map(permission => permission.name);

    const hasPermission = requiredPermissions.length === 0 || requiredPermissions.every(permission => userPermissions.includes(permission));

    if (!hasPermission) {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};

export default authorize;