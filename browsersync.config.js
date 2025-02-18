const homedir = require('os').homedir();

/*
  everything works fine, but https is not working and nothing I do seems to fix it
*/

module.exports = {
  proxy: 'https://craft-starter.ddev.site',
  files: [
    './templates/**/*.{html,twig}',
    './src/**/*.{css,js}',
    './public/**/*.{css,js}'
  ],
  // https:true,
  /*
  ? SSL-enabled for DDev. You have to copy the SSL cert to somewhere outside of Docker first. Run this at your project root:
  docker cp ddev-router:/etc/nginx/certs ~/tmp/DOMAIN-WITH-EXTENSION
  (From: https://stackoverflow.com/questions/59730898/cant-connect-browsersync-with-ddev-nginx-server-because-ssl-error):
  */
  https: {
    key: homedir + "/tmp/certs/master.key",
    cert: homedir + "/tmp/certs/master.crt"
  },
  secure: true,
  ui: false,
  open: 'local',
  notify: false,
};