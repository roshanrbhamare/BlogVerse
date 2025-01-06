import express from "express";
const app = express();
const port =4000;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(express.static("public"));


app.get("/api", (req,res)=>{
    res.json(posts);
})
app.get("/api/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
});

let lastid=10;
app.post("/api/add",(req,res)=>{
  lastid++;
    const newb={
        id:lastid,
        title:req.body.title,
        content:req.body.content,
        author: req.body.author,
        date:new Date().toISOString(),
    }
    posts.push(newb);
    res.json({message:"posted"})
    // res.redirect("/api");
})

app.patch("/api/edit/:id",(req,res)=>{
    const id= parseInt(req.params.id)
    const ind = posts.findIndex((post) => post.id === id);
    
    if (ind === -1) {
        return res.status(404).json({ message: "Post not found" });
    }

    const newb = {
        id:id,
        title: req.body.title || posts[ind].title,
        content: req.body.content || posts[ind].content,
        author: req.body.author || posts[ind].author,
        date: new Date().toISOString(),
    };

    posts[ind] = newb;
    res.json({message:"patched"})
    // res.redirect("/");
})

app.delete("/api/edit/:id",(req,res)=>{
    const id = parseInt(req.params.id);
    const ind = posts.findIndex((post) => post.id === id);

    if (ind === -1) {
        return res.status(404).json({ message: "Post not found" });
    }
    posts.splice(ind, 1);
    res.json({message:"deleted"})
    // res.redirect("/api");
})

let posts = [
    {
      id:1,
      title: "The Rise of Decentralized Finance",
      content:
        "Decentralized Finance (DeFi) is an emerging and rapidly evolving field in the blockchain industry. It refers to the shift from traditional, centralized financial systems to peer-to-peer finance enabled by decentralized technologies built on Ethereum and other blockchains. With the promise of reduced dependency on the traditional banking sector, DeFi platforms offer a wide range of services, from lending and borrowing to insurance and trading.",
      author: "Alex Thompson",
      date: "2023-08-01T10:00:00Z",
    },
    {
      id:2,
      title: "The Impact of Artificial Intelligence on Modern Businesses",
      content:
        "Artificial Intelligence (AI) is no longer a concept of the future. It's very much a part of our present, reshaping industries and enhancing the capabilities of existing systems. From automating routine tasks to offering intelligent insights, AI is proving to be a boon for businesses. With advancements in machine learning and deep learning, businesses can now address previously insurmountable problems and tap into new opportunities.",
      author: "Mia Williams",
      date: "2023-08-05T14:30:00Z",
    },
    {
      id:3,
      title: "Sustainable Living: Tips for an Eco-Friendly Lifestyle",
      content:
        "Sustainability is more than just a buzzword; it's a way of life. As the effects of climate change become more pronounced, there's a growing realization about the need to live sustainably. From reducing waste and conserving energy to supporting eco-friendly products, there are numerous ways we can make our daily lives more environmentally friendly. This post will explore practical tips and habits that can make a significant difference.",
      author: "Samuel Green",
      date: "2023-08-10T09:15:00Z",
    },{
        "id": 4,
        "title": "The Rise of Remote Work",
        "content": "The pandemic accelerated the adoption of remote work, and it is now seen as the future of work. Many companies are now adopting hybrid models or fully remote systems, offering flexibility to employees.",
        "author": "Alice Brown",
        "date": "2024-01-13T11:45:00Z"
      },
      {
        "id": 5,
        "title": "Cybersecurity in the Digital Age",
        "content": "With the increase in digital transformation, cybersecurity has become more critical than ever. As businesses move online, the threat of cyberattacks continues to rise, necessitating stronger security measures.",
        "author": "Michael White",
        "date": "2024-01-14T16:00:00Z"
      },
      {
        "id": 6,
        "title": "Mental Health Awareness: Breaking the Stigma",
        "content": "Mental health is a vital aspect of overall well-being, yet it's often overlooked. Raising awareness and encouraging open discussions about mental health can help reduce stigma and improve access to care.",
        "author": "Emily Johnson",
        "date": "2024-01-15T13:30:00Z"
      },
      {
        "id": 7,
        "title": "The Impact of 5G Technology on Communication",
        "content": "5G technology is poised to change the way we communicate. With faster speeds and more reliable connections, it will enable advancements in everything from smart cities to autonomous vehicles.",
        "author": "Chris Miller",
        "date": "2024-01-16T08:00:00Z"
      },
      {
        "id": 8,
        "title": "The Power of Social Media in Modern Marketing",
        "content": "Social media platforms have transformed marketing strategies, enabling businesses to engage directly with their audiences. The ability to target specific demographics and measure results has made social media an essential tool in digital marketing.",
        "author": "Sophia Davis",
        "date": "2024-01-17T10:00:00Z"
      },
      {
        "id": 9,
        "title": "The Importance of Data Privacy in the Digital World",
        "content": "As more personal data is shared online, data privacy has become a significant concern. Protecting user data and ensuring transparency in how it's handled is essential for maintaining trust in digital platforms.",
        "author": "David Lee",
        "date": "2024-01-18T12:00:00Z"
      },
      {
        "id": 10,
        "title": "The Evolution of E-Commerce",
        "content": "E-commerce has evolved significantly, from simple online stores to fully integrated platforms that offer personalized shopping experiences, payment options, and global shipping. The rise of mobile commerce and AI is further revolutionizing the industry.",
        "author": "Olivia Harris",
        "date": "2024-01-19T15:30:00Z"
      },
  ];

  app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
  })