
const metricUtil = require('./lib/metricUtility');
const mailUtil = require('./lib/mailUtility');
const base64 = require('base-64');

exports = {
  // args is a JSON block containing the payload information.
  // args['iparam'] will contain the installation parameter values.
  onAppInstallHandler: function(args){
      console.log('App Installing ...');
      createSchedule(args);
  },
  onScheduledEventHandler: function(args) {

    const headers = {
      Authorization: `Basic ${base64.encode(`${args.iparams.apiKey}` + ':X')}`,
      accept: "application/json",
    };

    const options = { headers : headers};
    $request.get(`https://${args.iparams.domainName}.freshdesk.com/api/v2/tickets`, options).then(
    function(data) {
      //handle "data"
      //"data" is a json string with status, headers, and response.
        let ticket_master =JSON.parse(data.response);
        let computedMetrics = metricUtil.computeAllMetrics(ticket_master);
        mailUtil.sendAnEmailNotif(computedMetrics, args.iparams);
    },
    function(error) {
      //handle failure
      console.log(error);
      }
    );
  }
};

function createSchedule(args){
  $schedule.create({
    name: `Notifier-${Date.now()}`,
    data:{
      args: args
    },
    schedule_at: '2021-10-19',
    repeat:{
      time_unit: `${args.iparams.timeUnit}`,
      frequency: args.iparams.every
    }
  }).then(function (res){
    console.log('Schedule Created..');
    console.log(res);
    renderData();
  }, function (err){
    console.log('Failed ..');
    console.error(err);
  });
}