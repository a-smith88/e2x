Feature: e2X technical test

Scenario: User can successfully complete a purchase of a Shower Curtain

Given user is on the cornerstone website homepage
And searches for a Shower Curtain
When user adds the item to the cart
And proceeds to checkout
Then user can complete the purchase
And see an order confirmation

