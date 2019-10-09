var util = require('/util.js');
 
function choosephoto() {
  var c = util.wxPromise(wx.chooseImage);
  return c({
    sizeType: ['original', 'compressed'],
    sourceType: ['camera', 'album'], 
  }).then(function(res) {
    return Promise.resolve(res);
  }).catch(function(err) {
    console.log(err)
    return Promise.reject(err)
  });
}
 
module.exports = {
  choosephoto: choosephoto,
}