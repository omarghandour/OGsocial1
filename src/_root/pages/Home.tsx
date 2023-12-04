// import { Models } from "appwrite";

// import { useToast } from "@/components/ui/use-toast";
import { Loader, UserCard } from "@/components/shared";
import { useGetPosts, useGetRecentPosts, useGetUsers } from "@/lib/react-query/queries";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import InfinityHome from "@/components/shared/InfinityHome";

const Home = () => {
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();
  const { ref, inView } = useInView();

  // const { toast } = useToast();

  const {
    
    isError: isErrorPosts,
  } = useGetRecentPosts();
  const {
    data: creators,
    isLoading: isUserLoading,
    isError: isErrorCreators,
  } = useGetUsers(10);
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);
  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );
  if (isErrorPosts || isErrorCreators) {
    return (
      <div className="flex flex-1">
        <div className="home-container">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
        <div className="home-creators">
          <p className="body-medium text-light-1">Something bad happened</p>
        </div>
      </div>
    );
  }
  const shouldShowPosts = 
     posts.pages.every((item) =>  item.documents.length === 0);
    
  return (
    <div className="flex flex-1">
      <div className="home-container">
        <div className="home-posts">
          <h2 className="h3-bold md:h2-bold text-left w-full">Home Feed</h2>
          {shouldShowPosts ? (
            <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
          ) :  
          (

            <ul className="flex flex-col flex-1 gap-9 w-full ">
              {posts.pages.map((item, index) => (
            <InfinityHome key={`page-${index}`} posts={item.documents} />
          ))}
            </ul>
          )}
        </div>
        {hasNextPage ? (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      ) : ''}
      </div>

      <div  className="home-creators">
        <h3 className="h3-bold text-light-1">Top Creators</h3>
        {isUserLoading && !creators ? (
          <Loader />
        ) : (
          <ul className="grid 2xl:grid-cols-2 gap-6">
            {creators?.documents.map((creator) => (
              <li key={creator?.$id}>
                <UserCard user={creator} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
