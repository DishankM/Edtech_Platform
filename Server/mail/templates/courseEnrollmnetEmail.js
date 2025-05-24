exports.courseEnrollmentEmail = (courseName, name) =>{
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Course Registration Confirmation</title>
    <style>
        /* CSS styling to make it look like the email */
       body{
        background-color:#ffffff;
        font-family: Arial, sans-serif;
        line-height: 1.4;
        color: #333333;
        margin: 0;
        padding: 0;
       }

       .container{
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        text-align: center;
       }

       .logo{
        max-width: 200px;
        margin-align: 20px;
       }

       .message:{
        font-size: 18px;
        font-weigth: bold;
        margin-bottom: 20px;
       }

       .body{
        font-size: 16px;
        margin-option: 20px;
       }

       .cta{
        display: inline-block;
        padding: 10px 20px;
        background-color: #ff060A;
        text-decoration: none;
        border-radius: 5px;
        text-size: 16px;
        font-weight: ;
        margin-top: 20px;
       }

       .support{
        font-size: 14px;
        color: #999999;
        margin-top: 20px;
       }

       .highlight{
        font-weight: bold;
       }
    </style>
</head>
<body>

<div id="container">
    <a href="https://studynotion-edtech-project.vercel.app"><img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png"</a>
    <div class="message">Course Registration</div>
    <div class="body">
        <p>Dear ${name},</p>
        <p>You have successfully registered for the course ${courseName}. We are excited to have you as a participant!</p>
        <p>Please log in to your learning dashboard to access the course materials and start your learning journey.</p>
         <a href="#" class="button">Go to Dashboard</a>
    </div>
    <div class="support">
         <p>If you have any questions or need assistance, please feel free to reach out to us at
         <a href="info@studynotion.com">info@studynotion.com</a> We are here to help!</p>
    </div>
</div>

</body>
</html>

}`
}
