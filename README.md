A simple Express app that lets you see texts to a Twilio number

# Development

```
forever -w server.js
```

The app will now be available at localhost:3000 and will update as you make changes to it.

## webhooks

Twilio uses webhooks to reply to messages.
For development purposes you can use [ngrok](https://ngrok.com/download) to make these webhooks available on the public internet.

In where-ever you've downloaded ngrok (probably ~/Downloads on a Mac), run:

```
./ngrok http 3000
```

This will assign you a random URL that you can then point your Twilio instance at.
Note that every time you restart the subdomain of this URL will be different.
One way of avoiding this is to pay for ngrok.
