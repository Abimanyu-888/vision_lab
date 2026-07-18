import express from 'express'
import multer from 'multer'
import {getImage, uploadImage} from '../controllers/image.js'

const router=express.Router()

const storage = multer.memoryStorage()
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
})

router.post('/image/:userid', upload.single('image'), uploadImage)
router.get('/image/:userid',getImage)

export default router