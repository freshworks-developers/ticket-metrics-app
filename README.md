# Freshdesk Tickets Notifier

## Description:
 This App notifies the agent via an email about few ticket metrics every day on a scheduled time.
 ***

## Features demonstrated

Feature | Notes
-------------------- | ------
App Setup event | To create a scheduled event to trigger the mail notification.
Scheduled event | To handle the notification which needs to be sent to agent.
Request Method  | To call the freshdesk-core api for getting details of all the tickets.
SendGrid Mail   | To Send a mail notifying the user about the tickets metrics.
Installation Parameters	| To get api keys of sendgrid for sending mail and the freshdesk apikey, email to send from and domain.
***

## Prerequisites:

1. Make sure you have a trial Freshdesk account created
2. A properly configured [Development environment](https://freshworks.dev/docs/app-sdk/v2.3/freshdesk/app-development-process/)
3. Make sure that you have created an sendgrid account, have api key for the same. (Note: Finish the verify as sender step to send mail.)
***

## Procedure to run the app:
1. Run the app locally using the command [`fdk run`](https://freshworks.dev/docs/app-sdk/v2.3/freshdesk/basic-dev-tools/freshworks-cli/#run)
2. Go page `http://localhost:10001/custom_configs` in your browser and setup your sendgrid and freshdesk api, domain credentials.
3. Go to `http://localhost:10001/web/test#` in your browser, select onAppInstall event and click on simulate to trigger AppSetup Event.
4. User will receive mail notification regarding the ticket metrics everday/hour/minutes as per his configuration. Check the console and mail for the same.
***

### Project folder structure explained

    .
    ├── README.md                  This file.
    ├── config                     Installation parameter configs.
    │   ├── iparams.json           Installation parameter config in English language.
    │   └── iparam_test_data.json  Installation parameter data for local testing.
    └── manifest.json              Project manifest.
    └── server                     Business logic for remote request and event handlers.
        ├── lib
        │   |__ handle-response.js
        |   |__ mailUtility.js
        |   |__ metricUtility.js
        |
        ├── server.js
        └── test_data
            ├── onAppInstall.json
            ├── onAppUninstall.json
            ├── onContactCreate.json
            ├── onContactUpdate.json
            ├── onConversationCreate.json
            ├── onExternalEvent.json
            ├── onTicketCreate.json
            └── onTicketUpdate.json
