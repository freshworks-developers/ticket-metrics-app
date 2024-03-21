const metricUtil = require('./lib/metricUtility');
const mailUtil = require('./lib/mailUtility');

exports = {
  onAppInstallHandler: function(args){
      console.log('App Installing ...');
      createSchedule(args);
  },
  onScheduledEventHandler: async function(args) {
    try {
      const data = await $request.invokeTemplate('getTickets', {
        iparam: args.iparams
      });
      let ticket_master = JSON.parse(data.response);
      let computedMetrics = metricUtil.computeAllMetrics(ticket_master);
      mailUtil.sendAnEmailNotif(computedMetrics, args.iparams);
    } catch (error) {
      console.log(error);
    }
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