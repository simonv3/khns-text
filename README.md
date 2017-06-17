A simple Express app that lets you see texts to a Twilio number

# Production

This is set up to run on Heroku. Deploying is as simple as pushing the master branch to a Heroku app.

## Environment Variables

You'll need a `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`.

# Development

```
forever -w server.js
```

The app will now be available at localhost:3000 and will update as you make changes to it. Note that you'll need the necessary Twilio environment variables for it to work.

## Environment Variables

You'll need a `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`. It's recommended that you put these in the `.env` file. You can do this by copying the .env.example file to .env:

```
cp .env.example .env
```

and then filling in the necessary details.

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
