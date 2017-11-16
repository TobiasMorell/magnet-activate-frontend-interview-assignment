# Opening the solution
The simulation can be seen by opening the "index.html" file in a browser. The simulation automatically starts with a speed of 1. This is a bit slow, so I suggest that you set it to between 3 and 5. Changing the speed automatically restarts the simulation. If you wish to see the simulation again please press the "Restart" button.

# Realism
I have implemented a crude gravity to make the simulation more realistic. This means that the ball will accelerate on its way down and decelerate on its way up. Furthermore the ball will gradually bounce lower and lower until it finally stops. Finally, the ball will squeeze a bit when it hits the ground.

# Considerations
The next steps could include implementing user-controlled bounce loss or scaling the squeeze to the ball's velocity.
## Known errors
The ball sometimes stops completely when it hits the ground at too low speed, which looks crude. This is occurs because I introduced an if-statement to stop the ball from bouncing quickly up and down at the end of the simulation.
