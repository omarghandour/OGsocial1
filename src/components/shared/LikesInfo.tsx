import { Models } from 'appwrite';

type PostStatsProps = {
          so: Models.Document;
          userId: string;
        };

const LikesInfo = ({so} : PostStatsProps) => {
  console.log(so);
  
    return(
    <div className='flex flex-col absolute -left-40 top-12 bg-white text-black p-2.5 rounded-md'>
   {
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   so.map((user : any, index : string) => (
      <div  key={index}>{user.username}</div>
    ))}
    </div>
    )
  
}

export default LikesInfo