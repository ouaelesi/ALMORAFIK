import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    default: null,
  },
});

const Permission = mongoose.models.Permission || mongoose.model("Permission", PermissionSchema);

export default Permission;