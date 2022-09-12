// !This corresponds to the /post/a dynamic value and variable name is going to be slug
// >>>>>> let's now start building dynamic page
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
// importing portable text
import PortableText from "react-portable-text"
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";


interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}





function Post({ post }: Props) {
  // These utilities are necessary to connect our form
  const { register, handleSubmit, formState: { errors }, } = useForm<IFormInput>();
  // IFormInput is the form template with useForm that we have defined the interface of earlier
  // Pushing the data from the form over to my API backend
  // console.log(post);

  //! For message that need to be shown after successful submission of the form like THANK YOU FOR YOUR COMMENTS SO FOR THAT WE NEED TO INITIALISE THE STATE


  const [submitted, setSubmitted] = useState(false)



  // Defining Onsubmit handler

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    // console.log(data);


    //! what we want is the comment data should get pushed on sanity and get showed on the frontend 
    // Sending data to the API , since we're sending data to an API, we will need to turn our data object literal into a JSON string.
    // you'd just need to send our JSON stringified data back to the API with a POST request.
    // The JSON.stringify() method converts a JavaScript value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.


    fetch('/api/createComment', {
      method: "POST",
      body: JSON.stringify(data),
    }).then(() => {
      console.log(data);
      setSubmitted(true)
    }).catch(err => {
      console.log(err);
      setSubmitted(false)
    })

  }





  //!Next step is creating api end point createComment



  return (

    <main>

      <Header />
      {/* <---------------- article image ----------> */}
      <img className="w-full h-40 object-cover" src={urlFor(post.mainImage).url()!} alt=""
      />
      <article className="max-w-4xl mx-auto p-5" >
        <h1 className="text-3xl mt-10 mb-3 ">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">{post.description}</h2>

        {/* ---> author section */}

        <div className="flex items-center space-x-2">
          <img className="h-10 w-10 rounded-full" src={urlFor(post.author.image).url()!} alt="" />
          <p className="font-extralight text-sm">
            Blog post by <span className="text-green-600 font-semibold">{post.author.name}</span> - published at {" "}

            {/* {new Date(post._createdAt).toLocaleString()} */}
          </p>
        </div>





        {/* . It will actually make it more convenient for you to output content as semantic HTML through of a broad range of frontend frameworks, as well as surfaces outside of the web browser, like native apps and voice assistants. We believe you will find it appealing once you learn how it works, and what it lets you do. For Sanity specifically having Portable Text as the way to deal with rich text content makes it less hard to build the real-time collaborative editing environment. */}

        {/* Portable Text is built on the idea of rich text as an array of blocks, themselves arrays of children spans. Each block can have a style and a set of mark definitions, which describe data structures distributed on the children spans. Portable Text also allows for inserting arbitrary data objects in the array, only requiring _type-key. Portable Text also allows for custom content objects in the root array, enabling editing- and rendering environments to mix rich text with custom content types. */}



        <div>
          <PortableText

            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_PROJECT_ID!}
            content={post.body}
            serializers={
              {
                h1: (props: any) => (
                  <h1 className="text-2xl font-bold my-5" {...props} />
                ),
                h2: (props: any) => (
                  <h1 className="text-xl font-bold my-5" {...props} />
                ),

                li: ({ children }: any) => (
                  <li className="ml-4 list-disc">{children}</li>
                ),
                link: ({ href, children }: any) => (
                  <a href={href} className="text-blue-500 hover:underline">{children}</a>
                ),
              }
            }
          />
        </div>

      </article>
      <hr className="border-8 max-w-lg my-5 mx-auto  border-yellow-500 hover:border-amber-500 drop-shadow-xl" />


      {/* API INTERACTION WHEREBY WE ARE NOW GOING TO IMPLEMENT REACT HOOK FORM TO IMPLEMENT THE FORM  */}

      {submitted ? (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white mx-auto max-w-2xl">
          <h3 className="text-3xl font-bold">Thank! You for submitting your comment</h3>
          <p>Once it will be approved, it will appear below !</p>

        </div>

      ) : (<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col p-5 my-10 max-w-3xl mx-auto mb-10">
        <h3 className="text-sm text-yellow-500 ">Enjoyed the article?</h3>
        <h4 className="text-3xl font-bold ">Leave a comment below!</h4>
        <hr className="py-3 mt-2" />


        <input {...register("_id")}
          type="hidden" name="_id" value={post._id} />



        <label className="block mb-5">
          <span className="text-gray-700">Name</span>
          <input {...register("name", { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring ring-0" placeholder="John doe" type=" text" />
        </label>
        <label className=" block mb-5">
          <span className="text-gray-700">Email</span>
          <input {...register("email", { required: true })} className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 outline-none focus:ring ring-0" placeholder="Johndoe@gmail.com" type=" email" />
        </label>
        <label className=" block mb-5">
          <span className="text-gray-700">Comment</span>
          <textarea {...register("comment", { required: true })} className="shadow border rounded py-2 form-textarea mt-1 block w-full ring-yellow-500 outline-none focus:ring ring-0" placeholder="Type here" rows={8} />
        </label>


        {/* errors will returned when the field validation fails */}


        <div className="flex flex-col p-5">
          {errors.name && (<span className="text-red-500">- The name field is required </span>)}
          {errors.email && (<span className="text-red-500">- The email field is required </span>)}
          {errors.comment && (<span className="text-red-500">- The comment field is required </span>)}

        </div>
        <input type="submit" className="shadow bg-yellow-500 hover:bg-amber-500 focus: shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded cursor-pointer"
        />
      </form >)
      }


      {/* Comments */}



      <div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2" />

        {post.comments.map((comment) => (

          <div key={comment._id}>
            <p>
              <span className="text-yellow-500">{comment.name}:</span>
              {comment.comment}
            </p>
          </div>
        ))}
      </div>
    </main>

  );
}
export default Post;
// When you export a function called getStaticPaths (Static Site Generation) from a page that uses dynamic routes, Next.js will statically pre-render all the paths specified by getStaticPaths.It tells Nextjs the routes that need to be pre-prepared

export async function getStaticPaths() {
  // query inside sanity CMS that will find all the post for me when requested i.e finding the paths
  const query = `*[_type == "post"]{
        _id,
        slug {
        current
      }
    }`;
  const posts = await sanityClient.fetch(query);


  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }: { params: any }) {
  const query = `*[_type == "post" &&  slug.current == $slug][0]{

        _id,
        _createdAt,
        title,
       image,
       
        author -> {
          name,
          image
        },
        'comments': *[
      _type == "comment" &&
      post._ref == ^._id &&
      approved == true],
      description,
      mainImage,
      slug,
      body,
     
  }`;

  const post = await sanityClient.fetch(query, {
    slug: params?.slug,
  });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
    revalidate: 10, // after 10s ,it will update the old cache ISR stuff
  };
}
