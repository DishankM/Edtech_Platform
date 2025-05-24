 const token = crypto.randomUUID() for the token generation.

 1.crypto module: This is a built-in JavaScript module available in recent versions of Node.js and modern web browsers. It provides cryptographic functions, including random number generation, hashing, and secure identifier generation.

2.randomUUID() function: This function generates a UUID (Universally Unique Identifier) version 4, which is random and follows the format xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx. Each x is a hexadecimal digit, and y is either 8, 9, A, or B.

3.UUID v4: The randomUUID() function uses random values for most of the UUID's sections, ensuring uniqueness with very high probability. UUIDs are useful as unique tokens or identifiers in applications.


//CRONE JOB
A cron job is a scheduled task in Unix-based systems that runs automatically at specified intervals. 
It’s managed by the cron daemon (cron), which allows users to automate repetitive tasks like running scripts, performing system maintenance, sending alerts, or performing backups. The scheduling is highly customizable and set using a format called the "cron expression."

How Cron Jobs Work
Cron jobs are defined in a file called the crontab (short for "cron table"). Each line in a crontab file represents a job and contains both the schedule and the command to execute.