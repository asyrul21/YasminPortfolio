var express = require('express');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var expressSanitizer = require('express-sanitizer');
var session = require('express-session');
var flash = require('express-flash');
var path = require('path');

var app = express();

//set view engine to ejs
app.set('view engine', 'ejs');

// init public folder
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended:false }));
app.use(expressSanitizer());
// init session
app.use(session({
  secret: 'My name is Asyrul',
  resave: false,
  saveUninitialized: true
}));
// init flash
app.use(flash());

//home page
app.get('/', function (req, res) {
  // res.send('Hello World!');
  res.render('pages/index');
});

app.get('/work', function(req, res){
  res.render('pages/work');
});

app.get('/about', function(req, res){
  res.render('pages/about');
});

app.post('/about' , function(req, res){
  const data = req.body;
  
  const name = req.sanitize(req.body.name);
  const email = req.sanitize(req.body.email);
  const message = req.sanitize(req.body.message);

  console.log('Name: ', name);
  console.log('Email: ', email);
  console.log('Message: ', message);

  const output = `
    <h3>From : ${name}</h3>
    <h4>Email : ${email}</h4>
    <p>${message}</p>
  `;

  var smtpConfig = {
    // best to not use gmail
    // host: 'smtp.mail.yahoo.com',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'asyrulhafetzy.dev@gmail.com',
        pass: 'shrededtothebone2106'
    },

    // disable this line when migrating to real server
    tls: {
      rejectUnauthorized: false
    }
};

  var transporter = nodemailer.createTransport(smtpConfig);
  
  var mailOptions = {
    from: `Nodemailer Mail <${email}>`,
    to: 'yasminraihan@gmail.com',
    subject: 'New Message from Your Portfolio!',
    text: 'Hi!',
    html: output
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      req.flash('error', 'Oops! Something went wrong :(');
      res.redirect('/about#aboutcontactme');
    } else {
      console.log('Email sent: ' + info.response);
      req.flash('success', 'Thank You!');
      res.redirect('/about#aboutcontactme');
    }
  });
})

// download resume
app.get('/download/:file(*)',(req, res) => {
  var file = req.params.file;
  var fileLocation = path.join('./uploads',file);
  console.log('File location:', fileLocation);
  res.download(fileLocation, file);
});


// AJAX CALLS
// 
// app.get('/ajax/duitnow', preventuser,  function(req, res){
//   res.sendFile('views/hidden/duitnow.html', {root: __dirname });
//   // res.redirect('/work');
// });
// app.get('/ajax/quickaccess', preventuser,  function(req, res){
//   res.sendFile('views/hidden/quickaccess.html', {root: __dirname });
//   // res.redirect('/work');
// });
// app.get('/ajax/cardactivation', preventuser,  function(req, res){
//   res.sendFile('views/hidden/cardactivation.html', {root: __dirname });
//   // res.redirect('/work');
// });
// app.get('/ajax/tydee', preventuser,  function(req, res){
//   res.sendFile('views/hidden/tydee.html', {root: __dirname });
//   // res.redirect('/work');s
// });
// app.get('/ajax/letitburn', preventuser,  function(req, res){
//   res.sendFile('views/hidden/letitburn.html', {root: __dirname });
//   // res.redirect('/work');
// });
// app.get('/ajax/showreel', preventuser,  function(req, res){
//   res.sendFile('views/hidden/showreel.html', {root: __dirname });
//   // res.redirect('/work');
// });


app.listen(process.env.PORT, process.env.IP, function () {
  console.log('Yasmin app listening on port 3000!');
});