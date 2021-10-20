
const sgMail = require('@sendgrid/mail');


exports = {
    sendAnEmailNotif: function(metricPayload, iparams){
        sgMail.setApiKey(iparams.sendGridApiKey);
        let htmlMessage = `<table stype="width:400px" border="1">
                          <tr>
                            <th>Unresolved Tickets</th>
                            <th>Overdue Tickets</th>
                            <th>Open Tickets</th>
                            <th>Unassigned Tickets</th>
                            <th>Escalated Tickets</th>
                          </tr>
                          <tr>
                            <td>${metricPayload.unresolvedCount}</td>
                            <td>${metricPayload.overdueCount}</td>
                            <td>${metricPayload.openTicketCount}</td>
                            <td>${metricPayload.unAssignedTicket}</td>
                            <td>${metricPayload.escalatedCount}</td>
                          </tr>
                      </table>`
        const msg = {
          to: `${iparams.emailID}`, // Change to your recipient
          from: `${iparams.emailID}`, // Change to your verified sender
          subject: 'Ticket Resolution Notifier',
          text: 'and easy to do anywhere, even with Node.js',
          html: htmlMessage
        };
        sgMail.send(msg).then((resp) => {
            console.log('Email sent', resp);
          })
          .catch((error) => {
            console.error(error)
          });
      }
}