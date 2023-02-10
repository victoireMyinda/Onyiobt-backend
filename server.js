const express = require('express')
const cors = require('cors')
const connectDB = require('./config/dbConfig')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')
require('dotenv').config({ path: "./config/.env" })

const userRoutes = require('./routes/user.routes')
const accountRoutes = require('./routes/account.routes')
const viewRoutes = require('./routes/views.routes')
const videoRoutes = require('./routes/videos.routes')

const app = express()

connectDB()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    fileUpload({
        createParentPath: true
    })
)

app.use('/onyobt.com/v1/users', userRoutes)
app.use('/onyobt.com/v1/accounts', accountRoutes)
app.use('/onyobt.com/v1/views', viewRoutes)
app.use('/onyobt.com/v1/videos', videoRoutes)

app.listen(process.env.PORT, () => {
    console.log(`server listenning on http://localhost:${process.env.PORT}`)
})