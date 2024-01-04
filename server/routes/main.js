const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const multer  = require('multer');
const storage = multer.memoryStorage();

router.use(bodyParser.json())

const upload = multer({
  storage: storage,
  // Other Multer configuration options...
});

router.get('', async (req, res) => {
  try {
    const locals = {
      title: "SWIMWORLD",
      description: "We offer professional swimming career guide and knowledge, private  swimming lessons for adults and children, schools  swimming events  galas, swimming competitions etc. swimming equipments and medical  swimming therapies such as fitness,  weightloss,  autism therapy,  stroke etc."
    }
    

    res.render('index', { 
      locals
    });

  } catch (error) {
    console.log(error);
  }

});





/* NODE MAILER */
router.post('/send-email', async (req, res) => {
    const { email, message } = req.body;

    // Create a nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'asiomizunoah@gmail.com',
          pass: 'sjkk bqkf pedt utvb'
      }
    });

    // Email options
    const mailOptions = {
        from: email,
        to: 'asiomizunoah@gmail.com',  // Your email
        subject: 'Enquiry Form from SWIMWORLD',
        text: `
            Name: ${formData.name}
            Phone Number: ${formData.phone}
            Email: ${formData.email}
            Preferred Lesson Day: ${formData.lessonDay}
            Preferred Lesson Time: ${formData.lessonTime}
            Preferred Training Location: ${formData.location}`
    };

    try {
        // Send the email
        await transporter.sendMail(mailOptions);
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error sending email');
    }
});


/**
 * GET /
 * About
*/
router.get('/about', async (req, res) => {

  try {

    const locals = {
      title: 'About',
      description: 'We offer professional swimming career guide and knowledge, private  swimming lessons for adults and children, schools  swimming events  galas, swimming competitions etc. swimming equipments and medical  swimming therapies such as fitness,  weightloss,  autism therapy,  stroke etc.'
    };

    res.render('about', {
      locals
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});


/**
 * GET /
 * Tutorials
*/
router.get('/tutorials', async (req, res) => {

  try {

    const locals = {
      title: 'Tutorials',
      description: 'We offer professional swimming career guide and knowledge, private  swimming lessons for adults and children, schools  swimming events  galas, swimming competitions etc. swimming equipments and medical  swimming therapies such as fitness,  weightloss,  autism therapy,  stroke etc.'
    };

    res.render('tutorials', {
      locals
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});

/**
 * GET /
 * About
*/
router.get('/blogs', async (req, res) => {

  try {

    const locals = {
      title: 'Blogs',
      description: 'We offer professional swimming career guide and knowledge, private  swimming lessons for adults and children, schools  swimming events  galas, swimming competitions etc. swimming equipments and medical  swimming therapies such as fitness,  weightloss,  autism therapy,  stroke etc.'
    };

    res.render('blogs', {
      locals
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});

/**
 * GET /
 * Shop
*/
router.get('/shop', async (req, res) => {

  try {

    const locals = {
      title: 'Shop',
      description: 'We offer professional swimming career guide and knowledge, private  swimming lessons for adults and children, schools  swimming events  galas, swimming competitions etc. swimming equipments and medical  swimming therapies such as fitness,  weightloss,  autism therapy,  stroke etc.'
    };

    res.render('shop', {
      locals
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});



module.exports = router;
