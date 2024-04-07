const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const { Topic, Post } = require('../models/Post');
const Comment = require('../models/Comment');
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

    let perPage = 6;
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
      nextPage: hasNextPage ? nextPage : null,
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});


/**
 * GET /
 * Post :id
*/
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;
    const data = await Post.findById({ _id: slug });

    
    const topics = await Topic.find();
    
    const postId = req.params.id;
    const comments = await Comment.find({ post: postId }).populate('comment');
    const faqs = await Faq.find();

    const locals = {
      title: data.title,
      description:  data.preview
    }

    /* other posts */
    let perPage = 3;
    let page = req.query.page || 1;

    const otherPosts = await Post.aggregate([ { $sort: { createdAt: -1 } } ])
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec();

      // Ensure each 'post' object has a properly populated 'image' property
      for (const post of otherPosts) {
        if (post.image && post.image.otherPosts && post.image.contentType) {
          post.image.otherPosts = post.image.otherPosts.toString('base64');
        }
      }

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('post', { 
      locals,
      topics,
      data,
      comments,
      otherPosts,
      currentRoute: `/post/${slug}`,
      currentUser: res.locals.currentUser,
      currentUrl: req.protocol + '://' + req.get('host') + req.originalUrl,
      faqs,
      nextPage: hasNextPage ? nextPage : null,
    });
  } catch (error) {
    console.log(error);
  }

}); 

/**
 * POST/
 * Commments
*/
router.post('/post/:id/add-comment', async (req, res) => {
  try {
    const postId = req.params.id;
    const parentCommentId = req.body.parentCommentId; // If it's a reply

    // Extract the visitor's name and email from the request body
    const { name, email } = req.body;

    // Create a new Comment document
    const comment = new Comment({
      comment: req.body.comment,
      author: { name, email }, // Store the visitor's name and email
      post: postId,
      parentId: parentCommentId, // If it's a reply, store the parent comment's _id
    });

    await comment.save();

    // Redirect back to the post after the comment is added
    res.redirect(`/post/${postId}`);
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'First server error' });
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

    // Fetch shops data
    const shops = await Shop.find();

    // Convert image data to base64 for rendering
    const shopsWithBase64Images = shops.map(shop => {
      if (shop.image && shop.image.data && shop.image.contentType) {
        return {
          ...shop.toObject(),
          image: {
            contentType: shop.image.contentType,
            data: shop.image.data.toString('base64')
          }
        };
      } else {
        return shop.toObject();
      }
    });

    res.render('shop', { locals, shops: shopsWithBase64Images });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
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

// Get Ts and Cs
router.get('/terms', async (req, res) => {

  try {

    const locals = {
      title: 'Terms and Conditions',
      description: "SwimworldUG offers a comprehensive range of services aimed at promoting swimming in Uganda. Our offerings include professional swimming career guidance and knowledge, private swimming lessons for adults and children, school swimming events, galas, and swimming competitions. Additionally, we provide a wide selection of swimming equipment and medical swimming therapies such as fitness, weight loss, autism therapy, stroke rehabilitation, and more. Whether you're looking to enhance your swimming skills, participate in competitive events, or seek therapeutic benefits from swimming, SwimworldUG is your go-to destination for all things swimming in Uganda."
    };

    res.render('terms', {
      locals
    }); 
  } catch (error) {
    console.error(error);
    // Handle error response
    res.status(500).json({ error: 'Third  server error' });
  }
  
});

module.exports = router;
