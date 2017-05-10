# Timestamp Microservice
### by Dylan Cutler

This app is a simple timestamp microservice made with Express and NodeJS.
When you make a GET request to this URL with a URL parameter.
this app will parse if it's a natural date or a unix time stamp.
It will send a JSON with the date as a natural date and the corresponding Unix timestamp.

## Example Usage:

`https://dcthetall-timestamp.herokuapp.com/December%2030,%201993`

`https://dcthetall-timestamp.herokuapp.com/757227600`


## Example Response:

`{ "unix": 757227600, "natural": "December 30, 1993" }`
