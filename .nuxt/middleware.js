const middleware = {}

middleware['auth'] = require('..\\middleware\\auth.js')
middleware['auth'] = middleware['auth'].default || middleware['auth']

middleware['notauth'] = require('..\\middleware\\notauth.js')
middleware['notauth'] = middleware['notauth'].default || middleware['notauth']

export default middleware
