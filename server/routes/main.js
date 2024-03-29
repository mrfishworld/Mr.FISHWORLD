const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { Topic, Post } = require('../models/Post');
const { Faq, Ans } = require('../models/Faq');
const Shop = require('../models/Shop');
const multer  = require('multer');
const storage = multer.memoryStorage();

router.use(bodyParser.json())

const upload = multer({
  storage: storage,
  // Other Multer configuration options...
});

const fetchPopularPosts = async () => {
  try {
    const popularPosts = await Post.aggregate([
      { $sort: { views: -1 } }, // Sort by views in descending order
      { $limit: 7 } // Get the top 4 popular posts
    ]);
    return popularPosts;
  } catch (error) {
    console.log(error);
    return [];
  }
};

router.get('', async (req, res) => {
  try {
    const locals = {
      title: "SWIMWORLDUg",
      description: "SwimworldUG offers a comprehensive range of services aimed at promoting swimming in Uganda. Our offerings include professional swimming career guidance and knowledge, private swimming lessons for adults and children, school swimming events, galas, and swimming competitions. Additionally, we provide a wide selection of swimming equipment and medical swimming therapies such as fitness, weight loss, autism therapy, stroke rehabilitation, and more. Whether you're looking to enhance your swimming skills, participate in competitive events, or seek therapeutic benefits from swimming, SwimworldUG is your go-to destination for all things swimming in Uganda."
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
    const { name, phone, email, lessonDay, lessonTime, location } = req.body;

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
        to: 'phinicxd@gmail.com',  // Your email
        subject: 'Client from SWIMWORLD',
        text: `
            Name: ${name}\nPNumber: ${phone}\nEmail: ${email}\nDay: ${lessonDay}\nTime: ${lessonTime}\nVenue: ${location}`
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

router.post('/send-email-2', async (req, res) => {
  const { name, phone, email, lessonDay, comment } = req.body;

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
      to: 'phinicxd@gmail.com',  // Your email
      subject: 'Enquiry from SWIMWORLD',
      text: `
          Name: ${name}\nPNumber: ${phone}\nEmail: ${email}\nComment: ${comment}`
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
      description: "SwimworldUG offers a comprehensive range of services aimed at promoting swimming in Uganda. Our offerings include professional swimming career guidance and knowledge, private swimming lessons for adults and children, school swimming events, galas, and swimming competitions. Additionally, we provide a wide selection of swimming equipment and medical swimming therapies such as fitness, weight loss, autism therapy, stroke rehabilitation, and more. Whether you're looking to enhance your swimming skills, participate in competitive events, or seek therapeutic benefits from swimming, SwimworldUG is your go-to destination for all things swimming in Uganda."
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
      description: "SwimworldUG offers a comprehensive range of services aimed at promoting swimming in Uganda. Our offerings include professional swimming career guidance and knowledge, private swimming lessons for adults and children, school swimming events, galas, and swimming competitions. Additionally, we provide a wide selection of swimming equipment and medical swimming therapies such as fitness, weight loss, autism therapy, stroke rehabilitation, and more. Whether you're looking to enhance your swimming skills, participate in competitive events, or seek therapeutic benefits from swimming, SwimworldUG is your go-to destination for all things swimming in Uganda."
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
      description: "SwimworldUG offers a comprehensive range of services aimed at promoting swimming in Uganda. Our offerings include professional swimming career guidance and knowledge, private swimming lessons for adults and children, school swimming events, galas, and swimming competitions. Additionally, we provide a wide selection of swimming equipment and medical swimming therapies such as fitness, weight loss, autism therapy, stroke rehabilitation, and more. Whether you're looking to enhance your swimming skills, participate in competitive events, or seek therapeutic benefits from swimming, SwimworldUG is your go-to destination for all things swimming in Uganda."
    };

    const popularPosts = await fetchPopularPosts();
    
    const faqs = await Faq.find(); 

    let perPage = 10;
    let page = req.query.page || 1;

    const data = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

      // Ensure each 'post' object has a properly populated 'image' property
      for (const post of data) {
        if (post.image && post.image.data && post.image.contentType) {
          post.image.data = post.image.data.toString('base64');
        }
      }

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);
    const topics = await Topic.find();

    res.render('blogs', {
      locals,
      data,
      topics,
      popularPosts,
      current: page,
      nextPage: hasNextPage ? nextPage : null
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
      description: "SwimworldUG offers a comprehensive range of services aimed at promoting swimming in Uganda. Our offerings include professional swimming career guidance and knowledge, private swimming lessons for adults and children, school swimming events, galas, and swimming competitions. Additionally, we provide a wide selection of swimming equipment and medical swimming therapies such as fitness, weight loss, autism therapy, stroke rehabilitation, and more. Whether you're looking to enhance your swimming skills, participate in competitive events, or seek therapeutic benefits from swimming, SwimworldUG is your go-to destination for all things swimming in Uganda."
    };

    const shops = await Shop.find();

    res.render('shop', {
      locals,
      shops
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});

router.get('/enquiry', async (req, res) => {

  try {

    const locals = {
      title: 'Enquiry',
      description: "SwimworldUG offers a comprehensive range of services aimed at promoting swimming in Uganda. Our offerings include professional swimming career guidance and knowledge, private swimming lessons for adults and children, school swimming events, galas, and swimming competitions. Additionally, we provide a wide selection of swimming equipment and medical swimming therapies such as fitness, weight loss, autism therapy, stroke rehabilitation, and more. Whether you're looking to enhance your swimming skills, participate in competitive events, or seek therapeutic benefits from swimming, SwimworldUG is your go-to destination for all things swimming in Uganda."
    };

    res.render('enquiry', {
      locals
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});

module.exports = router;
