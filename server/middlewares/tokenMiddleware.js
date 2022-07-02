import jwt from 'jsonwebtoken'

export const verifyToken = (req, res) => {
    const bearerToken = req.headers.authorization
    if (!bearerToken) {
        res.status(401)
        throw new Error('You are not authenticated')
    }

    const token = bearerToken.split(' ')[1]
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            res.status(403)
            throw new Error('Invalid token')
        }

        req.user = user
    })
}

export const verifyUser = (req, res, next) => {
    const { userId } = req.params

    verifyToken(req, res)

    if (userId !== req.user.id && !req.user.isAdmin) {
        res.status(403)
        throw new Error('You are not authorized')
    }

    next()
}