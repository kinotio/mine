import { upload } from '@/server/actions/common/upload'
import { saveFile } from '@/server/actions/file'
import { saveProfile, updateProfile } from '@/server/actions/profile'
import {
  getUserById,
  getUserByUsername,
  saveUser,
  updateUser,
  deleteUser
} from '@/server/actions/user'

// Named exports
export {
  // Common
  upload,

  // File
  saveFile,

  // Profile
  saveProfile,
  updateProfile,

  // User
  getUserById,
  getUserByUsername,
  saveUser,
  updateUser,
  deleteUser
}
