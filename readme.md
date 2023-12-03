<h1>Blogging Platform</h1>
<p> This is Backend implementation of blogging APP! where i have implemented the curd opertaion.
</p>

<h2>Model</h2>
<p> I have created two models, user and blog model.</p>
<h3>User Model</h3>
<p>Name</p>
<p>email</p>
<p>Password</p>

<h3>Blog Model</h3>
<p>tittle</p>
<p>body</p>
<p>category</p>
<p>authorid</p>
<p>isDeleted</p>

<h2> Controller </h2>
<h3> User Controller </h3>
<p>In user controller i define the api to signup for new user and login for existing user.</p>

<h3> Blog Controller </h3>
<p>in blogcontroller I have define five api two of them for retriveing the blog that are open. <br>
Rest of three are protected api for creation updation and deletion of blog. </p>

<h2> MiddleWare</h2>
<p> In middleware i verify user token to check authenticity of user, it prevent unauthorize access. <br>
i have created an api to log the every incoming request.</p>


<h1>How to use this app localy</h1>
<h3> Add .env file and their credentials with following key name</h3>
<p>PORT =</p>
<p>MONGO_URI =</p>
<p>JWT_SECRET_KEY =</p>

<h2> Adding url request that you can use to run the API's</h2>
<h3>Post  http://localhost:3000/signup</h3>
<h3>post http://localhost:3000/login</h3>
<h3>post http://localhost:3000/createblog</h3>
<h3>get http://localhost:3000/getblog</h3>
<h3>get http://localhost:3000/getblogbyid/</h3>
<h3>put http://localhost:3000/update/</h3>
<h3>delete http://localhost:3000/delete/</h3>