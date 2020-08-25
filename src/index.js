const app = require('./server');
require("./config/mongoose");

app.listen(app.get('port'), () => {
  console.log("server on port ", app.get('port'));
});