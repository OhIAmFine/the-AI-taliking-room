
const request = require('request-promise')

function SendChat (text) {
  const textTpl = {
    'key': '3cadbeb78b354734afc88bd0a13daa26',
    'info': text,
    'userid': '205216'
  }
  let options = {
    method: 'POST',
    uri: 'http://www.tuling123.com/openapi/api',
    body: textTpl,
    json: true
  }

  return request(options)
}

module.exports = SendChat
